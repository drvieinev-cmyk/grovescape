# Tesla Fleet API Integration Guide

## ✅ Key Pair Files Created

### 📁 File Locations

| File | Location | Permissions | Purpose |
|------|----------|-------------|---------|
| **Public Key** | `client/public/.well-known/appspecific/com.tesla.3p.public-key.pem` | `rw-r--r--` (644) | Web-accessible for Tesla verification |
| **Private Key** | `server/tesla-private-key.pem` | `rw-------` (600) | Secure server-side signing |

### 🔐 Security Status

✅ **Private key permissions set to 600** (owner read/write only)  
✅ **Private key added to .gitignore** (will never be committed)  
✅ **Public key in correct web-accessible location**  
✅ **Server already configured** to serve public key at `/.well-known/appspecific/com.tesla.3p.public-key.pem`

---

## 🌐 Public Key Verification

Your public key is already configured to be served by the Express server in `server/_core/index.ts`:

```typescript
app.get('/.well-known/appspecific/com.tesla.3p.public-key.pem', (_req, res) => {
  const publicKey = `-----BEGIN PUBLIC KEY-----
MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEXfBm/AgBCjJrZOVTFD1DlTY+TZDs
vtomE9xJVieq2NwJS0NxhYFImTeV8QRuR7QvyTM/Y/K8qWHkY2PmVnOBfw==
-----END PUBLIC KEY-----
`;
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=86400');
  res.status(200).send(publicKey);
});
```

### Verify After Deployment

Once deployed to Railway, verify the public key is accessible:

```bash
curl https://your-app.railway.app/.well-known/appspecific/com.tesla.3p.public-key.pem
```

Or visit in your browser:
```
https://your-app.railway.app/.well-known/appspecific/com.tesla.3p.public-key.pem
```

You should see:
```
-----BEGIN PUBLIC KEY-----
MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEXfBm/AgBCjJrZOVTFD1DlTY+TZDs
vtomE9xJVieq2NwJS0NxhYFImTeV8QRuR7QvyTM/Y/K8qWHkY2PmVnOBfw==
-----END PUBLIC KEY-----
```

---

## 🔧 Using the Private Key in Your Application

### Loading the Private Key

Add this to your Tesla API service (e.g., `server/tesla.ts`):

```typescript
import fs from 'fs';
import path from 'path';

// Load the private key
const privateKeyPath = path.join(import.meta.dirname, 'tesla-private-key.pem');
const privateKey = fs.readFileSync(privateKeyPath, 'utf-8');

// Use for signing requests to Tesla Fleet API
```

### Environment Variable Alternative (Recommended for Production)

For Railway deployment, it's better to store the private key as an environment variable:

1. **Convert the key to a single line:**
   ```bash
   cat server/tesla-private-key.pem | tr '\n' '|'
   ```

2. **Set in Railway:**
   ```bash
   railway variables set TESLA_PRIVATE_KEY="-----BEGIN EC PRIVATE KEY-----|MHcCAQEEINrV/rodYcycZ1QkgXmuHnBp6ENBHHgNIGqOTVkMWRY2oAoGCCqGSM49|AwEHoUQDQgAEXfBm/AgBCjJrZOVTFD1DlTY+TZDsvtomE9xJVieq2NwJS0NxhYFI|mTeV8QRuR7QvyTM/Y/K8qWHkY2PmVnOBfw==|-----END EC PRIVATE KEY-----|"
   ```

3. **Load in your code:**
   ```typescript
   const privateKey = process.env.TESLA_PRIVATE_KEY?.replace(/\|/g, '\n') || '';
   ```

---

## 📋 Tesla Partner Account Setup

### Step 1: Register Your Application

