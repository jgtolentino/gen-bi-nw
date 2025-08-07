#!/bin/bash

# Quick Deploy Script for Northwind Dashboard

set -e

echo "🚀 Deploying Northwind Dashboard to Vercel"
echo "========================================="

# Check if this is first time setup
if [ ! -f ".vercel/project.json" ]; then
    echo "❗ First time deployment detected"
    echo "Running setup script..."
    ./scripts/vercel-setup.sh
fi

# Deploy based on argument
if [ "$1" == "prod" ] || [ "$1" == "production" ]; then
    echo "🚀 Deploying to PRODUCTION..."
    vercel --prod
elif [ "$1" == "preview" ]; then
    echo "👀 Deploying to PREVIEW..."
    vercel
else
    echo "Usage: ./scripts/deploy.sh [prod|preview]"
    echo ""
    echo "Examples:"
    echo "  ./scripts/deploy.sh prod      # Deploy to production"
    echo "  ./scripts/deploy.sh preview   # Deploy to preview"
    exit 1
fi

echo ""
echo "✅ Deployment complete!"