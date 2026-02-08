# Grovescape Website Redesign Todo List

## Phase 1: Visual Assets
- [ ] Generate colorful hero background with vibrant gradients
- [ ] Generate 3D OS icons (iOS, Android, Windows, macOS, Linux, etc.) popping out from box
- [ ] Generate colorful abstract backgrounds for sections
- [ ] Generate team/about us imagery

## Phase 2: iOS 26-Style UI Components
- [ ] Create UIButton component with spring animations
- [ ] Create UISegmentedControl component
- [ ] Create UISwitch component with native animations
- [ ] Create UISlider component
- [ ] Create UITabBar component with minimize behavior
- [ ] Create UIToolbar with liquid glass blur effects
- [ ] Implement dynamic color system (light/dark mode)
- [ ] Add native corner radius and shadow utilities

## Phase 3: Weather Widget
- [ ] Create 3D weather widget component
- [ ] Implement geolocation API integration
- [ ] Add weather API integration (OpenWeatherMap or similar)
- [ ] Display current date and time
- [ ] Add weather animations (sun, clouds, rain, etc.)
- [ ] Integrate into header/navigation

## Phase 4: New Pages
- [ ] Create Privacy Policy page with proper legal content
- [ ] Create About Us page with company story and team
- [ ] Create Contact page with form
- [ ] Integrate Google Maps on Contact page
- [ ] Add routing for new pages

## Phase 5: Home Page Updates
- [ ] Update color scheme to vibrant, colorful Apple aesthetic
- [ ] Add 3D OS icons background to hero section
- [ ] Update platform showcase with colorful cards
- [ ] Add adaptive platform section
- [ ] Update all text content with detailed information
- [ ] Add interactive elements with spring animations

## Phase 6: Testing & Polish
- [ ] Test all pages and navigation
- [ ] Verify weather widget functionality
- [ ] Test Google Maps integration
- [ ] Check responsive design on all breakpoints
- [ ] Verify dark mode functionality
- [ ] Test all animations and interactions

## Phase 7: Icon Redesign & Theme Switching
- [ ] Redesign all platform icons with Apple-style rounded square backgrounds
- [ ] Mobile: Blue rounded square with smartphone icon
- [ ] Web: Purple/magenta rounded square with globe icon
- [ ] Desktop: Green rounded square with monitor icon
- [ ] Gaming: Orange/red rounded square with game controller icon
- [ ] XR/VR: Purple rounded square with VR goggles icon
- [ ] Vision Pro: Pink/magenta rounded square with Apple Vision Pro sparkle icon
- [ ] Enable switchable theme in ThemeProvider (light/dark/auto)
- [ ] Add theme toggle button in navigation header
- [ ] Implement OS preference detection for auto mode
- [ ] Fix Start Project button functionality
- [ ] Test theme persistence and button navigation


## Phase 8: Color Contrast & Mobile Responsiveness Fixes

### Color Fixes
- [ ] Fix text color contrast in dark mode (ensure all text is easily visible)
- [ ] Fix text color contrast in light mode (ensure all text is easily visible)
- [ ] Fix hero section text visibility in both modes
- [ ] Fix platform card text visibility in both modes
- [ ] Fix navigation link colors in both modes
- [ ] Fix footer text colors in both modes

### Header Navigation Fixes
- [ ] Properly align header elements (logo, nav links, weather, theme toggle, CTA)
- [ ] Resize header elements to proper proportions
- [ ] Make header fully responsive for mobile view
- [ ] Add mobile hamburger menu if needed
- [ ] Ensure weather widget is responsive
- [ ] Fix header spacing and padding for mobile

### Mobile Responsiveness
- [ ] Resize all sections for mobile view
- [ ] Fix hero section for mobile (text size, button size)
- [ ] Fix platform cards for mobile layout
- [ ] Fix adaptive platform section for mobile
- [ ] Ensure nothing looks bigger or bulky on mobile
- [ ] Test on various mobile screen sizes

### Button Functionality
- [ ] Activate View Capabilities button
- [ ] Add smooth scroll to capabilities section
- [ ] Test button functionality

### Testing
- [ ] Test dark mode on desktop
- [ ] Test light mode on desktop
- [ ] Test dark mode on mobile
- [ ] Test light mode on mobile
- [ ] Verify all text is readable
- [ ] Verify all buttons work


## Phase 9: Comprehensive UI/UX Refinement for Light/Dark Mode

### Color System Optimization
- [ ] Audit all color values in index.css for WCAG AA compliance (4.5:1 contrast ratio)
- [ ] Fix low-contrast text colors in both light and dark modes
- [ ] Update gradient colors for better visibility
- [ ] Fix glassmorphic card backgrounds for clarity
- [ ] Ensure dynamic color adaptation to system theme

### Icon Updates & Visibility
- [ ] Replace Vision Pro icon with user-provided icon
- [ ] Ensure all platform icons have proper contrast (stroke colors)
- [ ] Fix icon visibility on all background colors
- [ ] Test icon legibility in both modes

