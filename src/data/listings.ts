import { PRIMARY_SELLER, PROTOCOL_FEE_BPS } from "@/lib/contracts/addresses";
import { POWER_BRANCHES, SCALA_STEPS } from "@/lib/sins";
import type { MarketplaceListing } from "@/types/web3";

function chainOf(asset: "ETH" | "SOL" | "BTC") {
  if (asset === "ETH") return "ethereum" as const;
  if (asset === "SOL") return "solana" as const;
  return "bitcoin" as const;
}

export const MARKETPLACE_LISTINGS: MarketplaceListing[] = [
  ...SCALA_STEPS.map((step) => ({
    id: step.id,
    latin: step.latin,
    sin: step.sin,
    chain: chainOf(step.asset),
    asset: step.asset,
    price: String(step.amount),
    seller: PRIMARY_SELLER[chainOf(step.asset)],
    editionMax: step.max,
    buyable: step.buyable,
    status: step.buyable ? ("listed" as const) : ("not_offered" as const),
    kind: "primary" as const,
  })),
  ...POWER_BRANCHES.map((branch) => ({
    id: branch.id,
    latin: branch.latin,
    sin: branch.sin,
    chain: chainOf(branch.asset),
    asset: branch.asset,
    price: String(branch.amount),
    seller: PRIMARY_SELLER[chainOf(branch.asset)],
    editionMax: branch.max,
    buyable: true,
    status: "listed" as const,
    kind: "primary" as const,
  })),
];

export { PROTOCOL_FEE_BPS };

export function listingById(id: string) {
  return MARKETPLACE_LISTINGS.find((row) => row.id === id);
}

export function listingPriceAtomic(listing: MarketplaceListing): bigint {
  const [whole, fraction = ""] = listing.price.split(".");
  const decimals = listing.asset === "ETH" ? 18 : listing.asset === "SOL" ? 9 : 8;
  const frac = fraction.padEnd(decimals, "0").slice(0, decimals);
  return BigInt(whole || "0") * 10n ** BigInt(decimals) + BigInt(frac || "0");
}
