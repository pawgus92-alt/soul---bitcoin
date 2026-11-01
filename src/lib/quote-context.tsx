import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { fetchBtcQuote, type BtcQuote } from "@/lib/bitcoin";

type QuoteState = {
  quote: BtcQuote | null;
  loading: boolean;
  error: string | null;
  refresh: () => void;
};

const QuoteContext = createContext<QuoteState | null>(null);

export function QuoteProvider({ children }: { children: ReactNode }) {
  const [quote, setQuote] = useState<BtcQuote | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(() => {
    const request = fetchBtcQuote();
    setLoading(true);
    setError(null);
    request
      .then((next) => {
        setQuote(next);
        setError(null);
      })
      .catch((reason: unknown) => {
        setError(
          reason instanceof Error
            ? reason.message
            : "The rate desk is silent. Refresh and try again.",
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    refresh();
    const timer = window.setInterval(refresh, 60_000);
    return () => window.clearInterval(timer);
  }, [refresh]);

  const value = useMemo(
    () => ({ quote, loading, error, refresh }),
    [quote, loading, error, refresh],
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
