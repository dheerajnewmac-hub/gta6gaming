"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/navbar";
import { HeroNeonDesk } from "@/components/hero-neon-desk";
import { HowItWorksFlow } from "@/components/how-it-works-flow";
import { PricingPlans } from "@/components/pricing-plans";
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
    const el = document.getElementById("how-it-works");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
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

      {/* Hero Section Matching Uploaded Mockup */}
      <HeroNeonDesk
        onOpenPlans={handleOpenPlans}
        onOpenHowItWorks={handleOpenHowItWorks}
      />

      {/* Middle 3-Step "How It Works?" Flow Bar */}
      <HowItWorksFlow />

      {/* Pricing Section: Solo Pass, Starter Pack (Most Popular), Weekend Pack + "Your Game. Our Power." */}
      <PricingPlans onSelectPlan={handleSelectPlan} />

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
