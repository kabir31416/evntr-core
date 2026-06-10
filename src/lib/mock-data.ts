// Mock backend simulating MongoDB aggregation + Mutex seat-lock invariants.

export type EventCategory = "Tech" | "Music" | "Conference" | "Workshop" | "Sports";

export interface SeatTier {
  id: string;
  name: string;
  price: number;
  total: number;
  sold: number;
}

export interface EventDoc {
  _id: string;
  slug: string;
  title: string;
  organizer: string;
  organizerId: string;
  category: EventCategory;
  date: string; // ISO
  city: string;
  venue: string;
  cover: string; // gradient hint
  description: string;
  tiers: SeatTier[];
  views: number;
  rating: number;
  featured?: boolean;
}

export interface TicketDoc {
  _id: string;
  eventId: string;
  tierId: string;
  buyer: string;
  code: string;
  issuedAt: string;
}

// ---- Seed events ----
export const EVENTS: EventDoc[] = [
  {
    _id: "evt_001", slug: "cyber-summit-2026", title: "CyberSummit 2026",
    organizer: "Nullbyte Labs", organizerId: "org_1",
    category: "Tech", date: "2026-08-12T18:00:00Z",
    city: "Berlin", venue: "Kraftwerk Hall", cover: "from-orange-500 to-red-600",
    description: "The flagship gathering for offensive security, AI red-teaming, and zero-trust architecture.",
    tiers: [
      { id: "t1", name: "General", price: 149, total: 1200, sold: 874 },
      { id: "t2", name: "Pro", price: 349, total: 400, sold: 312 },
      { id: "t3", name: "VIP", price: 899, total: 80, sold: 71 },
    ],
    views: 18420, rating: 4.9, featured: true,
  },
  {
    _id: "evt_002", slug: "neon-bass-festival", title: "Neon Bass Festival",
    organizer: "Pulse Collective", organizerId: "org_2",
    category: "Music", date: "2026-07-04T20:00:00Z",
    city: "Lisbon", venue: "Doca Pier", cover: "from-amber-500 to-pink-600",
    description: "Three nights of underground bass, neon visuals, and waterfront stages.",
    tiers: [
      { id: "t1", name: "1-Day", price: 79, total: 3000, sold: 2104 },
      { id: "t2", name: "Weekend", price: 189, total: 1500, sold: 1402 },
    ],
    views: 24310, rating: 4.7, featured: true,
  },
  {
    _id: "evt_003", slug: "founders-forge", title: "Founders Forge",
    organizer: "Forge Ventures", organizerId: "org_3",
    category: "Conference", date: "2026-09-22T09:00:00Z",
    city: "Singapore", venue: "Marina Atrium", cover: "from-orange-600 to-yellow-500",
    description: "Closed-door sessions with operators scaling from seed to series C.",
    tiers: [
      { id: "t1", name: "Standard", price: 499, total: 600, sold: 248 },
      { id: "t2", name: "Founder", price: 1200, total: 200, sold: 96 },
    ],
    views: 9120, rating: 4.8,
  },
  {
    _id: "evt_004", slug: "ai-redteam-workshop", title: "AI Red-Team Workshop",
    organizer: "Nullbyte Labs", organizerId: "org_1",
    category: "Workshop", date: "2026-06-30T14:00:00Z",
    city: "Remote", venue: "Live Stream", cover: "from-red-500 to-orange-400",
    description: "Hands-on lab breaking and hardening modern LLM agents.",
    tiers: [{ id: "t1", name: "Seat", price: 199, total: 300, sold: 287 }],
    views: 5620, rating: 4.9,
  },
  {
    _id: "evt_005", slug: "kinetic-marathon", title: "Kinetic City Marathon",
    organizer: "Kinetic Sports", organizerId: "org_4",
    category: "Sports", date: "2026-10-05T07:00:00Z",
    city: "Tokyo", venue: "Shibuya Start Line", cover: "from-orange-500 to-amber-400",
    description: "42km loop through neon-lit Tokyo with elite and amateur waves.",
    tiers: [
      { id: "t1", name: "Amateur", price: 59, total: 8000, sold: 6520 },
      { id: "t2", name: "Elite", price: 159, total: 500, sold: 411 },
    ],
    views: 31200, rating: 4.6,
  },
  {
    _id: "evt_006", slug: "quantum-devcon", title: "Quantum DevCon",
    organizer: "Qubit Foundation", organizerId: "org_5",
    category: "Tech", date: "2026-11-14T10:00:00Z",
    city: "Zurich", venue: "ETH Auditorium", cover: "from-orange-400 to-red-500",
    description: "Practical post-quantum cryptography and hybrid compute workflows.",
    tiers: [
      { id: "t1", name: "Dev", price: 299, total: 800, sold: 412 },
      { id: "t2", name: "Lab", price: 749, total: 150, sold: 89 },
    ],
    views: 7340, rating: 4.8,
  },
];

