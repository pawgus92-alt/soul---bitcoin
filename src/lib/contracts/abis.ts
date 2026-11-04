/**
 * Minimal ABI for a non-custodial market.
 * The platform never holds the private key of this contract.
 * If MARKET_CONTRACT.ethereum is empty, the desk uses a direct wallet send
 * from buyer to seller instead of this ABI.
 */
export const MARKET_ABI = [
  {
    type: "function",
    name: "buy",
    stateMutability: "payable",
    inputs: [
      { name: "listingId", type: "bytes32" },
      { name: "seller", type: "address" },
    ],
    outputs: [],
  },
  {
    type: "event",
    name: "Purchase",
    inputs: [
      { name: "listingId", type: "bytes32", indexed: true },
      { name: "seller", type: "address", indexed: true },
      { name: "buyer", type: "address", indexed: true },
    ],
  },
] as const;
