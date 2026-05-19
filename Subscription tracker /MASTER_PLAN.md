# Subscription Tracker — Master Plan

## 🎯 What we're building
A subscription tracking app that alerts users 3 days before each charge or trial ends. Users can manually add subscriptions OR forward receipts to an auto-detected email address.

---

## 💰 COST PLAN

### Phase 1: Get app live (Week 1)
| Item | Cost | Required |
|---|---|---|
| Domain name | $10/year | ✅ |
| Supabase (database) | $0 | ✅ |
| Vercel (hosting) | $0 | ✅ |
| Anthropic API credit | $5 | ✅ |
| Resend (sending emails) | $0 (free 3k/mo) | ✅ |
| Cloudflare (email routing) | $0 | ✅ |
| **TOTAL** | **$15 one-time** | |

### Phase 2: Accept payments (Week 2-3)
| Item | Cost |
|---|---|
| Stripe account | $0 to set up |
| Stripe per transaction | 2.9% + $0.30 |

### Phase 3: Scale (Month 2-3+)
| Item | Cost | When |
|---|---|---|
| Domain renewal | $10/year | Yearly |
| Anthropic API (heavier use) | $10-30/mo | When 100+ users |
| Resend Pro | $20/mo | If >3k emails/mo |
| Supabase Pro | $25/mo | If >500MB data |

### Phase 4 (OPTIONAL): App Store
| Item | Cost |
|---|---|
| Apple Developer | $99/year |
| Google Play | $25 one-time |

---

## 💵 PRICING PLAN (what YOU charge users)

### Phase 1 (Month 1-2): FREE
- Goal: Get 100 users
- Charge: $0
- Message: "Free during beta"

### Phase 2 (Month 2-4): Soft launch
**Free tier:**
- Up to 5 subscriptions
- Email alerts only
- Manual add only

**Pro tier: $2.99/month OR $24/year**
- Unlimited subscriptions
- Email forwarding auto-detect
- Spending reports
- Trial-ending alerts

### Phase 3 (Month 4+): Full pricing
**Free tier:**
- Up to 5 subs
- Email alerts only

**Pro: $3.99/month OR $29/year**
- Unlimited subs
- Auto-detect
- SMS alerts
- Spending insights

**Family: $5.99/month OR $49/year**
- Everything in Pro
- Up to 4 accounts
- Shared view

### Bonus revenue: Affiliate links (Month 3+)
- "Cancel this subscription" button → links to cancellation service
- Earn $10-25 per cancellation
- This is where most indie sub trackers make REAL money

---

## 📈 EARNINGS PROJECTION

| Month | Users | Paying | Monthly $ |
|---|---|---|---|
| 1 | 10 | 0 | $0 |
| 3 | 100 | 3 | $9 |
| 6 | 500 | 25 | $75 |
| 12 | 2,000 | 80 | $240 |
| 18 | 5,000 | 250 | $750 |
| 24 | 10,000 | 500 | $1,500+ |

Plus affiliate income on top — could double these.

---

## 🛠️ BUILD ORDER (where we are)

### ✅ STEP 1: Login + Signup (DONE)
- Supabase auth wired
- Aura design system
- Login + signup pages working

### ⬜ STEP 2: Onboarding (NEXT)
- Show forwarding email intro
- "Get my Email" button

### ⬜ STEP 3: Dashboard (empty + populated)
- List subscriptions
- Show monthly/yearly totals
- Add subscription button

### ⬜ STEP 4: Add Subscription
- Manual form
- Popular services quick-add

### ⬜ STEP 5: Subscription Details
- View/edit/cancel a subscription

### ⬜ STEP 6: Alerts page
- Upcoming charges
- Trial expirations
- Weekly summary

### ⬜ STEP 7: Profile/Settings
- Show forwarding email
- Logout
- Privacy

### ⬜ STEP 8: Connect Cloudflare email parser
- Auto-detect subscriptions from forwarded receipts

### ⬜ STEP 9: Connect cron alerts
- Daily 9am email reminders

### ⬜ STEP 10: PWA setup
- Make it installable on phones
- Add to home screen support

### ⬜ STEP 11: Deploy to Vercel
- Get a real URL
- Add custom domain

### ⬜ STEP 12: Add Stripe payments (Month 2+)
- Free vs Pro tiers
- Subscription billing

---

## 🚀 LAUNCH PATH

1. **Week 1-2**: Build all screens (Steps 2-10)
2. **Week 3**: Deploy + test with 5 friends
3. **Week 4**: Post on Reddit (r/SideProject, r/personalfinance, r/Apple)
4. **Month 2**: Post on Product Hunt
5. **Month 2-3**: If 100+ users → add Stripe
6. **Month 4+**: Add affiliate links
7. **Month 6+**: Consider native app if growth justifies it

---

## ⚠️ HONEST TRUTH

- 90% of indie apps make under $100/month forever
- The 10% that work → $1k-100k/month
- $15 to find out which yours is = cheapest business gamble ever
- Most apps die in Month 3-6 from lack of marketing, not lack of features
- **Marketing > Features**. Always.

---

## 📋 TECH STACK SUMMARY

- **Frontend**: Next.js 14 + Tailwind CSS
- **Database + Auth**: Supabase
- **Hosting**: Vercel
- **Email parsing**: Cloudflare Email Worker + Claude Haiku
- **Email sending**: Resend
- **Cron jobs**: Cloudflare Cron
- **Payments (Phase 2)**: Stripe
- **App platform**: PWA (web app installable on phones)
