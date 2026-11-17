import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { base44 } from "@/api/base44Client";
import { useAuth } from "@/lib/AuthContext";
import { displayNameOf } from "@/lib/profile";
import AvatarUploader from "@/components/settings/AvatarUploader";
import InterestChips from "@/components/settings/InterestChips";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ProfileEditor({ user }) {
  const { refresh } = useAuth();
  const [name, setName] = useState(() => (user?.display_name || user?.full_name || "").trim());
  const [age, setAge] = useState(() => (user?.age ? String(user.age) : ""));
  const [interests, setInterests] = useState(() => user?.interests ?? []);
  const [busy, setBusy] = useState(false);

  const ageNumber = Number(age);
  const ageOk = !age || (Number.isFinite(ageNumber) && ageNumber >= 10 && ageNumber <= 110);
  const nameOk = name.trim().length >= 2;
  const dirty =
    name.trim() !== displayNameOf(user) ||
    age.trim() !== String(user?.age ?? "") ||
    interests.join("|") !== (user?.interests ?? []).join("|");

  async function save() {
    if (!nameOk || !ageOk) return;
    setBusy(true);
    try {
      await base44.auth.updateMe({
        display_name: name.trim(),
        ...(age ? { age: ageNumber } : {}),
        interests,
      });
      await refresh();
      toast("Profile saved");
    } catch {
      toast.error("Couldn't save your profile. Try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-5">
      <AvatarUploader user={user} />

      <div className="space-y-2">
        <Label htmlFor="profile-name">Name</Label>
        <Input
          id="profile-name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Your name"
          maxLength={40}
          className="h-12"
        />
        <p className="text-[11px] text-muted-foreground">This is the name Stride greets you with.</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="profile-age">Age</Label>
        <Input
          id="profile-age"
          type="number"
          inputMode="numeric"
          min={10}
          max={110}
          value={age}
          onChange={(event) => setAge(event.target.value)}
          placeholder="e.g. 27"
          className="h-12"
        />
        {!ageOk && (
          <p className="text-[11px] text-destructive">Enter an age between 10 and 110.</p>
        )}
      </div>

      <div className="space-y-2">
        <Label>What you like doing</Label>
        <InterestChips value={interests} onChange={setInterests} />
      </div>

      <button
        type="button"
        onClick={save}
        disabled={busy || !dirty || !nameOk || !ageOk}
        className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-2xl bg-ink text-sm font-semibold text-ink-foreground transition-opacity disabled:opacity-40"
      >
        {busy && <Loader2 className="h-4 w-4 animate-spin" />}
        {busy ? "Saving..." : dirty ? "Save changes" : "Everything saved"}
      </button>
    </div>
  );
}