export type RiskLevel = "low-risk" | "high-risk" | "sanctioned";

export type ScreenRequest = {
  address: string;
  chain: "ethereum" | "solana" | "bitcoin";
};

export type ScreenResult = {
  address: string;
  chain: ScreenRequest["chain"];
  risk: RiskLevel;
  allowed: boolean;
  categories: string[];
  provider: "trm" | "local";
};
