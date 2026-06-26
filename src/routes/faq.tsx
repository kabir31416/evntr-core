import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export const Route = createFileRoute("/faq")({
  head: () => ({ meta: [
    { title: "FAQ — Evntr" },
    { name: "description", content: "Answers to the most common questions about Evntr." },
  ]}),
  component: FAQ,
});

const FAQS = [
  { q: "How does pricing work?",                a: "Free for free events. Paid events pay a low per-ticket fee plus standard payment processing. Volume discounts kick in automatically above 10,000 tickets/month." },
  { q: "When do I get paid out?",               a: "Payouts are bi-weekly by default. Verified Pro organizers can request on-demand payouts up to 95% of available balance." },
  { q: "Can attendees refund themselves?",      a: "Refund policy is per-event. Organizers choose between full self-service, time-bounded, or request-only flows." },
  { q: "Do you support multiple currencies?",   a: "Yes. Evntr settles in 38 currencies and displays local prices via real-time FX with caching." },
  { q: "How are tickets verified at the door?", a: "Every ticket is a signed QR. Use the organizer app to scan; tickets check-in atomically server-side so double-entry is impossible." },
  { q: "Is there an API?",                      a: "Yes. Full REST + webhooks for orders, attendees, payouts, and check-ins. SDKs in TS, Python, Go." },
  { q: "Can I sell merch alongside tickets?",   a: "Add-ons (merch, parking, meals) live alongside ticket tiers in checkout and inventory." },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="mx-auto max-w-3xl px-4 pt-12 sm:px-6 lg:px-8">
      <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-orange-400">// faq</div>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl">Frequently asked.</h1>
      <p className="mt-2 text-muted-foreground">Still curious? Reach out anytime.</p>
      <div className="mt-10 space-y-2">
        {FAQS.map((f, i) => {
          const isOpen = open === i;
          return (
            <button key={f.q} onClick={() => setOpen(isOpen ? null : i)} className="glass block w-full overflow-hidden rounded-2xl text-left">
              <div className="flex items-center justify-between p-5">
                <span className="text-sm font-medium md:text-base">{f.q}</span>
                <ChevronDown className={`h-4 w-4 text-orange-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
              </div>
              {isOpen && <div className="px-5 pb-5 text-sm text-muted-foreground">{f.a}</div>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
