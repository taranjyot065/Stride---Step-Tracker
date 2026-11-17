import { cn } from "@/lib/utils";
import { INTEREST_OPTIONS } from "@/lib/interests";
import { Check } from "lucide-react";

export default function InterestChips({ value = [], onChange, disabled = false }) {
  const toggle = (interest) => {
    if (disabled) return;
    onChange(
      value.includes(interest) ? value.filter((item) => item !== interest) : [...value, interest],
    );
  };

  return (
    <div className="flex select-none flex-wrap gap-2">
      {INTEREST_OPTIONS.map((interest) => {
        const active = value.includes(interest);
        return (
          <button
            key={interest}
            type="button"
            aria-pressed={active}
            onClick={() => toggle(interest)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-xs font-semibold transition-colors",
              active
                ? "border-transparent bg-ink text-ink-foreground"
                : "border-border bg-background text-muted-foreground hover:bg-secondary hover:text-foreground",
            )}
          >
            {active && <Check className="h-3 w-3 text-acid" strokeWidth={3} />}
            {interest}
          </button>
        );
      })}
    </div>
  );
}