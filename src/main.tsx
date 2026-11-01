import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import { LocaleProvider } from "./lib/i18n";
import { QuoteProvider } from "./lib/quote-context";
import "./app/globals.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LocaleProvider>
      <QuoteProvider>
        <App />
      </QuoteProvider>
    </LocaleProvider>
  </StrictMode>,
);
