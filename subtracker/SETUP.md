# SubTracker — Full Setup Guide

Total cost: ~$10/year for a domain. Everything else is free tier.

---

## 1. Supabase (database + auth)

1. Go to https://supabase.com → create project (free tier).
2. Open **SQL Editor** → paste contents of `supabase/schema.sql` → run.
3. **Settings → API**: copy these for later:
   - Project URL
   - `anon` public key
   - `service_role` secret key (needed for workers — keep private)

---

## 2. Domain + Cloudflare

1. Buy a domain (Namecheap, Porkbun, ~$10/year).
2. Add it to **Cloudflare** (free plan).
3. In Cloudflare: **Email → Email Routing → Enable**.
4. Verify the MX records Cloudflare adds.

---

## 3. Resend (sending alert emails)

1. Sign up at https://resend.com.
2. Add your domain → add the DNS records Resend gives you to Cloudflare.
3. Wait for verification (a few minutes).
4. Create an API key → save it.

---

## 4. Anthropic API key

1. Get one at https://console.anthropic.com.
2. Add ~$5 credit (will last thousands of emails on Haiku).

---

## 5. Deploy email parser worker

```bash
cd workers/email-parser
npm install
npx wrangler login
npx wrangler secret put ANTHROPIC_API_KEY
npx wrangler secret put SUPABASE_URL
npx wrangler secret put SUPABASE_SERVICE_KEY
npx wrangler deploy
```

Then in Cloudflare dashboard:
- **Email → Email Routing → Routes**
- Add **Catch-all** rule → Action: **Send to a Worker** → pick `subtracker-email-parser`.

Now any email to `anything@yourdomain.com` runs through the parser.

---

## 6. Deploy cron alerts worker

```bash
cd ../cron-alerts
npm install
npx wrangler secret put SUPABASE_URL
npx wrangler secret put SUPABASE_SERVICE_KEY
npx wrangler secret put RESEND_KEY
npx wrangler secret put FROM_EMAIL    # e.g. alerts@yourdomain.com
npx wrangler secret put SITE_URL      # e.g. https://subtracker.vercel.app
npx wrangler deploy
```

Test it manually:
```bash
npx wrangler dev --test-scheduled
# then: curl "http://localhost:8787/__scheduled?cron=0+9+*+*+*"
```

---

## 7. Deploy web app

```bash
cd ../../web
npm install
cp .env.example .env.local
# Fill in the Supabase URL, anon key, and your forward domain
npm run dev    # test locally at http://localhost:3000
```

Deploy to Vercel:
```bash
npm install -g vercel
vercel
# Add the same env vars in Vercel dashboard
```

Update `NEXT_PUBLIC_SITE_URL` to your real Vercel URL after deploy.

---

## 8. Test the full flow

1. Sign up at your app → check the dashboard.
2. Add a manual subscription with renewal date in 3 days.
3. Tomorrow 9am UTC, you should get an alert email.
4. Forward a real subscription receipt (e.g. Spotify) to your forward alias → should auto-appear in dashboard within ~10 seconds.

---

## Cost summary

| Item | Cost |
|---|---|
| Domain | $10/year |
| Supabase | $0 |
| Vercel | $0 |
| Cloudflare Workers | $0 |
| Cloudflare Email | $0 |
| Resend | $0 (3k emails/mo) |
| Anthropic API | ~$5 initial credit |

**You're live for $15 total first year, ~$10/year after.**
