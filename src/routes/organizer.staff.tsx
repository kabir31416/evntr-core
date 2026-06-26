import { createFileRoute } from "@tanstack/react-router";
import { Panel } from "@/components/DashShell";
import { STAFF } from "@/lib/mock-extras";
import { Plus, Mail } from "lucide-react";

export const Route = createFileRoute("/organizer/staff")({ component: StaffPage });

function StaffPage() {
  return (
    <Panel title="Team" action={<button className="flame-btn inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs"><Plus className="h-3.5 w-3.5" />Invite</button>}>
      <div className="divide-y divide-white/5">
        {STAFF.map((s) => (
          <div key={s._id} className="flex items-center gap-4 p-5">
            <div className="grid h-10 w-10 place-items-center rounded-full flame-gradient text-sm font-semibold text-black">{s.name.split(" ").map(n=>n[0]).join("")}</div>
            <div className="flex-1">
              <div className="font-medium">{s.name}</div>
              <div className="text-xs text-muted-foreground">{s.email}</div>
            </div>
            <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-mono uppercase text-muted-foreground">{s.role}</span>
            <button className="rounded-lg border border-white/10 p-2 hover:border-orange-500/40"><Mail className="h-4 w-4" /></button>
          </div>
        ))}
      </div>
    </Panel>
  );
}
