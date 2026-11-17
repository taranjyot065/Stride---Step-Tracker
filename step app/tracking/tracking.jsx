import { createFileRoute } from "@tanstack/react-router";
import { useSteps } from "@/lib/StepsProvider";
import LiveStepRing from "@/components/tracking/LiveStepRing";
import MotionWave from "@/components/tracking/MotionWave";
import TrackerControls from "@/components/tracking/TrackerControls";
import TrackerStatus from "@/components/tracking/TrackerStatus";
import SensorNote from "@/components/tracking/SensorNote";
import SaveHint from "@/components/tracking/SaveHint";
import TestSteps from "@/components/tracking/TestSteps";
import StatTiles from "@/components/dashboard/StatTiles";

export const Route = createFileRoute("/_authed/tracking")({
  head: () => ({
    meta: [
      { title: "Track · Stride" },
      { name: "description", content: "Count your steps and distance from your phone's motion sensor." },
    ],
  }),
  component: TrackingPage,
});

function TrackingPage() {
  const {
    steps,
    goal,
    units,
    distance,
    activeMin,
    kcal,
    status,
    motion,
    start,
    pause,
    resume,
    addSteps,
    saving,
    savedAt,
    loaded,
  } = useSteps();

  return (
    <div className="space-y-4">
      <header className="flex items-end justify-between gap-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            Move
          </p>
          <h1 className="mt-1.5 font-display text-[1.7rem] font-semibold leading-none tracking-tight">
            Step tracker
          </h1>
        </div>
        <TrackerStatus status={status} />
      </header>

      <section className="rounded-[30px] border border-border/70 bg-card p-5">
        <LiveStepRing steps={steps} goal={goal} distanceKm={distance} units={units} />
        <div className="mt-5">
          <MotionWave levels={motion} live={status === "live"} />
        </div>
        <div className="mt-4">
          <StatTiles distanceKm={distance} units={units} activeMin={activeMin} kcal={kcal} />
        </div>
        <TrackerControls status={status} onStart={start} onPause={pause} onResume={resume} />
        <SaveHint loaded={loaded} saving={saving} savedAt={savedAt} />
        <SensorNote status={status} />
      </section>

      <TestSteps status={status} onAdd={addSteps} />
    </div>
  );
}