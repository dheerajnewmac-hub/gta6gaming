# MASTER SYSTEM PROMPT & ARCHITECTURE SPECIFICATION
## Project: ViceCloud / NexusPlay - Global GTA VI PS5 Cloud Streaming Platform
**Target Audience**: Global International Gamers (US, EU, LATAM, APAC)  
**Primary Currency**: USD ($) / Crypto (BTC, USDT, SOL)  
**Core Value Proposition**: *"Play Grand Theft Auto VI at 4K 60FPS on any potato PC, old laptop, Mac, or phone. No $500 PS5. No $70 game purchase. Instant cloud access."*

---

## 1. EXECUTIVE SYSTEM PROMPT (Pass this directly to AI Coding Agents)

```markdown
You are a Staff-Level Full-Stack Engineer and 3D/Motion Web Designer. Build a bleeding-edge, cyber-luxury SaaS & Cloud Gaming rental platform called "ViceCloud" (or user's preferred brand). The platform rents remote access to a real fleet of 500-1000 PS5 consoles running Grand Theft Auto VI to international gamers who cannot afford a console or high-end GPU.

### CORE CONSTRAINTS & STANDARDS:
- Stack: Next.js 15 (App Router), TypeScript (Strict Mode, 0 `any`), Tailwind CSS, Framer Motion, Lucide Icons, Shadcn/UI, Zod validation.
- Responsive: Mobile-first, desktop-optimized, smooth 60fps animations, zero layout shifts.
- Theme: Dark Vice City Cyberpunk Aesthetics (Neon Pink #FF007F, Cyan #00F0FF, Deep Obsidian #0A0A12, Gold Accents #FFD700).
- Key Interactive Feature: An ultra-cool Split-Screen Interactive Hero Animation showing real PS5 Server Blades on the left beaming a low-latency laser/fiber stream into an old dusty "Potato PC" on the right, which is rendering GTA 6 at buttery smooth 60 FPS.
- Interactive Tools: Live Global Ping & Latency Benchmarker, Interactive Control Mapper (DualSense vs Keyboard/Mouse), Dynamic Plan Calculator.
```

---

## 2. INTERNATIONAL PRICING TIERS & MONETIZATION STRATEGY

For international markets (US, Europe, Latin America, Southeast Asia), gamers expect flexible, micro-transactional and commitment-based plans:

| Plan Tier | Price (USD) | Hours Included | Cost / Hour | Ideal For | Features |
|---|---|---|---|---|---|
| **Quick Hit (Trial)** | **$1.99** | 1 Hour | $1.99/hr | Latency & Graphics testers | 1080p 60FPS, Standard Queue, Basic Audio |
| **Heist Pass (Most Popular)** | **$5.99** | 4 Hours | $1.50/hr | Casual evening sessions | 1080p 60FPS, Priority Queue, Cloud Save Sync |
| **Weekend Syndicate** | **$14.99** | 12 Hours (Valid 3 Days) | $1.25/hr | Weekend grinders | 1440p 60FPS, DualSense haptic emulation, Instant rig allocation |
| **Storyline Master** | **$29.99** | 30 Hours (Valid 15 Days) | $1.00/hr | Campaign completionists | 4K HDR 60FPS, Zero queue, Dedicated PS5 slot & Permanent Save |
| **VIP Vice Pass (Monthly)** | **$49.99/mo** | 60 Hours / Month | $0.83/hr | Hardcore daily gamers | VIP Dedicated Rig, 4K HDR, Zero Latency Boost, 24/7 Discord VIP support |

> **Payment Gateways Supported**: Stripe (Visa/Mastercard/Apple Pay/Google Pay), PayPal, and Crypto Checkout (USDT/Solana for privacy-focused global gamers).

---

## 3. HERO SECTION ANIMATION SPECIFICATION

