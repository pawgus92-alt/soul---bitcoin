import { MARKETPLACE_LISTINGS, PROTOCOL_FEE_BPS } from "./_lib/catalog.js";
import { csrfAllowed, json, rateLimit, withTimeout } from "./_lib/http.js";
import { isAddressShape, screenAddress } from "./_lib/screen.js";

function opOf(request) {
  const url = new URL(request.url || "", "http://maison.local");
  const fromQuery = url.searchParams.get("op");
  if (fromQuery) return fromQuery;
  const path = url.pathname.replace(/\/+$/, "");
  if (path.endsWith("/listings")) return "listings";
  if (path.endsWith("/screen-address")) return "screen";
  if (path.endsWith("/verify-eth")) return "verify-eth";
  if (path.endsWith("/verify-sol")) return "verify-sol";
  if (path.endsWith("/verify-btc")) return "verify-btc";
  return "listings";
}

async function listings(request, response) {
  if (request.method !== "GET") {
    return json(response, 405, { error: "Listings are read only." });
  }
  if (!rateLimit(request, "listings", 60, 60 * 1000)) {
    return json(response, 429, { error: "The vitrine is occupied. Wait." });
  }
  return json(response, 200, {
    protocolFeeBps: PROTOCOL_FEE_BPS,
    custody: "none",
    rails: ["BTC", "ETH", "SOL"],
    listings: MARKETPLACE_LISTINGS,
  });
}

async function screen(request, response) {
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

async function verifyEth(request, response) {
  if (request.method !== "POST") return json(response, 405, { error: "POST only." });
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
    return json(response, 200, { address, contract: code !== "0x" && code !== "0x0" });
  } catch {
    console.error("[web3]", "eth verify failed");
    return json(response, 503, { error: "The chain is silent." });
  }
}

async function verifySol(request, response) {
  if (request.method !== "POST") return json(response, 405, { error: "POST only." });
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

async function verifyBtc(request, response) {
  if (request.method !== "POST") return json(response, 405, { error: "POST only." });
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
      const headers = {};
      if (process.env.HIRO_KEY) headers["x-api-key"] = process.env.HIRO_KEY;
      const result = await fetch(`${base}/inscriptions/${encodeURIComponent(inscriptionId)}`, {
        signal,
        headers,
      });
      if (result.status === 404) return { found: false };
      if (!result.ok) throw new Error("rpc");
      return result.json();
    });
    return json(response, 200, { inscriptionId, found: payload.found !== false });
  } catch {
    console.error("[web3]", "btc verify failed");
    return json(response, 503, { error: "The chain is silent." });
  }
}

export default async function handler(request, response) {
  const op = opOf(request);
  if (op === "screen") return screen(request, response);
  if (op === "verify-eth") return verifyEth(request, response);
  if (op === "verify-sol") return verifySol(request, response);
  if (op === "verify-btc") return verifyBtc(request, response);
  return listings(request, response);
}
