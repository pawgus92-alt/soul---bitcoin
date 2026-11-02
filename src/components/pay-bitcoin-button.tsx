import {
  Bitcoin,
  Coins,
  Droplets,
  Hexagon,
  LoaderCircle,
  Sparkles,
} from "lucide-react";

import { BitcoinPayDialog } from "@/components/bitcoin-pay-dialog";
import { formatBtc, formatUsd } from "@/lib/bitcoin";
import {
  BTC_LUCKY_AMOUNT,
  CLEANSE_SOL_RANGE,
  FA_AMOUNT,
  SHOW_PEARL_DESK,
  SHOW_SELL_DESK,
  type DealKind,
} from "@/lib/deal";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { useBtcQuote } from "@/lib/quote-context";

export function PayBitcoinButton({
  className,
  kind = "buy",
}: {
  className?: string;
  kind?: DealKind;
}) {
  const { copy } = useI18n();
  const { quote, ethQuote, solQuote, loading } = useBtcQuote();
  const faUsd = solQuote
    ? formatUsd(solQuote.usdPerSol * FA_AMOUNT)
    : null;
  const luckyUsd = quote
    ? formatUsd(quote.usdPerBtc * BTC_LUCKY_AMOUNT)
    : null;
  const label =
    kind === "sell"
      ? copy.sellSoul
      : kind === "sol"
        ? solQuote
          ? `${copy.buySol} · ${formatUsd(solQuote.usdAmount)}`
          : copy.buySol
        : kind === "pearl"
          ? copy.buyPearl
          : kind === "cleanse"
            ? `${copy.cleanseSoul} · ${CLEANSE_SOL_RANGE}`
            : kind === "fa"
              ? faUsd
                ? `${copy.faSoul} · ${faUsd}`
                : copy.faSoul
              : kind === "lucky"
                ? luckyUsd
                  ? `${copy.luckySoul} · ${luckyUsd}`
                  : copy.luckySoul
              : kind === "eth"
                ? ethQuote
                  ? copy.payEthAmount(formatUsd(ethQuote.usdAmount))
                  : copy.buyEth
                : quote
                  ? copy.payAmount(formatBtc(quote.btcAmount))
                  : loading
                    ? copy.fetchingBitcoinRate
                    : copy.payInBitcoin;

  const icon =
    kind === "sol" ? (
      <Coins data-icon="inline-start" />
    ) : kind === "pearl" ? (
      <Coins data-icon="inline-start" />
    ) : kind === "cleanse" ? (
      <Droplets data-icon="inline-start" />
    ) : kind === "fa" || kind === "lucky" ? (
      <Sparkles data-icon="inline-start" />
    ) : kind === "eth" ? (
      <Hexagon data-icon="inline-start" />
    ) : !kind || kind === "buy" ? (
      loading && !quote ? (
        <LoaderCircle data-icon="inline-start" className="animate-spin" />
      ) : (
        <Bitcoin data-icon="inline-start" />
      )
    ) : (
      <Bitcoin data-icon="inline-start" />
    );

  return (
    <BitcoinPayDialog
      kind={kind}
      triggerClassName={className}
      triggerLabel={label}
      triggerVariant={kind === "buy" || kind === "lucky" ? "default" : "outline"}
      icon={icon}
    />
  );
}

export function DealButtons({
  className,
  buttonClassName,
  showMiddle = true,
}: {
  className?: string;
  buttonClassName?: string;
  showMiddle?: boolean;
}) {
  const { locale } = useI18n();
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:flex-wrap">
        <PayBitcoinButton kind="buy" className={buttonClassName} />
        <PayBitcoinButton kind="lucky" className={buttonClassName} />
        {SHOW_SELL_DESK ? (
          <PayBitcoinButton kind="sell" className={buttonClassName} />
        ) : null}
        <PayBitcoinButton kind="eth" className={buttonClassName} />
      </div>
      {showMiddle ? (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:flex-wrap">
          <PayBitcoinButton kind="sol" className={buttonClassName} />
          <PayBitcoinButton kind="cleanse" className={buttonClassName} />
          {locale === "zh" ? (
            <PayBitcoinButton kind="fa" className={buttonClassName} />
          ) : null}
          {SHOW_PEARL_DESK ? (
            <PayBitcoinButton kind="pearl" className={buttonClassName} />
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
