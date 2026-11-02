import { useEffect, useState } from "react";

import {
  BTC_LUCKY_MAX,
  BTC_REGULAR_MAX,
  ETH_HALF_MAX,
  ETH_ONE_MAX,
  ETH_TWO_MAX,
  NFT_MAX,
  SOL_COMMON_MAX,
  SOL_EPIC_MAX,
  SOL_LEGENDARY_MAX,
  SOL_RARE_MAX,
  type NftChain,
} from "@/lib/deal";
import { solEditionsOf, type SolRarity } from "@/lib/sol-rarity";

const STORAGE_KEY = "maison-nft-editions";

export type NftPool =
  | "regular"
  | "lucky"
  | "ethHalf"
  | "ethOne"
  | "ethTwo"
  | "solCommon"
  | "solRare"
  | "solEpic"
  | "solLegendary";

type Ledger = Record<NftChain, number> & {
  lucky: number;
  ethOne: number;
  ethTwo: number;
  solCommon: number;
  solRare: number;
  solEpic: number;
  solLegendary: number;
};
type Listener = () => void;

const listeners = new Set<Listener>();

function empty(): Ledger {
  return {
    bitcoin: 0,
    solana: 0,
    ethereum: 0,
    lucky: 0,
    ethOne: 0,
    ethTwo: 0,
    solCommon: 0,
    solRare: 0,
    solEpic: 0,
    solLegendary: 0,
  };
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
      solCommon: Math.min(Number(parsed.solCommon) || 0, SOL_COMMON_MAX),
      solRare: Math.min(Number(parsed.solRare) || 0, SOL_RARE_MAX),
      solEpic: Math.min(Number(parsed.solEpic) || 0, SOL_EPIC_MAX),
      solLegendary: Math.min(Number(parsed.solLegendary) || 0, SOL_LEGENDARY_MAX),
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

function solIssued(ledger: Ledger) {
  return (
    Math.min(ledger.solCommon, SOL_COMMON_MAX) +
    Math.min(ledger.solRare, SOL_RARE_MAX) +
    Math.min(ledger.solEpic, SOL_EPIC_MAX) +
    Math.min(ledger.solLegendary, SOL_LEGENDARY_MAX)
  );
}

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
  if (chain === "solana") {
    const issued = solIssued(ledger);
    const max = NFT_MAX.solana;
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

function solPoolSupply(rarity: SolRarity, issued: number, max: number): NftEdition {
  const slots = solEditionsOf(rarity);
  const edition = issued > 0 ? slots[issued - 1] : 0;
  return {
    chain: "solana",
    edition,
    max,
    remaining: Math.max(0, max - issued),
  };
}

export function solCommonSupply(): NftEdition {
  return solPoolSupply("common", Math.min(read().solCommon, SOL_COMMON_MAX), SOL_COMMON_MAX);
}

export function solRareSupply(): NftEdition {
  return solPoolSupply("rare", Math.min(read().solRare, SOL_RARE_MAX), SOL_RARE_MAX);
}

export function solEpicSupply(): NftEdition {
  return solPoolSupply("epic", Math.min(read().solEpic, SOL_EPIC_MAX), SOL_EPIC_MAX);
}

export function solLegendarySupply(): NftEdition {
  return solPoolSupply(
    "legendary",
    Math.min(read().solLegendary, SOL_LEGENDARY_MAX),
    SOL_LEGENDARY_MAX,
  );
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
    solCommon: solCommonSupply(),
    solRare: solRareSupply(),
    solEpic: solEpicSupply(),
    solLegendary: solLegendarySupply(),
  };
}

function claimSolRarity(
  ledger: Ledger,
  rarity: SolRarity,
  key: "solCommon" | "solRare" | "solEpic" | "solLegendary",
  max: number,
): NftEdition | null {
  if (ledger[key] >= max) return null;
  ledger[key] += 1;
  write(ledger);
  const slots = solEditionsOf(rarity);
  return {
    chain: "solana",
    edition: slots[ledger[key] - 1],
    max: NFT_MAX.solana,
    remaining: Math.max(0, max - ledger[key]),
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
  if (chain === "solana" && pool === "solRare") {
    return claimSolRarity(ledger, "rare", "solRare", SOL_RARE_MAX);
  }
  if (chain === "solana" && pool === "solEpic") {
    return claimSolRarity(ledger, "epic", "solEpic", SOL_EPIC_MAX);
  }
  if (chain === "solana" && pool === "solLegendary") {
    return claimSolRarity(ledger, "legendary", "solLegendary", SOL_LEGENDARY_MAX);
  }
  if (chain === "solana") {
    return claimSolRarity(ledger, "common", "solCommon", SOL_COMMON_MAX);
  }
  return null;
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

export function useSolCommonSupply() {
  const [, bump] = useState(0);
  useEffect(() => subscribeNftSupply(() => bump((n) => n + 1)), []);
  return solCommonSupply();
}

export function useSolRareSupply() {
  const [, bump] = useState(0);
  useEffect(() => subscribeNftSupply(() => bump((n) => n + 1)), []);
  return solRareSupply();
}

export function useSolEpicSupply() {
  const [, bump] = useState(0);
  useEffect(() => subscribeNftSupply(() => bump((n) => n + 1)), []);
  return solEpicSupply();
}

export function useSolLegendarySupply() {
  const [, bump] = useState(0);
  useEffect(() => subscribeNftSupply(() => bump((n) => n + 1)), []);
  return solLegendarySupply();
}
