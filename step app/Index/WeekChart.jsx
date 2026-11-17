export default function WeekChart({ days }) {
  const max = Math.max(1, ...days.map((d) => d.steps));
  const avg = Math.round(days.reduce((sum, d) => sum + d.steps, 0) / (days.length || 1));

  return (
    <section className="rounded-[26px] border border-border/70 bg-card p-5">
      <div className="flex items-baseline justify-between">
        <h2 className="font-display text-lg font-semibold tracking-tight">This week</h2>
        <p className="text-[11px] font-medium text-muted-foreground">
          {avg.toLocaleString("en-US")} avg
        </p>
      </div>

      <div className="mt-6 flex h-32 items-end gap-2">
        {days.map((day) => (
          <div key={day.key} className="flex h-full flex-1 flex-col items-center gap-2">
            <div className="flex w-full flex-1 items-end">
              <div
                className={`w-full rounded-full transition-all duration-500 ${
                  day.today ? "bg-acid" : "bg-foreground/10"
                }`}
                style={{ height: `${Math.max(4, (day.steps / max) * 100)}%` }}
                title={`${day.steps.toLocaleString("en-US")} steps`}
              />
            </div>
            <span
              className={`text-[10px] font-semibold ${
                day.today ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {day.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}