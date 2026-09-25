# THRIFT NATION — The Underground Marketplace

Instagram-style social thrift marketplace. Every seller = a store at
`thriftnationX{username}`. Fresh drops rise to the homepage. Top brands
pin to the navbar.

## Stack
- Next.js 14 (App Router, Server Components)
- Supabase (Postgres + Auth + Storage)
- Tailwind CSS (Neo-Brutalist design system)
- Google OAuth via Supabase Auth

---

## 🚀 Local Setup

### 1. Install
```bash
npx create-next-app@latest thrift-nation --typescript --tailwind --app
cd thrift-nation
npm install @supabase/supabase-js @supabase/ssr
```

Or just clone this folder and run `npm install`.

### 2. Create Supabase project
1. Go to https://supabase.com → New project.
2. Copy your **Project URL** and **anon key** (Settings → API).
3. Also copy the **service_role key** (used only server-side for checkout).

### 3. Run the SQL schema
Open **Supabase → SQL Editor** → paste everything from `supabase/schema.sql` → Run.

### 4. Create Storage bucket
**Storage → New bucket** → name it `products` → toggle **Public** on.

### 5. Enable Google Auth
1. Supabase → **Authentication → Providers → Google → Enable**.
2. Create Google OAuth creds: https://console.cloud.google.com/apis/credentials
   - Authorized redirect URI: `https://<your-project>.supabase.co/auth/v1/callback`
3. Paste Client ID + Secret into Supabase.
4. Add to **Auth → URL Configuration → Redirect URLs**: `http://localhost:3000/auth/callback`

### 6. Env file
Rename `.env.local.example` → `.env.local` and fill in:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 7. Run
```bash
npm run dev
```
Open http://localhost:3000

---

## 🌍 Deploy to Vercel

1. Push this folder to GitHub.
2. https://vercel.com → Import repo.
3. Add the same 4 env vars in **Vercel → Project → Settings → Environment Variables**.
4. In Supabase **Auth → URL Configuration**, add:
   - Site URL: `https://your-app.vercel.app`
   - Redirect URLs: `https://your-app.vercel.app/auth/callback`
5. Deploy.

---

## 🧭 How it works

| Route | Purpose |
|---|---|
| `/` | Home — top fresh drops, trending stores |
| `/store/thriftnationX{username}` | Instagram-style seller page |
| `/product/{id}` | Product detail + Buy Now |
| `/drop` | 30-sec story-style seller upload |
| `/checkout/{id}` | Slide-up checkout sheet |
| `/orders` | Buyer order history |
| `/profile` | Your store & settings |

## 💡 Adding products fast
Sign in → click the black **+** FAB → 3-step drop (photo → price/size → publish). Under 30 seconds.