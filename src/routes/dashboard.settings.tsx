import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Panel } from "@/components/DashShell";
import { useAuth } from "@/lib/auth";
import { LogOut } from "lucide-react";

export const Route = createFileRoute("/dashboard/settings")({ component: SettingsPage });

function SettingsPage() {
  const { user, logout } = useAuth();
  const nav = useNavigate();
  return (
    <>
      <Panel title="Profile">
        <div className="grid gap-4 p-5 md:grid-cols-2">
          <Field label="Full name" defaultValue={user?.name ?? ""} />
          <Field label="Email" defaultValue={user?.email ?? ""} />
          <Field label="Country" defaultValue="United States" />
          <Field label="Timezone" defaultValue="UTC−05:00" />
        </div>
        <div className="border-t border-white/5 p-5 text-right">
          <button className="flame-btn rounded-xl px-5 py-2 text-sm">Save changes</button>
        </div>
      </Panel>
      <Panel title="Preferences">
        <div className="space-y-3 p-5 text-sm">
          {["Email reminders","Push notifications","Marketing emails","SMS alerts"].map((p) => (
            <label key={p} className="flex items-center justify-between rounded-lg border border-white/5 px-4 py-3">
              <span>{p}</span>
              <input type="checkbox" defaultChecked className="h-4 w-4 accent-orange-500" />
            </label>
          ))}
        </div>
      </Panel>
      <Panel title="Account">
        <div className="flex items-center justify-between p-5">
          <div className="text-sm text-muted-foreground">Sign out of this device.</div>
          <button onClick={() => { logout(); nav({ to: "/" }); }} className="inline-flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm text-red-300 hover:bg-red-500/20"><LogOut className="h-4 w-4" />Sign out</button>
        </div>
      </Panel>
    </>
  );
}

function Field({ label, defaultValue }: { label: string; defaultValue: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs text-muted-foreground">{label}</span>
      <input defaultValue={defaultValue} className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2.5 text-sm outline-none focus:border-orange-500/50" />
    </label>
  );
}
