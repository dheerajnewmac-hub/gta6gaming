"use client";

import React, { useState } from "react";
import { Gamepad2, Home, ArrowRight, Menu, X, User } from "lucide-react";
import { useAuth } from "@/context/auth-context";

interface NavbarProps {
  onOpenPlans: () => void;
  onOpenHowItWorks: () => void;
}

export function Navbar({ onOpenPlans, onOpenHowItWorks }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isLoggedIn, logout } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-4 px-4 sm:px-8 bg-[#060714]/75 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand: Controller Icon + REMOTE / PLAY + LIVE badge */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-white">
            <Gamepad2 className="w-6 h-6 text-white" />
            <span className="font-extrabold text-lg sm:text-xl tracking-wider uppercase text-white">
              REMOTE <span className="text-gray-400 font-light">/</span> PLAY
            </span>
          </div>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
            LIVE
          </span>
        </div>

        {/* Center Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-300">
          <a
            href="#home"
            className="flex items-center gap-1.5 text-cyan-400 relative py-1"
          >
            <Home className="w-4 h-4 text-cyan-400" />
            <span>Home</span>
            <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-cyan-400 shadow-[0_0_8px_#00d2ff]" />
          </a>

          <a
            href="#how-it-works"
            onClick={onOpenHowItWorks}
            className="hover:text-white transition-colors"
          >
            How It Works
          </a>

          <a
            href="#plans"
            onClick={onOpenPlans}
            className="hover:text-white transition-colors"
          >
            Plans
          </a>

          <a
            href="#compatibility"
            className="hover:text-white transition-colors"
          >
            Compatibility
          </a>

          <a
            href="#faq"
            className="hover:text-white transition-colors"
          >
            FAQ
          </a>
        </nav>

        {/* Right Buttons: Sign In / User Badge + View Plans -> */}
        <div className="hidden sm:flex items-center gap-4">
          {isLoggedIn ? (
            <div className="flex items-center gap-2.5">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold shadow-[0_0_10px_rgba(6,182,212,0.3)]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>{user?.gamerTag}</span>
              </div>
              <button
                onClick={logout}
                className="text-[11px] text-gray-400 hover:text-red-400 font-mono transition-colors"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <a
              href="/login"
              className="text-xs font-bold uppercase tracking-wider text-gray-300 hover:text-cyan-400 transition-colors"
            >
              Sign In
            </a>
          )}
          <button
            onClick={onOpenPlans}
            className="px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-[0_0_20px_rgba(147,51,234,0.4)] transition-all flex items-center gap-1.5 hover:scale-105 active:scale-95"
          >
            <span>View Plans</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-gray-300 hover:text-white"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 pt-3 border-t border-white/10 space-y-3 pb-2 text-sm font-semibold">
          <a
            href="#home"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-cyan-400 py-1"
          >
            Home
          </a>
          <a
            href="#how-it-works"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenHowItWorks();
            }}
            className="block text-gray-300 hover:text-white py-1"
          >
            How It Works
          </a>
          <a
            href="#plans"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenPlans();
            }}
            className="block text-gray-300 hover:text-white py-1"
          >
            Plans
          </a>
          <a
            href="#compatibility"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-gray-300 hover:text-white py-1"
          >
            Compatibility
          </a>
          <a
            href="#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-gray-300 hover:text-white py-1"
          >
            FAQ
          </a>
          {isLoggedIn ? (
            <div className="pt-2 border-t border-white/10 flex items-center justify-between">
              <span className="text-cyan-300 font-mono text-xs">{user?.gamerTag}</span>
              <button
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="text-xs text-red-400 font-mono"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <a
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-cyan-400 font-bold py-1 border-t border-white/5 pt-2"
            >
              Sign In to Rig &rarr;
            </a>
          )}
        </div>
      )}
    </header>
  );
}
