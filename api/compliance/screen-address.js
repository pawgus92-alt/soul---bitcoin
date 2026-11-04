import { csrfAllowed, json, rateLimit } from "../_lib/http.js";
import { isAddressShape, screenAddress } from "../_lib/screen.js";

export default async function handler(request, response) {
  if (request.method === "OPTIONS") {
    response.setHeader("allow", "POST, OPTIONS");
    return json(response, 204, {});
  }
  if (request.method !== "POST") {
    return json(response, 405, { error: "The desk only accepts POST." });
  }
  if (!csrfAllowed(request)) {
    return json(response, 403, { error: "The request did not come from this house." });
  }
  if (!rateLimit(request, "screen", 30, 10 * 60 * 1000)) {
    return json(response, 429, { error: "The compliance desk is occupied. Wait." });
  }

  const body = request.body && typeof request.body === "object" ? request.body : {};
  const address = String(body.address || "").trim();
  const chain = String(body.chain || "").trim();
  if (!["ethereum", "solana", "bitcoin"].includes(chain) || !isAddressShape(address, chain)) {
    return json(response, 400, { error: "The address cannot be read." });
  }

  try {
    const result = await screenAddress({ address, chain });
    console.error("[compliance]", result.address, result.risk, result.provider);
    return json(response, result.allowed ? 200 : 403, result);
  } catch {
    console.error("[compliance]", "unavailable");
    return json(response, 503, {
      error: "The compliance desk is silent. The trade cannot proceed.",
      code: "COMPLIANCE_UNAVAILABLE",
    });
  }
}
