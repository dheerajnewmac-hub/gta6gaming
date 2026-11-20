import { calculateCustomPassQuote } from './pricing';

export interface LivePurchaseEvent {
  id: string;
  buyerName: string;
  region: string;
  actionVerb: string;
  planName: string;
  price: number;
  timeAgo: string;
}

interface PurchaseTemplate {
  buyerName: string;
  region: string;
  actionVerb: string;
  planName: string;
  price: number;
}

export const TIME_AGO_LABELS = [
  'Just now',
  '1m ago',
  '2m ago',
  '3m ago',
  '4m ago',
  '5m ago',
  '7m ago',
] as const;

const PURCHASE_TEMPLATES: PurchaseTemplate[] = [
  {
    buyerName: 'Jack',
    region: 'US-East',
    actionVerb: 'just grabbed',
    planName: '53h GTA VI Custom Pass',
    price: calculateCustomPassQuote(53, 15, '1080p').subtotal,
  },
  {
    buyerName: 'Maya',
    region: 'EU-West',
    actionVerb: 'unlocked',
    planName: 'GTA VI Campaign (5 hrs)',
    price: 11.99,
  },
  {
    buyerName: 'Liam',
    region: 'US-West',
    actionVerb: 'grabbed',
    planName: '30-Day GTA VI VIP',
    price: 59.99,
  },
  {
    buyerName: 'Noah',
    region: 'UK-London',
    actionVerb: 'activated',
    planName: 'Weekend Immersion (12 hrs)',
    price: 24.99,
  },
  {
    buyerName: 'Chloe',
    region: 'Canada',
    actionVerb: 'deployed',
    planName: '24h GTA VI Custom Pass',
    price: calculateCustomPassQuote(24, 15, '4k').subtotal,
  },
  {
    buyerName: 'Ethan',
    region: 'Germany',
    actionVerb: 'booked',
    planName: '15-Day GTA VI Pass',
    price: 34.99,
  },
  {
    buyerName: 'Sofia',
    region: 'Singapore',
    actionVerb: 'grabbed',
    planName: '40h GTA VI Custom Pass',
    price: calculateCustomPassQuote(40, 30, '4k').subtotal,
  },
  {
    buyerName: 'Lucas',
    region: 'Brazil',
    actionVerb: 'unlocked',
    planName: 'Quick Session Pass (2 hrs)',
    price: 4.99,
  },
  {
    buyerName: 'Ava',
    region: 'US-Central',
    actionVerb: 'grabbed',
    planName: '18h GTA VI Custom Pass',
    price: calculateCustomPassQuote(18, 15, '4k').subtotal,
  },
];

export function pickRandomTimeAgo(randValue: number = Math.random()): string {
  const clamped = Math.max(0, Math.min(0.999999, randValue));
  const index = Math.floor(clamped * TIME_AGO_LABELS.length);
  return TIME_AGO_LABELS[index];
}

export function buildPurchaseEvent(
  templateIndex: number,
  randForTime: number = Math.random()
): LivePurchaseEvent {
  const safeIndex =
    ((templateIndex % PURCHASE_TEMPLATES.length) + PURCHASE_TEMPLATES.length) %
    PURCHASE_TEMPLATES.length;
  const template = PURCHASE_TEMPLATES[safeIndex];

  return {
    id: `purchase-${safeIndex}-${template.buyerName.toLowerCase()}`,
    buyerName: template.buyerName,
    region: template.region,
    actionVerb: template.actionVerb,
    planName: template.planName,
    price: template.price,
    timeAgo: pickRandomTimeAgo(randForTime),
  };
}

export function getNextPurchaseIndex(
  currentIndex: number,
  randValue: number = Math.random()
): number {
  const total = PURCHASE_TEMPLATES.length;
  if (total <= 1) return 0;
  const step = 1 + Math.floor(Math.max(0, Math.min(0.999999, randValue)) * (total - 1));
  return (currentIndex + step) % total;
}

export function getPurchaseTemplateCount(): number {
  return PURCHASE_TEMPLATES.length;
}
