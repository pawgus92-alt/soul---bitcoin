export type PaymentWatch = {
  chain: "bitcoin" | "solana" | "ethereum";
  address: string;
  expected: string;
  received: string;
  paid: boolean;
  txid: string | null;
  confirmed: boolean;
  explorer: string;
  error?: string;
};

export async function watchDeskPayment(input: {
  chain: "bitcoin" | "solana" | "ethereum";
  address: string;
  expected: string | number;
  mint?: string;
  since?: number;
}): Promise<PaymentWatch> {
  const params = new URLSearchParams({
    chain: input.chain,
    address: input.address,
    expected: String(input.expected),
  });
  if (input.mint) params.set("mint", input.mint);
  if (input.since) params.set("since", String(input.since));
  const response = await fetch(`/api/pay-watch?${params}`, {
    headers: { accept: "application/json" },
  });
  const data = (await response.json()) as PaymentWatch;
  if (!response.ok) {
    throw new Error(data.error || `watch failed: ${response.status}`);
  }
  return data;
}
