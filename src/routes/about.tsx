import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles, Globe, ShieldCheck, Zap } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [
    { title: "About — Evntr" },
    { name: "description", content: "Evntr is the global multi-vendor platform powering modern events — from intimate workshops to 50,000-person festivals." },
  ]}),
  component: About,
});

function About() {
  const values = [
    { icon: Zap,         title: "Built for scale",    body: "Concurrency-safe inventory and aggregation pipelines designed for million-ticket weekends." },
    { icon: ShieldCheck, title: "Trust by default",   body: "Verified organizers, QR-anchored tickets, fraud-aware checkout." },
    { icon: Globe,       title: "Global from day one", body: "Multi-currency, multi-timezone, localized payment rails on every continent." },
  ];
  return (
    <div className="mx-auto max-w-5xl space-y-16 px-4 pt-12 sm:px-6 lg:px-8">
      <section>
        <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-orange-400">// about</div>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight md:text-6xl">The operating system for <span className="flame-text">live experiences.</span></h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">We started Evntr because the tools organizers were using felt like spreadsheets with a coat of paint. Tickets should move like software — atomic, observable, fast.</p>
      </section>
      <section className="grid gap-4 md:grid-cols-3">
        {values.map((v) => (
          <div key={v.title} className="glass hover-neon rounded-2xl p-6">
            <div className="grid h-10 w-10 place-items-center rounded-lg flame-gradient text-black"><v.icon className="h-5 w-5" /></div>
            <h3 className="mt-4 font-semibold">{v.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{v.body}</p>
          </div>
        ))}
      </section>
      <section className="glass rounded-2xl p-8 md:p-12">
        <div className="grid gap-8 md:grid-cols-3">
          {[{ k: "120+", v: "Countries" },{ k: "8.4M", v: "Tickets issued" },{ k: "$420M", v: "Vendor payouts" }].map((s) => (
            <div key={s.v}>
              <div className="text-4xl font-semibold flame-text">{s.k}</div>
              <div className="mt-1 text-sm text-muted-foreground">{s.v}</div>
            </div>
          ))}
        </div>
      </section>
      <section className="text-center">
        <Sparkles className="mx-auto h-6 w-6 text-orange-400" />
        <h2 className="mt-3 text-2xl font-semibold">Backed by operators, built by engineers.</h2>
        <p className="mt-2 text-muted-foreground">Headquartered in Berlin · Distributed across 14 countries.</p>
        <Link to="/contact" className="flame-btn mt-6 inline-flex rounded-xl px-5 py-2.5 text-sm">Talk to us</Link>
      </section>
    </div>
  );
}
