export type MarketplaceChain = "ethereum" | "solana" | "bitcoin";
export type MarketplaceAsset = "ETH" | "SOL" | "BTC";
export type WalletConnector = "injected" | "phantom" | "xverse";
export type ListingStatus = "listed" | "sold" | "not_offered";

export type MarketplaceListing = {
  id: string;
  latin: string;
  sin: string;
  chain: MarketplaceChain;
  asset: MarketplaceAsset;
  price: string;
  seller: string;
  editionMax: number;
  buyable: boolean;
  status: ListingStatus;
  kind: "primary";
};

export type ConnectedWallet = {
  address: string;
  connector: WalletConnector;
  chain: MarketplaceChain;
  chainId?: number;
};
