import type { IncomingMessage } from "node:http";
import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

import inscribe from "./api/inscribe.js";
import nftMint from "./api/nft-mint.js";
import payWatch from "./api/pay-watch.js";

function readJsonBody(request: IncomingMessage) {
  return new Promise<void>((resolve, reject) => {
    const chunks: Buffer[] = [];
    request.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
    request.on("end", () => {
      const raw = Buffer.concat(chunks).toString("utf8");
      try {
        (request as IncomingMessage & { body?: unknown }).body = raw
          ? JSON.parse(raw)
          : {};
        resolve();
      } catch (error) {
        reject(error);
      }
    });
    request.on("error", reject);
  });
}

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: "inscribe-api",
      configureServer(server) {
        server.middlewares.use(async (request, response, next) => {
          const pathName = request.url?.split("?")[0] ?? "";
          const route =
            pathName === "/api/inscribe"
              ? inscribe
              : pathName === "/api/pay-watch"
                ? payWatch
                : pathName === "/api/nft-mint"
                  ? nftMint
                  : null;
          if (!route) {
            next();
            return;
          }
          try {
            if (request.method === "POST") await readJsonBody(request);
            const wrapped = {
              statusCode: 200,
              setHeader(name: string, value: string) {
                response.setHeader(name, value);
              },
              end(body?: string) {
                response.statusCode = wrapped.statusCode;
                response.end(body);
              },
            };
            await route(request, wrapped);
          } catch (error) {
            response.statusCode = 500;
            response.setHeader("content-type", "application/json");
            response.end(
              JSON.stringify({
                status: "error",
                error:
                  error instanceof Error
                    ? error.message
                    : "inscription desk failed",
              }),
            );
          }
        });
      },
    },
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    host: "127.0.0.1",
    port: 43177,
    strictPort: true,
    proxy: {
      "/api/btc-usd": {
        target: "https://api.coinbase.com",
        changeOrigin: true,
        rewrite: () => "/v2/prices/BTC-USD/spot",
      },
      "/api/eth-usd": {
        target: "https://api.coinbase.com",
        changeOrigin: true,
        rewrite: () => "/v2/prices/ETH-USD/spot",
      },
      "/api/sol-usd": {
        target: "https://api.coinbase.com",
        changeOrigin: true,
        rewrite: () => "/v2/prices/SOL-USD/spot",
      },
    },
  },
  preview: {
    host: "127.0.0.1",
    port: 43177,
    strictPort: true,
  },
});
