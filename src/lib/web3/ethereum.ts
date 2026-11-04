import { ETHEREUM_CHAIN_ID } from "@/lib/contracts/addresses";
import {
  InsufficientBalanceError,
  NetworkUnavailableError,
  UserRejectedError,
  WalletNotConnectedError,
  WrongNetworkError,
} from "@/lib/errors";

type EthereumProvider = {
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
  on?: (event: string, handler: (...args: unknown[]) => void) => void;
  removeListener?: (event: string, handler: (...args: unknown[]) => void) => void;
};

export function ethereumProvider(): EthereumProvider | null {
  if (typeof window === "undefined") return null;
  return window.ethereum ?? null;
}

function hexChainId(id: number) {
  return `0x${id.toString(16)}`;
}

function toHexWei(wei: bigint) {
  return `0x${wei.toString(16)}`;
}

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string");
}

export async function connectInjected(): Promise<string> {
  const provider = ethereumProvider();
  if (!provider) throw new WalletNotConnectedError();
  try {
    const accounts = asStringArray(
      await provider.request({ method: "eth_requestAccounts" }),
    );
    const address = accounts[0];
    if (!address) throw new WalletNotConnectedError();
    return address;
  } catch (error) {
    const code = typeof error === "object" && error && "code" in error ? error.code : 0;
    if (code === 4001) throw new UserRejectedError();
    throw new WalletNotConnectedError();
  }
}

export async function ensureEthereumMainnet() {
  const provider = ethereumProvider();
  if (!provider) throw new WalletNotConnectedError();
  const current = String(await provider.request({ method: "eth_chainId" }));
  if (current.toLowerCase() === hexChainId(ETHEREUM_CHAIN_ID)) return;
  try {
    await provider.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: hexChainId(ETHEREUM_CHAIN_ID) }],
    });
  } catch {
    throw new WrongNetworkError();
  }
}

export async function ethereumBalance(address: string): Promise<bigint> {
  const provider = ethereumProvider();
  if (!provider) throw new WalletNotConnectedError();
  const raw = await provider.request({
    method: "eth_getBalance",
    params: [address, "latest"],
  });
  if (typeof raw !== "string") throw new NetworkUnavailableError();
  return BigInt(raw);
}

/**
 * Peer-to-peer native transfer. The destination is the seller.
 * The platform never signs and never receives this value.
 */
export async function sendEthToSeller(input: {
  from: string;
  seller: string;
  wei: bigint;
}): Promise<string> {
  const provider = ethereumProvider();
  if (!provider) throw new WalletNotConnectedError();
  await ensureEthereumMainnet();
  const balance = await ethereumBalance(input.from);
  if (balance < input.wei) throw new InsufficientBalanceError();
  try {
    const hash = await provider.request({
      method: "eth_sendTransaction",
      params: [
        {
          from: input.from,
          to: input.seller,
          value: toHexWei(input.wei),
        },
      ],
    });
    if (typeof hash !== "string" || !hash.startsWith("0x")) {
      throw new NetworkUnavailableError();
    }
    return hash;
  } catch (error) {
    const code = typeof error === "object" && error && "code" in error ? error.code : 0;
    if (code === 4001) throw new UserRejectedError();
    throw error;
  }
}

export const METAMASK_DEEP_LINK = (host: string) =>
  `https://metamask.app.link/dapp/${host}`;
