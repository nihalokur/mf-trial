import React from "react";
import { createRoot } from "react-dom/client";
import { AppProviders } from "@canvas/shared";
import "@canvas/shared/styles.css";
import "antd/dist/reset.css";
import { startMockApi } from "@canvas/mock-api/browser";
import App from "./App";
import "./canvas.css";

await startMockApi();

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppProviders><App /></AppProviders>
  </React.StrictMode>
);
