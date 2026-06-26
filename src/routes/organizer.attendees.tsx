import { createFileRoute } from "@tanstack/react-router";
import { Panel, Stat } from "@/components/DashShell";
import { ATTENDEES } from "@/lib/mock-extras";
import { EVENTS } from "@/lib/mock-data";
import { CheckCircle2, Circle, QrCode } from "lucide-react";

export const Route = createFileRoute("/organizer/attendees")({ component: Attendees });

function Attendees() {
  const checkedIn = ATTENDEES.filter((a) => a.checkedIn).length;
  return (
    <>
      <div className="grid gap-4 md:grid-cols-3">
        <Stat label="Total attendees" value={String(ATTENDEES.length)} />
        <Stat label="Checked in" value={String(checkedIn)} delta={`${Math.round(checkedIn/ATTENDEES.length*100)}%`} />
        <Stat label="No-shows" value={String(ATTENDEES.length - checkedIn)} />
      </div>
      <Panel title="Attendee list" action={<button className="inline-flex items-center gap-1.5 rounded-lg border border-orange-500/40 bg-orange-500/10 px-3 py-1.5 text-xs text-orange-300"><QrCode className="h-3.5 w-3.5" />Scan QR</button>}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-white/[0.03] text-left text-[11px] uppercase tracking-wider text-muted-foreground">
              <tr><th className="px-5 py-3">Name</th><th className="px-5 py-3">Email</th><th className="px-5 py-3">Event</th><th className="px-5 py-3">Tier</th><th className="px-5 py-3">Status</th></tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {ATTENDEES.slice(0, 20).map((a) => {
                const evt = EVENTS.find((e) => e._id === a.eventId)!;
                return (
                  <tr key={a._id} className="hover:bg-white/[0.02]">
                    <td className="px-5 py-3">{a.name}</td>
                    <td className="px-5 py-3 text-muted-foreground">{a.email}</td>
                    <td className="px-5 py-3 text-muted-foreground">{evt.title}</td>
                    <td className="px-5 py-3">{a.tier}</td>
                    <td className="px-5 py-3">{a.checkedIn ? <span className="inline-flex items-center gap-1 text-emerald-300"><CheckCircle2 className="h-4 w-4" />Checked in</span> : <span className="inline-flex items-center gap-1 text-muted-foreground"><Circle className="h-4 w-4" />Pending</span>}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Panel>
    </>
  );
}
