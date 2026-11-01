import { Bitcoin, LoaderCircle } from "lucide-react";

import { BitcoinPayDialog } from "@/components/bitcoin-pay-dialog";
import { formatBtc } from "@/lib/bitcoin";
import { useI18n } from "@/lib/i18n";
import { useBtcQuote } from "@/lib/quote-context";

export function PayBitcoinButton({
  className,
}: {
  className?: string;
}) {
  const { copy } = useI18n();
  const { quote, loading } = useBtcQuote();
  const label = quote
    ? copy.payAmount(formatBtc(quote.btcAmount))
    : loading
      ? copy.fetchingBitcoinRate
      : copy.payInBitcoin;

  return (
    <BitcoinPayDialog
      triggerClassName={className}
      triggerLabel={label}
      icon={
        loading && !quote ? (
          <LoaderCircle data-icon="inline-start" className="animate-spin" />
        ) : (
          <Bitcoin data-icon="inline-start" />
        )
      }
    />
  );
}
