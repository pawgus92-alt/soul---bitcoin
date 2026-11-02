import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import {
  fetchBtcQuote,
  fetchEthQuote,
  fetchSolQuote,
  type BtcQuote,
  type EthQuote,
  type SolQuote,
} from "@/lib/bitcoin";
import { useI18n } from "@/lib/i18n";

type QuoteState = {
  quote: BtcQuote | null;
  ethQuote: EthQuote | null;
  solQuote: SolQuote | null;
  loading: boolean;
  ethLoading: boolean;
  solLoading: boolean;
  error: string | null;
  refresh: () => void;
};

const QuoteContext = createContext<QuoteState | null>(null);

export function QuoteProvider({ children }: { children: ReactNode }) {
  const { copy } = useI18n();
  const [quote, setQuote] = useState<BtcQuote | null>(null);
  const [ethQuote, setEthQuote] = useState<EthQuote | null>(null);
  const [solQuote, setSolQuote] = useState<SolQuote | null>(null);
  const [loading, setLoading] = useState(true);
  const [ethLoading, setEthLoading] = useState(true);
  const [solLoading, setSolLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fallbackError = useRef(`${copy.rateDeskSilent} ${copy.fetchRateAgain}.`);
  fallbackError.current = `${copy.rateDeskSilent} ${copy.fetchRateAgain}.`;

  const refresh = useCallback(() => {
    setLoading(true);
    setError(null);
    void fetchBtcQuote()
      .then((next) => {
        setQuote(next);
        setError(null);
      })
      .catch((reason: unknown) => {
        setError(
          reason instanceof Error ? reason.message : fallbackError.current,
        );
      })
      .finally(() => {
        setLoading(false);
      });
    setEthLoading(true);
    void fetchEthQuote()
      .then(setEthQuote)
      .catch(() => setEthQuote(null))
      .finally(() => setEthLoading(false));
    setSolLoading(true);
    void fetchSolQuote()
      .then(setSolQuote)
      .catch(() => setSolQuote(null))
      .finally(() => setSolLoading(false));
  }, []);

  useEffect(() => {
    refresh();
    const timer = window.setInterval(refresh, 60_000);
    return () => window.clearInterval(timer);
  }, [refresh]);

  const value = useMemo(
    () => ({
      quote,
      ethQuote,
      solQuote,
      loading,
      ethLoading,
      solLoading,
      error,
      refresh,
    }),
    [
      quote,
      ethQuote,
      solQuote,
      loading,
      ethLoading,
      solLoading,
      error,
      refresh,
    ],
  );

  return <QuoteContext.Provider value={value}>{children}</QuoteContext.Provider>;
}

export function useBtcQuote() {
  const context = useContext(QuoteContext);
  if (!context) {
    throw new Error("useBtcQuote must be used inside QuoteProvider");
  }
  return context;
}
