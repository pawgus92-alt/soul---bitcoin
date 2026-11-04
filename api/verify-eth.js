import { json, rateLimit, withTimeout } from "./_lib/http.js";
import { isAddressShape } from "./_lib/screen.js";

export default async function handler(request, response) {
  if (request.method !== "POST") {
    return json(response, 405, { error: "POST only." });
  }
  if (!rateLimit(request, "verify-eth", 20, 60 * 1000)) {
    return json(response, 429, { error: "Wait." });
  }
  const body = request.body && typeof request.body === "object" ? request.body : {};
  const address = String(body.address || "").trim();
  if (!isAddressShape(address, "ethereum")) {
    return json(response, 400, { error: "The address cannot be read." });
  }
  const rpc = process.env.ETH_RPC_URL || "https://ethereum.publicnode.com";
  try {
    const payload = await withTimeout(async (signal) => {
      const result = await fetch(rpc, {
        method: "POST",
        signal,
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: 1,
          method: "eth_getCode",
          params: [address, "latest"],
        }),
      });
      if (!result.ok) throw new Error("rpc");
      return result.json();
    });
    const code = payload && payload.result ? String(payload.result) : "0x";
    return json(response, 200, {
      address,
      contract: code !== "0x" && code !== "0x0",
    });
  } catch {
    console.error("[web3]", "eth verify failed");
    return json(response, 503, { error: "The chain is silent." });
  }
}
