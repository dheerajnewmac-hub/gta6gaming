# Architectural Decisions

## Decision 1: Protocol & Discovery Phase for GTA 6 PS5 Cloud Gaming Platform
- **Date**: 2026-11-19
- **Context**: User has 500-1000 PS5 units with GTA 6 licenses and wants to build a commercial cloud gaming service for users with low-end PCs.

## Decision 2: Target Market & Visual Differentiation
- **Date**: 2026-11-19
- **Target Market**: Global / International (US, Europe, Latin America, Southeast Asia) in USD ($), with operator restriction notice (India not supported).

## Decision 3: Exact Design Implementation from Provided Mockup
- **Date**: 2026-11-19
- **Reference Artwork**: `Neon Remote Play Gaming Landing Page.png`

## Decision 4: Rockstar-Grade Hero Stage with Live Animation Video
- **Date**: 2026-11-19
- **Implementation**: Real looping 720p HD animation video showing PS5 data stream into PC with Rockstar-style telemetry HUD.

## Decision 5: Global Expansion & A-to-Z "How to Play" Onboarding Architecture
- **Date**: 2026-11-19
- **Decision**: Added interactive 4-tab "How to Play" guide, worldwide server clusters, and international trust bar.

## Decision 6: Price Optimization, Unlimited 15D/30D Passes, and Interactive Custom Plan Builder
- **Date**: 2026-11-19
- **Context**: User requested lower entry prices, an Unlimited 15-day / 30-day Campaign pass, and an interactive Custom Plan Calculator where gamers choose their exact hours and days.
- **Pricing Adjustments**:
  1. Solo Trial Pass: Reduced from $4.99 to **$1.99** (1 hour).
  2. Starter Pack: Reduced from $19.99 to **$8.99** (5 hours).
  3. Weekend Marathon: Reduced from $34.99 to **$14.99** (12 hours).
  4. NEW Vice Syndicate (Unlimited Pass): **$24.99 (15 Days)** or **$39.99 (30 Days Unlimited)**.
  5. NEW Interactive Custom Rig Builder: Interactive sliders (Hours: 2-80 hrs, Validity: 7-60 days) with real-time volume discount calculation ($1.40/hr down to $0.60/hr).

## Decision 7: Enterprise-Grade Visual & Interactive Redesign of Cluster, Hardware, and Walkthrough Sections
- **Date**: 2026-11-19
- **Context**: User uploaded screenshots showing that the Global Server Map, Hardware Compatibility, and How-to-Play guide looked too flat/plain and requested them to be made significantly more professional and impressive.
- **Implementations**:
  1. `components/global-server-map.tsx`: Added an interactive real-time Edge Latency Tester, Equinix Tier-4 Datacenter Blade racks with live occupancy gauges (93%), online LED beacons, and Tier-1 peering info.
  2. `components/compatibility-section.tsx`: Added an interactive 1-Click Browser Hardware Diagnostic Scanner and an eye-opening side-by-side "Local PC Build ($1,500+) vs ViceCloud ($1.99)" cost & hardware reality check comparison card.
  3. `components/how-to-play-guide.tsx`: Upgraded Step 01 to a realistic dark browser chrome window with WebRTC SDP handshake simulator (`Simulate Stream Connect`), and detailed input/save visualizers.

## Decision 8: Interactive Animated Holographic World Map Canvas with Moving Fiber Laser Packets
- **Date**: 2026-11-19
- **Context**: User noted that the 4 datacenter cards still looked plain without visual motion, and requested real world map animations.
- **Implementations**:
  1. Built `components/server-map-canvas.tsx`: A lightweight SVG cybernetic world map with radar sweep, concentric animated pulsing rings on all 4 continent datacenter nodes, and continuous SVG `<animateMotion>` laser data packets streaming between US, Europe, Latin America, and Asia.
  2. Integrated two-way interactive state linking: Clicking any node pin on the map dynamically highlights and scales the corresponding server rack card below.

## Decision 9: Integration of High-Definition 3D Relief World Map Animation Video & Supported Countries Listing
- **Date**: 2026-11-19
- **Context**: User provided an ultra-high-definition 3D relief global map animation video (`1795102589125259.mp4`) and requested the actual video animation and supported country lists to be integrated for maximum international credibility.
- **Implementations**:
  1. Copied video asset to `public/global-map-animation.mp4` and updated `components/server-map-canvas.tsx` with a responsive 21:9 cinematic video player, telemetry HUD (`GLOBAL FIBER TELEMETRY • LIVE`), play/pause toggle, and interactive geolocation hotspot pins.
  2. Enhanced `components/global-server-map.tsx` with categorized Supported Countries & Cities badges per cluster:
     - 🇺🇸 North America: United States, Canada, Mexico (Virginia, Oregon, Texas, Toronto, CDMX)
     - 🇪🇺 Europe: UK, Germany, France, Netherlands, Spain (London, Frankfurt, Paris, Amsterdam, Madrid)
     - 🌎 Latin America: Brazil, Chile, Argentina, Colombia (São Paulo, Santiago, Buenos Aires, Bogotá)
     - 🌏 Asia-Pacific: Japan, South Korea, Singapore, Australia (Tokyo, Seoul, Singapore, Sydney, Melbourne)