### Typography Refinement
- [ ] Review and fix all text color values for optimal readability
- [ ] Ensure proper font weight hierarchy across all pages
- [ ] Fix heading colors for maximum contrast
- [ ] Update body text colors for optimal legibility
- [ ] Fix link and button text visibility
- [ ] Maintain consistent typography system

### Layout & Spacing
- [ ] Refine layout spacing and alignment on Home page
- [ ] Refine layout spacing and alignment on About page
- [ ] Refine layout spacing and alignment on Contact page
- [ ] Refine layout spacing and alignment on Privacy page
- [ ] Fix navigation bar contrast and visibility
- [ ] Update weather widget contrast
- [ ] Fix modal/dialog visibility
- [ ] Update form input contrast and visibility

### Comprehensive Testing
- [ ] Test Home page in light mode (all sections)
- [ ] Test Home page in dark mode (all sections)
- [ ] Test About page in light mode
- [ ] Test About page in dark mode
- [ ] Test Contact page in light mode
- [ ] Test Contact page in dark mode
- [ ] Test Privacy page in light mode
- [ ] Test Privacy page in dark mode
- [ ] Test all interactive elements (buttons, forms, modals, links)
- [ ] Verify smooth theme switching
- [ ] Test on multiple screen sizes
- [ ] Verify no UI element becomes invisible when switching modes


## Phase 10: Vision Pro Icon Fix & Design Refinement

### Vision Pro Icon
- [ ] Replace Vision Pro image with line art icon (similar to XR/VR Glasses icon)
- [ ] Ensure icon uses same stroke width and style as other platform icons
- [ ] Test icon visibility in both light and dark modes

### Design Consistency Review
- [ ] Review all platform icons for consistent styling
- [ ] Check icon sizing and spacing
- [ ] Verify gradient backgrounds are consistent
- [ ] Review typography hierarchy
- [ ] Check button styling consistency
- [ ] Verify color palette usage

### Testing
- [ ] Test Vision Pro icon in light mode
- [ ] Test Vision Pro icon in dark mode
- [ ] Verify all platform cards look consistent
- [ ] Check overall design polish


## Phase 11: SEO Improvements
- [x] Add meta description (50-160 characters)
- [x] Add meta keywords
- [x] Add alt text to all images
- [x] Verify Open Graph tags


## Phase 12: Projects Showcase
- [x] Create Projects page with portfolio grid
- [x] Add ELYTRA project detail page
- [x] Add project cards with images and descriptions
- [x] Add navigation routes for projects
- [x] Test project pages


## Phase 13: Tesla OAuth Integration
- [x] Create backend Tesla token exchange endpoint
- [x] Store Tesla access tokens securely in database
- [x] Create frontend callback page at /oauth/tesla/callback
- [x] Create /connect/tesla page with PKCE generation
- [x] Update backend to support PKCE verification
- [x] Update callback to use PKCE flow
- [x] Display success message after connection
- [x] Add error handling for failed OAuth flows
- [x] Test complete Tesla OAuth flow with PKCE


## Phase 15: Tesla Fleet API Public Key Setup
- [x] Create .well-known/appspecific directory in client/public
- [x] Add com.tesla.3p.public-key.pem file
- [x] Verify public key is accessible at /.well-known/appspecific/com.tesla.3p.public-key.pem
- [x] Store private key securely in environment variables
- [x] Test endpoint accessibility


## Phase 16: Fix .well-known Directory Serving
- [x] Configure Express server to serve .well-known directory before React router
- [x] Test endpoint accessibility in production
- [x] Verify Tesla can fetch the public key


## Phase 17: Debug Production .well-known Endpoint
- [x] Check production static file serving in vite.ts
- [x] Verify .well-known files are included in build output
- [x] Fix production deployment configuration
- [ ] Test endpoint in production after fix


## Phase 18: Verify Build Output for .well-known
- [x] Run build command locally
- [x] Check if .well-known exists in dist/public
- [x] Fix vite config if files are not being copied
- [x] Test production build locally


## Phase 19: Debug Production Path Resolution
- [x] Add console.log to show resolved .well-known path
- [ ] Check deployment logs to see actual path
- [ ] Fix path resolution based on deployment structure
- [ ] Verify endpoint works in production


## Phase 20: Custom Route Handler for Tesla Public Key
- [x] Remove static file middleware for .well-known
- [x] Create custom Express route handler
- [x] Read public key file from filesystem
- [x] Test endpoint in development
- [ ] Test endpoint in production after publishing


## Phase 21: Fix Production Build Path
- [ ] Check all files in dist directory after build
- [ ] Try multiple path combinations for production
- [ ] Add fallback paths to route handler
- [ ] Test endpoint in production


## Phase 22: Final Fix - Dedicated Route Before All Middleware
- [x] Create route handler at the very start of Express app
- [x] Register before body parser and all other middleware
- [x] Embed public key content directly in code as fallback
- [ ] Test in production
