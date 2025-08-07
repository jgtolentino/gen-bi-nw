# 🚀 Quick Deploy to Vercel - Step by Step

Follow these commands in order:

## 1️⃣ First, login to Vercel (if not already logged in)

```bash
vercel login
```
Choose "Continue with GitHub" and follow the browser prompts.

## 2️⃣ Link your project to Vercel

```bash
vercel link
```

When prompted:
- Set up and deploy: **Y**
- Which scope: Select your account
- Link to existing project? **N** (create new)
- Project name: **gen-bi-nw** (or press Enter for default)
- Directory: **./** (press Enter)

## 3️⃣ Add environment variables

Run these commands one by one:

```bash
# Add Supabase URL
echo "https://cxzllzyxwpyptfretryc.supabase.co" | vercel env add NEXT_PUBLIC_SUPABASE_URL production --yes
echo "https://cxzllzyxwpyptfretryc.supabase.co" | vercel env add NEXT_PUBLIC_SUPABASE_URL preview --yes
echo "https://cxzllzyxwpyptfretryc.supabase.co" | vercel env add NEXT_PUBLIC_SUPABASE_URL development --yes

# Add Supabase Anon Key
echo "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN4emxsenl4d3B5cHRmcmV0cnljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIzNzYxODAsImV4cCI6MjA2Nzk1MjE4MH0.b794GEIWE4ZdMAm9xQYAJ0Gx-XEn1fhJBTIIeTro_1g" | vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production --yes
echo "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN4emxsenl4d3B5cHRmcmV0cnljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIzNzYxODAsImV4cCI6MjA2Nzk1MjE4MH0.b794GEIWE4ZdMAm9xQYAJ0Gx-XEn1fhJBTIIeTro_1g" | vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY preview --yes
echo "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN4emxsenl4d3B5cHRmcmV0cnljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIzNzYxODAsImV4cCI6MjA2Nzk1MjE4MH0.b794GEIWE4ZdMAm9xQYAJ0Gx-XEn1fhJBTIIeTro_1g" | vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY development --yes
```

## 4️⃣ Verify environment variables

```bash
vercel env ls
```

## 5️⃣ Deploy to production

```bash
vercel --prod
```

## 🎉 That's it!

Your dashboard will be live at:
- **Production**: https://gen-bi-nw.vercel.app
- **Preview**: The URL shown in the terminal

## 🔄 For future deployments:

```bash
# Production
vercel --prod

# Preview
vercel
```

Or use the helper scripts:
```bash
./scripts/deploy.sh prod
./scripts/deploy.sh preview
```