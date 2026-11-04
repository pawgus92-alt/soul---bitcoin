const buckets = new Map();

export function json(response, status, body) {
  response.statusCode = status;
  response.setHeader("content-type", "application/json");
  response.setHeader("cache-control", "no-store");
  response.setHeader("x-content-type-options", "nosniff");
  response.end(JSON.stringify(body));
}

export function clientIp(request) {
  const forwarded = request.headers["x-forwarded-for"];
  if (typeof forwarded === "string" && forwarded.length > 0) {
    return forwarded.split(",")[0].trim();
  }
  return request.socket?.remoteAddress || "unknown";
}

export function rateLimit(request, key, limit, windowMs) {
  const id = `${key}:${clientIp(request)}`;
  const now = Date.now();
  const row = buckets.get(id) || { count: 0, start: now };
  if (now - row.start > windowMs) {
    row.count = 0;
    row.start = now;
  }
  row.count += 1;
  buckets.set(id, row);
  return row.count <= limit;
}

export function csrfAllowed(request) {
  const method = request.method || "GET";
  if (method === "GET" || method === "HEAD") return true;
  const origin = String(request.headers.origin || "");
  const host = String(request.headers.host || "");
  if (!origin) {
    const referer = String(request.headers.referer || "");
    if (!referer) return false;
    try {
      return new URL(referer).host === host;
    } catch {
      return false;
    }
  }
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export async function withTimeout(work, ms = 10_000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  try {
    return await work(controller.signal);
  } finally {
    clearTimeout(timer);
  }
}
