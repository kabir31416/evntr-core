import { createFileRoute, Link } from "@tanstack/react-router";
import { Ticket as TicketIcon, ArrowRight } from "lucide-react";
import { TICKETS, EVENTS, formatDate } from "@/lib/mock-data";

export const Route = createFileRoute("/tickets")({
  head: () => ({ meta: [{ title: "My Tickets — Evntr" }] }),
  component: TicketsPage,
});

function TicketsPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 pt-8 sm:px-6 lg:px-8">
      <div>
        <div className="font-mono text-xs uppercase tracking-[0.2em] text-orange-400">// wallet</div>
        <h1 className="mt-2 text-4xl font-bold md:text-5xl">Your <span className="flame-text">tickets</span></h1>
      </div>
      {TICKETS.length === 0 ? (
        <div className="glass rounded-2xl p-12 text-center">
          <TicketIcon className="mx-auto h-10 w-10 text-orange-400" />
          <div className="mt-3 text-lg font-semibold">No tickets yet</div>
          <p className="mt-1 text-sm text-muted-foreground">Book your first seat to unlock a verifiable QR ticket.</p>
          <Link to="/events" className="flame-btn mt-5 inline-block rounded-xl px-5 py-2.5 text-sm">Browse Events</Link>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {TICKETS.map((t) => {
            const evt = EVENTS.find((e) => e._id === t.eventId)!;
            return (
              <Link key={t._id} to="/tickets/$id" params={{ id: t._id }} className="glass hover-neon flex items-center justify-between rounded-2xl p-5">
                <div>
                  <div className="text-lg font-semibold">{evt.title}</div>
                  <div className="text-xs text-muted-foreground">{formatDate(evt.date)} · {evt.city}</div>
                  <div className="mt-2 font-mono text-[11px] text-orange-300">{t.code}</div>
                </div>
                <ArrowRight className="h-5 w-5 text-orange-400" />
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
