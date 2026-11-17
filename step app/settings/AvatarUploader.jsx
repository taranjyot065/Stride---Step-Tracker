import { useRef, useState } from "react";
import { Camera, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { base44 } from "@/api/base44Client";
import { useAuth } from "@/lib/AuthContext";
import { useAvatarUrl } from "@/hooks/useAvatarUrl";
import { initialsOf } from "@/lib/profile";
import { Image } from "@/components/ui/image";

export default function AvatarUploader({ user }) {
  const { refresh } = useAuth();
  const photoUrl = useAvatarUrl(user?.avatar_uri);
  const inputRef = useRef(null);
  const [busy, setBusy] = useState(false);

  async function pick(event) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    setBusy(true);
    try {
      const { file_uri } = await base44.integrations.Core.UploadPrivateFile({ file });
      await base44.auth.updateMe({ avatar_uri: file_uri });
      await refresh();
      toast("Profile picture updated");
    } catch {
      toast.error("Couldn't use that picture. Try another image.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex items-center gap-4">
      <div className="relative grid h-20 w-20 shrink-0 place-items-center overflow-hidden rounded-full bg-ink text-xl font-semibold text-ink-foreground">
        {photoUrl ? (
          <Image
            src={photoUrl}
            alt="Your profile picture"
            fittingType="fill"
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="font-display">{initialsOf(user)}</span>
        )}
        {busy && (
          <span className="absolute inset-0 grid place-items-center bg-ink/70">
            <Loader2 className="h-5 w-5 animate-spin text-acid" />
          </span>
        )}
      </div>

      <div className="min-w-0">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={busy}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-xs font-semibold transition-colors hover:bg-secondary disabled:opacity-60"
        >
          <Camera className="h-3.5 w-3.5" />
          {photoUrl ? "Change photo" : "Add photo"}
        </button>
        <p className="mt-2 text-[11px] leading-snug text-muted-foreground">
          Stored privately. Only you can open it.
        </p>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={pick}
        />
      </div>
    </div>
  );
}