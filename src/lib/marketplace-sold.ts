import { listingById } from "@/data/listings";

const STORAGE_KEY = "maison-market-sold";

function read(): Record<string, number> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Record<string, number>;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function write(ledger: Record<string, number>) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ledger));
}

export function soldCount(id: string) {
  const listing = listingById(id);
  const raw = read()[id] ?? 0;
  const max = listing?.editionMax ?? 0;
  return Math.min(Math.max(0, raw), max);
}

export function remainingCount(id: string) {
  const listing = listingById(id);
  if (!listing) return 0;
  return Math.max(0, listing.editionMax - soldCount(id));
}

export function markSold(id: string) {
  const listing = listingById(id);
  if (!listing) return 0;
  const next = Math.min(listing.editionMax, soldCount(id) + 1);
  const ledger = read();
  ledger[id] = next;
  write(ledger);
  return Math.max(0, listing.editionMax - next);
}
