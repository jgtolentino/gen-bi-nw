#!/bin/bash

# Vercel Environment Setup Script for Northwind Dashboard
# This script automates the deployment setup for Vercel

set -e  # Exit on error

echo "🚀 Northwind Dashboard - Vercel Setup"
echo "===================================="

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
else
    echo "✅ Vercel CLI is installed"
fi

# Authenticate to Vercel
echo ""
echo "📝 Authenticating to Vercel..."
echo "Please follow the prompts to log in:"
vercel login

# Link project to Vercel
echo ""
echo "🔗 Linking project to Vercel..."
vercel link

# Environment variables
SUPABASE_URL="https://cxzllzyxwpyptfretryc.supabase.co"
SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN4emxsenl4d3B5cHRmcmV0cnljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIzNzYxODAsImV4cCI6MjA2Nzk1MjE4MH0.b794GEIWE4ZdMAm9xQYAJ0Gx-XEn1fhJBTIIeTro_1g"

# Function to add environment variables
add_env_var() {
    local var_name=$1
    local var_value=$2
    local env_type=$3
    
    echo "Adding $var_name to $env_type environment..."
    echo "$var_value" | vercel env add "$var_name" "$env_type" --yes
}

echo ""
echo "🔐 Setting up environment variables..."

# Add environment variables for all environments
for env in production preview development; do
    echo ""
    echo "Setting up $env environment..."
    add_env_var "NEXT_PUBLIC_SUPABASE_URL" "$SUPABASE_URL" "$env"
    add_env_var "NEXT_PUBLIC_SUPABASE_ANON_KEY" "$SUPABASE_ANON_KEY" "$env"
    
    # React app versions (for backward compatibility)
    add_env_var "REACT_APP_SUPABASE_URL" "$SUPABASE_URL" "$env"
    add_env_var "REACT_APP_SUPABASE_ANON_KEY" "$SUPABASE_ANON_KEY" "$env"
done

echo ""
echo "📋 Verifying environment variables..."
vercel env ls

echo ""
echo "✅ Setup complete! Your environment variables are configured."
echo ""
echo "🚀 To deploy:"
echo "   Production:  vercel --prod"
echo "   Preview:     vercel"
echo ""
echo "📝 To update env vars later:"
echo "   vercel env rm VARIABLE_NAME production"
echo "   vercel env add VARIABLE_NAME production"
echo ""
echo "🔗 Your dashboard will be available at:"
echo "   https://gen-bi-nw.vercel.app (or your custom domain)"
echo ""