import { Button } from "@/components/ui/button";
import { useMarketplaceCopy } from "@/lib/marketplace-copy";
import { METAMASK_DEEP_LINK } from "@/lib/web3/ethereum";
import { PHANTOM_DEEP_LINK } from "@/lib/web3/solana";
import { XVERSE_DEEP_LINK } from "@/lib/web3/bitcoin";
import { useWallet } from "@/lib/wallet-context";
import type { MarketplaceChain, WalletConnector } from "@/types/web3";

function hostName() {
  if (typeof window === "undefined") return "";
  return window.location.host;
}

function pageUrl() {
  if (typeof window === "undefined") return "";
  return window.location.href;
}

export function ConnectWallet({
  chain,
  onConnected,
}: {
  chain?: MarketplaceChain;
  onConnected?: (address: string) => void;
}) {
  const copy = useMarketplaceCopy();
  const { wallet, pending, error, connect, disconnect } = useWallet();
  const connectors: WalletConnector[] =
    chain === "solana"
      ? ["phantom"]
      : chain === "bitcoin"
        ? ["xverse"]
        : chain === "ethereum"
          ? ["injected"]
          : ["injected", "phantom", "xverse"];

  async function onConnect(connector: WalletConnector) {
    const next = await connect(connector);
    onConnected?.(next.address);
  }

  if (wallet) {
    return (
      <div className="flex flex-wrap items-center gap-3">
        <p className="ms-latin text-[11px] tracking-[0.12em] text-[var(--ms-brass)]">
          {wallet.address.slice(0, 6)}…{wallet.address.slice(-4)}
        </p>
        <Button type="button" variant="outline" size="sm" onClick={disconnect}>
          {copy.disconnect}
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <p className="font-heading text-2xl">{copy.connectTitle}</p>
      <p className="text-sm leading-6 text-[var(--ms-parchment)]/75">{copy.connectBody}</p>
      <div className="flex flex-wrap gap-2">
        {connectors.includes("injected") ? (
          <Button type="button" disabled={pending} onClick={() => void onConnect("injected")}>
            {copy.connectEth}
          </Button>
        ) : null}
        {connectors.includes("phantom") ? (
          <Button type="button" disabled={pending} onClick={() => void onConnect("phantom")}>
            {copy.connectSol}
          </Button>
        ) : null}
        {connectors.includes("xverse") ? (
          <Button type="button" disabled={pending} onClick={() => void onConnect("xverse")}>
            {copy.connectBtc}
          </Button>
        ) : null}
      </div>
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
      <div className="flex flex-wrap gap-3 text-[12px]">
        <a
          className="text-[var(--ms-brass)] underline"
          href={METAMASK_DEEP_LINK(hostName())}
          target="_blank"
          rel="noopener noreferrer"
        >
          {copy.metamaskLink}
        </a>
        <a
          className="text-[var(--ms-brass)] underline"
          href={PHANTOM_DEEP_LINK(pageUrl())}
          target="_blank"
          rel="noopener noreferrer"
        >
          {copy.phantomLink}
        </a>
        <a
          className="text-[var(--ms-brass)] underline"
          href={XVERSE_DEEP_LINK}
          target="_blank"
          rel="noopener noreferrer"
        >
          {copy.xverseLink}
        </a>
      </div>
    </div>
  );
}
