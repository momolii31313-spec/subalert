# SubAlert — Landing Page + Cha-Ching Sound

## Step 1: Replace landing page

In Terminal, run:

```bash
cp ~/Downloads/page.tsx "/Users/mmm/Downloads/Claude Projects/subtracker_v2/app/page.tsx"
```

## Step 2: Download cha-ching sound

1. Go to: https://pixabay.com/sound-effects/search/cash-register/
2. Find a "cash register" sound you like (free, no signup needed)
3. Click **Download** → save as `cha-ching.mp3`
4. In Terminal, move it to your project:

```bash
mkdir -p "/Users/mmm/Downloads/Claude Projects/subtracker_v2/public/sounds"
mv ~/Downloads/cha-ching.mp3 "/Users/mmm/Downloads/Claude Projects/subtracker_v2/public/sounds/cha-ching.mp3"
```

## Step 3: Add sound to subscription add

Open this file in your code editor:
```
/Users/mmm/Downloads/Claude Projects/subtracker_v2/components/AddSubscriptionSheet.tsx
```

Find line **125** which says:
```ts
result = await supabase.from('subscriptions').insert(payload);
```

**Right below it**, add these 4 lines:

```ts
if (!result.error) {
  const audio = new Audio('/sounds/cha-ching.mp3');
  audio.play().catch(() => {});
}
```

## Step 4: Test locally

```bash
cd "/Users/mmm/Downloads/Claude Projects/subtracker_v2"
npm run dev
```

Visit `http://localhost:3000` → see new landing page ✅
Log in → add a subscription → hear cha-ching 🎉

## Step 5: Push live

```bash
cd "/Users/mmm/Downloads/Claude Projects/subtracker_v2"
git add .
git commit -m "Add landing page and cha-ching sound"
git push
```

Vercel auto-deploys in ~2 min.
