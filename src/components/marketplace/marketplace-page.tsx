import { useEffect } from "react";

import { BuyButton } from "@/components/marketplace/buy-button";
import { NftCard } from "@/components/marketplace/nft-card";
import { ConnectWallet } from "@/components/wallet/connect-wallet";
import { MARKETPLACE_LISTINGS, listingById } from "@/data/listings";
import { listingIdFromHash, useHash } from "@/lib/hash";
import { useMarketplaceCopy } from "@/lib/marketplace-copy";
import { remainingCount } from "@/lib/marketplace-sold";

export function MarketplacePage() {
  const copy = useMarketplaceCopy();
  const hash = useHash();
  const selectedId = listingIdFromHash(hash);
  const selected = selectedId ? listingById(selectedId) : undefined;
  const listings = MARKETPLACE_LISTINGS;

  useEffect(() => {
    const id = selected ? "market-item" : "marketplace";
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [selected]);

  return (
    <main id="marketplace" className="manuscript flex-1">
      <div className="mx-auto w-full max-w-5xl px-5 py-14 md:py-20">
        <header className="text-center">
          <p className="ms-kicker">{copy.kicker}</p>
          <h1 className="font-heading mt-4 text-4xl leading-tight md:text-6xl">
            {copy.heading}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-8">{copy.formula}</p>
          <p className="mx-auto mt-4 max-w-2xl text-[17px] leading-8 text-[var(--ms-parchment)]/75">
            {copy.custody}
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-[17px] leading-8 text-[var(--ms-parchment)]/75">
            {copy.cryptoOnly}
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-[17px] leading-8 text-[var(--ms-parchment)]/75">
            {copy.screening}
          </p>
          <p className="ms-latin mt-4 text-[11px] tracking-[0.14em] text-[var(--ms-brass)]">
            {copy.fee}
          </p>
          <p className="mt-6">
            <a href="#top" className="ms-latin text-[11px] tracking-[0.18em] text-[var(--ms-brass)]">
              {copy.returnDesk}
            </a>
          </p>
        </header>

        <div className="mt-10 flex justify-center">
          <ConnectWallet />
        </div>

        {selected ? (
          <section id="market-item" className="mt-14 border border-[var(--ms-gold)]/40 bg-black/30 p-6 md:p-10">
            <p className="ms-latin text-[10px] tracking-[0.24em] text-[var(--ms-brass)]">
              {selected.latin} · {selected.sin} · {selected.chain}
            </p>
            <h2 className="font-heading mt-2 text-4xl">{selected.latin}</h2>
            <p className="mt-4 font-heading text-3xl text-[var(--ms-brass)]">
              {selected.price} {selected.asset}
            </p>
            <p className="mt-3 text-sm leading-6">
              {copy.seller}: {selected.seller}
            </p>
            <p className="ms-latin mt-2 text-[11px]">
              {copy.remaining(remainingCount(selected.id), selected.editionMax)}
            </p>
            <div className="mt-6">
              <BuyButton listing={selected} />
            </div>
            <p className="mt-6">
              <a href="#marketplace" className="text-[var(--ms-brass)]">
                {copy.returnDesk}
              </a>
            </p>
          </section>
        ) : null}

        <section className="mt-14">
          {listings.length === 0 ? (
            <p>{copy.empty}</p>
          ) : (
            <div className="grid gap-5 md:grid-cols-2">
              {listings.map((listing) => (
                <NftCard
                  key={listing.id}
                  listing={listing}
                  onOpen={(id) => {
                    window.location.hash = `#marketplace/${id}`;
                  }}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
