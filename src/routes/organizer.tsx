import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { Plus, TrendingUp, Users, DollarSign, Calendar, Activity } from "lucide-react";
import { EVENTS, aggregate, formatDate } from "@/lib/mock-data";
import { EventWizard } from "@/components/EventWizard";

export const Route = createFileRoute("/organizer")({
  head: () => ({ meta: [{ title: "Organizer Console — Evntr" }] }),
  component: Organizer,
});

function Organizer() {
  const [wizardOpen, setWizardOpen] = useState(false);
  const [, force] = useState(0);
  // Filter to one vendor for the demo
  const vendorId = "org_1";
  const myEvents = EVENTS.filter((e) => e.organizerId === vendorId);
  const grouped = aggregate([
    { $match: { organizerId: vendorId } },
    { $group: { _id: "$category", count: { $sum: 1 } } },
  ]) as { _id: string; count: number; revenue: number }[];

  const totalRevenue = myEvents.reduce((a, e) => a + e.tiers.reduce((b, t) => b + t.sold * t.price, 0), 0);
  const totalSold = myEvents.reduce((a, e) => a + e.tiers.reduce((b, t) => b + t.sold, 0), 0);
  const totalCap = myEvents.reduce((a, e) => a + e.tiers.reduce((b, t) => b + t.total, 0), 0);

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 pt-8 sm:px-6 lg:px-8">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-orange-400">// vendor console</div>
          <h1 className="mt-2 text-4xl font-bold md:text-5xl">Nullbyte <span className="flame-text">Labs</span></h1>
          <p className="mt-1 text-sm text-muted-foreground">Real-time inventory across {myEvents.length} live events.</p>
        </div>
        <button onClick={() => setWizardOpen(true)} className="flame-btn flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm"><Plus className="h-4 w-4" /> New Event</button>
      </motion.div>
      <EventWizard open={wizardOpen} onClose={() => setWizardOpen(false)} onCreated={() => force((n) => n + 1)} />

      {/* Bento KPIs */}
      <div className="grid gap-4 md:grid-cols-4">
        <KPI icon={<DollarSign />} label="Revenue" value={`$${totalRevenue.toLocaleString()}`} delta="+12.4%" />
        <KPI icon={<Users />} label="Tickets sold" value={totalSold.toLocaleString()} delta="+8.1%" />
        <KPI icon={<Activity />} label="Capacity used" value={`${Math.round((totalSold / totalCap) * 100)}%`} delta="" />
        <KPI icon={<TrendingUp />} label="Conversion" value="6.2%" delta="+0.4%" />
      </div>

      {/* Events table */}
      <div className="glass overflow-hidden rounded-2xl">
        <div className="flex items-center justify-between border-b border-white/5 p-5">
          <h2 className="font-semibold">Inventory pipeline</h2>
          <span className="font-mono text-[11px] uppercase tracking-wider text-orange-300">aggregate({"{$match,$group}"})</span>
        </div>
        <div className="divide-y divide-white/5">
          {myEvents.map((e) => {
            const sold = e.tiers.reduce((a, t) => a + t.sold, 0);
            const cap = e.tiers.reduce((a, t) => a + t.total, 0);
            const rev = e.tiers.reduce((a, t) => a + t.sold * t.price, 0);
            const pct = Math.round((sold / cap) * 100);
            return (
              <div key={e._id} className="grid items-center gap-3 p-5 md:grid-cols-[1fr_auto_auto_auto]">
                <div>
                  <div className="font-medium">{e.title}</div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3 text-orange-400" />{formatDate(e.date)}</span>
                    <span>{e.city}</span>
                  </div>
                </div>
                <div className="w-32">
                  <div className="mb-1 flex justify-between text-[10px] font-mono text-muted-foreground"><span>{sold}/{cap}</span><span>{pct}%</span></div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-white/5"><div className="h-full flame-gradient" style={{ width: `${pct}%` }} /></div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-sm flame-text font-bold">${rev.toLocaleString()}</div>
                  <div className="text-[10px] text-muted-foreground">revenue</div>
                </div>
                <span className="rounded-full border border-orange-500/30 bg-orange-500/10 px-2.5 py-1 text-[10px] font-mono uppercase text-orange-300">Live</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Aggregation grid */}
      <div className="grid gap-4 md:grid-cols-3">
        {grouped.map((g) => (
          <div key={g._id} className="glass hover-neon rounded-2xl p-5">
            <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">$group → {g._id}</div>
            <div className="mt-2 flex items-baseline justify-between">
              <div className="text-2xl font-bold">{g.count} <span className="text-xs font-normal text-muted-foreground">events</span></div>
              <div className="text-sm flame-text font-bold">${g.revenue.toLocaleString()}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function KPI({ icon, label, value, delta }: { icon: React.ReactNode; label: string; value: string; delta: string }) {
  return (
    <motion.div whileHover={{ y: -3 }} className="glass hover-neon rounded-2xl p-5">
      <div className="flex items-center justify-between">
        <div className="grid h-9 w-9 place-items-center rounded-lg flame-gradient text-black">{icon}</div>
        {delta && <span className="font-mono text-[10px] text-orange-300">{delta}</span>}
      </div>
      <div className="mt-3 text-2xl font-bold">{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </motion.div>
  );
}
