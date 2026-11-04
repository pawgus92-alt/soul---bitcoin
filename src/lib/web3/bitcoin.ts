import {
  NetworkUnavailableError,
  UserRejectedError,
  WalletNotConnectedError,
} from "@/lib/errors";

type XverseProvider = {
  request: (
    method: string,
    payload?: Record<string, unknown>,
  ) => Promise<unknown>;
};

export function xverseProvider(): XverseProvider | null {
  if (typeof window === "undefined") return null;
  const providers = window.XverseProviders;
  if (providers?.BitcoinProvider) return providers.BitcoinProvider;
  return window.BitcoinProvider ?? null;
}

export async function connectXverse(): Promise<string> {
  const provider = xverseProvider();
  if (!provider) throw new WalletNotConnectedError();
  try {
    const result = await provider.request("getAccounts", {
      purposes: ["payment", "ordinals"],
    });
    const rows = Array.isArray(result)
      ? result
      : result && typeof result === "object" && "result" in result
        ? (result as { result: unknown }).result
        : [];
    const list = Array.isArray(rows) ? rows : [];
    const first = list[0];
    const address =
      typeof first === "string"
        ? first
        : first && typeof first === "object" && "address" in first
          ? String((first as { address: string }).address)
          : "";
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
 * PSBT / sendTransfer from the buyer's wallet to the seller.
 * The platform never holds the ordinal or the coin.
 */
export async function sendBtcToSeller(input: {
  seller: string;
  sats: bigint;
}): Promise<string> {
  const provider = xverseProvider();
  if (!provider) throw new WalletNotConnectedError();
  try {
    const result = await provider.request("sendTransfer", {
      recipients: [{ address: input.seller, amount: Number(input.sats) }],
    });
    const txid =
      result && typeof result === "object" && "txid" in result
        ? String((result as { txid: string }).txid)
        : "";
    if (!txid) throw new NetworkUnavailableError();
    return txid;
  } catch (error) {
    const message = error instanceof Error ? error.message.toLowerCase() : "";
    if (message.includes("reject") || message.includes("cancel")) {
      throw new UserRejectedError();
    }
    throw error;
  }
}

export const XVERSE_DEEP_LINK = "https://www.xverse.app/";
