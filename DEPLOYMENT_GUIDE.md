# 🚀 Complete Railway Deployment Guide - Grovescape Website with Tesla Integration

**Single-file reference for deploying to Railway with Tesla Fleet API integration**

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [GitHub Setup](#github-setup)
3. [Railway Deployment](#railway-deployment)
4. [Environment Variables](#environment-variables)
5. [Database Setup](#database-setup)
6. [Tesla Fleet API Integration](#tesla-fleet-api-integration)
7. [Verification & Testing](#verification--testing)
8. [Troubleshooting](#troubleshooting)

---

## 1. Prerequisites

### Required Accounts
- ✅ GitHub account (free)
- ✅ Railway account (sign up at https://railway.app)
- ✅ Tesla Developer account (sign up at https://developer.tesla.com)

### Local Setup (Optional)
- Git installed on your machine
- Code editor (VS Code, etc.)

---

## 2. GitHub Setup

### Step 2.1: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `grovescape-website` (or your preferred name)
3. Set to **Private** or **Public** (your choice)
4. **DO NOT** initialize with README, .gitignore, or license
5. Click **"Create repository"**

### Step 2.2: Push Your Code to GitHub

Open terminal in your project directory (`/Users/abhi/Downloads/grovescape-website`) and run:

```bash
# Initialize git repository (if not already done)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit - Grovescape website with Tesla integration"

# Add GitHub remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/grovescape-website.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 2.3: Verify Files Are Protected

Check that sensitive files are NOT in your repository:
- ❌ `server/tesla-private-key.pem` (should be ignored)
- ❌ `.env` files (should be ignored)
- ✅ `client/public/.well-known/appspecific/com.tesla.3p.public-key.pem` (should be included - this is public)

Your `.gitignore` is already configured to protect these files.

---

## 3. Railway Deployment

### Step 3.1: Create New Railway Project

1. Go to https://railway.app/new
2. Click **"Deploy from GitHub repo"**
3. Click **"Configure GitHub App"** (if first time)
4. Select your `grovescape-website` repository
5. Click **"Deploy Now"**

Railway will automatically:
- ✅ Detect your `package.json`
- ✅ Detect `pnpm` as package manager
- ✅ Use the `railway.json` configuration
- ✅ Start building your application

### Step 3.2: Monitor Initial Build

1. Click on your service (should be named after your repo)
2. Go to **"Deployments"** tab
3. Watch the build logs
4. Wait for build to complete (may take 3-5 minutes)

**Note:** The first deployment will fail because environment variables are not set yet. This is expected!

---

## 4. Environment Variables

### Step 4.1: Add MySQL Database

1. In your Railway project, click **"New"** button
2. Select **"Database"**
3. Click **"Add MySQL"**
4. Railway automatically creates `DATABASE_URL` environment variable

### Step 4.2: Set Required Environment Variables

1. Click on your service (not the database)
2. Go to **"Variables"** tab
3. Click **"New Variable"**
4. Add these variables one by one:

#### Required Variables

```bash
NODE_ENV=production
```

```bash
JWT_SECRET=<GENERATE_THIS_BELOW>
```

**To generate JWT_SECRET:**
- Open terminal and run: `openssl rand -base64 32`
- Copy the output and paste as the value

#### AWS S3 Variables (Optional - only if using file uploads)

```bash
AWS_ACCESS_KEY_ID=your-aws-access-key-id
```

```bash
AWS_SECRET_ACCESS_KEY=your-aws-secret-access-key
```

```bash
AWS_REGION=us-east-1
```

```bash
AWS_S3_BUCKET=your-bucket-name
```

### Step 4.3: Get Your Railway Domain

1. Go to **"Settings"** tab
2. Scroll to **"Domains"** section
3. Click **"Generate Domain"**
4. Copy the domain (e.g., `grovescape-production.up.railway.app`)

**Save this domain - you'll need it for Tesla setup!**

---

## 5. Database Setup

### Step 5.1: Run Database Migrations

After your app is deployed and running:

**Option A: Using Railway Dashboard**
1. Go to your service
2. Click **"Settings"** tab
3. Scroll to **"Deploy"** section
4. Under "Custom Start Command", temporarily change to: `pnpm run db:push && pnpm start`
5. Redeploy
6. After successful migration, change back to: `pnpm start`

**Option B: Using Railway CLI** (if installed)
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Link to your project
railway link

# Run migrations
railway run pnpm run db:push
```

---

## 6. Tesla Fleet API Integration

### Step 6.1: Verify Public Key Endpoint

Test that your public key is accessible:

```bash
# Replace with your Railway domain
curl https://your-app.railway.app/.well-known/appspecific/com.tesla.3p.public-key.pem
```

**Expected output:**
```
-----BEGIN PUBLIC KEY-----
MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEXfBm/AgBCjJrZOVTFD1DlTY+TZDs
vtomE9xJVieq2NwJS0NxhYFImTeV8QRuR7QvyTM/Y/K8qWHkY2PmVnOBfw==
-----END PUBLIC KEY-----
```

✅ If you see this, your public key is correctly configured!

### Step 6.2: Register with Tesla Developer Portal

1. Go to https://developer.tesla.com
2. Click **"Sign In"** (use your Tesla account)
3. Navigate to **"My Apps"** or **"Applications"**
4. Click **"Create New App"** or **"Register Application"**

Fill in the application details:

**Application Name:** `Grovescape` (or your app name)

**Description:** `Tesla vehicle integration for Grovescape platform`

**Redirect URI:** 
```
https://your-app.railway.app/api/oauth/callback
```
(Replace `your-app.railway.app` with your actual Railway domain)

**Public Key URL:**
```
https://your-app.railway.app/.well-known/appspecific/com.tesla.3p.public-key.pem
```
(Replace `your-app.railway.app` with your actual Railway domain)

**Scopes:** Select the permissions your app needs:
- ✅ `vehicle_device_data` - Read vehicle data
- ✅ `vehicle_cmds` - Send commands to vehicle
- ✅ `vehicle_charging_cmds` - Control charging
- (Select others as needed)

5. Click **"Create"** or **"Register"**

### Step 6.3: Get Tesla Credentials

After registration, Tesla will provide:
- **Client ID** (e.g., `abc123-def456-ghi789`)
- **Client Secret** (e.g., `secret_xyz789abc456def123`)

**Save these securely!**

### Step 6.4: Add Tesla Credentials to Railway

1. Go back to Railway
2. Click on your service
3. Go to **"Variables"** tab
4. Add these new variables:

```bash
TESLA_CLIENT_ID=<paste-your-client-id>
```

```bash
TESLA_CLIENT_SECRET=<paste-your-client-secret>
```

```bash
TESLA_REDIRECT_URI=https://your-app.railway.app/api/oauth/callback
```
(Replace `your-app.railway.app` with your actual Railway domain)

### Step 6.5: Add Tesla Private Key (Recommended for Production)

**Option A: As Environment Variable (Recommended)**

1. On your local machine, run:
```bash
cat server/tesla-private-key.pem | tr '\n' '|'
```

2. Copy the output (it will look like: `-----BEGIN EC PRIVATE KEY-----|MHcCAQEE...|-----END EC PRIVATE KEY-----|`)

3. In Railway, add variable:
```bash
TESLA_PRIVATE_KEY=<paste-the-output-from-above>
```

**Option B: Use File (Alternative)**

The private key file is already in `server/tesla-private-key.pem` and will be deployed with your code. This works but environment variable is more secure.

### Step 6.6: Redeploy Application

After adding all Tesla variables:

1. Go to **"Deployments"** tab
2. Click **"Redeploy"** on the latest deployment
3. Or push a new commit to GitHub to trigger automatic deployment

---

## 7. Verification & Testing

### Step 7.1: Check Health Endpoint

```bash
curl https://your-app.railway.app/health
```

**Expected output:**
```json
{
  "status": "ok",
  "timestamp": "2026-02-08T05:16:14.123Z",
  "environment": "production"
}
```

### Step 7.2: Check Public Key Endpoint

```bash
curl https://your-app.railway.app/.well-known/appspecific/com.tesla.3p.public-key.pem
```

Should return the public key.

### Step 7.3: Check Main Application

Open in browser:
```
https://your-app.railway.app/
```

Your application should load successfully!

### Step 7.4: Test Tesla OAuth Flow

1. Navigate to your app's Tesla login/connect page
2. Click "Connect Tesla Account"
3. You should be redirected to Tesla's OAuth page
4. Login with your Tesla account
5. Authorize the application
6. You should be redirected back to your app with a success message

### Step 7.5: Check Railway Logs

1. Go to Railway dashboard
2. Click on your service
3. Go to **"Deployments"** tab
4. Click on latest deployment
5. View logs to ensure no errors

---

## 8. Troubleshooting

### Issue: Build Fails

**Symptoms:** Deployment shows "Build failed" or "Crashed"

**Solutions:**
1. Check Railway logs for specific error
2. Verify `package.json` has all dependencies
3. Ensure `pnpm-lock.yaml` is committed to GitHub
4. Check Node.js version compatibility

**Common fixes:**
```bash
# Locally, regenerate lock file
pnpm install
git add pnpm-lock.yaml
git commit -m "Update lock file"
git push
```

### Issue: Database Connection Fails

**Symptoms:** App crashes with database errors

**Solutions:**
1. Verify MySQL database is running in Railway
2. Check `DATABASE_URL` environment variable is set
3. Ensure migrations have been run: `railway run pnpm run db:push`
4. Check database logs in Railway

### Issue: Tesla Public Key Not Found

**Symptoms:** Tesla Developer Portal shows "Public key URL not accessible"

**Solutions:**
1. Verify deployment is successful and running
2. Test URL manually: `curl https://your-app.railway.app/.well-known/appspecific/com.tesla.3p.public-key.pem`
3. Check Railway logs for errors
4. Ensure the route is registered in `server/_core/index.ts`

### Issue: Tesla OAuth Fails

**Symptoms:** Redirect fails or shows "Invalid client" error

**Solutions:**
1. Verify `TESLA_CLIENT_ID` and `TESLA_CLIENT_SECRET` are correct
2. Check `TESLA_REDIRECT_URI` matches exactly what's in Tesla Developer Portal
3. Ensure redirect URI uses HTTPS (Railway provides this automatically)
4. Check Tesla Developer Portal app status is "Active"

### Issue: Environment Variables Not Working

**Symptoms:** App can't find configuration values

**Solutions:**
1. Go to Railway → Your Service → Variables
2. Verify all variables are set
3. Click "Redeploy" after adding/changing variables
4. Check for typos in variable names

### Issue: Private Key Not Loading

**Symptoms:** Tesla API signing fails

**Solutions:**
1. If using environment variable, verify `TESLA_PRIVATE_KEY` is set
2. Check the key format (should have `|` as line separators if using env var)
3. Verify file exists if using file-based approach: `server/tesla-private-key.pem`
4. Check file permissions and Railway build logs

---

## 📊 Complete Environment Variables Checklist

Copy this checklist and fill in your values:

```bash
# Required
✅ NODE_ENV=production
✅ DATABASE_URL=<automatically-set-by-railway>
✅ JWT_SECRET=<generate-with-openssl-rand-base64-32>

# Tesla Integration (Required for Tesla features)
✅ TESLA_CLIENT_ID=<from-tesla-developer-portal>
✅ TESLA_CLIENT_SECRET=<from-tesla-developer-portal>
✅ TESLA_REDIRECT_URI=https://your-app.railway.app/api/oauth/callback
✅ TESLA_PRIVATE_KEY=<optional-but-recommended>

# AWS S3 (Optional - only if using file uploads)
⬜ AWS_ACCESS_KEY_ID=<your-aws-key>
⬜ AWS_SECRET_ACCESS_KEY=<your-aws-secret>
⬜ AWS_REGION=us-east-1
⬜ AWS_S3_BUCKET=<your-bucket-name>
```

---

## 🎯 Quick Reference Commands

### GitHub Commands
```bash
# Initial setup
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/grovescape-website.git
git push -u origin main

# Update deployment
git add .
git commit -m "Update description"
git push
```

### Railway CLI Commands
```bash
# Install CLI
npm install -g @railway/cli

# Login
railway login

# Link project
railway link

# View logs
railway logs

# Run migrations
railway run pnpm run db:push

# Set variable
railway variables set KEY=value

# Open dashboard
railway open
```

### Testing Commands
```bash
# Test health endpoint
curl https://your-app.railway.app/health

# Test public key
curl https://your-app.railway.app/.well-known/appspecific/com.tesla.3p.public-key.pem

# Generate JWT secret
openssl rand -base64 32

# Convert private key for env var
cat server/tesla-private-key.pem | tr '\n' '|'
```

---

## 📝 Deployment Checklist

### Pre-Deployment
- [ ] Code committed to GitHub
- [ ] `.gitignore` configured (private key protected)
- [ ] `package.json` has all dependencies
- [ ] `pnpm-lock.yaml` committed

### Railway Setup
- [ ] Railway account created
- [ ] Project created from GitHub repo
- [ ] MySQL database added
- [ ] All environment variables set
- [ ] Domain generated
- [ ] Initial deployment successful

### Database
- [ ] Migrations run successfully
- [ ] Database connection verified
- [ ] Test data created (if needed)

### Tesla Integration
- [ ] Public key endpoint accessible
- [ ] Tesla Developer account created
- [ ] Application registered in Tesla portal
- [ ] Client ID and Secret obtained
- [ ] Credentials added to Railway
- [ ] OAuth flow tested
- [ ] Vehicle API tested

### Post-Deployment
- [ ] Health endpoint returns 200
- [ ] Main app loads in browser
- [ ] No errors in Railway logs
- [ ] All features working
- [ ] SSL/HTTPS working (automatic with Railway)

---

## 🔗 Important URLs

### Your Application
- **Main App:** `https://your-app.railway.app`
- **Health Check:** `https://your-app.railway.app/health`
- **Tesla Public Key:** `https://your-app.railway.app/.well-known/appspecific/com.tesla.3p.public-key.pem`
- **API:** `https://your-app.railway.app/api/trpc`

### External Services
- **Railway Dashboard:** https://railway.app/dashboard
- **Tesla Developer Portal:** https://developer.tesla.com
- **GitHub Repository:** `https://github.com/YOUR_USERNAME/grovescape-website`

---

## 📞 Support Resources

- **Railway Docs:** https://docs.railway.app
- **Railway Discord:** https://discord.gg/railway
- **Tesla Fleet API Docs:** https://developer.tesla.com/docs/fleet-api
- **Railway Status:** https://status.railway.app

---

## 🎉 Success Criteria

Your deployment is successful when:

✅ Railway deployment shows "Active" status  
✅ Health endpoint returns `{"status":"ok"}`  
✅ Main application loads in browser  
✅ Database connection working  
✅ Tesla public key accessible  
✅ Tesla OAuth flow completes successfully  
✅ No errors in Railway logs  
✅ All environment variables set correctly  

---

## 💡 Pro Tips

1. **Automatic Deployments:** Every push to `main` branch triggers automatic deployment
2. **Rollback:** Use Railway dashboard to rollback to previous deployment if needed
3. **Monitoring:** Check Railway metrics for CPU, memory, and network usage
4. **Logs:** Use `railway logs --follow` to stream logs in real-time
5. **Custom Domain:** Add your own domain in Railway Settings → Domains
6. **Staging Environment:** Create a separate Railway project for staging
7. **Environment Sync:** Use Railway CLI to sync variables between environments
8. **Secrets Management:** Never commit secrets - always use environment variables

---

## 🔐 Security Best Practices

✅ **DO:**
- Use environment variables for all secrets
- Enable HTTPS (Railway does this automatically)
- Rotate JWT_SECRET periodically
- Monitor access logs
- Keep dependencies updated
- Use strong passwords for Tesla account

❌ **DON'T:**
- Commit `.env` files
- Commit private keys
- Share Tesla Client Secret
- Use weak JWT secrets
- Expose database credentials
- Disable HTTPS

---

## 📈 Next Steps After Deployment

1. **Set up monitoring:** Configure alerts in Railway
2. **Add custom domain:** Point your domain to Railway
3. **Set up backups:** Configure database backups
4. **Performance testing:** Test under load
5. **Security audit:** Review security settings
6. **Documentation:** Document your API endpoints
7. **User testing:** Test all features end-to-end

---

**🎊 Congratulations!** You now have a complete reference for deploying Grovescape to Railway with Tesla Fleet API integration!

**Last Updated:** 2026-02-08  
**Version:** 1.0  
**Status:** Production Ready ✅
