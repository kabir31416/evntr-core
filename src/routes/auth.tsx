import { createFileRoute, Outlet, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { Sparkles } from "lucide-react";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [{ title: "Sign in — Evntr" }] }),
  component: AuthLayout,
});

function AuthLayout() {
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => { if (user) navigate({ to: "/dashboard" }); }, [user, navigate]);
  return (
    <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-md flex-col justify-center px-4 py-12">
      <Link to="/" className="mb-8 inline-flex items-center gap-2 self-center">
        <div className="grid h-9 w-9 place-items-center rounded-lg flame-gradient"><Sparkles className="h-4 w-4 text-black" strokeWidth={2.5} /></div>
        <span className="text-lg font-semibold">Evntr<span className="flame-text">.</span></span>
      </Link>
      <div className="glass rounded-2xl p-6 md:p-8">
        <Outlet />
      </div>
    </div>
  );
}
