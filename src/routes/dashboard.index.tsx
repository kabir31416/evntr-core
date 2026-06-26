import { createFileRoute, Link } from "@tanstack/react-router";
import { Stat, Panel } from "@/components/DashShell";
import { EVENTS, formatDate } from "@/lib/mock-data";
import { ORDERS, NOTIFICATIONS, favoriteIds } from "@/lib/mock-extras";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/dashboard/")({ component: Overview });

function Overview() {
  const [favs, setFavs] = useState<string[]>([]);
  useEffect(() => setFavs(favoriteIds()), []);
  const upcoming = EVENTS.slice(0, 3);
  const spent = ORDERS.slice(0, 8).reduce((a, o) => a + o.total, 0);

  return (
    <>
      <div className="grid gap-4 md:grid-cols-4">
        <Stat label="Active tickets" value="6" delta="+2 this month" />
        <Stat label="Total spent" value={`$${spent.toLocaleString()}`} delta="+18%" />
        <Stat label="Favorites" value={String(favs.length || 4)} />
        <Stat label="Notifications" value={String(NOTIFICATIONS.filter(n => n.unread).length)} />
      </div>
      <Panel title="Upcoming events" action={<Link to="/events" className="text-xs text-orange-300">Browse all →</Link>}>
        <div className="divide-y divide-white/5">
          {upcoming.map((e) => (
            <div key={e._id} className="flex items-center gap-4 p-5">
              <div className={`h-12 w-12 shrink-0 rounded-xl bg-gradient-to-br ${e.cover}`} />
              <div className="min-w-0 flex-1">
                <div className="truncate font-medium">{e.title}</div>
                <div className="text-xs text-muted-foreground">{formatDate(e.date)} · {e.city}</div>
              </div>
              <Link to="/events/$slug" params={{ slug: e.slug }} className="rounded-lg border border-white/10 px-3 py-1.5 text-xs hover:border-orange-500/40">View</Link>
            </div>
          ))}
        </div>
      </Panel>
    </>
  );
}
