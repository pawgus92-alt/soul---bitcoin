export const DEAL_USD = 100_000;
export const SELL_BTC = 0.5;
export const SOL_AMOUNT = 10;
export const PEARL_AMOUNT = 650;

export const BTC_ADDRESS = "bc1q5v3rtce5zrwuw4vvk7v705v5qdrgqj2xuxgsnj";
export const SOL_ADDRESS = "Ddvf1hnVW8Er8udrmgnQTu691acmyiJuxQgvhiAKu5jX";
export const ETH_ADDRESS = "0xfe2e3f7cab6a90e9e5b83209ece0bc12a65ff4d3";
export const PEARL_MINT = "9n1A8UtMXnnNdV1JJTc1sxhH47S4dVbcBgHqg96vdqQx";
export const PEARL_DECIMALS = 6;

/** Kept wired; the sell button is hidden until a later desk window. */
export const SHOW_SELL_DESK = false;
/** Kept wired; Pearl stays in the deal table for a later desk. */
export const SHOW_PEARL_DESK = false;

export type DealKind = "buy" | "sell" | "sol" | "pearl" | "eth" | "cleanse";
export type DealAsset = "BTC" | "SOL" | "PEARL" | "ETH";
export type DealChain = "bitcoin" | "solana" | "ethereum";
export type DealClass = "private" | "middle";
export type NftChain = "bitcoin" | "solana" | "ethereum";

export const NFT_MAX: Record<NftChain, number> = {
  bitcoin: 25,
  solana: 250,
  ethereum: 50,
};

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
  cleanse: {
    kind: "cleanse",
    asset: "SOL",
    chain: "solana",
    nftChain: "solana",
    deskClass: "middle",
    address: SOL_ADDRESS,
    unit: "SOL",
  },
};

export function getDeal(kind: DealKind): DealSpec {
  return DEALS[kind];
}

function ethToWei(eth: number) {
  const [whole, frac = ""] = eth.toFixed(18).split(".");
  return BigInt(whole + frac.padEnd(18, "0")).toString();
}

export function expectedAtomic(kind: DealKind, coinAmount = 0) {
  if (kind === "sol" || kind === "cleanse") {
    return String(SOL_AMOUNT * 1_000_000_000);
  }
  if (kind === "pearl") return String(PEARL_AMOUNT * 10 ** PEARL_DECIMALS);
  if (kind === "sell") return String(Math.round(SELL_BTC * 1e8));
  if (kind === "eth") return ethToWei(coinAmount);
  return String(Math.round(coinAmount * 1e8));
}

export function formatDealAmount(kind: DealKind, coinAmount?: number) {
  if (kind === "sol" || kind === "cleanse") return `${SOL_AMOUNT} SOL`;
  if (kind === "pearl") return `${PEARL_AMOUNT} PEARL`;
  if (kind === "sell") return `${SELL_BTC.toFixed(8)} BTC`;
  if (kind === "eth" && typeof coinAmount === "number") {
    return `${coinAmount.toFixed(6)} ETH`;
  }
  if (typeof coinAmount === "number") return `${coinAmount.toFixed(8)} BTC`;
  return "BTC";
}

export function formatAtomic(kind: DealKind, atomic: string | number) {
  if (kind === "eth") {
    const wei = BigInt(String(atomic || "0"));
    const whole = wei / 10n ** 18n;
    const frac = (wei % 10n ** 18n).toString().padStart(18, "0").slice(0, 6);
    return `${whole}.${frac} ETH`;
  }
  const value = Number(atomic);
  if (kind === "sol" || kind === "cleanse") {
    return `${(value / 1_000_000_000).toFixed(4)} SOL`;
  }
  if (kind === "pearl") {
    return `${(value / 10 ** PEARL_DECIMALS).toFixed(2)} PEARL`;
  }
  return `${(value / 1e8).toFixed(8)} BTC`;
}

export const SERIAL_TAG: Record<
  DealKind,
  "BUY" | "SELL" | "SOL" | "PRL" | "ETH" | "CLN"
> = {
  buy: "BUY",
  sell: "SELL",
  sol: "SOL",
  pearl: "PRL",
  eth: "ETH",
  cleanse: "CLN",
};

export function deskAddress(chain: DealChain) {
  if (chain === "solana") return SOL_ADDRESS;
  if (chain === "ethereum") return ETH_ADDRESS;
  return BTC_ADDRESS;
}
