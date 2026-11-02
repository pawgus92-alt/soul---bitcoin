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
  if (!nft) return copy.certNftPending;
  if (nft.inscriptionId) return copy.certNftMinted;
  if (nft.status === "inscribing") return copy.certNftInscribing;
  if (nft.status === "error") return copy.certNftFailed;
  if (chain !== "bitcoin" && nft.status === "minted") return copy.certNftMinted;
  return copy.certNftPending;
}

function subtitleFor(kind: DealKind, copy: ReturnType<typeof useI18n>["copy"]) {
  if (kind === "sell") return copy.certSellSubtitle;
  if (kind === "sol") return copy.certSolSubtitle;
  if (kind === "pearl") return copy.certPearlSubtitle;
  if (kind === "eth") return copy.certEthSubtitle;
  if (kind === "cleanse") return copy.certCleanseSubtitle;
  return copy.certSubtitle;
}

function taglineFor(
  kind: DealKind,
  copy: ReturnType<typeof useI18n>["copy"],
  sinDegree?: number,
) {
  if (kind === "sell") return copy.certHalfBitcoin;
  if (kind === "sol") return copy.certTenSol;
  if (kind === "pearl") return copy.certPearlPaid;
  if (kind === "eth") return copy.certEthPaid;
  if (kind === "cleanse") {
    const sin = copy.sinDegrees.find((item) => item.degree === sinDegree);
    return sin
      ? `${sin.kicker} · ${sin.title}. ${copy.certCleansePaid}`
      : copy.certCleansePaid;
  }
  return copy.certVeryRich;
}

function proofFor(kind: DealKind, copy: ReturnType<typeof useI18n>["copy"]) {
  if (kind === "sell") return copy.certSellProof;
  if (kind === "cleanse") return copy.certCleanseProof;
  if (kind === "sol" || kind === "pearl") return copy.certMidProof;
  return copy.certProof;
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
}: {
  holder: string;
  serial: string;
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
}) {
  const { copy } = useI18n();
  const date = new Intl.DateTimeFormat(copy.dateLocale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(issuedAt);
  const orderUrl =
    nft?.orderUrl ||
    (nftChain === "bitcoin" && nft?.orderId ? chiselOrderUrl(nft.orderId) : "");
  const viewUrl = nft ? nftExplorerUrl(nft, nftChain) : "";

  return (
    <article
      id="soul-certificate"
      className="soul-certificate relative overflow-hidden px-4 py-5 sm:px-8 sm:py-7"
    >
      <div className="soul-certificate-frame pointer-events-none" aria-hidden />
      <div className="relative z-10 text-center text-[#2a1a12]">
        <p className="text-[10px] tracking-[0.28em] text-[#7a1f2b] uppercase">
          {copy.certKicker}
        </p>
        <div className="soul-certificate-ribbon mx-auto mt-3 h-1 w-24" />
        <p className="font-heading mt-4 text-2xl font-semibold tracking-[0.18em] text-[#7a1f2b] uppercase sm:text-3xl">
          {copy.certTitle}
        </p>
        <p className="font-heading text-lg tracking-[0.18em] text-[#1e3a6e] uppercase">
          {subtitleFor(kind, copy)}
        </p>

        <p className="mt-5 text-[11px] tracking-[0.18em] text-[#6b4b2a] uppercase">
          {copy.certCertify}
        </p>
        <p className="font-heading mt-2 text-3xl font-semibold text-[#7a1f2b] italic sm:text-4xl">
          {holder}
        </p>
        <p className="mt-3 text-sm text-[#2a1a12]">
          {kind === "sell"
            ? copy.certHasSold
            : kind === "cleanse"
              ? copy.certHasCleansed
              : copy.certHasPurchased}
        </p>
        <p className="font-heading mt-1 text-4xl font-bold tracking-wide text-[#c9a227] sm:text-5xl">
          {kind === "cleanse" ? copy.certOneSin : copy.certOneSoul}
        </p>
        <p className="font-heading mt-4 text-2xl font-semibold text-[#1f6b4a] sm:text-3xl">
          {taglineFor(kind, copy, sinDegree)}
        </p>
        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#5c3d24]">
          {proofFor(kind, copy)}
        </p>

        <div className="mx-auto mt-5 max-w-md border border-[#7a1f2b]/25 bg-[#fff6df]/80 px-3 py-2">
          <p className="text-[10px] tracking-[0.22em] text-[#7a1f2b] uppercase">
            {copy.certNo}
          </p>
          <p className="mt-1 break-all font-mono text-sm text-[#2a1a12] sm:text-base">
            {serial}
          </p>
        </div>

        <div className="mt-6 flex flex-col items-center justify-center gap-5 sm:flex-row sm:gap-10">
          <div className="soul-seal" aria-hidden>
            <span>1</span>
          </div>
          <dl className="grid gap-1 text-left text-[11px] tracking-wide text-[#5c3d24] uppercase">
            <div className="flex gap-2">
              <dt className="text-[#7a1f2b]">{copy.certPaid}</dt>
              <dd className="font-mono normal-case">{btcAmount}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="text-[#7a1f2b]">{copy.certIssued}</dt>
              <dd>{date}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="text-[#7a1f2b]">{copy.certNft(nftChain)}</dt>
              <dd className="normal-case">
                {nftLabel(copy, nft ?? undefined, nftChain)}
              </dd>
            </div>
            {receiveAddress ? (
              <div className="flex gap-2">
                <dt className="text-[#7a1f2b]">{copy.certMintedTo}</dt>
                <dd className="break-all font-mono normal-case">
                  {receiveAddress}
                </dd>
              </div>
            ) : null}
            {edition && editionMax ? (
              <div className="flex gap-2">
                <dt className="text-[#7a1f2b]">No.</dt>
                <dd className="font-mono normal-case">
                  {copy.certEdition(edition, editionMax)}
                </dd>
              </div>
            ) : null}
            {txid ? (
              <div className="flex gap-2">
                <dt className="text-[#7a1f2b]">{copy.certTx}</dt>
                <dd className="break-all font-mono normal-case">
                  {explorerUrl ? (
                    <a href={explorerUrl} target="_blank" rel="noreferrer">
                      {txid}
                    </a>
                  ) : (
                    txid
                  )}
                </dd>
              </div>
            ) : null}
            {nft?.inscriptionId ? (
              <div className="flex gap-2">
                <dt className="text-[#7a1f2b]">ID</dt>
                <dd className="break-all font-mono normal-case">
                  {nft.inscriptionId}
                </dd>
              </div>
            ) : null}
          </dl>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-[10px] tracking-[0.12em] uppercase">
          {nftChain === "bitcoin" && nft?.inscriptionId ? (
            <a
              href={inscriptionExplorerUrl(nft.inscriptionId)}
              target="_blank"
              rel="noreferrer"
              className="text-[#1e3a6e] underline"
            >
              {copy.certViewOrdinal}
            </a>
          ) : null}
          {orderUrl || viewUrl ? (
            <a
              href={orderUrl || viewUrl}
              target="_blank"
              rel="noreferrer"
              className="text-[#1e3a6e] underline"
            >
              {copy.certViewOrder}
            </a>
          ) : null}
        </div>

        <p className="mt-6 text-[10px] tracking-[0.12em] text-[#1e3a6e]">
          {copy.vatLine}
        </p>
      </div>
    </article>
  );
}
