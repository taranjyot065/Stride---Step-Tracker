import { Flame } from "lucide-react";

export default function StreakCard({ streak }) {
  const filled = Math.min(14, streak);

  return (
    <section className="relative overflow-hidden rounded-[26px] border border-border/70 bg-card p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            Current streak
          </p>
          <p className="mt-2 font-display text-4xl font-semibold leading-none tracking-tight">
            {streak}
            <span className="ml-1.5 font-body text-sm font-medium text-muted-foreground">
              {streak === 1 ? "day" : "days"}
            </span>
          </p>
        </div>
        <span className="grid h-11 w-11 place-items-center rounded-full bg-accent/10 text-accent">
          <Flame className="h-5 w-5" />
        </span>
      </div>

      <div className="mt-5 flex items-center gap-1.5">
        {Array.from({ length: 14 }).map((_, i) => (
          <span
            key={i}
            className={`h-2 flex-1 rounded-full ${i >= 14 - filled ? "bg-acid" : "bg-foreground/10"}`}
          />
        ))}
      </div>
      <p className="mt-3 text-[11px] text-muted-foreground">
        {streak > 0
          ? "Half a goal counts — keep it alive with a short walk."
          : "Reach half your daily goal to start a streak."}
      </p>
    </section>
  );
}