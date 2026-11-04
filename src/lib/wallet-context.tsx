import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { connectXverse } from "@/lib/web3/bitcoin";
import { connectInjected } from "@/lib/web3/ethereum";
import { connectPhantom } from "@/lib/web3/solana";
import { errorFromUnknown } from "@/lib/errors";
import type { ConnectedWallet, MarketplaceChain, WalletConnector } from "@/types/web3";

type WalletState = {
  wallet: ConnectedWallet | null;
  pending: boolean;
  error: string;
  connect: (connector: WalletConnector) => Promise<ConnectedWallet>;
  disconnect: () => void;
};

const WalletContext = createContext<WalletState | null>(null);

function chainOf(connector: WalletConnector): MarketplaceChain {
  if (connector === "phantom") return "solana";
  if (connector === "xverse") return "bitcoin";
  return "ethereum";
}

export function WalletProvider({ children }: { children: ReactNode }) {
  const [wallet, setWallet] = useState<ConnectedWallet | null>(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  const connect = useCallback(async (connector: WalletConnector) => {
    setPending(true);
    setError("");
    try {
      const address =
        connector === "phantom"
          ? await connectPhantom()
          : connector === "xverse"
            ? await connectXverse()
            : await connectInjected();
      const next = { address, connector, chain: chainOf(connector) };
      setWallet(next);
      return next;
    } catch (reason) {
      const mapped = errorFromUnknown(reason);
      setError(mapped.userMessage);
      throw mapped;
    } finally {
      setPending(false);
    }
  }, []);

  const disconnect = useCallback(() => {
    setWallet(null);
    setError("");
  }, []);

  const value = useMemo(
    () => ({ wallet, pending, error, connect, disconnect }),
    [wallet, pending, error, connect, disconnect],
  );

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
}

export function useWallet() { // eslint-disable-line react-refresh/only-export-components
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used inside WalletProvider");
  }
  return context;
}
