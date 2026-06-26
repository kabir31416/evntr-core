import { createFileRoute } from "@tanstack/react-router";
import { Panel, Stat } from "@/components/DashShell";
import { PAYOUTS } from "@/lib/mock-extras";

export const Route = createFileRoute("/organizer/payouts")({ component: Payouts });

function Payouts() {
  const paid = PAYOUTS.filter(p => p.status === "paid").reduce((a,p)=>a+p.amount,0);
  const pending = PAYOUTS.filter(p => p.status !== "paid").reduce((a,p)=>a+p.amount,0);
  return (
    <>
      <div className="grid gap-4 md:grid-cols-3">
        <Stat label="Lifetime paid out" value={`$${paid.toLocaleString()}`} />
        <Stat label="Pending" value={`$${pending.toLocaleString()}`} delta="next: Jun 23" />
        <Stat label="Available balance" value="$8,420" delta="+$1,200 today" />
      </div>
      <Panel title="Payout history" action={<button className="flame-btn rounded-xl px-3 py-1.5 text-xs">Request payout</button>}>
        <div className="divide-y divide-white/5">
          {PAYOUTS.map(p => {
            const map: Record<string,string> = { paid:"text-emerald-300", processing:"text-orange-300", scheduled:"text-muted-foreground" };
            return (
              <div key={p._id} className="grid items-center gap-3 p-5 md:grid-cols-[1fr_auto_auto]">
                <div>
                  <div className="font-mono text-sm">{p.method}</div>
                  <div className="text-xs text-muted-foreground">{p.at}</div>
                </div>
                <div className={`text-xs font-mono uppercase ${map[p.status]}`}>{p.status}</div>
                <div className="font-mono text-base font-semibold">${p.amount.toLocaleString()}</div>
              </div>
            );
          })}
        </div>
      </Panel>
    </>
  );
}
