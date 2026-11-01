import { BTC_ADDRESS, type DealKind } from "@/lib/deal";

export const CERTIFICATE_SERIAL_RE = /^AE-1666-(BUY|SELL)-[0-9A-F]{12}$/;

export type CertificateRecord = {
  serial: string;
  digest: string;
  kind: DealKind;
  holder: string;
  btcAmount: string;
  issuedAt: string;
  receiveAddress: string;
};

const BECH32 = /^(bc1)[qpzry9x8gf2tvdw0s3jn54khce6mua7l]{25,87}$/i;
const BASE58 = /^[13][1-9A-HJ-NP-Za-km-z]{25,34}$/;

export function isBitcoinAddress(value: string): boolean {
  const address = value.trim();
  return BECH32.test(address) || BASE58.test(address);
}

export function resolveReceiveAddress(value: string): string {
  const address = value.trim();
  return address || BTC_ADDRESS;
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
      issuedAt,
      bytesToHex(entropy),
    ].join("|"),
  );
  const digest = bytesToHex(
    new Uint8Array(await crypto.subtle.digest("SHA-256", material)),
  );
  const serial = `AE-1666-${input.kind.toUpperCase()}-${digest.slice(0, 12).toUpperCase()}`;
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
