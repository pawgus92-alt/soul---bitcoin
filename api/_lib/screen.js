const BLOCKED = new Set([
  "sanctions",
  "ofac",
  "eu_sanctions",
  "un_sanctions",
  "darknet_market",
  "mixer",
  "stolen_funds",
  "ransomware",
  "hack",
  "scam",
  "fraud",
  "child_exploitation",
]);

const LOCAL_DENYLIST = {
  "0x8589427373d6d84e98730d7795d8f6f8731fda16": "mixer",
  "0x722122df12d4e14e13ac3b6895a86e84145b6967": "mixer",
  "0xdd4c48c0b24039969fc16d1cdf626eab821d3384": "mixer",
  "0xd90e2f925da726b50c4ed8d0fb90ad053324f31b": "mixer",
  "0xd82edc6c16b8d6601e5093a20267882e98fc08af": "sanctions",
  "0x7ff9ceac6a60e587cc22a7a7ee1bae5becdd64d0": "sanctions",
  "0x1da5821544e25c636c141ce4125be97f4a1767da": "darknet_market",
  "bc1qa5wkgaew2dkvjrkqqjx79hvsdfvpk0edk76r4p": "sanctions",
};

function normalize(address) {
  return String(address || "").trim().toLowerCase();
}

function trmKey() {
  return process.env.TRM_API_KEY || process.env.TRM_LABS_API_KEY || "";
}

function riskFromCategories(categories) {
  if (categories.some((item) => item.includes("sanction") || item === "ofac")) {
    return "sanctioned";
  }
  if (categories.length > 0) return "high-risk";
  return "low-risk";
}

async function screenWithTrm(address, chain, signal) {
  const key = trmKey();
  if (!key) {
    throw new Error("COMPLIANCE_UNAVAILABLE");
  }
  const response = await fetch("https://api.trmlabs.com/public/v2/screening/addresses", {
    method: "POST",
    signal,
    headers: {
      "content-type": "application/json",
      authorization: `Basic ${Buffer.from(`${key}:`).toString("base64")}`,
    },
    body: JSON.stringify([{ address, chain }]),
  });
  if (!response.ok) {
    throw new Error("COMPLIANCE_UNAVAILABLE");
  }
  const payload = await response.json();
  if (!Array.isArray(payload)) {
    throw new Error("COMPLIANCE_UNAVAILABLE");
  }
  const found = [];
  for (const row of payload) {
    for (const indicator of row.addressRiskIndicators || []) {
      const category = String(indicator.category || "")
        .toLowerCase()
        .replace(/[\s-]+/g, "_");
      if (BLOCKED.has(category)) found.push(category);
    }
  }
  return found;
}

export async function screenAddress({ address, chain }) {
  const normalized = normalize(address);
  const local = LOCAL_DENYLIST[normalized];
  if (local) {
    const risk = local === "sanctions" || local === "ofac" ? "sanctioned" : "high-risk";
    return {
      address: normalized,
      chain,
      risk,
      allowed: false,
      categories: [local],
      provider: "local",
    };
  }

  const provider = String(process.env.COMPLIANCE_PROVIDER || "trm").toLowerCase();
  if (provider === "local") {
    return {
      address: normalized,
      chain,
      risk: "low-risk",
      allowed: true,
      categories: [],
      provider: "local",
    };
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 10_000);
  try {
    const categories = await screenWithTrm(normalized, chain, controller.signal);
    const risk = riskFromCategories(categories);
    return {
      address: normalized,
      chain,
      risk,
      allowed: risk === "low-risk",
      categories,
      provider: "trm",
    };
  } catch {
    const error = new Error("COMPLIANCE_UNAVAILABLE");
    error.code = "COMPLIANCE_UNAVAILABLE";
    throw error;
  } finally {
    clearTimeout(timer);
  }
}

export function isAddressShape(address, chain) {
  const value = String(address || "").trim();
  if (chain === "ethereum") return /^0x[a-fA-F0-9]{40}$/.test(value);
  if (chain === "solana") return /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(value);
  if (chain === "bitcoin") return /^[13bc][a-zA-HJ-NP-Z0-9]{25,62}$/.test(value);
  return false;
}
