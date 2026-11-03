import {
  CuratorSection,
  GateRiddle,
  HouseNav,
  ManifestSection,
  MirrorRoom,
  OwnersWall,
} from "@/components/house-chambers";
import { LanguageSwitcher } from "@/components/language-switcher";
import { DealButtons, PayBitcoinButton } from "@/components/pay-bitcoin-button";
import { SoulCertificate } from "@/components/soul-certificate";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatBtc, formatUsd } from "@/lib/bitcoin";
import {
  BTC_ADDRESS,
  BTC_REGULAR_AMOUNT,
  ETH_ADDRESS,
  ETH_HALF_AMOUNT,
  ETH_ONE_AMOUNT,
  ETH_TWO_AMOUNT,
  SOL_ADDRESS,
  SOL_COMMON_AMOUNT,
  cleanseSolAmount,
  formatSolLabel,
} from "@/lib/deal";
import { useI18n } from "@/lib/i18n";
import { useNftSupply } from "@/lib/nft-supply";
import { useBtcQuote } from "@/lib/quote-context";
import { sinLadderClass, sinLadderWidthPct } from "@/lib/sins";

function NftCaps() {
  const { copy } = useI18n();
  const supply = useNftSupply();
  return (
    <ul className="space-y-1 text-[11px] leading-5 text-primary/80">
      <li>{copy.nftRemaining(supply.bitcoin.remaining, supply.bitcoin.max, "bitcoin")}</li>
      <li>{copy.nftLuckyRemaining(supply.lucky.remaining, supply.lucky.max)}</li>
      <li>
        {copy.nftRemaining(supply.ethereum.remaining, supply.ethereum.max, "ethereum")}
      </li>
      <li>{copy.nftEthHalfRemaining(supply.ethHalf.remaining, supply.ethHalf.max)}</li>
      <li>{copy.nftEthOneRemaining(supply.ethOne.remaining, supply.ethOne.max)}</li>
      <li>{copy.nftEthTwoRemaining(supply.ethTwo.remaining, supply.ethTwo.max)}</li>
    </ul>
  );
}

function LivePrice({
  assets = ["btc"],
}: {
  assets?: Array<"btc" | "eth" | "sol">;
}) {
  const { copy } = useI18n();
  const { quote, ethQuote, solQuote, loading, error, refresh } = useBtcQuote();
  const showBtc = assets.includes("btc");
  const showEth = assets.includes("eth");
  const showSol = assets.includes("sol");

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
    <div className="space-y-1 font-mono text-sm text-muted-foreground">
      {showBtc ? (
        <p>
          {BTC_REGULAR_AMOUNT} BTC · {formatUsd(quote.usdAmount)} ·{" "}
          {formatUsd(quote.usdPerBtc)} / BTC · Coinbase
        </p>
      ) : null}
      {showEth && ethQuote ? (
        <>
          <p>
            {ETH_HALF_AMOUNT} ETH · {formatUsd(ethQuote.usdPerEth * ETH_HALF_AMOUNT)} ·{" "}
            {formatUsd(ethQuote.usdPerEth)} / ETH · Coinbase
          </p>
          <p>
            {ETH_ONE_AMOUNT} ETH · {formatUsd(ethQuote.usdPerEth * ETH_ONE_AMOUNT)}
          </p>
          <p>
            {ETH_TWO_AMOUNT} ETH · {formatUsd(ethQuote.usdPerEth * ETH_TWO_AMOUNT)}
          </p>
        </>
      ) : null}
      {showSol && solQuote ? (
        <p>
          {formatUsd(solQuote.usdPerSol)} / SOL · Coinbase
        </p>
      ) : null}
    </div>
  );
}

