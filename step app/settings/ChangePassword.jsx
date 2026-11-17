import { useState } from "react";
import { KeyRound, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { base44 } from "@/api/base44Client";

// Passwords are handled by the platform, so a change happens through the
// emailed reset link rather than by typing a new one here.
export default function ChangePassword({ email }) {
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);

  async function send() {
    if (!email) return;
    setBusy(true);
    try {
      await base44.auth.resetPasswordRequest(email);
      setSent(true);
      toast("Reset link sent", { description: `Check ${email} to set a new password.` });
    } catch {
      toast.error("Couldn't send the link. Try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="min-w-0">
        <p className="text-sm font-semibold">Password</p>
        <p className="mt-0.5 truncate text-[11px] text-muted-foreground">
          {sent ? "Link sent — open it to choose a new one." : "We'll email you a secure reset link."}
        </p>
      </div>
      <button
        type="button"
        onClick={send}
        disabled={busy || !email}
        className="inline-flex shrink-0 items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-xs font-semibold transition-colors hover:bg-secondary disabled:opacity-60"
      >
        {busy ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <KeyRound className="h-3.5 w-3.5" />}
        {sent ? "Send again" : "Change"}
      </button>
    </div>
  );
}