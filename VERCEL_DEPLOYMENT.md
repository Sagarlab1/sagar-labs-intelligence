# Sagar Experience OS — Vercel beta deployment

This repository supports two deployment targets:

- Existing Sites/Cloudflare workflow: `npm run build`
- Vercel beta workflow: `npm run build:vercel`

Vercel is configured in `vercel.json` to run the second command. The Vercel
Nitro preset generates `.vercel/output` using Vercel's Build Output API; it does
not use the default Next.js `.next` output directory.

## Vercel project settings

When importing `Sagarlab1/sagar-labs-intelligence`, leave the Root Directory at
the repository root and use the detected settings from `vercel.json`:

- Build Command: `npm run build:vercel`
- Output Directory: leave the Vercel default so `.vercel/output` is detected
- Install Command: `npm install`

No application secrets are required for the public beta. Add only approved
environment variables in Vercel Project Settings if a future integration needs
them; never commit `.env` files.

## Local verification

```bash
npm run build:vercel
test -f .vercel/output/config.json
```
