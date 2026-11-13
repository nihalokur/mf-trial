import { federation } from "@module-federation/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "orders",
      filename: "remoteEntry.js",
      exposes: { "./Widget": "./src/Widget.tsx" },
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
  server: { port: 3002, strictPort: true, origin: "http://localhost:3002" }
});
