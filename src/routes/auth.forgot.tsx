import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/auth/forgot")({ component: Forgot });

function Forgot() {
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState("");
  return (
    <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-5">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Reset password</h1>
        <p className="mt-1 text-sm text-muted-foreground">We'll email you a secure reset link.</p>
      </div>
      <label className="block">
        <span className="mb-1.5 block text-xs text-muted-foreground">Email</span>
        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2.5 text-sm outline-none focus:border-orange-500/50" />
      </label>
      <button className="flame-btn w-full rounded-xl py-2.5 text-sm">Send reset link</button>
      {sent && <div className="rounded-lg border border-orange-500/30 bg-orange-500/10 p-3 text-xs text-orange-200">Check your inbox at {email} (mock).</div>}
      <div className="text-center text-xs text-muted-foreground">
        <Link to="/auth/login" className="text-orange-300">Back to sign in</Link>
      </div>
    </form>
  );
}
