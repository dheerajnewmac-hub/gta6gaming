"use client";

import React, { useEffect } from "react";
import { X, ExternalLink, Download } from "lucide-react";

interface ScreenshotModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string | null;
  paymentId: string;
}

export function ScreenshotModal({
  isOpen,
  onClose,
  imageUrl,
  paymentId,
}: ScreenshotModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !imageUrl) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-150">
      <div className="relative max-w-3xl w-full bg-[#0a0d24] border border-cyan-500/40 rounded-3xl overflow-hidden shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10 bg-[#060818]">
          <div>
            <h4 className="text-sm font-bold text-white font-mono">
              Proof Inspection: {paymentId}
            </h4>
            <span className="text-[10px] text-slate-400 font-mono">
              Inspect transaction details and hash
            </span>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={imageUrl}
              download={`${paymentId}-proof.png`}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
              title="Download image"
            >
              <Download className="w-4 h-4" />
            </a>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Image Display */}
        <div className="p-4 max-h-[75vh] overflow-auto flex items-center justify-center bg-black/50">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt="Payment screenshot proof"
            className="max-h-[70vh] w-auto object-contain rounded-xl border border-white/10 shadow-lg"
          />
        </div>

      </div>
    </div>
  );
}
