import { createFileRoute } from "@tanstack/react-router";
import { Panel } from "@/components/DashShell";
import { COUPONS } from "@/lib/mock-extras";
import { Plus, BadgePercent } from "lucide-react";

export const Route = createFileRoute("/organizer/coupons")({ component: Coupons });

function Coupons() {
  return (
    <Panel title="Discount coupons" action={<button className="flame-btn inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs"><Plus className="h-3.5 w-3.5" />New coupon</button>}>
      <div className="grid gap-4 p-5 md:grid-cols-2">
        {COUPONS.map((c) => (
          <div key={c._id} className="rounded-xl border border-white/8 bg-white/[0.02] p-5">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2"><BadgePercent className="h-4 w-4 text-orange-400" /><span className="font-mono text-base font-semibold text-orange-200">{c.code}</span></div>
                <div className="mt-1 text-xs text-muted-foreground">{c.percent}% off · {c.eventId ? "Single event" : "All events"}</div>
              </div>
              <span className="rounded-full border border-orange-500/30 bg-orange-500/10 px-2 py-0.5 text-[10px] font-mono uppercase text-orange-300">Active</span>
            </div>
            <div className="mt-4">
              <div className="mb-1 flex justify-between text-[10px] font-mono text-muted-foreground"><span>{c.uses}/{c.limit} used</span><span>{Math.round(c.uses/c.limit*100)}%</span></div>
              <div className="h-1.5 overflow-hidden rounded-full bg-white/5"><div className="h-full flame-gradient" style={{ width: `${(c.uses/c.limit)*100}%` }} /></div>
            </div>
          </div>
        ))}
      </div>
    </Panel>
  );
}
