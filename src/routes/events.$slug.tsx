import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Star, Users, Lock, CheckCircle2, ArrowLeft, Loader2 } from "lucide-react";
import { EVENTS, bookSeat, formatDate, type TicketDoc, type EventDoc } from "@/lib/mock-data";

export const Route = createFileRoute("/events/$slug")({
  loader: ({ params }): { event: EventDoc } => {
    const event = EVENTS.find((e) => e.slug === params.slug);
    if (!event) throw notFound();
    return { event };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.event.title ?? "Event"} — Evntr` },
      { name: "description", content: loaderData?.event.description ?? "" },
    ],
  }),
  notFoundComponent: () => (
    <div className="glass mx-auto mt-20 max-w-md rounded-2xl p-10 text-center">
      <h2 className="text-2xl font-bold">Event not found</h2>
      <Link to="/events" className="mt-4 inline-block text-orange-400 hover:underline">← Back to events</Link>
    </div>
  ),
  component: EventDetail,
});

function EventDetail() {
  const { event } = Route.useLoaderData();
  const [selected, setSelected] = useState(event.tiers[0].id);
  const [loading, setLoading] = useState(false);
  const [ticket, setTicket] = useState<TicketDoc | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const tier = event.tiers.find((t) => t.id === selected)!;
  const left = tier.total - tier.sold;

  async function handleBook() {
    setLoading(true); setErr(null);
    const res = await bookSeat(event._id, selected, "guest_user");
    setLoading(false);
    if (res.ok && res.ticket) setTicket(res.ticket);
    else setErr(res.reason ?? "Booking failed");
  }

  return (
    <div className="space-y-8 pt-4">
      <Link to="/events" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-orange-400"><ArrowLeft className="h-4 w-4" /> All events</Link>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className={`relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br ${event.cover} p-10 md:p-14`}>
        <div className="absolute inset-0 mesh-overlay opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
        <div className="relative">
          <div className="inline-flex items-center gap-2 rounded-full bg-black/40 px-3 py-1 text-xs font-mono backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-400 animate-pulse" />
            {event.category} · by {event.organizer}
          </div>
          <h1 className="mt-4 text-4xl font-bold md:text-6xl">{event.title}</h1>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <span className="flex items-center gap-2"><Calendar className="h-4 w-4 text-orange-300" />{formatDate(event.date)}</span>
            <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-orange-300" />{event.venue}, {event.city}</span>
            <span className="flex items-center gap-2"><Star className="h-4 w-4 fill-orange-300 text-orange-300" />{event.rating}</span>
            <span className="flex items-center gap-2"><Users className="h-4 w-4 text-orange-300" />{event.views.toLocaleString()} views</span>
          </div>
        </div>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="space-y-6 md:col-span-2">
          <div className="glass rounded-2xl p-6">
            <h2 className="text-lg font-semibold">About this event</h2>
            <p className="mt-2 text-muted-foreground">{event.description}</p>
          </div>
          <div className="glass rounded-2xl p-6">
            <h2 className="text-lg font-semibold">Inventory pipeline</h2>
            <div className="mt-4 space-y-3">
              {event.tiers.map((t) => {
                const pct = (t.sold / t.total) * 100;
                return (
                  <div key={t.id}>
                    <div className="mb-1 flex justify-between text-sm"><span>{t.name}</span><span className="font-mono text-xs text-muted-foreground">{t.sold}/{t.total}</span></div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-white/5"><div className="h-full flame-gradient" style={{ width: `${pct}%` }} /></div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Booking */}
        <div className="glass-strong sticky top-28 h-fit space-y-4 rounded-2xl p-6 neon-border">
          {!ticket ? (
            <>
              <div>
                <div className="font-mono text-xs uppercase tracking-wider text-orange-400">Select tier</div>
                <div className="mt-3 space-y-2">
                  {event.tiers.map((t) => {
                    const remaining = t.total - t.sold;
                    const isSel = selected === t.id;
                    const out = remaining <= 0;
                    return (
                      <button key={t.id} disabled={out} onClick={() => setSelected(t.id)}
                        className={`w-full rounded-xl border p-3 text-left transition-all ${isSel ? "border-orange-500/60 bg-orange-500/10" : "border-white/10 hover:border-orange-500/30"} ${out ? "opacity-40" : ""}`}>
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{t.name}</span>
                          <span className="font-mono text-sm flame-text font-bold">${t.price}</span>
                        </div>
                        <div className="mt-0.5 text-xs text-muted-foreground">{out ? "Sold out" : `${remaining} left`}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-xl border border-orange-500/20 bg-orange-500/5 p-3 text-xs">
                <div className="flex items-center gap-2 font-mono text-orange-300"><Lock className="h-3.5 w-3.5" /> mutex.acquire("{event._id}:{selected}")</div>
                <div className="mt-1 text-muted-foreground">Atomic seat allocation. Sold-out checks happen inside the critical section.</div>
              </div>

              <button onClick={handleBook} disabled={loading || left <= 0}
                className="flame-btn flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm disabled:opacity-50">
                {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Acquiring lock...</> : `Book ${tier.name} · $${tier.price}`}
              </button>
              {err && <div className="rounded-lg bg-red-500/10 p-2 text-center text-xs text-red-300">{err}</div>}
            </>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-3 text-center">
              <CheckCircle2 className="mx-auto h-10 w-10 text-orange-400" />
              <div className="text-lg font-semibold">Ticket issued</div>
              <div className="font-mono text-xs text-muted-foreground break-all">{ticket.code}</div>
              <Link to="/tickets/$id" params={{ id: ticket._id }} className="flame-btn block rounded-xl px-5 py-2.5 text-sm">View QR Ticket</Link>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
