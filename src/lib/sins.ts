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

export const MORTAL_SINS = [
  "SUPERBIA",
  "AVARITIA",
  "LUXURIA",
  "INVIDIA",
  "GULA",
  "IRA",
  "ACEDIA",
] as const;

export type MortalSin = (typeof MORTAL_SINS)[number];

export type HierarchyAsset = "BTC" | "ETH" | "SOL";

export type ScalaStepId =
  | "umbra"
  | "petitor"
  | "purgans"
  | "imago"
  | "illuminatus";

export type PowerBranchId = "seal" | "key";

export type HierarchyRankId =
  | "summus"
  | "curator"
  | "consilium"
  | "custodes"
  | "scala";

export type ScalaStep = {
  id: ScalaStepId;
  roman: "I" | "II" | "III" | "IV" | "V";
  latin: string;
  sin: MortalSin;
  asset: HierarchyAsset;
  amount: number;
  max: number;
  hash: string;
  buyable: boolean;
};

/** Five personal sins. Ascent removes them. Umbra is the threshold: Luxuria as entrance. */
export const SCALA_STEPS: readonly ScalaStep[] = [
  {
    id: "umbra",
    roman: "I",
    latin: "UMBRA",
    sin: "LUXURIA",
    asset: "ETH",
    amount: 0.088,
    max: 25,
    hash: "#h-umbra",
    buyable: true,
  },
  {
    id: "petitor",
    roman: "II",
    latin: "PETITOR",
    sin: "SUPERBIA",
    asset: "SOL",
    amount: 0.88,
    max: 25,
    hash: "#h-petitor",
    buyable: true,
  },
  {
    id: "purgans",
    roman: "III",
    latin: "PURGANS",
    sin: "INVIDIA",
    asset: "SOL",
    amount: 2.88,
    max: 15,
    hash: "#h-purgans",
    buyable: true,
  },
  {
    id: "imago",
    roman: "IV",
    latin: "IMAGO",
    sin: "IRA",
    asset: "ETH",
    amount: 0.28,
    max: 17,
    hash: "#h-imago",
    buyable: true,
  },
  {
    id: "illuminatus",
    roman: "V",
    latin: "ILLUMINATUS",
    sin: "ACEDIA",
    asset: "BTC",
    amount: 8.88,
    max: 3,
    hash: "#h-illuminatus",
    buyable: false,
  },
];

export type PowerBranch = {
  id: PowerBranchId;
  latin: string;
  sin: MortalSin;
  asset: HierarchyAsset;
  amount: number;
  max: number;
  hash: string;
  totalBtc?: number;
};

export const POWER_BRANCHES: readonly PowerBranch[] = [
  {
    id: "seal",
    latin: "SIGILLA",
    sin: "AVARITIA",
    asset: "BTC",
    amount: 8.88,
    max: 3,
    hash: "#h-seals",
    totalBtc: 26.64,
  },
  {
    id: "key",
    latin: "CLAVES",
    sin: "GULA",
    asset: "BTC",
    amount: 1,
    max: 7,
    hash: "#h-keys",
    totalBtc: 7,
  },
];

export type HierarchyRank = {
  id: HierarchyRankId;
  latin: string;
  seats: number;
  hash: string;
  sin: MortalSin | null;
  sellable: boolean;
};

export const HIERARCHY_RANKS: readonly HierarchyRank[] = [
  {
    id: "summus",
    latin: "SUMMUS CURATOR",
    seats: 1,
    hash: "#h-summus",
    sin: "AVARITIA",
    sellable: false,
  },
  {
    id: "curator",
    latin: "CURATOR DOMUS",
    seats: 1,
    hash: "#h-curator",
    sin: "AVARITIA",
    sellable: false,
  },
  {
    id: "consilium",
    latin: "CONSILIUM AETERNUM",
    seats: 3,
    hash: "#h-consilium",
    sin: "GULA",
    sellable: false,
  },
  {
    id: "custodes",
    latin: "CUSTODES LIMINIS",
    seats: 4,
    hash: "#h-custodes",
    sin: "GULA",
    sellable: false,
  },
  {
    id: "scala",
    latin: "SCALA",
    seats: 0,
    hash: "#h-scala",
    sin: null,
    sellable: false,
  },
];

export const BTC_COLLECTION = {
  seals: 3,
  sealAmount: 8.88,
  keys: 7,
  keyAmount: 1,
  total: 10,
} as const;

export const CONSILIUM_SEATS = 3;
export const CUSTODES_SEATS = 4;
export const ILLUMINATUS_FROM_UMBRA = 81;

export const ASCEND_RULES = [
  { from: "umbra", to: "petitor", burn: 3 },
  { from: "petitor", to: "purgans", burn: 3 },
  { from: "purgans", to: "imago", burn: 3 },
  { from: "imago", to: "illuminatus", burn: 3 },
] as const;

export const CLAVIS_BURN = 3;

export const HIERARCHY_HASHES = new Set([
  "#hierarchy",
  ...HIERARCHY_RANKS.map((rank) => rank.hash),
  ...SCALA_STEPS.map((step) => step.hash),
  ...POWER_BRANCHES.map((branch) => branch.hash),
  "#h-path",
  "#h-ordeal",
  "#h-clavis",
  "#h-wall",
  "#h-apocryphon",
  "#h-why",
  "#h-faq",
  "#h-diary",
]);

export function isHierarchyHash(hash: string) {
  if (!hash) return false;
  if (HIERARCHY_HASHES.has(hash)) return true;
  return hash.startsWith("#h-");
}

export function remainingLine(remaining: number, max: number, locale: "en" | "ru" | "zh") {
  if (locale === "ru") return `осталось ${remaining} из ${max}`;
  if (locale === "zh") return `余 ${remaining} / ${max}`;
  return `remaining ${remaining} of ${max}`;
}
