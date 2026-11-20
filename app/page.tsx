"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { NeonNavbar } from "@/components/neon/neon-navbar";
import { NeonHero } from "@/components/neon/neon-hero";
import { NeonWhySection } from "@/components/neon/neon-why-section";
import { NeonPlans, PlanOption } from "@/components/neon/neon-plans";
import { NeonHowItWorks } from "@/components/neon/neon-how-it-works";
import { NeonDevicesBar } from "@/components/neon/neon-devices-bar";
import { NeonFaq } from "@/components/neon/neon-faq";
import { NeonFooter } from "@/components/neon/neon-footer";
import { SessionModal } from "@/components/session-modal";
import { LiveActivityToast } from "@/components/live-activity-toast";
import { FloatingSupportPill } from "@/components/floating-support-pill";

export default function HomePage() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{
    name: string;
    price: string;
    hours: string;
  } | null>(null);

  useEffect(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get("checkout") === "true") {
        const stored = sessionStorage.getItem("vicecloud_pending_plan");
        if (stored) {
          const parsed = JSON.parse(stored);
          setSelectedPlan(parsed);
          setModalOpen(true);
          sessionStorage.removeItem("vicecloud_pending_plan");
        }
      }
    } catch {
      // Ignore URL or storage errors
    }
  }, []);

  const handleScrollToPlans = () => {
    const el = document.getElementById("plans");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleSelectPlan = (plan: PlanOption) => {
    setSelectedPlan(plan);
    setModalOpen(true);
  };

  return (
    <main className="min-h-screen bg-[#070414] text-slate-100 flex flex-col selection:bg-pink-500 selection:text-white font-sans">
      
      {/* 1. Exact Navbar */}
      <NeonNavbar
        onOpenPlans={handleScrollToPlans}
        onOpenLogin={() => router.push("/login")}
        isLoggedIn={!!user}
        gamerTag={user?.gamerTag}
        onSignOut={logout}
      />

      {/* 2. Exact Hero Section */}
      <NeonHero onStartPlaying={handleScrollToPlans} />

      {/* 3. Exact Why ViceCloud Section */}
      <NeonWhySection />

      {/* 4. Exact Flexible Rental Plans (Starter $4.99, Pro $9.99, Ultimate $14.99) */}
      <NeonPlans onSelectPlan={handleSelectPlan} />

      {/* 5. Exact How It Works Section */}
      <NeonHowItWorks />

      {/* 6. Exact Play on Any Device & Bottom CTA */}
      <NeonDevicesBar onOpenPlans={handleScrollToPlans} />

      {/* 7. FAQ Section */}
      <NeonFaq />

      {/* 8. Footer */}
      <NeonFooter />

      {/* Checkout / Session Launcher Modal with Binance Pay & TRC-20 */}
      <SessionModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        selectedPlan={selectedPlan}
      />

      {/* Live International Gamer Activity Ticker */}
      <LiveActivityToast />

      {/* 24/7 Telegram Operator Support Pill */}
      <FloatingSupportPill />

    </main>
  );
}
