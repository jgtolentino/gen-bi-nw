#!/bin/bash

# Automated Vercel Setup Script for Northwind Dashboard
# This version minimizes interactive prompts

set -e

echo "🚀 Northwind Dashboard - Automated Vercel Setup"
echo "=============================================="

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
else
    echo "✅ Vercel CLI is installed"
fi

echo ""
echo "📝 Please ensure you're logged in to Vercel"
echo "If not logged in, run: vercel login"
echo ""

# Check if already linked
if [ -f ".vercel/project.json" ]; then
    echo "✅ Project already linked to Vercel"
else
    echo "🔗 Linking project to Vercel..."
    echo "Please follow the prompts to link your project"
    vercel link
fi

# Environment variables
SUPABASE_URL="https://cxzllzyxwpyptfretryc.supabase.co"
SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN4emxsenl4d3B5cHRmcmV0cnljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIzNzYxODAsImV4cCI6MjA2Nzk1MjE4MH0.b794GEIWE4ZdMAm9xQYAJ0Gx-XEn1fhJBTIIeTro_1g"

echo ""
echo "🔐 Setting up environment variables..."

# Function to add environment variables
add_env_var() {
    local var_name=$1
    local var_value=$2
    local env_type=$3
    
    echo "Adding $var_name to $env_type environment..."
    echo "$var_value" | vercel env add "$var_name" "$env_type" --yes --force 2>/dev/null || {
        echo "Variable $var_name may already exist, skipping..."
    }
}

# Add environment variables for all environments
for env in production preview development; do
    echo ""
    echo "Setting up $env environment..."
    add_env_var "NEXT_PUBLIC_SUPABASE_URL" "$SUPABASE_URL" "$env"
    add_env_var "NEXT_PUBLIC_SUPABASE_ANON_KEY" "$SUPABASE_ANON_KEY" "$env"
    add_env_var "REACT_APP_SUPABASE_URL" "$SUPABASE_URL" "$env"
    add_env_var "REACT_APP_SUPABASE_ANON_KEY" "$SUPABASE_ANON_KEY" "$env"
done

echo ""
echo "📋 Current environment variables:"
vercel env ls

echo ""
echo "✅ Setup complete!"
echo ""
echo "🚀 Next steps:"
echo "1. Deploy to production:  vercel --prod"
echo "2. Deploy to preview:     vercel"
echo ""
echo "Or use our deploy script:"
echo "   ./scripts/deploy.sh prod"
echo "   ./scripts/deploy.sh preview"
echo ""