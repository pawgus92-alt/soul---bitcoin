const MEMPOOL = "https://mempool.space/api";
const BLOCKSTREAM = "https://blockstream.info/api";
const SOLANA = "https://api.mainnet-beta.solana.com";
const BLOCKSCOUT = "https://eth.blockscout.com/api/v2";
const ETH_RPC = "https://ethereum.publicnode.com";

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

function txTime(value) {
  if (value == null || value === "") return null;
  if (typeof value === "number") {
    return value > 1e12 ? Math.floor(value / 1000) : value;
  }
  const asNumber = Number(value);
  if (Number.isFinite(asNumber) && asNumber > 0) {
    return asNumber > 1e12 ? Math.floor(asNumber / 1000) : asNumber;
  }
  const parsed = Date.parse(String(value));
  return Number.isNaN(parsed) ? null : Math.floor(parsed / 1000);
}

function isRecent(time, since) {
  if (!since) return true;
  if (time == null) return true;
  return time >= since;
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

function bitcoinPayer(tx, deskAddress) {
  for (const inn of tx.vin || []) {
    const from =
      inn.prevout?.scriptpubkey_address ||
      inn.prevout?.address ||
      inn.address;
    if (from && from !== deskAddress) return String(from);
  }
  return null;
}

async function watchBitcoin(address, expected, since) {
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
  let txid = null;
  let confirmed = false;
  let received = 0;
  let payer = null;
  for (const tx of txs) {
    const incoming = bitcoinIncoming(tx, address);
    const time = txTime(tx.status?.block_time);
    const unconfirmed = !tx.status?.confirmed;
    if (incoming < expected) continue;
    if (!unconfirmed && !isRecent(time, since)) continue;
    received = incoming;
    txid = tx.txid;
    confirmed = Boolean(tx.status?.confirmed);
    payer = bitcoinPayer(tx, address);
    break;
  }
  return {
    chain: "bitcoin",
    address,
    expected: String(expected),
    received: String(received),
    paid: expected > 0 && received >= expected,
    txid,
    payer,
    confirmed,
    explorer: txid
      ? `https://mempool.space/tx/${txid}`
      : `https://mempool.space/address/${address}`,
  };
}

function solanaPayer(tx, deskAddress) {
  const keys = (tx.transaction?.message?.accountKeys || []).map((key) =>
    typeof key === "string" ? key : key.pubkey,
  );
  for (let index = 0; index < keys.length; index += 1) {
    if (keys[index] === deskAddress) continue;
    const pre = Number(tx.meta?.preBalances?.[index] || 0);
    const post = Number(tx.meta?.postBalances?.[index] || 0);
    if (pre > post) return keys[index];
  }
  return keys[0] && keys[0] !== deskAddress ? keys[0] : null;
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

async function watchSolana(address, expected, mint, since) {
  const signatures = await solanaRpc("getSignaturesForAddress", [
    address,
    { limit: 20 },
  ]);
  let received = 0;
  let txid = null;
  let confirmed = false;
  let payer = null;
  for (const item of signatures || []) {
    if (!isRecent(txTime(item.blockTime), since)) continue;
    const tx = await solanaRpc("getTransaction", [
      item.signature,
      { encoding: "jsonParsed", maxSupportedTransactionVersion: 0 },
    ]);
    if (!tx) continue;
    const incoming = mint ? tokenDelta(tx, address, mint) : solDelta(tx, address);
    if (incoming >= expected) {
      received = incoming;
      txid = item.signature;
      confirmed = item.confirmationStatus === "finalized";
      payer = solanaPayer(tx, address);
      break;
    }
  }
  return {
    chain: "solana",
    address,
    expected: String(expected),
    received: String(received),
    paid: expected > 0 && received >= expected,
    txid,
    payer,
    confirmed,
    explorer: txid
      ? `https://solscan.io/tx/${txid}`
      : `https://solscan.io/account/${address}`,
  };
}

async function ethBalance(address) {
  try {
    const data = await fetchJson(
      `${BLOCKSCOUT}/addresses/${encodeURIComponent(address)}`,
    );
    return BigInt(data.coin_balance || "0");
  } catch {
    const response = await fetch(ETH_RPC, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "eth_getBalance",
        params: [address, "latest"],
      }),
    });
    const data = await response.json();
    return BigInt(data.result || "0x0");
  }
}

async function watchEthereum(address, expectedRaw, since) {
  const expected = BigInt(expectedRaw || "0");
  const addr = address.toLowerCase();
  let received = 0n;
  let txid = null;
  let confirmed = false;
  let payer = null;
  try {
    const txs = await fetchJson(
      `${BLOCKSCOUT}/addresses/${encodeURIComponent(address)}/transactions?filter=to`,
    );
    for (const tx of txs.items || []) {
      const to = String(tx.to?.hash || "").toLowerCase();
      const value = BigInt(tx.value || "0");
      const time = txTime(tx.timestamp);
      if (to !== addr || value < expected) continue;
      if (!isRecent(time, since)) continue;
      received = value;
      txid = tx.hash || null;
      confirmed = tx.status === "ok" && Boolean(tx.block_number);
      payer = tx.from?.hash || tx.from || null;
      break;
    }
  } catch {
    const balance = await ethBalance(address);
    if (expected > 0n && balance >= expected) received = expected;
  }
  return {
    chain: "ethereum",
    address,
    expected: expected.toString(),
    received: received.toString(),
    paid: expected > 0n && received >= expected,
    txid,
    payer,
    confirmed,
    explorer: txid
      ? `https://etherscan.io/tx/${txid}`
      : `https://etherscan.io/address/${address}`,
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
    const expectedRaw = params.get("expected") || "0";
    const mint = params.get("mint") || undefined;
    const since = Number(params.get("since") || 0) || 0;
    if (!address || !chain) {
      json(response, 400, { error: "chain and address are required" });
      return;
    }
    if (chain === "bitcoin") {
      json(response, 200, await watchBitcoin(address, Number(expectedRaw), since));
      return;
    }
    if (chain === "solana") {
      json(
        response,
        200,
        await watchSolana(address, Number(expectedRaw), mint, since),
      );
      return;
    }
    if (chain === "ethereum") {
      json(response, 200, await watchEthereum(address, expectedRaw, since));
      return;
    }
    json(response, 400, { error: "unknown chain" });
  } catch (error) {
    json(response, 500, {
      error: error instanceof Error ? error.message : "watch failed",
    });
  }
}
