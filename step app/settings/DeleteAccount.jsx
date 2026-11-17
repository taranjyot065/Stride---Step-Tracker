import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { deleteAccount } from "@/lib/server-fns";
import { useAuth } from "@/lib/AuthContext";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function DeleteAccount() {
  const { logout } = useAuth();
  const purge = useServerFn(deleteAccount);
  const [open, setOpen] = useState(false);
  const [word, setWord] = useState("");
  const [busy, setBusy] = useState(false);

  const armed = word.trim().toUpperCase() === "DELETE";

  const handleOpenChange = (next) => {
    setOpen(next);
    if (!next) setWord("");
  };

  const handleDelete = async (event) => {
    event.preventDefault();
    if (!armed || busy) return;
    setBusy(true);
    try {
      await purge();
      toast.success("Your account is deleted.");
      try {
        await logout();
      } catch {
        window.location.reload();
      }
    } catch {
      setBusy(false);
      toast.error("Couldn't delete this account. Try again.");
    }
  };

  return (
    <div className="flex items-center justify-between gap-4 border-t border-border pt-3">
      <div className="min-w-0">
        <p className="text-sm font-semibold">Delete account</p>
        <p className="mt-0.5 text-[11px] text-muted-foreground">
          Removes your profile and every saved day.
        </p>
      </div>
      <AlertDialog open={open} onOpenChange={handleOpenChange}>
        <AlertDialogTrigger asChild>
          <button
            type="button"
            className="shrink-0 select-none rounded-full border border-destructive/40 px-3.5 py-2 text-xs font-semibold text-destructive transition-colors hover:bg-destructive/10"
          >
            Delete
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent className="max-w-[22rem] rounded-3xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-display text-lg">Delete your account?</AlertDialogTitle>
            <AlertDialogDescription className="text-[13px] leading-relaxed">
              Your profile, step history and streak are erased and you'll be signed out. This can't
              be undone from inside the app.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="space-y-2">
            <label
              htmlFor="delete-confirm"
              className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground"
            >
              Type DELETE to confirm
            </label>
            <Input
              id="delete-confirm"
              value={word}
              onChange={(event) => setWord(event.target.value)}
              placeholder="DELETE"
              autoComplete="off"
              autoCapitalize="characters"
              className="h-11 rounded-xl"
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-xl" disabled={busy}>
              Keep my account
            </AlertDialogCancel>
            <AlertDialogAction
              disabled={!armed || busy}
              onClick={handleDelete}
              className="rounded-xl bg-destructive text-destructive-foreground hover:bg-destructive/90 disabled:opacity-50"
            >
              {busy ? "Deleting…" : "Delete account"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}