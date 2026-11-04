import { screenResultSchema } from "@/lib/validation";
import { ComplianceCheckFailedError, HighRiskAddressError, SanctionedAddressError } from "@/lib/errors";
import type { ScreenRequest, ScreenResult } from "@/types/compliance";

export async function requestScreen(input: ScreenRequest): Promise<ScreenResult> {
  const response = await fetch("/api/market?op=screen", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(input),
  });
  const raw: unknown = await response.json().catch(() => null);
  if (response.status === 503) {
    throw new ComplianceCheckFailedError();
  }
  const parsed = screenResultSchema.safeParse(raw);
  if (!parsed.success) {
    throw new ComplianceCheckFailedError();
  }
  if (parsed.data.risk === "sanctioned") throw new SanctionedAddressError();
  if (parsed.data.risk === "high-risk" || !parsed.data.allowed) {
    throw new HighRiskAddressError();
  }
  return parsed.data;
}
