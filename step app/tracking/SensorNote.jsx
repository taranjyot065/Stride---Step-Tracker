const NOTES = {
  idle: "Stride reads your phone's motion sensor to count steps. No location, no GPS. Keep this tab open while you walk.",
  requesting: "Approve the motion access prompt to start counting.",
  live: "Counting live. Steps save on their own while this app is open in the foreground.",
  paused: "Tracking is paused — nothing is being counted right now.",
  "no-signal": "Motion access is on but no movement has arrived yet. On some browsers this only works on a phone, not a desktop.",
  denied: "Motion access was blocked. Allow motion & orientation access in your browser settings, then try again.",
  unsupported: "This device doesn't expose a motion sensor. Open Stride on your phone to count real steps.",
};

export default function SensorNote({ status }) {
  return (
    <p className="mt-4 text-center text-[11px] leading-relaxed text-muted-foreground">
      {NOTES[status] ?? NOTES.idle}
    </p>
  );
}