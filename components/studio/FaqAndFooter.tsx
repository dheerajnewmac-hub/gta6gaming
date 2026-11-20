"use client";

import { MessageCircle, Shield, Globe, Mail } from 'lucide-react';
import { CLOUD_CLUSTERS } from '@/lib/studio/storeData';
import { BrandLogo } from './BrandLogo';

export function FaqAndFooter() {
  return (
    <footer className="relative border-t border-[#FF2EA6]/25 bg-[#080212] py-12">
      <div className="mx-auto max-w-[1160px] px-6 lg:px-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-12">
          {/* Brand Column */}
          <div className="lg:col-span-3">
            <a
              href="#top"
              className="group inline-flex items-center gap-2.5 font-display text-xl font-extrabold tracking-[-0.02em] text-white"
            >
              <BrandLogo size="sm" />
              <span>
                VICE<span className="text-[#FF2EA6]">CLOUD</span>
              </span>
            </a>
            <p className="mt-2.5 text-xs leading-relaxed text-[#CBB8DF]">
              Play GTA VI. Anywhere. Anytime.
            </p>
            <p className="mt-3 text-[11px] leading-relaxed text-[#9D87B8]">
              Notice: Service is restricted to operator-enabled clusters. India is
              currently not supported.
            </p>
          </div>

          {/* Platform Links */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold text-white">Platform</h4>
            <ul className="mt-3 space-y-2 text-xs text-[#CBB8DF]">
              <li>
                <a href="#top" className="transition-colors hover:text-[#FF45B5]">
                  GTA VI Cloud Gaming
                </a>
              </li>
              <li>
                <a
                  href="#how-it-works"
                  className="transition-colors hover:text-[#FF45B5]"
                >
                  How It Works
                </a>
              </li>
              <li>
                <a href="#plans" className="transition-colors hover:text-[#FF45B5]">
                  Pricing Plans
                </a>
              </li>
              <li>
                <a
                  href="#compatibility"
                  className="transition-colors hover:text-[#FF45B5]"
                >
                  Compatibility
                </a>
              </li>
            </ul>
          </div>

          {/* Data Centers */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold text-white">Data Centers</h4>
            <ul className="mt-3 space-y-2 text-xs text-[#CBB8DF]">
              {CLOUD_CLUSTERS.map((cluster) => (
                <li key={cluster.id}>
                  <a
                    href="#clusters"
                    className="transition-colors hover:text-[#FF45B5]"
                  >
                    {cluster.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Security */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold text-white">Security</h4>
            <ul className="mt-3 space-y-2 text-xs text-[#CBB8DF]">
              <li>DDoS Protection</li>
              <li>AES-256 Encrypted Saves</li>
              <li>Isolated PS5 Sandboxes</li>
              <li>15-Min Ping Swap Guarantee</li>
            </ul>
          </div>

          {/* Quick Support Icons (Matches Right Social/Help Icons in Reference Image 2 & 3) */}
          <div className="flex items-start gap-2.5 lg:col-span-2 lg:justify-end">
            <a
              href="https://t.me/vicecloudspport"
              target="_blank"
              rel="noreferrer"
              aria-label="ViceCloud Telegram Support"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#FF2EA6]/30 bg-[#140726] text-[#E8DDF5] transition-colors hover:border-[#FF2EA6] hover:text-[#FF45B5]"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href="#clusters"
              aria-label="Global Server Clusters"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#FF2EA6]/30 bg-[#140726] text-[#E8DDF5] transition-colors hover:border-[#FF2EA6] hover:text-[#FF45B5]"
            >
              <Globe className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href="#compatibility"
              aria-label="Security and Compatibility"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#FF2EA6]/30 bg-[#140726] text-[#E8DDF5] transition-colors hover:border-[#FF2EA6] hover:text-[#FF45B5]"
            >
              <Shield className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href="#faq"
              aria-label="Frequently Asked Questions"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#FF2EA6]/30 bg-[#140726] text-[#E8DDF5] transition-colors hover:border-[#FF2EA6] hover:text-[#FF45B5]"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="mt-10 flex flex-col justify-between gap-3 border-t border-[#FF2EA6]/18 pt-6 text-[11px] text-[#9D87B8] sm:flex-row sm:items-center">
          <p>
            © 2026 ViceCloud Gaming (gta6gaming.store). All rights reserved. · Play
            Responsibly.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <a href="#faq" className="transition-colors hover:text-[#FF45B5]">
              FAQ &amp; Terms
            </a>
            <a
              href="https://t.me/vicecloudspport"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-[#FF45B5]"
            >
              Telegram Support (@vicecloudspport)
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
