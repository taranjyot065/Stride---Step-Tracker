import { Footprints } from "lucide-react";

export default function RecentDays({ days }) {
  const empty = days.every((day) => day.steps === 0);

  return (
    <section>
      <div className="flex items-baseline justify-between px-1">
        <h2 className="font-display text-lg font-semibold tracking-tight">Recent days</h2>
        <span className="text-[11px] font-medium text-muted-foreground">Last {days.length}</span>
      </div>

      <div className="mt-3 divide-y divide-border/70 overflow-hidden rounded-[26px] border border-border/70 bg-card">
        {empty ? (
          <p className="px-4 py-6 text-center text-xs text-muted-foreground">
            No movement logged yet — start the tracker and take a walk.
          </p>
        ) : (
          days.map((day) => (
            <div key={day.key} className="flex items-center gap-3.5 px-4 py-3.5">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-secondary text-accent">
                <Footprints className="h-[18px] w-[18px]" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">{day.label}</p>
                <p className="mt-0.5 truncate text-[11px] text-muted-foreground">{day.dateLabel}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold tabular-nums">
                  {day.steps.toLocaleString("en-US")}
                </p>
                <p className="mt-0.5 text-[11px] text-muted-foreground">{day.distanceLabel}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}