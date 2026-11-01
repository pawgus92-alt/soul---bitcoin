import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
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
    },
  },
  preview: {
    host: "127.0.0.1",
    port: 43177,
    strictPort: true,
  },
});