export default function App() {
  const { copy, locale } = useI18n();
  const { quote, ethQuote, solQuote } = useBtcQuote();
  const kicker =
    locale === "en"
      ? "text-[11px] tracking-[0.28em] text-primary/80 uppercase"
      : "text-[11px] tracking-[0.16em] text-primary/80 uppercase";

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
          <nav className="hidden max-w-3xl flex-wrap items-center justify-end gap-x-5 gap-y-1 text-[11px] tracking-[0.16em] text-muted-foreground uppercase md:flex">
            <HouseNav />
            <a href="#terms" className="hover:text-primary">
              {copy.navTerms}
            </a>
            <a href="#inventory" className="hover:text-primary">
              {copy.navInventory}
            </a>
            <a href="#clients" className="hover:text-primary">
              {copy.navClients}
            </a>
            <a href="#folio" className="hover:text-primary">
              {copy.navFolio}
            </a>
            <a href="#cleanse" className="hover:text-primary">
              {copy.navCleanse}
            </a>
            <a href="#contract" className="hover:text-primary">
              {copy.navContract}
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <DealButtons
              className="hidden sm:flex"
              desks="bitcoin"
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
            <p className="font-heading max-w-xl text-2xl italic leading-snug text-primary sm:text-3xl">
              {copy.siteSlogan}
            </p>
            <p className="max-w-lg text-base leading-7 text-muted-foreground sm:text-lg">
              {copy.heroBody(quote ? formatUsd(quote.usdAmount) : "1 BTC")}
            </p>
            <div className="flex flex-col gap-3">
              <DealButtons
                desks="bitcoin"
                buttonClassName="h-12 px-6 text-base"
              />
              <p className="max-w-lg text-xs leading-5 text-primary">
                {copy.luckyHint}
              </p>
              <a
                href="#contract"
                className="max-w-lg text-xs leading-5 text-muted-foreground hover:text-primary"
              >
                {copy.otherDesksHint}
              </a>
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
                {formatBtc(BTC_REGULAR_AMOUNT)}
              </CardTitle>
              <LivePrice />
            </CardHeader>
            <CardContent className="space-y-4 pt-1">
              <ul className="space-y-3 text-sm leading-6 text-muted-foreground">
                <li>{copy.skuBulletOne}</li>
                <li>
                  {copy.skuBulletSettle(
                    quote ? formatUsd(quote.usdAmount) : "1 BTC",
                  )}
                </li>
                <li>
                  {copy.skuBulletEth(
                    ethQuote
                      ? formatUsd(ethQuote.usdPerEth * ETH_HALF_AMOUNT)
                      : "0.5 ETH",
                  )}
                </li>
                <li>
                  {copy.skuBulletSol(
                    solQuote
                      ? formatUsd(solQuote.usdPerSol * SOL_COMMON_AMOUNT)
                      : "0.5 SOL",
                  )}
                </li>
                <li>{copy.skuBulletNft}</li>
                <li>{copy.skuBulletLucky}</li>
                <li>{copy.skuBulletRefund}</li>
                <li>{copy.vatLine}</li>
              </ul>
              <NftCaps />
              <Separator className="bg-primary/15" />
              <p className="text-xs leading-5 text-muted-foreground">
                {copy.skuFoot(quote ? formatUsd(quote.usdAmount) : "1 BTC")}
              </p>
            </CardContent>
          </Card>
        </section>

        <ManifestSection />
        <GateRiddle />

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

        <section id="cleanse" className="border-y border-primary/10 bg-black/10">
          <div className="mx-auto w-full max-w-6xl px-5 py-16">
            <p className={kicker}>{copy.cleanseKicker}</p>
            <h2 className="font-heading mt-2 max-w-2xl text-4xl sm:text-5xl">
              {copy.cleanseHeading}
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground">
              {copy.cleanseBody}
            </p>
            {locale === "zh" ? (
              <Card className="mt-10 border-[#c9a227]/45 bg-card/80">
                <CardHeader>
                  <p className={kicker}>{copy.faKicker}</p>
                  <CardTitle className="font-heading text-4xl text-primary sm:text-5xl">
                    {copy.faHeading}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                  <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
                    {copy.faBody}
                  </p>
                  <PayBitcoinButton
                    kind="fa"
                    className="h-12 px-6 text-base"
                  />
                </CardContent>
              </Card>
            ) : null}
            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {copy.sinDegrees.map((item) => (
                <Card
                  key={item.degree}
                  className={sinLadderClass(item.degree, item.reserved)}
                >
                  <CardHeader>
                    <div className="mb-2 h-[2px] w-full bg-black/50">
                      <div
                        className="h-[2px] bg-primary"
                        style={{ width: `${sinLadderWidthPct(item.degree)}%` }}
                      />
                    </div>
                    <p className={kicker}>{item.kicker}</p>
                    <CardTitle className="font-heading text-3xl text-primary">
                      {item.title}
                    </CardTitle>
                    {item.reserved ? null : (
                      <p className="font-heading text-2xl tracking-wide text-[#e4c36a]">
                        {formatSolLabel(cleanseSolAmount(item.degree))}
                      </p>
                    )}
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-6 text-muted-foreground">
                      {item.text}
                    </p>
                    {item.reserved ? (
                      <p className="mt-4 text-[11px] tracking-[0.16em] text-primary/80 uppercase">
                        {copy.cleanseReserved}
                      </p>
                    ) : null}
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-8">
              <PayBitcoinButton
                kind="cleanse"
                className="h-12 px-6 text-base"
              />
            </div>
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

        <section id="folio" className="border-y border-primary/10 bg-black/25">
          <div className="mx-auto w-full max-w-6xl px-5 py-16">
            <p className={kicker}>{copy.folioKicker}</p>
            <h2 className="font-heading mt-2 max-w-2xl text-4xl sm:text-5xl">
              {copy.folioHeading}
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground">
              {copy.folioBody}
            </p>
            <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <SoulCertificate
                compact
                kind="buy"
                holder="Baron von Ledger"
                serial="AE-1666-B01-7F3A9C2E41D8"
                digest="7f3a9c2e41d80112233445566778899aabbccddeeff00112233445566778899"
                btcAmount="1.00000000 BTC"
                issuedAt={new Date("1666-06-06T16:06:00Z")}
                receiveAddress="bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"
                nftChain="bitcoin"
                edition={3}
                editionMax={10}
              />
              <SoulCertificate
                compact
                kind="lucky"
                holder="Comtesse de la Yacht"
                serial="AE-1666-B88-A1B2C3D4E5F6"
                digest="0a1b2c3d4e5f6aabbccddeeff00112233445566778899aabbccddeeff001122"
                btcAmount="8.00000000 BTC"
                issuedAt={new Date("1666-06-06T16:06:00Z")}
                receiveAddress="bc1qw508d6qejxtdg4y5r3zarvary0c5xw7kv8f3t4"
                nftChain="bitcoin"
                edition={10}
                editionMax={10}
              />
              <SoulCertificate
                compact
                kind="ethTwo"
                holder="Duc de Gwei"
                serial="AE-1666-E2-F00D1E5C0FFE"
                digest="51f00d1e5c0ffe9876543210aabbccddeeff00112233445566778899aabbccdd"
                btcAmount="2.00000000 ETH"
                issuedAt={new Date("1666-06-06T16:06:00Z")}
                receiveAddress="0x1111111111111111111111111111111111111111"
                nftChain="ethereum"
                edition={15}
                editionMax={15}
              />
              <SoulCertificate
                compact
                kind="eth"
                holder="Knyaz Pustoy"
                serial="AE-1666-E88-F00D1E5C0FFE"
                digest="e88f00d1e5c0ffe9876543210aabbccddeeff00112233445566778899aabb"
                btcAmount="0.08800000 ETH"
                issuedAt={new Date("1666-06-06T16:06:00Z")}
                receiveAddress="0x2222222222222222222222222222222222222222"
                nftChain="ethereum"
                edition={1}
                editionMax={1}
              />
              <SoulCertificate
                compact
                kind="cleanse"
                holder="One Wrong PDF"
                serial="AE-1666-S888-5E6F7A8B9C0D"
                digest="5e6f7a8b9c0d112233445566778899aabbccddeeff00112233445566778899"
                btcAmount="8.88000000 SOL"
                issuedAt={new Date("1666-06-06T16:06:00Z")}
                receiveAddress="HzPdKs4nWxqQj8vY2nR5tLmA7cF9bE3wG6hJ1uS0qXyz"
                nftChain="solana"
                sinDegree={8}
                edition={1}
                editionMax={1}
              />
              <SoulCertificate
                compact
                kind="sol"
                holder="The Seeker"
                serial="AE-1666-S88-COFFEEBABE01"
                digest="c0ffeebabe0112233445566778899aabbccddeeff00112233445566778899a06"
                btcAmount="0.88000000 SOL"
                issuedAt={new Date("1666-06-06T16:06:00Z")}
                receiveAddress="7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU"
                nftChain="solana"
              />
            </div>
          </div>
        </section>

        <CuratorSection />
        <OwnersWall />
        <MirrorRoom />

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
          <div className="space-y-10 border border-primary/20 bg-card/60 p-6 md:p-10">
            <div className="grid gap-10 md:grid-cols-[1fr_auto]">
              <div className="space-y-4">
                <p className={kicker}>{copy.closing}</p>
                <h2 className="font-heading text-4xl sm:text-5xl">
                  {copy.contractHeading}
                </h2>
                <p className="max-w-xl text-sm leading-6 text-muted-foreground">
                  {copy.contractBody(quote ? formatUsd(quote.usdAmount) : "1 BTC")}
                </p>
                <p className="max-w-xl text-sm leading-6 text-primary">
                  {copy.vatLine}
                </p>
              </div>
              <div className="flex flex-col items-start justify-center gap-3">
                <p className="max-w-xs break-all font-mono text-[11px] text-muted-foreground">
                  BTC {BTC_ADDRESS}
                </p>
                <p className="max-w-xs break-all font-mono text-[11px] text-muted-foreground">
                  ETH {ETH_ADDRESS}
                </p>
                <p className="max-w-xs break-all font-mono text-[11px] text-muted-foreground">
                  SOL {SOL_ADDRESS}
                </p>
              </div>
            </div>
            <div className="space-y-4 border-t border-primary/15 pt-8">
              <p className={kicker}>{copy.altDesksKicker}</p>
              <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
                {copy.ethHint}
              </p>
              <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
                {copy.midClassHint}
              </p>
              <LivePrice assets={["eth", "sol"]} />
              <DealButtons
                desks="alt"
                buttonClassName="h-12 px-6 text-base"
              />
              <NftCaps />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-primary/15">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-5 py-8 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>{copy.footerDesk}</p>
          <p className="italic text-primary">{copy.siteSlogan}</p>
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