1. Go to [Tesla Developer Portal](https://developer.tesla.com)
2. Create a new application
3. Set the redirect URI to: `https://your-app.railway.app/api/oauth/callback`

### Step 2: Configure Public Key

In the Tesla Developer Portal:
1. Navigate to your application settings
2. Find the "Public Key" section
3. Enter your public key URL: `https://your-app.railway.app/.well-known/appspecific/com.tesla.3p.public-key.pem`
4. Tesla will verify the key is accessible

### Step 3: Get Client Credentials

After registration, you'll receive:
- **Client ID** - Add to Railway as `TESLA_CLIENT_ID`
- **Client Secret** - Add to Railway as `TESLA_CLIENT_SECRET`

### Step 4: Set Environment Variables

Add these to Railway:

```bash
TESLA_CLIENT_ID=your-client-id
TESLA_CLIENT_SECRET=your-client-secret
TESLA_REDIRECT_URI=https://your-app.railway.app/api/oauth/callback
TESLA_PRIVATE_KEY=<your-private-key-as-single-line>
```

---

## 🔑 Key Pair Details

### Algorithm
- **Type:** Elliptic Curve (EC)
- **Curve:** P-256 (prime256v1 / secp256r1)
- **Format:** PEM

### Public Key Fingerprint
```
MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEXfBm/AgBCjJrZOVTFD1DlTY+TZDs
vtomE9xJVieq2NwJS0NxhYFImTeV8QRuR7QvyTM/Y/K8qWHkY2PmVnOBfw==
```

### Verify Key Pair Match

To verify the public and private keys match:

```bash
# Extract public key from private key
openssl ec -in server/tesla-private-key.pem -pubout -out /tmp/extracted-public.pem

# Compare with your public key
diff client/public/.well-known/appspecific/com.tesla.3p.public-key.pem /tmp/extracted-public.pem
```

No output means they match! ✅

---

## 🚨 Security Best Practices

### ✅ DO:
- ✅ Keep the private key file permissions at 600
- ✅ Store private key in environment variables for production
- ✅ Use HTTPS for all Tesla API communications
- ✅ Rotate keys periodically (every 6-12 months)
- ✅ Monitor access logs for unusual activity

### ❌ DON'T:
- ❌ Commit private keys to version control (already protected by .gitignore)
- ❌ Share private keys via email or chat
- ❌ Store private keys in client-side code
- ❌ Use the same key pair for multiple applications
- ❌ Expose private keys in error messages or logs

---

## 🧪 Testing the Integration

### Local Testing

1. **Start the server:**
   ```bash
   pnpm dev
   ```

2. **Test public key endpoint:**
   ```bash
   curl http://localhost:3000/.well-known/appspecific/com.tesla.3p.public-key.pem
   ```

3. **Verify key loading:**
   ```typescript
   // In your Tesla service
   console.log('Private key loaded:', privateKey.substring(0, 50) + '...');
   ```

### Production Testing (After Railway Deployment)

1. **Verify public key is accessible:**
   ```bash
   curl https://your-app.railway.app/.well-known/appspecific/com.tesla.3p.public-key.pem
   ```

2. **Test OAuth flow:**
   - Navigate to your app's Tesla login
   - Complete the OAuth flow
   - Verify tokens are received and stored

---

## 📚 Additional Resources

- [Tesla Fleet API Documentation](https://developer.tesla.com/docs/fleet-api)
- [OAuth 2.0 Flow Guide](https://developer.tesla.com/docs/fleet-api/authentication/oauth)
- [Public Key Infrastructure](https://developer.tesla.com/docs/fleet-api/authentication/partner-tokens)

---

## 🔄 Key Rotation Procedure

When you need to rotate keys:

1. **Generate new key pair:**
   ```bash
   openssl ecparam -name prime256v1 -genkey -noout -out server/tesla-private-key-new.pem
   openssl ec -in server/tesla-private-key-new.pem -pubout -out client/public/.well-known/appspecific/com.tesla.3p.public-key-new.pem
   ```

2. **Update Tesla Developer Portal** with new public key URL

3. **Update environment variables** in Railway

4. **Test thoroughly** before removing old keys

5. **Archive old keys** securely (don't delete immediately)

---

## ✅ Checklist

- [x] Public key created in web-accessible location
- [x] Private key created with secure permissions (600)
- [x] Private key patterns added to .gitignore
- [x] Server configured to serve public key
- [x] Health check endpoint added for Railway
- [ ] Deploy to Railway
- [ ] Verify public key URL is accessible
- [ ] Register application in Tesla Developer Portal
- [ ] Add Tesla credentials to Railway environment variables
- [ ] Test OAuth flow
- [ ] Test vehicle API calls

---

**Status:** ✅ Key pair files are ready for Tesla Fleet API integration!
