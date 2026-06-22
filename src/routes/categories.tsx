import { createFileRoute, Link } from "@tanstack/react-router";
import { Music, Briefcase, Trophy, Wrench, PartyPopper, Mic2, Users, Globe } from "lucide-react";

export const Route = createFileRoute("/categories")({
  head: () => ({ meta: [{ title: "Categories — Evntr" }, { name: "description", content: "Browse events by category — concerts, business, sports, workshops and more." }] }),
  component: CategoriesPage,
});

const CATS = [
  { name: "Concerts", icon: Music, count: "12.4k" },
  { name: "Business", icon: Briefcase, count: "8.1k" },
  { name: "Sports", icon: Trophy, count: "5.7k" },
  { name: "Workshops", icon: Wrench, count: "9.3k" },
  { name: "Festivals", icon: PartyPopper, count: "2.2k" },
  { name: "Conferences", icon: Mic2, count: "6.8k" },
  { name: "Networking", icon: Users, count: "4.5k" },
  { name: "Online Events", icon: Globe, count: "11.0k" },
];

function CategoriesPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-10 px-4 pt-8 sm:px-6 lg:px-8">
      <div>
        <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-orange-400">// browse</div>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl">All categories</h1>
        <p className="mt-2 max-w-xl text-muted-foreground">Find what you love. Eight verticals, thousands of events, one platform.</p>
      </div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {CATS.map((c) => (
          <Link key={c.name} to="/events"
            className="group relative overflow-hidden rounded-2xl border border-white/8 bg-white/[0.02] p-5 transition-all hover:border-orange-500/40 hover:bg-white/[0.04]">
            <c.icon className="h-5 w-5 text-orange-400" />
            <div className="mt-4 text-base font-medium">{c.name}</div>
            <div className="mt-1 text-xs text-muted-foreground">{c.count} events</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
