import { certificateSvg } from "../src/lib/gothic-certificate.js";
import { embeddedPlates } from "./load-plates.js";

const EMBEDDED_PLATES = embeddedPlates();

function json(response, status, body) {
  response.statusCode = status;
  response.setHeader("content-type", "application/json");
  response.setHeader("cache-control", "no-store");
  response.end(JSON.stringify(body));
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

export default async function handler(request, response) {
  try {
    if (request.method !== "POST") {
      json(response, 405, { error: "method not allowed", status: "error" });
      return;
    }
    const payload = await readBody(request);
    const chain = payload.chain === "ethereum" ? "ethereum" : "solana";
    const serial = String(payload.serial || "").trim();
    const receiveAddress = String(payload.receiveAddress || "").trim();
    const edition = Number(payload.edition) || 0;
    const max = Number(payload.max) || 0;
    const desk =
      chain === "ethereum"
        ? "0xfe2e3f7cab6a90e9e5b83209ece0bc12a65ff4d3"
        : "Ddvf1hnVW8Er8udrmgnQTu691acmyiJuxQgvhiAKu5jX";
    const toDesk =
      chain === "solana"
        ? receiveAddress === desk
        : receiveAddress.toLowerCase() === desk.toLowerCase();
    if (!serial || !receiveAddress || edition < 1) {
      json(response, 400, {
        error: "serial, receiveAddress and edition are required",
        status: "error",
      });
      return;
    }
    if (toDesk) {
      json(response, 400, {
        error: "NFT is minted to the buyer, not the desk",
        status: "error",
      });
      return;
    }
    const tokenId =
      chain === "ethereum"
        ? `eth-inner-${edition}-${serial}`
        : `sol-nft-${edition}-${serial}`;
    const svg = certificateSvg(
      {
        ...payload,
        nftChain: chain,
        receiveAddress,
        serial,
        edition,
        max: max || payload.editionMax,
        revealEncounter: true,
      },
      { embedded: EMBEDDED_PLATES },
    );
    const solRarity = {
      sol: { rarity: "COMMON", encounter: "60%", pool: "30 of 50" },
      solRare: { rarity: "RARE", encounter: "24%", pool: "12 of 50" },
      solEpic: { rarity: "EPIC", encounter: "12%", pool: "6 of 50" },
      solLegendary: { rarity: "LEGENDARY", encounter: "4%", pool: "2 of 50" },
    }[payload.kind];
    const sinLatin = {
      1: "SUPERBIA",
      2: "AVARITIA",
      3: "LUXURIA",
      4: "INVIDIA",
      5: "GULA",
      6: "IRA",
      7: "ACEDIA",
      8: "THE DEAREST LAPTOP",
    }[Number(payload.sinDegree)];
    const attributes = [
      { trait_type: "chain", value: chain },
      { trait_type: "desk", value: payload.kind || chain },
      { trait_type: "serial", value: serial },
      { trait_type: "edition", value: `${edition} / ${max || "?"}` },
    ];
    if (solRarity) {
      attributes.push(
        { trait_type: "rarity", value: solRarity.rarity },
        { trait_type: "encounter", value: solRarity.encounter },
        { trait_type: "pool", value: solRarity.pool },
      );
    }
    if (sinLatin) {
      attributes.push({ trait_type: "sin", value: sinLatin });
    }
    json(response, 200, {
      orderId: tokenId,
      receiveAddress,
      status: "minted",
      inscriptionId: tokenId,
      orderUrl:
        chain === "ethereum"
          ? `https://etherscan.io/address/${receiveAddress}`
          : `https://solscan.io/account/${receiveAddress}`,
      chain,
      edition,
      max,
      metadata: {
        name: `Maison Æternum · ${serial}`,
        symbol: "AE1666",
        description: solRarity
          ? `Unique gothic soul certificate. ${solRarity.rarity} · encounter ${solRarity.encounter} · ${solRarity.pool}. Minted to the buyer, never the desk.`
          : "Unique gothic soul certificate. The NFT lives on the chain of purchase and is minted to the buyer, never the desk.",
        bytes: Buffer.byteLength(svg, "utf8"),
        attributes,
      },
    });
  } catch (error) {
    json(response, 500, {
      error: error instanceof Error ? error.message : "nft mint failed",
      status: "error",
    });
  }
}
