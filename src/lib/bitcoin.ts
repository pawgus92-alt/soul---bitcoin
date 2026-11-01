import { BTC_ADDRESS, DEAL_USD } from "@/lib/deal";

export type BtcQuote = {
  usdPerBtc: number;
  btcAmount: number;
  source: string;
  fetchedAt: number;
};

async function readJson(url: string) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Rate source failed: ${response.status}`);
  }
  return response.json();
}

export async function fetchBtcQuote(): Promise<BtcQuote> {
  const errors: string[] = [];

  const coinbaseUrls = [
    "/api/btc-usd",
    "https://api.coinbase.com/v2/prices/BTC-USD/spot",
  ];

  for (const url of coinbaseUrls) {
    try {
      const data = await readJson(url);
      const usdPerBtc = Number(data?.data?.amount);
      if (usdPerBtc > 0) {
        return {
          usdPerBtc,
          btcAmount: DEAL_USD / usdPerBtc,
          source: "Coinbase",
          fetchedAt: Date.now(),
        };
      }
      errors.push(`${url} returned an empty rate.`);
    } catch (error) {
      errors.push(error instanceof Error ? error.message : `${url} failed.`);
    }
  }

  try {
    const data = await readJson(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd",
    );
    const usdPerBtc = Number(data?.bitcoin?.usd);
    if (usdPerBtc > 0) {
      return {
        usdPerBtc,
        btcAmount: DEAL_USD / usdPerBtc,
        source: "CoinGecko",
        fetchedAt: Date.now(),
      };
    }
    errors.push("CoinGecko returned an empty rate.");
  } catch (error) {
    errors.push(error instanceof Error ? error.message : "CoinGecko failed.");
  }

  throw new Error(errors.join(" "));
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
