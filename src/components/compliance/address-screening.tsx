import type { ScreenResult } from "@/types/compliance";

export function AddressScreening({
  result,
  waiting,
  waitLabel,
}: {
  result: ScreenResult | null;
  waiting: boolean;
  waitLabel: string;
}) {
  if (waiting) {
    return <p className="ms-latin text-[11px] tracking-[0.16em] text-[var(--ms-brass)]">{waitLabel}</p>;
  }
  if (!result) return null;
  return (
    <p className="ms-latin text-[11px] tracking-[0.14em] text-[var(--ms-brass)]">
      {result.risk}
    </p>
  );
}
