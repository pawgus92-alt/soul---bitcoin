import {
  BTC_ADDRESS,
  ETH_ADDRESS,
  SERIAL_TAG,
  SOL_ADDRESS,
  type DealKind,
  type NftChain,
} from "@/lib/deal";

export const CERTIFICATE_SERIAL_RE =
  /^AE-1666-(BUY|SELL|SOL|PRL|ETH|CLN)-[0-9A-F]{12}$/;

export type CertificateRecord = {
  serial: string;
  digest: string;
  kind: DealKind;
  holder: string;
  btcAmount: string;
  issuedAt: string;
  receiveAddress: string;
  nftChain: NftChain;
  edition?: number;
  editionMax?: number;
  sinDegree?: number;
  txid?: string;
  explorerUrl?: string;
};

const BECH32 = /^(bc1)[qpzry9x8gf2tvdw0s3jn54khce6mua7l]{25,87}$/i;
const BASE58 = /^[13][1-9A-HJ-NP-Za-km-z]{25,34}$/;
const SOLANA_RE = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;
const ETH_RE = /^0x[0-9a-fA-F]{40}$/;

export function isBitcoinAddress(value: string): boolean {
  const address = value.trim();
  return BECH32.test(address) || BASE58.test(address);
}

export function isSolanaAddress(value: string): boolean {
  const address = value.trim();
  return SOLANA_RE.test(address);
}

export function isEthereumAddress(value: string): boolean {
  return ETH_RE.test(value.trim());
}

export function isReceiveAddress(chain: NftChain, value: string): boolean {
  if (chain === "solana") return isSolanaAddress(value);
  if (chain === "ethereum") return isEthereumAddress(value);
  return isBitcoinAddress(value);
}

export function resolveReceiveAddress(
  value: string,
  chain: NftChain = "bitcoin",
): string {
  const address = value.trim();
  if (address) return address;
  if (chain === "solana") return SOL_ADDRESS;
  if (chain === "ethereum") return ETH_ADDRESS;
  return BTC_ADDRESS;
}

function bytesToHex(bytes: Uint8Array) {
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join(
    "",
  );
}

export async function issueCertificate(input: {
  kind: DealKind;
  holder: string;
  btcAmount: string;
  receiveAddress: string;
  nftChain: NftChain;
  edition?: number;
  editionMax?: number;
  sinDegree?: number;
  txid?: string;
  explorerUrl?: string;
}): Promise<CertificateRecord> {
  const entropy = crypto.getRandomValues(new Uint8Array(16));
  const issuedAt = new Date().toISOString();
  const holder = input.holder.trim();
  const material = new TextEncoder().encode(
    [
      "maison-aeternum",
      input.kind,
      holder.toLowerCase(),
      input.btcAmount,
      input.sinDegree ? `degree-${input.sinDegree}` : "",
      issuedAt,
      bytesToHex(entropy),
    ].join("|"),
  );
  const digest = bytesToHex(
    new Uint8Array(await crypto.subtle.digest("SHA-256", material)),
  );
  const serial = `AE-1666-${SERIAL_TAG[input.kind]}-${digest.slice(0, 12).toUpperCase()}`;
  if (!CERTIFICATE_SERIAL_RE.test(serial)) {
    throw new Error("certificate serial failed its own grammar");
  }

  return {
    serial,
    digest,
    kind: input.kind,
    holder,
    btcAmount: input.btcAmount,
    issuedAt,
    receiveAddress: input.receiveAddress,
    nftChain: input.nftChain,
    edition: input.edition,
    editionMax: input.editionMax,
    sinDegree: input.sinDegree,
    txid: input.txid,
    explorerUrl: input.explorerUrl,
  };
}

export function inscriptionExplorerUrl(inscriptionId: string) {
  return `https://ordinals.com/inscription/${encodeURIComponent(inscriptionId)}`;
}

export function chiselOrderUrl(orderId: string) {
  return `https://chisel.xyz/order/${encodeURIComponent(orderId)}`;
}

export function satsToBtc(sats: number) {
  return sats / 1e8;
}
