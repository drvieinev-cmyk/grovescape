# Railway Deployment Guide for Grovescape Website

## Prerequisites
- Railway account (sign up at https://railway.app)
- Railway CLI installed (optional, for CLI deployment)

## Deployment Steps

### Option 1: Deploy via Railway Dashboard (Recommended)

1. **Create a New Project**
   - Go to https://railway.app/new
   - Click "Deploy from GitHub repo"
   - Select your repository or connect GitHub if needed
   - Select the `grovescape-website` repository

2. **Configure Environment Variables**
   Railway will automatically detect your application. Add these environment variables in the Railway dashboard:

   **Required Variables:**
   ```
   NODE_ENV=production
   DATABASE_URL=<your-mysql-connection-string>
   JWT_SECRET=<generate-a-secure-random-string>
   ```

   **Optional Variables (if using AWS S3):**
   ```
   AWS_ACCESS_KEY_ID=<your-aws-access-key>
   AWS_SECRET_ACCESS_KEY=<your-aws-secret-key>
   AWS_REGION=<your-aws-region>
   AWS_S3_BUCKET=<your-s3-bucket-name>
   ```

   **Optional Variables (if using OAuth):**
   ```
   OAUTH_CLIENT_ID=<your-oauth-client-id>
   OAUTH_CLIENT_SECRET=<your-oauth-client-secret>
   OAUTH_REDIRECT_URI=<your-oauth-redirect-uri>
   ```

3. **Add MySQL Database**
   - In your Railway project, click "New"
   - Select "Database" → "Add MySQL"
   - Railway will automatically create a MySQL instance and set the `DATABASE_URL` variable

4. **Deploy**
   - Railway will automatically build and deploy your application
   - The build process will run: `pnpm install && pnpm run build`
   - The start command will run: `pnpm start`

5. **Generate Domain**
   - Go to your service settings
   - Click "Generate Domain" to get a public URL
   - Or add a custom domain if you have one

### Option 2: Deploy via Railway CLI

1. **Install Railway CLI**
   ```bash
   npm install -g @railway/cli
   ```

2. **Login to Railway**
   ```bash
   railway login
   ```

3. **Initialize Project**
   ```bash
   cd /Users/abhi/Downloads/grovescape-website
   railway init
   ```

4. **Add MySQL Database**
   ```bash
   railway add --database mysql
   ```

5. **Set Environment Variables**
   ```bash
   railway variables set NODE_ENV=production
   railway variables set JWT_SECRET=<your-secret>
   # Add other variables as needed
   ```

6. **Deploy**
   ```bash
   railway up
   ```

## Database Setup

After deployment, you'll need to run database migrations:

### Option 1: Using Railway CLI
```bash
railway run pnpm run db:push
```

### Option 2: Using Railway Dashboard
1. Go to your service in Railway
2. Click on "Deployments"
3. Click on the latest deployment
4. Click "View Logs"
5. You can run one-off commands from the service settings

## Environment Variables Reference

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `NODE_ENV` | Application environment | Yes | `production` |
| `DATABASE_URL` | MySQL connection string | Yes | `mysql://user:pass@host:port/db` |
| `JWT_SECRET` | Secret for JWT token signing | Yes | Random 32+ character string |
| `AWS_ACCESS_KEY_ID` | AWS access key for S3 | No | `AKIAIOSFODNN7EXAMPLE` |
| `AWS_SECRET_ACCESS_KEY` | AWS secret key for S3 | No | `wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY` |
| `AWS_REGION` | AWS region for S3 | No | `us-east-1` |
| `AWS_S3_BUCKET` | S3 bucket name | No | `my-bucket` |
| `PORT` | Server port (auto-set by Railway) | No | `3000` |

## Post-Deployment Checklist

- [ ] Verify the application is running (check Railway logs)
- [ ] Test the public URL
- [ ] Run database migrations (`pnpm run db:push`)
- [ ] Test authentication flows
- [ ] Test file uploads (if using S3)
- [ ] Set up custom domain (optional)
- [ ] Configure monitoring and alerts

## Troubleshooting

### Build Fails
- Check Railway logs for specific error messages
- Ensure all dependencies are in `package.json`
- Verify Node.js version compatibility

### Database Connection Issues
- Verify `DATABASE_URL` is set correctly
- Check if MySQL service is running in Railway
- Ensure database migrations have been run

### Application Crashes on Start
- Check environment variables are set
- Review application logs in Railway dashboard
- Verify the build output in `dist/` directory

## Monitoring

Railway provides built-in monitoring:
- **Logs**: View real-time logs in the dashboard
- **Metrics**: CPU, Memory, and Network usage
- **Deployments**: Track deployment history and rollback if needed

## Scaling

Railway automatically handles scaling based on your plan:
- **Hobby Plan**: Suitable for development and small projects
- **Pro Plan**: Better performance and resources
- **Team Plan**: Advanced features and collaboration

## Support

- Railway Documentation: https://docs.railway.app
- Railway Discord: https://discord.gg/railway
- Railway Status: https://status.railway.app

## Notes

- Railway automatically detects the `pnpm` package manager from `package.json`
- The application uses Nixpacks for building (Railway's default)
- Health checks are automatic based on HTTP responses
- Zero-downtime deployments are enabled by default