// ---- MongoDB-style aggregation pipeline simulator ----
type Stage =
  | { $match: Partial<Record<keyof EventDoc, unknown>> & Record<string, unknown> }
  | { $sort: Record<string, 1 | -1> }
  | { $limit: number }
  | { $group: { _id: string; count?: { $sum: 1 }; revenue?: { $sum: string } } };

export function aggregate(pipeline: Stage[]): unknown[] {
  let docs: any[] = EVENTS.map((e) => ({
    ...e,
    soldTotal: e.tiers.reduce((a, t) => a + t.sold, 0),
    capacity: e.tiers.reduce((a, t) => a + t.total, 0),
    revenue: e.tiers.reduce((a, t) => a + t.sold * t.price, 0),
  }));
  for (const stage of pipeline) {
    if ("$match" in stage) {
      docs = docs.filter((d) =>
        Object.entries(stage.$match).every(([k, v]) => d[k] === v),
      );
    } else if ("$sort" in stage) {
      const [[k, dir]] = Object.entries(stage.$sort);
      docs.sort((a, b) => (a[k] > b[k] ? dir : a[k] < b[k] ? -dir : 0));
    } else if ("$limit" in stage) {
      docs = docs.slice(0, stage.$limit);
    } else if ("$group" in stage) {
      const key = stage.$group._id.replace("$", "");
      const map = new Map<string, any>();
      for (const d of docs) {
        const k = d[key];
        const prev = map.get(k) ?? { _id: k, count: 0, revenue: 0 };
        prev.count += 1;
        prev.revenue += d.revenue;
        map.set(k, prev);
      }
      docs = [...map.values()];
    }
  }
  return docs;
}

// ---- Mutex invariant lock for seat booking (concurrency-safe simulation) ----
class SeatMutex {
  private locks = new Map<string, Promise<void>>();
  async acquire<T>(key: string, critical: () => Promise<T> | T): Promise<T> {
    while (this.locks.has(key)) {
      await this.locks.get(key);
    }
    let release!: () => void;
    const p = new Promise<void>((r) => (release = r));
    this.locks.set(key, p);
    try {
      return await critical();
    } finally {
      this.locks.delete(key);
      release();
    }
  }
}
export const seatMutex = new SeatMutex();

export interface BookResult { ok: boolean; ticket?: TicketDoc; reason?: string }

export async function bookSeat(eventId: string, tierId: string, buyer: string): Promise<BookResult> {
  const key = `${eventId}:${tierId}`;
  return seatMutex.acquire(key, async () => {
    // Simulate I/O latency where race conditions normally appear.
    await new Promise((r) => setTimeout(r, 400));
    const evt = EVENTS.find((e) => e._id === eventId);
    if (!evt) return { ok: false, reason: "Event not found" };
    const tier = evt.tiers.find((t) => t.id === tierId);
    if (!tier) return { ok: false, reason: "Tier not found" };
    // INVARIANT: sold <= total, always.
    if (tier.sold >= tier.total) return { ok: false, reason: "Sold out" };
    tier.sold += 1;
    const ticket: TicketDoc = {
      _id: `tkt_${Math.random().toString(36).slice(2, 10)}`,
      eventId, tierId, buyer,
      code: `EVNTR-${eventId.slice(-3).toUpperCase()}-${Date.now().toString(36).toUpperCase()}`,
      issuedAt: new Date().toISOString(),
    };
    TICKETS.push(ticket);
    return { ok: true, ticket };
  });
}

export const TICKETS: TicketDoc[] = [];

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}
