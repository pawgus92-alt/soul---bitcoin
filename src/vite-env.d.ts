/// <reference types="vite/client" />

interface EthereumRequest {
  method: string;
  params?: unknown[];
}

interface Window {
  ethereum?: {
    request: (args: EthereumRequest) => Promise<unknown>;
    on?: (event: string, handler: (...args: unknown[]) => void) => void;
    removeListener?: (event: string, handler: (...args: unknown[]) => void) => void;
  };
  solana?: {
    isPhantom?: boolean;
    publicKey?: { toString: () => string };
    connect: (opts?: { onlyIfTrusted?: boolean }) => Promise<{ publicKey: { toString: () => string } }>;
    disconnect?: () => Promise<void>;
    request?: (args: { method: string; params?: Record<string, unknown> }) => Promise<unknown>;
  };
  XverseProviders?: {
    BitcoinProvider?: {
      request: (method: string, payload?: Record<string, unknown>) => Promise<unknown>;
    };
  };
  BitcoinProvider?: {
    request: (method: string, payload?: Record<string, unknown>) => Promise<unknown>;
  };
}
