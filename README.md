# VULCIRA

Luxury Fashion • Cosmetics • Lifestyle

A production-ready luxury ecommerce experience built with Next.js 15, Tailwind CSS v4, and shadcn/ui — optimized for Cloudflare Pages deployment.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript (strict)
- **Styling:** Tailwind CSS v4
- **Components:** shadcn/ui
- **Animation:** Framer Motion
- **Deployment:** Cloudflare Pages via OpenNext

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Cloudflare Deployment

Workers Builds settings (Cloudflare dashboard → Settings → Build):

| Setting | Value |
|---------|-------|
| **Build command** | *(leave empty)* |
| **Deploy command** | `npx wrangler deploy` |
| **Root directory** | `/` |
| **Branch** | `main` (or your active feature branch) |

The project auto-builds during `npm ci` in CI via `postinstall`, so an empty build command works with `npx wrangler deploy`.

Recommended explicit setup (faster, no postinstall build):

| Setting | Value |
|---------|-------|
| **Build command** | `npx opennextjs-cloudflare build` |
| **Deploy command** | `npx opennextjs-cloudflare deploy` |

Local commands:

```bash
npm run cf:build    # Build for Cloudflare Workers
npm run cf:deploy   # Deploy pre-built output
npm run preview     # Local Workers runtime preview
npm run deploy      # Build + deploy
```

## Pages

- **Home** — Cinematic editorial homepage
- **Shop** — Product grid with filtering
- **Collections** — Curated collection pages
- **Journal** — Editorial articles
- **About** — Brand storytelling
- **Contact** — Contact form and FAQ

## Design System

- Primary Background: `#111111`
- Accent: Matte Champagne Gold `#C6A96B`
- Display Font: Cormorant Garamond
- Body Font: Inter
