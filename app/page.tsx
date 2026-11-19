"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/navbar";
import { LiveActivityTicker } from "@/components/live-activity-ticker";
import { HeroSplitScreen } from "@/components/hero-split-screen";
import { FleetLiveStatus } from "@/components/fleet-live-status";
import { HowItWorks } from "@/components/how-it-works";
import { LivePingTester } from "@/components/live-ping-tester";
import { PricingSection } from "@/components/pricing-section";
import { ControllerMapper } from "@/components/controller-mapper";
import { InteractiveGamepadVisualizer } from "@/components/interactive-gamepad-visualizer";
import { FAQSection } from "@/components/faq-section";
import { Footer } from "@/components/footer";
import { SessionModal } from "@/components/session-modal";

export default function HomePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{
    name: string;
    price: string;
    hours: string;
  } | null>(null);

  const handleOpenPing = () => {
    const el = document.getElementById("ping-test");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleOpenPlans = () => {
    const el = document.getElementById("pricing");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLaunchDemo = () => {
    setSelectedPlan(null);
    setModalOpen(true);
  };

  const handleSelectPlan = (plan: { name: string; price: string; hours: string }) => {
    setSelectedPlan(plan);
    setModalOpen(true);
  };

  return (
    <main className="min-h-screen bg-[#08080f] text-slate-100 flex flex-col selection:bg-pink-500 selection:text-white">
      {/* Top Floating Cyber Navigation */}
      <Navbar
        onOpenPingTest={handleOpenPing}
        onOpenPlans={handleOpenPlans}
        onLaunchDemo={handleLaunchDemo}
      />

      {/* Global Live Gamer Session Ticker */}
      <div className="pt-20">
        <LiveActivityTicker />
      </div>

      {/* Hero with High-Quality Canvas Split Screen Animation */}
      <HeroSplitScreen
        onOpenPingTest={handleOpenPing}
        onOpenPlans={handleOpenPlans}
        onLaunchDemo={handleLaunchDemo}
      />

      {/* Live Cluster Fleet Telemetry Bar */}
      <FleetLiveStatus />

      {/* How it Works: 3 Steps */}
      <HowItWorks />

      {/* 1-Click Ping Diagnostic Tool */}
      <LivePingTester onSelectPlan={handleOpenPlans} />

      {/* Pricing & Game Passes (USD / Crypto) */}
      <PricingSection onSelectPlan={handleSelectPlan} />

      {/* Interactive Keybind & Controller Mapper */}
      <ControllerMapper />

      {/* Live Hardware Physical Keypress Visualizer */}
      <section className="py-12 bg-[#07070f] border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <InteractiveGamepadVisualizer />
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <FAQSection />

      {/* Global Footer */}
      <Footer />

      {/* Live Session / Checkout Modal */}
      <SessionModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        selectedPlan={selectedPlan}
      />
    </main>
  );
}
