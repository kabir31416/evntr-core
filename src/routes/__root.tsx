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
import { AuthProvider } from "@/lib/auth";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Evntr — Verifiable Event Tickets" },
      { name: "description", content: "Multi-vendor event management and QR-verifiable ticketing built for high-throughput, mutex-safe bookings." },
      { property: "og:title", content: "Evntr — Verifiable Event Tickets" },
      { property: "og:description", content: "Multi-vendor event management and QR-verifiable ticketing built for high-throughput, mutex-safe bookings." },
      { name: "twitter:title", content: "Evntr — Verifiable Event Tickets" },
      { name: "twitter:description", content: "Multi-vendor event management and QR-verifiable ticketing built for high-throughput, mutex-safe bookings." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/84bb33e3-d56a-4d57-944a-1e4212cd7b1e/id-preview-ee850b7c--dd71c14a-da43-4943-a57d-4e6b8343aee2.lovable.app-1782432645234.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/84bb33e3-d56a-4d57-944a-1e4212cd7b1e/id-preview-ee850b7c--dd71c14a-da43-4943-a57d-4e6b8343aee2.lovable.app-1782432645234.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:type", content: "website" },
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
      <AuthProvider>
        <Background />
        <Navbar />
        <main className="pt-16">
          <Outlet />
        </main>
      </AuthProvider>
    </QueryClientProvider>
  );
}
