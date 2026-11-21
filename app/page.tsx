"use client";

import React, { useState } from 'react';
import { LiveFleetBar } from '@/components/studio/LiveFleetBar';
import { Navbar } from '@/components/studio/Navbar';
import { HeroSection } from '@/components/studio/HeroSection';
import { WalkthroughSection } from '@/components/studio/WalkthroughSection';
import {
  PricingSection,
  type SelectedCheckoutPass,
} from '@/components/studio/PricingSection';
import { NetworkAndCompatibilitySection } from '@/components/studio/NetworkAndCompatibilitySection';
import { FaqAndFooter } from '@/components/studio/FaqAndFooter';
import { CheckoutDrawer } from '@/components/studio/CheckoutDrawer';
import { LivePurchasePopup } from '@/components/studio/LivePurchasePopup';
import { FloatingSupportPill } from '@/components/floating-support-pill';

export default function HomePage() {
  const [selectedClusterId, setSelectedClusterId] = useState<string>('us-east');
  const [activeCheckoutPass, setActiveCheckoutPass] =
    useState<SelectedCheckoutPass | null>(null);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0416] text-white selection:bg-[#ff2ea6] selection:text-white font-sans overflow-x-hidden">
      <LiveFleetBar />

      <Navbar
        selectedPassLabel={activeCheckoutPass ? activeCheckoutPass.name : null}
        onPrimaryAction={() => scrollToSection('plans')}
      />

      <main>
        <HeroSection
          onExplorePlans={() => scrollToSection('plans')}
          onRunDiagnosticJump={() => scrollToSection('clusters')}
        />

        <WalkthroughSection onExplorePlans={() => scrollToSection('plans')} />

        <PricingSection
          onSelectPass={setActiveCheckoutPass}
          onViewClusters={() => scrollToSection('clusters')}
        />

        <NetworkAndCompatibilitySection
          selectedClusterId={selectedClusterId}
          onSelectCluster={setSelectedClusterId}
          onExplorePlans={() => scrollToSection('plans')}
        />

        <FaqAndFooter />
      </main>

      <LivePurchasePopup paused={Boolean(activeCheckoutPass)} />

      <CheckoutDrawer
        pass={activeCheckoutPass}
        selectedClusterId={selectedClusterId}
        onSelectCluster={setSelectedClusterId}
        onClose={() => setActiveCheckoutPass(null)}
      />

      {/* 24/7 Telegram Support Pill */}
      <FloatingSupportPill />
    </div>
  );
}
