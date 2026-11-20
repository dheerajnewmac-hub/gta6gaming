"use client";

import { useState } from 'react';
import { MonitorPlay } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
  loading?: 'eager' | 'lazy';
}

export function ResilientImage({
  src,
  alt,
  className = '',
  fallbackTitle = 'ViceCloud 4K HDR Stream',
  loading = 'lazy',
}: ResilientImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#1C1629] via-[#261727] to-[#12101A] p-6 text-center ${className}`}
      >
        <MonitorPlay className="h-8 w-8 text-[#FF5E4D]" aria-hidden="true" />
        <span className="font-display text-lg font-bold tracking-wide text-[#FAF6F0]">
          {fallbackTitle}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
