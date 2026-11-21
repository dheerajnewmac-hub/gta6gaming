"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
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
  const router = useRouter();
  const { user } = useAuth();
  const [selectedClusterId, setSelectedClusterId] = useState<string>('us-east');
  const [activeCheckoutPass, setActiveCheckoutPass] =
    useState<SelectedCheckoutPass | null>(null);

  // Restore pending plan when returning from login/signup with ?checkout=true
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    if (params.get('checkout') === 'true') {
      try {
        const stored = sessionStorage.getItem('vicecloud_pending_plan');
        if (stored) {
          const parsed = JSON.parse(stored) as SelectedCheckoutPass;
          if (parsed?.name && typeof parsed?.price === 'number') {
            setActiveCheckoutPass(parsed);
            sessionStorage.removeItem('vicecloud_pending_plan');
          }
        }
        window.history.replaceState({}, '', '/');
      } catch {
        // Ignore JSON error
      }
    }
  }, []);

  const handleSelectPass = (pass: SelectedCheckoutPass) => {
    // Auth Gate: Mandatory signup / login before opening payment checkout
    if (!user) {
      try {
        sessionStorage.setItem('vicecloud_pending_plan', JSON.stringify(pass));
      } catch {
        // Ignore storage error
      }
      router.push(`/login?mode=signup&plan=${encodeURIComponent(pass.name)}`);
      return;
    }
    setActiveCheckoutPass(pass);
  };

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
          onSelectPass={handleSelectPass}
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
