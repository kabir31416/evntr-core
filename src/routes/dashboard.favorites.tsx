import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { EVENTS } from "@/lib/mock-data";
import { EventCard } from "@/components/EventCard";
import { favoriteIds } from "@/lib/mock-extras";

export const Route = createFileRoute("/dashboard/favorites")({ component: Favs });

function Favs() {
  const [ids, setIds] = useState<string[]>([]);
  useEffect(() => {
    const f = favoriteIds();
    setIds(f.length ? f : EVENTS.slice(0, 3).map((e) => e._id));
  }, []);
  const list = EVENTS.filter((e) => ids.includes(e._id));
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {list.length === 0 && <div className="glass col-span-full rounded-2xl p-10 text-center text-muted-foreground">No favorites yet.</div>}
      {list.map((e, i) => <EventCard key={e._id} event={e} index={i} />)}
    </div>
  );
}
