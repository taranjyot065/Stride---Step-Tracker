import { Footprints } from "lucide-react";

export default function TestSteps({ status, onAdd }) {
  if (status === "live") return null;

  return (
    <div className="rounded-[22px] border border-dashed border-border bg-card/60 p-4 text-center">
      <p className="text-[11px] text-muted-foreground">
        Testing in a browser? The sensor only reports movement on a phone, so add steps by hand.
      </p>
      <button
        type="button"
        onClick={() => onAdd(250)}
        className="mt-3 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold transition-colors hover:bg-secondary"
      >
        <Footprints className="h-3.5 w-3.5" /> + 250 steps
      </button>
    </div>
  );
}