# 🚀 Grovescape Website - Railway Deployment

## Quick Start

**👉 For complete deployment instructions, see [`DEPLOYMENT_GUIDE.md`](./DEPLOYMENT_GUIDE.md)**

This is your **single comprehensive reference** for deploying this application to Railway with Tesla Fleet API integration.

---

## What's Inside

This repository contains:
- **Full-stack web application** (React + Vite frontend, Express + tRPC backend)
- **Tesla Fleet API integration** with OAuth 2.0
- **MySQL database** with Drizzle ORM
- **Railway-ready configuration** files

---

## 📖 Documentation

### Main Guide
- **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** ⭐ **START HERE** - Complete deployment guide (641 lines)

### Additional References
- **[Tesla.md](./Tesla.md)** - Tesla key pair documentation
- **[.env.example](./.env.example)** - Environment variables template

---

## ⚡ Quick Deploy Steps

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/grovescape-website.git
   git push -u origin main
   ```

2. **Deploy to Railway**
   - Go to https://railway.app/new
   - Click "Deploy from GitHub repo"
   - Select this repository
   - Add MySQL database
   - Set environment variables (see DEPLOYMENT_GUIDE.md)

3. **Configure Tesla**
   - Register at https://developer.tesla.com
   - Add credentials to Railway
   - Test OAuth flow

**Full details in [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)**

---

## 🔑 Tesla Integration

This app includes Tesla Fleet API integration with:
- ✅ EC P-256 key pair (already generated)
- ✅ Public key endpoint configured
- ✅ OAuth 2.0 flow ready
- ✅ Private key secured

**Public Key Location:** `client/public/.well-known/appspecific/com.tesla.3p.public-key.pem`  
**Private Key Location:** `server/tesla-private-key.pem` (protected by .gitignore)

---

## 📋 Environment Variables

Required variables (see [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for details):

```bash
NODE_ENV=production
DATABASE_URL=<auto-set-by-railway>
JWT_SECRET=<generate-with-openssl>
TESLA_CLIENT_ID=<from-tesla-portal>
TESLA_CLIENT_SECRET=<from-tesla-portal>
TESLA_REDIRECT_URI=https://your-app.railway.app/api/oauth/callback
```

---

## 🛠️ Local Development

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

---

## 📞 Support

- **Railway:** https://railway.app/dashboard
- **Tesla Developer Portal:** https://developer.tesla.com
- **Railway Docs:** https://docs.railway.app

---

## ✅ Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Railway project created
- [ ] MySQL database added
- [ ] Environment variables set
- [ ] Database migrations run
- [ ] Tesla app registered
- [ ] OAuth flow tested

**See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for complete checklist**

---

**Ready to deploy?** Open [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) and follow the step-by-step instructions! 🚀
