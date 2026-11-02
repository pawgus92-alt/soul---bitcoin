export const SIN_DEGREES = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const;

export type SinDegree = (typeof SIN_DEGREES)[number];

export const CLEANSE_LAPTOP_DEGREE = 8;
export const CLEANSE_RESERVED_DEGREE = 9;

/** Seven pages of Liber Animarum, then the laptop. */
export const CLEANSE_SIN_LATIN: Record<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8, string> = {
  1: "SUPERBIA",
  2: "AVARITIA",
  3: "LUXURIA",
  4: "INVIDIA",
  5: "GULA",
  6: "IRA",
  7: "ACEDIA",
  8: "THE DEAREST LAPTOP",
};

export function isOpenSinDegree(
  degree: number,
): degree is Exclude<SinDegree, typeof CLEANSE_RESERVED_DEGREE> {
  return degree >= 1 && degree <= CLEANSE_LAPTOP_DEGREE;
}

export function cleanseSinLatin(degree?: number | null) {
  if (
    degree === 1 ||
    degree === 2 ||
    degree === 3 ||
    degree === 4 ||
    degree === 5 ||
    degree === 6 ||
    degree === 7 ||
    degree === 8
  ) {
    return CLEANSE_SIN_LATIN[degree];
  }
  return "";
}

/** Gold bar fills across the eight open stalls; reserved sits full after the laptop. */
export function sinLadderWidthPct(degree: number) {
  return (Math.min(degree, CLEANSE_LAPTOP_DEGREE) / CLEANSE_LAPTOP_DEGREE) * 100;
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
    return "border-[#9a7438]/55 bg-gradient-to-b from-[#1e160c] to-card/72";
  }
  if (degree === 3) {
    return "border-[#b08a40]/60 bg-gradient-to-b from-[#22180c] to-card/75";
  }
  if (degree === 4) {
    return "border-[#c49a48]/68 bg-gradient-to-b from-[#261a0c] to-card/78";
  }
  if (degree === 5) {
    return "border-[#d4b05a]/75 bg-gradient-to-b from-[#2a1c0c] to-card/80 shadow-[0_0_28px_rgba(212,176,90,0.14)]";
  }
  if (degree === 6) {
    return "border-[#e0bc62]/80 bg-gradient-to-b from-[#2e1e0a] to-card/82 shadow-[0_0_32px_rgba(224,188,98,0.18)]";
  }
  if (degree === 7) {
    return "border-[#e8c868]/85 bg-gradient-to-b from-[#321e0a] to-card/85 shadow-[0_0_36px_rgba(232,200,104,0.2)]";
  }
  if (degree === 8) {
    return "border-[#f0c23a] bg-gradient-to-b from-[#3a2208] to-card/90 shadow-[0_0_44px_rgba(240,194,58,0.28)]";
  }
  return "border-primary/20 bg-card/70";
}
