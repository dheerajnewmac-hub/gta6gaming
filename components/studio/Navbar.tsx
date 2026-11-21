"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, User, LogOut } from 'lucide-react';
import { useAuth } from '@/context/auth-context';
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
  const { user, logout } = useAuth();

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

        {/* Zone 3: Hot-Pink Neon Primary Action + Auth Status + Mobile Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          {user ? (
            <div className="hidden sm:flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#1B0B33] border border-[#FF2EA6]/40 text-xs font-semibold text-white">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="max-w-[120px] truncate">{user.gamerTag}</span>
              </div>
              <button
                type="button"
                onClick={() => logout()}
                title="Sign Out"
                className="flex items-center justify-center h-8 w-8 rounded-md bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <LogOut className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-[#E8DDF5] hover:text-white px-3 py-1.5 rounded-md border border-white/10 hover:border-white/30 transition-colors"
            >
              <User className="h-3.5 w-3.5" />
              <span>Sign In</span>
            </Link>
          )}

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
            {user ? (
              <div className="flex items-center justify-between p-3 rounded-md bg-[#1B0B33] border border-[#FF2EA6]/30 mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-semibold text-white">{user.gamerTag}</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="text-xs text-red-400 hover:text-red-300 font-medium flex items-center gap-1"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 rounded-md border border-white/20 p-2.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors mb-2"
              >
                <User className="h-4 w-4" />
                <span>Sign In / Create Account</span>
              </Link>
            )}

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
