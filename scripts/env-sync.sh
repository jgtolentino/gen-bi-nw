#!/bin/bash

# Environment Variable Sync Script
# Syncs local .env.example values to Vercel

set -e

echo "🔄 Syncing Environment Variables to Vercel"
echo "========================================="

# Check if .env.example exists
if [ ! -f ".env.example" ]; then
    echo "❌ .env.example not found!"
    exit 1
fi

# Parse .env.example and sync to Vercel
while IFS='=' read -r key value; do
    # Skip empty lines and comments
    if [[ -z "$key" || "$key" =~ ^# ]]; then
        continue
    fi
    
    # Remove quotes if present
    value="${value%\"}"
    value="${value#\"}"
    
    echo "📤 Syncing $key..."
    
    # Add to all environments
    for env in production preview development; do
        echo "$value" | vercel env add "$key" "$env" --yes --force 2>/dev/null || true
    done
    
done < .env.example

echo ""
echo "✅ Environment variables synced!"
echo ""
echo "📋 Current variables:"
vercel env ls