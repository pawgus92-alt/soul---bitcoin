const PALETTES = [
  {
    parchment: "#f4e2c4",
    stain: "#e0b57a",
    ink: "#1a100c",
    blood: "#7a1018",
    gold: "#d4a84a",
    night: "#1a2238",
    moss: "#2a4a3c",
  },
  {
    parchment: "#dfe6ea",
    stain: "#b7c4d4",
    ink: "#12141c",
    blood: "#3a1a28",
    gold: "#c5b48a",
    night: "#0e1a2e",
    moss: "#1e3d3a",
  },
  {
    parchment: "#f7ead0",
    stain: "#e4c48a",
    ink: "#24160c",
    blood: "#7a1f2b",
    gold: "#e0b22a",
    night: "#1e3a6e",
    moss: "#1f6b4a",
  },
  {
    parchment: "#efe4d2",
    stain: "#c9b496",
    ink: "#1c1410",
    blood: "#4a1518",
    gold: "#b08a3a",
    night: "#2a3040",
    moss: "#3a4a38",
  },
  {
    parchment: "#f3dceb",
    stain: "#d4a8c4",
    ink: "#1a1020",
    blood: "#6a1848",
    gold: "#d4b05a",
    night: "#2a1848",
    moss: "#204040",
  },
  {
    parchment: "#e4edd4",
    stain: "#b7c98a",
    ink: "#14180c",
    blood: "#5a2018",
    gold: "#c2a050",
    night: "#102820",
    moss: "#1a4a30",
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

function kindCopy(kind, sinDegree) {
  if (kind === "sell") {
    return { desk: "SOUL DISPOSAL", act: "hath sold", prize: "ONE SOUL" };
  }
  if (kind === "sol") {
    return { desk: "MIDDLE DESK · 10 SOL", act: "hath purchased", prize: "ONE SOUL" };
  }
  if (kind === "pearl") {
    return { desk: "MIDDLE DESK · 650 PEARL", act: "hath purchased", prize: "ONE SOUL" };
  }
  if (kind === "eth") {
    return { desk: "PRIVATE DESK · ETHEREUM", act: "hath purchased", prize: "ONE SOUL" };
  }
  if (kind === "cleanse") {
    return {
      desk: sinDegree ? `CLEANSING DESK · DEGREE ${sinDegree}` : "CLEANSING DESK",
      act: "hath washed",
      prize: "ONE IGNOBLE SIN",
    };
  }
  if (kind === "fa") {
    return {
      desk: "发发发 · 888 · COMPLETE CLEANSING",
      act: "hath washed",
      prize: "发发发",
    };
  }
  return { desk: "SOUL ACQUISITION", act: "hath purchased", prize: "ONE SOUL" };
}

function chainLabel(kind) {
  if (kind === "eth") return "ETHEREUM INNER NFT";
  if (kind === "sol" || kind === "pearl" || kind === "cleanse" || kind === "fa") {
    return "SOLANA NFT";
  }
  return "BITCOIN ORDINALS NFT";
}

function flourish(x, y, scale, rot, gold, blood) {
  return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${scale})">
    <path d="M0 0 C 10 -26 36 -34 54 -14 C 40 -10 22 8 6 20 C 18 2 34 -12 50 -8" fill="none" stroke="${gold}" stroke-width="1.5"/>
    <path d="M0 0 C 12 16 30 32 52 26" fill="none" stroke="${blood}" stroke-width="1.15"/>
    <circle cx="54" cy="-14" r="2.3" fill="${gold}"/>
    <path d="M18 -18 C 22 -28 30 -28 34 -20" fill="none" stroke="${gold}" stroke-width="1"/>
  </g>`;
}

function roseWindow(cx, cy, r, petals, rot, gold, blood, night) {
  const petalsXml = Array.from({ length: petals }, (_, i) => {
    const a = rot + (i / petals) * Math.PI * 2;
    const x = cx + Math.cos(a) * r * 0.62;
    const y = cy + Math.sin(a) * r * 0.62;
    return `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="${(r * 0.22).toFixed(1)}" ry="${(r * 0.34).toFixed(1)}" transform="rotate(${((a * 180) / Math.PI).toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)})" fill="${night}" fill-opacity="0.22" stroke="${gold}" stroke-width="0.9"/>`;
  }).join("");
  return `<g>
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="${night}" fill-opacity="0.18" stroke="${gold}" stroke-width="1.8"/>
    <circle cx="${cx}" cy="${cy}" r="${r * 0.78}" fill="none" stroke="${blood}" stroke-width="0.9"/>
    ${petalsXml}
    <circle cx="${cx}" cy="${cy}" r="${r * 0.16}" fill="${blood}" stroke="${gold}" stroke-width="1.2"/>
  </g>`;
}

function uniqueSigil(cx, cy, r, points, rand, gold, blood) {
  const coords = Array.from({ length: points }, (_, i) => {
    const a = (i / points) * Math.PI * 2 - Math.PI / 2;
    const jitter = 0.72 + rand() * 0.4;
    return [cx + Math.cos(a) * r * jitter, cy + Math.sin(a) * r * jitter];
  });
  const d = coords
    .map((pt, i) => `${i === 0 ? "M" : "L"} ${pt[0].toFixed(1)} ${pt[1].toFixed(1)}`)
    .join(" ");
  return `<path d="${d} Z" fill="${blood}" fill-opacity="0.92" stroke="${gold}" stroke-width="1.6"/>`;
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
    petals: 6 + Math.floor(rand() * 7),
    roseRot: rand() * Math.PI,
    stars: 14 + Math.floor(rand() * 16),
    vine: 5 + Math.floor(rand() * 6),
    sigilPoints: 5 + Math.floor(rand() * 4),
    sealTurn: Math.floor(rand() * 36) * 10,
    blotX: 80 + rand() * 640,
    blotY: 180 + rand() * 700,
    blotR: 40 + rand() * 70,
  };
}

export function certificateSvg(payload) {
  const W = 800;
  const H = 1120;
  const serial = escapeXml(payload.serial || "");
  const digest = String(payload.digest || payload.serial || "0");
  const id = digest.replace(/[^0-9a-f]/gi, "").slice(0, 12) || "ae1666";
  const holderRaw = String(payload.holder || "Anonymous").slice(0, 42);
  const holder = escapeXml(holderRaw);
  const holderSize = holderRaw.length > 24 ? 34 : holderRaw.length > 16 ? 42 : 52;
  const paid = escapeXml(
    payload.sinDegree
      ? `${payload.btcAmount} · DEGREE ${payload.sinDegree}`
      : payload.btcAmount || "",
  );
  const issued = escapeXml(String(payload.issuedAt || "").slice(0, 10));
  const mintedTo = escapeXml(String(payload.receiveAddress || "").slice(0, 52));
  const edition =
    payload.edition && (payload.max || payload.editionMax)
      ? `No. ${payload.edition} / ${payload.max || payload.editionMax}`
      : "";
  const copy = kindCopy(payload.kind, payload.sinDegree);
  const traits = certificateTraits(payload);
  const { palette: c, seed } = traits;
  const rand = rng(seed ^ 0x9e3779b9);

  const stars = Array.from({ length: traits.stars }, () => {
    const x = 36 + rand() * (W - 72);
    const y = 36 + rand() * (H - 72);
    const r = 0.5 + rand() * 1.35;
    return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(2)}" fill="${c.gold}" opacity="${(0.25 + rand() * 0.55).toFixed(2)}"/>`;
  }).join("");

  const vines = Array.from({ length: traits.vine }, (_, i) => {
    const left = i % 2 === 0;
    const x0 = left ? 28 : W - 28;
    const y0 = 160 + i * 70 + rand() * 24;
    const x1 = left ? 54 + rand() * 18 : W - 54 - rand() * 18;
    const y1 = y0 + 36 + rand() * 28;
    return `<path d="M ${x0} ${y0.toFixed(1)} Q ${x1.toFixed(1)} ${(y0 + 12).toFixed(1)} ${x0} ${y1.toFixed(1)}" fill="none" stroke="${c.gold}" stroke-width="1.05" opacity="0.85"/>`;
  }).join("");

  const ticks = Array.from({ length: 18 }, (_, i) => {
    const y = 250 + i * 36;
    const len = 8 + (hashSeed(digest + i) % 10);
    return `<path d="M 70 ${y} h ${len}" stroke="${c.blood}" stroke-width="0.7" opacity="0.45"/><path d="M ${W - 70} ${y} h -${len}" stroke="${c.blood}" stroke-width="0.7" opacity="0.45"/>`;
  }).join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <style>
      @import url("https://fonts.googleapis.com/css2?family=UnifrakturCook:wght@700&amp;family=Cinzel+Decorative:wght@700&amp;family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600&amp;family=Noto+Serif+SC:wght@600;700&amp;display=swap");
      .goth { font-family: UnifrakturCook, "Old English Text MT", "Cinzel Decorative", serif; }
      .cinzel { font-family: "Cinzel Decorative", Cinzel, "Noto Serif SC", "Times New Roman", serif; }
      .gar { font-family: "Cormorant Garamond", "Noto Serif SC", "Times New Roman", serif; }
    </style>
    <radialGradient id="page-${id}" cx="50%" cy="38%" r="72%">
      <stop offset="0%" stop-color="${c.parchment}"/>
      <stop offset="70%" stop-color="${c.stain}"/>
      <stop offset="100%" stop-color="${c.stain}"/>
    </radialGradient>
    <filter id="grain-${id}">
      <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" seed="${seed % 10000}" result="n"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0.18  0 0 0 0 0.12  0 0 0 0 0.06  0 0 0 0.16 0" in="n"/>
    </filter>
  </defs>
  <title>Maison Æternum · ${serial}</title>
  <desc>${serial} · unique gothic soul certificate · ${digest.slice(0, 16)}</desc>
  <rect width="${W}" height="${H}" fill="url(#page-${id})"/>
  <rect width="${W}" height="${H}" filter="url(#grain-${id})" opacity="0.55"/>
  <circle cx="${traits.blotX.toFixed(1)}" cy="${traits.blotY.toFixed(1)}" r="${traits.blotR.toFixed(1)}" fill="${c.blood}" opacity="0.06"/>
  ${stars}
  <rect x="18" y="18" width="${W - 36}" height="${H - 36}" fill="none" stroke="${c.blood}" stroke-width="5"/>
  <rect x="28" y="28" width="${W - 56}" height="${H - 56}" fill="none" stroke="${c.gold}" stroke-width="2.2"/>
  <rect x="36" y="36" width="${W - 72}" height="${H - 72}" fill="none" stroke="${c.night}" stroke-width="1"/>
  <path d="M 90 86 Q ${W / 2} 28 ${W - 90} 86" fill="none" stroke="${c.gold}" stroke-width="1.6"/>
  <path d="M 90 ${H - 86} Q ${W / 2} ${H - 28} ${W - 90} ${H - 86}" fill="none" stroke="${c.gold}" stroke-width="1.6"/>
  ${flourish(70, 78, 1.35, 0, c.gold, c.blood)}
  ${flourish(W - 70, 78, 1.35, 90, c.gold, c.blood)}
  ${flourish(70, H - 78, 1.35, -90, c.gold, c.blood)}
  ${flourish(W - 70, H - 78, 1.35, 180, c.gold, c.blood)}
  ${vines}
  ${ticks}
  ${roseWindow(W / 2, 148, 68, traits.petals, traits.roseRot, c.gold, c.blood, c.night)}
  <text x="${W / 2}" y="230" text-anchor="middle" fill="${c.blood}" font-size="44" class="goth">Maison Æternum</text>
  <text x="${W / 2}" y="262" text-anchor="middle" fill="${c.night}" font-size="13" letter-spacing="6" class="cinzel">${escapeXml(copy.desk)}</text>
  <text x="${W / 2}" y="318" text-anchor="middle" fill="${c.ink}" font-size="15" letter-spacing="4" class="cinzel">This is to certify that</text>
  <text x="${W / 2}" y="382" text-anchor="middle" fill="${c.blood}" font-size="${holderSize}" class="gar" font-style="italic">${holder}</text>
  <text x="${W / 2}" y="424" text-anchor="middle" fill="${c.ink}" font-size="18" class="gar">${escapeXml(copy.act)}</text>
  <text x="${W / 2}" y="498" text-anchor="middle" fill="${c.gold}" font-size="58" class="goth">${escapeXml(copy.prize)}</text>
  <text x="${W / 2}" y="548" text-anchor="middle" fill="${c.moss}" font-size="22" class="gar">${paid} · ${issued}</text>
  <text x="${W / 2}" y="596" text-anchor="middle" fill="${c.night}" font-size="16" font-style="italic" class="gar">${escapeXml(traits.motto)}</text>
  <rect x="150" y="630" width="500" height="72" fill="${c.parchment}" fill-opacity="0.35" stroke="${c.blood}" stroke-width="1"/>
  <text x="${W / 2}" y="658" text-anchor="middle" fill="${c.blood}" font-size="11" letter-spacing="5" class="cinzel">UNIQUE CODE</text>
  <text x="${W / 2}" y="686" text-anchor="middle" fill="${c.ink}" font-size="18" font-family="Courier New,monospace">${serial}</text>
  <g transform="translate(${W / 2} 820) rotate(${traits.sealTurn})">
    <circle r="74" fill="${c.blood}"/>
    <circle r="66" fill="none" stroke="${c.gold}" stroke-width="3"/>
    <circle r="58" fill="none" stroke="${c.gold}" stroke-width="1"/>
    ${uniqueSigil(0, 0, 26, traits.sigilPoints, rand, c.gold, c.gold)}
  </g>
  <text x="${W / 2}" y="826" text-anchor="middle" fill="${c.blood}" font-size="14" class="cinzel">${edition || "AE"}</text>
  <text x="${W / 2}" y="930" text-anchor="middle" fill="${c.night}" font-size="13" letter-spacing="3" class="cinzel">${escapeXml(chainLabel(payload.kind))}</text>
  <text x="${W / 2}" y="958" text-anchor="middle" fill="${c.ink}" font-size="12" class="gar">Minted to the buyer, never the desk</text>
  <text x="${W / 2}" y="986" text-anchor="middle" fill="${c.ink}" font-size="11" font-family="Courier New,monospace">${mintedTo}</text>
  <text x="${W / 2}" y="1034" text-anchor="middle" fill="${c.night}" font-size="12" class="gar">Geneva · Est. 1666 · VAT is not charged</text>
  <text x="${W / 2}" y="1060" text-anchor="middle" fill="${c.blood}" font-size="10" font-family="Courier New,monospace">${escapeXml(digest.slice(0, 32))}</text>
</svg>`;
}
