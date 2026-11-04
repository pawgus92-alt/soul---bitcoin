import {
  InsufficientBalanceError,
  NetworkUnavailableError,
  UserRejectedError,
  WalletNotConnectedError,
} from "@/lib/errors";

type PhantomProvider = {
  isPhantom?: boolean;
  publicKey?: { toString: () => string };
  connect: (opts?: { onlyIfTrusted?: boolean }) => Promise<{ publicKey: { toString: () => string } }>;
  disconnect?: () => Promise<void>;
  signAndSendTransaction?: (transaction: unknown) => Promise<{ signature: string }>;
  request?: (args: { method: string; params?: Record<string, unknown> }) => Promise<unknown>;
};

export function phantomProvider(): PhantomProvider | null {
  if (typeof window === "undefined") return null;
  return window.solana ?? null;
}

export async function connectPhantom(): Promise<string> {
  const phantom = phantomProvider();
  if (!phantom?.connect) throw new WalletNotConnectedError();
  try {
    const session = await phantom.connect();
    const address = session.publicKey.toString();
    if (!address) throw new WalletNotConnectedError();
    return address;
  } catch (error) {
    const message = error instanceof Error ? error.message.toLowerCase() : "";
    if (message.includes("reject") || message.includes("cancel")) {
      throw new UserRejectedError();
    }
    throw new WalletNotConnectedError();
  }
}

/**
 * Direct SOL transfer to the seller via the connected wallet.
 * No house key is used. No deposit account exists.
 */
export async function sendSolToSeller(input: {
  from: string;
  seller: string;
  lamports: bigint;
}): Promise<string> {
  const phantom = phantomProvider();
  if (!phantom) throw new WalletNotConnectedError();
  if (typeof phantom.request !== "function") {
    throw new NetworkUnavailableError();
  }
  try {
    const result = await phantom.request({
      method: "solana_signAndSendTransaction",
      params: {
        message: "peer-to-peer",
        to: input.seller,
        lamports: input.lamports.toString(),
        from: input.from,
      },
    });
    if (result && typeof result === "object" && "signature" in result) {
      const signature = result.signature;
      if (typeof signature === "string") return signature;
    }
    throw new InsufficientBalanceError();
  } catch (error) {
    const message = error instanceof Error ? error.message.toLowerCase() : "";
    if (message.includes("reject") || message.includes("cancel")) {
      throw new UserRejectedError();
    }
    if (message.includes("insufficient")) throw new InsufficientBalanceError();
    throw error;
  }
}

export const PHANTOM_DEEP_LINK = (url: string) =>
  `https://phantom.app/ul/browse/${encodeURIComponent(url)}`;
