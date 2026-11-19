"use client";

import React from "react";
import { ShieldCheck, Lock, CreditCard, RefreshCw, MessageSquare } from "lucide-react";

export function InternationalTrustBar() {
  return (
    <section className="py-8 bg-[#04050c] border-t border-b border-white/5 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          
          <div className="flex flex-col items-center">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 mb-2 border border-cyan-500/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-white">Isolated Sandboxes</h4>
            <p className="text-[11px] text-gray-400 mt-0.5">Encrypted private profile storage</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 mb-2 border border-purple-500/20">
              <CreditCard className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-white">Global Payments</h4>
            <p className="text-[11px] text-gray-400 mt-0.5">Stripe, Apple Pay, Cards &amp; Crypto</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 mb-2 border border-emerald-500/20">
              <RefreshCw className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-white">15-Min Ping Guarantee</h4>
            <p className="text-[11px] text-gray-400 mt-0.5">Instant rig swap if latency spikes</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="p-2.5 rounded-xl bg-yellow-500/10 text-yellow-400 mb-2 border border-yellow-500/20">
              <MessageSquare className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-white">24/7 Discord Support</h4>
            <p className="text-[11px] text-gray-400 mt-0.5">Real human gamer staff online</p>
          </div>

        </div>
      </div>
    </section>
  );
}
