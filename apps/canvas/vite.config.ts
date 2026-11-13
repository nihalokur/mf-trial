import { federation } from "@module-federation/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { widgets } from "./src/widget-config";

const remoteKeys = {
  customers: "customers",
  orders: "orders",
  customerAddresses: "customerAddresses"
} as const;

const remotes = Object.fromEntries(widgets.map((widget) => [
  remoteKeys[widget.name],
  {
    type: "module",
    name: remoteKeys[widget.name],
    entry: widget.uri,
    entryGlobalName: remoteKeys[widget.name],
    shareScope: "default"
  }
]));

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "canvas",
      remotes,
      dts: false,
      shared: {
        react: { singleton: true },
        "react-dom": { singleton: true },
        antd: { singleton: true },
        "@canvas/shared": { singleton: true },
        "@canvas/event-bus": { singleton: true }
      }
    })
  ],
  server: { port: 5173, strictPort: true }
});
