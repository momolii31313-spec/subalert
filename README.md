# Aura SubTracker — Step 1: Login + Signup

This is iteration 1 of the app. Includes:
- ✅ Signup page (matches Stitch design)
- ✅ Login page (matches Stitch design)
- ✅ Placeholder dashboard
- ✅ Supabase auth wired up

## Setup

### 1. Create Supabase project (if you haven't)
- Go to https://supabase.com
- New project (free tier)
- SQL Editor → run `supabase/schema.sql` from the earlier code

### 2. Install & configure

```bash
npm install
cp .env.example .env.local
```

Fill in `.env.local` with your Supabase values:
- `NEXT_PUBLIC_SUPABASE_URL` → from Supabase: Settings → API → Project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` → from Supabase: Settings → API → anon public key

### 3. Run

```bash
npm run dev
```

Open http://localhost:3000

## What to test

1. Go to `/signup` → create an account → should redirect to `/dashboard`
2. Click "Log out" → should redirect to `/login`
3. Go to `/login` → log in with the account → should reach `/dashboard`
4. Try invalid password → should show error message
5. Toggle password visibility (eye icon on signup)

## When this works, tell me

I'll build the next screen: **Onboarding** (the "forwarding email" intro)
