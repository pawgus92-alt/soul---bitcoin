import { Button } from "@/components/ui/button";
import { useMarketplaceCopy } from "@/lib/marketplace-copy";
import { ensureEthereumMainnet } from "@/lib/web3/ethereum";
import { errorFromUnknown } from "@/lib/errors";
import type { MarketplaceChain } from "@/types/web3";
import { useState } from "react";

export function NetworkGuard({
  chain,
  onReady,
}: {
  chain: MarketplaceChain;
  onReady: () => void;
}) {
  const copy = useMarketplaceCopy();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function switchNetwork() {
    setPending(true);
    setError("");
    try {
      if (chain === "ethereum") await ensureEthereumMainnet();
      onReady();
    } catch (reason) {
      setError(errorFromUnknown(reason).userMessage);
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="space-y-3">
      <p className="text-sm leading-6">{copy.networkTitle}</p>
      <Button type="button" disabled={pending} onClick={() => void switchNetwork()}>
        {copy.confirmWallet}
      </Button>
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
    </div>
  );
}
