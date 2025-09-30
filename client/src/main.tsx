import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import usePageview from "./hooks/usePageview";

/**
 * Minimal wrapper to initialize pageview tracking.
 * - Calls the hook which only runs in production and only if VITE_GA_MEASUREMENT_ID is set.
 */
function AppWithTracking() {
  usePageview(import.meta.env.VITE_GA_MEASUREMENT_ID);
  return <App />;
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppWithTracking />
  </React.StrictMode>
);
