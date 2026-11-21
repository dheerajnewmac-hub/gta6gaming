"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import { SessionModal } from "@/components/session-modal";
import { LiveActivityToast } from "@/components/live-activity-toast";
import { FloatingSupportPill } from "@/components/floating-support-pill";

export function ExactNeonPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [trailerOpen, setTrailerOpen] = useState(false);
  const [faqModalOpen, setFaqModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{
    name: string;
    price: string;
    hours: string;
  } | null>(null);

  const openPlan = (name: string, price: string, hours: string) => {
    setSelectedPlan({ name, price, hours });
    setModalOpen(true);
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#070414] text-slate-100 flex flex-col items-center justify-start overflow-x-hidden select-none font-sans">
      
      {/* 1024px Centered Canvas Container */}
      <div className="w-full max-w-[1024px] relative bg-[#070414] shadow-[0_0_50px_rgba(0,0,0,0.8)]">
        
        {/* SECTION 1: TOP NAVBAR & HERO (1024 x 520) */}
        <section id="hero" className="relative w-full aspect-[1024/520]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/neon_ui/exact/sec1_hero.png"
            alt="ViceCloud GTA VI Cloud Stream Hero"
            className="w-full h-full object-cover block"
          />

          {/* Interactive Navbar Links */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="absolute top-[2.3%] left-[29.5%] w-[4.5%] h-[5.8%] rounded-full cursor-pointer hover:bg-white/10 transition-colors"
            title="Home"
          />
          <button
            onClick={() => scrollTo("how-it-works")}
            className="absolute top-[2.3%] left-[34.2%] w-[8.2%] h-[5.8%] rounded-full cursor-pointer hover:bg-white/10 transition-colors"
            title="How It Works"
          />
          <button
            onClick={() => scrollTo("plans")}
            className="absolute top-[2.3%] left-[42.7%] w-[5.2%] h-[5.8%] rounded-full cursor-pointer hover:bg-white/10 transition-colors"
            title="Plans"
          />
          <button
            onClick={() => scrollTo("why-vicecloud")}
            className="absolute top-[2.3%] left-[48.2%] w-[8.8%] h-[5.8%] rounded-full cursor-pointer hover:bg-white/10 transition-colors"
            title="Compatibility"
          />
          <button
            onClick={() => setFaqModalOpen(true)}
            className="absolute top-[2.3%] left-[57.3%] w-[4.2%] h-[5.8%] rounded-full cursor-pointer hover:bg-white/10 transition-colors"
            title="FAQ"
          />
          <a
            href="https://t.me/vicecloudspport"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-[2.3%] left-[61.8%] w-[6.5%] h-[5.8%] rounded-full cursor-pointer hover:bg-white/10 transition-colors"
            title="Support"
          />

          {/* Top Navbar "View Plans ->" Button */}
          <button
            onClick={() => scrollTo("plans")}
            className="absolute top-[2.3%] left-[82.5%] w-[10.7%] h-[5.8%] rounded-full cursor-pointer hover:brightness-125 transition-all shadow-[0_0_15px_rgba(236,72,153,0.3)] active:scale-95"
            title="View Plans"
          />

          {/* Hero "Start Playing Now ->" Button */}
          <button
            onClick={() => openPlan("Pro (Most Popular)", "$9.99", "3 Hours")}
            className="absolute top-[45.7%] left-[5.6%] w-[16.8%] h-[7.2%] rounded-full cursor-pointer hover:brightness-125 transition-all shadow-[0_0_20px_rgba(236,72,153,0.5)] active:scale-95"
            title="Start Playing Now"
          />

          {/* Hero "Watch Trailer" Button */}
          <button
            onClick={() => setTrailerOpen(true)}
            className="absolute top-[45.7%] left-[23.9%] w-[13.2%] h-[7.2%] rounded-full cursor-pointer hover:bg-white/15 transition-all active:scale-95"
            title="Watch 4K Trailer"
          />
        </section>


        {/* SECTION 2: WHY VICECLOUD? (1024 x 240) */}
        <section id="why-vicecloud" className="relative w-full aspect-[1024/240]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/neon_ui/exact/sec2_why.png"
            alt="Why ViceCloud Next-Gen Cloud Gaming"
            className="w-full h-full object-cover block"
          />

          {/* "Learn More ->" Button */}
          <button
            onClick={() => scrollTo("plans")}
            className="absolute top-[66.6%] left-[4.8%] w-[10.8%] h-[14.6%] rounded-full cursor-pointer hover:bg-pink-500/20 transition-all active:scale-95"
            title="Learn More"
          />
        </section>


        {/* SECTION 3: FLEXIBLE RENTAL PLANS (1024 x 340) */}
        <section id="plans" className="relative w-full aspect-[1024/340]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/neon_ui/exact/sec3_plans.png"
            alt="Flexible Rental Plans GTA VI"
            className="w-full h-full object-cover block"
          />

          {/* Card 1: Starter ($4.99 / 1 Hour) "Start Now ->" Button */}
          <button
            onClick={() => openPlan("Starter", "$4.99", "1 Hour")}
            className="absolute top-[76.4%] left-[18.0%] w-[12.7%] h-[9.5%] rounded-full cursor-pointer hover:bg-white/20 transition-all active:scale-95"
            title="Order Starter Pass ($4.99)"
          />

          {/* Card 2: Pro ($9.99 / 3 Hours) "Start Now ->" Button */}
          <button
            onClick={() => openPlan("Pro (Most Popular)", "$9.99", "3 Hours")}
            className="absolute top-[76.4%] left-[48.3%] w-[13.2%] h-[9.5%] rounded-full cursor-pointer hover:brightness-125 transition-all shadow-[0_0_20px_rgba(236,72,153,0.6)] active:scale-95"
            title="Order Pro Pass ($9.99)"
          />

          {/* Card 3: Ultimate ($14.99 / 6 Hours) "Start Now ->" Button */}
          <button
            onClick={() => openPlan("Ultimate", "$14.99", "6 Hours")}
            className="absolute top-[76.4%] left-[77.6%] w-[12.7%] h-[9.5%] rounded-full cursor-pointer hover:bg-white/20 transition-all active:scale-95"
            title="Order Ultimate Pass ($14.99)"
          />
        </section>


        {/* SECTION 4: HOW IT WORKS (1024 x 260) */}
        <section id="how-it-works" className="relative w-full aspect-[1024/260]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/neon_ui/exact/sec4_how.png"
            alt="How It Works Timeline and Vice City Sports Car"
            className="w-full h-full object-cover block"
          />
        </section>


        {/* SECTION 5: PLAY ON ANY DEVICE & BOTTOM CTA (1024 x 176) */}
        <section id="devices" className="relative w-full aspect-[1024/176]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/neon_ui/exact/sec5_bottom.png"
            alt="Play on Any Device and Live the GTA VI Dream with ViceCloud"
            className="w-full h-full object-cover block"
          />

          {/* Bottom Card "View Plans ->" Button */}
          <button
            onClick={() => scrollTo("plans")}
            className="absolute top-[53.9%] left-[77.6%] w-[13.2%] h-[20.0%] rounded-full cursor-pointer hover:brightness-125 transition-all shadow-[0_0_20px_rgba(219,39,119,0.6)] active:scale-95"
            title="View All Plans"
          />
        </section>

      </div>


      {/* 4K TRAILER MODAL */}
      {trailerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="relative max-w-4xl w-full bg-[#0a071f] border border-pink-500/40 rounded-3xl p-4 shadow-2xl space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="text-xs font-bold text-white font-mono flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-pink-500 animate-ping" />
                Grand Theft Auto VI — Official 4K Trailer
              </span>
              <button onClick={() => setTrailerOpen(false)} className="p-1 rounded-lg text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-black">
              <iframe
                src="https://www.youtube-nocookie.com/embed/QdBZY2fkU-0?autoplay=1"
                title="Grand Theft Auto VI Trailer"
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}


      {/* FAQ MODAL */}
      {faqModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative max-w-lg w-full bg-[#0d0724] border border-pink-500/40 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <h3 className="text-sm font-bold text-white font-mono">Frequently Asked Questions</h3>
              <button onClick={() => setFaqModalOpen(false)} className="p-1 rounded-lg text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                <h4 className="font-bold text-pink-300 mb-1">Do I need a gaming PC?</h4>
                <p className="text-slate-300">No. The game runs on dedicated PS5 console clusters and streams 4K 60FPS to your web browser with zero downloads.</p>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                <h4 className="font-bold text-cyan-300 mb-1">How do I pay?</h4>
                <p className="text-slate-300">We accept Binance Pay (ID &amp; QR) and USDT TRC-20 with zero fees and instant verification.</p>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                <h4 className="font-bold text-purple-300 mb-1">Need help?</h4>
                <p className="text-slate-300">Contact our 24/7 operator support on Telegram: <a href="https://t.me/ViceCloudSupport" target="_blank" rel="noreferrer" className="text-cyan-400 underline">@ViceCloudSupport</a>.</p>
              </div>
            </div>
          </div>
        </div>
      )}


      {/* Dynamic Checkout Modal with Binance Pay & TRC-20 */}
      <SessionModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        selectedPlan={selectedPlan}
      />

      {/* Live Activity Toast */}
      <LiveActivityToast />

      {/* 24/7 Telegram Floating Support */}
      <FloatingSupportPill />

    </div>
  );
}
