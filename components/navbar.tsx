"use client";

import React, { useState, useEffect } from "react";
import { Gamepad2, Zap, ShieldCheck, Menu, X } from "lucide-react";

interface NavbarProps {
  onOpenPingTest?: () => void;
  onOpenPlans?: () => void;
  onLaunchDemo?: () => void;
}

export function Navbar({ onOpenPingTest, onOpenPlans, onLaunchDemo }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#08080f]/90 backdrop-blur-md border-b border-white/10 py-3 shadow-2xl shadow-pink-950/20"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-pink-500 via-purple-600 to-cyan-400 p-[2px] shadow-lg shadow-pink-500/30">
              <div className="w-full h-full bg-[#0b0b16] rounded-[10px] flex items-center justify-center">
                <Gamepad2 className="w-5 h-5 text-cyan-400 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-300 to-cyan-400">
                  VICE<span className="text-white">CLOUD</span>
                </span>
                <span className="px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-widest bg-pink-500/20 text-pink-400 border border-pink-500/40 rounded">
                  GTA VI
                </span>
              </div>
              <p className="text-[10px] text-gray-400 -mt-0.5 tracking-tight hidden sm:block">
                Dedicated PS5 Fleet Streaming
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-7">
            <a
              href="#how-it-works"
              className="text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors"
            >
              How It Works
            </a>
            <button
              onClick={onOpenPingTest}
              className="text-sm font-medium text-gray-300 hover:text-pink-400 transition-colors flex items-center gap-1.5"
            >
              <Zap className="w-3.5 h-3.5 text-yellow-400" />
              Ping Benchmark
            </button>
            <a
              href="#pricing"
              onClick={onOpenPlans}
              className="text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors"
            >
              Rental Plans
            </a>
            <a
              href="#controls"
              className="text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors"
            >
              Keybinds & Controllers
            </a>
            <a
              href="#faq"
              className="text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors"
            >
              FAQ
            </a>
          </div>

          {/* Right Fleet Indicator + CTA */}
          <div className="hidden sm:flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>842 PS5 Nodes Ready</span>
            </div>

            <button
              onClick={onLaunchDemo}
              className="relative group px-5 py-2.5 rounded-xl font-bold text-xs tracking-wider uppercase text-white overflow-hidden transition-all duration-300 shadow-lg shadow-pink-500/25 hover:shadow-pink-500/50 hover:scale-105 active:scale-95"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-500"></span>
              <span className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity"></span>
              <span className="relative z-10 flex items-center gap-2">
                <Zap className="w-3.5 h-3.5" />
                Launch Demo
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:text-white"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-white/10 space-y-3 pb-3">
            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm text-gray-300 hover:text-pink-400 py-1"
            >
              How It Works
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPingTest?.();
              }}
              className="block w-full text-left text-sm text-gray-300 hover:text-yellow-400 py-1"
            >
              Ping Benchmark
            </button>
            <a
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm text-gray-300 hover:text-cyan-400 py-1"
            >
              Rental Plans
            </a>
            <a
              href="#controls"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm text-gray-300 hover:text-cyan-400 py-1"
            >
              Keybinds & Controllers
            </a>
            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onLaunchDemo?.();
                }}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-cyan-500 font-bold text-xs uppercase tracking-wider text-white"
              >
                Launch Demo
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
