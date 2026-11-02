import { CERTIFICATE_PLATES } from "./certificate-plates-data.js";
import { certificateSvg } from "../src/lib/gothic-certificate.js";

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
    const desk = "bc1q5v3rtce5zrwuw4vvk7v705v5qdrgqj2xuxgsnj";
    if (!receiveAddress || !serial) {
      json(response, 400, {
        error: "receiveAddress and serial are required",
        status: "error",
      });
      return;
    }
    if (receiveAddress.toLowerCase() === desk.toLowerCase()) {
      json(response, 400, {
        error: "NFT is minted to the buyer, not the desk",
        status: "error",
      });
      return;
    }

    const svg = certificateSvg(
      { ...payload, nftChain: "bitcoin" },
      { embedded: CERTIFICATE_PLATES },
    );
    const metadata = JSON.stringify({
      p: "maison-aeternum",
      op: "soul-cert",
      kind: payload.kind,
      code: serial,
      digest: payload.digest,
      holder: payload.holder,
      btc: payload.btcAmount,
      dest: receiveAddress,
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
