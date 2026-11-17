export default function SettingsSection({ title, description, children }) {
  return (
    <section>
      <div className="flex items-baseline justify-between px-1">
        <h2 className="font-display text-lg font-semibold tracking-tight">{title}</h2>
        {description && <span className="text-[11px] text-muted-foreground">{description}</span>}
      </div>
      <div className="mt-3 space-y-4 rounded-[26px] border border-border/70 bg-card p-4">{children}</div>
    </section>
  );
}