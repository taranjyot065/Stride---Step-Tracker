import { cn } from "@/lib/utils";

export default function SegmentedControl({ options, value, onChange, label }) {
  return (
    <div>
      {label && <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">{label}</p>}
      <div className="flex select-none gap-1 rounded-2xl bg-secondary p-1">
        {options.map((option) => {
          const active = option.value === value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              className={cn(
                "flex-1 rounded-xl px-2 py-2.5 text-xs font-semibold transition-all duration-200",
                active ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}