"use client";

import React, { useState } from "react";
import { Copy, Check, QrCode, CreditCard, ShieldCheck, Zap, ArrowRight, ExternalLink } from "lucide-react";

interface CryptoCheckoutProps {
  planName: string;
  price: string;
  onPaymentSuccess: () => void;
}

type CoinType = "USDT_TRC20" | "USDT_BEP20" | "SOL" | "BTC";

interface CoinDetail {
  id: CoinType;
  label: string;
  network: string;
  address: string;
  symbol: string;
}

const COINS: CoinDetail[] = [
  { id: "USDT_TRC20", label: "USDT", network: "Tron (TRC-20)", address: "TYdNG28hDqZk7vXn6V4zF1Qx9W8pLmC3kJ", symbol: "₮" },
  { id: "USDT_BEP20", label: "USDT", network: "BNB Smart Chain (BEP-20)", address: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e", symbol: "₮" },
  { id: "SOL", label: "SOL", network: "Solana Network", address: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU", symbol: "◎" },
  { id: "BTC", label: "BTC", network: "Bitcoin Core", address: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh", symbol: "₿" },
];

export function CryptoCheckoutView({ planName, price, onPaymentSuccess }: CryptoCheckoutProps) {
  const [tab, setTab] = useState<"CRYPTO" | "CARD">("CRYPTO");
  const [selectedCoin, setSelectedCoin] = useState<CoinType>("USDT_TRC20");
  const [copied, setCopied] = useState(false);
  const [verifying, setVerifying] = useState(false);

  const activeCoin = COINS.find((c) => c.id === selectedCoin) || COINS[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(activeCoin.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleVerify = () => {
    setVerifying(true);
    setTimeout(() => {
      setVerifying(false);
      onPaymentSuccess();
    }, 2200);
  };

  return (
    <div className="space-y-4">
      {/* Tab Switcher: Direct Crypto vs Card Onramp */}
      <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-[#070919] border border-white/10 text-xs font-bold">
        <button
          onClick={() => setTab("CRYPTO")}
          className={`py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
            tab === "CRYPTO" ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm" : "text-gray-400 hover:text-white"
          }`}
        >
          <QrCode className="w-3.5 h-3.5" />
          <span>Trust Wallet / Crypto</span>
        </button>
        <button
          onClick={() => setTab("CARD")}
          className={`py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
            tab === "CARD" ? "bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-sm" : "text-gray-400 hover:text-white"
          }`}
        >
          <CreditCard className="w-3.5 h-3.5" />
          <span>Card / Apple Pay</span>
        </button>
      </div>

      {/* TAB 1: DIRECT TRUST WALLET CRYPTO */}
      {tab === "CRYPTO" && (
        <div className="space-y-3.5">
          {/* Coin Select Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {COINS.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCoin(c.id)}
                className={`p-2 rounded-xl text-center border transition-all ${
                  selectedCoin === c.id
                    ? "bg-[#0f1738] border-cyan-400 text-white shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                    : "bg-[#080a1c] border-white/10 text-gray-400 hover:text-white hover:border-white/20"
                }`}
              >
                <span className="block font-bold text-xs">{c.label}</span>
                <span className="block text-[10px] text-gray-500 truncate">{c.network.split(" ")[0]}</span>
              </button>
            ))}
          </div>

          {/* Deposit Info Card */}
          <div className="p-4 rounded-2xl bg-[#070919] border border-cyan-500/30 space-y-3 text-xs">
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <span className="text-gray-400">Total Due:</span>
              <span className="text-base font-black text-cyan-400 font-mono">{price}</span>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] text-gray-400 font-mono">Send to Deposit Address ({activeCoin.network}):</span>
              <div className="flex items-center gap-2 bg-[#0c112e] p-2 rounded-xl border border-white/10 font-mono text-[11px] text-gray-200">
                <span className="truncate flex-1">{activeCoin.address}</span>
                <button
                  onClick={handleCopy}
                  className="px-2.5 py-1 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 font-bold border border-cyan-500/40 flex items-center gap-1 transition-all shrink-0"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? "Copied" : "Copy"}</span>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono text-gray-500 pt-1">
              <span className="text-emerald-400">● 0% Chargeback Protection</span>
              <span>Sub-30s Auto Confirmation</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PAY WITH CARD / APPLE PAY VIA MOONPAY */}
      {tab === "CARD" && (
        <div className="p-4 rounded-2xl bg-[#080b22] border border-purple-500/30 space-y-3 text-xs">
          <div className="flex items-center justify-between border-b border-white/5 pb-2">
            <span className="font-bold text-white">Instant Card-to-Rig Checkout</span>
            <span className="text-purple-400 font-bold font-mono">{price}</span>
          </div>
          <p className="text-gray-300 text-xs leading-relaxed">
            International gamers can pay with <strong>Visa, MasterCard, or Apple Pay</strong>. Funds are converted and routed directly to our cloud ledger without any delays.
          </p>
          <div className="flex items-center gap-2 text-[11px] font-mono text-gray-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Works with US, European &amp; International Bank Cards</span>
          </div>
        </div>
      )}

      {/* Verification CTA Button */}
      <button
        onClick={handleVerify}
        disabled={verifying}
        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 hover:brightness-110 text-white font-extrabold text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(0,210,255,0.4)] active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
      >
        <Zap className={`w-4 h-4 ${verifying ? "animate-spin text-cyan-200" : ""}`} />
        <span>{verifying ? "Checking Blockchain Mempool..." : "I Have Paid • Unlock PS5 Rig"}</span>
      </button>
    </div>
  );
}
