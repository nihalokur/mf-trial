import React from "react";
import { createRoot } from "react-dom/client";
import { AppProviders } from "@canvas/shared";
import "@canvas/shared/styles.css";
import "antd/dist/reset.css";
import { startMockApi } from "@canvas/mock-api/browser";
import Widget from "./Widget";

await startMockApi();

createRoot(document.getElementById("root")!).render(
  <React.StrictMode><AppProviders><main className="standalone-widget"><Widget /></main></AppProviders></React.StrictMode>
);
