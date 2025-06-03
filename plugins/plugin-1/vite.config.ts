import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { federation } from "@module-federation/vite";

export default defineConfig({
  base: "/plugins/plugin-1",
  server: {
    port: 4001,
  },
  build: {
    target: "esnext",
    rollupOptions: {
      input: "./src/App.tsx",
      output: {
        format: "esm",
      },
    },
  },
  plugins: [
    react(),
    tsconfigPaths(),
    federation({
      name: "plugin-1",
      filename: "remoteEntry.js",
      exposes: {
        ".": "./src/App.tsx",
      },
      shared: {
        react: {
          singleton: true,
        },
        "react-dom": {
          singleton: true,
        },
      },
    }),
  ],
});
