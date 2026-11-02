const PALETTES = [
  {
    parchment: "#f4e2c4",
    stain: "#e0b57a",
    ink: "#f6ead2",
    blood: "#c45c4a",
    gold: "#e4c36a",
    night: "#1a120c",
    moss: "#c9d4b0",
  },
  {
    parchment: "#dfe6ea",
    stain: "#b7c4d4",
    ink: "#e8eef6",
    blood: "#8a4a5c",
    gold: "#d7c48a",
    night: "#0e1624",
    moss: "#b7d4d0",
  },
  {
    parchment: "#f7ead0",
    stain: "#e4c48a",
    ink: "#f7ead4",
    blood: "#c45a3a",
    gold: "#f0c23a",
    night: "#1a1420",
    moss: "#d4e0c4",
  },
  {
    parchment: "#efe4d2",
    stain: "#c9b496",
    ink: "#f3e6d2",
    blood: "#a84848",
    gold: "#d4b05a",
    night: "#16120e",
    moss: "#d0d8c4",
  },
  {
    parchment: "#f3dceb",
    stain: "#d4a8c4",
    ink: "#f6e4ee",
    blood: "#b84a78",
    gold: "#e0c06a",
    night: "#1a1020",
    moss: "#d4e8e0",
  },
  {
    parchment: "#e4edd4",
    stain: "#b7c98a",
    ink: "#eef4dc",
    blood: "#8a4030",
    gold: "#d4b45a",
    night: "#10180c",
    moss: "#c8e0c0",
  },
];

const MOTTOS = [
  "Quidquid latet apparebit",
  "Memento mori · memento pecuniae",
  "Non omnis moriar",
  "Sic transit gloria mundi",
  "Pecunia non olet · anima olet",
  "Hodie mihi, cras tibi",
  "In umbra pecunia lucet",
  "Nihil sine aeternitate",
  "Aeternum venditur",
  "Post tenebras aurum",
  "Solus emptor animam tenet",
  "Vae vacuis · vae beatis",
];

const PLATE_FILES = ["plate-warm.jpg", "plate-moon.jpg", "plate-rose.jpg"];

