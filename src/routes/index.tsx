import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ShieldCheck, Zap, Lock, QrCode, TrendingUp, Layers, ArrowRight, Activity } from "lucide-react";
import { FaXTwitter, FaGithub, FaDiscord, FaLinkedin } from "react-icons/fa6";
import { EVENTS, aggregate } from "@/lib/mock-data";
import { EventCard } from "@/components/EventCard";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title: "Evntr — Multi-Vendor Event Ticketing" }] }),
  component: Landing,
});

function Landing() {
  const featured = EVENTS.filter((e) => e.featured);
  const byCategory = aggregate([{ $group: { _id: "$category", count: { $sum: 1 } } }]) as { _id: string; count: number; revenue: number }[];
  const totalRevenue = byCategory.reduce((a, c) => a + c.revenue, 0);
  const totalEvents = EVENTS.length;
  const totalTickets = EVENTS.reduce((a, e) => a + e.tiers.reduce((b, t) => b + t.sold, 0), 0);

  return (
    <div className="space-y-24">
      {/* HERO */}
      <section className="relative pt-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/5 px-3 py-1 text-xs font-mono uppercase tracking-wider text-orange-300">
            <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75" /><span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500" /></span>
            Mutex-safe booking engine · live
          </div>
          <h1 className="text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl">
            Sell-out events,<br />
            <span className="flame-text">zero race conditions.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base text-muted-foreground md:text-lg">
            Evntr is the multi-vendor ticketing platform engineered for cyber summits, festivals, and high-velocity launches. Concurrency-safe seat locks. Verifiable QR tickets. Real-time vendor analytics.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link to="/events" className="flame-btn group flex items-center gap-2 rounded-xl px-6 py-3">
              Discover Events <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link to="/organizer" className="glass hover-neon rounded-xl px-6 py-3 text-sm font-medium">
              Organizer Console
            </Link>
          </div>
        </motion.div>

        {/* Stat bento */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-4"
        >
          <Stat icon={<Activity />} label="Events Live" value={totalEvents.toString()} />
          <Stat icon={<QrCode />} label="QR Tickets Issued" value={totalTickets.toLocaleString()} />
          <Stat icon={<TrendingUp />} label="GMV Routed" value={`$${(totalRevenue / 1000).toFixed(1)}k`} />
          <Stat icon={<Lock />} label="Race Conditions" value="0" highlight />
        </motion.div>
      </section>

      {/* FEATURED */}
      <section>
        <SectionHeader eyebrow="Trending" title="Featured drops" subtitle="Aggregated from the vendor pipeline in real time." />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((e, i) => <EventCard key={e._id} event={e} index={i} />)}
          {EVENTS.filter((e) => !e.featured).slice(0, 1).map((e, i) => <EventCard key={e._id} event={e} index={i + featured.length} />)}
        </div>
      </section>

      {/* BENTO FEATURES */}
      <section>
        <SectionHeader eyebrow="Architecture" title="Built like infrastructure" subtitle="Every primitive a vendor needs, wired with concurrency-safe defaults." />
        <div className="grid gap-4 md:grid-cols-6 md:grid-rows-2">
          <Feature className="md:col-span-3 md:row-span-2" icon={<Lock />} title="Mutex invariant seat locks"
            body="Per-tier critical sections guarantee sold ≤ total. No oversold seats, ever — even under a flash-sale stampede.">
            <CodeBlock />
          </Feature>
          <Feature className="md:col-span-3" icon={<QrCode />} title="Verifiable QR tickets" body="Cryptographically signed codes scan-validate at the door in under 200ms." />
          <Feature className="md:col-span-2" icon={<Layers />} title="Aggregation pipelines" body="$match, $group, $sort — the same query model you already use." />
          <Feature className="md:col-span-1" icon={<Zap />} title="Edge-fast" body="P95 < 60ms." />
        </div>
      </section>

      {/* TRUST */}
      <section className="glass-strong relative overflow-hidden rounded-3xl p-10 md:p-14">
        <div className="absolute -top-32 -right-20 h-72 w-72 rounded-full bg-orange-500/20 blur-3xl" />
        <div className="relative grid items-center gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold md:text-4xl">Vendors ship faster on Evntr.</h2>
            <p className="mt-3 text-muted-foreground">Spin up an event in 4 clicks. Track inventory in real time. Verify attendees with a QR scan. The whole stack — composable, observable, and ruthlessly fast.</p>
            <div className="mt-6 flex gap-3">
              <Link to="/organizer" className="flame-btn rounded-xl px-5 py-2.5 text-sm">Open Console</Link>
              <Link to="/events" className="glass hover-neon rounded-xl px-5 py-2.5 text-sm">Browse Events</Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[ShieldCheck, Lock, QrCode, Layers].map((Icon, i) => (
              <div key={i} className="glass flex items-center gap-3 rounded-xl p-4">
                <Icon className="h-5 w-5 text-orange-400" />
                <span className="text-sm">{["PCI-ready", "Atomic locks", "Signed QR", "Mongo-style queries"][i]}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="flex flex-wrap items-center justify-between gap-4 border-t border-white/5 pt-8 text-sm text-muted-foreground">
        <div>Join the operator community</div>
        <div className="flex gap-4">
          <a href="#" className="transition-colors hover:text-orange-400"><FaXTwitter className="h-5 w-5" /></a>
          <a href="#" className="transition-colors hover:text-orange-400"><FaGithub className="h-5 w-5" /></a>
          <a href="#" className="transition-colors hover:text-orange-400"><FaDiscord className="h-5 w-5" /></a>
          <a href="#" className="transition-colors hover:text-orange-400"><FaLinkedin className="h-5 w-5" /></a>
        </div>
      </section>
    </div>
  );
}

function Stat({ icon, label, value, highlight }: { icon: React.ReactNode; label: string; value: string; highlight?: boolean }) {
  return (
    <div className={`glass relative overflow-hidden rounded-2xl p-5 ${highlight ? "neon-border" : ""}`}>
      <div className="flex items-center justify-between">
        <div className="text-orange-400">{icon}</div>
        <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">live</div>
      </div>
      <div className="mt-3 text-3xl font-bold tracking-tight">{value}</div>
      <div className="mt-1 text-xs text-muted-foreground">{label}</div>
    </div>
  );
}

function SectionHeader({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
  return (
    <div className="mb-8 flex flex-col items-start justify-between gap-3 md:flex-row md:items-end">
      <div>
        <div className="font-mono text-xs uppercase tracking-[0.2em] text-orange-400">// {eyebrow}</div>
        <h2 className="mt-2 text-3xl font-bold md:text-4xl">{title}</h2>
      </div>
      <p className="max-w-md text-sm text-muted-foreground">{subtitle}</p>
    </div>
  );
}

function Feature({ icon, title, body, children, className = "" }: { icon: React.ReactNode; title: string; body: string; children?: React.ReactNode; className?: string }) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      className={`glass hover-neon relative overflow-hidden rounded-2xl p-6 ${className}`}
    >
      <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg flame-gradient text-black">{icon}</div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-1.5 text-sm text-muted-foreground">{body}</p>
      {children}
    </motion.div>
  );
}

function CodeBlock() {
  return (
    <pre className="mt-5 overflow-hidden rounded-xl border border-orange-500/20 bg-black/60 p-4 font-mono text-[11px] leading-relaxed">
{`await seatMutex.acquire(\`\${eventId}:\${tierId}\`, async () => {
  if (tier.sold >= tier.total) throw new SoldOut();
  tier.sold += 1;                    // invariant: sold <= total
  return issueSignedQR(buyer);       // atomic critical section
});`}
    </pre>
  );
}