### Visual Concept: "The Cloud Bridge" (Split-Screen Interactive Animation)
The user immediately understands the business model visually within 3 seconds of visiting.

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           [ LIVE INTERACTIVE HERO ]                             │
│                                                                                 │
│   LEFT: THE SERVER ENGINE                   RIGHT: THE USER'S POTATO PC         │
│  ┌─────────────────────────┐               ┌─────────────────────────┐          │
│  │  [500+ PS5 SERVER BLADE]│   ═════════>  │ [OLD 2015 DUSTY LAPTOP] │          │
│  │  - Glowing Blue LEDs    │   FIBER OPTIC │ - Running GTA VI 60 FPS │          │
│  │  - 4K PS5 APU Rendering │   DATA STREAM │ - FPS Counter: 60 FPS   │          │
│  │  - Real Hardware Blades │   LATENCY 18ms│ - Temp: 38°C (Ice Cool) │          │
│  │  - Status: 98.4% Health │   ═════════>  │ - Controller Active     │          │
│  └─────────────────────────┘               └─────────────────────────┘          │
│                                                                                 │
│             [ START FREE PING TEST ]      [ CHOOSE YOUR RIG PASS ]              │
└─────────────────────────────────────────────────────────────────────────────────┘
```

#### Animation Details:
1. **Left Side (PS5 Fleet Rack):**
   - 3D/Isometric styled rack showing stacked PS5 server nodes with pulsating status LED lights (cyan and violet).
   - Real-time simulated stats: `Server Load: 74%`, `Active Nodes: 842 / 1000`, `Current Bitrate: 45 Mbps`.
2. **Center Stream Conduit:**
   - Animated glowing fiber-optic particles travelling across the screen from Left (PS5) to Right (Player).
   - Pulsing HUD badge: `WebRTC Ultra-Low Latency: < 18ms`.
3. **Right Side (Player's Low-End Setup):**
   - Graphic of an everyday low-spec laptop (e.g. Intel Core i3 / Integrated Graphics).
   - Inside the laptop's screen: GTA 6 Vice City vibrant gameplay looping smoothly with an overlay HUD (`Resolution: 1080p 60FPS`, `Input Delay: 12ms`, `Hardware Load: 4%`).
4. **Interactive Toggle:**
   - Toggle switch: *"Simulate Latency (US East, US West, Europe, Asia, LATAM)"* which updates the ping counter in real time.

---

## 4. COMPLETE PAGE ARCHITECTURE & USER JOURNEY

### Page 1: Landing Page (`/`)
- **Navigation Bar**: Logo, "How It Works", "Pricing", "Ping Benchmark", "Fleet Status (Live)", "Login / Sign Up".
- **Hero Section**: Split-screen animated visualization + CTA buttons ("Test Your Connection" & "Rent GTA 6 Now").
- **Live Fleet Counter Bar**:
  - `🟢 783 PS5 Nodes Available` | `⚡ Average Global Ping: 21ms` | `🎮 12,450+ Hours Streamed Today`.
- **Live Ping & Connection Benchmarker Component**:
  - User clicks "Run Benchmark".
  - Runs WebRTC / HTTP ping to regional edge nodes (North America, Europe, Asia, South America).
  - Gives instant recommendation: *"Your connection is Ready for 1080p 60FPS gaming!"*
- **The "Why Us?" Comparison Matrix**:
  - Buying PS5 + GTA 6 ($650+ upfront, waiting for delivery, TV required) vs ViceCloud ($1.99 to start playing in 60 seconds on current laptop).
- **Pricing Cards**:
  - Interactive Hourly / Weekend / Weekly / Monthly plan selector with toggle for USD / Crypto.
- **Controller & Input Mapper Showcase**:
  - Visual diagram showing: Keyboard & Mouse mapped seamlessly to DualSense triggers and analog sticks, plus Native Xbox/PlayStation controller plug-and-play support.
- **Customer Reviews & Gameplay Clips**:
  - Real testimonials from low-end PC users in Brazil, Germany, USA, and Philippines playing smoothly.
- **FAQ Section**:
  - Do I need to buy GTA 6? (No, pre-installed on every PS5).
  - What happens to my story mode saves? (Cloud saves tied to your account).
  - Can I play with keyboard & mouse? (Yes, full custom remapping included).

### Page 2: Auth & Onboarding (`/login`, `/register`)
- Clean modal or page with Email, Google OAuth, and Discord Login (crucial for international gamers).

### Page 3: Member Dashboard (`/dashboard`)
- **Active Rig Status**:
  - Assigned PS5 Node ID: `#PS5-NODE-412`.
  - Remaining Time: Countdown timer with pause/resume capability.
- **1-Click Web Launcher / Connection Credentials**:
  - Option to launch in-browser (WebRTC 60 FPS) or download the ultra-fast Windows/Mac client.
- **Save State Manager**:
  - Backup my GTA 6 save file to local cloud / download save state.
- **Virtual Controller Remapper**:
  - Customize keybindings for WASD, Sprint, Aim, Shoot, Drive, Handbrake.

### Page 4: Admin Fleet Monitoring (`/admin/fleet`)
- Real-time overview of the 500-1000 PS5 rack units:
  - Node Health (Online, Streaming, Standby, Cooldown, Offline).
  - Bandwidth consumption per rack.
  - Active sessions & revenue metrics.

---

## 5. TECHNICAL SECURITY & DATA INTEGRITY PROTOCOLS

1. **Anti-Account Hijacking**:
   - Customers **never** get direct raw root PSN credentials.
   - Stream is streamed via WebRTC/Sunshine/Moonlight capture bridge or automated one-time session PIN.
2. **Save Game Isolation**:
   - Each customer session is assigned a sandboxed local profile or automated cloud save slot. When session terminates, save files are automatically backed up to user's database record.
3. **Bandwidth Optimization**:
   - Adaptive H.265 / AV1 / VP9 WebRTC video encoding to reduce bandwidth consumption down to 10-15 Mbps while maintaining crystal-clear 1080p60 fidelity.
