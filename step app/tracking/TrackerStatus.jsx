const LABELS = {
  live: { text: "Live", dot: "bg-acid" },
  "no-signal": { text: "No signal", dot: "bg-acid/40" },
  paused: { text: "Paused", dot: "bg-foreground/40" },
  requesting: { text: "Permission", dot: "bg-foreground/40" },
  denied: { text: "Blocked", dot: "bg-destructive" },
  unsupported: { text: "Unavailable", dot: "bg-destructive" },
  idle: { text: "Off", dot: "bg-foreground/25" },
};

export default function TrackerStatus({ status }) {
  const state = LABELS[status] ?? LABELS.idle;

  return (
    <span className="flex items-center gap-1.5 rounded-full border border-border bg-card px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
      <span className={`h-1.5 w-1.5 rounded-full ${state.dot}`} /> {state.text}
    </span>
  );
}