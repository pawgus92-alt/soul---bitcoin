import { json, rateLimit, withTimeout } from "./_lib/http.js";
import { isAddressShape } from "./_lib/screen.js";

export default async function handler(request, response) {
  if (request.method !== "POST") {
    return json(response, 405, { error: "POST only." });
  }
  if (!rateLimit(request, "verify-sol", 20, 60 * 1000)) {
    return json(response, 429, { error: "Wait." });
  }
  const body = request.body && typeof request.body === "object" ? request.body : {};
  const address = String(body.address || "").trim();
  if (!isAddressShape(address, "solana")) {
    return json(response, 400, { error: "The address cannot be read." });
  }
  const rpc = process.env.HELIUS_RPC_URL || process.env.SOLANA_RPC_URL || "https://api.mainnet-beta.solana.com";
  try {
    const payload = await withTimeout(async (signal) => {
      const result = await fetch(rpc, {
        method: "POST",
        signal,
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: 1,
          method: "getAccountInfo",
          params: [address, { encoding: "base64" }],
        }),
      });
      if (!result.ok) throw new Error("rpc");
      return result.json();
    });
    return json(response, 200, {
      address,
      exists: Boolean(payload && payload.result && payload.result.value),
    });
  } catch {
    console.error("[web3]", "sol verify failed");
    return json(response, 503, { error: "The chain is silent." });
  }
}
