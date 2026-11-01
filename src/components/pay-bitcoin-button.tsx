import { Bitcoin, LoaderCircle } from "lucide-react";

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
  const sell = kind === "sell";
  const label = sell
    ? copy.sellSoul
    : quote
      ? copy.payAmount(formatBtc(quote.btcAmount))
      : loading
        ? copy.fetchingBitcoinRate
        : copy.payInBitcoin;

  return (
    <BitcoinPayDialog
      kind={kind}
      triggerClassName={className}
      triggerLabel={label}
      triggerVariant={sell ? "outline" : "default"}
      icon={
        !sell && loading && !quote ? (
          <LoaderCircle data-icon="inline-start" className="animate-spin" />
        ) : (
          <Bitcoin data-icon="inline-start" />
        )
      }
    />
  );
}

export function DealButtons({
  className,
  buttonClassName,
}: {
  className?: string;
  buttonClassName?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-3 sm:flex-row sm:items-center", className)}>
      <PayBitcoinButton kind="buy" className={buttonClassName} />
      <PayBitcoinButton kind="sell" className={buttonClassName} />
    </div>
  );
}
