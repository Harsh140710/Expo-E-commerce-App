import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { ClerkProvider } from "@clerk/clerk-react";
import { BrowserRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as Sentry from "@sentry/react";

// add clerk authentication using react
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY!;

if (!PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key");
}

const queryClient = new QueryClient();

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
  enableLogs: true,
  integrations: [
     Sentry.replayIntegration()
  ],
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0
});

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BrowserRouter>
            <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
                <QueryClientProvider client={queryClient}>
                    <App />
                </QueryClientProvider>
            </ClerkProvider>
        </BrowserRouter>
    </StrictMode>,
);
