import { useEffect, useState } from "react";

import { NFT_MAX, type NftChain } from "@/lib/deal";

const STORAGE_KEY = "maison-nft-editions";

type Ledger = Record<NftChain, number>;
type Listener = () => void;

const listeners = new Set<Listener>();

function empty(): Ledger {
  return { bitcoin: 0, solana: 0, ethereum: 0 };
}

function read(): Ledger {
  if (typeof window === "undefined") return empty();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return empty();
    const parsed = JSON.parse(raw) as Partial<Ledger>;
    return {
      bitcoin: Number(parsed.bitcoin) || 0,
      solana: Number(parsed.solana) || 0,
      ethereum: Number(parsed.ethereum) || 0,
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
  const issued = Math.min(read()[chain], NFT_MAX[chain]);
  const max = NFT_MAX[chain];
  return {
    chain,
    edition: issued,
    max,
    remaining: Math.max(0, max - issued),
  };
}

export function allNftSupply() {
  return {
    bitcoin: nftSupply("bitcoin"),
    solana: nftSupply("solana"),
    ethereum: nftSupply("ethereum"),
  };
}

export function claimNftEdition(chain: NftChain): NftEdition | null {
  const ledger = read();
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
