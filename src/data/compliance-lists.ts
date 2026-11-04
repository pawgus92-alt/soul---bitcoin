/**
 * Public block categories. These are not personal data.
 * Local analog to TRM / Chainalysis category names.
 */
export const BLOCKED_CATEGORIES = [
  "sanctions",
  "ofac",
  "eu_sanctions",
  "un_sanctions",
  "darknet_market",
  "mixer",
  "stolen_funds",
  "ransomware",
  "hack",
  "scam",
  "fraud",
  "child_exploitation",
] as const;

export type BlockedCategory = (typeof BLOCKED_CATEGORIES)[number];

/** Well-known public OFAC / mixer samples. Normalized lowercase. */
export const LOCAL_DENYLIST: Record<string, BlockedCategory> = {
  "0x8589427373d6d84e98730d7795d8f6f8731fda16": "mixer",
  "0x722122df12d4e14e13ac3b6895a86e84145b6967": "mixer",
  "0xdd4c48c0b24039969fc16d1cdf626eab821d3384": "mixer",
  "0xd90e2f925da726b50c4ed8d0fb90ad053324f31b": "mixer",
  "0xd82edc6c16b8d6601e5093a20267882e98fc08af": "sanctions",
  "0x7ff9ceac6a60e587cc22a7a7ee1bae5becdd64d0": "sanctions",
  "0x1da5821544e25c636c141ce4125be97f4a1767da": "darknet_market",
  "bc1qa5wkgaew2dkvjrkqqjx79hvsdfvpk0edk76r4p": "sanctions",
  "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa": "sanctions",
};

export function normalizeAddress(address: string) {
  return address.trim().toLowerCase();
}
