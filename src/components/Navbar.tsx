import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles, ArrowRight, LayoutDashboard, LogOut } from "lucide-react";
import { useAuth } from "@/lib/auth";

const NAV = [
  { to: "/events", label: "Explore Events" },
  { to: "/categories", label: "Categories" },
  { to: "/organizers", label: "Organizers" },
  { to: "/pricing", label: "Pricing" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-white/[0.06] bg-[#060608]/80 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 w-[min(1240px,94%)] items-center justify-between">
          {/* Logo */}
          <Link to="/" className="group flex items-center gap-2">
            <div className="relative grid h-8 w-8 place-items-center rounded-lg flame-gradient">
              <Sparkles className="h-4 w-4 text-black" strokeWidth={2.5} />
            </div>
            <span className="text-[17px] font-semibold tracking-tight">
              Evntr<span className="flame-text">.</span>
            </span>
          </Link>

          {/* Center nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="rounded-md px-3 py-1.5 text-[13.5px] text-muted-foreground transition-colors hover:text-foreground"
                activeProps={{ className: "text-foreground" }}
              >
                {n.label}
              </Link>
            ))}
          </nav>

          {/* Right */}
          <div className="hidden items-center gap-2 md:flex">
            <Link
              to="/events"
              className="rounded-md px-3 py-1.5 text-[13.5px] text-muted-foreground transition-colors hover:text-foreground"
            >
              Sign in
            </Link>
            <Link
              to="/organizer"
              className="group inline-flex items-center gap-1.5 rounded-lg bg-white px-3.5 py-1.5 text-[13.5px] font-medium text-black transition-all hover:bg-white/90"
            >
              Create Event
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(true)}
            className="grid h-9 w-9 place-items-center rounded-md border border-white/10 md:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-4 w-4" />
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm md:hidden"
            />
            <motion.aside
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              className="fixed right-0 top-0 z-50 flex h-full w-[84%] max-w-sm flex-col border-l border-white/10 bg-[#0a0a0e] p-6 md:hidden"
            >
              <div className="flex items-center justify-between">
                <Link to="/" onClick={() => setOpen(false)} className="flex items-center gap-2">
                  <div className="grid h-8 w-8 place-items-center rounded-lg flame-gradient">
                    <Sparkles className="h-4 w-4 text-black" />
                  </div>
                  <span className="text-base font-semibold">Evntr<span className="flame-text">.</span></span>
                </Link>
                <button onClick={() => setOpen(false)} className="grid h-9 w-9 place-items-center rounded-md border border-white/10" aria-label="Close">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <nav className="mt-8 flex flex-col">
                {NAV.map((n) => (
                  <Link
                    key={n.to} to={n.to} onClick={() => setOpen(false)}
                    className="border-b border-white/5 py-4 text-base text-foreground/90"
                  >
                    {n.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-auto space-y-3 pt-6">
                <Link to="/events" onClick={() => setOpen(false)}
                  className="block rounded-lg border border-white/10 px-4 py-2.5 text-center text-sm">
                  Sign in
                </Link>
                <Link to="/organizer" onClick={() => setOpen(false)}
                  className="block rounded-lg bg-white px-4 py-2.5 text-center text-sm font-medium text-black">
                  Create Event
                </Link>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
