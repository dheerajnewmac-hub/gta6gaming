# Project Progress

## Status
- **Current Phase**: Pricing Restructure, Unlimited Passes & Interactive Custom Rig Calculator

## What is Being Updated
1. **Lowered Base Pricing in `components/pricing-plans.tsx`**:
   - Solo Pass: **$1.99** (was $4.99).
   - Starter Pack: **$8.99** (was $19.99).
   - Weekend Pack: **$14.99** (was $34.99).
   - Added Unlimited 15D/30D Syndicate Pass: **$24.99 / $39.99**.
2. **Interactive Custom Plan Calculator (`components/custom-plan-builder.tsx`)**:
   - Gamers can slide hours (2 to 80 hrs) and days (7 to 60 days).
   - Real-time rate calculator showing cost per hour and savings.
   - 1-click checkout with the customized package.
3. **Session Modal Checkout Update (`components/session-modal.tsx`)**:
   - Seamlessly accepts custom calculated plan hours and prices.
