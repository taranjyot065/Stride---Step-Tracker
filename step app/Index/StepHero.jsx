const R = 50;
const CIRC = 2 * Math.PI * R;

export default function StepHero({ steps, goal, distanceLabel }) {
  const pct = goal ? Math.min(1, steps / goal) : 0;
  const remaining = Math.max(0, goal - steps);
  const reached = steps >= goal;

  return (
    <section className="relative overflow-hidden rounded-[30px] bg-ink p-6 text-ink-foreground">
      <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-acid/25 blur-3xl" />
      <div className="relative flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-ink-foreground/45">
            Steps today
          </p>
          <p className="mt-2 font-display text-[3.4rem] font-semibold leading-[0.85] tracking-tight tabular-nums">
            {steps.toLocaleString("en-US")}
          </p>
          <p className="mt-2.5 text-xs text-ink-foreground/50">
            of {goal.toLocaleString("en-US")} daily goal
          </p>
        </div>
        <div className="relative h-[88px] w-[88px] shrink-0">
          <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
            <circle cx="60" cy="60" r={R} fill="none" stroke="hsl(var(--ink-foreground) / 0.14)" strokeWidth="10" />
            <circle
              cx="60"
              cy="60"
              r={R}
              fill="none"
              stroke="hsl(var(--acid))"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={CIRC}
              strokeDashoffset={CIRC * (1 - pct)}
              className="transition-all duration-500"
            />
          </svg>
          <span className="absolute inset-0 grid place-items-center font-display text-base font-semibold">
            {Math.round(pct * 100)}%
          </span>
        </div>
      </div>

      <div className="relative mt-6 flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-acid px-3 py-1.5 text-[11px] font-semibold text-ink">
          {reached ? "Goal reached" : `${remaining.toLocaleString("en-US")} steps to go`}
        </span>
        <span className="rounded-full border border-ink-foreground/15 px-3 py-1.5 text-[11px] font-medium text-ink-foreground/65">
          {distanceLabel} today
        </span>
      </div>
    </section>
  );
}