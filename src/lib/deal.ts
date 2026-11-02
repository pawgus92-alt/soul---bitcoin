import {
  SOL_RARITY_META,
  type SolRarity,
} from "@/lib/sol-rarity";

export const DEAL_USD = 100_000;
export const SELL_BTC = 0.5;
/** First ten Ethereum souls: editions 1–10 at 0.5 ETH. */
export const ETH_HALF_AMOUNT = 0.5;
/** Next three Ethereum souls: editions 11–13 at 1 ETH. */
export const ETH_ONE_AMOUNT = 1;
/** Last two Ethereum souls: editions 14–15 at 2 ETH. */
export const ETH_TWO_AMOUNT = 2;
/** Default Ethereum desk (the first ten). */
export const ETH_AMOUNT = ETH_HALF_AMOUNT;
export const SOL_COMMON_AMOUNT = SOL_RARITY_META.common.amount;
export const SOL_RARE_AMOUNT = SOL_RARITY_META.rare.amount;
export const SOL_EPIC_AMOUNT = SOL_RARITY_META.epic.amount;
export const SOL_LEGENDARY_AMOUNT = SOL_RARITY_META.legendary.amount;
/** Default Solana desk: common souls at 0.5 SOL. */
export const SOL_AMOUNT = SOL_COMMON_AMOUNT;
export const FA_AMOUNT = 8.88;
/** Ordinary Bitcoin souls: editions 1–7 at a flat 1 BTC. */
export const BTC_REGULAR_AMOUNT = 1;
/** Last three Bitcoin NFTs: 888 luck charters at a flat 8 BTC. */
export const BTC_LUCKY_AMOUNT = 8;
export const PEARL_AMOUNT = 650;
/** Seven named sins climb from 1.5 SOL; the laptop sits last among the open stalls at 8.88 SOL. */
export const CLEANSE_SOL_FIRST = 1.5;
export const CLEANSE_SOL_BINANCE = 8.88;
export const CLEANSE_SOL_BY_DEGREE: Record<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8, number> = {
  1: CLEANSE_SOL_FIRST,
  2: 2.5,
  3: 3.5,
  4: 4.5,
  5: 5.5,
  6: 6.5,
  7: 7.5,
  8: CLEANSE_SOL_BINANCE,
};
export const CLEANSE_SOL_RANGE = `${CLEANSE_SOL_FIRST}–${CLEANSE_SOL_BINANCE} SOL`;

export const BTC_ADDRESS = "bc1q5v3rtce5zrwuw4vvk7v705v5qdrgqj2xuxgsnj";
export const SOL_ADDRESS = "Ddvf1hnVW8Er8udrmgnQTu691acmyiJuxQgvhiAKu5jX";
export const ETH_ADDRESS = "0xfe2e3f7cab6a90e9e5b83209ece0bc12a65ff4d3";
export const PEARL_MINT = "9n1A8UtMXnnNdV1JJTc1sxhH47S4dVbcBgHqg96vdqQx";
export const PEARL_DECIMALS = 6;

/** Kept wired; the sell button is hidden until a later desk window. */
export const SHOW_SELL_DESK = false;
/** Kept wired; Pearl stays in the deal table for a later desk. */
export const SHOW_PEARL_DESK = false;

export type DealKind =
  | "buy"
  | "sell"
  | "sol"
  | "solRare"
  | "solEpic"
  | "solLegendary"
  | "pearl"
  | "eth"
  | "ethOne"
  | "ethTwo"
  | "cleanse"
  | "fa"
  | "lucky";
export type EthDealKind = "eth" | "ethOne" | "ethTwo";
export type SolDealKind = "sol" | "solRare" | "solEpic" | "solLegendary";
export type DealAsset = "BTC" | "SOL" | "PEARL" | "ETH";
export type DealChain = "bitcoin" | "solana" | "ethereum";
export type DealClass = "private" | "middle";
export type NftChain = "bitcoin" | "solana" | "ethereum";

export const NFT_MAX: Record<NftChain, number> = {
  bitcoin: 10,
  solana: 50,
  ethereum: 15,
};
export const SOL_COMMON_MAX = SOL_RARITY_META.common.count;
export const SOL_RARE_MAX = SOL_RARITY_META.rare.count;
export const SOL_EPIC_MAX = SOL_RARITY_META.epic.count;
export const SOL_LEGENDARY_MAX = SOL_RARITY_META.legendary.count;
/** Ordinary Bitcoin souls: editions 1–7 at a flat 1 BTC. */
export const BTC_REGULAR_MAX = 7;
/** Last three of ten: editions 8–10, 888 luck charters at 8 BTC. */
export const BTC_LUCKY_MAX = 3;
/** First ten Ethereum NFTs at 0.5 ETH. */
export const ETH_HALF_MAX = 10;
/** Next three Ethereum NFTs at 1 ETH, editions 11–13. */
export const ETH_ONE_MAX = 3;
/** Last two Ethereum NFTs at 2 ETH, editions 14–15. */
export const ETH_TWO_MAX = 2;

