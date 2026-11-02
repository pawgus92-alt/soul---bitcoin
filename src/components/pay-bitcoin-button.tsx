import { Bitcoin, Coins, Droplets, Hexagon, LoaderCircle } from "lucide-react";

import { BitcoinPayDialog } from "@/components/bitcoin-pay-dialog";
import { formatBtc, formatEth } from "@/lib/bitcoin";
import {
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
  const { quote, ethQuote, loading, ethLoading } = useBtcQuote();
  const label =
    kind === "sell"
      ? copy.sellSoul
      : kind === "sol"
        ? copy.buySol
        : kind === "pearl"
          ? copy.buyPearl
          : kind === "cleanse"
            ? copy.cleanseSoul
            : kind === "eth"
              ? ethQuote
                ? copy.payEthAmount(formatEth(ethQuote.ethAmount))
                : ethLoading
                  ? copy.fetchingEthRate
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
    ) : kind === "eth" ? (
      ethLoading && !ethQuote ? (
        <LoaderCircle data-icon="inline-start" className="animate-spin" />
      ) : (
        <Hexagon data-icon="inline-start" />
      )
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
      triggerVariant={kind === "buy" ? "default" : "outline"}
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
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:flex-wrap">
        <PayBitcoinButton kind="buy" className={buttonClassName} />
        {SHOW_SELL_DESK ? (
          <PayBitcoinButton kind="sell" className={buttonClassName} />
        ) : null}
        <PayBitcoinButton kind="eth" className={buttonClassName} />
      </div>
      {showMiddle ? (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:flex-wrap">
          <PayBitcoinButton kind="sol" className={buttonClassName} />
          <PayBitcoinButton kind="cleanse" className={buttonClassName} />
          {SHOW_PEARL_DESK ? (
            <PayBitcoinButton kind="pearl" className={buttonClassName} />
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
