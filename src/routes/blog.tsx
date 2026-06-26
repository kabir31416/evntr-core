import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock } from "lucide-react";

export const Route = createFileRoute("/blog")({
  head: () => ({ meta: [
    { title: "Blog — Evntr" },
    { name: "description", content: "Playbooks, product updates, and case studies from the Evntr team." },
  ]}),
  component: Blog,
});

const POSTS = [
  { slug: "scaling-checkout", title: "How we keep checkout under 80ms at 50k RPS", excerpt: "A look at the mutex-protected seat-locking layer powering Evntr at peak demand.", tag: "Engineering", read: "8 min", cover: "from-orange-500 to-red-600" },
  { slug: "festival-playbook", title: "The 2026 festival operator's playbook", excerpt: "Lessons from 80+ multi-stage events about pricing, gate flow, and refunds.", tag: "Playbook", read: "12 min", cover: "from-amber-500 to-pink-600" },
  { slug: "ai-fraud", title: "Catching ticket fraud with anomaly detection", excerpt: "How our ML pipeline flags suspicious checkout patterns in milliseconds.", tag: "Product", read: "6 min", cover: "from-yellow-400 to-orange-500" },
  { slug: "global-payouts", title: "Shipping global payouts in 38 currencies", excerpt: "Behind the scenes of Evntr's new multi-rail payout engine.", tag: "Engineering", read: "9 min", cover: "from-red-500 to-orange-400" },
  { slug: "luma-comparison", title: "Why we built Evntr (and not just used Luma)", excerpt: "On the gap between consumer event tools and pro-grade ticketing.", tag: "Company", read: "5 min", cover: "from-orange-600 to-yellow-500" },
  { slug: "organizer-toolkit", title: "Shipping the new organizer toolkit", excerpt: "Bento dashboards, drag-and-drop tier builder, and live attendance.", tag: "Product", read: "7 min", cover: "from-orange-400 to-red-500" },
];

function Blog() {
  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 pt-12 sm:px-6 lg:px-8">
      <div>
        <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-orange-400">// journal</div>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl">Notes from the platform.</h1>
      </div>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {POSTS.map((p) => (
          <Link key={p.slug} to="/blog" className="group glass overflow-hidden rounded-2xl hover-neon">
            <div className={`h-40 bg-gradient-to-br ${p.cover}`} />
            <div className="p-5">
              <div className="flex items-center gap-3 text-[10px] font-mono uppercase tracking-wider text-orange-300">
                <span>{p.tag}</span><span className="text-muted-foreground">·</span><span className="inline-flex items-center gap-1 text-muted-foreground"><Clock className="h-3 w-3" />{p.read}</span>
              </div>
              <h3 className="mt-2 text-lg font-semibold transition-colors group-hover:text-orange-300">{p.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{p.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
