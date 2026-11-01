import { VAT_LINE } from "@/lib/deal";

export function SoulCertificate({
  holder,
  serial,
  btcAmount,
  issuedAt,
}: {
  holder: string;
  serial: string;
  btcAmount: string;
  issuedAt: Date;
}) {
  const date = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(issuedAt);

  return (
    <article
      id="soul-certificate"
      className="soul-certificate relative overflow-hidden px-4 py-5 sm:px-8 sm:py-7"
    >
      <div className="soul-certificate-frame pointer-events-none" aria-hidden />
      <div className="relative z-10 text-center text-[#2a1a12]">
        <p className="text-[10px] tracking-[0.42em] text-[#7a1f2b] uppercase">
          Maison Æternum · Geneva
        </p>
        <div className="soul-certificate-ribbon mx-auto mt-3 h-1 w-24" />
        <p className="font-heading mt-4 text-2xl font-semibold tracking-[0.18em] text-[#7a1f2b] uppercase sm:text-3xl">
          Certificate
        </p>
        <p className="font-heading text-lg tracking-[0.28em] text-[#1e3a6e] uppercase">
          of Soul Acquisition
        </p>

        <p className="mt-5 text-[11px] tracking-[0.28em] text-[#6b4b2a] uppercase">
          This is to certify that
        </p>
        <p className="font-heading mt-2 text-3xl font-semibold text-[#7a1f2b] italic sm:text-4xl">
          {holder}
        </p>
        <p className="mt-3 text-sm text-[#2a1a12]">has purchased</p>
        <p className="font-heading mt-1 text-4xl font-bold tracking-wide text-[#c9a227] sm:text-5xl">
          ONE SOUL
        </p>
        <p className="font-heading mt-4 text-2xl font-semibold text-[#1f6b4a] sm:text-3xl">
          and is therefore very rich.
        </p>
        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#5c3d24]">
          Ordinary people do not settle eternity in Bitcoin. This document is
          proof of surplus, taste, and a dangerously empty interior.
        </p>

        <div className="mt-6 flex flex-col items-center justify-center gap-5 sm:flex-row sm:gap-10">
          <div className="soul-seal" aria-hidden>
            <span>1</span>
          </div>
          <dl className="grid gap-1 text-left text-[11px] tracking-wide text-[#5c3d24] uppercase">
            <div className="flex gap-2">
              <dt className="text-[#7a1f2b]">No.</dt>
              <dd className="font-mono normal-case">{serial}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="text-[#7a1f2b]">Paid</dt>
              <dd className="font-mono normal-case">{btcAmount}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="text-[#7a1f2b]">Issued</dt>
              <dd>{date}</dd>
            </div>
          </dl>
        </div>

        <p className="mt-6 text-[10px] tracking-[0.12em] text-[#1e3a6e]">
          {VAT_LINE}
        </p>
      </div>
    </article>
  );
}
