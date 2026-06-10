import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Calendar, MapPin, Star, Users } from "lucide-react";
import type { EventDoc } from "@/lib/mock-data";
import { formatDate } from "@/lib/mock-data";

export function EventCard({ event, index = 0 }: { event: EventDoc; index?: number }) {
  const sold = event.tiers.reduce((a, t) => a + t.sold, 0);
  const cap = event.tiers.reduce((a, t) => a + t.total, 0);
  const pct = Math.round((sold / cap) * 100);
  const minPrice = Math.min(...event.tiers.map((t) => t.price));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      whileHover={{ y: -4 }}
    >
      <Link
        to="/events/$slug"
        params={{ slug: event.slug }}
        className="glass hover-neon group relative block overflow-hidden rounded-2xl"
      >
        <div className={`relative h-40 overflow-hidden bg-gradient-to-br ${event.cover}`}>
          <div className="absolute inset-0 mesh-overlay opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-black/40 px-2.5 py-1 text-xs font-mono backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-400 animate-pulse" />
            {event.category}
          </div>
          <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-black/40 px-2.5 py-1 text-xs backdrop-blur-md">
            <Star className="h-3 w-3 fill-orange-400 text-orange-400" />
            {event.rating}
          </div>
        </div>

        <div className="space-y-3 p-5">
          <h3 className="line-clamp-1 text-lg font-semibold transition-colors group-hover:text-orange-300">
            {event.title}
          </h3>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5 text-orange-400" />{formatDate(event.date)}</span>
            <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-orange-400" />{event.city}</span>
          </div>

          <div>
            <div className="mb-1.5 flex justify-between text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
              <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {sold.toLocaleString()} / {cap.toLocaleString()}</span>
              <span className="text-orange-300">{pct}% booked</span>
            </div>
            <div className="h-1 overflow-hidden rounded-full bg-white/5">
              <div className="h-full flame-gradient" style={{ width: `${pct}%` }} />
            </div>
          </div>

          <div className="flex items-end justify-between pt-1">
            <div>
              <div className="text-[10px] font-mono uppercase text-muted-foreground">From</div>
              <div className="text-xl font-bold flame-text">${minPrice}</div>
            </div>
            <span className="rounded-lg border border-orange-500/30 bg-orange-500/10 px-3 py-1.5 text-xs font-medium text-orange-300 transition-colors group-hover:bg-orange-500/20">
              View →
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
