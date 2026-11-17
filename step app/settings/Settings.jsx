import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, LogOut } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { base44 } from "@/api/base44Client";
import { useAuth } from "@/lib/AuthContext";
import { useSteps } from "@/lib/StepsProvider";
import { GOAL_OPTIONS, formatDistance } from "@/lib/steps";
import ProfileCard from "@/components/settings/ProfileCard";
import ProfileEditor from "@/components/settings/ProfileEditor";
import ChangePassword from "@/components/settings/ChangePassword";
import SettingsSection from "@/components/settings/SettingsSection";
import SegmentedControl from "@/components/settings/SegmentedControl";
import ToggleRow from "@/components/settings/ToggleRow";
import DeleteAccount from "@/components/settings/DeleteAccount";

export const Route = createFileRoute("/_authed/settings")({
  head: () => ({
    meta: [
      { title: "You · Stride" },
      { name: "description", content: "Your profile, daily goal, units and reminders." },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  const { user, refresh, logout } = useAuth();
  const { steps, goal, units, distance } = useSteps();
  const [busy, setBusy] = useState(false);

  const update = async (patch) => {
    setBusy(true);
    try {
      await base44.auth.updateMe(patch);
      await refresh();
    } catch {
      toast.error("Couldn't save that. Try again.");
    } finally {
      setBusy(false);
    }
  };

  const alerts = {
    goal: user?.notify_goal ?? true,
    reminder: user?.notify_reminder ?? true,
    recap: user?.notify_recap ?? false,
  };

  return (
    <div className="space-y-6">
      <header>
        <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
          Settings
        </p>
        <h1 className="mt-1.5 font-display text-[1.7rem] font-semibold leading-none tracking-tight">
          Your corner
        </h1>
      </header>

      <ProfileCard
        user={user}
        steps={steps}
        distanceLabel={formatDistance(distance, units)}
        goalPct={goal ? Math.min(100, Math.round((steps / goal) * 100)) : 0}
      />

      <SettingsSection title="Profile" description="Photo, name, age and what you enjoy">
        <ProfileEditor user={user} />
      </SettingsSection>

      <SettingsSection title="Daily goal" description="Steps per day">
        <SegmentedControl
          value={goal}
          onChange={(value) => update({ daily_goal: value })}
          options={GOAL_OPTIONS.map((value) => ({ value, label: `${value / 1000}k` }))}
        />
        <p className="text-[11px] leading-relaxed text-muted-foreground">
          Distance is estimated from your step count with a 0.72 m average stride. No location is
          used or stored.
        </p>
      </SettingsSection>

      <SettingsSection title="Units">
        <SegmentedControl
          value={units}
          onChange={(value) => update({ units: value })}
          options={[
            { value: "km", label: "Kilometres" },
            { value: "mi", label: "Miles" },
          ]}
        />
      </SettingsSection>

      <SettingsSection title="Notifications">
        <ToggleRow
          title="Daily goal"
          description="A nudge when you're close to your target."
          on={alerts.goal}
          onToggle={(value) => update({ notify_goal: value })}
        />
        <ToggleRow
          title="Move reminder"
          description="One gentle reminder if you've been still."
          on={alerts.reminder}
          onToggle={(value) => update({ notify_reminder: value })}
        />
        <ToggleRow
          title="Weekly recap"
          description="A summary of your week every Sunday."
          on={alerts.recap}
          onToggle={(value) => update({ notify_recap: value })}
        />
      </SettingsSection>

      <SettingsSection title="Account">
        <ChangePassword email={user?.email} />
        <Link
          to="/about"
          className="flex items-center justify-between gap-4 border-t border-border pt-3"
        >
          <div className="min-w-0">
            <p className="text-sm font-semibold">About Stride</p>
            <p className="mt-0.5 text-[11px] text-muted-foreground">
              How counting works, and who makes it.
            </p>
          </div>
          <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
        </Link>
        <DeleteAccount />
      </SettingsSection>

      <button
        type="button"
        disabled={busy}
        onClick={() => logout()}
        className="flex w-full items-center justify-center gap-2 rounded-2xl border border-border bg-card py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary disabled:opacity-60"
      >
        <LogOut className="h-4 w-4" /> Sign out
      </button>
    </div>
  );
}