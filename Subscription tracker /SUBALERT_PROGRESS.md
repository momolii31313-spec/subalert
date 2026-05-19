# SubAlert — Progress Save (May 18, 2026)

## 🎉 Current Status: LIVE ON THE INTERNET

**Live URL:** https://subalert-gamma.vercel.app
**GitHub repo:** https://github.com/momolii31313-spec/subalert
**Vercel project:** subalert (under momolii's projects, Hobby/free plan)
**Supabase project:** mibzkhwiayvqowtkuwpb

---

## ✅ COMPLETED (Steps 1-10)

- ✅ **Steps 1-8** — Full app: login/signup, onboarding, dashboard (list + calendar), add/edit subscriptions, subscription detail, alerts page, polished profile
- ✅ **Step 9** — PWA setup (manifest, service worker, icons, install prompt with iOS/Android/Desktop guides)
- ✅ **Step 10** — Deployed to internet:
  - Code pushed to GitHub
  - Deployed to Vercel
  - Env variables configured
  - Supabase redirect URLs updated for production

---

## 🔐 IMPORTANT CREDENTIALS TO REMEMBER

- **GitHub username:** momolii31313-spec
- **GitHub email:** momo.lii.31313@gmail.com (test email)
- **GitHub PAT:** Save it in Notes app — needed for future git pushes
- **Supabase URL:** https://mibzkhwiayvqowtkuwpb.supabase.co
- **Vercel team:** momolii's projects

---

## 📋 WHAT'S LEFT TO DO (Tomorrow)

### Immediate / Polish:
1. **Test the live app** — log in at https://subalert-gamma.vercel.app, confirm everything works (alerts, add sub, etc.)
2. **Fix fake support email** — Currently shows `support@subalert.app` which doesn't exist. Options:
   - Use a real Gmail
   - Hide it from profile
   - Wait until you own subalert.app then set up Cloudflare email routing (RECOMMENDED)

### Big tasks:
3. **Buy domain `subalert.app`** (~$10/year via Cloudflare or Namecheap, ~5 min)
4. **Connect domain to Vercel** (~3 min — point DNS at Vercel)
5. **Update env var `NEXT_PUBLIC_SITE_URL`** to `https://subalert.app` after domain connects
6. **Update Supabase URLs** to `subalert.app` (replace the `-gamma.vercel.app` versions)
7. **Set up Cloudflare email routing** — `support@subalert.app` → your real Gmail (FREE)

### Future steps:
8. **Step 11** — Cloudflare Email Worker + Claude Haiku for auto-detecting subs from forwarded receipts
9. **Step 12** — Resend cron alerts (7/3/1 day before charges)
10. **Step 13** — Stripe payments (free vs $2.99/mo Pro)

---

## 🛠️ KEY COMMANDS TO REMEMBER

### Local dev:
```bash
cd ~/Desktop/subtracker_v2
npm run dev
# Visit http://localhost:3000
```

### Push code changes to live site:
```bash
cd ~/Desktop/subtracker_v2
git add .
git commit -m "Your change description"
git push
# Vercel will auto-deploy in ~1 min
```

### If port 3000 stuck:
```bash
lsof -ti:3000 | xargs kill -9 2>/dev/null
```

---

## 📁 KEY FILES

- `~/Desktop/subtracker_v2/` — Main project folder
- `~/Desktop/subtracker_v2/.env.local` — Local environment variables (DO NOT commit to git, already in .gitignore)
- `~/Desktop/subtracker_v2/components/AuraLogo.tsx` — Bell logo
- `~/Desktop/subtracker_v2/components/InstallPrompt.tsx` — PWA install banner
- `~/Desktop/subtracker_v2/app/profile/ProfileClient.tsx` — Profile page (has the fake support email)

---

## 🎯 RESUME TOMORROW: 3-step plan

1. **Test the live app** end-to-end (15 min)
2. **Buy + connect subalert.app domain** (30 min)
3. **Set up support@subalert.app email forwarding** (10 min)

That gets you a fully professional, public-launchable app by end of tomorrow.

---

## 💡 PRICING/REVENUE PLAN (already locked in)

- **Month 1-2:** FREE — invite first 20-30 users for feedback
- **Month 2-4:** Free tier (5 subs) + Pro $2.99/mo (unlimited)
- **Month 4+:** Add Family $5.99/mo + affiliate cancellation links
- **Year 1 projection:** ~$240/mo by month 12
- **Year 2 projection:** ~$1,500+/mo

---

## 🎊 ACHIEVEMENT UNLOCKED

You went from zero to a deployed, real-world web app in one day:
- ✅ Designed the full app (8 features)
- ✅ Built it on macOS with Next.js + Supabase
- ✅ Set up PWA so users can install it
- ✅ Pushed to GitHub
- ✅ Deployed to Vercel
- ✅ Made it accessible at a real URL

Get some rest — you earned it. 🌙
