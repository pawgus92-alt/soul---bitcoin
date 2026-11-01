export const DEAL_USD = 100_000;
export const SELL_BTC = 0.5;
export const SOL_AMOUNT = 10;
export const PEARL_AMOUNT = 650;

export const BTC_ADDRESS = "bc1q5v3rtce5zrwuw4vvk7v705v5qdrgqj2xuxgsnj";
export const SOL_ADDRESS = "8sQ9FcS2Zk2qKRoy2fBwNsRK3DHYr27GD75VbnyCrKCh";
export const PEARL_MINT = "9n1A8UtMXnnNdV1JJTc1sxhH47S4dVbcBgHqg96vdqQx";
export const PEARL_DECIMALS = 6;

export type DealKind = "buy" | "sell" | "sol" | "pearl";
export type DealAsset = "BTC" | "SOL" | "PEARL";
export type DealChain = "bitcoin" | "solana";
export type DealClass = "private" | "middle";

export type DealSpec = {
  kind: DealKind;
  asset: DealAsset;
  chain: DealChain;
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
    deskClass: "private",
    address: BTC_ADDRESS,
    unit: "BTC",
  },
  sell: {
    kind: "sell",
    asset: "BTC",
    chain: "bitcoin",
    deskClass: "private",
    address: BTC_ADDRESS,
    unit: "BTC",
  },
  sol: {
    kind: "sol",
    asset: "SOL",
    chain: "solana",
    deskClass: "middle",
    address: SOL_ADDRESS,
    unit: "SOL",
  },
  pearl: {
    kind: "pearl",
    asset: "PEARL",
    chain: "solana",
    deskClass: "middle",
    address: SOL_ADDRESS,
    unit: "PEARL",
    mint: PEARL_MINT,
    decimals: PEARL_DECIMALS,
  },
};

export function getDeal(kind: DealKind): DealSpec {
  return DEALS[kind];
}

export function expectedAtomic(kind: DealKind, btcAmount = 0) {
  if (kind === "sol") return SOL_AMOUNT * 1_000_000_000;
  if (kind === "pearl") return PEARL_AMOUNT * 10 ** PEARL_DECIMALS;
  if (kind === "sell") return Math.round(SELL_BTC * 1e8);
  return Math.round(btcAmount * 1e8);
}

export function formatDealAmount(kind: DealKind, btcAmount?: number) {
  if (kind === "sol") return `${SOL_AMOUNT} SOL`;
  if (kind === "pearl") return `${PEARL_AMOUNT} PEARL`;
  if (kind === "sell") return `${SELL_BTC.toFixed(8)} BTC`;
  if (typeof btcAmount === "number") return `${btcAmount.toFixed(8)} BTC`;
  return "BTC";
}

export function formatAtomic(kind: DealKind, atomic: number) {
  if (kind === "sol") return `${(atomic / 1_000_000_000).toFixed(4)} SOL`;
  if (kind === "pearl") return `${(atomic / 10 ** PEARL_DECIMALS).toFixed(2)} PEARL`;
  return `${(atomic / 1e8).toFixed(8)} BTC`;
}

export const SERIAL_TAG: Record<DealKind, "BUY" | "SELL" | "SOL" | "PRL"> = {
  buy: "BUY",
  sell: "SELL",
  sol: "SOL",
  pearl: "PRL",
};
