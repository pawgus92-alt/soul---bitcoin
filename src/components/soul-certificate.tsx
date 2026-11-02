import { certificateSvg } from "@/lib/gothic-certificate.js";
import type { CertificateNft } from "@/lib/ordinals";
import {
  chiselOrderUrl,
  inscriptionExplorerUrl,
} from "@/lib/certificate";
import type { DealKind, NftChain } from "@/lib/deal";
import { useI18n } from "@/lib/i18n";

function nftLabel(
  copy: ReturnType<typeof useI18n>["copy"],
  nft?: CertificateNft,
  chain: NftChain = "bitcoin",
) {
  if (!nft) return copy.certNftPending(chain);
  if (nft.inscriptionId) return copy.certNftMinted(chain);
  if (nft.status === "inscribing") return copy.certNftInscribing(chain);
  if (nft.status === "error") return copy.certNftFailed;
  if (chain !== "bitcoin" && nft.status === "minted") return copy.certNftMinted(chain);
  return copy.certNftPending(chain);
}

function nftExplorerUrl(nft: CertificateNft, chain: NftChain) {
  if (nft.orderUrl) return nft.orderUrl;
  if (chain === "bitcoin" && nft.inscriptionId) {
    return inscriptionExplorerUrl(nft.inscriptionId);
  }
  return "";
}

export function SoulCertificate({
  holder,
  serial,
  digest,
  btcAmount,
  issuedAt,
  kind = "buy",
  nft,
  nftChain = "bitcoin",
  receiveAddress,
  edition,
  editionMax,
  sinDegree,
  txid,
  explorerUrl,
  compact = false,
}: {
  holder: string;
  serial: string;
  digest?: string;
  btcAmount: string;
  issuedAt: Date;
  kind?: DealKind;
  nft?: CertificateNft | null;
  nftChain?: NftChain;
  receiveAddress?: string;
  edition?: number;
  editionMax?: number;
  sinDegree?: number;
  txid?: string;
  explorerUrl?: string;
  compact?: boolean;
}) {
  const { copy } = useI18n();
  const orderUrl =
    nft?.orderUrl ||
    (nftChain === "bitcoin" && nft?.orderId ? chiselOrderUrl(nft.orderId) : "");
  const viewUrl = nft ? nftExplorerUrl(nft, nftChain) : "";
  const art = certificateSvg({
    kind,
    holder,
    serial,
    digest: digest || serial,
    btcAmount,
    issuedAt: issuedAt.toISOString(),
    receiveAddress,
    edition,
    editionMax,
    sinDegree,
    nftChain,
    revealEncounter: !compact,
  });

  return (
    <article
      id={compact ? undefined : "soul-certificate"}
      className="soul-certificate overflow-hidden"
    >
      <div
        className="soul-certificate-art"
        dangerouslySetInnerHTML={{ __html: art }}
      />
      {compact ? null : (
      <div className="space-y-3 bg-[#120c0a] px-4 py-4 text-center">
        <p className="text-[11px] tracking-[0.18em] text-[#c4a35a] uppercase">
          {copy.certNft(nftChain)} · {nftLabel(copy, nft ?? undefined, nftChain)}
        </p>
        {txid ? (
          <p className="break-all font-mono text-[11px] text-[#ead9b4]">
            {copy.certTx}{" "}
            {explorerUrl ? (
              <a href={explorerUrl} target="_blank" rel="noreferrer">
                {txid}
              </a>
            ) : (
              txid
            )}
          </p>
        ) : null}
        {nft?.inscriptionId ? (
          <p className="break-all font-mono text-[11px] text-[#ead9b4]">
            ID {nft.inscriptionId}
          </p>
        ) : null}
        <div className="flex flex-wrap items-center justify-center gap-3 text-[10px] tracking-[0.12em] uppercase">
          {nftChain === "bitcoin" && nft?.inscriptionId ? (
            <a
              href={inscriptionExplorerUrl(nft.inscriptionId)}
              target="_blank"
              rel="noreferrer"
              className="text-[#c4a35a] underline"
            >
              {copy.certViewOrdinal}
            </a>
          ) : null}
          {orderUrl || viewUrl ? (
            <a
              href={orderUrl || viewUrl}
              target="_blank"
              rel="noreferrer"
              className="text-[#c4a35a] underline"
            >
              {copy.certViewOrder}
            </a>
          ) : null}
        </div>
      </div>
      )}
    </article>
  );
}
