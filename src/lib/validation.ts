import { z } from "zod";

export const chainSchema = z.enum(["ethereum", "solana", "bitcoin"]);

export const screenRequestSchema = z.object({
  address: z.string().trim().min(8).max(128),
  chain: chainSchema,
});

export const screenResultSchema = z.object({
  address: z.string(),
  chain: chainSchema,
  risk: z.enum(["low-risk", "high-risk", "sanctioned"]),
  allowed: z.boolean(),
  categories: z.array(z.string()),
  provider: z.enum(["trm", "local"]),
});

export const listingSchema = z.object({
  id: z.string(),
  latin: z.string(),
  sin: z.string(),
  chain: chainSchema,
  asset: z.enum(["ETH", "SOL", "BTC"]),
  price: z.string(),
  seller: z.string(),
  editionMax: z.number().int().positive(),
  buyable: z.boolean(),
  status: z.enum(["listed", "sold", "not_offered"]),
  kind: z.literal("primary"),
});

