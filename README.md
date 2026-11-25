# VULCIRA

Coming-soon waitlist site for **VULCIRA** — global fashion, made accessible.

## Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS v4
- Framer Motion
- Deploy: Cloudflare Workers via [OpenNext](https://opennext.js.org/cloudflare)

## Local dev

```bash
npm install
npm run dev
```

## Cloudflare Workers Builds

| Setting | Value |
|---------|-------|
| **Build command** | *(empty — builds on `postinstall` in CI)* or `npx opennextjs-cloudflare build --dangerouslyUseUnsupportedNextVersion` |
| **Deploy command** | `npx wrangler deploy` |
| **Branch** | `main` |

## Scripts

```bash
npm run build          # Next.js static build
npm run cf:build       # OpenNext worker bundle
npm run deploy         # Build + deploy
```