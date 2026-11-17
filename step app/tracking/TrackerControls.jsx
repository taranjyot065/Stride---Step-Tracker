import { Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";

export default function TrackerControls({ status, onStart, onPause, onResume }) {
  const requesting = status === "requesting";
  const live = status === "live" || status === "no-signal";
  const paused = status === "paused";

  return (
    <button
      type="button"
      onClick={live ? onPause : paused ? onResume : onStart}
      disabled={requesting}
      className={cn(
        "mt-5 flex w-full items-center justify-center gap-2.5 rounded-full bg-acid px-6 py-4 text-sm font-semibold text-ink shadow-[0_14px_30px_-14px_hsl(76_88%_35%/0.9)] transition-transform active:scale-[0.98] disabled:opacity-60",
      )}
    >
      {live ? (
        <>
          <Pause className="h-4 w-4" fill="currentColor" /> Pause tracking
        </>
      ) : paused ? (
        <>
          <Play className="h-4 w-4" fill="currentColor" /> Resume tracking
        </>
      ) : (
        <>
          <Play className="h-4 w-4" fill="currentColor" />
          {requesting ? "Waiting for permission…" : "Enable step tracking"}
        </>
      )}
    </button>
  );
}