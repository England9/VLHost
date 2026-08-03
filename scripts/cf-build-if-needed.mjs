import { existsSync } from "node:fs";
import { execSync } from "node:child_process";

/**
 * Cloudflare Workers Builds runs `npm ci` then `npx wrangler deploy`.
 * When OpenNext is detected, wrangler skips wrangler.jsonc custom builds and
 * calls opennextjs-cloudflare deploy directly — so we build during install in CI.
 */
const isCI =
  process.env.CI === "true" ||
  process.env.CI === "1" ||
  process.env.CF_PAGES === "1" ||
  process.env.WORKERS_CI === "1";

const isBuilt = existsSync(".open-next/worker.js");

if (isCI && !isBuilt) {
  console.log("\n[vulcira] Running OpenNext build for Cloudflare Workers CI...\n");
  execSync("npx opennextjs-cloudflare build", { stdio: "inherit" });
}
