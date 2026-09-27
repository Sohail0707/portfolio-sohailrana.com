import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      /*
       * Client build only — in the SSR build these packages are external, and
       * naming them here fails the build.
       *
       * Split the vendors that dominate the bundle. Route-level code splitting
       * is deliberately not used: renderToString in scripts/prerender.mjs would
       * render React.lazy boundaries as their fallback, so every page would
       * prerender empty and undo the SEO work. Splitting by library keeps the
       * prerender intact, lets chunks download in parallel, and means an app
       * code change no longer invalidates ~90 kB of cached vendor code.
       */
      output: isSsrBuild
        ? {}
        : {
            manualChunks: {
              react: ["react", "react-dom", "react-router", "react-router-dom"],
              motion: ["framer-motion"],
              gsap: ["gsap", "@gsap/react"],
            },
          },
    },
  },
}));
