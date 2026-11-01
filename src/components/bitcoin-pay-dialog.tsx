import { useEffect, useRef, useState, type ReactNode } from "react";
import { Bitcoin, Check, Copy, LoaderCircle, Printer } from "lucide-react";

import { BitcoinQr } from "@/components/bitcoin-qr";
import { SoulCertificate } from "@/components/soul-certificate";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { bitcoinPayUri, bitcoinUri, formatBtc, formatUsd } from "@/lib/bitcoin";
import {
  issueCertificate,
  isBitcoinAddress,
  resolveReceiveAddress,
  satsToBtc,
  type CertificateRecord,
} from "@/lib/certificate";
import { BTC_ADDRESS, DEAL_USD, SELL_BTC, type DealKind } from "@/lib/deal";
import { useI18n } from "@/lib/i18n";
import {
  createCertificateNft,
  fetchCertificateNft,
  type CertificateNft,
} from "@/lib/ordinals";
import { useBtcQuote } from "@/lib/quote-context";

type Step = "invoice" | "settling" | "done";

export function BitcoinPayDialog({
  kind = "buy",
  triggerClassName,
  triggerLabel,
  triggerVariant = "default",
  icon,
}: {
  kind?: DealKind;
  triggerClassName?: string;
  triggerLabel?: string;
  triggerVariant?: "default" | "outline";
  icon?: ReactNode;
}) {
  const { copy } = useI18n();
  const { quote, loading, error: quoteError, refresh } = useBtcQuote();
  const sell = kind === "sell";
  const payLabel = triggerLabel ?? (sell ? copy.sellSoul : copy.payInBitcoin);
  const dealBtc = sell ? SELL_BTC : quote?.btcAmount;
  const ready = sell || Boolean(quote);
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("invoice");
  const [name, setName] = useState("");
  const [nftAddress, setNftAddress] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copiedSerial, setCopiedSerial] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [certificate, setCertificate] = useState<CertificateRecord | null>(null);
  const [nft, setNft] = useState<CertificateNft | null>(null);
  const [settledBtc, setSettledBtc] = useState<string | null>(null);
  const [issuedAt, setIssuedAt] = useState<Date | null>(null);
  const closeLocked = useRef(false);

  function reset() {
    closeLocked.current = false;
    setStep("invoice");
    setName("");
    setNftAddress("");
    setAccepted(false);
    setCopied(false);
    setCopiedSerial(false);
    setError(null);
    setCertificate(null);
    setNft(null);
    setSettledBtc(null);
    setIssuedAt(null);
  }

  async function copyAddress() {
    try {
      await navigator.clipboard.writeText(BTC_ADDRESS);
      setCopied(true);
      setError(null);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setError(copy.clipboardDeclined);
    }
  }

  async function copySerial() {
    if (!certificate) return;
    try {
      await navigator.clipboard.writeText(certificate.serial);
      setCopiedSerial(true);
      window.setTimeout(() => setCopiedSerial(false), 1800);
    } catch {
      setError(copy.clipboardDeclined);
    }
  }

  async function mintNft(record: CertificateRecord) {
    try {
      const order = await createCertificateNft(record);
      setNft(order);
    } catch (reason) {
      setNft({
        receiveAddress: record.receiveAddress,
        status: "error",
        error:
          reason instanceof Error ? reason.message : copy.certNftFailed,
      });
    }
  }

  async function settle() {
    if (!sell && !quote) {
      setError(copy.waitForRate);
      return;
    }
    if (!accepted) {
      setError(copy.tickTheBox);
      return;
    }
    if (nftAddress.trim() && !isBitcoinAddress(nftAddress)) {
      setError(copy.invalidReceiveAddress);
      return;
    }
    setError(null);
    closeLocked.current = true;
    const paid = formatBtc(dealBtc ?? SELL_BTC);
    setSettledBtc(paid);
    setStep("settling");
    try {
      const record = await issueCertificate({
        kind,
        holder: name.trim() || copy.anonymousHolder,
        btcAmount: paid,
        receiveAddress: resolveReceiveAddress(nftAddress),
      });
      setCertificate(record);
      setIssuedAt(new Date(record.issuedAt));
      await mintNft(record);
      setStep("done");
    } catch (reason) {
      setError(
        reason instanceof Error ? reason.message : copy.certNftFailed,
      );
      setStep("invoice");
    } finally {
      closeLocked.current = false;
    }
  }

  useEffect(() => {
    if (step !== "done" || !nft?.orderId || nft.inscriptionId) return;
    let cancelled = false;
    const tick = async () => {
      try {
        const next = await fetchCertificateNft(nft.orderId!);
        if (!cancelled) setNft(next);
      } catch {
        /* keep the unique code; try again on the next poll */
      }
    };
    const timer = window.setInterval(tick, 8000);
    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, [step, nft?.orderId, nft?.inscriptionId]);

  const postageReady = Boolean(nft?.chargeAddress && nft.chargeSats && !nft.inscriptionId);
  const postageUri =
    postageReady && nft?.chargeAddress && nft.chargeSats
      ? bitcoinPayUri(
          nft.chargeAddress,
          satsToBtc(nft.chargeSats),
          "Maison Aeternum NFT",
        )
      : "";

  return (
    <Dialog
      open={open}
      disablePointerDismissal={step === "settling"}
      onOpenChange={(next, details) => {
        if (
          !next &&
          (closeLocked.current ||
            step === "settling" ||
            details.reason === "focus-out")
        ) {
          details.cancel();
          return;
        }
        setOpen(next);
        if (!next) reset();
      }}
    >
      <DialogTrigger
        nativeButton
        render={
          <Button
            type="button"
            size="lg"
            variant={triggerVariant}
            className={triggerClassName}
          />
        }
      >
        {icon ?? <Bitcoin data-icon="inline-start" />}
        {payLabel}
      </DialogTrigger>
      <DialogContent
        className={
          step === "done"
            ? "max-h-[92vh] overflow-y-auto border border-primary/25 bg-[#14110d] sm:max-w-2xl"
            : "max-h-[90vh] overflow-y-auto border border-primary/25 bg-[#14110d] sm:max-w-lg"
        }
        showCloseButton
      >
        {step === "invoice" ? (
          <>
            <DialogHeader>
              <Badge variant="outline" className="w-fit border-primary/40 text-primary">
                {sell ? copy.sellInvoiceBadge : copy.invoiceBadge}
              </Badge>
              <DialogTitle className="font-heading text-2xl font-semibold tracking-wide">
                {sell ? copy.sellInvoiceTitle : copy.invoiceTitle}
              </DialogTitle>
              <DialogDescription>
                {sell
                  ? copy.sellInvoiceDescription
                  : copy.invoiceDescription(formatUsd(DEAL_USD))}
              </DialogDescription>
            </DialogHeader>

            {!sell && loading && !quote ? (
              <div className="flex min-h-40 flex-col items-center justify-center gap-3 py-8 text-center">
                <LoaderCircle className="size-6 animate-spin text-primary" />
                <p className="text-sm text-muted-foreground">
                  {copy.askingMarket}
                </p>
              </div>
            ) : null}

            {!sell && quoteError && !quote ? (
              <div className="space-y-3 rounded-md border border-destructive/40 bg-destructive/10 p-4 text-sm">
                <p className="text-destructive">
                  {copy.rateDeskSilentDetail(quoteError)}
                </p>
                <Button variant="outline" onClick={refresh}>
                  {copy.fetchRateAgain}
                </Button>
              </div>
            ) : null}

            {ready ? (
              <div className="grid gap-4 sm:grid-cols-[160px_1fr]">
                <BitcoinQr
                  payload={bitcoinUri(dealBtc ?? SELL_BTC)}
                  className="mx-auto w-40 sm:w-full"
                />
                <div className="space-y-3">
                  <div>
                    <p className="text-[11px] tracking-[0.22em] text-primary/80 uppercase">
                      {copy.amountDue}
                    </p>
                    <p className="font-heading text-3xl text-primary">
                      {formatBtc(dealBtc ?? SELL_BTC)}
                    </p>
                    <p className="font-mono text-sm text-muted-foreground">
                      {sell
                        ? quote
                          ? copy.sellPriceHint(formatUsd(SELL_BTC * quote.usdPerBtc))
                          : formatBtc(SELL_BTC)
                        : `${formatUsd(DEAL_USD)} at ${formatUsd(quote!.usdPerBtc)} / BTC`}
                    </p>
                    {quote ? (
                      <p className="mt-1 text-[11px] text-muted-foreground">
                        {copy.spotVia(quote.source)}
                      </p>
                    ) : null}
                  </div>
                  <div>
                    <p className="mb-1 text-[11px] tracking-[0.22em] text-primary/80 uppercase">
                      {copy.bitcoinAddress}
                    </p>
                    <div className="flex items-start gap-2">
                      <code className="block flex-1 break-all rounded-md border border-primary/20 bg-black/40 px-2 py-2 font-mono text-[11px] leading-relaxed text-primary">
                        {BTC_ADDRESS}
                      </code>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={copyAddress}
                        aria-label={copy.copyAddress}
                      >
                        {copied ? <Check /> : <Copy />}
                      </Button>
                    </div>
                    {copied ? (
                      <p className="mt-1 text-xs text-primary">{copy.copiedJacket}</p>
                    ) : null}
                  </div>
                </div>
              </div>
            ) : null}

            <p className="border border-primary/20 bg-black/30 px-3 py-2 text-sm text-primary">
              {copy.vatLine}
            </p>

            <label className="grid gap-1.5">
              <span className="text-[11px] tracking-[0.22em] text-primary/80 uppercase">
                {copy.ledgerName}
              </span>
              <Input
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder={copy.ledgerPlaceholder}
                className="h-10 bg-black/30"
              />
            </label>

            <label className="grid gap-1.5">
              <span className="text-[11px] tracking-[0.22em] text-primary/80 uppercase">
                {copy.nftReceiveLabel}
              </span>
              <Input
                value={nftAddress}
                onChange={(event) => setNftAddress(event.target.value)}
                placeholder={copy.nftReceivePlaceholder}
                className="h-10 bg-black/30 font-mono text-sm"
                autoComplete="off"
                spellCheck={false}
              />
              <span className="text-xs leading-5 text-muted-foreground">
                {copy.nftReceiveHint}
              </span>
            </label>

            <label className="flex items-start gap-3 rounded-md border border-primary/15 bg-black/20 p-3 text-sm leading-relaxed">
              <Checkbox
                checked={accepted}
                onCheckedChange={(value) => {
                  setAccepted(value === true);
                  if (value === true) setError(null);
                }}
                className="mt-0.5"
              />
              <span>{sell ? copy.acceptSellTerms : copy.acceptTerms}</span>
            </label>

            {error ? (
              <p className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {error}
              </p>
            ) : null}

            <DialogFooter className="border-primary/10 bg-transparent">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                {copy.remainLiving}
              </Button>
              <Button type="button" onClick={settle} disabled={!ready}>
                {ready
                  ? copy.sendAmount(formatBtc(dealBtc ?? SELL_BTC))
                  : copy.waitingForRate}
              </Button>
            </DialogFooter>
          </>
        ) : null}

        {step === "settling" ? (
          <div className="flex min-h-64 flex-col items-center justify-center gap-4 py-10 text-center">
            <LoaderCircle className="size-8 animate-spin text-primary" />
            <DialogTitle className="font-heading text-2xl">
              {copy.watchingMempool}
            </DialogTitle>
            <DialogDescription>
              {copy.settlingHint(settledBtc || "")}
            </DialogDescription>
            <p className="text-sm text-primary">{copy.mintingNft}</p>
            {certificate ? (
              <p className="font-mono text-xs text-muted-foreground">
                {certificate.serial}
              </p>
            ) : null}
          </div>
        ) : null}

        {step === "done" && certificate ? (
          <div className="space-y-4 py-2">
            <DialogHeader className="items-center text-center">
              <DialogTitle className="font-heading text-2xl text-primary">
                {sell ? copy.soldSoul : copy.boughtSoul}
              </DialogTitle>
              <DialogDescription>
                {sell ? copy.soldSoulHint : copy.boughtSoulHint}
              </DialogDescription>
            </DialogHeader>
            <SoulCertificate
              kind={kind}
              holder={certificate.holder}
              serial={certificate.serial}
              btcAmount={settledBtc || certificate.btcAmount}
              issuedAt={issuedAt ?? new Date(certificate.issuedAt)}
              nft={nft}
            />

            {postageReady ? (
              <div className="grid gap-4 rounded-md border border-primary/20 bg-black/30 p-4 sm:grid-cols-[140px_1fr]">
                <BitcoinQr payload={postageUri} className="mx-auto w-36 sm:w-full" />
                <div className="space-y-2">
                  <p className="text-[11px] tracking-[0.22em] text-primary/80 uppercase">
                    {copy.nftPostageTitle}
                  </p>
                  <p className="font-heading text-2xl text-primary">
                    {formatBtc(satsToBtc(nft!.chargeSats!))}
                  </p>
                  <code className="block break-all font-mono text-[11px] text-primary">
                    {nft!.chargeAddress}
                  </code>
                  <p className="text-xs leading-5 text-muted-foreground">
                    {copy.nftPostageHint}
                  </p>
                </div>
              </div>
            ) : null}

            {nft?.status === "error" ? (
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2">
                <p className="text-sm text-destructive">
                  {nft.error || copy.certNftFailed}
                </p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => mintNft(certificate)}
                >
                  {copy.nftRetry}
                </Button>
              </div>
            ) : null}

            <DialogFooter className="border-primary/10 bg-transparent sm:justify-end">
              <Button type="button" variant="outline" onClick={copySerial}>
                {copiedSerial ? <Check data-icon="inline-start" /> : <Copy data-icon="inline-start" />}
                {copiedSerial ? copy.copiedSerial : copy.copySerial}
              </Button>
              <Button type="button" variant="outline" onClick={() => window.print()}>
                <Printer data-icon="inline-start" />
                {copy.printCertificate}
              </Button>
              <Button type="button" onClick={() => setOpen(false)}>
                {copy.returnToSociety}
              </Button>
            </DialogFooter>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
