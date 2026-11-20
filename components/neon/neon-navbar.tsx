"use client";

import React, { useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";

interface NeonNavbarProps {
  onOpenPlans: () => void;
  onOpenLogin: () => void;
  isLoggedIn?: boolean;
  gamerTag?: string;
  onSignOut?: () => void;
}

export function NeonNavbar({
  onOpenPlans,
  onOpenLogin,
  isLoggedIn,
  gamerTag,
  onSignOut,
}: NeonNavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-50 w-full px-4 sm:px-6 lg:px-8 py-3.5 backdrop-blur-xl bg-[#070414]/80 border-b border-pink-500/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Left: ViceCloud Logo */}
        <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-pink-500 via-purple-600 to-cyan-400 p-[1px] shadow-[0_0_15px_rgba(236,72,153,0.5)]">
            <div className="w-full h-full bg-[#0d0722] rounded-[11px] flex items-center justify-center font-black text-white text-base">
              V
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-base sm:text-lg font-black tracking-wide text-white font-sans leading-none">
              Vice<span className="text-pink-400">Cloud</span>
            </span>
            <span className="text-[8px] font-mono tracking-widest text-slate-400 uppercase mt-0.5">
              PLAY BEYOND LIMITS
            </span>
          </div>
        </div>

        {/* Center: Floating Capsule Nav (Desktop) */}
        <nav className="hidden md:flex items-center gap-1 p-1 bg-[#120a2e]/90 border border-white/10 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.5)] text-xs font-medium text-slate-300">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold shadow-[0_0_12px_rgba(147,51,234,0.4)]"
          >
            Home
          </button>
          <button onClick={() => scrollTo("how-it-works")} className="px-3.5 py-1.5 rounded-full hover:text-white transition-colors">
            How It Works
          </button>
          <button onClick={() => scrollTo("plans")} className="px-3.5 py-1.5 rounded-full hover:text-white transition-colors">
            Plans
          </button>
          <button onClick={() => scrollTo("why-vicecloud")} className="px-3.5 py-1.5 rounded-full hover:text-white transition-colors">
            Compatibility
          </button>
          <button onClick={() => scrollTo("faq")} className="px-3.5 py-1.5 rounded-full hover:text-white transition-colors">
            FAQ
          </button>
          <a
            href="https://t.me/vicecloudspport"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 rounded-full hover:text-white transition-colors"
          >
            Support
          </a>
        </nav>

        {/* Right: Online Beacon + View Plans Button */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#120a2e] border border-emerald-500/30 text-emerald-300 text-[11px] font-mono font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Online</span>
          </div>

          {isLoggedIn ? (
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline-block text-xs font-mono text-cyan-300 bg-cyan-950/40 px-2.5 py-1 rounded-lg border border-cyan-500/30">
                {gamerTag || "Gamer"}
              </span>
              <button
                onClick={onSignOut}
                className="text-xs text-slate-400 hover:text-white font-mono px-2 py-1"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenLogin}
              className="hidden sm:inline-block text-xs font-bold text-slate-300 hover:text-white px-2 py-1"
            >
              Sign In
            </button>
          )}

          <button
            onClick={onOpenPlans}
            className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-rose-500 hover:brightness-110 text-white font-bold text-xs flex items-center gap-1.5 shadow-[0_0_20px_rgba(219,39,119,0.4)] transition-all active:scale-95"
          >
            <span>View Plans</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-slate-300 hover:text-white bg-white/5"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 p-4 rounded-2xl bg-[#0f0828] border border-pink-500/20 space-y-3 text-xs font-bold font-mono">
          <button onClick={() => scrollTo("how-it-works")} className="block w-full text-left py-2 text-slate-300 hover:text-white">
            ● How It Works
          </button>
          <button onClick={() => scrollTo("plans")} className="block w-full text-left py-2 text-slate-300 hover:text-white">
            ● Flexible Plans
          </button>
          <button onClick={() => scrollTo("why-vicecloud")} className="block w-full text-left py-2 text-slate-300 hover:text-white">
            ● Why ViceCloud
          </button>
          <button onClick={() => scrollTo("faq")} className="block w-full text-left py-2 text-slate-300 hover:text-white">
            ● FAQ
          </button>
          <a
            href="https://t.me/vicecloudspport"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-left py-2 text-cyan-400"
          >
            ● Telegram Support (@vicecloudspport)
          </a>
        </div>
      )}
    </header>
  );
}
