import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";

export const Route = createFileRoute("/pricing")({
  head: () => ({ meta: [{ title: "Pricing — Evntr" }, { name: "description", content: "Transparent pricing for organizers of every size. Starter free, Pro for scale, Enterprise for global events." }] }),
  component: PricingPage,
});

const TIERS = [
  { name: "Starter", price: "Free", tagline: "For your first 100 tickets.", features: ["Up to 100 tickets/mo", "QR ticketing", "Basic analytics", "Stripe payouts"], cta: "Start free", featured: false },
  { name: "Pro", price: "$49", suffix: "/mo", tagline: "For growing organizers.", features: ["Unlimited tickets", "Multi-vendor seats", "Real-time analytics", "Custom branding", "Priority support"], cta: "Start 14-day trial", featured: true },
  { name: "Enterprise", price: "Custom", tagline: "For global events.", features: ["SLA & SSO", "Dedicated CSM", "Custom integrations", "Multi-region payouts", "Audit logs"], cta: "Talk to sales", featured: false },
];

function PricingPage() {
  return (
    <div className="space-y-12 pt-8">
      <div className="max-w-2xl">
        <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-orange-400">// pricing</div>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">Simple, scalable pricing</h1>
        <p className="mt-3 text-muted-foreground">No setup fees. No hidden charges. Pay for what you need.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {TIERS.map((t) => (
          <div key={t.name} className={`relative rounded-2xl border p-6 ${t.featured ? "border-orange-500/40 bg-gradient-to-b from-orange-500/[0.06] to-transparent" : "border-white/8 bg-white/[0.02]"}`}>
            {t.featured && <div className="absolute -top-3 left-6 rounded-full bg-orange-500 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-black">Popular</div>}
            <div className="text-sm font-medium text-muted-foreground">{t.name}</div>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-4xl font-semibold tracking-tight">{t.price}</span>
              {t.suffix && <span className="text-sm text-muted-foreground">{t.suffix}</span>}
            </div>
            <div className="mt-1 text-sm text-muted-foreground">{t.tagline}</div>
            <Link to="/organizer" className={`mt-5 block rounded-lg px-4 py-2 text-center text-sm font-medium ${t.featured ? "bg-white text-black hover:bg-white/90" : "border border-white/10 hover:bg-white/5"}`}>{t.cta}</Link>
            <ul className="mt-6 space-y-2.5">
              {t.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-orange-400" />
                  <span className="text-foreground/90">{f}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