export type DealSpec = {
  kind: DealKind;
  asset: DealAsset;
  chain: DealChain;
  nftChain: NftChain;
  deskClass: DealClass;
  address: string;
  unit: string;
  mint?: string;
  decimals?: number;
};

export const DEALS: Record<DealKind, DealSpec> = {
  buy: {
    kind: "buy",
    asset: "BTC",
    chain: "bitcoin",
    nftChain: "bitcoin",
    deskClass: "private",
    address: BTC_ADDRESS,
    unit: "BTC",
  },
  sell: {
    kind: "sell",
    asset: "BTC",
    chain: "bitcoin",
    nftChain: "bitcoin",
    deskClass: "private",
    address: BTC_ADDRESS,
    unit: "BTC",
  },
  sol: {
    kind: "sol",
    asset: "SOL",
    chain: "solana",
    nftChain: "solana",
    deskClass: "middle",
    address: SOL_ADDRESS,
    unit: "SOL",
  },
  solRare: {
    kind: "solRare",
    asset: "SOL",
    chain: "solana",
    nftChain: "solana",
    deskClass: "middle",
    address: SOL_ADDRESS,
    unit: "SOL",
  },
  solEpic: {
    kind: "solEpic",
    asset: "SOL",
    chain: "solana",
    nftChain: "solana",
    deskClass: "middle",
    address: SOL_ADDRESS,
    unit: "SOL",
  },
  solLegendary: {
    kind: "solLegendary",
    asset: "SOL",
    chain: "solana",
    nftChain: "solana",
    deskClass: "middle",
    address: SOL_ADDRESS,
    unit: "SOL",
  },
  pearl: {
    kind: "pearl",
    asset: "PEARL",
    chain: "solana",
    nftChain: "solana",
    deskClass: "middle",
    address: SOL_ADDRESS,
    unit: "PEARL",
    mint: PEARL_MINT,
    decimals: PEARL_DECIMALS,
  },
  eth: {
    kind: "eth",
    asset: "ETH",
    chain: "ethereum",
    nftChain: "ethereum",
    deskClass: "private",
    address: ETH_ADDRESS,
    unit: "ETH",
  },
  ethOne: {
    kind: "ethOne",
    asset: "ETH",
    chain: "ethereum",
    nftChain: "ethereum",
    deskClass: "private",
    address: ETH_ADDRESS,
    unit: "ETH",
  },
  ethTwo: {
    kind: "ethTwo",
    asset: "ETH",
    chain: "ethereum",
    nftChain: "ethereum",
    deskClass: "private",
    address: ETH_ADDRESS,
    unit: "ETH",
  },
  cleanse: {
    kind: "cleanse",
    asset: "SOL",
    chain: "solana",
    nftChain: "solana",
    deskClass: "middle",
    address: SOL_ADDRESS,
    unit: "SOL",
  },
  fa: {
    kind: "fa",
    asset: "SOL",
    chain: "solana",
    nftChain: "solana",
    deskClass: "middle",
    address: SOL_ADDRESS,
    unit: "SOL",
  },
  lucky: {
    kind: "lucky",
    asset: "BTC",
    chain: "bitcoin",
    nftChain: "bitcoin",
    deskClass: "private",
    address: BTC_ADDRESS,
    unit: "BTC",
  },
};

export function getDeal(kind: DealKind): DealSpec {
  return DEALS[kind];
}

export function isEthKind(kind: DealKind): kind is EthDealKind {
  return kind === "eth" || kind === "ethOne" || kind === "ethTwo";
}

export function isSolKind(kind: DealKind): kind is SolDealKind {
  return (
    kind === "sol" ||
    kind === "solRare" ||
    kind === "solEpic" ||
    kind === "solLegendary"
  );
}

export function ethAmountOf(kind: DealKind) {
  if (kind === "ethOne") return ETH_ONE_AMOUNT;
  if (kind === "ethTwo") return ETH_TWO_AMOUNT;
  if (kind === "eth") return ETH_HALF_AMOUNT;
  return 0;
}

