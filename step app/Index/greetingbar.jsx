import { friendlyDate, localDateKey } from "@/lib/steps";

export default function GreetingBar({ name, live }) {
  const initials = (name || "Stride").slice(0, 2).toUpperCase();

  return (
    <header>
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            {friendlyDate(localDateKey())}
          </p>
          {live && (
            <span className="flex items-center gap-1.5 rounded-full border border-border bg-card px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-acid soft-pulse" /> Live
            </span>
          )}
        </div>
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-accent text-xs font-semibold text-accent-foreground">
          {initials}
        </div>
      </div>
      <h1 className="mt-3 break-words font-display text-[1.85rem] font-semibold leading-[1.05] tracking-tight sm:text-[2.1rem]">
        Let's move, {name}
      </h1>
    </header>
  );
}