import { cn } from "@/lib/utils";

export default function ToggleRow({ title, description, on, onToggle }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="min-w-0">
        <p className="text-sm font-semibold">{title}</p>
        {description && <p className="mt-0.5 text-[11px] leading-relaxed text-muted-foreground">{description}</p>}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={on}
        aria-label={title}
        onClick={() => onToggle(!on)}
        className={cn(
          "relative h-6 w-11 shrink-0 rounded-full p-0.5 transition-colors duration-200",
          on ? "bg-ink" : "bg-secondary"
        )}
      >
        <span
          className={cn(
            "block h-5 w-5 rounded-full transition-transform duration-300",
            on ? "translate-x-5 bg-acid" : "translate-x-0 bg-card shadow"
          )}
        />
      </button>
    </div>
  );
}