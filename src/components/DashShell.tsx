import { Link, useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

export interface NavItem { to: string; label: string; icon: LucideIcon }

export function DashShell({
  title, subtitle, nav, children, headerRight,
}: { title: string; subtitle: string; nav: NavItem[]; children: ReactNode; headerRight?: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-orange-400">// {subtitle}</div>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight md:text-4xl">{title}</h1>
        </div>
        {headerRight}
      </div>
      <div className="grid gap-6 md:grid-cols-[220px_1fr]">
        <aside className="glass h-fit rounded-2xl p-2 md:sticky md:top-20">
          <nav className="flex flex-row gap-1 overflow-x-auto md:flex-col">
            {nav.map((n) => {
              const active = pathname === n.to || (n.to !== "/" && pathname.startsWith(n.to + "/"));
              return (
                <Link key={n.to} to={n.to}
                  className={`flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${active ? "bg-orange-500/15 text-orange-300" : "text-muted-foreground hover:bg-white/5 hover:text-foreground"}`}>
                  <n.icon className="h-4 w-4" />
                  <span>{n.label}</span>
                </Link>
              );
            })}
          </nav>
        </aside>
        <section className="space-y-6 min-w-0">{children}</section>
      </div>
    </div>
  );
}

export function Panel({ title, action, children }: { title?: string; action?: ReactNode; children: ReactNode }) {
  return (
    <div className="glass overflow-hidden rounded-2xl">
      {(title || action) && (
        <div className="flex items-center justify-between border-b border-white/5 p-5">
          {title && <h2 className="text-sm font-semibold">{title}</h2>}
          {action}
        </div>
      )}
      <div>{children}</div>
    </div>
  );
}

export function Stat({ label, value, delta }: { label: string; value: string; delta?: string }) {
  return (
    <div className="glass hover-neon rounded-2xl p-5">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="mt-2 text-2xl font-semibold">{value}</div>
      {delta && <div className="mt-1 font-mono text-[11px] text-orange-300">{delta}</div>}
    </div>
  );
}
