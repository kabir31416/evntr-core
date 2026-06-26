import { createFileRoute, Outlet } from "@tanstack/react-router";
import { LayoutDashboard, CalendarPlus, Ticket, Users, BadgePercent, BarChart3, Wallet, UserCog, Settings } from "lucide-react";
import { DashShell } from "@/components/DashShell";

export const Route = createFileRoute("/organizer")({
  head: () => ({ meta: [{ title: "Organizer Console — Evntr" }] }),
  component: OrganizerLayout,
});

const NAV = [
  { to: "/organizer",            label: "Dashboard",  icon: LayoutDashboard },
  { to: "/organizer/events",     label: "My Events",  icon: CalendarPlus },
  { to: "/organizer/orders",     label: "Orders",     icon: Ticket },
  { to: "/organizer/attendees",  label: "Attendees",  icon: Users },
  { to: "/organizer/coupons",    label: "Coupons",    icon: BadgePercent },
  { to: "/organizer/analytics",  label: "Analytics",  icon: BarChart3 },
  { to: "/organizer/payouts",    label: "Payouts",    icon: Wallet },
  { to: "/organizer/staff",      label: "Staff",      icon: UserCog },
  { to: "/organizer/settings",   label: "Settings",   icon: Settings },
];

function OrganizerLayout() {
  return (
    <DashShell title="Nullbyte Labs" subtitle="vendor console" nav={NAV}>
      <Outlet />
    </DashShell>
  );
}
