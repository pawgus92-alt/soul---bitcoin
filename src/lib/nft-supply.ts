import { useEffect, useState } from "react";

import {
  BTC_LUCKY_MAX,
  BTC_REGULAR_MAX,
  ETH_HALF_MAX,
  ETH_ONE_MAX,
  ETH_TWO_MAX,
  NFT_MAX,
  type NftChain,
} from "@/lib/deal";

const STORAGE_KEY = "maison-nft-editions";

export type NftPool = "regular" | "lucky" | "ethHalf" | "ethOne" | "ethTwo";

type Ledger = Record<NftChain, number> & {
  lucky: number;
  ethOne: number;
  ethTwo: number;
};
type Listener = () => void;

const listeners = new Set<Listener>();

function empty(): Ledger {
  return { bitcoin: 0, solana: 0, ethereum: 0, lucky: 0, ethOne: 0, ethTwo: 0 };
}

function read(): Ledger {
  if (typeof window === "undefined") return empty();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return empty();
    const parsed = JSON.parse(raw) as Partial<Ledger>;
    return {
      bitcoin: Math.min(Number(parsed.bitcoin) || 0, BTC_REGULAR_MAX),
      solana: Number(parsed.solana) || 0,
      ethereum: Math.min(Number(parsed.ethereum) || 0, ETH_HALF_MAX),
      lucky: Math.min(Number(parsed.lucky) || 0, BTC_LUCKY_MAX),
      ethOne: Math.min(Number(parsed.ethOne) || 0, ETH_ONE_MAX),
      ethTwo: Math.min(Number(parsed.ethTwo) || 0, ETH_TWO_MAX),
    };
  } catch {
    return empty();
  }
}

function notify() {
  listeners.forEach((listener) => listener());
}

function write(ledger: Ledger) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ledger));
  notify();
}

export function subscribeNftSupply(listener: Listener) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export type NftEdition = {
  chain: NftChain;
  edition: number;
  max: number;
  remaining: number;
};

export function nftSupply(chain: NftChain): NftEdition {
  const ledger = read();
  if (chain === "bitcoin") {
    const issued =
      Math.min(ledger.bitcoin, BTC_REGULAR_MAX) +
      Math.min(ledger.lucky, BTC_LUCKY_MAX);
    const max = NFT_MAX.bitcoin;
    return {
      chain,
      edition: issued,
      max,
      remaining: Math.max(0, max - issued),
    };
  }
  if (chain === "ethereum") {
    const issued =
      Math.min(ledger.ethereum, ETH_HALF_MAX) +
      Math.min(ledger.ethOne, ETH_ONE_MAX) +
      Math.min(ledger.ethTwo, ETH_TWO_MAX);
    const max = NFT_MAX.ethereum;
    return {
      chain,
      edition: issued,
      max,
      remaining: Math.max(0, max - issued),
    };
  }
  const issued = Math.min(ledger[chain], NFT_MAX[chain]);
  const max = NFT_MAX[chain];
  return {
    chain,
    edition: issued,
    max,
    remaining: Math.max(0, max - issued),
  };
}

export function regularBtcSupply(): NftEdition {
  const issued = Math.min(read().bitcoin, BTC_REGULAR_MAX);
  return {
    chain: "bitcoin",
    edition: issued,
    max: BTC_REGULAR_MAX,
    remaining: Math.max(0, BTC_REGULAR_MAX - issued),
  };
}

export function luckyBtcSupply(): NftEdition {
  const issued = Math.min(read().lucky, BTC_LUCKY_MAX);
  return {
    chain: "bitcoin",
    edition: BTC_REGULAR_MAX + issued,
    max: BTC_LUCKY_MAX,
    remaining: Math.max(0, BTC_LUCKY_MAX - issued),
  };
}

export function ethHalfSupply(): NftEdition {
  const issued = Math.min(read().ethereum, ETH_HALF_MAX);
  return {
    chain: "ethereum",
    edition: issued,
    max: ETH_HALF_MAX,
    remaining: Math.max(0, ETH_HALF_MAX - issued),
  };
}

export function ethOneSupply(): NftEdition {
  const issued = Math.min(read().ethOne, ETH_ONE_MAX);
  return {
    chain: "ethereum",
    edition: ETH_HALF_MAX + issued,
    max: ETH_ONE_MAX,
    remaining: Math.max(0, ETH_ONE_MAX - issued),
  };
}

