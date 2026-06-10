export function Background() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-60" />
      <div className="absolute inset-0 mesh-overlay" />
      <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(255,69,0,0.35),transparent_70%)] blur-2xl animate-pulse-glow" />
      <div className="absolute top-1/3 -right-32 h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle,rgba(255,140,0,0.25),transparent_70%)] blur-2xl animate-pulse-glow" />
      <div className="absolute bottom-0 left-1/3 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(255,69,0,0.18),transparent_70%)] blur-2xl" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />
    </div>
  );
}
