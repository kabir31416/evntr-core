import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BarChart3, QrCode, Globe2, Shield } from "lucide-react";

export const Route = createFileRoute("/organizers")({
  head: () => ({ meta: [{ title: "For Organizers — Evntr" }, { name: "description", content: "The operating system for modern event organizers. Sell tickets, manage seats, scan attendees, get paid globally." }] }),
  component: OrganizersPage,
});

function OrganizersPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-16 px-4 pt-8 sm:px-6 lg:px-8">
      <section className="max-w-3xl">
        <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-orange-400">// for organizers</div>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-6xl">The operating system <span className="flame-text">for events.</span></h1>
        <p className="mt-4 text-lg text-muted-foreground">Sell tickets, manage inventory, scan attendees, and get paid in 130+ countries — from a single dashboard built for scale.</p>
        <div className="mt-6 flex gap-3">
          <Link to="/organizer" className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-black hover:bg-white/90">
            Open Console <ArrowRight className="h-4 w-4" />
          </Link>
          <Link to="/pricing" className="rounded-lg border border-white/10 px-4 py-2.5 text-sm hover:bg-white/5">View Pricing</Link>
        </div>
      </section>
      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          { i: BarChart3, t: "Real-time analytics", d: "Revenue, conversion, funnel — live." },
          { i: QrCode, t: "QR ticketing", d: "Signed, scan-validated in 200ms." },
          { i: Globe2, t: "Global payouts", d: "Multi-currency, multi-vendor." },
          { i: Shield, t: "Mutex seat locks", d: "Zero oversold seats, ever." },
        ].map(({ i: Icon, t, d }) => (
          <div key={t} className="rounded-2xl border border-white/8 bg-white/[0.02] p-5">
            <Icon className="h-5 w-5 text-orange-400" />
            <div className="mt-4 font-medium">{t}</div>
            <div className="mt-1 text-sm text-muted-foreground">{d}</div>
          </div>
        ))}
      </section>
    </div>
  );
}
