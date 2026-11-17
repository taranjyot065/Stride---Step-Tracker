import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { useAuth } from "@/lib/AuthContext";
import { firstNameOf } from "@/lib/profile";
import { useSteps } from "@/lib/StepsProvider";
import { useRecentDays } from "@/hooks/useRecentDays";
import {
  computeStreak,
  distanceKm,
  formatDistance,
  keyToDate,
  recentDateKeys,
  relativeDayLabel,
  shortDayLabel,
} from "@/lib/steps";
import GreetingBar from "@/components/dashboard/GreetingBar";
import StepHero from "@/components/dashboard/StepHero";
import StatTiles from "@/components/dashboard/StatTiles";
import WeekChart from "@/components/dashboard/WeekChart";
import StreakCard from "@/components/dashboard/StreakCard";
import RecentDays from "@/components/dashboard/RecentDays";
import PullToRefresh from "@/components/dashboard/PullToRefresh";

export const Route = createFileRoute("/_authed/")({
  head: () => ({
    meta: [
      { title: "Today · Stride" },
      { name: "description", content: "Your daily step count, distance and movement streak." },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const { user } = useAuth();
  const { steps, goal, units, stride, distance, activeMin, kcal, dayKey, status } = useSteps();
  const { days: records, refresh } = useRecentDays(30);

  const firstName = firstNameOf(user);

  const byKey = useMemo(() => new Map(records.map((record) => [record.date, record])), [records]);

  const week = useMemo(
    () =>
      recentDateKeys(7)
        .reverse()
        .map((key) => ({
          key,
          label: shortDayLabel(key),
          steps: key === dayKey ? steps : byKey.get(key)?.steps ?? 0,
          today: key === dayKey,
        })),
    [byKey, dayKey, steps],
  );

  const recent = useMemo(
    () =>
      recentDateKeys(6).map((key) => {
        const record = byKey.get(key);
        const daySteps = key === dayKey ? steps : record?.steps ?? 0;
        return {
          key,
          label: relativeDayLabel(key, dayKey),
          dateLabel: keyToDate(key).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
          }),
          steps: daySteps,
          distanceLabel: formatDistance(
            key === dayKey ? distance : record?.distance_km ?? distanceKm(daySteps, stride),
            units,
          ),
        };
      }),
    [byKey, dayKey, steps, distance, stride, units],
  );

  const streak = computeStreak({
    byKey,
    todayKey: dayKey,
    todaySteps: steps,
    goal,
  });

  return (
    <PullToRefresh onRefresh={refresh}>
      <div className="space-y-5">
        <GreetingBar name={firstName} live={status === "live" || status === "no-signal"} />
        <StepHero steps={steps} goal={goal} distanceLabel={formatDistance(distance, units)} />
        <StatTiles distanceKm={distance} units={units} activeMin={activeMin} kcal={kcal} />
        <div className="grid gap-5 md:grid-cols-2">
          <WeekChart days={week} />
          <StreakCard streak={streak} />
        </div>
        <RecentDays days={recent} />
      </div>
    </PullToRefresh>
  );
}