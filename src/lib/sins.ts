export const SIN_DEGREES = [1, 2, 3, 4, 5, 6] as const;

export type SinDegree = (typeof SIN_DEGREES)[number];

export function isOpenSinDegree(degree: number): degree is Exclude<SinDegree, 6> {
  return degree >= 1 && degree <= 5;
}
