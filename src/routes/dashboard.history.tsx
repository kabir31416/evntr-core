import { createFileRoute } from "@tanstack/react-router";
import { Panel } from "@/components/DashShell";
import { ORDERS } from "@/lib/mock-extras";
import { EVENTS, formatDate } from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard/history")({ component: History });

function History() {
  return (
    <Panel title="Purchase history">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-white/[0.03] text-left text-[11px] uppercase tracking-wider text-muted-foreground">
            <tr><th className="px-5 py-3">Order</th><th className="px-5 py-3">Event</th><th className="px-5 py-3">Date</th><th className="px-5 py-3">Qty</th><th className="px-5 py-3 text-right">Total</th><th className="px-5 py-3">Status</th></tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {ORDERS.map((o) => {
              const evt = EVENTS.find((e) => e._id === o.eventId)!;
              return (
                <tr key={o._id} className="hover:bg-white/[0.02]">
                  <td className="px-5 py-3 font-mono text-[11px] text-muted-foreground">{o._id}</td>
                  <td className="px-5 py-3">{evt.title}</td>
                  <td className="px-5 py-3 text-muted-foreground">{formatDate(o.at)}</td>
                  <td className="px-5 py-3">{o.qty}</td>
                  <td className="px-5 py-3 text-right font-mono">${o.total}</td>
                  <td className="px-5 py-3"><Badge status={o.status} /></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Panel>
  );
}

function Badge({ status }: { status: string }) {
  const map: Record<string, string> = { paid: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300", refunded: "border-white/10 bg-white/5 text-muted-foreground", pending: "border-orange-500/30 bg-orange-500/10 text-orange-300" };
  return <span className={`rounded-full border px-2.5 py-1 text-[10px] font-mono uppercase ${map[status]}`}>{status}</span>;
}
