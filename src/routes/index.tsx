import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight, Search, MapPin, Calendar, Tag, Star,
  QrCode, Globe2, BarChart3, Building2,
  Music, Briefcase, Trophy, Wrench, PartyPopper, Mic2, Users, Globe,
  Check, TrendingUp,
} from "lucide-react";
import { FaXTwitter, FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa6";
import { EVENTS, formatDate } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Evntr — Discover, Book & Host Extraordinary Events" },
      { name: "description", content: "Evntr is the multi-vendor ticketing platform for modern event organizers. Discover events, book seats in seconds, and run sold-out shows worldwide." },
      { property: "og:title", content: "Evntr — Discover, Book & Host Extraordinary Events" },
      { property: "og:description", content: "Multi-vendor event ticketing built for global organizers." },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div>
      <Hero />
      <TrustedBy />
      <Categories />
      <Trending />
      <WhyEvntr />
      <DashboardShowcase />
      <Stats />
      <Testimonials />
      <PricingPreview />
      <FinalCTA />
      <Footer />
    </div>
  );
}

/* ─────────────────────────── HERO ─────────────────────────── */

function Hero() {
  const featured = EVENTS.slice(0, 3);
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto w-[min(1240px,94%)] pb-24 pt-20 md:pt-28">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Copy + search */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11.5px] text-muted-foreground"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-orange-500" />
              </span>
              <span>Now serving 130+ countries</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.05 }}
              className="mt-5 text-[40px] font-semibold leading-[1.05] tracking-[-0.03em] md:text-[64px]"
            >
              Discover, Book & Host<br />
              <span className="flame-text">Extraordinary Events</span><br />
              Worldwide.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }}
              className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted-foreground md:text-base"
            >
              The multi-vendor ticketing platform built for the next generation of organizers.
              Find your next experience, or launch one — with concurrency-safe seats and global payouts.
            </motion.p>

            {/* Search bar */}
            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.25 }}
              className="mt-7 rounded-2xl border border-white/10 bg-[#0b0b0f]/80 p-1.5 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)] backdrop-blur-xl"
            >
              <div className="grid grid-cols-1 gap-1 sm:grid-cols-[1.3fr_1fr_1fr_auto]">
                <SearchField icon={<Search className="h-4 w-4" />} placeholder="Event name" />
                <SearchField icon={<MapPin className="h-4 w-4" />} placeholder="Location" />
                <SearchField icon={<Calendar className="h-4 w-4" />} placeholder="Any date" />
                <Link
                  to="/events"
                  className="m-0.5 inline-flex items-center justify-center gap-1.5 rounded-xl bg-white px-5 py-2.5 text-[13.5px] font-medium text-black transition-colors hover:bg-white/90"
                >
                  Search
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.35 }}
              className="mt-6 flex flex-wrap items-center gap-3"
            >
              <Link to="/events" className="group inline-flex items-center gap-2 rounded-lg flame-gradient px-4 py-2.5 text-sm font-medium text-black">
                Explore Events <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link to="/organizers" className="rounded-lg border border-white/10 px-4 py-2.5 text-sm font-medium hover:bg-white/5">
                Become an Organizer
              </Link>
              <div className="ml-1 flex items-center gap-1 text-xs text-muted-foreground">
                <Star className="h-3.5 w-3.5 fill-orange-400 text-orange-400" />
                4.9 from 12k+ organizers
              </div>
            </motion.div>
          </div>

          {/* Hero visual: stacked dashboard-style event cards */}
          <HeroVisual featured={featured} />
        </div>
      </div>
    </section>
  );
}

function SearchField({ icon, placeholder }: { icon: React.ReactNode; placeholder: string }) {
  return (
    <div className="flex items-center gap-2 rounded-xl px-3.5 py-2.5 transition-colors hover:bg-white/[0.03]">
      <span className="text-muted-foreground">{icon}</span>
      <input
        placeholder={placeholder}
        className="w-full bg-transparent text-[13.5px] outline-none placeholder:text-muted-foreground/70"
      />
    </div>
  );
}

