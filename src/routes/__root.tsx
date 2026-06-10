import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import type { ReactNode } from "react";
import appCss from "../styles.css?url";
import { Navbar } from "@/components/Navbar";
import { Background } from "@/components/Background";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Evntr — Verifiable Event Tickets" },
      { name: "description", content: "Multi-vendor event management and QR-verifiable ticketing built for high-throughput, mutex-safe bookings." },
      { property: "og:title", content: "Evntr — Event Ticketing Platform" },
      { property: "og:description", content: "Discover events, book seats with concurrency-safe locks, and verify tickets via QR." },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Background />
      <Navbar />
      <main className="mx-auto w-[min(1200px,94%)] py-8">
        <Outlet />
      </main>
      <footer className="mx-auto mt-20 w-[min(1200px,94%)] border-t border-white/5 py-8 text-center text-xs text-muted-foreground">
        <span className="font-mono">EVNTR // mutex-safe ticketing // built for vendors</span>
      </footer>
    </QueryClientProvider>
  );
}
