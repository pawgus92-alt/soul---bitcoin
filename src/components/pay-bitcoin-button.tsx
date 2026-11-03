import {
  Bitcoin,
  Coins,
  Droplets,
  Hexagon,
  Sparkles,
} from "lucide-react";

import { BitcoinPayDialog } from "@/components/bitcoin-pay-dialog";
import { formatBtc, formatUsd } from "@/lib/bitcoin";
import {
  BTC_LUCKY_AMOUNT,
  BTC_REGULAR_AMOUNT,
  CLEANSE_SOL_RANGE,
  ETH_HALF_AMOUNT,
  ETH_ONE_AMOUNT,
  ETH_TWO_AMOUNT,
  FA_AMOUNT,
  SHOW_PEARL_DESK,
  SHOW_SELL_DESK,
  isEthKind,
  isSolKind,
  solAmountOf,
  type DealKind,
} from "@/lib/deal";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { useBtcQuote } from "@/lib/quote-context";

function solButtonLabel(
  kind: DealKind,
  copy: ReturnType<typeof useI18n>["copy"],
  usd: string | null,
) {
  const base =
    kind === "solLegendary"
      ? copy.buySolLegendary
      : kind === "solEpic"
        ? copy.buySolEpic
        : kind === "solRare"
          ? copy.buySolRare
          : copy.buySol;
  return usd ? `${base} · ${usd}` : base;
}

export function PayBitcoinButton({
  className,
  kind = "buy",
}: {
  className?: string;
  kind?: DealKind;
}) {
  const { copy } = useI18n();
  const { quote, ethQuote, solQuote } = useBtcQuote();
  const faUsd = solQuote
    ? formatUsd(solQuote.usdPerSol * FA_AMOUNT)
    : null;
  const luckyUsd = quote
    ? formatUsd(quote.usdPerBtc * BTC_LUCKY_AMOUNT)
    : null;
  const ethUsd = (amount: number) =>
    ethQuote ? formatUsd(ethQuote.usdPerEth * amount) : null;
  const solUsd = (amount: number) =>
    solQuote ? formatUsd(solQuote.usdPerSol * amount) : null;
  const label =
    kind === "sell"
      ? copy.sellSoul
      : isSolKind(kind)
        ? solButtonLabel(kind, copy, solUsd(solAmountOf(kind)))
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
                : kind === "ethOne"
                  ? ethUsd(ETH_ONE_AMOUNT)
                    ? copy.payEthOneAmount(ethUsd(ETH_ONE_AMOUNT)!)
                    : copy.buyEthOne
                  : kind === "ethTwo"
                    ? ethUsd(ETH_TWO_AMOUNT)
                      ? copy.payEthTwoAmount(ethUsd(ETH_TWO_AMOUNT)!)
                      : copy.buyEthTwo
                    : kind === "eth"
                      ? ethUsd(ETH_HALF_AMOUNT)
                        ? copy.payEthAmount(ethUsd(ETH_HALF_AMOUNT)!)
                        : copy.buyEth
                      : quote
                        ? `${copy.payAmount(formatBtc(BTC_REGULAR_AMOUNT))} · ${formatUsd(quote.usdAmount)}`
                        : copy.payAmount(formatBtc(BTC_REGULAR_AMOUNT));

  const icon =
    isSolKind(kind) || kind === "pearl" ? (
      <Coins data-icon="inline-start" />
    ) : kind === "cleanse" ? (
      <Droplets data-icon="inline-start" />
    ) : kind === "fa" || kind === "lucky" ? (
      <Sparkles data-icon="inline-start" />
    ) : isEthKind(kind) ? (
      <Hexagon data-icon="inline-start" />
    ) : (
      <Bitcoin data-icon="inline-start" />
    );

  return (
    <BitcoinPayDialog
      kind={kind}
      triggerClassName={className}
      triggerLabel={label}
      triggerVariant={
        kind === "buy" || kind === "lucky" || kind === "ethTwo"
          ? "default"
          : "outline"
      }
      icon={icon}
    />
  );
}

export function DealButtons({
  className,
  buttonClassName,
  desks = "all",
}: {
  className?: string;
  buttonClassName?: string;
  desks?: "bitcoin" | "alt" | "all";
}) {
  const { locale } = useI18n();
  const showBitcoin = desks === "bitcoin" || desks === "all";
  const showAlt = desks === "alt" || desks === "all";
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {showBitcoin ? (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:flex-wrap">
          <PayBitcoinButton kind="buy" className={buttonClassName} />
          <PayBitcoinButton kind="lucky" className={buttonClassName} />
          {SHOW_SELL_DESK ? (
            <PayBitcoinButton kind="sell" className={buttonClassName} />
          ) : null}
        </div>
      ) : null}
      {showAlt ? (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:flex-wrap">
          <PayBitcoinButton kind="eth" className={buttonClassName} />
          <PayBitcoinButton kind="ethOne" className={buttonClassName} />
          <PayBitcoinButton kind="ethTwo" className={buttonClassName} />
          <PayBitcoinButton kind="sol" className={buttonClassName} />
          <PayBitcoinButton kind="solRare" className={buttonClassName} />
          <PayBitcoinButton kind="solEpic" className={buttonClassName} />
          <PayBitcoinButton kind="solLegendary" className={buttonClassName} />
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
