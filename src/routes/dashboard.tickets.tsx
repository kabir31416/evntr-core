import { createFileRoute, Link } from "@tanstack/react-router";
import { Panel } from "@/components/DashShell";
import { EVENTS, formatDate } from "@/lib/mock-data";
import { QrCode, Download } from "lucide-react";

export const Route = createFileRoute("/dashboard/tickets")({ component: Tickets });

function Tickets() {
  // mock: first ticket per event for demo
  const mine = EVENTS.slice(0, 5).map((e, i) => ({ event: e, code: `EVNTR-${e._id.slice(-3).toUpperCase()}-${(1000+i).toString(36).toUpperCase()}`, tier: e.tiers[0].name }));
  return (
    <Panel title="My tickets">
      <div className="divide-y divide-white/5">
        {mine.map((t) => (
          <div key={t.code} className="grid items-center gap-4 p-5 md:grid-cols-[auto_1fr_auto_auto]">
            <div className="grid h-14 w-14 place-items-center rounded-xl border border-orange-500/30 bg-orange-500/10"><QrCode className="h-7 w-7 text-orange-300" /></div>
            <div className="min-w-0">
              <Link to="/events/$slug" params={{ slug: t.event.slug }} className="block truncate font-medium hover:text-orange-300">{t.event.title}</Link>
              <div className="text-xs text-muted-foreground">{formatDate(t.event.date)} · {t.event.city} · {t.tier}</div>
              <div className="mt-1 font-mono text-[10px] text-orange-300">{t.code}</div>
            </div>
            <span className="rounded-full border border-orange-500/30 bg-orange-500/10 px-2.5 py-1 text-[10px] font-mono uppercase text-orange-300">Valid</span>
            <button className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-1.5 text-xs hover:border-orange-500/40"><Download className="h-3.5 w-3.5" />PDF</button>
          </div>
        ))}
      </div>
    </Panel>
  );
}
