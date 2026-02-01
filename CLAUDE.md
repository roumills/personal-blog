# Project: spellbook.fyi

## Stack
- Next.js 16 (App Router)
- Notion as CMS
- Tailwind CSS 4
- Deployed on Vercel (auto-deploys from GitHub)

## Commands
- `npm run dev` - local dev server (localhost:3000)
- `npm run build` - production build

## Conventions
- Keep URLs clean (no /posts/ prefix)
- Use Notion for all content management

## Notes
- Both homepage and post pages use ISR (revalidates every 60 seconds)
- Notion-hosted images may expire after ~1 hour on low-traffic posts
- TODO: Implement Cloudinary integration for permanent image URLs

## Teaching Mode
I'm a designer learning to code. When making changes:
- Briefly explain *why* we're doing something, not just what
- Explain new concepts in plain language (avoid jargon, or define it)
- When touching a file, give a one-liner on what that file's job is
