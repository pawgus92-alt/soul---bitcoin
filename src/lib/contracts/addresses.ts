import { BTC_ADDRESS, ETH_ADDRESS, SOL_ADDRESS } from "@/lib/deal";
import type { MarketplaceChain } from "@/types/web3";

/** Protocol fee is zero. The house is a vitrine, not a broker. */
export const PROTOCOL_FEE_BPS = 0;

export const ETHEREUM_CHAIN_ID = 1;
export const EXPECTED_CHAINS = {
  ethereum: ETHEREUM_CHAIN_ID,
  solana: "mainnet-beta",
  bitcoin: "mainnet",
} as const;

/**
 * Primary sellers are the published house desks.
 * They sell house inventory. They are not a pool of visitor funds.
 */
export const PRIMARY_SELLER: Record<MarketplaceChain, string> = {
  ethereum: ETH_ADDRESS,
  solana: SOL_ADDRESS,
  bitcoin: BTC_ADDRESS,
};

/** Optional Seaport-like market. Empty means native P2P send to seller. */
export const MARKET_CONTRACT = {
  ethereum: "",
  solana: "",
  bitcoin: "",
} as const;
