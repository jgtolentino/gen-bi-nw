#!/bin/bash

# Fix Vercel Environment Variables
echo "🔧 Fixing Vercel Environment Variables..."

# Set the environment variables for all environments
vercel env add NEXT_PUBLIC_SUPABASE_URL production preview development <<< "https://cxzllzyxwpyptfretryc.supabase.co"
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production preview development <<< "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN4emxsenl4d3B5cHRmcmV0cnljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIzNzYxODAsImV4cCI6MjA2Nzk1MjE4MH0.b794GEIWE4ZdMAm9xQYAJ0Gx-XEn1fhJBTIIeTro_1g"

echo "✅ Environment variables added"

# Trigger a new deployment
echo "🚀 Triggering new deployment..."
vercel --prod

echo "✅ Deployment triggered. Check your dashboard in 2-3 minutes!"