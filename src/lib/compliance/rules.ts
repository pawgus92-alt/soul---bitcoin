import {
  BLOCKED_CATEGORIES,
  LOCAL_DENYLIST,
  normalizeAddress,
  type BlockedCategory,
} from "@/data/compliance-lists";
import type { RiskLevel } from "@/types/compliance";

export function categoryIsBlocked(category: string) {
  const key = category.trim().toLowerCase().replace(/[\s-]+/g, "_");
  return (BLOCKED_CATEGORIES as readonly string[]).includes(key);
}

export function localHit(address: string): BlockedCategory | null {
  const key = normalizeAddress(address);
  return LOCAL_DENYLIST[key] ?? null;
}

export function riskFromCategories(categories: string[]): RiskLevel {
  const blocked = categories.filter(categoryIsBlocked);
  if (blocked.some((item) => item.includes("sanction") || item === "ofac")) {
    return "sanctioned";
  }
  if (blocked.length > 0) return "high-risk";
  return "low-risk";
}

export function isAllowedRisk(risk: RiskLevel) {
  return risk === "low-risk";
}
