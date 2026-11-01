import { PayBitcoinButton } from "@/components/pay-bitcoin-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatBtc, formatUsd } from "@/lib/bitcoin";
import { CITIES, DEAL_USD, KEEP, LEDGER, TAKE, TESTIMONIALS, VAT_LINE } from "@/lib/deal";
import { useBtcQuote } from "@/lib/quote-context";

function LivePrice() {
  const { quote, loading, error, refresh } = useBtcQuote();

  if (loading && !quote) {
    return (
      <p className="font-mono text-sm text-muted-foreground">
        Fetching the live Bitcoin rate…
      </p>
    );
  }

  if (error && !quote) {
    return (
      <div className="space-y-2">
        <p className="text-sm text-destructive">The rate desk is silent.</p>
        <Button variant="outline" size="sm" onClick={refresh}>
          Fetch the rate again
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
  const { quote } = useBtcQuote();

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <header className="sticky top-0 z-40 border-b border-primary/15 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 py-3.5">
          <a href="#top" className="min-w-0">
            <p className="font-heading text-lg tracking-[0.28em] text-primary uppercase">
              Maison Æternum
            </p>
            <p className="truncate text-[10px] tracking-[0.22em] text-muted-foreground uppercase">
              Private Soul Desk · Est. 1666
            </p>
          </a>
          <nav className="hidden items-center gap-6 text-[11px] tracking-[0.2em] text-muted-foreground uppercase md:flex">
            <a href="#terms" className="hover:text-primary">
              Terms
            </a>
            <a href="#inventory" className="hover:text-primary">
              Inventory
            </a>
            <a href="#clients" className="hover:text-primary">
              Clients
            </a>
            <a href="#contract" className="hover:text-primary">
              Contract
            </a>
          </nav>
          <PayBitcoinButton className="hidden sm:inline-flex" />
        </div>
      </header>

      <div className="overflow-hidden border-b border-primary/10 bg-black/20">
        <div className="ticker-track flex w-max gap-10 py-2 pr-10 text-[11px] tracking-[0.18em] text-primary/80 uppercase">
          {[...LEDGER, ...LEDGER].map((row, i) => (
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
              By invitation, then by invoice
            </Badge>
            <p className="text-[11px] tracking-[0.32em] text-primary/80 uppercase">
              {CITIES.join(" · ")}
            </p>
            <h1 className="font-heading max-w-xl text-5xl leading-[0.95] font-semibold text-balance sm:text-6xl md:text-7xl">
              Sell the soul.
              <span className="block text-primary">Keep the yacht.</span>
            </h1>
            <p className="max-w-lg text-base leading-7 text-muted-foreground sm:text-lg">
              {formatUsd(DEAL_USD)} at the live Bitcoin spot rate. We do not
              negotiate, we take no percentage, and we do not ask why the
              boardroom air got lighter.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <PayBitcoinButton className="h-12 px-6 text-base" />
              <a
                href="#terms"
                className="inline-flex h-12 items-center justify-center border border-primary/25 px-5 text-sm tracking-[0.16em] text-primary uppercase hover:bg-primary/10"
              >
                Read the terms
              </a>
            </div>
            <p className="max-w-lg text-sm leading-6 text-primary">{VAT_LINE}</p>
            <p className="max-w-md text-xs leading-5 text-muted-foreground">
              Wire transfers remain for people who still believe in states. Cash
              smells of morals. Bitcoin at the spot rate is the only decent
              language in this room.
            </p>
          </div>

          <Card className="self-start border-primary/20 bg-card/80 ring-primary/10">
            <CardHeader className="border-b border-primary/10">
              <p className="text-[11px] tracking-[0.28em] text-primary/80 uppercase">
                The only SKU
              </p>
              <CardTitle className="font-heading text-4xl font-semibold text-primary sm:text-5xl">
                {quote ? formatBtc(quote.btcAmount) : formatUsd(DEAL_USD)}
              </CardTitle>
              <LivePrice />
            </CardHeader>
            <CardContent className="space-y-4 pt-1">
              <ul className="space-y-3 text-sm leading-6 text-muted-foreground">
                <li>One soul. No instalments. No family package.</li>
                <li>
                  Settlement is {formatUsd(DEAL_USD)} converted at the live BTC/USD
                  spot rate.
                </li>
                <li>No refunds. Remorse is a separate, overpriced product.</li>
                <li>{VAT_LINE}</li>
              </ul>
              <Separator className="bg-primary/15" />
              <p className="text-xs leading-5 text-muted-foreground">
                We do not acquire middle-class souls. If you need to check whether
                {` ${formatUsd(DEAL_USD)} `}
                is affordable, you are early. Return after the first fund.
              </p>
            </CardContent>
          </Card>
        </section>

        <section id="terms" className="border-y border-primary/10 bg-black/20">
          <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-16 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Name yourself",
                text: "A name, a family office, or a hull number. Discretion is kept as carefully as your offshore papers.",
              },
              {
                step: "02",
                title: "Pay the spot Bitcoin",
                text: "The invoice is $100,000 divided by the live BTC price. One transfer, one hash, one eternity.",
              },
              {
                step: "03",
                title: "Receive the vacancy",
                text: "A certificate of emptiness. Keep it beside the second passport.",
              },
            ].map((item) => (
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
              <p className="text-[11px] tracking-[0.24em] text-primary/80 uppercase">
                Assets retained
              </p>
              <CardTitle className="font-heading text-3xl">What you keep</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              {KEEP.map((item) => (
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
              <p className="text-[11px] tracking-[0.24em] text-primary/80 uppercase">
                Assets acquired
              </p>
              <CardTitle className="font-heading text-3xl">What we take</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              {TAKE.map((item) => (
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
            <p className="text-[11px] tracking-[0.28em] text-primary/80 uppercase">
              Quiet references
            </p>
            <h2 className="font-heading mt-2 max-w-xl text-4xl sm:text-5xl">
              Clients who cannot be named aloud
            </h2>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {TESTIMONIALS.map((item) => (
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
              <p className="text-[11px] tracking-[0.28em] text-primary/80 uppercase">
                Closing
              </p>
              <h2 className="font-heading text-4xl sm:text-5xl">
                A contract for one eternity
              </h2>
              <p className="max-w-xl text-sm leading-6 text-muted-foreground">
                You are not buying salvation. You are selling the one thing that
                cannot be shown to guests on the boat. The price is{" "}
                {formatUsd(DEAL_USD)}, paid in bitcoin at the live spot rate.
              </p>
              <p className="max-w-xl text-sm leading-6 text-primary">{VAT_LINE}</p>
            </div>
            <div className="flex flex-col items-start justify-center gap-3">
              <PayBitcoinButton className="h-12 px-6 text-base" />
              <p className="max-w-xs break-all font-mono text-[11px] text-muted-foreground">
                bc1q5v3rtce5zrwuw4vvk7v705v5qdrgqj2xuxgsnj
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-primary/15">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-5 py-8 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>Maison Æternum · Private Acquisition Desk · Est. 1666</p>
          <p>{VAT_LINE}</p>
        </div>
      </footer>
    </div>
  );
}
