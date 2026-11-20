"use client";

import React, { useState } from "react";
import { X, UploadCloud, Check, AlertCircle } from "lucide-react";
import { PaymentMethodConfig } from "@/lib/types";
import { compressImage } from "@/lib/image-compress";

interface MethodEditModalProps {
  initialData: PaymentMethodConfig | null;
  isOpen: boolean;
  onClose: () => void;
  onSaved: () => void;
}

export function MethodEditModal({
  initialData,
  isOpen,
  onClose,
  onSaved,
}: MethodEditModalProps) {
  const [name, setName] = useState(initialData?.name || "");
  const [type, setType] = useState<PaymentMethodConfig["type"]>(initialData?.type || "binance_pay");
  const [accountValue, setAccountValue] = useState(initialData?.accountValue || "");
  const [networkName, setNetworkName] = useState(initialData?.networkName || "Binance Pay ID / UID");
  const [badge, setBadge] = useState(initialData?.badge || "Zero Fees");
  const [instructions, setInstructions] = useState(initialData?.instructions || "");
  const [qrCodeUrl, setQrCodeUrl] = useState<string | undefined>(initialData?.qrCodeUrl);
  const [isComingSoon, setIsComingSoon] = useState(initialData?.isComingSoon || false);
  const [isEnabled, setIsEnabled] = useState(initialData?.isEnabled ?? true);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleQrUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const compressed = await compressImage(file, 800, 0.85);
      setQrCodeUrl(compressed);
    } catch {
      setErrorMsg("Failed to process QR code image.");
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setErrorMsg(null);

    const id = initialData?.id || name.toLowerCase().replace(/[^a-z0-9]/g, "_") || `method_${Date.now()}`;

    const payload: PaymentMethodConfig = {
      id,
      name,
      type,
      accountValue: accountValue.trim(),
      networkName,
      qrCodeUrl,
      instructions,
      badge: badge.trim() || undefined,
      isEnabled,
      isComingSoon,
      sortOrder: initialData?.sortOrder || 1,
    };

    try {
      const res = await fetch("/api/admin/payment-methods", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || "Save failed");
      onSaved();
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Error saving");
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative max-w-lg w-full bg-[#0a0d24] border border-cyan-500/40 rounded-3xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto text-xs">
        <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
          <h4 className="text-sm font-bold text-white font-mono">
            {initialData ? `Edit: ${initialData.name}` : "Configure New Payment Method"}
          </h4>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-3 font-sans">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Method Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Binance Pay"
                className="w-full px-3 py-2 rounded-xl bg-[#060818] border border-white/10 text-white outline-none focus:border-cyan-400 font-mono text-xs"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as PaymentMethodConfig["type"])}
                className="w-full px-3 py-2 rounded-xl bg-[#060818] border border-white/10 text-white outline-none focus:border-cyan-400 font-mono text-xs"
              >
                <option value="binance_pay">Binance Pay (Pay ID / Email)</option>
                <option value="crypto_address">Crypto Address (TRC20, etc.)</option>
                <option value="card">Card / Apple Pay</option>
                <option value="custom">Custom Transfer</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">
              {type === "binance_pay" ? "Binance Pay ID / UID / Email" : "Wallet Address / Account Value"}
            </label>
            <input
              type="text"
              value={accountValue}
              onChange={(e) => setAccountValue(e.target.value)}
              placeholder={type === "binance_pay" ? "e.g. 849201948 or user@email.com" : "e.g. TFH1z3sC2MHPGZpw3KvTt9QegbJJCyD8ii"}
              className="w-full px-3 py-2 rounded-xl bg-[#060818] border border-white/10 text-white outline-none focus:border-cyan-400 font-mono text-xs"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Network Subtitle</label>
              <input
                type="text"
                value={networkName}
                onChange={(e) => setNetworkName(e.target.value)}
                placeholder="e.g. Binance Pay Direct"
                className="w-full px-3 py-2 rounded-xl bg-[#060818] border border-white/10 text-white outline-none focus:border-cyan-400 font-mono text-xs"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Badge Tag</label>
              <input
                type="text"
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                placeholder="e.g. Zero Fees or Instant"
                className="w-full px-3 py-2 rounded-xl bg-[#060818] border border-white/10 text-white outline-none focus:border-cyan-400 font-mono text-xs"
              />
            </div>
          </div>

          {/* QR Code Upload */}
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Optional QR Code Image</label>
            {qrCodeUrl ? (
              <div className="flex items-center gap-3 p-2 rounded-xl bg-[#060818] border border-white/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={qrCodeUrl} alt="QR Code" className="w-12 h-12 object-contain bg-white rounded-lg p-1" />
                <button
                  type="button"
                  onClick={() => setQrCodeUrl(undefined)}
                  className="text-red-400 hover:underline text-xs"
                >
                  Remove QR Code
                </button>
              </div>
            ) : (
              <label className="border border-dashed border-white/20 hover:border-cyan-500 rounded-xl p-3 flex flex-col items-center justify-center cursor-pointer bg-[#060818]">
                <UploadCloud className="w-4 h-4 text-cyan-400 mb-1" />
                <span className="text-slate-300">Upload Binance Pay / Crypto QR Code</span>
                <input type="file" accept="image/*" onChange={handleQrUpload} className="hidden" />
              </label>
            )}
          </div>

          {/* Options: isComingSoon and isEnabled */}
          <div className="flex items-center gap-6 pt-2 font-mono">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isEnabled}
                onChange={(e) => setIsEnabled(e.target.checked)}
                className="w-4 h-4 rounded text-cyan-500 bg-[#060818] border-white/20"
              />
              <span className="text-white">Active / Enabled</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isComingSoon}
                onChange={(e) => setIsComingSoon(e.target.checked)}
                className="w-4 h-4 rounded text-amber-500 bg-[#060818] border-white/20"
              />
              <span className="text-amber-300">Mark as Coming Soon</span>
            </label>
          </div>

          {errorMsg && (
            <div className="p-2 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="flex gap-2 pt-3 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:brightness-110 text-white font-bold shadow-[0_0_15px_rgba(6,182,212,0.4)]"
            >
              {saving ? "Saving Changes..." : "Save Payment Method"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
