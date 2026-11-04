import { MARKETPLACE_LISTINGS, PROTOCOL_FEE_BPS } from "./_lib/catalog.js";
import { json, rateLimit } from "./_lib/http.js";

export default async function handler(request, response) {
  if (request.method !== "GET") {
    return json(response, 405, { error: "Listings are read only." });
  }
  if (!rateLimit(request, "listings", 60, 60 * 1000)) {
    return json(response, 429, { error: "The vitrine is occupied. Wait." });
  }
  return json(response, 200, {
    protocolFeeBps: PROTOCOL_FEE_BPS,
    custody: "none",
    rails: ["BTC", "ETH", "SOL"],
    listings: MARKETPLACE_LISTINGS,
  });
}
