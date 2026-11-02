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
  ethereumPayUri,
  formatUsd,
  solanaPayUri,
} from "@/lib/bitcoin";
import {
  issueCertificate,
  isDeskAddress,
  isReceiveAddress,
  resolveReceiveAddress,
  satsToBtc,
  type CertificateRecord,
} from "@/lib/certificate";
import {
  BTC_LUCKY_AMOUNT,
  DEAL_USD,
  ETH_AMOUNT,
  FA_AMOUNT,
  PEARL_AMOUNT,
  SELL_BTC,
  SOL_AMOUNT,
  cleanseSolAmount,
  expectedAtomic,
  formatAtomic,
  formatDealAmount,
  formatSolLabel,
  getDeal,
  type DealKind,
} from "@/lib/deal";
import { useI18n } from "@/lib/i18n";
import {
  claimNftEdition,
  useLuckyBtcSupply,
  useNftSupply,
  useRegularBtcSupply,
} from "@/lib/nft-supply";
import {
  createCertificateNft,
  fetchCertificateNft,
  type CertificateNft,
} from "@/lib/ordinals";
import { useBtcQuote } from "@/lib/quote-context";
import { isOpenSinDegree, type SinDegree } from "@/lib/sins";
import { watchDeskPayment, type PaymentWatch } from "@/lib/watch";

type Step = "sins" | "invoice" | "watching" | "need-buyer" | "minting" | "done";

function invoiceCopy(
  kind: DealKind,
  copy: ReturnType<typeof useI18n>["copy"],
  usd: string,
  amountLabel = "",
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
      description: copy.solInvoiceDescription(usd),
    };
  }
  if (kind === "pearl") {
    return {
      badge: copy.pearlInvoiceBadge,
      title: copy.pearlInvoiceTitle,
      description: copy.pearlInvoiceDescription,
    };
  }
  if (kind === "cleanse") {
    return {
      badge: copy.cleanseInvoiceBadge,
      title: copy.cleanseInvoiceTitle,
      description: copy.cleanseInvoiceDescription(amountLabel, usd),
    };
  }
  if (kind === "fa") {
    return {
      badge: copy.faInvoiceBadge,
      title: copy.faInvoiceTitle,
      description: copy.faInvoiceDescription(usd),
    };
  }
  if (kind === "lucky") {
    return {
      badge: copy.luckyInvoiceBadge,
      title: copy.luckyInvoiceTitle,
      description: copy.luckyInvoiceDescription(usd),
    };
  }
  if (kind === "eth") {
    return {
      badge: copy.ethInvoiceBadge,
      title: copy.ethInvoiceTitle,
      description: copy.ethInvoiceDescription(usd),
    };
  }
  return {
    badge: copy.invoiceBadge,
    title: copy.invoiceTitle,
    description: copy.invoiceDescription(usd),
  };
}

function payAddressLabel(
  chain: ReturnType<typeof getDeal>["chain"],
  copy: ReturnType<typeof useI18n>["copy"],
) {
  if (chain === "bitcoin") return copy.bitcoinAddress;
  if (chain === "ethereum") return copy.ethereumAddress;
  return copy.payAddress;
}

