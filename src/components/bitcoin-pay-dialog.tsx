import { useRef, useState, type ReactNode } from "react";
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
import { bitcoinUri, formatBtc, formatUsd } from "@/lib/bitcoin";
import { BTC_ADDRESS, DEAL_USD } from "@/lib/deal";
import { useI18n } from "@/lib/i18n";
import { useBtcQuote } from "@/lib/quote-context";

type Step = "invoice" | "settling" | "done";

export function BitcoinPayDialog({
  triggerClassName,
  triggerLabel,
  icon,
}: {
  triggerClassName?: string;
  triggerLabel?: string;
  icon?: ReactNode;
}) {
  const { copy } = useI18n();
  const { quote, loading, error: quoteError, refresh } = useBtcQuote();
  const payLabel = triggerLabel ?? copy.payInBitcoin;
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("invoice");
  const [name, setName] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [certificate, setCertificate] = useState("");
  const [settledBtc, setSettledBtc] = useState<string | null>(null);
  const [issuedAt, setIssuedAt] = useState<Date | null>(null);
  const closeLocked = useRef(false);

  function reset() {
    closeLocked.current = false;
    setStep("invoice");
    setName("");
    setAccepted(false);
    setCopied(false);
    setError(null);
    setCertificate("");
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

  function settle() {
    if (!quote) {
      setError(copy.waitForRate);
      return;
    }
    if (!accepted) {
      setError(copy.tickTheBox);
      return;
    }
    setError(null);
    closeLocked.current = true;
    setSettledBtc(formatBtc(quote.btcAmount));
    setStep("settling");
    window.setTimeout(() => {
      const stamp = Math.floor(Date.now() / 1000)
        .toString(16)
        .slice(-6)
        .toUpperCase();
      setCertificate(`AE-1666-${stamp}`);
      setIssuedAt(new Date());
      setStep("done");
      closeLocked.current = false;
    }, 1600);
  }

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
                {copy.invoiceBadge}
              </Badge>
              <DialogTitle className="font-heading text-2xl font-semibold tracking-wide">
                {copy.invoiceTitle}
              </DialogTitle>
              <DialogDescription>
                {copy.invoiceDescription(formatUsd(DEAL_USD))}
              </DialogDescription>
            </DialogHeader>

            {loading && !quote ? (
              <div className="flex min-h-40 flex-col items-center justify-center gap-3 py-8 text-center">
                <LoaderCircle className="size-6 animate-spin text-primary" />
                <p className="text-sm text-muted-foreground">
                  {copy.askingMarket}
                </p>
              </div>
            ) : null}

            {quoteError && !quote ? (
              <div className="space-y-3 rounded-md border border-destructive/40 bg-destructive/10 p-4 text-sm">
                <p className="text-destructive">
                  {copy.rateDeskSilentDetail(quoteError)}
                </p>
                <Button variant="outline" onClick={refresh}>
                  {copy.fetchRateAgain}
                </Button>
              </div>
            ) : null}

            {quote ? (
              <div className="grid gap-4 sm:grid-cols-[160px_1fr]">
                <BitcoinQr
                  payload={bitcoinUri(quote.btcAmount)}
                  className="mx-auto w-40 sm:w-full"
                />
                <div className="space-y-3">
                  <div>
                    <p className="text-[11px] tracking-[0.22em] text-primary/80 uppercase">
                      {copy.amountDue}
                    </p>
                    <p className="font-heading text-3xl text-primary">
                      {formatBtc(quote.btcAmount)}
                    </p>
                    <p className="font-mono text-sm text-muted-foreground">
                      {formatUsd(DEAL_USD)} at {formatUsd(quote.usdPerBtc)} / BTC
                    </p>
                    <p className="mt-1 text-[11px] text-muted-foreground">
                      {copy.spotVia(quote.source)}
                    </p>
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

            <label className="flex items-start gap-3 rounded-md border border-primary/15 bg-black/20 p-3 text-sm leading-relaxed">
              <Checkbox
                checked={accepted}
                onCheckedChange={(value) => {
                  setAccepted(value === true);
                  if (value === true) setError(null);
                }}
                className="mt-0.5"
              />
              <span>{copy.acceptTerms}</span>
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
              <Button type="button" onClick={settle} disabled={!quote}>
                {quote
                  ? copy.sendAmount(formatBtc(quote.btcAmount))
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
          </div>
        ) : null}

        {step === "done" ? (
          <div className="space-y-4 py-2">
            <DialogHeader className="items-center text-center">
              <DialogTitle className="font-heading text-2xl text-primary">
                {copy.boughtSoul}
              </DialogTitle>
              <DialogDescription>
                {copy.boughtSoulHint}
              </DialogDescription>
            </DialogHeader>
            <SoulCertificate
              holder={name.trim() || copy.anonymousHolder}
              serial={certificate}
              btcAmount={settledBtc || ""}
              issuedAt={issuedAt ?? new Date()}
            />
            <DialogFooter className="border-primary/10 bg-transparent sm:justify-end">
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