## Decision 10: Dedicated Gamer Portal Login Route (/login) with Google OAuth and Email/Password
- **Date**: 2026-11-19
- **Context**: User requested a dedicated, professional login page supporting both standard email/password credentials and 1-click Google Sign-In to give users a high-trust experience when logging into their rented PS5 cloud rigs.
- **Implementations**:
  1. Built `lib/auth-schema.ts`: Strict Zod schema validating gamer email addresses and minimum 6-character passwords.
  2. Built `components/social-login-buttons.tsx`: High-converting Google sign-in button with official Google SVG logo and Discord community sign-in.
  3. Built `components/login-form.tsx`: Comprehensive form featuring password visibility toggle (eye icon), "Remember me for 30 days" checkbox, "Forgot password?" recovery link, loading state, error alert, and success redirect.
  4. Built `app/login/page.tsx`: Dedicated dark glassmorphic page layout with live rigs online beacon, 256-bit SSL encryption badge, and seamless navigation back to home.
  5. Updated `components/navbar.tsx`: Integrated a prominent "Sign In" button in desktop and mobile navigation menus.

## Decision 11: Seamless Auth Gate & Post-Login Checkout Restoration
- **Date**: 2026-11-19
- **Context**: User required that visitors can freely browse the full landing page initially, but when they click on any plan or actionable rig deployment, they must be gated by the Login page. Once authenticated, the exact plan they selected should be seamlessly restored in the checkout modal.
- **Implementations**:
  1. Built `context/auth-context.tsx`: Lightweight, persistent React Auth Context storing user profile and gamerTag in `localStorage`.
  2. Gated all plan selections in `components/pricing-plans.tsx` & `components/custom-plan-builder.tsx`: If unauthenticated, saves plan in `sessionStorage` and navigates to `/login?plan=<name>`.
  3. Built plan reminder badge in `components/login-form.tsx` informing user: *"Sign in to activate your selected [Plan Name]"*.
  4. Auto-restored checkout state in `app/page.tsx`: On return from successful login with `?checkout=true`, automatically opens `SessionModal` preloaded with the selected plan.
  5. Dynamic Navbar: Displays authenticated gamer tag badge (`● Gamer_user`) and a 1-click Sign Out action when logged in.

## Decision 12: Real-Time International Gamer Purchase Activity Ticker (Social Proof)
- **Date**: 2026-11-19
- **Context**: User requested a live customer activity ticker on the side showing real-time global player purchases (e.g. "Jack buy this plan") to boost conversion and international consumer trust.
- **Implementations**:
  1. Built `components/live-activity-toast.tsx`: Non-intrusive bottom-left cyberpunk glassmorphic toast notification.
  2. Features rotating verified international customer purchases (US, UK, Spain, Germany, Brazil, Japan, Canada) showing gamer name, location, country flag, pass rented, price, allocated PS5 rig node, and timestamp.
  3. Includes smooth slide-in/out CSS transitions, hover-to-pause inspection, and a dismiss button (`x`).

## Decision 13: Zero-KYC Trust Wallet Crypto & Fiat Card-to-Crypto Checkout Integration
- **Date**: 2026-11-19
- **Context**: Operator has a private decentralized Trust Wallet and wants to accept payments worldwide without KYC or banking friction.
- **Implementations**:
  1. Built `components/crypto-checkout-view.tsx`:
     - **Direct Crypto Tab (Trust Wallet)**: Supports USDT (TRC-20 & BEP-20), Solana (SOL), and Bitcoin (BTC) with 1-click address copy and 0% chargeback protection.
     - **Card-to-Crypto Tab (MoonPay/Changelly Onramp)**: Allows international gamers with Visa, MasterCard, and Apple Pay to buy crypto and settle directly into the operator's Trust Wallet address with zero merchant KYC.
  2. Integrated 2-stage verification inside `components/session-modal.tsx`:
     - Checks blockchain mempool and unlocks the `"ACTIVATED"` stage.
     - Displays the gamer's allocated PS5 Blade Node (`PS5-RIG-0xxx`), Session Passcode (`VICE-8842-PS5X`), and 1-click Fullscreen GTA VI stream launcher.


## Decision 14: Production Deployment on Vercel with GitHub Synchronization
- **Date**: 2026-11-19
- **Context**: Operator deployed the ViceCloud GTA 6 platform from GitHub to Vercel for global CDN acceleration and custom domain linking (`gta6gaming.store`).
- **Implementations**:
  1. Synchronized local repo with GitHub remote `dheerajnewmac-hub/gta6gaming` on branches `main` and `master`.
  2. Injected `vercel.json` with explicit `nextjs` framework schema to prevent edge routing misconfiguration.
  3. Verified production endpoints returning HTTP 200 OK across `/` and `/login`.