function HeroVisual({ featured }: { featured: typeof EVENTS }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.2 }}
      className="relative mx-auto h-[440px] w-full max-w-md md:h-[520px]"
    >
      {/* Ambient halo */}
      <div className="absolute -inset-10 -z-10 rounded-[40px] bg-[radial-gradient(circle_at_50%_40%,rgba(255,90,20,0.25),transparent_60%)] blur-2xl" />

      {/* Back card */}
      <motion.div
        animate={{ y: [0, -6, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-0 top-6 w-[78%] rounded-2xl border border-white/8 bg-[#0e0e13]/90 p-4 shadow-2xl backdrop-blur"
      >
        <MiniEventRow event={featured[1]} />
      </motion.div>

      {/* Mid card */}
      <motion.div
        animate={{ y: [0, 6, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
        className="absolute left-0 top-28 w-[78%] rounded-2xl border border-white/10 bg-[#0e0e13]/95 p-4 shadow-2xl backdrop-blur"
      >
        <MiniEventRow event={featured[2]} />
      </motion.div>

      {/* Front feature card */}
      <motion.div
        animate={{ y: [0, -8, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
        className="absolute bottom-0 right-4 w-[88%] overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b10] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]"
      >
        <div className={`relative h-32 bg-gradient-to-br ${featured[0].cover}`}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.25),transparent_60%)]" />
          <div className="absolute left-3 top-3 rounded-md bg-black/40 px-2 py-0.5 text-[10px] font-medium backdrop-blur">
            {featured[0].category}
          </div>
          <div className="absolute right-3 top-3 flex items-center gap-1 rounded-md bg-black/40 px-2 py-0.5 text-[10px] backdrop-blur">
            <Star className="h-3 w-3 fill-orange-300 text-orange-300" /> {featured[0].rating}
          </div>
        </div>
        <div className="space-y-3 p-4">
          <div>
            <div className="text-[15px] font-semibold leading-tight">{featured[0].title}</div>
            <div className="mt-1 flex items-center gap-3 text-[11px] text-muted-foreground">
              <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {formatDate(featured[0].date)}</span>
              <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {featured[0].city}</span>
            </div>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">From</div>
              <div className="flame-text text-lg font-semibold">${Math.min(...featured[0].tiers.map(t => t.price))}</div>
            </div>
            <div className="rounded-md bg-white px-3 py-1.5 text-[11px] font-medium text-black">Book Now</div>
          </div>
        </div>
      </motion.div>

      {/* Floating metric chip */}
      <motion.div
        animate={{ y: [0, -4, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-4 top-4 flex items-center gap-2 rounded-xl border border-white/10 bg-[#0b0b10]/90 px-3 py-2 shadow-xl backdrop-blur"
      >
        <div className="grid h-7 w-7 place-items-center rounded-md flame-gradient">
          <TrendingUp className="h-3.5 w-3.5 text-black" />
        </div>
        <div>
          <div className="text-[10px] text-muted-foreground">Tickets sold today</div>
          <div className="text-sm font-semibold">+8,412</div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function MiniEventRow({ event }: { event: typeof EVENTS[number] }) {
  return (
    <div className="flex items-center gap-3">
      <div className={`h-10 w-10 shrink-0 rounded-lg bg-gradient-to-br ${event.cover}`} />
      <div className="min-w-0 flex-1">
        <div className="truncate text-[13px] font-medium">{event.title}</div>
        <div className="text-[10.5px] text-muted-foreground">{event.city} · {formatDate(event.date)}</div>
      </div>
      <div className="rounded-md border border-white/10 px-2 py-0.5 text-[10px] text-muted-foreground">{event.category}</div>
    </div>
  );
}

/* ─────────────────────────── TRUSTED BY ─────────────────────────── */

function TrustedBy() {
  const logos = ["Nullbyte", "Pulse", "Forge", "Atlas Co", "Northwind", "Helios", "Vertex", "Lumen"];
  return (
    <section className="border-y border-white/[0.06] bg-black/30">
      <div className="mx-auto w-[min(1240px,94%)] py-10">
        <div className="text-center text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Trusted by 12,000+ organizers worldwide
        </div>
        <div className="mt-6 grid grid-cols-2 items-center gap-x-6 gap-y-4 opacity-60 sm:grid-cols-4 md:grid-cols-8">
          {logos.map((l) => (
            <div key={l} className="text-center text-sm font-semibold tracking-tight text-foreground/70">{l}</div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── CATEGORIES ─────────────────────────── */

const CATS = [
  { name: "Concerts", icon: Music },
  { name: "Business", icon: Briefcase },
  { name: "Sports", icon: Trophy },
  { name: "Workshops", icon: Wrench },
  { name: "Festivals", icon: PartyPopper },
  { name: "Conferences", icon: Mic2 },
  { name: "Networking", icon: Users },
  { name: "Online Events", icon: Globe },
];

function Categories() {
  return (
    <Section eyebrow="Categories" title="Explore by interest" subtitle="From global summits to intimate workshops — find your scene.">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {CATS.map((c, i) => (
          <motion.div key={c.name}
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.35, delay: i * 0.04 }}
          >
            <Link to="/events"
              className="group flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 transition-all hover:-translate-y-0.5 hover:border-orange-500/40 hover:bg-white/[0.04]">
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-orange-500/10 text-orange-400 transition-colors group-hover:bg-orange-500/20">
                <c.icon className="h-4 w-4" />
              </div>
              <div className="text-sm font-medium">{c.name}</div>
              <ArrowRight className="ml-auto h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-60" />
            </Link>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ─────────────────────────── TRENDING ─────────────────────────── */

function Trending() {
  const events = EVENTS.slice(0, 6);
  return (
    <Section eyebrow="Trending" title="Selling fast right now"
      subtitle="Curated picks from the vendor pipeline."
      action={<Link to="/events" className="text-sm text-orange-400 hover:text-orange-300">View all →</Link>}
    >
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {events.map((e, i) => {
          const sold = e.tiers.reduce((a, t) => a + t.sold, 0);
          const cap = e.tiers.reduce((a, t) => a + t.total, 0);
          const minPrice = Math.min(...e.tiers.map(t => t.price));
          return (
            <motion.div key={e._id}
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
            >
              <Link to="/events/$slug" params={{ slug: e.slug }}
                className="group block overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.02] transition-all hover:-translate-y-0.5 hover:border-white/15">
                <div className={`relative h-44 overflow-hidden bg-gradient-to-br ${e.cover}`}>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <div className="absolute left-3 top-3 rounded-md bg-black/50 px-2 py-0.5 text-[10.5px] font-medium backdrop-blur">{e.category}</div>
                  <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white">
                    <div className="text-[11px] uppercase tracking-wider opacity-80">{formatDate(e.date)}</div>
                    <div className="flex items-center gap-1 text-[11px]"><Users className="h-3 w-3" /> {sold.toLocaleString()}</div>
                  </div>
                </div>
                <div className="space-y-3 p-4">
                  <div>
                    <div className="line-clamp-1 text-[15px] font-semibold transition-colors group-hover:text-orange-300">{e.title}</div>
                    <div className="mt-1 flex items-center gap-1 text-[12px] text-muted-foreground">
                      <MapPin className="h-3 w-3" /> {e.venue}, {e.city}
                    </div>
                  </div>
                  <div className="flex items-center justify-between border-t border-white/5 pt-3">
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">From</div>
                      <div className="text-base font-semibold">${minPrice}</div>
                    </div>
                    <div className="rounded-md bg-white/10 px-3 py-1.5 text-[12px] font-medium transition-colors group-hover:bg-white group-hover:text-black">
                      Book Now
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}

/* ─────────────────────────── WHY EVNTR ─────────────────────────── */

function WhyEvntr() {
  const items = [
    { i: QrCode, t: "QR Ticketing", d: "Signed, verifiable tickets that scan in under 200ms at the door — even offline." },
    { i: Globe2, t: "Global Payments", d: "Accept 135+ currencies, payout to 50+ countries. Stripe & local rails built in." },
    { i: BarChart3, t: "Real-Time Analytics", d: "Watch revenue, conversion, and seat velocity update by the second." },
    { i: Building2, t: "Multi-Vendor Platform", d: "Run thousands of organizers under one roof with isolated, mutex-safe inventory." },
  ];
  return (
    <Section eyebrow="Why Evntr" title="The infrastructure behind sold-out events" subtitle="Every primitive a modern organizer needs — engineered with concurrency-safe defaults.">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {items.map(({ i: Icon, t, d }) => (
          <div key={t} className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 transition-colors hover:border-orange-500/30">
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-orange-500/10 text-orange-400">
              <Icon className="h-4.5 w-4.5" />
            </div>
            <div className="mt-4 text-[15px] font-semibold">{t}</div>
            <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">{d}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ─────────────────────────── DASHBOARD SHOWCASE ─────────────────────────── */

function DashboardShowcase() {
  return (
    <section className="mx-auto mt-24 w-[min(1240px,94%)]">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-orange-400">// console</div>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">A dashboard your ops team will actually use.</h2>
          <p className="mt-3 max-w-md text-[15px] text-muted-foreground">
            Inventory, revenue, attendee flow, vendor splits — one console, mutex-safe, audit-logged, and ridiculously fast.
          </p>
          <ul className="mt-6 space-y-2.5">
            {["Live revenue & conversion", "Per-tier seat inventory", "Multi-vendor payout splits", "Audit log of every state change"].map((f) => (
              <li key={f} className="flex items-center gap-2.5 text-sm">
                <Check className="h-4 w-4 text-orange-400" />
                <span className="text-foreground/90">{f}</span>
              </li>
            ))}
          </ul>
          <Link to="/organizer" className="mt-7 inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-black hover:bg-white/90">
            Open the Console <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="relative">
          <div className="absolute -inset-6 -z-10 rounded-3xl bg-[radial-gradient(circle_at_70%_30%,rgba(255,90,20,0.18),transparent_70%)] blur-2xl" />
          <DashboardMock />
        </div>
      </div>
    </section>
  );
}

function DashboardMock() {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0e] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)]">
      {/* Top bar */}
      <div className="flex items-center justify-between border-b border-white/[0.06] bg-black/40 px-4 py-3">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        </div>
        <div className="font-mono text-[10.5px] text-muted-foreground">organizer.evntr.app</div>
        <div className="text-[10.5px] text-orange-300">● Live</div>
      </div>
      <div className="grid grid-cols-3 gap-3 p-4">
        {[
          { l: "Revenue", v: "$284,920", c: "+12.4%" },
          { l: "Tickets Sold", v: "8,412", c: "+5.1%" },
          { l: "Avg Order", v: "$33.86", c: "+2.0%" },
        ].map((m) => (
          <div key={m.l} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
            <div className="text-[10.5px] uppercase tracking-wider text-muted-foreground">{m.l}</div>
            <div className="mt-1 text-lg font-semibold">{m.v}</div>
            <div className="mt-0.5 text-[10.5px] text-orange-300">{m.c}</div>
          </div>
        ))}
      </div>
      {/* Chart */}
      <div className="px-4 pb-4">
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
          <div className="mb-3 flex items-center justify-between">
            <div className="text-[12px] font-medium">Ticket Sales · 30d</div>
            <div className="font-mono text-[10px] text-muted-foreground">UTC</div>
          </div>
          <svg viewBox="0 0 320 90" className="h-24 w-full">
            <defs>
              <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#FF7A1A" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#FF7A1A" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M0,70 L20,60 L40,65 L60,50 L80,55 L100,40 L120,45 L140,30 L160,35 L180,20 L200,28 L220,15 L240,22 L260,10 L280,18 L300,8 L320,12 L320,90 L0,90 Z" fill="url(#g1)" />
            <path d="M0,70 L20,60 L40,65 L60,50 L80,55 L100,40 L120,45 L140,30 L160,35 L180,20 L200,28 L220,15 L240,22 L260,10 L280,18 L300,8 L320,12" stroke="#FF8C00" strokeWidth="1.5" fill="none" />
          </svg>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 px-4 pb-4">
        {EVENTS.slice(0, 2).map((e) => {
          const sold = e.tiers.reduce((a, t) => a + t.sold, 0);
          const cap = e.tiers.reduce((a, t) => a + t.total, 0);
          const pct = Math.round((sold / cap) * 100);
          return (
            <div key={e._id} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
              <div className="truncate text-[12px] font-medium">{e.title}</div>
              <div className="mt-0.5 text-[10.5px] text-muted-foreground">{e.city}</div>
              <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/5">
                <div className="h-full flame-gradient" style={{ width: `${pct}%` }} />
              </div>
              <div className="mt-1 flex items-center justify-between text-[10px] text-muted-foreground">
                <span>{sold.toLocaleString()}/{cap.toLocaleString()}</span>
                <span className="text-orange-300">{pct}%</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─────────────────────────── STATS ─────────────────────────── */

function Stats() {
  const stats = [
    { v: "84,200+", l: "Events Hosted" },
    { v: "12.4M", l: "Tickets Sold" },
    { v: "12,000+", l: "Active Organizers" },
    { v: "130+", l: "Countries Served" },
  ];
  return (
    <section className="mt-24 border-y border-white/[0.06] bg-black/30">
      <div className="mx-auto grid w-[min(1240px,94%)] grid-cols-2 gap-y-8 py-14 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.l} className="text-center">
            <div className="text-3xl font-semibold tracking-tight md:text-4xl">{s.v}</div>
            <div className="mt-1 text-[12px] uppercase tracking-wider text-muted-foreground">{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────── TESTIMONIALS ─────────────────────────── */

function Testimonials() {
  const items = [
    { q: "We launched a 12k-attendee summit in 3 weeks. Zero oversold seats, zero refunds.", n: "Maya Chen", r: "Head of Ops, Nullbyte Labs" },
    { q: "Switched from Eventbrite. Payouts hit 4 days faster and the analytics actually mean something.", n: "Diego Alvarez", r: "Founder, Pulse Collective" },
    { q: "The dashboard is the cleanest I've used. Our ops team picked it up in an afternoon.", n: "Priya Natarajan", r: "Programs Director, Forge Ventures" },
  ];
  return (
    <Section eyebrow="Testimonials" title="Loved by operators who ship">
      <div className="grid gap-4 md:grid-cols-3">
        {items.map((t) => (
          <div key={t.n} className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-orange-400 text-orange-400" />
              ))}
            </div>
            <p className="mt-4 text-[14.5px] leading-relaxed text-foreground/90">"{t.q}"</p>
            <div className="mt-5 flex items-center gap-3 border-t border-white/5 pt-4">
              <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-orange-500 to-red-600 text-xs font-semibold text-black">
                {t.n.split(" ").map(p => p[0]).join("")}
              </div>
              <div>
                <div className="text-[13px] font-medium">{t.n}</div>
                <div className="text-[11.5px] text-muted-foreground">{t.r}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ─────────────────────────── PRICING PREVIEW ─────────────────────────── */

function PricingPreview() {
  const tiers = [
    { n: "Starter", p: "Free", d: "For your first 100 tickets.", f: ["100 tickets/mo", "QR ticketing", "Basic analytics"], cta: "Start free", hot: false },
    { n: "Pro", p: "$49", s: "/mo", d: "For growing organizers.", f: ["Unlimited tickets", "Multi-vendor seats", "Real-time analytics", "Priority support"], cta: "Start trial", hot: true },
    { n: "Enterprise", p: "Custom", d: "For global events.", f: ["SLA & SSO", "Dedicated CSM", "Custom integrations"], cta: "Talk to sales", hot: false },
  ];
  return (
    <Section eyebrow="Pricing" title="Built to scale with you" subtitle="Transparent pricing. Cancel anytime."
      action={<Link to="/pricing" className="text-sm text-orange-400 hover:text-orange-300">Full pricing →</Link>}
    >
      <div className="grid gap-4 md:grid-cols-3">
        {tiers.map((t) => (
          <div key={t.n} className={`relative rounded-2xl border p-6 ${t.hot ? "border-orange-500/40 bg-gradient-to-b from-orange-500/[0.06] to-transparent" : "border-white/[0.07] bg-white/[0.02]"}`}>
            {t.hot && <div className="absolute -top-2.5 left-6 rounded-full bg-orange-500 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-black">Most popular</div>}
            <div className="text-[13px] font-medium text-muted-foreground">{t.n}</div>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-3xl font-semibold tracking-tight">{t.p}</span>
              {t.s && <span className="text-sm text-muted-foreground">{t.s}</span>}
            </div>
            <div className="mt-1 text-[13px] text-muted-foreground">{t.d}</div>
            <Link to="/pricing" className={`mt-5 block rounded-lg px-4 py-2 text-center text-[13px] font-medium ${t.hot ? "bg-white text-black hover:bg-white/90" : "border border-white/10 hover:bg-white/5"}`}>{t.cta}</Link>
            <ul className="mt-5 space-y-2">
              {t.f.map((x) => (
                <li key={x} className="flex items-start gap-2 text-[13px]">
                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-orange-400" />
                  <span className="text-foreground/90">{x}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ─────────────────────────── FINAL CTA ─────────────────────────── */

function FinalCTA() {
  return (
    <section className="mx-auto mt-24 w-[min(1240px,94%)]">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#120804] via-[#0a0a0e] to-[#0a0a0e] p-10 md:p-16">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-orange-500/25 blur-3xl" />
        <div className="absolute -bottom-24 -left-10 h-64 w-64 rounded-full bg-red-500/15 blur-3xl" />
        <div className="relative grid items-center gap-6 md:grid-cols-[1.4fr_1fr]">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">Ready to launch your<br /> <span className="flame-text">next event?</span></h2>
            <p className="mt-3 max-w-md text-[15px] text-muted-foreground">Spin up your first event in under 4 minutes. No credit card required.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3 md:justify-end">
            <Link to="/organizer" className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-medium text-black hover:bg-white/90">
              Create your event <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/events" className="rounded-lg border border-white/15 px-5 py-3 text-sm hover:bg-white/5">Browse events</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── FOOTER ─────────────────────────── */

function Footer() {
  const cols = [
    { h: "Product", l: ["Explore Events", "Categories", "For Organizers", "Pricing", "Mobile App"] },
    { h: "Resources", l: ["Help Center", "Organizer Guides", "API Docs", "Status", "Changelog"] },
    { h: "Company", l: ["About", "Careers", "Blog", "Press", "Contact"] },
    { h: "Legal", l: ["Privacy", "Terms", "Cookies", "Refunds", "Security"] },
  ];
  return (
    <footer className="mt-24 border-t border-white/[0.06]">
      <div className="mx-auto w-[min(1240px,94%)] py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div>
            <Link to="/" className="flex items-center gap-2">
              <div className="grid h-8 w-8 place-items-center rounded-lg flame-gradient">
                <Tag className="h-4 w-4 text-black" strokeWidth={2.5} />
              </div>
              <span className="text-lg font-semibold tracking-tight">Evntr<span className="flame-text">.</span></span>
            </Link>
            <p className="mt-4 max-w-xs text-[13px] text-muted-foreground">
              The multi-vendor ticketing platform for organizers who care about craft.
            </p>
            <div className="mt-5 flex gap-3 text-muted-foreground">
              <a href="#" className="transition-colors hover:text-orange-400"><FaXTwitter className="h-4 w-4" /></a>
              <a href="#" className="transition-colors hover:text-orange-400"><FaGithub className="h-4 w-4" /></a>
              <a href="#" className="transition-colors hover:text-orange-400"><FaLinkedin className="h-4 w-4" /></a>
              <a href="#" className="transition-colors hover:text-orange-400"><FaInstagram className="h-4 w-4" /></a>
            </div>
          </div>
          {cols.map((c) => (
            <div key={c.h}>
              <div className="text-[12px] font-semibold uppercase tracking-wider text-foreground/80">{c.h}</div>
              <ul className="mt-4 space-y-2.5">
                {c.l.map((x) => (
                  <li key={x}><a href="#" className="text-[13px] text-muted-foreground transition-colors hover:text-foreground">{x}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-white/5 pt-6 text-[12px] text-muted-foreground md:flex-row md:items-center">
          <div>© {new Date().getFullYear()} Evntr Inc. All rights reserved.</div>
          <div className="font-mono">EVNTR // mutex-safe ticketing // built for vendors</div>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────── SECTION HELPER ─────────────────────────── */

function Section({ eyebrow, title, subtitle, action, children }: {
  eyebrow: string; title: string; subtitle?: string; action?: React.ReactNode; children: React.ReactNode;
}) {
  return (
    <section className="mx-auto mt-24 w-[min(1240px,94%)]">
      <div className="mb-8 flex flex-col items-start justify-between gap-3 md:flex-row md:items-end">
        <div>
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-orange-400">// {eyebrow}</div>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">{title}</h2>
          {subtitle && <p className="mt-2 max-w-xl text-[14.5px] text-muted-foreground">{subtitle}</p>}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}
