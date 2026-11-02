export const SOL_RARITIES = ["common", "rare", "epic", "legendary"] as const;
export type SolRarity = (typeof SOL_RARITIES)[number];

export const SOL_RARITY_META: Record<
  SolRarity,
  { amount: number; count: number; rate: string; label: string }
> = {
  common: { amount: 0.5, count: 30, rate: "60%", label: "COMMON" },
  rare: { amount: 1, count: 12, rate: "24%", label: "RARE" },
  epic: { amount: 2, count: 6, rate: "12%", label: "EPIC" },
  legendary: { amount: 8, count: 2, rate: "4%", label: "LEGENDARY" },
};

function seededShuffle<T>(items: T[], seed: number): T[] {
  const out = [...items];
  let a = seed >>> 0;
  for (let i = out.length - 1; i > 0; i -= 1) {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    const j = Math.floor((((t ^ (t >>> 14)) >>> 0) / 4294967296) * (i + 1));
    const swap = out[i];
    out[i] = out[j];
    out[j] = swap;
  }
  return out;
}

function buildDeck(): SolRarity[] {
  const bag: SolRarity[] = [
    ...Array.from({ length: SOL_RARITY_META.common.count }, () => "common" as const),
    ...Array.from({ length: SOL_RARITY_META.rare.count }, () => "rare" as const),
    ...Array.from({ length: SOL_RARITY_META.epic.count }, () => "epic" as const),
    ...Array.from(
      { length: SOL_RARITY_META.legendary.count },
      () => "legendary" as const,
    ),
  ];
  return seededShuffle(bag, 1666);
}

/** Fifty slots, shuffled once. Index 0 is edition 1. */
export const SOL_DECK: SolRarity[] = buildDeck();

export function solEditionsOf(rarity: SolRarity): number[] {
  return SOL_DECK.flatMap((item, index) => (item === rarity ? [index + 1] : []));
}

export function solEncounterLine(rarity: SolRarity) {
  const meta = SOL_RARITY_META[rarity];
  return `${meta.label} · ${meta.rate} · ${meta.count} of 50`;
}
