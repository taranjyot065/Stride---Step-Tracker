import { distanceParts } from "@/lib/steps";

const R = 66;
const CIRC = 2 * Math.PI * R;

export default function LiveStepRing({ steps, goal, distanceKm, units }) {
  const pct = goal ? Math.min(1, steps / goal) : 0;
  const distance = distanceParts(distanceKm, units);

  return (
    <div className="flex flex-col items-center">
      <div className="relative h-52 w-52">
        <svg viewBox="0 0 160 160" className="h-full w-full -rotate-90">
          <circle cx="80" cy="80" r={R} fill="none" stroke="hsl(var(--foreground) / 0.08)" strokeWidth="12" />
          <circle
            cx="80"
            cy="80"
            r={R}
            fill="none"
            stroke="hsl(var(--acid))"
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={CIRC}
            strokeDashoffset={CIRC * (1 - pct)}
            className="transition-all duration-500"
          />
        </svg>
        <div className="absolute inset-0 grid place-content-center px-6 text-center">
          <p className="font-display text-[2.6rem] font-semibold leading-none tracking-tight tabular-nums">
            {steps.toLocaleString("en-US")}
          </p>
          <p className="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            steps
          </p>
        </div>
      </div>
      <p className="mt-4 text-center text-[11px] text-muted-foreground">
        {Math.round(pct * 100)}% of {goal.toLocaleString("en-US")} · {distance.value} {distance.unit} walked
      </p>
    </div>
  );
}