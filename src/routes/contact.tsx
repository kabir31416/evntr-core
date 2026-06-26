import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, MessageSquare, Building2 } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [
    { title: "Contact — Evntr" },
    { name: "description", content: "Get in touch with Evntr — sales, support, partnerships." },
  ]}),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <div className="mx-auto max-w-6xl px-4 pt-12 sm:px-6 lg:px-8">
      <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-orange-400">// contact</div>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl">Let's build something together.</h1>
      <p className="mt-2 text-muted-foreground">We reply to most messages within one business day.</p>

      <div className="mt-10 grid gap-8 md:grid-cols-[1fr_360px]">
        <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="glass space-y-5 rounded-2xl p-6 md:p-8">
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Full name" required />
            <Field label="Work email" type="email" required />
          </div>
          <Field label="Company" />
          <label className="block">
            <span className="mb-1.5 block text-xs text-muted-foreground">How can we help?</span>
            <textarea required rows={5} className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2.5 text-sm outline-none focus:border-orange-500/50" />
          </label>
          <button className="flame-btn rounded-xl px-5 py-2.5 text-sm">Send message</button>
          {sent && <div className="rounded-lg border border-orange-500/30 bg-orange-500/10 p-3 text-xs text-orange-200">Thanks — we'll be in touch shortly.</div>}
        </form>
        <aside className="space-y-3">
          {[
            { icon: Mail,          title: "Email",    body: "hello@evntr.app" },
            { icon: MessageSquare, title: "Support",  body: "support@evntr.app · 24/7 chat" },
            { icon: Building2,     title: "HQ",       body: "Friedrichstr. 88, Berlin" },
          ].map((c) => (
            <div key={c.title} className="glass rounded-2xl p-5">
              <c.icon className="h-5 w-5 text-orange-400" />
              <div className="mt-3 text-sm font-semibold">{c.title}</div>
              <div className="text-xs text-muted-foreground">{c.body}</div>
            </div>
          ))}
        </aside>
      </div>
    </div>
  );
}

function Field({ label, type = "text", required }: { label: string; type?: string; required?: boolean }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs text-muted-foreground">{label}</span>
      <input type={type} required={required} className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2.5 text-sm outline-none focus:border-orange-500/50" />
    </label>
  );
}
