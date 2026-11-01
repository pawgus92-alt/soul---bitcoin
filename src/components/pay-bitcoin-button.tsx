import { Bitcoin, LoaderCircle } from "lucide-react";

import { BitcoinPayDialog } from "@/components/bitcoin-pay-dialog";
import { formatBtc } from "@/lib/bitcoin";
import { useBtcQuote } from "@/lib/quote-context";

export function PayBitcoinButton({
  className,
}: {
  className?: string;
}) {
  const { quote, loading } = useBtcQuote();
  const label = quote
    ? `Pay ${formatBtc(quote.btcAmount)}`
    : loading
      ? "Fetching Bitcoin rate"
      : "Pay in Bitcoin";

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
