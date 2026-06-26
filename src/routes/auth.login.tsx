import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/auth/login")({ component: Login });

function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  return (
    <form onSubmit={async (e) => { e.preventDefault(); setBusy(true); await login(email, password); nav({ to: "/dashboard" }); }} className="space-y-5">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
        <p className="mt-1 text-sm text-muted-foreground">Sign in to manage tickets and follow organizers.</p>
      </div>
      <Field icon={Mail} label="Email" type="email" value={email} onChange={setEmail} required />
      <Field icon={Lock} label="Password" type="password" value={password} onChange={setPassword} required />
      <div className="flex justify-between text-xs">
        <Link to="/auth/forgot" className="text-orange-300 hover:text-orange-200">Forgot password?</Link>
        <Link to="/auth/register" className="text-muted-foreground hover:text-foreground">Create account</Link>
      </div>
      <button disabled={busy} className="flame-btn flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-sm disabled:opacity-50">
        {busy ? "Signing in..." : "Sign in"} <ArrowRight className="h-4 w-4" />
      </button>
      <div className="text-center text-[11px] text-muted-foreground">Mock auth — any email works.</div>
    </form>
  );
}

function Field({ icon: Icon, label, ...p }: { icon: any; label: string; type: string; value: string; onChange: (v: string) => void; required?: boolean }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs text-muted-foreground">{label}</span>
      <span className="relative block">
        <Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input type={p.type} required={p.required} value={p.value} onChange={(e) => p.onChange(e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-black/40 py-2.5 pl-10 pr-3 text-sm outline-none transition-colors focus:border-orange-500/50" />
      </span>
    </label>
  );
}
