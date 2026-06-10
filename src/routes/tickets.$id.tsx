import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { QRCodeSVG } from "qrcode.react";
import { motion } from "framer-motion";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { TICKETS, EVENTS, formatDate } from "@/lib/mock-data";

export const Route = createFileRoute("/tickets/$id")({
  loader: ({ params }) => {
    const ticket = TICKETS.find((t) => t._id === params.id);
    if (!ticket) throw notFound();
    const event = EVENTS.find((e) => e._id === ticket.eventId)!;
    const tier = event.tiers.find((t) => t.id === ticket.tierId)!;
    return { ticket, event, tier };
  },
  notFoundComponent: () => (
    <div className="glass mx-auto mt-20 max-w-md rounded-2xl p-10 text-center">
      <h2 className="text-2xl font-bold">Ticket not found</h2>
      <Link to="/tickets" className="mt-4 inline-block text-orange-400 hover:underline">← My tickets</Link>
    </div>
  ),
  component: TicketPage,
});

function TicketPage() {
  const { ticket, event, tier } = Route.useLoaderData();
  return (
    <div className="mx-auto max-w-md space-y-6 pt-8">
      <Link to="/tickets" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-orange-400"><ArrowLeft className="h-4 w-4" /> My tickets</Link>

      <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
        className="glass-strong relative overflow-hidden rounded-3xl p-8 neon-border">
        <div className="absolute -top-20 -right-20 h-48 w-48 rounded-full bg-orange-500/30 blur-3xl" />

        <div className="relative space-y-6 text-center">
          <div className="font-mono text-xs uppercase tracking-[0.25em] text-orange-300">// boarding pass</div>
          <h1 className="text-2xl font-bold">{event.title}</h1>
          <div className="text-xs text-muted-foreground">{formatDate(event.date)} · {event.venue}, {event.city}</div>

          <div className="mx-auto inline-block rounded-2xl bg-white p-4">
            <QRCodeSVG value={ticket.code} size={200} bgColor="#ffffff" fgColor="#060608" level="H" />
          </div>

          <div className="font-mono text-[11px] tracking-wider text-orange-300 break-all">{ticket.code}</div>

          <div className="grid grid-cols-3 gap-3 border-t border-dashed border-white/15 pt-5 text-left">
            <Stat label="Tier" value={tier.name} />
            <Stat label="Price" value={`$${tier.price}`} />
            <Stat label="Issued" value={new Date(ticket.issuedAt).toLocaleTimeString()} />
          </div>

          <div className="flex items-center justify-center gap-2 text-xs text-orange-300"><ShieldCheck className="h-4 w-4" /> Signed · verifiable at gate</div>
        </div>
      </motion.div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="font-mono text-[10px] uppercase text-muted-foreground">{label}</div>
      <div className="text-sm font-medium">{value}</div>
    </div>
  );
}
