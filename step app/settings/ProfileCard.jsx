import { useAvatarUrl } from "@/hooks/useAvatarUrl";
import { displayNameOf, initialsOf } from "@/lib/profile";
import { Image } from "@/components/ui/image";

export default function ProfileCard({ user, steps, distanceLabel, goalPct }) {
  const name = displayNameOf(user);
  const email = user?.email || "Not signed in";
  const photoUrl = useAvatarUrl(user?.avatar_uri);

  return (
    <section className="relative overflow-hidden rounded-[30px] bg-ink p-5 text-ink-foreground">
      <div className="pointer-events-none absolute -right-14 -top-16 h-44 w-44 rounded-full bg-acid/20 blur-3xl" />
      <div className="relative flex items-center gap-4">
        <div className="grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-full bg-acid font-display text-lg font-semibold text-ink">
          {photoUrl ? (
            <Image src={photoUrl} alt="" fittingType="fill" className="h-full w-full object-cover" />
          ) : (
            initialsOf(user)
          )}
        </div>
        <div className="min-w-0">
          <p className="truncate font-display text-xl font-semibold tracking-tight">{name}</p>
          <p className="mt-0.5 truncate text-xs text-ink-foreground/55">{email}</p>
        </div>
      </div>
      <div className="relative mt-5 grid grid-cols-3 gap-2 border-t border-ink-foreground/10 pt-4 text-center">
        {[
          { k: steps.toLocaleString("en-US"), l: "Steps today" },
          { k: distanceLabel, l: "Walked" },
          { k: `${goalPct}%`, l: "Of goal" },
        ].map((item) => (
          <div key={item.l}>
            <p className="font-display text-base font-semibold tabular-nums">{item.k}</p>
            <p className="mt-0.5 text-[10px] uppercase tracking-wider text-ink-foreground/45">{item.l}</p>
          </div>
        ))}
      </div>
    </section>
  );
}