export function ethTwoSupply(): NftEdition {
  const issued = Math.min(read().ethTwo, ETH_TWO_MAX);
  return {
    chain: "ethereum",
    edition: ETH_HALF_MAX + ETH_ONE_MAX + issued,
    max: ETH_TWO_MAX,
    remaining: Math.max(0, ETH_TWO_MAX - issued),
  };
}

export function allNftSupply() {
  return {
    bitcoin: nftSupply("bitcoin"),
    solana: nftSupply("solana"),
    ethereum: nftSupply("ethereum"),
    lucky: luckyBtcSupply(),
    regular: regularBtcSupply(),
    ethHalf: ethHalfSupply(),
    ethOne: ethOneSupply(),
    ethTwo: ethTwoSupply(),
  };
}

export function claimNftEdition(
  chain: NftChain,
  pool: NftPool = "regular",
): NftEdition | null {
  const ledger = read();
  if (chain === "bitcoin" && pool === "lucky") {
    if (ledger.lucky >= BTC_LUCKY_MAX) return null;
    ledger.lucky += 1;
    write(ledger);
    return {
      chain,
      edition: BTC_REGULAR_MAX + ledger.lucky,
      max: NFT_MAX.bitcoin,
      remaining: Math.max(0, BTC_LUCKY_MAX - ledger.lucky),
    };
  }
  if (chain === "bitcoin") {
    if (ledger.bitcoin >= BTC_REGULAR_MAX) return null;
    ledger.bitcoin += 1;
    write(ledger);
    return {
      chain,
      edition: ledger.bitcoin,
      max: NFT_MAX.bitcoin,
      remaining: Math.max(0, BTC_REGULAR_MAX - ledger.bitcoin),
    };
  }
  if (chain === "ethereum" && pool === "ethOne") {
    if (ledger.ethOne >= ETH_ONE_MAX) return null;
    ledger.ethOne += 1;
    write(ledger);
    return {
      chain,
      edition: ETH_HALF_MAX + ledger.ethOne,
      max: NFT_MAX.ethereum,
      remaining: Math.max(0, ETH_ONE_MAX - ledger.ethOne),
    };
  }
  if (chain === "ethereum" && pool === "ethTwo") {
    if (ledger.ethTwo >= ETH_TWO_MAX) return null;
    ledger.ethTwo += 1;
    write(ledger);
    return {
      chain,
      edition: ETH_HALF_MAX + ETH_ONE_MAX + ledger.ethTwo,
      max: NFT_MAX.ethereum,
      remaining: Math.max(0, ETH_TWO_MAX - ledger.ethTwo),
    };
  }
  if (chain === "ethereum") {
    if (ledger.ethereum >= ETH_HALF_MAX) return null;
    ledger.ethereum += 1;
    write(ledger);
    return {
      chain,
      edition: ledger.ethereum,
      max: NFT_MAX.ethereum,
      remaining: Math.max(0, ETH_HALF_MAX - ledger.ethereum),
    };
  }
  if (ledger[chain] >= NFT_MAX[chain]) return null;
  ledger[chain] += 1;
  write(ledger);
  const max = NFT_MAX[chain];
  return {
    chain,
    edition: ledger[chain],
    max,
    remaining: Math.max(0, max - ledger[chain]),
  };
}

export function useNftSupply(chain: NftChain): NftEdition;
export function useNftSupply(): ReturnType<typeof allNftSupply>;
export function useNftSupply(chain?: NftChain) {
  const [, bump] = useState(0);
  useEffect(() => subscribeNftSupply(() => bump((n) => n + 1)), []);
  return chain ? nftSupply(chain) : allNftSupply();
}

export function useLuckyBtcSupply() {
  const [, bump] = useState(0);
  useEffect(() => subscribeNftSupply(() => bump((n) => n + 1)), []);
  return luckyBtcSupply();
}

export function useRegularBtcSupply() {
  const [, bump] = useState(0);
  useEffect(() => subscribeNftSupply(() => bump((n) => n + 1)), []);
  return regularBtcSupply();
}

export function useEthHalfSupply() {
  const [, bump] = useState(0);
  useEffect(() => subscribeNftSupply(() => bump((n) => n + 1)), []);
  return ethHalfSupply();
}

export function useEthOneSupply() {
  const [, bump] = useState(0);
  useEffect(() => subscribeNftSupply(() => bump((n) => n + 1)), []);
  return ethOneSupply();
}

export function useEthTwoSupply() {
  const [, bump] = useState(0);
  useEffect(() => subscribeNftSupply(() => bump((n) => n + 1)), []);
  return ethTwoSupply();
}
