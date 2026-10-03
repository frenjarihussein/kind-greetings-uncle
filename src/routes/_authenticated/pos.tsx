import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Minus, Plus, Printer, Search, Trash2 } from "lucide-react";
import { db, scope } from "@/lib/db";
import { useMe } from "@/lib/session";
import { fmtNum, today } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BarcodeInput, findByCode } from "@/components/BarcodeInput";
import { cn } from "@/lib/utils";
import { printThermalReceipt } from "@/lib/receipt";
import { useBranding } from "@/lib/branding";

export const Route = createFileRoute("/_authenticated/pos")({
  head: () => ({
    meta: [
      { title: "نقطة البيع — يوسف سوفت" },
      { name: "description", content: "شاشة لمس سريعة لفواتير البيع والشراء مع مسح الباركود" },
    ],
  }),
  component: PosPage,
});

type Product = { id: string; name: string; sku: string; barcode: string | null; unit: string; category: string | null; last_purchase_price: number; sale_price: number; avg_cost: number; qty_on_hand: number };
type CartLine = { p: Product; qty: number; price: number };

function PosPage() {
  const { data: me } = useMe();
  const qc = useQueryClient();
  const brand = useBranding();
  const forced = me?.accountKind === "sales_cashier" ? "sale" : me?.accountKind === "purchase_cashier" ? "purchase" : null;
  const [modeState, setMode] = useState<"sale" | "purchase">("sale");
  const mode = forced ?? modeState;
  const [cart, setCart] = useState<CartLine[]>([]);
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("");
  const [wh, setWh] = useState("");
  const [partner, setPartner] = useState("");
  const [paid, setPaid] = useState(true);

  const ref = useQuery({
    queryKey: ["pos_refs", me?.tenantId],
    enabled: !!me?.tenantId,
    queryFn: async () => {
      const [p, w, pa] = await Promise.all([
        scope(db.from("products").select("id,name,sku,barcode,unit,category,last_purchase_price,sale_price,avg_cost,qty_on_hand,is_group,is_active"), me?.tenantId).order("name"),
        scope(db.from("warehouses").select("id,name,is_group"), me?.tenantId).order("name"),
        scope(db.from("partners").select("id,name,partner_type"), me?.tenantId).order("name"),
      ]);
      return {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        products: ((p.data ?? []) as any[]).filter((x) => !x.is_group && x.is_active !== false) as Product[],
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        warehouses: ((w.data ?? []) as any[]).filter((x) => !x.is_group),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        partners: (pa.data ?? []) as any[],
      };
    },
  });
  const products = ref.data?.products ?? [];
  const warehouse = wh || ref.data?.warehouses[0]?.id || "";
  const cats = useMemo(() => [...new Set(products.map((p) => p.category).filter(Boolean))] as string[], [products]);
  const shown = products.filter(
    (p) => (!cat || p.category === cat) && (!search || p.name.includes(search) || p.sku.toLowerCase().includes(search.toLowerCase())),
  );
  const total = cart.reduce((s, l) => s + l.qty * l.price, 0);

  function add(p: Product) {
    setCart((c) => {
      const i = c.findIndex((l) => l.p.id === p.id);
      if (i >= 0) return c.map((l, j) => (j === i ? { ...l, qty: l.qty + 1 } : l));
      return [...c, { p, qty: 1, price: Number(mode === "sale" ? Number(p.sale_price) || p.last_purchase_price : p.avg_cost) || 0 }];
    });
  }
  function setQty(id: string, q: number) {
    setCart((c) => (q <= 0 ? c.filter((l) => l.p.id !== id) : c.map((l) => (l.p.id === id ? { ...l, qty: q } : l))));
  }

  const save = useMutation({
    mutationFn: async () => {
      if (!cart.length) throw new Error("السلة فارغة");
      if (!warehouse) throw new Error("لا يوجد مستودع، أضف مستودعاً أولاً");
      const { data: doc, error } = await db
        .from("documents")
        .insert({ tenant_id: me!.tenantId, doc_type: mode, doc_date: today(), currency: "USD", exchange_rate: 1, partner_id: partner || null, warehouse_id: warehouse, amount: 0, notes: mode === "sale" ? "بيع نقطة البيع" : "شراء نقطة البيع" })
        .select()
        .single();
      if (error) throw error;
      const { error: lErr } = await db.from("document_lines").insert(
        cart.map((l) => ({ tenant_id: me!.tenantId, document_id: doc.id, product_id: l.p.id, qty: l.qty, unit_price: l.price })),
      );
      if (lErr) throw lErr;
      const { error: pErr } = await db.rpc("post_document", { _id: doc.id });
      if (pErr) throw new Error("حُفظت الفاتورة كمسودة ولم تُرحّل: " + pErr.message);
      if (paid) {
        const { data: v, error: vErr } = await db
          .from("documents")
          .insert({ tenant_id: me!.tenantId, doc_type: mode === "sale" ? "receipt" : "payment", doc_date: today(), currency: "USD", exchange_rate: 1, partner_id: partner || null, settles_document_id: doc.id, amount: total, notes: "دفع نقدي - نقطة البيع" })
          .select()
          .single();
        if (vErr) throw vErr;
        await db.rpc("post_document", { _id: v.id });
      }
      return doc;
    },
    onSuccess: (doc) => {
      toast.success(`تم حفظ الفاتورة رقم ${doc.doc_no ?? ""}`);
      printThermalReceipt({
        company: me?.tenantName ?? "",
        logoUrl: brand.data?.logo_url ?? null,
        title: mode === "sale" ? "فاتورة مبيع" : "فاتورة شراء",
        docNo: doc.doc_no,
        cashier: me?.fullName || me?.email || "",
        partner: (ref.data?.partners ?? []).find((p) => p.id === partner)?.name ?? "",
        lines: cart.map((l) => ({ name: l.p.name, qty: l.qty, price: l.price })),
        paid,
      });
      setCart([]);
      qc.invalidateQueries({ queryKey: ["pos_refs"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const partnersList = (ref.data?.partners ?? []).filter((p) => (mode === "sale" ? p.partner_type !== "supplier" : p.partner_type !== "customer"));

  return (
    <div className="grid h-[calc(100vh-5rem)] gap-3 lg:grid-cols-[1fr_400px]">
      <section className="flex min-h-0 flex-col gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {!forced && (
            <div className="flex rounded-lg border p-1">
              {(["sale", "purchase"] as const).map((m) => (
                <button key={m} onClick={() => { setMode(m); setCart([]); }} className={cn("rounded-md px-5 py-2 text-base", mode === m && "bg-primary text-primary-foreground")}>
                  {m === "sale" ? "بيع" : "شراء"}
                </button>
              ))}
            </div>
          )}
          <BarcodeInput big autoFocus className="min-w-64 flex-1" onCode={(code) => {
            const p = findByCode(products, code);
            if (!p) { toast.error("لا توجد مادة بهذا الباركود: " + code); return; }
            add(p);
          }} />
          <div className="relative w-56">
            <Search className="pointer-events-none absolute start-3 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
            <Input className="h-14 ps-10 text-lg" placeholder="بحث بالاسم" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </div>
        {cats.length > 0 && (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {["", ...cats].map((c) => (
              <button key={c || "all"} onClick={() => setCat(c)} className={cn("whitespace-nowrap rounded-full border px-5 py-2 text-base", cat === c && "bg-primary text-primary-foreground")}>
                {c || "الكل"}
              </button>
            ))}
          </div>
        )}
        <div className="grid min-h-0 flex-1 auto-rows-min grid-cols-2 gap-3 overflow-y-auto sm:grid-cols-3 xl:grid-cols-4">
          {shown.map((p) => (
            <button key={p.id} onClick={() => add(p)} className="flex min-h-28 flex-col justify-between rounded-xl border bg-card p-4 text-start shadow-sm transition active:scale-95 hover:border-primary">
              <span className="text-base font-semibold leading-tight">{p.name}</span>
              <span className="mt-2 flex items-end justify-between text-sm text-muted-foreground">
                <span>{fmtNum(p.qty_on_hand, 0)} {p.unit}</span>
                <span className="num text-lg font-bold text-foreground">{fmtNum(mode === "sale" ? Number(p.sale_price) || p.last_purchase_price : p.avg_cost)}</span>
              </span>
            </button>
          ))}
          {!shown.length && <p className="col-span-full p-8 text-center text-muted-foreground">لا توجد مواد</p>}
        </div>
      </section>

      <aside className="flex min-h-0 flex-col rounded-xl border bg-card">
        <div className="grid grid-cols-2 gap-2 border-b p-3">
          <select className="h-12 rounded-md border bg-background px-2 text-base" value={warehouse} onChange={(e) => setWh(e.target.value)}>
            {(ref.data?.warehouses ?? []).map((w) => <option key={w.id} value={w.id}>{w.name}</option>)}
          </select>
          <select className="h-12 rounded-md border bg-background px-2 text-base" value={partner} onChange={(e) => setPartner(e.target.value)}>
            <option value="">{mode === "sale" ? "زبون نقدي" : "مورد نقدي"}</option>
            {partnersList.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto">
          {!cart.length && <p className="p-8 text-center text-muted-foreground">امسح باركود أو اضغط على مادة</p>}
          {cart.map((l) => (
            <div key={l.p.id} className="flex items-center gap-2 border-b p-3">
              <div className="min-w-0 flex-1">
                <div className="truncate font-semibold">{l.p.name}</div>
                <Input type="number" className="mt-1 h-9 w-28" value={l.price} onChange={(e) => setCart((c) => c.map((x) => (x.p.id === l.p.id ? { ...x, price: Number(e.target.value) } : x)))} />
              </div>
              <Button size="icon" variant="outline" className="size-11" onClick={() => setQty(l.p.id, l.qty - 1)}><Minus /></Button>
              <span className="num w-10 text-center text-lg font-bold">{l.qty}</span>
              <Button size="icon" variant="outline" className="size-11" onClick={() => setQty(l.p.id, l.qty + 1)}><Plus /></Button>
              <Button size="icon" variant="ghost" className="size-11 text-destructive" onClick={() => setQty(l.p.id, 0)}><Trash2 /></Button>
            </div>
          ))}
        </div>
        <div className="space-y-3 border-t p-3">
          <label className="flex items-center gap-2 text-base">
            <input type="checkbox" className="size-5" checked={paid} onChange={(e) => setPaid(e.target.checked)} />
            مدفوعة نقداً
          </label>
          <div className="flex items-baseline justify-between">
            <span className="text-lg">الإجمالي</span>
            <span className="num text-3xl font-bold">{fmtNum(total)}</span>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="h-14 flex-1 text-base" onClick={() => setCart([])} disabled={!cart.length}>إلغاء</Button>
            <Button className="h-14 flex-[2] text-lg" onClick={() => save.mutate()} disabled={!cart.length || save.isPending}>
              <Printer className="size-5" />
              {save.isPending ? "جارٍ الحفظ..." : "حفظ الفاتورة"}
            </Button>
          </div>
        </div>
      </aside>
    </div>
  );
}
