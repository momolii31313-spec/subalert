# SubTracker — $0 Subscription Tracker

Tracks subscriptions, alerts before renewals, auto-detects from forwarded emails.

## Stack
- **Frontend**: Next.js 14 + Tailwind on Vercel (free)
- **Database + Auth**: Supabase (free)
- **Email parsing**: Cloudflare Email Worker + Claude Haiku
- **Cron alerts**: Cloudflare Cron Worker
- **Email sending**: Resend (3k/month free)

## Total cost: $10/year (domain only)

## Setup order
1. Supabase project → run `supabase/schema.sql`
2. Buy domain, add to Cloudflare
3. Sign up at Resend, verify domain
4. Get Anthropic API key
5. Deploy email parser worker
6. Deploy cron worker
7. Deploy web app to Vercel

See `SETUP.md` for full instructions.
