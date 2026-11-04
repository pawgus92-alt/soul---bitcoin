import { json, rateLimit, withTimeout } from "./_lib/http.js";
import { isAddressShape } from "./_lib/screen.js";

export default async function handler(request, response) {
  if (request.method !== "POST") {
    return json(response, 405, { error: "POST only." });
  }
  if (!rateLimit(request, "verify-btc", 20, 60 * 1000)) {
    return json(response, 429, { error: "Wait." });
  }
  const body = request.body && typeof request.body === "object" ? request.body : {};
  const inscriptionId = String(body.inscriptionId || "").trim();
  const address = String(body.address || "").trim();
  if (address && !isAddressShape(address, "bitcoin")) {
    return json(response, 400, { error: "The address cannot be read." });
  }
  const base = process.env.HIRO_ORDINALS_URL || "https://api.hiro.so/ordinals/v1";
  if (!inscriptionId) {
    return json(response, 200, { address, recorded: Boolean(address) });
  }
  try {
    const payload = await withTimeout(async (signal) => {
      const result = await fetch(`${base}/inscriptions/${encodeURIComponent(inscriptionId)}`, {
        signal,
        headers: process.env.HIRO_KEY ? { "x-api-key": process.env.HIRO_KEY } : {},
      });
      if (result.status === 404) return { found: false };
      if (!result.ok) throw new Error("rpc");
      return result.json();
    });
    return json(response, 200, {
      inscriptionId,
      found: payload.found !== false,
    });
  } catch {
    console.error("[web3]", "btc verify failed");
    return json(response, 503, { error: "The chain is silent." });
  }
}
