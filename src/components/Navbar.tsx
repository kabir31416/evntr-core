import { Link } from "@tanstack/react-router";
import { Ticket, LayoutDashboard, Compass, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export function Navbar() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-4 z-40 mx-auto mt-4 w-[min(1200px,94%)]"
    >
      <div className="glass-strong flex items-center justify-between rounded-2xl px-5 py-3">
        <Link to="/" className="flex items-center gap-2">
          <div className="relative grid h-8 w-8 place-items-center rounded-lg flame-gradient">
            <Sparkles className="h-4 w-4 text-black" />
            <div className="absolute inset-0 rounded-lg blur-md flame-gradient opacity-60 -z-10" />
          </div>
          <span className="text-lg font-bold tracking-tight">
            Evntr<span className="flame-text">.</span>
          </span>
          <span className="ml-2 hidden rounded-full border border-orange-500/30 bg-orange-500/10 px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider text-orange-300 md:inline-block">
            v2.6
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          <NavItem to="/events" icon={<Compass className="h-4 w-4" />} label="Discover" />
          <NavItem to="/organizer" icon={<LayoutDashboard className="h-4 w-4" />} label="Organizer" />
          <NavItem to="/tickets" icon={<Ticket className="h-4 w-4" />} label="My Tickets" />
        </nav>

        <Link
          to="/events"
          className="flame-btn rounded-xl px-4 py-2 text-sm"
        >
          Get Tickets
        </Link>
      </div>
    </motion.header>
  );
}

function NavItem({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) {
  return (
    <Link
      to={to}
      className="group flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
      activeProps={{ className: "text-foreground bg-white/5" }}
    >
      <span className="text-orange-400 transition-transform group-hover:scale-110">{icon}</span>
      {label}
    </Link>
  );
}
