import { useEffect, useRef, useState } from "react";
import { Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

/** Camera barcode scanner (mobile/tablet). Handheld USB scanners work by typing into any search field. */
export function BarcodeScanner({ onScan }: { onScan: (code: string) => void }) {
  const [open, setOpen] = useState(false);
  const [err, setErr] = useState("");
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!open) return;
    let stream: MediaStream | undefined;
    let stop = false;
    (async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const BD = (window as any).BarcodeDetector;
      if (!BD) return setErr("المتصفح لا يدعم القراءة بالكاميرا. استخدم Chrome على أندرويد أو جهاز قارئ يدوي.");
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
        if (!video.current) return;
        video.current.srcObject = stream;
        await video.current.play();
        const det = new BD({ formats: ["ean_13", "ean_8", "code_128", "code_39", "upc_a", "qr_code"] });
        while (!stop) {
          const r = await det.detect(video.current).catch(() => []);
          if (r[0]?.rawValue) { onScan(r[0].rawValue); setOpen(false); break; }
          await new Promise((res) => setTimeout(res, 250));
        }
      } catch { setErr("تعذّر فتح الكاميرا"); }
    })();
    return () => { stop = true; stream?.getTracks().forEach((t) => t.stop()); };
  }, [open, onScan]);

  return (
    <>
      <Button type="button" variant="outline" size="sm" onClick={() => { setErr(""); setOpen(true); }}>
        <Camera className="size-4" />مسح بالكاميرا
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>وجّه الكاميرا نحو الباركود</DialogTitle></DialogHeader>
          {err ? <p className="text-sm text-destructive">{err}</p> : <video ref={video} className="w-full rounded-md bg-muted" muted playsInline />}
        </DialogContent>
      </Dialog>
    </>
  );
}
