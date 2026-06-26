import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { EVENTS, type EventDoc } from "@/lib/mock-data";
import { EventCard } from "@/components/EventCard";
import { MapPin, ShieldCheck, Users } from "lucide-react";

export const Route = createFileRoute("/organizers/$id")({
  head: ({ params }) => ({ meta: [{ title: `Organizer · ${params.id} — Evntr` }] }),
  loader: ({ params }): { events: EventDoc[]; name: string } => {
    const events = EVENTS.filter((e) => e.organizerId === params.id);
    if (events.length === 0) throw notFound();
    return { events, name: events[0].organizer };
  },
  notFoundComponent: () => <div className="mx-auto max-w-7xl px-4 pt-20 text-center text-muted-foreground">Organizer not found.</div>,
  component: OrganizerProfile,
});

function OrganizerProfile() {
  const { events, name } = Route.useLoaderData();
  const totalSold = events.reduce((a, e) => a + e.tiers.reduce((b, t) => b + t.sold, 0), 0);
  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 pt-12 sm:px-6 lg:px-8">
      <div className="glass relative overflow-hidden rounded-2xl p-8 md:p-12">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-orange-600/20 via-transparent to-red-600/10" />
        <div className="flex flex-wrap items-center gap-6">
          <div className="grid h-20 w-20 place-items-center rounded-2xl flame-gradient text-2xl font-semibold text-black">{name.split(" ").map(n => n[0]).join("")}</div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">{name}</h1>
              <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-mono uppercase text-emerald-300"><ShieldCheck className="h-3 w-3" />Verified</span>
            </div>
            <div className="mt-2 flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1"><MapPin className="h-4 w-4 text-orange-400" />{events[0].city}</span>
              <span className="inline-flex items-center gap-1"><Users className="h-4 w-4 text-orange-400" />{totalSold.toLocaleString()} tickets sold</span>
              <span>{events.length} live events</span>
            </div>
          </div>
          <Link to="/events" className="flame-btn rounded-xl px-5 py-2.5 text-sm">Follow</Link>
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Events by {name}</h2>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {events.map((e, i) => <EventCard key={e._id} event={e} index={i} />)}
        </div>
      </div>
    </div>
  );
}
