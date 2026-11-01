import { useEffect, useRef, useState, type ReactNode } from "react";
import { Check, Copy, LoaderCircle, Printer } from "lucide-react";

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
import {
  bitcoinPayUri,
  formatBtc,
  formatUsd,
  solanaPayUri,
} from "@/lib/bitcoin";
import {
  issueCertificate,
  isBitcoinAddress,
  resolveReceiveAddress,
  satsToBtc,
  type CertificateRecord,
} from "@/lib/certificate";
import {
  DEAL_USD,
  PEARL_AMOUNT,
  SELL_BTC,
  SOL_AMOUNT,
  expectedAtomic,
  formatAtomic,
  formatDealAmount,
  getDeal,
  type DealKind,
} from "@/lib/deal";
import { useI18n } from "@/lib/i18n";
import {
  createCertificateNft,
  fetchCertificateNft,
  type CertificateNft,
} from "@/lib/ordinals";
import { useBtcQuote } from "@/lib/quote-context";
import { watchDeskPayment, type PaymentWatch } from "@/lib/watch";

type Step = "invoice" | "watching" | "minting" | "done";

function invoiceCopy(
  kind: DealKind,
  copy: ReturnType<typeof useI18n>["copy"],
  usd: string,
) {
  if (kind === "sell") {
    return {
      badge: copy.sellInvoiceBadge,
      title: copy.sellInvoiceTitle,
      description: copy.sellInvoiceDescription,
    };
  }
  if (kind === "sol") {
    return {
      badge: copy.solInvoiceBadge,
      title: copy.solInvoiceTitle,
      description: copy.solInvoiceDescription,
    };
  }
  if (kind === "pearl") {
    return {
      badge: copy.pearlInvoiceBadge,
      title: copy.pearlInvoiceTitle,
      description: copy.pearlInvoiceDescription,
    };
  }
  return {
    badge: copy.invoiceBadge,
    title: copy.invoiceTitle,
    description: copy.invoiceDescription(usd),
  };
}

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
  const deal = getDeal(kind);
  const sell = kind === "sell";
  const btcBuy = kind === "buy";
  const payLabel = triggerLabel ?? (sell ? copy.sellSoul : copy.payInBitcoin);
  const dealBtc = sell ? SELL_BTC : quote?.btcAmount;
  const paidLabel = formatDealAmount(kind, dealBtc);
  const ready = !btcBuy || Boolean(quote);
  const invoice = invoiceCopy(kind, copy, formatUsd(DEAL_USD));
  const payUri =
    deal.chain === "solana"
      ? solanaPayUri(
          deal.address,
          kind === "sol" ? SOL_AMOUNT : PEARL_AMOUNT,
          deal.mint,
        )
      : bitcoinPayUri(deal.address, dealBtc ?? SELL_BTC);
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
  const [watch, setWatch] = useState<PaymentWatch | null>(null);
  const closeLocked = useRef(false);
  const finishing = useRef(false);
  const expected = expectedAtomic(kind, dealBtc ?? 0);

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
    setWatch(null);
    finishing.current = false;
  }

  async function copyPayAddress() {
    try {
      await navigator.clipboard.writeText(deal.address);
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
        error: reason instanceof Error ? reason.message : copy.certNftFailed,
      });
    }
  }

  function startWatch() {
    if (btcBuy && !quote) {
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
    setSettledBtc(paidLabel);
    setStep("watching");
  }

  async function finishAfterPayment(payment: PaymentWatch) {
    closeLocked.current = true;
    setStep("minting");
    try {
      const record = await issueCertificate({
        kind,
        holder: name.trim() || copy.anonymousHolder,
        btcAmount: paidLabel,
        receiveAddress: resolveReceiveAddress(nftAddress),
        txid: payment.txid || undefined,
        explorerUrl: payment.explorer,
      });
      setCertificate(record);
      setIssuedAt(new Date(record.issuedAt));
      await mintNft(record);
      setStep("done");
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : copy.certNftFailed);
      setStep("watching");
    } finally {
      closeLocked.current = false;
    }
  }

  useEffect(() => {
    if (step !== "watching" || expected <= 0) return;
    let cancelled = false;
    const tick = async () => {
      try {
        const next = await watchDeskPayment({
          chain: deal.chain,
          address: deal.address,
          expected,
          mint: deal.mint,
        });
        if (cancelled) return;
        setWatch(next);
        if (next.paid && !finishing.current) {
          finishing.current = true;
          await finishAfterPayment(next);
        }
      } catch (reason) {
        if (!cancelled) {
          setError(reason instanceof Error ? reason.message : copy.watchingChain);
        }
      }
    };
    void tick();
    const timer = window.setInterval(tick, 8000);
    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
    // finishAfterPayment is stable enough for this invoice session
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, expected, deal.address, deal.chain, deal.mint]);

  useEffect(() => {
    if (step !== "done" || !nft?.orderId || nft.inscriptionId) return;
    let cancelled = false;
    const tick = async () => {
      try {
        const next = await fetchCertificateNft(nft.orderId!);
        if (!cancelled) setNft(next);
      } catch {
        /* keep the unique code */
      }
    };
    const timer = window.setInterval(tick, 8000);
    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, [step, nft?.orderId, nft?.inscriptionId]);

  const postageReady = Boolean(
    nft?.chargeAddress && nft.chargeSats && !nft.inscriptionId,
  );
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
      disablePointerDismissal={step === "minting"}
      onOpenChange={(next, details) => {
        if (
          !next &&
          (closeLocked.current ||
            step === "minting" ||
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
        {icon}
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
                {invoice.badge}
              </Badge>
              <DialogTitle className="font-heading text-2xl font-semibold tracking-wide">
                {invoice.title}
              </DialogTitle>
              <DialogDescription>{invoice.description}</DialogDescription>
            </DialogHeader>

            {btcBuy && loading && !quote ? (
              <div className="flex min-h-40 flex-col items-center justify-center gap-3 py-8 text-center">
                <LoaderCircle className="size-6 animate-spin text-primary" />
                <p className="text-sm text-muted-foreground">
                  {copy.askingMarket}
                </p>
              </div>
            ) : null}

            {btcBuy && quoteError && !quote ? (
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
                  payload={payUri}
                  className="mx-auto w-40 sm:w-full"
                />
                <div className="space-y-3">
                  <div>
                    <p className="text-[11px] tracking-[0.22em] text-primary/80 uppercase">
                      {copy.amountDue}
                    </p>
                    <p className="font-heading text-3xl text-primary">
                      {paidLabel}
                    </p>
                    {kind === "buy" && quote ? (
                      <p className="font-mono text-sm text-muted-foreground">
                        {`${formatUsd(DEAL_USD)} at ${formatUsd(quote.usdPerBtc)} / BTC`}
                      </p>
                    ) : null}
                    {sell && quote ? (
                      <p className="font-mono text-sm text-muted-foreground">
                        {copy.sellPriceHint(formatUsd(SELL_BTC * quote.usdPerBtc))}
                      </p>
                    ) : null}
                    {quote && deal.chain === "bitcoin" ? (
                      <p className="mt-1 text-[11px] text-muted-foreground">
                        {copy.spotVia(quote.source)}
                      </p>
                    ) : null}
                  </div>
                  <div>
                    <p className="mb-1 text-[11px] tracking-[0.22em] text-primary/80 uppercase">
                      {deal.chain === "bitcoin" ? copy.bitcoinAddress : copy.payAddress}
                    </p>
                    <div className="flex items-start gap-2">
                      <code className="block flex-1 break-all rounded-md border border-primary/20 bg-black/40 px-2 py-2 font-mono text-[11px] leading-relaxed text-primary">
                        {deal.address}
                      </code>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={copyPayAddress}
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
              <Button type="button" onClick={startWatch} disabled={!ready}>
                {ready ? copy.sendAmount(paidLabel) : copy.waitingForRate}
              </Button>
            </DialogFooter>
          </>
        ) : null}

        {step === "watching" || step === "minting" ? (
          <div className="flex min-h-64 flex-col items-center justify-center gap-4 py-10 text-center">
            <LoaderCircle className="size-8 animate-spin text-primary" />
            <DialogTitle className="font-heading text-2xl">
              {step === "minting" ? copy.watchingMempool : copy.watchingMempool}
            </DialogTitle>
            <DialogDescription>
              {step === "minting"
                ? copy.paymentSeen
                : copy.settlingHint(settledBtc || paidLabel)}
            </DialogDescription>
            <p className="text-sm text-primary">
              {watch?.paid ? copy.paymentSeen : copy.paymentWaiting}
            </p>
            <p className="font-mono text-xs text-muted-foreground">
              {copy.receivedOf(
                formatAtomic(kind, watch?.received ?? 0),
                formatAtomic(kind, expected),
              )}
            </p>
            {watch?.explorer ? (
              <a
                href={watch.explorer}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-primary underline"
              >
                {copy.viewPayment}
              </a>
            ) : null}
            {error ? (
              <p className="text-sm text-destructive">{error}</p>
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
              txid={certificate.txid}
              explorerUrl={certificate.explorerUrl}
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
