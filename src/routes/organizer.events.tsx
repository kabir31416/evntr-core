import { createFileRoute } from "@tanstack/react-router";
import { EVENTS, formatDate } from "@/lib/mock-data";
import { Panel } from "@/components/DashShell";

export const Route = createFileRoute("/organizer/events")({ component: MyEvents });

function MyEvents() {
  const events = EVENTS.filter((e) => e.organizerId === "org_1");
  return (
    <Panel title="My events">
      <div className="divide-y divide-white/5">
        {events.map((e) => {
          const sold = e.tiers.reduce((a, t) => a + t.sold, 0);
          const cap  = e.tiers.reduce((a, t) => a + t.total, 0);
          return (
            <div key={e._id} className="grid items-center gap-3 p-5 md:grid-cols-[1fr_auto_auto]">
              <div>
                <div className="font-medium">{e.title}</div>
                <div className="text-xs text-muted-foreground">{formatDate(e.date)} · {e.city}</div>
              </div>
              <div className="font-mono text-xs text-muted-foreground">{sold}/{cap} sold</div>
              <div className="flex gap-2">
                <button className="rounded-lg border border-white/10 px-3 py-1.5 text-xs hover:border-orange-500/40">Edit</button>
                <button className="rounded-lg border border-white/10 px-3 py-1.5 text-xs hover:border-red-500/40">Archive</button>
              </div>
            </div>
          );
        })}
      </div>
    </Panel>
  );
}
