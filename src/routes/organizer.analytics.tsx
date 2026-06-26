import { createFileRoute } from "@tanstack/react-router";
import { Stat, Panel } from "@/components/DashShell";
import { EVENTS } from "@/lib/mock-data";

export const Route = createFileRoute("/organizer/analytics")({ component: Analytics });

function Analytics() {
  const countries = [
    { name: "United States", pct: 38 },
    { name: "Germany",       pct: 21 },
    { name: "Japan",         pct: 14 },
    { name: "Brazil",        pct: 11 },
    { name: "India",         pct: 9 },
    { name: "Other",         pct: 7 },
  ];
  const sources = [
    { name: "Direct",  pct: 44 },
    { name: "Search",  pct: 28 },
    { name: "Social",  pct: 18 },
    { name: "Email",   pct: 10 },
  ];
  const top = [...EVENTS].sort((a,b) => b.views - a.views).slice(0,5);

  return (
    <>
      <div className="grid gap-4 md:grid-cols-4">
        <Stat label="Visitors (30d)" value="84.2k" delta="+22%" />
        <Stat label="Conversion" value="6.4%" delta="+0.7%" />
        <Stat label="Avg order value" value="$214" delta="+$18" />
        <Stat label="Refund rate" value="1.8%" />
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Panel title="Top countries"><div className="space-y-3 p-5">{countries.map(c => <Bar key={c.name} {...c} />)}</div></Panel>
        <Panel title="Traffic sources"><div className="space-y-3 p-5">{sources.map(c => <Bar key={c.name} {...c} />)}</div></Panel>
      </div>
      <Panel title="Top selling events">
        <div className="divide-y divide-white/5">
          {top.map((e) => {
            const sold = e.tiers.reduce((a,t)=>a+t.sold,0);
            const rev = e.tiers.reduce((a,t)=>a+t.sold*t.price,0);
            return (
              <div key={e._id} className="grid items-center gap-3 p-5 md:grid-cols-[1fr_auto_auto]">
                <div className="font-medium">{e.title}</div>
                <div className="text-xs text-muted-foreground">{sold} sold</div>
                <div className="font-mono text-sm flame-text font-bold">${rev.toLocaleString()}</div>
              </div>
            );
          })}
        </div>
      </Panel>
    </>
  );
}

function Bar({ name, pct }: { name: string; pct: number }) {
  return (
    <div>
      <div className="mb-1 flex justify-between text-xs"><span>{name}</span><span className="font-mono text-muted-foreground">{pct}%</span></div>
      <div className="h-1.5 overflow-hidden rounded-full bg-white/5"><div className="h-full flame-gradient" style={{ width: `${pct}%` }} /></div>
    </div>
  );
}
