"use client";

import { useState } from 'react';
import { STORE_ASSETS } from '@/lib/studio/storeData';

interface BrandLogoProps {
  size?: 'sm' | 'md';
}

export function BrandLogo({ size = 'md' }: BrandLogoProps) {
  const [failed, setFailed] = useState(false);
  const boxSize = size === 'sm' ? 'h-8 w-8 rounded-lg' : 'h-9 w-9 rounded-lg';

  return (
    <span
      className={`relative inline-flex shrink-0 items-center justify-center overflow-hidden border border-[#FF2EA6]/45 bg-[#0B0416] shadow-[0_0_14px_rgba(255,46,166,0.28)] transition-transform duration-200 group-hover:scale-105 ${boxSize}`}
    >
      {!failed ? (
        <img
          src={STORE_ASSETS.viceCloudLogo}
          alt="ViceCloud emblem"
          referrerPolicy="no-referrer"
          onError={() => setFailed(true)}
          className="h-full w-full scale-[1.24] object-cover"
        />
      ) : (
        <svg
          viewBox="0 0 32 32"
          aria-hidden="true"
          className="h-5 w-5"
          fill="none"
        >
          <path
            d="M8.5 11.5L16 24.5L23.5 11.5"
            stroke="#FF2EA6"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M17.5 6.5L13.5 14.5H18.5L14.5 21.5"
            stroke="#FFD166"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </span>
  );
}
