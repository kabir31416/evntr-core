import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter } from "lucide-react";
import { EVENTS, type EventCategory } from "@/lib/mock-data";
import { EventCard } from "@/components/EventCard";

export const Route = createFileRoute("/events")({
  head: () => ({ meta: [{ title: "Discover Events — Evntr" }] }),
  component: EventsPage,
});

const CATS: ("All" | EventCategory)[] = ["All", "Tech", "Music", "Conference", "Workshop", "Sports"];

function EventsPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<"All" | EventCategory>("All");
  const filtered = useMemo(
    () => EVENTS.filter((e) =>
      (cat === "All" || e.category === cat) &&
      (q === "" || e.title.toLowerCase().includes(q.toLowerCase()) || e.city.toLowerCase().includes(q.toLowerCase()))
    ),
    [q, cat]
  );

  return (
    <div className="space-y-8 pt-8">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <div className="font-mono text-xs uppercase tracking-[0.2em] text-orange-400">// catalog</div>
        <h1 className="mt-2 text-4xl font-bold md:text-5xl">Discover what's <span className="flame-text">happening</span></h1>
        <p className="mt-2 max-w-xl text-muted-foreground">Live inventory across {EVENTS.length} vendors. Filter, search, and lock your seat in a single tap.</p>
      </motion.div>

      <div className="glass flex flex-col gap-4 rounded-2xl p-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={q} onChange={(e) => setQ(e.target.value)}
            placeholder="Search events, cities..."
            className="w-full rounded-xl border border-white/10 bg-black/40 py-2.5 pl-10 pr-3 text-sm outline-none transition-colors focus:border-orange-500/50"
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto">
          <Filter className="h-4 w-4 shrink-0 text-orange-400" />
          {CATS.map((c) => (
            <button key={c} onClick={() => setCat(c)}
              className={`shrink-0 rounded-full border px-3 py-1.5 text-xs transition-all ${cat === c ? "flame-gradient border-transparent text-black font-semibold" : "border-white/10 text-muted-foreground hover:border-orange-500/40 hover:text-foreground"}`}>
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((e, i) => <EventCard key={e._id} event={e} index={i} />)}
      </div>
      {filtered.length === 0 && (
        <div className="glass rounded-2xl p-12 text-center text-muted-foreground">No events match those filters.</div>
      )}
    </div>
  );
}
