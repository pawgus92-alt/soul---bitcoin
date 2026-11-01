const CHISEL = "https://api.chisel.xyz";
const MEMPOOL_FEES = "https://mempool.space/api/v1/fees/recommended";

function json(response, status, body) {
  response.statusCode = status;
  response.setHeader("content-type", "application/json");
  response.setHeader("cache-control", "no-store");
  response.end(JSON.stringify(body));
}

function queryId(request) {
  if (request.query?.id) return String(request.query.id);
  try {
    return new URL(request.url, "http://localhost").searchParams.get("id");
  } catch {
    return null;
  }
}

async function readBody(request) {
  if (request.body && typeof request.body === "object" && !Buffer.isBuffer(request.body)) {
    return request.body;
  }
  if (typeof request.body === "string" && request.body) {
    return JSON.parse(request.body);
  }
  const chunks = [];
  for await (const chunk of request) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString("utf8");
  return raw ? JSON.parse(raw) : {};
}

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function certificateSvg(payload) {
  const sell = payload.kind === "sell";
  const holder = escapeXml(String(payload.holder || "Anonymous").slice(0, 42));
  const serial = escapeXml(payload.serial);
  const paid = escapeXml(payload.btcAmount);
  const issued = escapeXml(String(payload.issuedAt || "").slice(0, 10));
  const desk =
    payload.kind === "sol"
      ? "MIDDLE DESK · 10 SOL"
      : payload.kind === "pearl"
        ? "MIDDLE DESK · 650 PEARL"
        : sell
          ? "SOUL DISPOSAL"
          : "SOUL ACQUISITION";
  return `<svg xmlns="http://www.w3.org/2000/svg" width="720" height="480" viewBox="0 0 720 480">
  <rect width="720" height="480" fill="#f4e6c8"/>
  <rect x="14" y="14" width="692" height="452" fill="none" stroke="#7a1f2b" stroke-width="4"/>
  <rect x="24" y="24" width="672" height="432" fill="none" stroke="#c9a227" stroke-width="2"/>
  <text x="360" y="78" text-anchor="middle" fill="#7a1f2b" font-size="28" font-family="Times New Roman,serif">MAISON AETERNUM</text>
  <text x="360" y="108" text-anchor="middle" fill="#1e3a6e" font-size="16" font-family="Times New Roman,serif">${desk}</text>
  <text x="360" y="188" text-anchor="middle" fill="#7a1f2b" font-size="30" font-family="Times New Roman,serif">${holder}</text>
  <text x="360" y="232" text-anchor="middle" fill="#1f6b4a" font-size="20" font-family="Times New Roman,serif">${sell ? "SOLD ONE SOUL" : "BOUGHT ONE SOUL"}</text>
  <text x="360" y="268" text-anchor="middle" fill="#5c3d24" font-size="14" font-family="Times New Roman,serif">${paid} · ${issued}</text>
  <text x="360" y="336" text-anchor="middle" fill="#2a1a12" font-size="18" font-family="Courier New,monospace">${serial}</text>
  <text x="360" y="400" text-anchor="middle" fill="#1e3a6e" font-size="13" font-family="Times New Roman,serif">BITCOIN ORDINAL NFT</text>
</svg>`;
}

function extractInscriptionId(data) {
  if (typeof data.inscription_id === "string" && data.inscription_id) {
    return data.inscription_id;
  }
  if (Array.isArray(data.inscription_ids) && data.inscription_ids[0]) {
    return String(data.inscription_ids[0]);
  }
  if (Array.isArray(data.inscriptions) && data.inscriptions[0]) {
    const first = data.inscriptions[0];
    if (typeof first === "string") return first;
    if (first?.id) return String(first.id);
    if (first?.inscription_id) return String(first.inscription_id);
  }
  if (typeof data.tx?.inscription === "string") return data.tx.inscription;
  if (typeof data.reveal_txid === "string") return `${data.reveal_txid}i0`;
  return undefined;
}

function mapStatus(raw) {
  if (raw === "confirmed") return "minted";
  if (
    raw === "broadcasting" ||
    raw === "awaiting-confirmation" ||
    raw === "awaiting-ordinal"
  ) {
    return "inscribing";
  }
  if (raw === "awaiting-funding") return "pending";
  if (raw === "error" || raw === "expired") return "error";
  return "pending";
}

function publicOrder(data) {
  const inscriptionId = extractInscriptionId(data);
  const rawStatus = data.status || "awaiting-funding";
  return {
    orderId: data.id,
    receiveAddress: data.destination,
    chargeAddress: data.funding_address || data.address,
    chargeSats: data.amount,
    status: inscriptionId ? "minted" : mapStatus(rawStatus),
    rawStatus,
    expiration: data.expiration,
    inscriptionId,
    orderUrl: data.id ? `https://chisel.xyz/order/${data.id}` : undefined,
  };
}

async function feeRate() {
  try {
    const response = await fetch(MEMPOOL_FEES);
    if (!response.ok) return 8;
    const fees = await response.json();
    const fastest = Number(fees.fastestFee);
    if (!Number.isFinite(fastest) || fastest < 1) return 8;
    return Math.min(24, Math.max(6, Math.round(fastest)));
  } catch {
    return 8;
  }
}

export default async function handler(request, response) {
  try {
    if (request.method === "GET") {
      const id = queryId(request);
      if (!id) {
        json(response, 400, { error: "missing order id", status: "error" });
        return;
      }
      const upstream = await fetch(
        `${CHISEL}/api/inscription/${encodeURIComponent(id)}/status`,
      );
      const data = await upstream.json();
      if (!upstream.ok) {
        json(response, upstream.status, {
          error: data.message || data.error || "order lookup failed",
          status: "error",
        });
        return;
      }
      json(response, 200, publicOrder(data));
      return;
    }

    if (request.method !== "POST") {
      json(response, 405, { error: "method not allowed", status: "error" });
      return;
    }

    const payload = await readBody(request);
    const receiveAddress = String(payload.receiveAddress || "").trim();
    const serial = String(payload.serial || "").trim();
    if (!receiveAddress || !serial) {
      json(response, 400, {
        error: "receiveAddress and serial are required",
        status: "error",
      });
      return;
    }

    const svg = certificateSvg(payload);
    const metadata = JSON.stringify({
      p: "maison-aeternum",
      op: "soul-cert",
      kind: payload.kind,
      code: serial,
      digest: payload.digest,
      holder: payload.holder,
      btc: payload.btcAmount,
      ts: payload.issuedAt,
    });

    const form = new FormData();
    form.append("fee_rate", String(await feeRate()));
    form.append("postage", "546");
    form.append("ordinal_receive_address", receiveAddress);
    form.append("return_address", receiveAddress);
    form.append("titles[]", serial);
    form.append(
      "inscriptions",
      new Blob([svg], { type: "image/svg+xml" }),
      `${serial}.svg`,
    );
    form.append(
      "metadata",
      new Blob([metadata], { type: "application/json" }),
      `${serial}.json`,
    );

    const upstream = await fetch(`${CHISEL}/api/inscribe`, {
      method: "POST",
      body: form,
    });
    const data = await upstream.json();
    if (!upstream.ok || !data?.id) {
      json(response, upstream.status || 502, {
        error: data.message || data.error || "inscription order failed",
        status: "error",
      });
      return;
    }
    json(response, 200, publicOrder(data));
  } catch (error) {
    json(response, 500, {
      error: error instanceof Error ? error.message : "inscription desk failed",
      status: "error",
    });
  }
}
