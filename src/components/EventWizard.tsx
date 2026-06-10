import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, ChevronRight, ChevronLeft, Calendar, MapPin, Ticket, Sparkles, Plus, Trash2 } from "lucide-react";
import { EVENTS, type EventCategory, type EventDoc } from "@/lib/mock-data";

interface DraftTier { name: string; price: string; total: string }
interface DraftEvent {
  title: string;
  category: EventCategory;
  description: string;
  date: string;
  time: string;
  city: string;
  venue: string;
  tiers: DraftTier[];
}

const initial: DraftEvent = {
  title: "", category: "Tech", description: "",
  date: "", time: "19:00", city: "", venue: "",
  tiers: [{ name: "General", price: "99", total: "500" }],
};

const STEPS = [
  { id: 0, label: "Basics", icon: Sparkles },
  { id: 1, label: "Schedule", icon: Calendar },
  { id: 2, label: "Venue", icon: MapPin },
  { id: 3, label: "Tiers", icon: Ticket },
  { id: 4, label: "Review", icon: Check },
] as const;

export function EventWizard({ open, onClose, onCreated }: { open: boolean; onClose: () => void; onCreated?: (e: EventDoc) => void }) {
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<DraftEvent>(initial);
  const [errors, setErrors] = useState<string[]>([]);

  const update = <K extends keyof DraftEvent>(k: K, v: DraftEvent[K]) => setDraft((d) => ({ ...d, [k]: v }));
  const updateTier = (i: number, patch: Partial<DraftTier>) =>
    setDraft((d) => ({ ...d, tiers: d.tiers.map((t, idx) => (idx === i ? { ...t, ...patch } : t)) }));
  const addTier = () => setDraft((d) => ({ ...d, tiers: [...d.tiers, { name: "", price: "", total: "" }] }));
  const removeTier = (i: number) => setDraft((d) => ({ ...d, tiers: d.tiers.filter((_, idx) => idx !== i) }));

  const totalCap = draft.tiers.reduce((a, t) => a + (Number(t.total) || 0), 0);
  const projectedRev = draft.tiers.reduce((a, t) => a + (Number(t.total) || 0) * (Number(t.price) || 0), 0);

  function validate(s: number): string[] {
    const e: string[] = [];
    if (s === 0) {
      if (draft.title.trim().length < 3) e.push("Title must be at least 3 characters");
      if (draft.description.trim().length < 10) e.push("Description must be at least 10 characters");
    }
    if (s === 1) {
      if (!draft.date) e.push("Date is required");
      if (!draft.time) e.push("Time is required");
      else if (new Date(`${draft.date}T${draft.time}`) < new Date()) e.push("Event must be in the future");
    }
    if (s === 2) {
      if (!draft.city.trim()) e.push("City is required");
      if (!draft.venue.trim()) e.push("Venue is required");
    }
    if (s === 3) {
      if (draft.tiers.length === 0) e.push("At least one tier required");
      draft.tiers.forEach((t, i) => {
        if (!t.name.trim()) e.push(`Tier ${i + 1}: name required`);
        if (!Number(t.price) || Number(t.price) < 0) e.push(`Tier ${i + 1}: invalid price`);
        if (!Number(t.total) || Number(t.total) < 1) e.push(`Tier ${i + 1}: capacity must be ≥ 1`);
      });
    }
    return e;
  }

  const next = () => {
    const e = validate(step);
    setErrors(e);
    if (e.length === 0) setStep((s) => Math.min(4, s + 1));
  };
  const back = () => { setErrors([]); setStep((s) => Math.max(0, s - 1)); };

  const submit = () => {
    const all = [0, 1, 2, 3].flatMap(validate);
    if (all.length) { setErrors(all); return; }
    const slug = draft.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const evt: EventDoc = {
      _id: `evt_${Math.random().toString(36).slice(2, 8)}`,
      slug, title: draft.title, organizer: "Nullbyte Labs", organizerId: "org_1",
      category: draft.category, date: new Date(`${draft.date}T${draft.time}`).toISOString(),
      city: draft.city, venue: draft.venue, cover: "from-orange-500 to-red-600",
      description: draft.description,
      tiers: draft.tiers.map((t, i) => ({
        id: `t${i + 1}`, name: t.name, price: Number(t.price),
        total: Number(t.total), sold: 0,
      })),
      views: 0, rating: 0,
    };
    EVENTS.push(evt);
    onCreated?.(evt);
    setDraft(initial); setStep(0); setErrors([]);
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            transition={{ type: "spring", damping: 24, stiffness: 280 }}
            onClick={(e) => e.stopPropagation()}
            className="glass relative w-full max-w-3xl overflow-hidden rounded-2xl border border-orange-500/20"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/5 p-5">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-orange-400">// new_event.create()</div>
                <h2 className="mt-1 text-xl font-bold">Event <span className="flame-text">Wizard</span></h2>
              </div>
              <button onClick={onClose} className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 hover:border-orange-500/40 hover:bg-orange-500/10">
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Stepper */}
            <div className="border-b border-white/5 p-5">
              <div className="flex items-center justify-between">
                {STEPS.map((s, i) => {
                  const active = i === step;
                  const done = i < step;
                  const Icon = s.icon;
                  return (
                    <div key={s.id} className="flex flex-1 items-center">
                      <div className="flex flex-col items-center">
                        <div className={`grid h-9 w-9 place-items-center rounded-full border transition ${
                          done ? "border-orange-500 bg-orange-500/20 text-orange-300"
                            : active ? "border-orange-500 flame-gradient text-black"
                            : "border-white/10 text-muted-foreground"
                        }`}>
                          {done ? <Check className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
                        </div>
                        <div className={`mt-1.5 text-[10px] font-mono uppercase tracking-wider ${active || done ? "text-orange-300" : "text-muted-foreground"}`}>{s.label}</div>
                      </div>
                      {i < STEPS.length - 1 && <div className={`mx-2 h-px flex-1 ${done ? "bg-orange-500/60" : "bg-white/10"}`} />}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Body */}
            <div className="max-h-[55vh] overflow-y-auto p-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.18 }}
                  className="space-y-4"
                >
                  {step === 0 && (
                    <>
                      <Field label="Event title">
                        <input value={draft.title} onChange={(e) => update("title", e.target.value)} maxLength={80}
                          placeholder="CyberSummit 2026" className={inputCls} />
                      </Field>
                      <Field label="Category">
                        <div className="flex flex-wrap gap-2">
                          {(["Tech", "Music", "Conference", "Workshop", "Sports"] as EventCategory[]).map((c) => (
                            <button key={c} onClick={() => update("category", c)}
                              className={`rounded-lg border px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition ${
                                draft.category === c ? "border-orange-500 bg-orange-500/15 text-orange-300" : "border-white/10 text-muted-foreground hover:border-orange-500/40"
                              }`}>{c}</button>
                          ))}
                        </div>
                      </Field>
                      <Field label="Description">
                        <textarea value={draft.description} onChange={(e) => update("description", e.target.value)} maxLength={500}
                          rows={4} placeholder="What makes this event unforgettable?" className={inputCls} />
                        <div className="mt-1 text-right text-[10px] font-mono text-muted-foreground">{draft.description.length}/500</div>
                      </Field>
                    </>
                  )}

                  {step === 1 && (
                    <div className="grid gap-4 md:grid-cols-2">
                      <Field label="Date">
                        <input type="date" value={draft.date} onChange={(e) => update("date", e.target.value)} className={inputCls} />
                      </Field>
                      <Field label="Start time">
                        <input type="time" value={draft.time} onChange={(e) => update("time", e.target.value)} className={inputCls} />
                      </Field>
                      {draft.date && draft.time && (
                        <div className="md:col-span-2 rounded-xl border border-orange-500/20 bg-orange-500/5 p-4">
                          <div className="font-mono text-[10px] uppercase tracking-wider text-orange-300">Scheduled for</div>
                          <div className="mt-1 text-lg font-semibold">
                            {new Date(`${draft.date}T${draft.time}`).toLocaleString("en-US", { dateStyle: "full", timeStyle: "short" })}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {step === 2 && (
                    <div className="grid gap-4 md:grid-cols-2">
                      <Field label="City">
                        <input value={draft.city} onChange={(e) => update("city", e.target.value)} placeholder="Berlin" className={inputCls} />
                      </Field>
                      <Field label="Venue">
                        <input value={draft.venue} onChange={(e) => update("venue", e.target.value)} placeholder="Kraftwerk Hall" className={inputCls} />
                      </Field>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-3">
                      {draft.tiers.map((t, i) => (
                        <div key={i} className="grid items-end gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4 md:grid-cols-[1.4fr_1fr_1fr_auto]">
                          <Field label={`Tier ${i + 1} name`}>
                            <input value={t.name} onChange={(e) => updateTier(i, { name: e.target.value })} placeholder="General" className={inputCls} />
                          </Field>
                          <Field label="Price ($)">
                            <input type="number" min={0} value={t.price} onChange={(e) => updateTier(i, { price: e.target.value })} className={inputCls} />
                          </Field>
                          <Field label="Capacity">
                            <input type="number" min={1} value={t.total} onChange={(e) => updateTier(i, { total: e.target.value })} className={inputCls} />
                          </Field>
                          <button disabled={draft.tiers.length === 1} onClick={() => removeTier(i)}
                            className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 text-muted-foreground hover:border-red-500/40 hover:text-red-400 disabled:opacity-30">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                      <button onClick={addTier} className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-orange-500/30 py-3 text-sm text-orange-300 hover:bg-orange-500/5">
                        <Plus className="h-4 w-4" /> Add tier
                      </button>
                      <div className="grid grid-cols-2 gap-3 pt-2">
                        <Stat label="Total capacity" value={totalCap.toLocaleString()} />
                        <Stat label="Max revenue" value={`$${projectedRev.toLocaleString()}`} />
                      </div>
                    </div>
                  )}

                  {step === 4 && (
                    <div className="space-y-4">
                      <div className="rounded-xl border border-orange-500/30 bg-gradient-to-br from-orange-500/10 to-red-600/5 p-5">
                        <div className="font-mono text-[10px] uppercase tracking-wider text-orange-300">{draft.category}</div>
                        <div className="mt-1 text-2xl font-bold">{draft.title}</div>
                        <p className="mt-2 text-sm text-muted-foreground">{draft.description}</p>
                      </div>
                      <div className="grid gap-3 md:grid-cols-2">
                        <ReviewRow icon={<Calendar className="h-4 w-4" />} label="When"
                          value={new Date(`${draft.date}T${draft.time}`).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })} />
                        <ReviewRow icon={<MapPin className="h-4 w-4" />} label="Where" value={`${draft.venue}, ${draft.city}`} />
                      </div>
                      <div className="rounded-xl border border-white/10">
                        <div className="border-b border-white/5 p-3 text-xs font-mono uppercase tracking-wider text-muted-foreground">Tiers</div>
                        {draft.tiers.map((t, i) => (
                          <div key={i} className="flex items-center justify-between border-b border-white/5 p-3 last:border-0">
                            <span className="text-sm font-medium">{t.name}</span>
                            <div className="flex gap-4 font-mono text-xs text-muted-foreground">
                              <span>${t.price}</span>
                              <span>{t.total} seats</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {errors.length > 0 && (
                <div className="mt-4 rounded-lg border border-red-500/30 bg-red-500/5 p-3">
                  {errors.map((e, i) => <div key={i} className="text-xs text-red-300">• {e}</div>)}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-white/5 p-5">
              <button onClick={back} disabled={step === 0}
                className="flex items-center gap-1.5 rounded-lg border border-white/10 px-4 py-2 text-sm text-muted-foreground hover:border-orange-500/40 disabled:opacity-30">
                <ChevronLeft className="h-4 w-4" /> Back
              </button>
              <div className="font-mono text-[10px] text-muted-foreground">Step {step + 1} / {STEPS.length}</div>
              {step < 4 ? (
                <button onClick={next} className="flame-btn flex items-center gap-1.5 rounded-lg px-5 py-2 text-sm">
                  Next <ChevronRight className="h-4 w-4" />
                </button>
              ) : (
                <button onClick={submit} className="flame-btn flex items-center gap-1.5 rounded-lg px-5 py-2 text-sm">
                  <Check className="h-4 w-4" /> Publish
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const inputCls = "w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm outline-none transition focus:border-orange-500/60 focus:ring-1 focus:ring-orange-500/30";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="mb-1.5 font-mono text-[10px] uppercase tracking-wider text-orange-300">{label}</div>
      {children}
    </label>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
      <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-0.5 text-lg font-bold flame-text">{value}</div>
    </div>
  );
}

function ReviewRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-3">
      <div className="grid h-8 w-8 place-items-center rounded-lg bg-orange-500/10 text-orange-300">{icon}</div>
      <div>
        <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
        <div className="text-sm font-medium">{value}</div>
      </div>
    </div>
  );
}
