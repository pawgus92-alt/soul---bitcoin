import { Bitcoin, Coins, Gem, LoaderCircle } from "lucide-react";

import { BitcoinPayDialog } from "@/components/bitcoin-pay-dialog";
import { formatBtc } from "@/lib/bitcoin";
import type { DealKind } from "@/lib/deal";
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
  const { quote, loading } = useBtcQuote();
  const label =
    kind === "sell"
      ? copy.sellSoul
      : kind === "sol"
        ? copy.buySol
        : kind === "pearl"
          ? copy.buyPearl
          : quote
            ? copy.payAmount(formatBtc(quote.btcAmount))
            : loading
              ? copy.fetchingBitcoinRate
              : copy.payInBitcoin;

  const icon =
    kind === "sol" ? (
      <Coins data-icon="inline-start" />
    ) : kind === "pearl" ? (
      <Gem data-icon="inline-start" />
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
        <PayBitcoinButton kind="sell" className={buttonClassName} />
      </div>
      {showMiddle ? (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:flex-wrap">
          <PayBitcoinButton kind="sol" className={buttonClassName} />
          <PayBitcoinButton kind="pearl" className={buttonClassName} />
        </div>
      ) : null}
    </div>
  );
}
