# 🚂 Quick Start: Deploy to Railway

This guide will help you deploy the Grovescape website to Railway in just a few minutes.

## Prerequisites

- A [Railway account](https://railway.app) (free tier available)
- Your code pushed to a Git repository (GitHub, GitLab, or Bitbucket)

## 🚀 Fastest Deployment Method (Railway Dashboard)

### Step 1: Create Project
1. Go to [railway.app/new](https://railway.app/new)
2. Click **"Deploy from GitHub repo"**
3. Select your `grovescape-website` repository
4. Railway will automatically detect your application

### Step 2: Add Database
1. In your Railway project, click **"New"** → **"Database"** → **"Add MySQL"**
2. Railway automatically sets the `DATABASE_URL` environment variable

### Step 3: Set Environment Variables
Click on your service → **"Variables"** tab → Add these:

```
NODE_ENV=production
JWT_SECRET=<generate-a-random-32-character-string>
```

**Optional (if using AWS S3):**
```
AWS_ACCESS_KEY_ID=<your-key>
AWS_SECRET_ACCESS_KEY=<your-secret>
AWS_REGION=us-east-1
AWS_S3_BUCKET=<your-bucket>
```

### Step 4: Deploy
Railway will automatically build and deploy your app. Watch the logs to see progress!

### Step 5: Run Database Migrations
After deployment, you need to run migrations:

**Option A: Using Railway CLI**
```bash
npm install -g @railway/cli
railway login
railway link  # Select your project
railway run pnpm run db:push
```

**Option B: Using Railway Dashboard**
1. Go to your service → **"Settings"**
2. Scroll to **"One-off Commands"**
3. Run: `pnpm run db:push`

### Step 6: Get Your URL
1. Go to your service → **"Settings"**
2. Click **"Generate Domain"**
3. Your app is now live! 🎉

## 🛠️ Alternative: Deploy via CLI

### 1. Install Railway CLI
```bash
npm install -g @railway/cli
```

### 2. Use the Helper Script
We've created a helper script to make deployment easier:

```bash
cd /Users/abhi/Downloads/grovescape-website
./deploy-railway.sh
```

Follow the interactive prompts to:
- Initialize your Railway project
- Add MySQL database
- Set environment variables
- Deploy your application
- Run migrations

### 3. Manual CLI Deployment
```bash
# Login to Railway
railway login

# Initialize project
railway init

# Add MySQL database
railway add --database mysql

# Set environment variables
railway variables set NODE_ENV=production
railway variables set JWT_SECRET=$(openssl rand -base64 32)

# Deploy
railway up

# Run migrations
railway run pnpm run db:push
```

## 📋 Environment Variables Checklist

### Required
- ✅ `NODE_ENV` - Set to `production`
- ✅ `DATABASE_URL` - Automatically set when you add MySQL
- ✅ `JWT_SECRET` - Generate with: `openssl rand -base64 32`

### Optional (AWS S3)
- ⬜ `AWS_ACCESS_KEY_ID`
- ⬜ `AWS_SECRET_ACCESS_KEY`
- ⬜ `AWS_REGION`
- ⬜ `AWS_S3_BUCKET`

### Optional (Tesla API)
- ⬜ `TESLA_CLIENT_ID`
- ⬜ `TESLA_CLIENT_SECRET`
- ⬜ `TESLA_REDIRECT_URI`

## 🔍 Verify Deployment

After deployment, check these endpoints:

1. **Health Check**: `https://your-app.railway.app/health`
   - Should return: `{"status":"ok","timestamp":"...","environment":"production"}`

2. **Main App**: `https://your-app.railway.app/`
   - Should load your application

3. **API**: `https://your-app.railway.app/api/trpc`
   - tRPC endpoint should be accessible

## 🐛 Troubleshooting

### Build Fails
- Check Railway logs for specific errors
- Ensure all dependencies are in `package.json`
- Verify `pnpm-lock.yaml` is committed

### Database Connection Issues
- Verify MySQL service is running in Railway
- Check `DATABASE_URL` is set correctly
- Ensure migrations have been run

### App Crashes on Start
- Check environment variables are set
- Review logs: `railway logs`
- Verify build output exists in `dist/` directory

### Port Issues
Railway automatically sets the `PORT` environment variable. The app will use it automatically.

## 📊 Monitoring

Railway provides built-in monitoring:
- **Logs**: Real-time logs in the dashboard
- **Metrics**: CPU, Memory, Network usage
- **Deployments**: Track history and rollback if needed

## 💰 Pricing

- **Hobby Plan**: $5/month + usage
  - Perfect for personal projects
  - 500 hours of execution time
  
- **Pro Plan**: $20/month + usage
  - Better performance
  - More resources
  - Priority support

## 📚 Additional Resources

- [Full Deployment Guide](./RAILWAY_DEPLOYMENT.md) - Detailed documentation
- [Railway Docs](https://docs.railway.app) - Official documentation
- [Railway Discord](https://discord.gg/railway) - Community support
- [Environment Variables Example](./.env.example) - Template for local development

## 🎯 Next Steps

After successful deployment:
1. ✅ Set up a custom domain (optional)
2. ✅ Configure monitoring and alerts
3. ✅ Set up automated backups for your database
4. ✅ Review security settings
5. ✅ Test all application features

---

**Need help?** Check the [full deployment guide](./RAILWAY_DEPLOYMENT.md) or reach out on [Railway Discord](https://discord.gg/railway).
