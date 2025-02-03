import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
  },
  server: {
    host: true,
  },
  build: {
    outDir: "client",
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id
              .toString()
              .split("node_modules/")[1]
              .split("/")[0]
              .toString();
          }
        },
        chunkFileNames: "static/js/client/client-[hash].js",
        entryFileNames: "static/js/client/client-[hash].js",

        assetFileNames: ({ name }) => {
          // if (/\.(gif|jpe?g|png|svg)$/.test(name ?? "")) {
          //   return "static/images/[name]-[hash][extname]";
          // }

          if (/\.css$/.test(name ?? "")) {
            return "static/css/client/client-[hash][extname]";
          }

          // default value
          // ref: https://rollupjs.org/guide/en/#outputassetfilenames
          return "static/media/client/[name]-[hash][extname]";
        },
      },
    },
  },
});
