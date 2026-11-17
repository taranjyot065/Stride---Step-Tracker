import { cn } from "@/lib/utils";

export default function MotionWave({ levels, live }) {
  return (
    <div className="flex h-14 items-end gap-1" aria-hidden="true">
      {levels.map((level, i) => (
        <span
          key={i}
          className={cn(
            "flex-1 rounded-full transition-all duration-150",
            live ? "bg-acid/80" : "bg-foreground/10",
          )}
          style={{ height: `${Math.max(6, Math.min(100, level * 100))}%` }}
        />
      ))}
    </div>
  );
}