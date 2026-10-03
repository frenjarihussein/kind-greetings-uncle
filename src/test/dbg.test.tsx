import { QueryClient } from "@tanstack/react-query";
import { createMemoryHistory, createRouter, RouterProvider } from "@tanstack/react-router";
import { render, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { routeTree } from "@/routeTree.gen";

describe("dbg", () => {
  it("paints", async () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() }, history: createMemoryHistory({ initialEntries: ["/"] }) });
    const load = router.load().then(() => "loaded").catch((e) => "loaderror:" + e.message);
    const result = await Promise.race([load, new Promise((r) => setTimeout(() => r("timeout"), 3000))]);
    console.log("LOAD>>", result);
    console.log("STATUS>>", router.state.status);
    render(<RouterProvider router={router} />, { container: document.body, baseElement: document.body });
    await waitFor(() => { console.log("BODY>>", document.body.innerHTML.slice(0, 300)); }, { timeout: 500, interval: 200 });
    expect(true).toBe(true);
  });
});
