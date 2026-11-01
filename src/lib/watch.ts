export type PaymentWatch = {
  chain: "bitcoin" | "solana";
  address: string;
  expected: number;
  received: number;
  paid: boolean;
  txid: string | null;
  confirmed: boolean;
  explorer: string;
  error?: string;
};

export async function watchDeskPayment(input: {
  chain: "bitcoin" | "solana";
  address: string;
  expected: number;
  mint?: string;
}): Promise<PaymentWatch> {
  const params = new URLSearchParams({
    chain: input.chain,
    address: input.address,
    expected: String(Math.round(input.expected)),
  });
  if (input.mint) params.set("mint", input.mint);
  const response = await fetch(`/api/pay-watch?${params}`, {
    headers: { accept: "application/json" },
  });
  const data = (await response.json()) as PaymentWatch;
  if (!response.ok) {
    throw new Error(data.error || `watch failed: ${response.status}`);
  }
  return data;
}
