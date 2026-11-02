import type { CertificateRecord } from "@/lib/certificate";

export type NftStatus = "pending" | "inscribing" | "minted" | "error";

export type CertificateNft = {
  orderId?: string;
  receiveAddress: string;
  chargeAddress?: string;
  chargeSats?: number;
  status: NftStatus;
  rawStatus?: string;
  expiration?: number;
  inscriptionId?: string;
  orderUrl?: string;
  chain?: "bitcoin" | "solana" | "ethereum";
  edition?: number;
  max?: number;
  error?: string;
};

async function readNft(response: Response): Promise<CertificateNft> {
  const data = (await response.json()) as CertificateNft & { error?: string };
  if (!response.ok) {
    throw new Error(data.error || `Inscribe failed: ${response.status}`);
  }
  return data;
}

export async function createCertificateNft(
  record: CertificateRecord,
): Promise<CertificateNft> {
  const chain = record.nftChain || "bitcoin";
  if (chain !== "bitcoin") {
    const response = await fetch("/api/nft-mint", {
      method: "POST",
      headers: { "content-type": "application/json", accept: "application/json" },
      body: JSON.stringify({
        chain,
        serial: record.serial,
        receiveAddress: record.receiveAddress,
        edition: record.edition,
        max: record.editionMax,
      }),
    });
    return readNft(response);
  }
  const response = await fetch("/api/inscribe", {
    method: "POST",
    headers: { "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify({
      serial: record.serial,
      digest: record.digest,
      kind: record.kind,
      holder: record.holder,
      btcAmount: record.btcAmount,
      issuedAt: record.issuedAt,
      receiveAddress: record.receiveAddress,
      edition: record.edition,
      max: record.editionMax,
      sinDegree: record.sinDegree,
    }),
  });
  return readNft(response);
}

export async function fetchCertificateNft(
  orderId: string,
): Promise<CertificateNft> {
  const response = await fetch(
    `/api/inscribe?id=${encodeURIComponent(orderId)}`,
    { headers: { accept: "application/json" } },
  );
  return readNft(response);
}
