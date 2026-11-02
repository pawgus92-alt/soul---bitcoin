export default async function handler(request, response) {
  const upstream = await fetch("https://api.coinbase.com/v2/prices/SOL-USD/spot");
  const body = await upstream.text();
  response.statusCode = upstream.status;
  response.setHeader("content-type", "application/json");
  response.setHeader("cache-control", "s-maxage=30, stale-while-revalidate=60");
  response.end(body);
}
