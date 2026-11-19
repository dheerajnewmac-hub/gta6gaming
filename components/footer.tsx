"use client";

import React from "react";
import { Gamepad2, Shield, Heart, Zap, Globe } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#05050a] border-t border-white/10 text-gray-400 text-xs py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-pink-500 to-cyan-400 p-[2px]">
                <div className="w-full h-full bg-[#0b0b14] rounded-[6px] flex items-center justify-center">
                  <Gamepad2 className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <span className="font-extrabold text-base tracking-wider text-white">
                VICE<span className="text-pink-500">CLOUD</span>
              </span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Global PlayStation 5 cloud streaming array. Enabling gamers worldwide to play Grand Theft Auto VI at 4K 60FPS without buying expensive hardware.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-3 text-xs">
              Platform
            </h4>
            <ul className="space-y-2">
              <li><a href="#how-it-works" className="hover:text-cyan-400 transition-colors">How Cloud Rigs Work</a></li>
              <li><a href="#ping-test" className="hover:text-cyan-400 transition-colors">Latency Diagnostic</a></li>
              <li><a href="#pricing" className="hover:text-cyan-400 transition-colors">Rental Passes & Pricing</a></li>
              <li><a href="#controls" className="hover:text-cyan-400 transition-colors">Keyboard & Controller Mapper</a></li>
            </ul>
          </div>

          {/* Global Datacenters */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-3 text-xs">
              Global Clusters
            </h4>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center gap-2"><span>🇺🇸</span> US East & West (14ms - 24ms)</li>
              <li className="flex items-center gap-2"><span>🇩🇪</span> Europe Central (18ms - 22ms)</li>
              <li className="flex items-center gap-2"><span>🇯🇵</span> Asia Pacific (26ms - 32ms)</li>
              <li className="flex items-center gap-2"><span>🇧🇷</span> Latin America (30ms - 38ms)</li>
            </ul>
          </div>

          {/* Security & Guarantees */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs">
              Enterprise Security
            </h4>
            <div className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                <Shield className="w-4 h-4" />
                <span>Isolated PS5 Sandboxes</span>
              </div>
              <p className="text-[11px] text-gray-400">
                User credentials and cloud save archives are encrypted with AES-256 protocols.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Disclaimer */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-gray-500">
          <div>
            &copy; {new Date().getFullYear()} ViceCloud Gaming Infrastructure. All rights reserved.
          </div>
          <div className="text-center sm:text-right text-[10px] text-gray-600 max-w-xl">
            Grand Theft Auto, GTA VI, and PlayStation are trademarks of their respective owners (Rockstar Games, Take-Two Interactive, and Sony Interactive Entertainment). ViceCloud provides physical hardware streaming rental services.
          </div>
        </div>

      </div>
    </footer>
  );
}
