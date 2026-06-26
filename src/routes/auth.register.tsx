import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { useAuth, type Role } from "@/lib/auth";

export const Route = createFileRoute("/auth/register")({ component: Register });

function Register() {
  const { register } = useAuth();
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("attendee");
  const [busy, setBusy] = useState(false);
  return (
    <form onSubmit={async (e) => { e.preventDefault(); setBusy(true); await register(name, email, password, role); nav({ to: role === "organizer" ? "/organizer" : "/dashboard" }); }} className="space-y-5">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Create your account</h1>
        <p className="mt-1 text-sm text-muted-foreground">Discover events or sell tickets as an organizer.</p>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {(["attendee","organizer"] as Role[]).map((r) => (
          <button type="button" key={r} onClick={() => setRole(r)}
            className={`rounded-xl border px-3 py-2.5 text-sm capitalize transition-all ${role === r ? "border-orange-500/50 bg-orange-500/10 text-orange-200" : "border-white/10 text-muted-foreground hover:border-white/20"}`}>
            {r === "attendee" ? "I'm an attendee" : "I'm an organizer"}
          </button>
        ))}
      </div>
      <Input label="Full name" value={name} onChange={setName} required />
      <Input label="Email" type="email" value={email} onChange={setEmail} required />
      <Input label="Password" type="password" value={password} onChange={setPassword} required />
      <button disabled={busy} className="flame-btn flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-sm disabled:opacity-50">
        {busy ? "Creating..." : "Create account"} <ArrowRight className="h-4 w-4" />
      </button>
      <div className="text-center text-xs text-muted-foreground">
        Already have an account? <Link to="/auth/login" className="text-orange-300">Sign in</Link>
      </div>
    </form>
  );
}

function Input({ label, ...p }: { label: string; type?: string; value: string; onChange: (v: string) => void; required?: boolean }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs text-muted-foreground">{label}</span>
      <input type={p.type ?? "text"} required={p.required} value={p.value} onChange={(e) => p.onChange(e.target.value)}
        className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2.5 text-sm outline-none transition-colors focus:border-orange-500/50" />
    </label>
  );
}
