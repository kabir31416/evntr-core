import { createFileRoute } from "@tanstack/react-router";
import { Panel } from "@/components/DashShell";
import { ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/organizer/settings")({ component: OrgSettings });

function OrgSettings() {
  return (
    <>
      <Panel title="Organization">
        <div className="grid gap-4 p-5 md:grid-cols-2">
          <Field label="Organization name" defaultValue="Nullbyte Labs" />
          <Field label="Public handle" defaultValue="@nullbyte" />
          <Field label="Contact email" defaultValue="hello@nullbyte.io" />
          <Field label="Country" defaultValue="Germany" />
        </div>
        <div className="border-t border-white/5 p-5 text-right"><button className="flame-btn rounded-xl px-5 py-2 text-sm">Save</button></div>
      </Panel>
      <Panel title="Verification">
        <div className="flex items-center gap-4 p-5">
          <div className="grid h-12 w-12 place-items-center rounded-xl bg-emerald-500/10 text-emerald-300"><ShieldCheck className="h-6 w-6" /></div>
          <div className="flex-1">
            <div className="font-medium">Verified organizer</div>
            <div className="text-xs text-muted-foreground">Your business documents are approved.</div>
          </div>
          <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-mono uppercase text-emerald-300">Verified</span>
        </div>
      </Panel>
      <Panel title="Payouts">
        <div className="grid gap-4 p-5 md:grid-cols-2">
          <Field label="Bank account" defaultValue="Deutsche Bank • ****4421" />
          <Field label="Payout schedule" defaultValue="Bi-weekly" />
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
