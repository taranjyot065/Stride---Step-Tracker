import { Flame, Route, Timer } from "lucide-react";
import { distanceParts } from "@/lib/steps";

export default function StatTiles({ distanceKm, units, activeMin, kcal }) {
  const distance = distanceParts(distanceKm, units);

  const tiles = [
    { label: "Distance", value: distance.value, unit: distance.unit, Icon: Route },
    { label: "Active", value: activeMin, unit: "min", Icon: Timer },
    { label: "Burned", value: kcal, unit: "kcal", Icon: Flame },
  ];

  return (
    <div className="grid grid-cols-3 gap-3">
      {tiles.map(({ label, value, unit, Icon }) => (
        <div key={label} className="rounded-[22px] border border-border/70 bg-card p-3.5">
          <Icon className="h-4 w-4 text-accent" strokeWidth={2.2} />
          <p className="mt-3 font-display text-xl font-semibold leading-none tracking-tight tabular-nums">{value}</p>
          <p className="mt-1.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
            {unit} · {label}
          </p>
        </div>
      ))}
    </div>
  );
}