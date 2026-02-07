# Project: spellbook.fyi

## Stack
- Next.js 16 (App Router)
- Sanity as CMS (Portable Text for content, embedded Studio at /studio)
- Tailwind CSS 4
- Deployed on Vercel (auto-deploys from GitHub)

## Commands
- `npm run dev` - local dev server (localhost:3000)
- `npm run build` - production build

## Conventions
- Keep URLs clean (no /posts/ prefix)
- Use Sanity Studio for all content management (accessible at /studio)

## Notes
- Both homepage and post pages use ISR (revalidates every 60 seconds)
- Images served from Sanity CDN (permanent URLs, no expiration)

## Teaching Mode
I'm a designer learning to code. When making changes:
- Briefly explain *why* we're doing something, not just what
- Explain new concepts in plain language (avoid jargon, or define it)
- When touching a file, give a one-liner on what that file's job is
