"use client";

import React, { useState, useEffect } from "react";
import { UploadCloud, X, AlertCircle, Loader2 } from "lucide-react";
import { useAuth } from "@/context/auth-context";
import { compressImage } from "@/lib/image-compress";
import { PaymentMethodConfig } from "@/lib/types";
import { CheckoutTabs } from "./checkout/checkout-tabs";
import { ComingSoonCard } from "./checkout/coming-soon-card";
import { PaymentInstructionsCard } from "./checkout/payment-instructions-card";

interface CryptoCheckoutProps {
  planName: string;
  price: string;
  hours: string;
  onPaymentSubmitted: (paymentId: string) => void;
}

const DEFAULT_METHODS: PaymentMethodConfig[] = [
  {
    id: "trc20",
    name: "USDT (TRC-20)",
    type: "crypto_address",
    accountValue: "TFH1z3sC2MHPGZpw3KvTt9QegbJJCyD8ii",
    networkName: "Tron (TRC-20)",
    instructions: "Send exact USDT amount to this Tron TRC-20 address.",
    badge: "Instant 0% Fee",
    isEnabled: true,
    isComingSoon: false,
    sortOrder: 1,
  },
  {
    id: "binance_pay",
    name: "Binance Pay",
    type: "binance_pay",
    accountValue: "",
    networkName: "Binance Pay ID / UID",
    instructions: "Send payment via Binance Pay ID/UID with zero network gas fees.",
    badge: "Zero Fees",
    isEnabled: true,
    isComingSoon: false,
    sortOrder: 2,
  },
  {
    id: "card",
    name: "Card / Apple Pay",
    type: "card",
    accountValue: "",
    networkName: "Visa, MasterCard, Apple Pay",
    instructions: "Visa, MasterCard & Apple Pay integration is currently undergoing compliance setup.",
    badge: "Coming Soon",
    isEnabled: true,
    isComingSoon: true,
    sortOrder: 3,
  },
];

export function CryptoCheckoutView({
  planName,
  price,
  hours,
  onPaymentSubmitted,
}: CryptoCheckoutProps) {
  const { user } = useAuth();
  const [methods, setMethods] = useState<PaymentMethodConfig[]>(DEFAULT_METHODS);
  const [selectedId, setSelectedId] = useState<string>("trc20");
  const [email, setEmail] = useState(user?.email || "");
  const [txid, setTxid] = useState("");
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [compressing, setCompressing] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    async function loadMethods() {
      try {
        const res = await fetch("/api/payment-methods");
        const data = await res.json();
        if (data.success && Array.isArray(data.methods) && data.methods.length > 0) {
          setMethods(data.methods);
          const firstActive = data.methods.find((m: PaymentMethodConfig) => !m.isComingSoon);
          if (firstActive) setSelectedId(firstActive.id);
        }
      } catch {
        // Fallback to defaults
      }
    }
    loadMethods();
  }, []);

  const activeMethod = methods.find((m) => m.id === selectedId) || methods[0];

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setErrorMsg(null);
    setCompressing(true);
    try {
      const compressedDataUrl = await compressImage(file);
      setScreenshot(compressedDataUrl);
    } catch {
      setErrorMsg("Failed to read image. Please try a different photo format.");
    } finally {
      setCompressing(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return setErrorMsg("Please enter your email to receive session access.");
    if (!screenshot) return setErrorMsg("Please upload your payment screenshot before verifying.");

    setSubmitting(true);
    setErrorMsg(null);

    try {
      const res = await fetch("/api/payments/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userEmail: email,
          gamerTag: user?.gamerTag || `Gamer_${email.split("@")[0]}`,
          planName,
          amount: price,
          hours,
          walletAddress: activeMethod.accountValue || activeMethod.name,
          paymentMethod: activeMethod.name,
          txid: txid.trim() || undefined,
          screenshotUrl: screenshot,
        }),
      });

      if (!res.ok) {
        const errText = await res.text();
        let parsed = "Failed to submit payment verification.";
        try {
          parsed = JSON.parse(errText).error || parsed;
        } catch {
          if (res.status === 413) parsed = "Image file is too large. Please select a smaller photo.";
        }
        throw new Error(parsed);
      }

      const data = await res.json();
      if (!data.success) throw new Error(data.error || "Submission failed");
      onPaymentSubmitted(data.payment.id);
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Error submitting payment");
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      <CheckoutTabs
        methods={methods}
        selectedId={selectedId}
        onSelect={(id) => {
          setSelectedId(id);
          setErrorMsg(null);
        }}
      />

      {activeMethod.isComingSoon ? (
        <ComingSoonCard
          method={activeMethod}
          onSwitchToActive={() => {
            const firstActive = methods.find((m) => !m.isComingSoon);
            if (firstActive) setSelectedId(firstActive.id);
          }}
        />
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3.5">
          <PaymentInstructionsCard method={activeMethod} price={price} />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
            <div>
              <label className="block text-[11px] text-gray-400 mb-1">Your Email (for Node Access)</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="w-full px-3 py-2 rounded-xl bg-[#070919] border border-white/10 text-white focus:border-cyan-400 outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] text-gray-400 mb-1">
                {activeMethod.type === "binance_pay" ? "Binance Order ID / Note (Optional)" : "TXID / Hash (Optional)"}
              </label>
              <input
                type="text"
                value={txid}
                onChange={(e) => setTxid(e.target.value)}
                placeholder={activeMethod.type === "binance_pay" ? "Order ID / Reference" : "Transaction hash"}
                className="w-full px-3 py-2 rounded-xl bg-[#070919] border border-white/10 text-white focus:border-cyan-400 outline-none font-mono text-[11px]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] text-gray-400 mb-1">
              Upload Payment Screenshot (Proof) <span className="text-pink-400">*</span>
            </label>
            {compressing ? (
              <div className="p-3 rounded-xl border border-cyan-500/40 bg-[#070919] flex items-center justify-center gap-2 text-cyan-300 text-xs">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Optimizing photo...</span>
              </div>
            ) : screenshot ? (
              <div className="relative rounded-xl overflow-hidden border border-emerald-500/40 p-2 bg-[#0c132c] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={screenshot} alt="Payment proof preview" className="w-12 h-12 object-cover rounded-lg border border-white/10" />
                  <div>
                    <span className="text-xs text-emerald-400 font-mono font-bold block">Screenshot attached</span>
                    <span className="text-[10px] text-slate-400">Ready to verify</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setScreenshot(null)}
                  className="p-1 rounded-lg bg-white/10 hover:bg-red-500/20 text-gray-400 hover:text-red-400"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <label className="border-2 border-dashed border-white/15 hover:border-cyan-500/50 rounded-xl p-3 flex flex-col items-center justify-center cursor-pointer bg-[#070919]/60 transition-colors">
                <UploadCloud className="w-5 h-5 text-cyan-400 mb-1" />
                <span className="text-xs text-slate-300 font-medium">Click to upload screenshot</span>
                <span className="text-[10px] text-slate-500">Supports all image formats (PNG, JPG, HEIC, WEBP, etc.)</span>
                <input
                  type="file"
                  accept="image/*,.png,.jpg,.jpeg,.webp,.heic,.heif,.bmp,.svg"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {errorMsg && (
            <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={submitting || compressing}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 hover:brightness-110 text-white font-extrabold text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(0,210,255,0.4)] active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {submitting ? (
              <span>Submitting Verification...</span>
            ) : (
              <span>Submit Screenshot &amp; Verify Payment</span>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
