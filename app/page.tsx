"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/navbar";
import { HeroNeonDesk } from "@/components/hero-neon-desk";
import { HowItWorksFlow } from "@/components/how-it-works-flow";
import { HowToPlayGuide } from "@/components/how-to-play-guide";
import { PricingPlans } from "@/components/pricing-plans";
import { GlobalServerMap } from "@/components/global-server-map";
import { InternationalTrustBar } from "@/components/international-trust-bar";
import { CompatibilitySection } from "@/components/compatibility-section";
import { FAQSection } from "@/components/faq-section";
import { BottomRegionNotice } from "@/components/bottom-region-notice";
import { Footer } from "@/components/footer";
import { SessionModal } from "@/components/session-modal";

export default function HomePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{
    name: string;
    price: string;
    hours: string;
  } | null>(null);

  const handleOpenPlans = () => {
    const el = document.getElementById("plans");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleOpenHowItWorks = () => {
    const el = document.getElementById("how-to-play");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      const fallback = document.getElementById("how-it-works");
      if (fallback) fallback.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSelectPlan = (plan: { name: string; price: string; hours: string }) => {
    setSelectedPlan(plan);
    setModalOpen(true);
  };

  return (
    <main className="min-h-screen bg-[#060714] text-slate-100 flex flex-col selection:bg-purple-500 selection:text-white">
      {/* Top Floating Cyber Navigation */}
      <Navbar
        onOpenPlans={handleOpenPlans}
        onOpenHowItWorks={handleOpenHowItWorks}
      />

      {/* Hero Section with Looping HD Animation Video */}
      <HeroNeonDesk
        onOpenPlans={handleOpenPlans}
        onOpenHowItWorks={handleOpenHowItWorks}
      />

      {/* Middle 3-Step "How It Works?" Flow Bar */}
      <HowItWorksFlow />

      {/* Complete A to Z "How to Play" Interactive Guide */}
      <HowToPlayGuide />

      {/* Pricing Section: Solo Pass, Starter Pack (Most Popular), Weekend Pack + "Your Game. Our Power." */}
      <PricingPlans onSelectPlan={handleSelectPlan} />

      {/* Worldwide PS5 Cloud Clusters & Latency Map */}
      <GlobalServerMap />

      {/* Global Payments, Guarantee & Security Trust Bar */}
      <InternationalTrustBar />

      {/* Hardware & Regional Compatibility Section */}
      <CompatibilitySection />

      {/* Frequently Asked Questions */}
      <FAQSection />

      {/* Bottom Regional Restriction Notice Banner (India not supported notice) */}
      <BottomRegionNotice />

      {/* Global Footer */}
      <Footer />

      {/* Checkout / Session Launcher Modal */}
      <SessionModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        selectedPlan={selectedPlan}
      />
    </main>
  );
}