function hasPositiveAtomic(value: string) {
  try {
    return BigInt(value) > 0n;
  } catch {
    return false;
  }
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
  const {
    quote,
    ethQuote,
    solQuote,
    loading,
    error: quoteError,
    refresh,
  } = useBtcQuote();
  const deal = getDeal(kind);
  const supply = useNftSupply(deal.nftChain);
  const regularBtc = useRegularBtcSupply();
  const luckyBtc = useLuckyBtcSupply();
  const sell = kind === "sell";
  const btcBuy = kind === "buy";
  const luckyDesk = kind === "lucky";
  const ethBuy = kind === "eth";
  const cleansing = kind === "cleanse";
  const faBlessing = kind === "fa";
  const solDesk = kind === "sol" || cleansing || faBlessing;
  const payLabel =
    triggerLabel ??
    (cleansing
      ? copy.cleanseSoul
      : luckyDesk
        ? copy.luckySoul
        : sell
          ? copy.sellSoul
          : copy.payInBitcoin);
  const dealCoin = sell
    ? SELL_BTC
    : luckyDesk
      ? BTC_LUCKY_AMOUNT
      : ethBuy
        ? ETH_AMOUNT
        : quote?.btcAmount;
  const firstStep: Step = cleansing ? "sins" : "invoice";
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>(firstStep);
  const [sinDegree, setSinDegree] = useState<SinDegree | null>(null);
  const cleanseSol = cleanseSolAmount(sinDegree);
  const paidLabel = formatDealAmount(kind, dealCoin, sinDegree);
  const ready = btcBuy ? Boolean(quote) : true;
  const invoiceUsd =
    ethBuy && ethQuote
      ? formatUsd(ethQuote.usdAmount)
      : luckyDesk && quote
        ? formatUsd(quote.usdPerBtc * BTC_LUCKY_AMOUNT)
        : faBlessing && solQuote
          ? formatUsd(solQuote.usdPerSol * FA_AMOUNT)
          : cleansing && solQuote
            ? formatUsd(solQuote.usdPerSol * cleanseSol)
            : kind === "sol" && solQuote
              ? formatUsd(solQuote.usdAmount)
              : formatUsd(DEAL_USD);
  const soldOut = luckyDesk
    ? luckyBtc.remaining <= 0
    : btcBuy
      ? regularBtc.remaining <= 0
      : supply.remaining <= 0;
  const invoice = invoiceCopy(kind, copy, invoiceUsd, paidLabel);
  const payUri =
    deal.chain === "solana"
      ? solanaPayUri(
          deal.address,
          kind === "pearl"
            ? PEARL_AMOUNT
            : faBlessing
              ? FA_AMOUNT
              : cleansing
                ? cleanseSol
                : SOL_AMOUNT,
          deal.mint,
        )
      : deal.chain === "ethereum"
        ? ethereumPayUri(deal.address, ETH_AMOUNT)
        : bitcoinPayUri(deal.address, dealCoin ?? SELL_BTC);
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
  const openedAt = useRef(Math.floor(Date.now() / 1000));
  const expected = expectedAtomic(kind, dealCoin ?? 0, sinDegree);

  function reset() {
    closeLocked.current = false;
    setStep(firstStep);
    setSinDegree(null);
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
    openedAt.current = Math.floor(Date.now() / 1000);
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
    if (cleansing && !isOpenSinDegree(sinDegree ?? 0)) {
      setError(copy.cleansePickTitle);
      setStep("sins");
      return;
    }
    if (soldOut) {
      setError(copy.nftSoldOut);
      return;
    }
    if (!accepted) {
      setError(copy.tickTheBox);
      return;
    }
    const addressError = buyerAddressError(nftAddress);
    if (addressError) {
      setError(addressError);
      return;
    }
    setError(null);
    setSettledBtc(paidLabel);
    setStep("watching");
  }

  function confirmBuyerAddress() {
    const addressError = buyerAddressError(nftAddress);
    if (addressError) {
      setError(addressError);
      return;
    }
    if (!nftAddress.trim()) {
      setError(copy.nftNeedsBuyerAddress);
      return;
    }
    if (!watch?.paid) {
      setError(copy.watchingChain);
      return;
    }
    setError(null);
    finishing.current = true;
    void finishAfterPayment(watch);
  }

  function buyerAddressError(value: string) {
    const typed = value.trim();
    if (!typed) return null;
    if (!isReceiveAddress(deal.nftChain, typed)) {
      return copy.invalidReceiveAddress(deal.nftChain);
    }
    if (isDeskAddress(deal.nftChain, typed)) {
      return copy.nftNotDesk;
    }
    return null;
  }

  async function finishAfterPayment(payment: PaymentWatch) {
    const dest = resolveReceiveAddress(
      nftAddress,
      deal.nftChain,
      payment.payer,
    );
    if (!dest) {
      setWatch(payment);
      setError(copy.nftNeedsBuyerAddress);
      setStep("need-buyer");
      finishing.current = false;
      return;
    }
    closeLocked.current = true;
    setStep("minting");
    try {
      const edition = claimNftEdition(
        deal.nftChain,
        kind === "lucky" ? "lucky" : "regular",
      );
      if (!edition) {
        setError(copy.nftSoldOut);
        setStep("invoice");
        finishing.current = false;
        return;
      }
      const record = await issueCertificate({
        kind,
        holder: name.trim() || copy.anonymousHolder,
        btcAmount: paidLabel,
        receiveAddress: dest,
        nftChain: deal.nftChain,
        edition: edition.edition,
        editionMax: edition.max,
        sinDegree: sinDegree ?? undefined,
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
      finishing.current = false;
    } finally {
      closeLocked.current = false;
    }
  }

  useEffect(() => {
    if (step !== "watching" || !hasPositiveAtomic(expected)) return;
    let cancelled = false;
    const tick = async () => {
      try {
        const next = await watchDeskPayment({
          chain: deal.chain,
          address: deal.address,
          expected,
          mint: deal.mint,
          since: openedAt.current,
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
    if (deal.nftChain !== "bitcoin") return;
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
  }, [step, nft?.orderId, nft?.inscriptionId, deal.nftChain]);

  const postageReady = Boolean(
    deal.nftChain === "bitcoin" &&
      nft?.chargeAddress &&
      nft.chargeSats &&
      !nft.inscriptionId,
  );
  const postageUri =
    postageReady && nft?.chargeAddress && nft.chargeSats
      ? bitcoinPayUri(
          nft.chargeAddress,
          satsToBtc(nft.chargeSats),
          "Maison Aeternum NFT",
        )
      : "";
  const mintDest = resolveReceiveAddress(
    nftAddress,
    deal.nftChain,
    watch?.payer,
  );
  const askingRate = btcBuy && loading && !quote;
  const silentRate = btcBuy && Boolean(quoteError) && !quote;

  return (
    <Dialog
      open={open}
      disablePointerDismissal={step === "minting" || step === "need-buyer"}
      onOpenChange={(next, details) => {
        if (
          !next &&
          (closeLocked.current ||
            step === "minting" ||
            step === "need-buyer" ||
            details.reason === "focus-out")
        ) {
          details.cancel();
          return;
        }
        setOpen(next);
        if (!next) reset();
        if (next) openedAt.current = Math.floor(Date.now() / 1000);
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
          step === "done" || step === "sins"
            ? "max-h-[92vh] overflow-y-auto border border-primary/25 bg-[#14110d] sm:max-w-2xl"
            : "max-h-[90vh] overflow-y-auto border border-primary/25 bg-[#14110d] sm:max-w-lg"
        }
        showCloseButton
      >
        {step === "sins" ? (
          <>
            <DialogHeader>
              <Badge variant="outline" className="w-fit border-primary/40 text-primary">
                {copy.cleanseKicker}
              </Badge>
              <DialogTitle className="font-heading text-2xl font-semibold tracking-wide">
                {copy.cleansePickTitle}
              </DialogTitle>
              <DialogDescription>{copy.cleansePickDescription}</DialogDescription>
            </DialogHeader>
            <div className="grid gap-3 sm:grid-cols-2">
              {copy.sinDegrees.map((item) => {
                const openDegree = isOpenSinDegree(item.degree);
                return (
                  <button
                    key={item.degree}
                    type="button"
                    disabled={!openDegree}
                    onClick={() => {
                      if (!isOpenSinDegree(item.degree)) return;
                      setSinDegree(item.degree);
                      setError(null);
                      setStep("invoice");
                    }}
                    className={
                      openDegree
                        ? "rounded-md border border-primary/20 bg-black/30 p-4 text-left hover:border-primary/50 hover:bg-black/50"
                        : "cursor-not-allowed rounded-md border border-dashed border-primary/15 bg-black/10 p-4 text-left opacity-70"
                    }
                  >
                    <p className="text-[11px] tracking-[0.22em] text-primary/80 uppercase">
                      {item.kicker}
                    </p>
                    <p className="font-heading mt-1 text-xl text-primary">
                      {item.title}
                    </p>
                    {openDegree ? (
                      <p className="mt-1 font-mono text-xs tracking-[0.14em] text-primary">
                        {formatSolLabel(cleanseSolAmount(item.degree))}
                      </p>
                    ) : null}
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {item.text}
                    </p>
                    {!openDegree ? (
                      <p className="mt-3 text-[11px] tracking-[0.16em] text-primary uppercase">
                        {copy.cleanseReserved}
                      </p>
                    ) : null}
                  </button>
                );
              })}
            </div>
            <DialogFooter className="border-primary/10 bg-transparent">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                {copy.remainLiving}
              </Button>
            </DialogFooter>
          </>
        ) : null}

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

            {cleansing && sinDegree ? (
              <p className="border border-primary/20 bg-black/30 px-3 py-2 text-sm text-primary">
                {copy.sinDegrees.find((item) => item.degree === sinDegree)?.kicker}
                {" · "}
                {copy.sinDegrees.find((item) => item.degree === sinDegree)?.title}
                {" · "}
                {paidLabel}
              </p>
            ) : null}

            {askingRate ? (
              <div className="flex min-h-40 flex-col items-center justify-center gap-3 py-8 text-center">
                <LoaderCircle className="size-6 animate-spin text-primary" />
                <p className="text-sm text-muted-foreground">
                  {copy.askingMarket}
                </p>
              </div>
            ) : null}

            {silentRate ? (
              <div className="space-y-3 rounded-md border border-destructive/40 bg-destructive/10 p-4 text-sm">
                <p className="text-destructive">
                  {copy.rateDeskSilentDetail(quoteError || copy.rateDeskSilent)}
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
                    {luckyDesk && quote ? (
                      <p className="font-mono text-sm text-muted-foreground">
                        {`${formatUsd(quote.usdPerBtc * BTC_LUCKY_AMOUNT)} at ${formatUsd(quote.usdPerBtc)} / BTC`}
                      </p>
                    ) : null}
                    {ethBuy && ethQuote ? (
                      <p className="font-mono text-sm text-muted-foreground">
                        {`${formatUsd(ethQuote.usdAmount)} at ${formatUsd(ethQuote.usdPerEth)} / ETH`}
                      </p>
                    ) : null}
                    {solDesk && solQuote ? (
                      <p className="font-mono text-sm text-muted-foreground">
                        {`${formatUsd(
                          faBlessing
                            ? solQuote.usdPerSol * FA_AMOUNT
                            : cleansing
                              ? solQuote.usdPerSol * cleanseSol
                              : solQuote.usdAmount,
                        )} at ${formatUsd(solQuote.usdPerSol)} / SOL`}
                      </p>
                    ) : null}
                    {sell && quote ? (
                      <p className="font-mono text-sm text-muted-foreground">
                        {copy.sellPriceHint(formatUsd(SELL_BTC * quote.usdPerBtc))}
                      </p>
                    ) : null}
                    {(kind === "buy" || luckyDesk || sell) && quote ? (
                      <p className="mt-1 text-[11px] text-muted-foreground">
                        {copy.spotVia(quote.source)}
                      </p>
                    ) : null}
                    {ethBuy && ethQuote ? (
                      <p className="mt-1 text-[11px] text-muted-foreground">
                        {copy.spotVia(ethQuote.source)}
                      </p>
                    ) : null}
                    {solDesk && solQuote ? (
                      <p className="mt-1 text-[11px] text-muted-foreground">
                        {copy.spotVia(solQuote.source)}
                      </p>
                    ) : null}
                    <p className="mt-2 text-xs text-primary">
                      {luckyDesk
                        ? copy.nftLuckyRemaining(luckyBtc.remaining, luckyBtc.max)
                        : copy.nftRemaining(
                            supply.remaining,
                            supply.max,
                            deal.nftChain,
                          )}
                    </p>
                  </div>
                  <div>
                    <p className="mb-1 text-[11px] tracking-[0.22em] text-primary/80 uppercase">
                      {payAddressLabel(deal.chain, copy)}
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

            {soldOut ? (
              <p className="border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {btcBuy && luckyBtc.remaining > 0
                  ? copy.nftOrdinarySoldOut
                  : copy.nftSoldOut}
              </p>
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
                {copy.nftReceiveLabel(deal.nftChain)}
              </span>
              <Input
                value={nftAddress}
                onChange={(event) => setNftAddress(event.target.value)}
                placeholder={copy.nftReceivePlaceholder(deal.nftChain)}
                className="h-10 bg-black/30 font-mono text-sm"
                autoComplete="off"
                spellCheck={false}
              />
              <span className="text-xs leading-5 text-muted-foreground">
                {copy.nftReceiveHint(deal.nftChain)}
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
              <span>
                {faBlessing
                  ? copy.faAcceptTerms
                  : luckyDesk
                    ? copy.luckyAcceptTerms
                    : cleansing
                      ? copy.cleanseAcceptTerms(paidLabel)
                      : sell
                        ? copy.acceptSellTerms
                        : copy.acceptTerms}
              </span>
            </label>

            {error ? (
              <p className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {error}
              </p>
            ) : null}

            <DialogFooter className="border-primary/10 bg-transparent">
              {cleansing ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep("sins")}
                >
                  {copy.cleansePickTitle}
                </Button>
              ) : (
                <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                  {copy.remainLiving}
                </Button>
              )}
              <Button
                type="button"
                onClick={startWatch}
                disabled={!ready || soldOut}
              >
                {soldOut
                  ? copy.nftSoldOut
                  : ready
                    ? copy.sendAmount(paidLabel)
                    : copy.waitingForRate}
              </Button>
            </DialogFooter>
          </>
        ) : null}

        {step === "watching" || step === "minting" ? (
          <div className="flex min-h-64 flex-col items-center justify-center gap-4 py-10 text-center">
            <LoaderCircle className="size-8 animate-spin text-primary" />
            <DialogTitle className="font-heading text-2xl">
              {step === "minting" ? copy.mintingNft : copy.watchingMempool}
            </DialogTitle>
            <DialogDescription>
              {step === "minting"
                ? copy.paymentSeen
                : copy.settlingHint(settledBtc || paidLabel)}
            </DialogDescription>
            <p className="text-sm text-primary">
              {watch?.paid ? copy.paymentSeen : copy.paymentWaiting}
            </p>
            {mintDest ? (
              <p className="max-w-sm break-all font-mono text-xs text-muted-foreground">
                {copy.nftMintingTo(mintDest)}
              </p>
            ) : (
              <p className="max-w-sm text-xs text-muted-foreground">
                {copy.nftReceiveHint(deal.nftChain)}
              </p>
            )}
            <p className="font-mono text-xs text-muted-foreground">
              {copy.receivedOf(
                formatAtomic(kind, watch?.received ?? "0"),
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

        {step === "need-buyer" ? (
          <div className="space-y-4 py-2">
            <DialogHeader>
              <DialogTitle className="font-heading text-2xl">
                {copy.needBuyerTitle}
              </DialogTitle>
              <DialogDescription>{copy.needBuyerHint}</DialogDescription>
            </DialogHeader>
            <p className="text-sm text-primary">{copy.paymentSeen}</p>
            <label className="grid gap-1.5">
              <span className="text-[11px] tracking-[0.22em] text-primary/80 uppercase">
                {copy.nftReceiveLabel(deal.nftChain)}
              </span>
              <Input
                value={nftAddress}
                onChange={(event) => {
                  setNftAddress(event.target.value);
                  setError(null);
                }}
                placeholder={copy.nftReceivePlaceholder(deal.nftChain)}
                className="h-10 bg-black/30 font-mono text-sm"
                autoComplete="off"
                spellCheck={false}
              />
              <span className="text-xs leading-5 text-muted-foreground">
                {copy.nftReceiveHint(deal.nftChain)}
              </span>
            </label>
            {error ? (
              <p className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {error}
              </p>
            ) : null}
            <DialogFooter className="border-primary/10 bg-transparent">
              <Button type="button" onClick={confirmBuyerAddress}>
                {copy.nftConfirmBuyer}
              </Button>
            </DialogFooter>
          </div>
        ) : null}

        {step === "done" && certificate ? (
          <div className="space-y-4 py-2">
            <DialogHeader className="items-center text-center">
              <DialogTitle className="font-heading text-2xl text-primary">
                {faBlessing
                  ? copy.faCleansed
                  : luckyDesk
                    ? copy.luckyBought
                    : cleansing
                      ? copy.cleansedSoul
                      : sell
                        ? copy.soldSoul
                        : copy.boughtSoul}
              </DialogTitle>
              <DialogDescription>
                {faBlessing
                  ? copy.faCleansedHint
                  : luckyDesk
                    ? copy.luckyBoughtHint
                    : cleansing
                      ? copy.cleansedSoulHint
                      : sell
                        ? copy.soldSoulHint
                        : copy.boughtSoulHint}
              </DialogDescription>
            </DialogHeader>
            <SoulCertificate
              kind={kind}
              holder={certificate.holder}
              serial={certificate.serial}
              digest={certificate.digest}
              btcAmount={settledBtc || certificate.btcAmount}
              issuedAt={issuedAt ?? new Date(certificate.issuedAt)}
              nft={nft}
              nftChain={deal.nftChain}
              receiveAddress={certificate.receiveAddress}
              edition={certificate.edition}
              editionMax={certificate.editionMax}
              sinDegree={certificate.sinDegree}
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
                    {formatAtomic("buy", String(nft!.chargeSats || 0))}
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
