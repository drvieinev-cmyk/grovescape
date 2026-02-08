# 📋 Railway Deployment - Quick Reference Card

**Print this or keep it handy while deploying!**

---

## 🎯 Step-by-Step Deployment

### 1️⃣ GitHub (5 minutes)
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/grovescape-website.git
git push -u origin main
```

### 2️⃣ Railway - Create Project (2 minutes)
1. Go to: https://railway.app/new
2. Click: "Deploy from GitHub repo"
3. Select: `grovescape-website`
4. Wait for initial build

### 3️⃣ Railway - Add Database (1 minute)
1. Click: "New" → "Database" → "Add MySQL"
2. Done! (DATABASE_URL auto-set)

### 4️⃣ Railway - Environment Variables (3 minutes)
Click service → "Variables" → Add these:

```
NODE_ENV=production
JWT_SECRET=<run: openssl rand -base64 32>
```

### 5️⃣ Railway - Get Domain (1 minute)
1. Settings → Domains → "Generate Domain"
2. Copy domain (e.g., `app-name.railway.app`)

### 6️⃣ Database Migration (2 minutes)
```bash
npm install -g @railway/cli
railway login
railway link
railway run pnpm run db:push
```

### 7️⃣ Tesla Developer Portal (5 minutes)
1. Go to: https://developer.tesla.com
2. Create new app
3. Set redirect URI: `https://YOUR-DOMAIN.railway.app/api/oauth/callback`
4. Set public key URL: `https://YOUR-DOMAIN.railway.app/.well-known/appspecific/com.tesla.3p.public-key.pem`
5. Copy Client ID and Secret

### 8️⃣ Railway - Tesla Variables (2 minutes)
Add to Railway Variables:
```
TESLA_CLIENT_ID=<from-step-7>
TESLA_CLIENT_SECRET=<from-step-7>
TESLA_REDIRECT_URI=https://YOUR-DOMAIN.railway.app/api/oauth/callback
```

### 9️⃣ Verify (2 minutes)
```bash
# Health check
curl https://YOUR-DOMAIN.railway.app/health

# Public key
curl https://YOUR-DOMAIN.railway.app/.well-known/appspecific/com.tesla.3p.public-key.pem

# Open in browser
open https://YOUR-DOMAIN.railway.app
```

---

## ✅ Success Checklist

- [ ] GitHub repo created and pushed
- [ ] Railway project deployed
- [ ] MySQL database added
- [ ] Environment variables set
- [ ] Domain generated
- [ ] Database migrations run
- [ ] Tesla app registered
- [ ] Tesla credentials added
- [ ] Health endpoint returns 200
- [ ] Public key accessible
- [ ] App loads in browser
- [ ] OAuth flow works

---

## 🔑 Environment Variables Cheat Sheet

| Variable | How to Get | Required |
|----------|-----------|----------|
| `NODE_ENV` | Set to `production` | ✅ |
| `DATABASE_URL` | Auto-set by Railway | ✅ |
| `JWT_SECRET` | `openssl rand -base64 32` | ✅ |
| `TESLA_CLIENT_ID` | Tesla Developer Portal | ✅ |
| `TESLA_CLIENT_SECRET` | Tesla Developer Portal | ✅ |
| `TESLA_REDIRECT_URI` | `https://YOUR-DOMAIN.railway.app/api/oauth/callback` | ✅ |
| `AWS_ACCESS_KEY_ID` | AWS Console | ⬜ |
| `AWS_SECRET_ACCESS_KEY` | AWS Console | ⬜ |

---

## 🚨 Common Issues & Fixes

| Issue | Fix |
|-------|-----|
| Build fails | Check Railway logs, verify `pnpm-lock.yaml` committed |
| Database error | Run migrations: `railway run pnpm run db:push` |
| Tesla key 404 | Verify deployment successful, test URL manually |
| OAuth fails | Check redirect URI matches exactly in Tesla portal |
| Env vars not working | Click "Redeploy" after adding variables |

---

## 📞 Quick Links

- **Railway Dashboard:** https://railway.app/dashboard
- **Tesla Portal:** https://developer.tesla.com
- **Full Guide:** `DEPLOYMENT_GUIDE.md` (in this repo)

---

## ⚡ One-Line Commands

```bash
# Generate JWT secret
openssl rand -base64 32

# Test health
curl https://YOUR-DOMAIN.railway.app/health

# View Railway logs
railway logs

# Run migrations
railway run pnpm run db:push

# Convert private key for env var
cat server/tesla-private-key.pem | tr '\n' '|'
```

---

**Total Time: ~25 minutes** ⏱️

**For detailed instructions, see: `DEPLOYMENT_GUIDE.md`**
