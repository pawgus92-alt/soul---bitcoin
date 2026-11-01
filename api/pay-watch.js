const MEMPOOL = "https://mempool.space/api";
const BLOCKSTREAM = "https://blockstream.info/api";
const SOLANA = "https://api.mainnet-beta.solana.com";

async function fetchJson(url, ms = 8000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) throw new Error(`${response.status}`);
    return response.json();
  } finally {
    clearTimeout(timer);
  }
}

function json(response, status, body) {
  response.statusCode = status;
  response.setHeader("content-type", "application/json");
  response.setHeader("cache-control", "no-store");
  response.end(JSON.stringify(body));
}

function query(request) {
  try {
    return new URL(request.url, "http://localhost").searchParams;
  } catch {
    return new URLSearchParams();
  }
}

async function solanaRpc(method, params) {
  const response = await fetch(SOLANA, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ jsonrpc: "2.0", id: 1, method, params }),
  });
  const data = await response.json();
  if (data.error) {
    throw new Error(data.error.message || "Solana RPC failed");
  }
  return data.result;
}

function bitcoinIncoming(tx, address) {
  let sats = 0;
  for (const out of tx.vout || []) {
    if (out.scriptpubkey_address === address) sats += Number(out.value) || 0;
  }
  return sats;
}

async function watchBitcoin(address, expected) {
  let stats;
  try {
    stats = await fetchJson(`${MEMPOOL}/address/${encodeURIComponent(address)}`);
  } catch {
    stats = await fetchJson(
      `${BLOCKSTREAM}/address/${encodeURIComponent(address)}`,
    );
  }
  const received =
    Number(stats.chain_stats?.funded_txo_sum || 0) +
    Number(stats.mempool_stats?.funded_txo_sum || 0);
  let txs = [];
  try {
    txs = await fetchJson(
      `${MEMPOOL}/address/${encodeURIComponent(address)}/txs`,
      6000,
    );
  } catch {
    try {
      txs = await fetchJson(
        `${BLOCKSTREAM}/address/${encodeURIComponent(address)}/txs`,
        6000,
      );
    } catch {
      txs = [];
    }
  }
  let txid;
  let confirmed = false;
  for (const tx of txs) {
    const incoming = bitcoinIncoming(tx, address);
    if (incoming >= expected) {
      txid = tx.txid;
      confirmed = Boolean(tx.status?.confirmed);
      break;
    }
  }
  const paid = received >= expected && expected > 0;
  return {
    chain: "bitcoin",
    address,
    expected,
    received,
    paid,
    txid: txid || null,
    confirmed,
    explorer: txid
      ? `https://mempool.space/tx/${txid}`
      : `https://mempool.space/address/${address}`,
  };
}

function solDelta(tx, address) {
  const keys = (tx.transaction?.message?.accountKeys || []).map((key) =>
    typeof key === "string" ? key : key.pubkey,
  );
  const index = keys.indexOf(address);
  if (index < 0) return 0;
  const pre = Number(tx.meta?.preBalances?.[index] || 0);
  const post = Number(tx.meta?.postBalances?.[index] || 0);
  return post - pre;
}

function tokenDelta(tx, owner, mint) {
  const pre = (tx.meta?.preTokenBalances || []).find(
    (row) => row.owner === owner && row.mint === mint,
  );
  const post = (tx.meta?.postTokenBalances || []).find(
    (row) => row.owner === owner && row.mint === mint,
  );
  return (
    Number(post?.uiTokenAmount?.amount || 0) -
    Number(pre?.uiTokenAmount?.amount || 0)
  );
}

async function watchSolana(address, expected, mint) {
  const signatures = await solanaRpc("getSignaturesForAddress", [
    address,
    { limit: 20 },
  ]);
  let received = 0;
  let txid = null;
  let confirmed = false;
  for (const item of signatures || []) {
    const tx = await solanaRpc("getTransaction", [
      item.signature,
      { encoding: "jsonParsed", maxSupportedTransactionVersion: 0 },
    ]);
    if (!tx) continue;
    const incoming = mint ? tokenDelta(tx, address, mint) : solDelta(tx, address);
    if (incoming > received) {
      received = incoming;
      txid = item.signature;
      confirmed = item.confirmationStatus === "finalized";
    }
    if (incoming >= expected) {
      received = incoming;
      txid = item.signature;
      confirmed = item.confirmationStatus === "finalized";
      break;
    }
  }
  return {
    chain: "solana",
    address,
    expected,
    received,
    paid: expected > 0 && received >= expected,
    txid,
    confirmed,
    explorer: txid
      ? `https://solscan.io/tx/${txid}`
      : `https://solscan.io/account/${address}`,
  };
}

export default async function handler(request, response) {
  try {
    if (request.method !== "GET") {
      json(response, 405, { error: "method not allowed" });
      return;
    }
    const params = query(request);
    const chain = params.get("chain");
    const address = String(params.get("address") || "").trim();
    const expected = Number(params.get("expected") || 0);
    const mint = params.get("mint") || undefined;
    if (!address || !chain) {
      json(response, 400, { error: "chain and address are required" });
      return;
    }
    if (chain === "bitcoin") {
      json(response, 200, await watchBitcoin(address, expected));
      return;
    }
    if (chain === "solana") {
      json(response, 200, await watchSolana(address, expected, mint));
      return;
    }
    json(response, 400, { error: "unknown chain" });
  } catch (error) {
    json(response, 500, {
      error: error instanceof Error ? error.message : "watch failed",
    });
  }
}
