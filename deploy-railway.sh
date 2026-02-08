#!/bin/bash

# Railway Deployment Script for Grovescape Website
# This script helps you deploy to Railway quickly

set -e

echo "🚂 Railway Deployment Helper for Grovescape Website"
echo "=================================================="
echo ""

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo "❌ Railway CLI is not installed."
    echo ""
    echo "Would you like to install it? (y/n)"
    read -r install_cli
    
    if [ "$install_cli" = "y" ] || [ "$install_cli" = "Y" ]; then
        echo "📦 Installing Railway CLI..."
        npm install -g @railway/cli
        echo "✅ Railway CLI installed successfully!"
    else
        echo ""
        echo "Please install Railway CLI manually:"
        echo "  npm install -g @railway/cli"
        echo ""
        echo "Or deploy via the Railway Dashboard:"
        echo "  https://railway.app/new"
        exit 1
    fi
fi

echo ""
echo "Select deployment option:"
echo "1. Initialize new Railway project"
echo "2. Deploy to existing Railway project"
echo "3. Add MySQL database"
echo "4. Set environment variables"
echo "5. Run database migrations"
echo "6. View logs"
echo "7. Open Railway dashboard"
echo ""
read -p "Enter your choice (1-7): " choice

case $choice in
    1)
        echo "🚀 Initializing new Railway project..."
        railway login
        railway init
        echo ""
        echo "✅ Project initialized!"
        echo "Next steps:"
        echo "  1. Add a MySQL database: ./deploy-railway.sh (option 3)"
        echo "  2. Set environment variables: ./deploy-railway.sh (option 4)"
        echo "  3. Deploy: railway up"
        ;;
    2)
        echo "🚀 Deploying to Railway..."
        railway up
        echo ""
        echo "✅ Deployment complete!"
        echo "Run database migrations: ./deploy-railway.sh (option 5)"
        ;;
    3)
        echo "🗄️  Adding MySQL database..."
        railway add --database mysql
        echo ""
        echo "✅ MySQL database added!"
        echo "The DATABASE_URL environment variable has been set automatically."
        ;;
    4)
        echo "⚙️  Setting environment variables..."
        echo ""
        echo "Enter JWT_SECRET (or press Enter to generate one):"
        read -r jwt_secret
        
        if [ -z "$jwt_secret" ]; then
            jwt_secret=$(openssl rand -base64 32)
            echo "Generated JWT_SECRET: $jwt_secret"
        fi
        
        railway variables set NODE_ENV=production
        railway variables set JWT_SECRET="$jwt_secret"
        
        echo ""
        echo "Do you want to set AWS S3 credentials? (y/n)"
        read -r set_aws
        
        if [ "$set_aws" = "y" ] || [ "$set_aws" = "Y" ]; then
            echo "Enter AWS_ACCESS_KEY_ID:"
            read -r aws_key
            echo "Enter AWS_SECRET_ACCESS_KEY:"
            read -r aws_secret
            echo "Enter AWS_REGION (e.g., us-east-1):"
            read -r aws_region
            echo "Enter AWS_S3_BUCKET:"
            read -r aws_bucket
            
            railway variables set AWS_ACCESS_KEY_ID="$aws_key"
            railway variables set AWS_SECRET_ACCESS_KEY="$aws_secret"
            railway variables set AWS_REGION="$aws_region"
            railway variables set AWS_S3_BUCKET="$aws_bucket"
        fi
        
        echo ""
        echo "✅ Environment variables set!"
        ;;
    5)
        echo "🗄️  Running database migrations..."
        railway run pnpm run db:push
        echo ""
        echo "✅ Database migrations complete!"
        ;;
    6)
        echo "📋 Opening logs..."
        railway logs
        ;;
    7)
        echo "🌐 Opening Railway dashboard..."
        railway open
        ;;
    *)
        echo "❌ Invalid choice. Please run the script again and select 1-7."
        exit 1
        ;;
esac

echo ""
echo "=================================================="
echo "For more information, see RAILWAY_DEPLOYMENT.md"
