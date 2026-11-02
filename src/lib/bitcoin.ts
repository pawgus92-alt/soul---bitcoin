import {
  BTC_ADDRESS,
  DEAL_USD,
  ETH_ADDRESS,
  ETH_AMOUNT,
  SOL_AMOUNT,
} from "@/lib/deal";

export type SpotSource = "Coinbase";

export type BtcQuote = {
  usdPerBtc: number;
  btcAmount: number;
  usdAmount: number;
  source: SpotSource;
  fetchedAt: number;
};

export type EthQuote = {
  usdPerEth: number;
  ethAmount: number;
  usdAmount: number;
  source: SpotSource;
  fetchedAt: number;
};

export type SolQuote = {
  usdPerSol: number;
  solAmount: number;
  usdAmount: number;
  source: SpotSource;
  fetchedAt: number;
};

async function readJson(url: string) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Rate source failed: ${response.status}`);
  }
  return response.json();
}

async function fetchCoinbaseSpot(pair: "BTC-USD" | "ETH-USD" | "SOL-USD") {
  const local = `/api/${pair.slice(0, 3).toLowerCase()}-usd`;
  const urls = [local, `https://api.coinbase.com/v2/prices/${pair}/spot`];
  const errors: string[] = [];

  for (const url of urls) {
    try {
      const data = await readJson(url);
      const amount = Number(data?.data?.amount);
      if (amount > 0) return amount;
      errors.push(`${url} returned an empty rate.`);
    } catch (error) {
      errors.push(error instanceof Error ? error.message : `${url} failed.`);
    }
  }

  throw new Error(errors.join(" "));
}

export async function fetchBtcQuote(): Promise<BtcQuote> {
  const usdPerBtc = await fetchCoinbaseSpot("BTC-USD");
  return {
    usdPerBtc,
    btcAmount: DEAL_USD / usdPerBtc,
    usdAmount: DEAL_USD,
    source: "Coinbase",
    fetchedAt: Date.now(),
  };
}

export async function fetchEthQuote(): Promise<EthQuote> {
  const usdPerEth = await fetchCoinbaseSpot("ETH-USD");
  return {
    usdPerEth,
    ethAmount: ETH_AMOUNT,
    usdAmount: ETH_AMOUNT * usdPerEth,
    source: "Coinbase",
    fetchedAt: Date.now(),
  };
}

export async function fetchSolQuote(): Promise<SolQuote> {
  const usdPerSol = await fetchCoinbaseSpot("SOL-USD");
  return {
    usdPerSol,
    solAmount: SOL_AMOUNT,
    usdAmount: SOL_AMOUNT * usdPerSol,
    source: "Coinbase",
    fetchedAt: Date.now(),
  };
}

export function formatUsd(value: number, digits = 0) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
  }).format(value);
}

export function formatBtc(value: number) {
  return `${value.toFixed(8)} BTC`;
}

export function formatEth(value: number) {
  return `${value} ETH`;
}

export function bitcoinPayUri(
  address: string,
  amount: number,
  label = "Maison Aeternum",
) {
  return `bitcoin:${address}?amount=${amount.toFixed(8)}&label=${encodeURIComponent(label)}`;
}

export function bitcoinUri(amount: number) {
  return bitcoinPayUri(BTC_ADDRESS, amount);
}

function ethToWei(eth: number) {
  const [whole, frac = ""] = eth.toFixed(18).split(".");
  return BigInt(whole + frac.padEnd(18, "0")).toString();
}

export function ethereumPayUri(
  address: string,
  amount: number,
  label = "Maison Aeternum",
) {
  return `ethereum:${address}?value=${ethToWei(amount)}&label=${encodeURIComponent(label)}`;
}

export function ethereumUri(amount: number) {
  return ethereumPayUri(ETH_ADDRESS, amount);
}

export function solanaPayUri(
  address: string,
  amount: number,
  mint?: string,
) {
  const params = new URLSearchParams({
    amount: String(amount),
    label: "Maison Aeternum",
  });
  if (mint) params.set("spl-token", mint);
  return `solana:${address}?${params.toString()}`;
}
