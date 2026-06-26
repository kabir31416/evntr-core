// Extra mock collections for organizer / user / public surfaces.
import { EVENTS, type EventDoc } from "./mock-data";

export interface OrderDoc { _id: string; eventId: string; buyer: string; email: string; qty: number; total: number; status: "paid" | "refunded" | "pending"; at: string }
export interface AttendeeDoc { _id: string; eventId: string; name: string; email: string; tier: string; checkedIn: boolean }
export interface CouponDoc { _id: string; code: string; percent: number; uses: number; limit: number; eventId?: string }
export interface PayoutDoc { _id: string; amount: number; status: "paid" | "scheduled" | "processing"; at: string; method: string }
export interface StaffDoc { _id: string; name: string; email: string; role: "Manager" | "Scanner" | "Support"; }

const names = ["Aiden Reeves","Maya Khan","Leo Park","Zara Patel","Noah Diaz","Iris Chen","Theo Marin","Sana Iqbal","Jonas Vega","Mira Okafor","Eli Tanaka","Ava Costa"];
const rand = (n: number) => Math.floor(Math.random() * n);

export const ORDERS: OrderDoc[] = Array.from({ length: 24 }).map((_, i) => {
  const evt = EVENTS[i % EVENTS.length];
  const tier = evt.tiers[rand(evt.tiers.length)];
  const qty = 1 + rand(3);
  const name = names[i % names.length];
  return {
    _id: "ord_" + (1000 + i),
    eventId: evt._id,
    buyer: name,
    email: name.toLowerCase().replace(" ", ".") + "@mail.com",
    qty,
    total: qty * tier.price,
    status: i % 9 === 0 ? "refunded" : i % 7 === 0 ? "pending" : "paid",
    at: new Date(Date.now() - i * 86400000 * 0.7).toISOString(),
  };
});

export const ATTENDEES: AttendeeDoc[] = Array.from({ length: 40 }).map((_, i) => {
  const evt = EVENTS[i % EVENTS.length];
  const name = names[i % names.length] + (i > 11 ? " " + i : "");
  return {
    _id: "att_" + i,
    eventId: evt._id,
    name,
    email: name.toLowerCase().replace(/\s/g, ".") + "@mail.com",
    tier: evt.tiers[rand(evt.tiers.length)].name,
    checkedIn: i % 3 === 0,
  };
});

export const COUPONS: CouponDoc[] = [
  { _id: "cpn_1", code: "EARLY20", percent: 20, uses: 134, limit: 500 },
  { _id: "cpn_2", code: "VIP50",   percent: 50, uses: 12,  limit: 50, eventId: "evt_001" },
  { _id: "cpn_3", code: "STUDENT", percent: 30, uses: 88,  limit: 1000 },
  { _id: "cpn_4", code: "FRIENDS10", percent: 10, uses: 410, limit: 999 },
];

export const PAYOUTS: PayoutDoc[] = [
  { _id: "po_1", amount: 18420, status: "paid",       at: "2026-05-12", method: "Bank • ****4421" },
  { _id: "po_2", amount: 9200,  status: "paid",       at: "2026-05-26", method: "Bank • ****4421" },
  { _id: "po_3", amount: 22100, status: "processing", at: "2026-06-09", method: "Bank • ****4421" },
  { _id: "po_4", amount: 14800, status: "scheduled",  at: "2026-06-23", method: "Bank • ****4421" },
];

export const STAFF: StaffDoc[] = [
  { _id: "stf_1", name: "Riley Chen",   email: "riley@nullbyte.io",  role: "Manager" },
  { _id: "stf_2", name: "Sam Okoye",    email: "sam@nullbyte.io",    role: "Scanner" },
  { _id: "stf_3", name: "Dana Park",    email: "dana@nullbyte.io",   role: "Scanner" },
  { _id: "stf_4", name: "Mo Haidar",    email: "mo@nullbyte.io",     role: "Support" },
];

export const NOTIFICATIONS = [
  { id: "n1", title: "Ticket confirmed",    body: "Your CyberSummit 2026 ticket is ready.", at: "2h ago",  unread: true },
  { id: "n2", title: "Event reminder",      body: "Neon Bass Festival starts in 3 days.",   at: "1d ago",  unread: true },
  { id: "n3", title: "Refund processed",    body: "Refund of $79 issued to your card.",     at: "3d ago",  unread: false },
  { id: "n4", title: "New organizer event", body: "Forge Ventures launched a new summit.",  at: "5d ago",  unread: false },
];

export function favoriteIds(): string[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem("evntr:favs") || "[]"); } catch { return []; }
}
export function toggleFavorite(id: string) {
  const cur = favoriteIds();
  const next = cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id];
  localStorage.setItem("evntr:favs", JSON.stringify(next));
  return next;
}

export function eventsByOrganizer(organizerId: string): EventDoc[] {
  return EVENTS.filter((e) => e.organizerId === organizerId);
}
