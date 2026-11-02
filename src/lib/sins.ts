export const SIN_DEGREES = [1, 2, 3, 4, 5, 6] as const;

export type SinDegree = (typeof SIN_DEGREES)[number];

/** Latin names for the open stalls. Degree V stays the laptop, not a renamed sin. */
export const CLEANSE_SIN_LATIN: Record<1 | 2 | 3 | 4 | 5, string> = {
  1: "VANITAS",
  2: "AVARITIA",
  3: "INVIDIA",
  4: "SUPERBIA",
  5: "DEGREE V",
};

export function isOpenSinDegree(degree: number): degree is Exclude<SinDegree, 6> {
  return degree >= 1 && degree <= 5;
}

export function cleanseSinLatin(degree?: number | null) {
  if (degree === 1 || degree === 2 || degree === 3 || degree === 4 || degree === 5) {
    return CLEANSE_SIN_LATIN[degree];
  }
  return "";
}

/** Gold climbs the ladder so the dearer sin looks more worth buying. */
export function sinLadderClass(degree: number, reserved?: boolean) {
  if (reserved) {
    return "border-dashed border-primary/20 bg-card/40";
  }
  if (degree === 1) {
    return "border-[#8a6a32]/50 bg-gradient-to-b from-[#1a140c] to-card/70";
  }
  if (degree === 2) {
    return "border-[#b08a40]/60 bg-gradient-to-b from-[#22180c] to-card/75";
  }
  if (degree === 3) {
    return "border-[#d4b05a]/75 bg-gradient-to-b from-[#2a1c0c] to-card/80 shadow-[0_0_28px_rgba(212,176,90,0.14)]";
  }
  if (degree === 4) {
    return "border-[#e8c868]/85 bg-gradient-to-b from-[#321e0a] to-card/85 shadow-[0_0_36px_rgba(232,200,104,0.2)]";
  }
  if (degree === 5) {
    return "border-[#f0c23a] bg-gradient-to-b from-[#3a2208] to-card/90 shadow-[0_0_44px_rgba(240,194,58,0.28)]";
  }
  return "border-primary/20 bg-card/70";
}
