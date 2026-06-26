import { createFileRoute } from "@tanstack/react-router";
import { Panel, Stat } from "@/components/DashShell";
import { ORDERS } from "@/lib/mock-extras";
import { EVENTS, formatDate } from "@/lib/mock-data";

export const Route = createFileRoute("/organizer/orders")({ component: Orders });

function Orders() {
  const revenue = ORDERS.reduce((a, o) => a + (o.status === "paid" ? o.total : 0), 0);
  const refunded = ORDERS.filter((o) => o.status === "refunded").length;
  return (
    <>
      <div className="grid gap-4 md:grid-cols-3">
        <Stat label="Gross revenue" value={`$${revenue.toLocaleString()}`} delta="+18.2%" />
        <Stat label="Orders" value={String(ORDERS.length)} delta="+12 this week" />
        <Stat label="Refund rate" value={`${Math.round((refunded / ORDERS.length) * 100)}%`} />
      </div>
      <Panel title="Recent orders">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-white/[0.03] text-left text-[11px] uppercase tracking-wider text-muted-foreground">
              <tr><th className="px-5 py-3">Order</th><th className="px-5 py-3">Buyer</th><th className="px-5 py-3">Event</th><th className="px-5 py-3">Date</th><th className="px-5 py-3 text-right">Total</th><th className="px-5 py-3">Status</th></tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {ORDERS.map((o) => {
                const evt = EVENTS.find((e) => e._id === o.eventId)!;
                const map: Record<string, string> = { paid: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300", refunded: "border-white/10 bg-white/5 text-muted-foreground", pending: "border-orange-500/30 bg-orange-500/10 text-orange-300" };
                return (
                  <tr key={o._id} className="hover:bg-white/[0.02]">
                    <td className="px-5 py-3 font-mono text-[11px] text-muted-foreground">{o._id}</td>
                    <td className="px-5 py-3">{o.buyer}</td>
                    <td className="px-5 py-3 text-muted-foreground">{evt.title}</td>
                    <td className="px-5 py-3 text-muted-foreground">{formatDate(o.at)}</td>
                    <td className="px-5 py-3 text-right font-mono">${o.total}</td>
                    <td className="px-5 py-3"><span className={`rounded-full border px-2.5 py-1 text-[10px] font-mono uppercase ${map[o.status]}`}>{o.status}</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Panel>
    </>
  );
}
