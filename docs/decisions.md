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
