import { useState } from "react";

import { AddressScreening } from "@/components/compliance/address-screening";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { listingPriceAtomic } from "@/data/listings";
import { requestScreen } from "@/lib/compliance/client";
import { PROTOCOL_FEE_BPS } from "@/lib/contracts/addresses";
import { errorFromUnknown, ListingUnavailableError, WrongNetworkError } from "@/lib/errors";
import { useMarketplaceCopy } from "@/lib/marketplace-copy";
import { markSold, remainingCount } from "@/lib/marketplace-sold";
import { useWallet } from "@/lib/wallet-context";
import { sendBtcToSeller } from "@/lib/web3/bitcoin";
import { ensureEthereumMainnet, sendEthToSeller } from "@/lib/web3/ethereum";
import { sendSolToSeller } from "@/lib/web3/solana";
import type { ScreenResult } from "@/types/compliance";
import type { MarketplaceListing } from "@/types/web3";

import { ConnectWallet } from "@/components/wallet/connect-wallet";
import { NetworkGuard } from "@/components/wallet/network-guard";

export function BuyButton({ listing }: { listing: MarketplaceListing }) {
  const copy = useMarketplaceCopy();
  const { wallet } = useWallet();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<"connect" | "network" | "screen" | "confirm" | "done">("connect");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [screen, setScreen] = useState<ScreenResult | null>(null);
  const remaining = remainingCount(listing.id);
  const disabled = !listing.buyable || listing.status !== "listed" || remaining <= 0;

  function reset() {
    setStep("connect");
    setError("");
    setScreen(null);
    setPending(false);
  }

  async function begin() {
    reset();
    setOpen(true);
    if (!wallet) {
      setStep("connect");
      return;
    }
    if (wallet.chain !== listing.chain) {
      setStep("network");
      return;
    }
    await runScreen(wallet.address);
  }

  async function afterConnect(address: string) {
    if (listing.chain === "ethereum") {
      setStep("network");
      return;
    }
    await runScreen(address);
  }

  async function afterNetwork() {
    const address = wallet?.address;
    if (!address) {
      setStep("connect");
      return;
    }
    await runScreen(address);
  }

  async function runScreen(address: string) {
    setStep("screen");
    setPending(true);
    setError("");
    try {
      if (listing.chain === "ethereum") {
        try {
          await ensureEthereumMainnet();
        } catch {
          throw new WrongNetworkError();
        }
      }
      const buyer = await requestScreen({ address, chain: listing.chain });
      await requestScreen({ address: listing.seller, chain: listing.chain });
      setScreen(buyer);
      setStep("confirm");
    } catch (reason) {
      setError(errorFromUnknown(reason).userMessage);
    } finally {
      setPending(false);
    }
  }

  async function confirm() {
    if (!wallet) {
      setStep("connect");
      return;
    }
    if (remainingCount(listing.id) <= 0) {
      setError(new ListingUnavailableError().userMessage);
      return;
    }
    setPending(true);
    setError("");
    try {
      const atomic = listingPriceAtomic(listing);
      if (listing.chain === "ethereum") {
        await sendEthToSeller({ from: wallet.address, seller: listing.seller, wei: atomic });
      } else if (listing.chain === "solana") {
        await sendSolToSeller({
          from: wallet.address,
          seller: listing.seller,
          lamports: atomic,
        });
      } else {
        await sendBtcToSeller({ seller: listing.seller, sats: atomic });
      }
      markSold(listing.id);
      setStep("done");
    } catch (reason) {
      setError(errorFromUnknown(reason).userMessage);
    } finally {
      setPending(false);
    }
  }

  return (
    <>
      <Button type="button" disabled={disabled || pending} onClick={() => void begin()}>
        {disabled ? copy.notOffered : copy.buy}
      </Button>
      <Dialog
        open={open}
        onOpenChange={(next) => {
          setOpen(next);
          if (!next) reset();
        }}
      >
        <DialogContent className="manuscript border-[var(--ms-gold)]/40 bg-[#0a0806] text-[var(--ms-parchment)] sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-heading text-3xl">
              {step === "done" ? copy.doneTitle : copy.confirmTitle}
            </DialogTitle>
            <DialogDescription className="text-[var(--ms-parchment)]/70">
              {step === "done" ? copy.doneBody : copy.confirmBody}
            </DialogDescription>
          </DialogHeader>
          {step === "connect" ? (
            <ConnectWallet
              chain={listing.chain}
              onConnected={(address) => void afterConnect(address)}
            />
          ) : null}
          {step === "network" ? (
            <NetworkGuard chain={listing.chain} onReady={() => void afterNetwork()} />
          ) : null}
          {step === "screen" || step === "confirm" ? (
            <div className="space-y-3 text-sm leading-6">
              <p>
                {copy.listedAs} {listing.latin} · {listing.price} {listing.asset}
              </p>
              <p>
                {copy.seller}: {listing.seller}
              </p>
              <p>
                {copy.protocolFee} ({PROTOCOL_FEE_BPS} bps)
              </p>
              <AddressScreening result={screen} waiting={pending && step === "screen"} waitLabel={copy.screeningWait} />
            </div>
          ) : null}
          {error ? <p className="text-sm text-destructive">{error}</p> : null}
          <DialogFooter>
            {step === "confirm" ? (
              <Button type="button" disabled={pending} onClick={() => void confirm()}>
                {copy.confirmWallet}
              </Button>
            ) : null}
            {step === "done" ? (
              <Button type="button" onClick={() => setOpen(false)}>
                {copy.close}
              </Button>
            ) : (
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                {copy.cancel}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
