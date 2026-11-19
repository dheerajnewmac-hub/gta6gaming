"use client";

import React, { useState } from "react";
import { Check, Zap, Sparkles, Shield, Clock, Flame } from "lucide-react";

interface PricingSectionProps {
  onSelectPlan: (plan: { name: string; price: string; hours: string }) => void;
}

export function PricingSection({ onSelectPlan }: PricingSectionProps) {
  const [billingCurrency, setBillingCurrency] = useState<"USD" | "CRYPTO">("USD");

  const plans = [
    {
      name: "Quick Hit",
      badge: "TRIAL PASS",
      price: "$1.99",
      cryptoPrice: "1.99 USDT",
      hours: "1 Hour Gameplay",
      description: "Perfect for testing stream fidelity, input latency, and graphics on your PC.",
      popular: false,
      features: [
        "1080p @ 60 FPS Stream",
        "Instant PS5 Rig Allocation",
        "DualSense or Keyboard/Mouse",
        "Standard Queue Priority",
        "Session Save Cloud Storage",
      ],
      buttonText: "Start 1-Hour Test",
      accent: "border-white/10 hover:border-white/30",
    },
    {
      name: "Heist Pass",
      badge: "MOST POPULAR",
      price: "$5.99",
      cryptoPrice: "5.99 USDT",
      hours: "4 Hours Gameplay",
      description: "The gamer favorite. Jump into Vice City missions with zero queue delay.",
      popular: true,
      features: [
        "1080p / 1440p @ 60 FPS",
        "Priority Fast-Lane Queue",
        "DualSense Haptic Emulation",
        "Automatic Save State Cloud Backup",
        "Pause & Resume Anytime (30 Days)",
        "Zero Download or Install",
      ],
      buttonText: "Claim Heist Pass",
      accent: "border-pink-500/80 shadow-2xl shadow-pink-500/20",
    },
    {
      name: "Weekend Syndicate",
      badge: "WEEKEND MARATHON",
      price: "$14.99",
      cryptoPrice: "14.99 USDT",
      hours: "12 Hours Gameplay",
      description: "Designed for intense weekend gaming sessions without interruption.",
      popular: false,
      features: [
        "1440p / 4K @ 60 FPS HDR",
        "VIP High-Bandwidth Uplink",
        "Dedicated Rig Reservation",
        "Permanent Cloud Save Slot",
        "Valid for 3 Full Days",
        "Discord VIP Status",
      ],
      buttonText: "Get Weekend Pass",
      accent: "border-purple-500/40 hover:border-purple-500",
    },
    {
      name: "Storyline Master",
      badge: "CAMPAIGN PASS",
      price: "$29.99",
      cryptoPrice: "29.99 USDT",
      hours: "30 Hours Gameplay",
      description: "Beat the full GTA VI main storyline at your own pace without buying a console.",
      popular: false,
      features: [
        "Full 4K Ultra 60 FPS Stream",
        "Zero Queue Guarantee",
        "Dedicated PS5 Hardware Node",
        "Protected Game Save Archive",
        "Valid for 15 Days",
        "24/7 Priority Support",
      ],
      buttonText: "Conquer The Story",
      accent: "border-cyan-500/40 hover:border-cyan-500",
    },
  ];

  return (
    <section id="pricing" className="py-24 relative overflow-hidden bg-[#080812]">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-pink-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header & Currency Switcher */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Flame className="w-3.5 h-3.5" />
            Flexible Global Rental Passes
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Rent A PS5 Rig. Play GTA VI. Pay As You Go.
          </h2>
          <p className="mt-4 text-gray-400 text-base">
            No recurring contracts. No surprise charges. All passes include full access to GTA VI.
          </p>

          {/* Currency Toggle */}
          <div className="mt-6 inline-flex items-center p-1 rounded-xl bg-[#121222] border border-white/10">
            <button
              onClick={() => setBillingCurrency("USD")}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                billingCurrency === "USD"
                  ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md shadow-pink-500/30"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              USD ($ / Cards / Apple Pay)
            </button>
            <button
              onClick={() => setBillingCurrency("CRYPTO")}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                billingCurrency === "CRYPTO"
                  ? "bg-gradient-to-r from-cyan-400 to-blue-600 text-white shadow-md shadow-cyan-500/30"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Crypto (USDT / SOL / BTC)
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {plans.map((plan) => {
            return (
              <div
                key={plan.name}
                className={`rounded-2xl bg-[#0e0e1c] border p-6 flex flex-col justify-between transition-all duration-300 relative ${
                  plan.accent
                } ${plan.popular ? "scale-105 z-20 bg-gradient-to-b from-[#181328] to-[#0e0e1c]" : "hover:-translate-y-1"}`}
              >
                {/* Popular Flag */}
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-pink-500/40">
                    MOST POPULAR
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold text-gray-400 uppercase tracking-wider">
                      {plan.badge}
                    </span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-white/5 text-cyan-300">
                      {plan.hours}
                    </span>
                  </div>

                  <h3 className="text-2xl font-black text-white">{plan.name}</h3>
                  <p className="text-xs text-gray-400 mt-1 mb-4 leading-relaxed">
                    {plan.description}
                  </p>

                  <div className="flex items-baseline gap-1.5 my-4 pb-4 border-b border-white/10">
                    <span className="text-4xl font-black text-white">
                      {billingCurrency === "USD" ? plan.price : plan.cryptoPrice}
                    </span>
                    <span className="text-xs text-gray-400 font-medium">/ pass</span>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-gray-300">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Select Button */}
                <button
                  onClick={() =>
                    onSelectPlan({
                      name: plan.name,
                      price: billingCurrency === "USD" ? plan.price : plan.cryptoPrice,
                      hours: plan.hours,
                    })
                  }
                  className={`w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-md ${
                    plan.popular
                      ? "bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-500 text-white hover:scale-105 active:scale-95 shadow-pink-500/30"
                      : "bg-[#18182c] hover:bg-[#22223c] text-white border border-white/10 hover:border-cyan-400/40"
                  }`}
                >
                  {plan.buttonText}
                </button>
              </div>
            );
          })}
        </div>

        {/* Guarantee Banner */}
        <div className="mt-12 text-center text-xs text-gray-400 flex items-center justify-center gap-6 flex-wrap">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span>100% Satisfaction or Instant Unused Balance Credit</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-cyan-400" />
            <span>Unused hours never expire for 60 days</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-yellow-400" />
            <span>Instant Activation & Rig Access</span>
          </div>
        </div>

      </div>
    </section>
  );
}
