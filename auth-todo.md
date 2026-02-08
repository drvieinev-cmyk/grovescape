# Authentication System Implementation Todo

## Phase 1: Project Upgrade
- [x] Upgrade to web-db-user feature
- [x] Verify database connection
- [x] Verify backend server running

## Phase 2: User Registration & Login
- [x] Create users table schema
- [x] Implement registration endpoint (POST /api/auth/register)
- [x] Implement login endpoint (POST /api/auth/login)
- [x] Add password hashing with bcrypt
- [x] Create JWT token generation
- [x] Build registration UI page
- [x] Build login UI page
- [x] Add form validation

## Phase 3: OAuth 2.0 Authorization Code Flow
- [x] Create oauth_clients table for registered applications
- [x] Create oauth_authorization_codes table
- [x] Create oauth_access_tokens table
- [x] Implement authorization endpoint (GET /api/oauth/authorize)
- [x] Implement token exchange endpoint (POST /api/oauth/token)
- [ ] Build consent screen UI
- [x] Add redirect URI validation
- [x] Implement PKCE support

## Phase 4: Machine-to-Machine (M2M) Authentication
- [x] Create api_keys table for M2M credentials
- [x] Implement client credentials grant (POST /api/oauth/token with grant_type=client_credentials)
- [x] Add API key generation endpoint
- [ ] Add API key validation middleware
- [x] Create M2M token endpoint

## Phase 5: API Management Dashboard
- [x] Create developer dashboard page
- [x] Build "Create Application" form
- [x] Display client ID and client secret
- [x] Show API keys management interface
- [x] Add token revocation feature
- [ ] Display usage statistics

## Phase 6: Testing
- [ ] Test user registration flow
- [ ] Test user login flow
- [ ] Test OAuth authorization code flow
- [ ] Test M2M authentication
- [ ] Test token validation
- [ ] Test API endpoints with authentication
