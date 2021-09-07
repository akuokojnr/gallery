import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import viteFonts from "vite-plugin-fonts";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    reactRefresh(),
    viteFonts({
      google: {
        families: ["Inter"],
      },
    }),
  ],
  esbuild: {
    jsxInject: `import { jsx } from '@emotion/react'`,
  },
});