export function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function hashSeed(text) {
  let h = 2166136261;
  const raw = String(text || "maison");
  for (let i = 0; i < raw.length; i += 1) {
    h ^= raw.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function sinLatin(degree) {
  if (degree === 1) return "VANITAS";
  if (degree === 2) return "AVARITIA";
  if (degree === 3) return "INVIDIA";
  if (degree === 4) return "SUPERBIA";
  if (degree === 5) return "DEGREE V";
  return "";
}

function kindCopy(kind, sinDegree) {
  if (kind === "sell") {
    return { desk: "SOUL DISPOSAL", act: "hath sold", prize: "ONE SOUL" };
  }
  if (kind === "sol") {
    return {
      desk: "MIDDLE DESK · COMMON · 0.5 SOL · 60%",
      act: "hath purchased",
      prize: "ONE SOUL",
    };
  }
  if (kind === "solRare") {
    return {
      desk: "MIDDLE DESK · RARE · 1 SOL · 24%",
      act: "hath purchased",
      prize: "ONE SOUL",
    };
  }
  if (kind === "solEpic") {
    return {
      desk: "MIDDLE DESK · EPIC · 2 SOL · 12%",
      act: "hath purchased",
      prize: "ONE SOUL",
    };
  }
  if (kind === "solLegendary") {
    return {
      desk: "MIDDLE DESK · LEGENDARY · 8 SOL · 4%",
      act: "hath purchased",
      prize: "ONE SOUL",
    };
  }
  if (kind === "pearl") {
    return { desk: "MIDDLE DESK · 650 PEARL", act: "hath purchased", prize: "ONE SOUL" };
  }
  if (kind === "eth") {
    return { desk: "PRIVATE DESK · 0.5 ETH", act: "hath purchased", prize: "ONE SOUL" };
  }
  if (kind === "ethOne") {
    return { desk: "PRIVATE DESK · 1 ETH", act: "hath purchased", prize: "ONE SOUL" };
  }
  if (kind === "ethTwo") {
    return {
      desk: "PRIVATE DESK · 2 ETH · THE LAST TWO",
      act: "hath purchased",
      prize: "ONE SOUL",
    };
  }
  if (kind === "cleanse") {
    const latin = sinLatin(sinDegree);
    return {
      desk: latin ? `CLEANSING DESK · ${latin}` : "CLEANSING DESK",
      act: "hath washed",
      prize: latin && sinDegree !== 5 ? latin : "ONE IGNOBLE SIN",
    };
  }
  if (kind === "fa") {
    return {
      desk: "发发发 · 888 · COMPLETE CLEANSING",
      act: "hath washed",
      prize: "发发发",
    };
  }
  if (kind === "lucky") {
    return {
      desk: "888 · THE DEAREST THREE · LUCK",
      act: "hath purchased",
      prize: "888",
    };
  }
  return { desk: "SOUL ACQUISITION", act: "hath purchased", prize: "ONE SOUL" };
}

export function nftChainOf(kind, nftChain) {
  if (nftChain === "solana" || nftChain === "ethereum" || nftChain === "bitcoin") {
    return nftChain;
  }
  if (kind === "eth" || kind === "ethOne" || kind === "ethTwo") return "ethereum";
  if (
    kind === "sol" ||
    kind === "solRare" ||
    kind === "solEpic" ||
    kind === "solLegendary" ||
    kind === "pearl" ||
    kind === "cleanse" ||
    kind === "fa"
  ) {
    return "solana";
  }
  return "bitcoin";
}

function chainLabel(chain, kind) {
  if (kind === "lucky") return "BITCOIN 888 NFT";
  if (kind === "ethTwo") return "ETHEREUM 2 ETH NFT";
  if (kind === "ethOne") return "ETHEREUM 1 ETH NFT";
  if (kind === "eth") return "ETHEREUM 0.5 ETH NFT";
  if (kind === "solLegendary") return "SOLANA NFT · LEGENDARY · 4%";
  if (kind === "solEpic") return "SOLANA NFT · EPIC · 12%";
  if (kind === "solRare") return "SOLANA NFT · RARE · 24%";
  if (kind === "sol") return "SOLANA NFT · COMMON · 60%";
  if (chain === "ethereum") return "ETHEREUM NFT";
  if (chain === "solana") return "SOLANA NFT";
  return "BITCOIN ORDINALS NFT";
}

function chainInk(chain) {
  if (chain === "ethereum") return "#a8b4ff";
  if (chain === "solana") return "#7dffc3";
  return "#f0b429";
}

function uniqueSigil(cx, cy, r, points, rand, gold) {
  const coords = Array.from({ length: points }, (_, i) => {
    const a = (i / points) * Math.PI * 2 - Math.PI / 2;
    const jitter = 0.72 + rand() * 0.4;
    return [cx + Math.cos(a) * r * jitter, cy + Math.sin(a) * r * jitter];
  });
  const d = coords
    .map((pt, i) => `${i === 0 ? "M" : "L"} ${pt[0].toFixed(1)} ${pt[1].toFixed(1)}`)
    .join(" ");
  return `<path d="${d} Z" fill="none" stroke="${gold}" stroke-width="1.7"/>`;
}

export function certificateTraits(payload) {
  const key = `${payload.digest || ""}|${payload.serial || ""}`;
  const seed = hashSeed(key);
  const rand = rng(seed);
  const palette = PALETTES[seed % PALETTES.length];
  return {
    seed,
    palette,
    motto: MOTTOS[seed % MOTTOS.length],
    plate: seed % PLATE_FILES.length,
    petals: 6 + Math.floor(rand() * 7),
    roseRot: rand() * 360,
    stars: 10 + Math.floor(rand() * 12),
    sigilPoints: 5 + Math.floor(rand() * 4),
    sealTurn: Math.floor(rand() * 36) * 10,
    hue: Math.floor(rand() * 18) - 9,
    veil: 0.28 + rand() * 0.16,
    blotX: 80 + rand() * 640,
    blotY: 180 + rand() * 700,
    blotR: 40 + rand() * 70,
  };
}

export function resolveCertificateAssets(traits, embedded) {
  const plateFile = PLATE_FILES[traits.plate];
  if (embedded) {
    return {
      plate: embedded[plateFile],
      wax: embedded["wax-seal.jpg"],
      rose: embedded["rose-window.jpg"],
      filigree: embedded["filigree.jpg"],
    };
  }
  return {
    plate: `/certificates/${plateFile}`,
    wax: "/certificates/wax-seal.jpg",
    rose: "/certificates/rose-window.jpg",
    filigree: "/certificates/filigree.jpg",
  };
}

export function certificateSvg(payload, options = {}) {
  const W = 800;
  const H = 1120;
  const serial = escapeXml(payload.serial || "");
  const digest = String(payload.digest || payload.serial || "0");
  const id = digest.replace(/[^0-9a-f]/gi, "").slice(0, 12) || "ae1666";
  const holderRaw = String(payload.holder || "Anonymous").slice(0, 42);
  const holder = escapeXml(holderRaw);
  const holderSize = holderRaw.length > 24 ? 32 : holderRaw.length > 16 ? 40 : 50;
  const paid = escapeXml(
    payload.sinDegree
      ? `${payload.btcAmount} · ${sinLatin(payload.sinDegree) || `DEGREE ${payload.sinDegree}`}`
      : payload.btcAmount || "",
  );
  const issued = escapeXml(String(payload.issuedAt || "").slice(0, 10));
  const mintedTo = escapeXml(String(payload.receiveAddress || "").slice(0, 52));
  const edition =
    payload.edition && (payload.max || payload.editionMax)
      ? `No. ${payload.edition} / ${payload.max || payload.editionMax}`
      : "";
  const copy = kindCopy(payload.kind, payload.sinDegree);
  const chain = nftChainOf(payload.kind, payload.nftChain);
  const traits = certificateTraits(payload);
  if (payload.kind === "lucky") {
    traits.motto = "888 · fortuna favet divitibus";
    traits.palette = PALETTES[2];
  }
  if (payload.kind === "ethTwo") {
    traits.motto = "duo extrema · ether carissimus";
    traits.palette = PALETTES[1];
  }
  if (payload.kind === "solLegendary") {
    traits.motto = "rara avis · octo solana";
    traits.palette = PALETTES[2];
  }
  if (payload.kind === "cleanse" && payload.sinDegree && payload.sinDegree <= 4) {
    traits.motto = `${sinLatin(payload.sinDegree).toLowerCase()} · peccatum venale`;
  }
  const { palette: c, seed } = traits;
  const rand = rng(seed ^ 0x9e3779b9);
  const assets = resolveCertificateAssets(traits, options.embedded);
  const chainGold = chainInk(chain);

  const stars = Array.from({ length: traits.stars }, () => {
    const x = 48 + rand() * (W - 96);
    const y = 48 + rand() * (H - 96);
    const r = 0.45 + rand() * 1.2;
    return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(2)}" fill="${c.gold}" opacity="${(0.2 + rand() * 0.5).toFixed(2)}"/>`;
  }).join("");

  const filigree = (x, y, rot) =>
    `<image href="${assets.filigree}" x="${x}" y="${y}" width="168" height="168" transform="rotate(${rot} ${x + 84} ${y + 84})" opacity="0.92" style="mix-blend-mode:screen"/>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <style>
      @import url("https://fonts.googleapis.com/css2?family=UnifrakturCook:wght@700&amp;family=Cinzel+Decorative:wght@700&amp;family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600&amp;family=Noto+Serif+SC:wght@600;700&amp;display=swap");
      .goth { font-family: UnifrakturCook, "Old English Text MT", "Cinzel Decorative", serif; }
      .cinzel { font-family: "Cinzel Decorative", Cinzel, "Noto Serif SC", "Times New Roman", serif; }
      .gar { font-family: "Cormorant Garamond", "Noto Serif SC", "Times New Roman", serif; }
    </style>
    <filter id="mood-${id}">
      <feColorMatrix type="hueRotate" values="${traits.hue}"/>
    </filter>
    <filter id="grain-${id}">
      <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" seed="${seed % 10000}" result="n"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0.16  0 0 0 0 0.1  0 0 0 0 0.04  0 0 0 0.14 0" in="n"/>
    </filter>
    <clipPath id="roseclip-${id}">
      <circle cx="${W / 2}" cy="148" r="78"/>
    </clipPath>
    <clipPath id="waxclip-${id}">
      <circle cx="0" cy="0" r="78"/>
    </clipPath>
    <path id="motto-${id}" d="M ${W / 2 - 92} 818 A 92 92 0 1 1 ${W / 2 + 92} 818 A 92 92 0 1 1 ${W / 2 - 92} 818"/>
    <radialGradient id="veil-${id}" cx="50%" cy="42%" r="62%">
      <stop offset="0%" stop-color="${c.night}" stop-opacity="${traits.veil.toFixed(2)}"/>
      <stop offset="100%" stop-color="${c.night}" stop-opacity="0.62"/>
    </radialGradient>
    <linearGradient id="cartouche-${id}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#1a100c" stop-opacity="0.22"/>
      <stop offset="50%" stop-color="#120c0a" stop-opacity="0.48"/>
      <stop offset="100%" stop-color="#1a100c" stop-opacity="0.28"/>
    </linearGradient>
  </defs>
  <title>Maison Æternum · ${serial}</title>
  <desc>${serial} · mystical gothic soul NFT on ${chain} · ${digest.slice(0, 16)}</desc>
  <image href="${assets.plate}" x="0" y="0" width="${W}" height="${H}" preserveAspectRatio="xMidYMid slice" filter="url(#mood-${id})"/>
  <rect width="${W}" height="${H}" fill="url(#veil-${id})"/>
  <rect width="${W}" height="${H}" filter="url(#grain-${id})" opacity="0.28"/>
  ${stars}
  <rect x="16" y="16" width="${W - 32}" height="${H - 32}" fill="none" stroke="${c.blood}" stroke-width="4"/>
  <rect x="26" y="26" width="${W - 52}" height="${H - 52}" fill="none" stroke="${c.gold}" stroke-width="1.6"/>
  <rect x="34" y="34" width="${W - 68}" height="${H - 68}" fill="none" stroke="${chainGold}" stroke-width="0.7" opacity="0.85"/>
  ${filigree(18, 18, 0)}
  ${filigree(W - 186, 18, 90)}
  ${filigree(18, H - 186, -90)}
  ${filigree(W - 186, H - 186, 180)}
  <g clip-path="url(#roseclip-${id})">
    <image href="${assets.rose}" x="${W / 2 - 80}" y="68" width="160" height="160" transform="rotate(${traits.roseRot.toFixed(1)} ${W / 2} 148)"/>
  </g>
  <circle cx="${W / 2}" cy="148" r="80" fill="none" stroke="${c.gold}" stroke-width="2.2"/>
  <circle cx="${W / 2}" cy="148" r="72" fill="none" stroke="${c.blood}" stroke-width="0.8" opacity="0.8"/>
  <rect x="88" y="236" width="624" height="392" fill="url(#cartouche-${id})" stroke="${c.gold}" stroke-width="1" opacity="0.95"/>
  <path d="M 110 248 H 690" stroke="${c.gold}" stroke-width="0.6" opacity="0.55"/>
  <path d="M 110 616 H 690" stroke="${c.gold}" stroke-width="0.6" opacity="0.55"/>
  <text x="${W / 2}" y="278" text-anchor="middle" fill="${c.gold}" font-size="42" class="goth">Maison Æternum</text>
  <text x="${W / 2}" y="306" text-anchor="middle" fill="${chainGold}" font-size="12" letter-spacing="5" class="cinzel">${escapeXml(copy.desk)}</text>
  <text x="${W / 2}" y="338" text-anchor="middle" fill="${c.ink}" font-size="14" letter-spacing="4" class="cinzel">This is to certify that</text>
  <text x="${W / 2}" y="392" text-anchor="middle" fill="${c.gold}" font-size="${holderSize}" class="gar" font-style="italic">${holder}</text>
  <text x="${W / 2}" y="430" text-anchor="middle" fill="${c.ink}" font-size="17" class="gar">${escapeXml(copy.act)}</text>
  <text x="${W / 2}" y="492" text-anchor="middle" fill="${c.gold}" font-size="54" class="goth">${escapeXml(copy.prize)}</text>
  <text x="${W / 2}" y="536" text-anchor="middle" fill="${c.moss}" font-size="20" class="gar">${paid} · ${issued}</text>
  <text x="${W / 2}" y="568" text-anchor="middle" fill="${c.ink}" font-size="15" font-style="italic" class="gar">${escapeXml(traits.motto)}</text>
  <text x="${W / 2}" y="598" text-anchor="middle" fill="${chainGold}" font-size="13" letter-spacing="4" class="cinzel">${escapeXml(chainLabel(chain, payload.kind))}</text>
  <rect x="150" y="648" width="500" height="76" fill="#120c0a" fill-opacity="0.45" stroke="${c.blood}" stroke-width="1"/>
  <text x="${W / 2}" y="676" text-anchor="middle" fill="${c.blood}" font-size="11" letter-spacing="5" class="cinzel">UNIQUE CODE</text>
  <text x="${W / 2}" y="706" text-anchor="middle" fill="${c.gold}" font-size="17" font-family="Courier New,monospace">${serial}</text>
  <g transform="translate(${W / 2} 820) rotate(${traits.sealTurn})">
    <g clip-path="url(#waxclip-${id})">
      <image href="${assets.wax}" x="-80" y="-80" width="160" height="160" style="mix-blend-mode:screen"/>
    </g>
    <circle r="78" fill="none" stroke="${c.gold}" stroke-width="2"/>
    ${uniqueSigil(0, 0, 22, traits.sigilPoints, rand, c.gold)}
  </g>
  <text x="${W / 2}" y="826" text-anchor="middle" fill="${c.gold}" font-size="13" class="cinzel">${edition || "AE"}</text>
  <text>
    <textPath href="#motto-${id}" startOffset="50%" text-anchor="middle" fill="${c.gold}" font-size="11" letter-spacing="3" class="cinzel">${escapeXml(traits.motto)}</textPath>
  </text>
  <text x="${W / 2}" y="948" text-anchor="middle" fill="${chainGold}" font-size="14" letter-spacing="3" class="cinzel">NFT ON ${escapeXml(chain.toUpperCase())} · MINTED TO THE BUYER</text>
  <text x="${W / 2}" y="976" text-anchor="middle" fill="${c.ink}" font-size="11" font-family="Courier New,monospace">${mintedTo}</text>
  <text x="${W / 2}" y="1028" text-anchor="middle" fill="${c.gold}" font-size="12" class="gar">Geneva · Est. 1666 · VAT is not charged</text>
  <text x="${W / 2}" y="1054" text-anchor="middle" fill="${c.blood}" font-size="10" font-family="Courier New,monospace">${escapeXml(digest.slice(0, 32))}</text>
</svg>`;
}
