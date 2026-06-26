import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { LayoutDashboard, Ticket, Heart, Clock, Bell, Settings } from "lucide-react";
import { DashShell } from "@/components/DashShell";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — Evntr" }] }),
  component: DashLayout,
});

const NAV = [
  { to: "/dashboard",               label: "Overview",      icon: LayoutDashboard },
  { to: "/dashboard/tickets",       label: "My Tickets",    icon: Ticket },
  { to: "/dashboard/favorites",     label: "Favorites",     icon: Heart },
  { to: "/dashboard/history",       label: "History",       icon: Clock },
  { to: "/dashboard/notifications", label: "Notifications", icon: Bell },
  { to: "/dashboard/settings",      label: "Settings",      icon: Settings },
];

function DashLayout() {
  const { user } = useAuth();
  const nav = useNavigate();
  useEffect(() => { if (!user && typeof window !== "undefined") nav({ to: "/auth/login" }); }, [user, nav]);
  return (
    <DashShell title={user?.name ? `Hi, ${user.name}` : "Your dashboard"} subtitle="attendee console" nav={NAV}>
      <Outlet />
    </DashShell>
  );
}
