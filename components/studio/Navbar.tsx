"use client";

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface NavbarProps {
  selectedPassLabel: string | null;
  onPrimaryAction: () => void;
}

const NAV_LINKS = [
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Plans', href: '#plans' },
  { label: 'Clusters', href: '#clusters' },
  { label: 'Compatibility', href: '#compatibility' },
  { label: 'FAQ', href: '#faq' },
];

export function Navbar({ selectedPassLabel, onPrimaryAction }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[#FF2EA6]/22 bg-[#0B0416]/94">
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between gap-8 px-6 lg:px-10">
        {/* Zone 1: Brand Logo + Single-line Wordmark */}
        <a
          href="#top"
          className="group inline-flex items-center gap-2.5 font-display text-xl font-extrabold tracking-[-0.02em] text-white whitespace-nowrap shrink-0"
        >
          <BrandLogo size="md" />
          <span>
            VICE<span className="text-[#FF2EA6]">CLOUD</span>
          </span>
        </a>

        {/* Zone 2: 5 clean single-line navigation links */}
        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-8 md:flex"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative py-1 text-sm font-medium text-[#E8DDF5] whitespace-nowrap shrink-0 transition-colors duration-150 hover:text-white"
            >
              {link.label}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 -bottom-0.5 h-[2px] origin-left scale-x-0 bg-[#FF2EA6] transition-transform duration-200 group-hover:scale-x-100"
              />
            </a>
          ))}
        </nav>

        {/* Zone 3: Single Hot-Pink Neon Primary Action + Mobile Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onPrimaryAction}
            className="vice-neon-btn hidden min-h-[38px] items-center justify-center rounded-md px-5 py-2 text-xs font-bold whitespace-nowrap shrink-0 sm:inline-flex"
          >
            {selectedPassLabel ? 'Continue Pass' : 'View Plans'}
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[#FF2EA6]/35 bg-[#150926] text-white transition-colors hover:border-[#FF2EA6] md:hidden"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="border-t border-[#FF2EA6]/20 bg-[#0B0416] px-6 py-4 md:hidden">
          <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-md px-3 py-3 text-base font-medium text-[#E8DDF5] transition-colors hover:bg-[#1E0D35] hover:text-white"
              >
                {link.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onPrimaryAction();
              }}
              className="vice-neon-btn mt-3 flex min-h-[44px] w-full items-center justify-center rounded-md px-5 py-2.5 text-sm font-bold whitespace-nowrap"
            >
              View Plans
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
