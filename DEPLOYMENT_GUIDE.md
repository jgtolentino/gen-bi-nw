# 🚀 Northwind Dashboard - Vercel Deployment Guide

This guide provides a complete CLI-based deployment workflow for Vercel, with no manual GUI steps required.

## 📋 Prerequisites

- Node.js 16+ installed
- Git repository already set up ([https://github.com/jgtolentino/gen-bi-nw](https://github.com/jgtolentino/gen-bi-nw))
- Vercel account (free tier works)

## 🎯 Quick Start

### Option 1: Automated Setup (Recommended)

```bash
# Run the complete setup script
./scripts/vercel-setup.sh
```

This script will:
1. Install Vercel CLI if needed
2. Authenticate you to Vercel
3. Link your project
4. Set up all environment variables for all environments
5. Verify the configuration

### Option 2: Quick Deploy (After Initial Setup)

```bash
# Deploy to production
./scripts/deploy.sh prod

# Deploy to preview
./scripts/deploy.sh preview
```

## 🔧 Manual CLI Commands

### Install Vercel CLI

```bash
npm install -g vercel
```

### Authenticate

```bash
vercel login
```

### Link Project

```bash
vercel link
```

### Add Environment Variables

```bash
# For production
vercel env add NEXT_PUBLIC_SUPABASE_URL production
# Enter: https://cxzllzyxwpyptfretryc.supabase.co

vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
# Enter: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN4emxsenl4d3B5cHRmcmV0cnljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIzNzYxODAsImV4cCI6MjA2Nzk1MjE4MH0.b794GEIWE4ZdMAm9xQYAJ0Gx-XEn1fhJBTIIeTro_1g

# Repeat for preview and development environments
```

### List Environment Variables

```bash
vercel env ls
```

### Deploy

```bash
# Production deployment
vercel --prod

# Preview deployment
vercel
```

## 📁 Scripts Overview

### `scripts/vercel-setup.sh`
Complete initial setup including authentication, project linking, and environment variables.

### `scripts/deploy.sh`
Quick deployment script with environment selection:
- `./scripts/deploy.sh prod` - Deploy to production
- `./scripts/deploy.sh preview` - Deploy to preview

### `scripts/env-sync.sh`
Sync all variables from `.env.example` to Vercel automatically.

## 🔐 Environment Variables

The following variables are automatically configured:

| Variable | Value |
|----------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://cxzllzyxwpyptfretryc.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGc...` (your anon key) |
| `REACT_APP_SUPABASE_URL` | Same as above (for compatibility) |
| `REACT_APP_SUPABASE_ANON_KEY` | Same as above (for compatibility) |

## 🌐 Deployment URLs

After deployment, your dashboard will be available at:

- **Production**: `https://gen-bi-nw.vercel.app`
- **Preview**: `https://gen-bi-nw-[branch-name]-[username].vercel.app`

## 🔄 CI/CD Integration

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

env:
  VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
  VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Install Vercel CLI
        run: npm install --global vercel@latest
      
      - name: Pull Vercel Environment
        run: vercel pull --yes --environment=production --token=${{ secrets.VERCEL_TOKEN }}
      
      - name: Build Project
        run: vercel build --prod --token=${{ secrets.VERCEL_TOKEN }}
      
      - name: Deploy to Vercel
        run: vercel deploy --prebuilt --prod --token=${{ secrets.VERCEL_TOKEN }}
```

## 🛠️ Troubleshooting

### Environment Variables Not Working

```bash
# Remove and re-add
vercel env rm NEXT_PUBLIC_SUPABASE_URL production
vercel env add NEXT_PUBLIC_SUPABASE_URL production
```

### Build Failures

```bash
# Check build logs
vercel logs

# Run build locally
vercel build
```

### Wrong Project Linked

```bash
# Unlink and relink
rm -rf .vercel
vercel link
```

## 📝 Advanced Configuration

### Custom Domain

```bash
vercel domains add yourdomain.com
```

### Region Selection

Edit `vercel.json`:
```json
{
  "regions": ["iad1", "sfo1"]
}
```

### Function Configuration

```json
{
  "functions": {
    "app/api/*": {
      "maxDuration": 10,
      "memory": 1024
    }
  }
}
```

## 🎉 Success Checklist

- [ ] Vercel CLI installed
- [ ] Authenticated to Vercel
- [ ] Project linked
- [ ] Environment variables set for all environments
- [ ] Successfully deployed to preview
- [ ] Successfully deployed to production
- [ ] Dashboard accessible with live Supabase data

---

**Zero manual steps, full automation!** Your Northwind Dashboard is now deployed with complete CLI control. 🚀