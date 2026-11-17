export default function SaveHint({ loaded, saving, savedAt }) {
  const text = !loaded
    ? "Loading today's steps…"
    : saving
      ? "Saving…"
      : savedAt
        ? `Saved ${new Date(savedAt).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}`
        : "Saved automatically";

  return <p className="mt-3 text-center text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{text}</p>;
}