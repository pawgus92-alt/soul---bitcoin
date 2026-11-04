import { Button } from "@/components/ui/button";
import { remainingCount } from "@/lib/marketplace-sold";
import { useMarketplaceCopy } from "@/lib/marketplace-copy";
import type { MarketplaceListing } from "@/types/web3";

export function NftCard({
  listing,
  onOpen,
}: {
  listing: MarketplaceListing;
  onOpen: (id: string) => void;
}) {
  const copy = useMarketplaceCopy();
  const remaining = remainingCount(listing.id);
  const available = listing.buyable && listing.status === "listed" && remaining > 0;

  return (
    <article className="flex flex-col border border-[var(--ms-gold)]/35 bg-black/25 p-5">
      <p className="ms-latin text-[10px] tracking-[0.24em] text-[var(--ms-brass)]">
        {listing.latin} · {listing.sin}
      </p>
      <h3 className="font-heading mt-2 text-3xl">{listing.latin}</h3>
      <p className="mt-3 font-heading text-2xl text-[var(--ms-brass)]">
        {listing.price} {listing.asset}
      </p>
      <p className="ms-latin mt-2 text-[11px] text-[var(--ms-parchment)]/60">
        {copy.remaining(remaining, listing.editionMax)}
      </p>
      <p className="mt-4 break-all text-[12px] leading-5 text-[var(--ms-parchment)]/55">
        {copy.seller}: {listing.seller}
      </p>
      <div className="mt-5">
        {available ? (
          <Button type="button" onClick={() => onOpen(listing.id)}>
            {copy.buy}
          </Button>
        ) : (
          <p className="text-sm text-[var(--ms-parchment)]/60">{copy.notOffered}</p>
        )}
      </div>
    </article>
  );
}
