import { LanguageSwitcher } from "@/components/language-switcher";
import { DealButtons } from "@/components/pay-bitcoin-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatBtc, formatUsd } from "@/lib/bitcoin";
import { BTC_ADDRESS, DEAL_USD, SOL_ADDRESS } from "@/lib/deal";
import { useI18n } from "@/lib/i18n";
import { useBtcQuote } from "@/lib/quote-context";

function LivePrice() {
  const { copy } = useI18n();
  const { quote, loading, error, refresh } = useBtcQuote();

  if (loading && !quote) {
    return (
      <p className="font-mono text-sm text-muted-foreground">
        {copy.fetchingRate}
      </p>
    );
  }

  if (error && !quote) {
    return (
      <div className="space-y-2">
        <p className="text-sm text-destructive">{copy.rateDeskSilent}</p>
        <Button variant="outline" size="sm" onClick={refresh}>
          {copy.fetchRateAgain}
        </Button>
      </div>
    );
  }

  if (!quote) return null;

  return (
    <p className="font-mono text-sm text-muted-foreground">
      {formatUsd(DEAL_USD)} ÷ {formatUsd(quote.usdPerBtc)} · {quote.source} spot
    </p>
  );
}

export default function App() {
  const { copy, locale } = useI18n();
  const { quote } = useBtcQuote();
  const kicker =
    locale === "ru"
      ? "text-[11px] tracking-[0.16em] text-primary/80 uppercase"
      : "text-[11px] tracking-[0.28em] text-primary/80 uppercase";

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <header className="sticky top-0 z-40 border-b border-primary/15 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 py-3.5">
          <a href="#top" className="min-w-0">
            <p className="font-heading text-lg tracking-[0.28em] text-primary uppercase">
              {copy.brand}
            </p>
            <p className="truncate text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
              {copy.deskLine}
            </p>
          </a>
          <nav className="hidden items-center gap-6 text-[11px] tracking-[0.16em] text-muted-foreground uppercase md:flex">
            <a href="#terms" className="hover:text-primary">
              {copy.navTerms}
            </a>
            <a href="#inventory" className="hover:text-primary">
              {copy.navInventory}
            </a>
            <a href="#clients" className="hover:text-primary">
              {copy.navClients}
            </a>
            <a href="#contract" className="hover:text-primary">
              {copy.navContract}
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <DealButtons
              className="hidden sm:flex"
              showMiddle={false}
            />
          </div>
        </div>
      </header>

      <div className="overflow-hidden border-b border-primary/10 bg-black/20">
        <div className="ticker-track flex w-max gap-10 py-2 pr-10 text-[11px] tracking-[0.16em] text-primary/80 uppercase">
          {[...copy.ledger, ...copy.ledger].map((row, i) => (
            <span key={`${row.city}-${i}`} className="flex items-center gap-3">
              <span className="text-muted-foreground">{row.city}</span>
              <span>{row.client}</span>
              <span className="font-mono normal-case">{row.amount}</span>
              <span aria-hidden className="text-primary/40">
                ◆
              </span>
            </span>
          ))}
        </div>
      </div>

      <main id="top" className="flex-1">
        <section className="mx-auto grid w-full max-w-6xl gap-12 px-5 py-14 md:grid-cols-[1.15fr_0.85fr] md:py-24">
          <div className="space-y-7">
            <Badge variant="outline" className="border-primary/40 text-primary">
              {copy.badgeInvite}
            </Badge>
            <p className={kicker}>{copy.cities.join(" · ")}</p>
            <h1 className="font-heading max-w-xl text-5xl leading-[0.95] font-semibold text-balance sm:text-6xl md:text-7xl">
              {copy.heroTitle}
              <span className="block text-primary">{copy.heroAccent}</span>
            </h1>
            <p className="max-w-lg text-base leading-7 text-muted-foreground sm:text-lg">
              {copy.heroBody(formatUsd(DEAL_USD))}
            </p>
            <div className="flex flex-col gap-3">
              <DealButtons buttonClassName="h-12 px-6 text-base" />
              <p className="max-w-lg text-xs leading-5 text-muted-foreground">
                {copy.midClassHint}
              </p>
              <a
                href="#terms"
                className="inline-flex h-12 w-fit items-center justify-center border border-primary/25 px-5 text-sm tracking-[0.16em] text-primary uppercase hover:bg-primary/10"
              >
                {copy.readTerms}
              </a>
            </div>
            <p className="max-w-lg text-sm leading-6 text-primary">
              {copy.vatLine}
            </p>
            <p className="max-w-md text-xs leading-5 text-muted-foreground">
              {copy.heroAside}
            </p>
          </div>

          <Card className="self-start border-primary/20 bg-card/80 ring-primary/10">
            <CardHeader className="border-b border-primary/10">
              <p className={kicker}>{copy.skuLabel}</p>
              <CardTitle className="font-heading text-4xl font-semibold text-primary sm:text-5xl">
                {quote ? formatBtc(quote.btcAmount) : formatUsd(DEAL_USD)}
              </CardTitle>
              <LivePrice />
            </CardHeader>
            <CardContent className="space-y-4 pt-1">
              <ul className="space-y-3 text-sm leading-6 text-muted-foreground">
                <li>{copy.skuBulletOne}</li>
                <li>{copy.skuBulletSettle(formatUsd(DEAL_USD))}</li>
                <li>{copy.skuBulletRefund}</li>
                <li>{copy.vatLine}</li>
              </ul>
              <Separator className="bg-primary/15" />
              <p className="text-xs leading-5 text-muted-foreground">
                {copy.skuFoot(formatUsd(DEAL_USD))}
              </p>
            </CardContent>
          </Card>
        </section>

        <section id="terms" className="border-y border-primary/10 bg-black/20">
          <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-16 md:grid-cols-3">
            {copy.terms.map((item) => (
              <div key={item.step} className="space-y-3">
                <p className="font-mono text-xs tracking-[0.24em] text-primary">
                  {item.step}
                </p>
                <h2 className="font-heading text-3xl">{item.title}</h2>
                <p className="text-sm leading-6 text-muted-foreground">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section
          id="inventory"
          className="mx-auto grid w-full max-w-6xl gap-6 px-5 py-16 md:grid-cols-2"
        >
          <Card className="border-primary/20">
            <CardHeader>
              <p className={kicker}>{copy.assetsRetained}</p>
              <CardTitle className="font-heading text-3xl">
                {copy.whatYouKeep}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              {copy.keep.map((item) => (
                <div key={item.title}>
                  <h3 className="font-heading text-xl">{item.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    {item.text}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card className="border-primary/20">
            <CardHeader>
              <p className={kicker}>{copy.assetsAcquired}</p>
              <CardTitle className="font-heading text-3xl">
                {copy.whatWeTake}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              {copy.take.map((item) => (
                <div key={item.title}>
                  <h3 className="font-heading text-xl">{item.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    {item.text}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        <section id="clients" className="border-y border-primary/10 bg-black/15">
          <div className="mx-auto w-full max-w-6xl px-5 py-16">
            <p className={kicker}>{copy.quietReferences}</p>
            <h2 className="font-heading mt-2 max-w-xl text-4xl sm:text-5xl">
              {copy.clientsHeading}
            </h2>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {copy.testimonials.map((item) => (
                <blockquote
                  key={item.role}
                  className="flex flex-col justify-between border border-primary/15 bg-card/70 p-6"
                >
                  <p className="font-heading text-xl leading-8">
                    “{item.quote}”
                  </p>
                  <footer className="mt-6 text-sm text-muted-foreground">
                    <span className="text-primary">{item.name}</span>
                    <span className="mt-0.5 block">{item.role}</span>
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        <section id="contract" className="mx-auto w-full max-w-6xl px-5 py-16">
          <div className="grid gap-10 border border-primary/20 bg-card/60 p-6 md:grid-cols-[1fr_auto] md:p-10">
            <div className="space-y-4">
              <p className={kicker}>{copy.closing}</p>
              <h2 className="font-heading text-4xl sm:text-5xl">
                {copy.contractHeading}
              </h2>
              <p className="max-w-xl text-sm leading-6 text-muted-foreground">
                {copy.contractBody(formatUsd(DEAL_USD))}
              </p>
              <p className="max-w-xl text-sm leading-6 text-primary">
                {copy.vatLine}
              </p>
            </div>
            <div className="flex flex-col items-start justify-center gap-3">
              <DealButtons buttonClassName="h-12 px-6 text-base" />
              <p className="max-w-xs text-[11px] tracking-[0.16em] text-primary/80 uppercase">
                {copy.midClassLabel}
              </p>
              <p className="max-w-xs break-all font-mono text-[11px] text-muted-foreground">
                BTC {BTC_ADDRESS}
              </p>
              <p className="max-w-xs break-all font-mono text-[11px] text-muted-foreground">
                SOL {SOL_ADDRESS}
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-primary/15">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-5 py-8 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>{copy.footerDesk}</p>
          <p>{copy.vatLine}</p>
        </div>
        <p className="mx-auto max-w-6xl px-5 pb-8 text-center text-[11px] leading-5 text-muted-foreground">
          © All rights reserved! The fundamental set of rules concerning the
          attainment of souls and the greater good!
        </p>
      </footer>
    </div>
  );
}