export function solRarityOf(kind: DealKind): SolRarity | null {
  if (kind === "solLegendary") return "legendary";
  if (kind === "solEpic") return "epic";
  if (kind === "solRare") return "rare";
  if (kind === "sol") return "common";
  return null;
}

export function solAmountOf(kind: DealKind) {
  const rarity = solRarityOf(kind);
  return rarity ? SOL_RARITY_META[rarity].amount : 0;
}

export function cleanseSolAmount(degree?: number | null) {
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
    return CLEANSE_SOL_BY_DEGREE[degree];
  }
  return 0;
}

export function formatSolQuantity(amount: number) {
  return String(Number(amount.toFixed(3)));
}

export function formatSolLabel(amount: number) {
  return `${formatSolQuantity(amount)} SOL`;
}

function ethToWei(eth: number) {
  const [whole, frac = ""] = eth.toFixed(18).split(".");
  return BigInt(whole + frac.padEnd(18, "0")).toString();
}

export function expectedAtomic(
  kind: DealKind,
  coinAmount = 0,
  sinDegree?: number | null,
) {
  if (kind === "cleanse") {
    return String(Math.round(cleanseSolAmount(sinDegree) * 1_000_000_000));
  }
  if (isSolKind(kind)) {
    return String(Math.round(solAmountOf(kind) * 1_000_000_000));
  }
  if (kind === "fa") return String(Math.round(FA_AMOUNT * 1_000_000_000));
  if (kind === "pearl") return String(PEARL_AMOUNT * 10 ** PEARL_DECIMALS);
  if (kind === "sell") return String(Math.round(SELL_BTC * 1e8));
  if (kind === "lucky") return String(Math.round(BTC_LUCKY_AMOUNT * 1e8));
  if (kind === "buy") return String(Math.round(BTC_REGULAR_AMOUNT * 1e8));
  if (isEthKind(kind)) return ethToWei(ethAmountOf(kind));
  return String(Math.round(coinAmount * 1e8));
}

export function formatDealAmount(
  kind: DealKind,
  coinAmount?: number,
  sinDegree?: number | null,
) {
  if (kind === "cleanse") return formatSolLabel(cleanseSolAmount(sinDegree));
  if (isSolKind(kind)) return `${solAmountOf(kind)} SOL`;
  if (kind === "fa") return `${FA_AMOUNT} SOL`;
  if (kind === "pearl") return `${PEARL_AMOUNT} PEARL`;
  if (kind === "sell") return `${SELL_BTC.toFixed(8)} BTC`;
  if (kind === "lucky") return `${BTC_LUCKY_AMOUNT.toFixed(8)} BTC`;
  if (kind === "buy") return `${BTC_REGULAR_AMOUNT.toFixed(8)} BTC`;
  if (isEthKind(kind)) return `${ethAmountOf(kind)} ETH`;
  if (typeof coinAmount === "number") return `${coinAmount.toFixed(8)} BTC`;
  return "BTC";
}

export function formatAtomic(kind: DealKind, atomic: string | number) {
  if (isEthKind(kind)) {
    const wei = BigInt(String(atomic || "0"));
    const whole = wei / 10n ** 18n;
    const frac = (wei % 10n ** 18n).toString().padStart(18, "0").slice(0, 6);
    return `${whole}.${frac} ETH`;
  }
  const value = Number(atomic);
  if (isSolKind(kind) || kind === "cleanse" || kind === "fa") {
    return `${(value / 1_000_000_000).toFixed(4)} SOL`;
  }
  if (kind === "pearl") {
    return `${(value / 10 ** PEARL_DECIMALS).toFixed(2)} PEARL`;
  }
  return `${(value / 1e8).toFixed(8)} BTC`;
}

export const SERIAL_TAG: Record<
  DealKind,
  | "BUY"
  | "SELL"
  | "SOL"
  | "SRR"
  | "SEP"
  | "SLG"
  | "PRL"
  | "ETH"
  | "ET1"
  | "ET2"
  | "CLN"
  | "FA8"
  | "B88"
> = {
  buy: "BUY",
  sell: "SELL",
  sol: "SOL",
  solRare: "SRR",
  solEpic: "SEP",
  solLegendary: "SLG",
  pearl: "PRL",
  eth: "ETH",
  ethOne: "ET1",
  ethTwo: "ET2",
  cleanse: "CLN",
  fa: "FA8",
  lucky: "B88",
};

export function deskAddress(chain: DealChain) {
  if (chain === "solana") return SOL_ADDRESS;
  if (chain === "ethereum") return ETH_ADDRESS;
  return BTC_ADDRESS;
}
