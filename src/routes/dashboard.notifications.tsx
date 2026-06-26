import { createFileRoute } from "@tanstack/react-router";
import { Panel } from "@/components/DashShell";
import { NOTIFICATIONS } from "@/lib/mock-extras";
import { Bell } from "lucide-react";

export const Route = createFileRoute("/dashboard/notifications")({ component: Notifs });

function Notifs() {
  return (
    <Panel title="Notifications">
      <div className="divide-y divide-white/5">
        {NOTIFICATIONS.map((n) => (
          <div key={n.id} className="flex items-start gap-4 p-5">
            <div className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg ${n.unread ? "flame-gradient text-black" : "border border-white/10 text-muted-foreground"}`}><Bell className="h-4 w-4" /></div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div className="font-medium">{n.title}</div>
                <div className="text-[11px] text-muted-foreground">{n.at}</div>
              </div>
              <div className="mt-0.5 text-sm text-muted-foreground">{n.body}</div>
            </div>
          </div>
        ))}
      </div>
    </Panel>
  );
}
