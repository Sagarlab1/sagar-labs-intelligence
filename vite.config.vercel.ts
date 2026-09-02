import { defineConfig } from "vite";
import vinext from "vinext";
import { nitro } from "nitro/vite";

// Vercel uses Nitro's Vercel preset. The Cloudflare/Sites integration remains
// in vite.config.ts for the existing local and Sites deployment workflow.
export default defineConfig({
  plugins: [vinext(), nitro()],
});
