import { useEffect, useState } from "react";

import type { DealKind, NftChain } from "@/lib/deal";

const STORAGE_KEY = "maison-owners-wall";

export type OwnerEntry = {
  address: string;
  alias: string;
  level: string;
  chain: NftChain;
  kind: DealKind;
  acquiredAt: string;
};

const HOUSE_LEDGER: OwnerEntry[] = [
  {
    address: "bc1qw508d6qejxtdg4y5r3zarvary0c5xw7kv8f3t4",
    alias: "Comtesse de la Yacht",
    level: "888 · 8 BTC",
    chain: "bitcoin",
    kind: "lucky",
    acquiredAt: "1666-06-06T16:06:00.000Z",
  },
  {
    address: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
    alias: "Baron von Ledger",
    level: "Bitcoin desk · 1 BTC",
    chain: "bitcoin",
    kind: "buy",
    acquiredAt: "1666-06-06T16:06:00.000Z",
  },
  {
    address: "0x1111111111111111111111111111111111111111",
    alias: "Duc de Gwei",
    level: "The Last Two · 2 ETH",
    chain: "ethereum",
    kind: "ethTwo",
    acquiredAt: "1666-06-06T16:06:00.000Z",
  },
  {
    address: "0x2222222222222222222222222222222222222222",
    alias: "Knyaz Pustoy",
    level: "The Shadow · 0.088 ETH",
    chain: "ethereum",
    kind: "eth",
    acquiredAt: "1666-06-06T16:06:00.000Z",
  },
  {
    address: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
    alias: "The Seeker",
    level: "Step Zero · 0.88 SOL",
    chain: "solana",
    kind: "sol",
    acquiredAt: "1666-06-06T16:06:00.000Z",
  },
  {
    address: "HzPdKs4nWxqQj8vY2nR5tLmA7cF9bE3wG6hJ1uS0qXyz",
    alias: "One Wrong PDF",
    level: "The Laptop · 8.88 SOL",
    chain: "solana",
    kind: "cleanse",
    acquiredAt: "1666-06-06T16:06:00.000Z",
  },
];

const listeners = new Set<() => void>();

function readExtras(): OwnerEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as OwnerEntry[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeExtras(entries: OwnerEntry[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries.slice(-80)));
  listeners.forEach((listener) => listener());
}

function normalizeAddress(value: string) {
  return value.trim().toLowerCase();
}

export function maskAddress(address: string) {
  const value = address.trim();
  if (value.length < 12) return value;
  return `${value.slice(0, 6)}…${value.slice(-4)}`;
}

export function allOwners(): OwnerEntry[] {
  const extras = readExtras();
  const seen = new Set(HOUSE_LEDGER.map((row) => normalizeAddress(row.address)));
  const unique = extras.filter((row) => {
    const key = normalizeAddress(row.address);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
  return [...unique.reverse(), ...HOUSE_LEDGER];
}

export function ownersForAddress(address: string): OwnerEntry[] {
  const key = normalizeAddress(address);
  if (!key) return [];
  return allOwners().filter((row) => normalizeAddress(row.address) === key);
}

export function isInnerCabinet(entries: OwnerEntry[]) {
  return entries.some(
    (row) =>
      row.kind === "lucky" ||
      row.kind === "ethTwo" ||
      row.kind === "cleanse" ||
      row.level.includes("888") ||
      row.level.includes("Laptop"),
  );
}

export function recordOwner(entry: OwnerEntry) {
  if (typeof window === "undefined") return;
  const extras = readExtras().filter(
    (row) =>
      !(
        normalizeAddress(row.address) === normalizeAddress(entry.address) &&
        row.kind === entry.kind
      ),
  );
  extras.push(entry);
  writeExtras(extras);
}

export function subscribeOwners(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function useOwners() {
  const [rows, setRows] = useState<OwnerEntry[]>(() =>
    typeof window === "undefined" ? HOUSE_LEDGER : allOwners(),
  );
  useEffect(() => {
    const refresh = () => setRows(allOwners());
    refresh();
    return subscribeOwners(refresh);
  }, []);
  return rows;
}

export function levelOfDeal(kind: DealKind, amount: string, sinDegree?: number) {
  if (kind === "lucky") return "888 · 8 BTC";
  if (kind === "buy") return "Bitcoin desk · 1 BTC";
  if (kind === "ethTwo") return "The Last Two · 2 ETH";
  if (kind === "ethOne") return "Ethereum desk · 1 ETH";
  if (kind === "eth") return "The Shadow · 0.5 ETH";
  if (kind === "cleanse" && sinDegree === 8) return "The Laptop · 8.88 SOL";
  if (kind === "cleanse") return `Liber Animarum · degree ${sinDegree ?? "?"}`;
  if (kind === "solLegendary") return "Solana legendary";
  if (kind === "solEpic") return "Solana epic";
  if (kind === "solRare") return "Solana rare";
  if (kind === "sol") return "The Seeker · Solana";
  return amount;
}
