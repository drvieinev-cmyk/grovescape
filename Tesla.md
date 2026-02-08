# Tesla Fleet API - Public Key Setup Guide

## 🔑 Generated Keys

### Public Key (to be uploaded)
**File:** `com.tesla.3p.public-key.pem`
```
-----BEGIN PUBLIC KEY-----
MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEXfBm/AgBCjJrZOVTFD1DlTY+TZDs
vtomE9xJVieq2NwJS0NxhYFImTeV8QRuR7QvyTM/Y/K8qWHkY2PmVnOBfw==
-----END PUBLIC KEY-----
```

### Private Key (keep secure - DO NOT SHARE)
**File:** `tesla-private-key.pem`
```
-----BEGIN EC PRIVATE KEY-----
MHcCAQEEINrV/rodYcycZ1QkgXmuHnBp6ENBHHgNIGqOTVkMWRY2oAoGCCqGSM49
AwEHoUQDQgAEXfBm/AgBCjJrZOVTFD1DlTY+TZDsvtomE9xJVieq2NwJS0NxhYFI
mTeV8QRuR7QvyTM/Y/K8qWHkY2PmVnOBfw==
-----END EC PRIVATE KEY-----
```

---

## Create the Required Directory Structure

1. Create a folder named `.well-known` (note the dot at the beginning)
2. Inside `.well-known`, create a folder named `appspecific`
3. Upload the file `com.tesla.3p.public-key.pem` to the `appspecific` folder
4. Ensure the file is publicly accessible (not password-protected)

After uploading, verify the file is accessible by visiting:
```
https://grovescape.com/.well-known/appspecific/com.tesla.3p.public-key.pem
```

You should see the public key content displayed in your browser.

---

## 🔒 Security Notes

1. **Private Key Storage**: 
   - The private key (`tesla-private-key.pem`) should be stored securely
   - **Never** commit it to version control
   - **Never** upload it to your website
   - Keep it in a secure location (password manager, encrypted storage, etc.)

2. **Public Key**:
   - The public key is safe to share and must be publicly accessible
   - Tesla's servers will download it to verify your partner account
