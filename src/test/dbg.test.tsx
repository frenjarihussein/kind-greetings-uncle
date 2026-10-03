import { QueryClient } from "@tanstack/react-query";
import { createMemoryHistory, createRouter, RouterProvider } from "@tanstack/react-router";
import { render, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { routeTree } from "@/routeTree.gen";

describe("dbg", () => {
  it("paints", async () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() }, history: createMemoryHistory({ initialEntries: ["/"] }) });
    render(<RouterProvider router={router} />, { container: document.body, baseElement: document.body });
    await waitFor(() => { console.log("BODY>>", document.body.innerHTML.slice(0, 600)); }, { timeout: 500, interval: 200 });
    console.log("STATUS>>", router.state.status, router.state.matches.length);
    expect(true).toBe(true);
  });
});
