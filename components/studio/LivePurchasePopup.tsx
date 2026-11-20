"use client";

import { useEffect, useRef, useState } from 'react';
import { CheckCircle2, Flame, X } from 'lucide-react';
import {
  buildPurchaseEvent,
  getNextPurchaseIndex,
  type LivePurchaseEvent,
} from '@/lib/studio/purchaseFeed';

interface LivePurchasePopupProps {
  paused?: boolean;
}

const INITIAL_DELAY_MS = 1600;
const VISIBLE_DURATION_MS = 6500;
const HIDDEN_GAP_MIN_MS = 4200;
const HIDDEN_GAP_RANGE_MS = 3000;

export function LivePurchasePopup({ paused = false }: LivePurchasePopupProps) {
  const [visible, setVisible] = useState(false);
  const [dismissedAll, setDismissedAll] = useState(false);
  const [event, setEvent] = useState<LivePurchaseEvent>(() =>
    buildPurchaseEvent(0, 0)
  );
  const currentIndexRef = useRef<number>(0);

  useEffect(() => {
    if (dismissedAll || paused) {
      setVisible(false);
      return;
    }

    let showTimer: number | undefined;
    let hideTimer: number | undefined;
    let cancelled = false;

    const scheduleCycle = (isFirst: boolean) => {
      const waitMs = isFirst
        ? INITIAL_DELAY_MS
        : HIDDEN_GAP_MIN_MS + Math.floor(Math.random() * HIDDEN_GAP_RANGE_MS);

      showTimer = window.setTimeout(() => {
        if (cancelled) return;

        if (isFirst) {
          currentIndexRef.current = 0;
          setEvent(buildPurchaseEvent(0, Math.random() < 0.5 ? 0 : 0.3));
        } else {
          const nextIdx = getNextPurchaseIndex(currentIndexRef.current);
          currentIndexRef.current = nextIdx;
          setEvent(buildPurchaseEvent(nextIdx));
        }

        setVisible(true);

        hideTimer = window.setTimeout(() => {
          if (cancelled) return;
          setVisible(false);
          scheduleCycle(false);
        }, VISIBLE_DURATION_MS);
      }, waitMs);
    };

    scheduleCycle(true);

    return () => {
      cancelled = true;
      if (showTimer !== undefined) window.clearTimeout(showTimer);
      if (hideTimer !== undefined) window.clearTimeout(hideTimer);
    };
  }, [dismissedAll, paused]);

  if (dismissedAll) return null;

  return (
    <aside
      aria-live="polite"
      aria-label="Recent GTA VI pass activation"
      data-testid="live-purchase-popup"
      data-visible={visible ? 'true' : 'false'}
      className={`pointer-events-none fixed bottom-3 left-3 z-40 w-auto max-w-[248px] transition-all duration-300 ease-out sm:bottom-5 sm:left-5 sm:w-[335px] sm:max-w-[335px] ${
        visible
          ? 'translate-y-0 opacity-100'
          : 'translate-y-4 opacity-0'
      }`}
    >
      <div
        className={`relative overflow-hidden rounded-lg border border-[#FF2EA6]/75 bg-[#120624] px-2.5 py-2 shadow-[0_12px_30px_rgba(8,2,18,0.92),0_0_20px_rgba(255,46,166,0.28)] sm:rounded-xl sm:px-3.5 sm:py-3 ${
          visible ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        <div className="flex items-start gap-2 sm:gap-3">
          {/* Animated Flame / Live Icon */}
          <div className="relative mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-[#FFD166]/55 bg-[#2A0E46] text-[#FFD166] sm:h-9 sm:w-9 sm:rounded-lg">
            <Flame className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden="true" />
            <span
              aria-hidden="true"
              className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-[#2CE6D2] ring-2 ring-[#120624] sm:-right-1 sm:-top-1 sm:h-2.5 sm:w-2.5"
            />
          </div>

          {/* Purchase Copy */}
          <div className="min-w-0 flex-1 pr-4 sm:pr-5">
            <div className="flex items-center gap-1 text-[10px] font-semibold text-[#2CE6D2] sm:gap-1.5 sm:text-[11px]">
              <CheckCircle2 className="h-3 w-3 shrink-0 sm:h-3.5 sm:w-3.5" aria-hidden="true" />
              <span className="truncate">
                Verified<span className="hidden sm:inline"> GTA VI Pass</span>
              </span>
              <span aria-hidden="true" className="text-[#8E73AC]">
                ·
              </span>
              <span className="shrink-0 font-mono text-[9px] text-[#FFD166] sm:text-[10px]">
                {event.timeAgo}
              </span>
            </div>

            <p className="mt-0.5 text-[11px] leading-tight text-[#EFE7FA] sm:mt-1 sm:text-xs sm:leading-snug">
              <strong className="font-bold text-white">{event.buyerName}</strong>{' '}
              {event.actionVerb}{' '}
              <strong className="font-bold text-[#FF5CC4]">{event.planName}</strong>
            </p>

            <div className="mt-1 flex items-center justify-between gap-2 text-[10px] sm:mt-1.5 sm:text-[11px]">
              <span className="rounded bg-[#FF2EA6]/20 px-1.5 py-0.5 font-mono font-bold text-white tabular-nums">
                ${event.price.toFixed(2)}
              </span>
              <span className="truncate font-mono text-[9px] text-[#B9A4D3] sm:text-[10px]">
                {event.region}
                <span className="hidden sm:inline"> Blade Ready</span>
              </span>
            </div>
          </div>

          {/* Close Button */}
          <button
            type="button"
            onClick={() => setDismissedAll(true)}
            aria-label="Dismiss recent purchase notification"
            className="absolute right-1.5 top-1.5 inline-flex h-5 w-5 items-center justify-center rounded-md text-[#B9A4D3] transition-colors hover:bg-white/10 hover:text-white sm:right-2 sm:top-2 sm:h-6 sm:w-6"
          >
            <X className="h-3 w-3 sm:h-3.5 sm:w-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </aside>
  );
}
