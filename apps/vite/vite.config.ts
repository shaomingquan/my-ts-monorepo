import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { federation } from "@module-federation/vite";

export default defineConfig(({ mode }) => {
  const isProduction = mode === "production";

  return {
    server: {
      port: 4000,
    },
    build: {
      target: "esnext",
    },
    plugins: [
      react(),
      tsconfigPaths(),
      federation({
        name: "application",
        remotes: {
          "plugin-1": {
            type: "module",
            name: "plugin-1",
            entry: isProduction
              ? "/plugins/plugin-1/remoteEntry.js"
              : "http://localhost:4001/plugins/plugin-1/remoteEntry.js",
          },
          "plugin-2": {
            type: "module",
            name: "plugin-2",
            entry: isProduction
              ? "/plugins/plugin-2/remoteEntry.js"
              : "http://localhost:4002/plugins/plugin-2/remoteEntry.js",
          },
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
  };
});
