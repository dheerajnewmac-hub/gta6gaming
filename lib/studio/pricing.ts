export type StreamQuality = '1080p' | '4k';

export interface CustomPassQuote {
  hours: number;
  validityDays: number;
  quality: StreamQuality;
  baseRatePerHour: number;
  effectiveRatePerHour: number;
  subtotal: number;
  savingsPercent: number;
}

export const FIRST_TIME_DISCOUNT_PERCENT = 25;
export const MIN_PASS_PRICE = 4.99;

export interface FirstTimeDiscountResult {
  originalPrice: number;
  discountPercent: number;
  discountAmount: number;
  discountedPrice: number;
}

export interface FirstTimeAnchorPricing {
  anchorPrice: number;
  finalPrice: number;
  discountPercent: number;
  savingsAmount: number;
}

export interface PromoResult {
  valid: boolean;
  code: string;
  discountPercent: number;
  discountAmount: number;
  finalTotal: number;
  message: string;
}

/**
 * Computes a higher regular ("was") anchor price for display-only first-time discount framing
 * while keeping the actual selling price completely unchanged.
 */
export function getFirstTimeAnchorPricing(
  finalPrice: number,
  discountPercent: number = FIRST_TIME_DISCOUNT_PERCENT
): FirstTimeAnchorPricing {
  const safeFinal = Math.max(0, Math.round(finalPrice * 100) / 100);
  const safePercent = Math.max(0, Math.min(80, discountPercent));
  const multiplier = 1 - safePercent / 100;
  const anchorPrice =
    multiplier > 0 ? Math.round((safeFinal / multiplier) * 100) / 100 : safeFinal;
  const savingsAmount = Math.max(
    0,
    Math.round((anchorPrice - safeFinal) * 100) / 100
  );

  return {
    anchorPrice,
    finalPrice: safeFinal,
    discountPercent: safePercent,
    savingsAmount,
  };
}

export function applyFirstTimeDiscount(
  originalPrice: number,
  discountPercent: number = FIRST_TIME_DISCOUNT_PERCENT
): FirstTimeDiscountResult {
  const safeOriginal = Math.max(0, Math.round(originalPrice * 100) / 100);
  const safePercent = Math.max(0, Math.min(90, discountPercent));
  const discountAmount = Math.round(safeOriginal * (safePercent / 100) * 100) / 100;
  const discountedPrice = Math.max(
    0,
    Math.round((safeOriginal - discountAmount) * 100) / 100
  );

  return {
    originalPrice: safeOriginal,
    discountPercent: safePercent,
    discountAmount,
    discountedPrice,
  };
}

export interface CheckoutValidationResult {
  isValid: boolean;
  errors: {
    email?: string;
    gamerTag?: string;
  };
}

const VALID_PROMOS: Record<string, { discountPercent: number; label: string }> = {
  VICE10: { discountPercent: 10, label: '10% Welcome Pass Discount' },
  LEONIDA15: { discountPercent: 15, label: '15% Leonida Launch Credit' },
  PS5CLOUD: { discountPercent: 12, label: '12% Dedicated Blade Bonus' },
};

/**
 * Computes transparent hourly pass pricing for ViceCloud Custom Rig Passes.
 * Mirrors the progressive volume discount on gta6gaming.store (higher hours = lower hourly rate).
 */
export function calculateCustomPassQuote(
  hours: number,
  validityDays: number,
  quality: StreamQuality
): CustomPassQuote {
  const clampedHours = Math.max(2, Math.min(80, Math.round(hours)));
  const clampedDays = Math.max(7, Math.min(60, Math.round(validityDays)));

  const baseRatePerHour = quality === '4k' ? 2.89 : 2.5;

  // Volume discount tiers
  let volumeDiscount = 0;
  if (clampedHours >= 60) {
    volumeDiscount = 0.52;
  } else if (clampedHours >= 30) {
    volumeDiscount = 0.45;
  } else if (clampedHours >= 15) {
    volumeDiscount = 0.41;
  } else if (clampedHours >= 8) {
    volumeDiscount = 0.37;
  } else if (clampedHours >= 4) {
    volumeDiscount = 0.22;
  }

  // Slight extended storage hold factor for 30+ / 60-day validity windows
  const validityMultiplier =
    clampedDays >= 60 ? 1.12 : clampedDays >= 30 ? 1.06 : 1.0;

  const rawRate = baseRatePerHour * (1 - volumeDiscount) * validityMultiplier;
  const effectiveRatePerHour = Math.round(rawRate * 100) / 100;
  const subtotal = Math.max(
    MIN_PASS_PRICE,
    Math.round(effectiveRatePerHour * clampedHours * 100) / 100
  );

  const referenceCost = baseRatePerHour * clampedHours;
  const savingsPercent = Math.max(
    0,
    Math.round(((referenceCost - subtotal) / referenceCost) * 100)
  );

  return {
    hours: clampedHours,
    validityDays: clampedDays,
    quality,
    baseRatePerHour,
    effectiveRatePerHour,
    subtotal,
    savingsPercent,
  };
}

export function applyPromoCode(subtotal: number, rawCode: string): PromoResult {
  const code = rawCode.trim().toUpperCase();
  if (!code) {
    return {
      valid: false,
      code: '',
      discountPercent: 0,
      discountAmount: 0,
      finalTotal: Math.round(subtotal * 100) / 100,
      message: 'Enter a promo code to apply a discount.',
    };
  }

  const matched = VALID_PROMOS[code];
  if (!matched) {
    return {
      valid: false,
      code,
      discountPercent: 0,
      discountAmount: 0,
      finalTotal: Math.round(subtotal * 100) / 100,
      message: 'Promo code not recognized. Try VICE10 for 10% off.',
    };
  }

  const discountAmount = Math.round(subtotal * (matched.discountPercent / 100) * 100) / 100;
  const finalTotal = Math.max(0, Math.round((subtotal - discountAmount) * 100) / 100);

  return {
    valid: true,
    code,
    discountPercent: matched.discountPercent,
    discountAmount,
    finalTotal,
    message: `${matched.label} applied.`,
  };
}

export function validateCheckoutForm(email: string, gamerTag: string): CheckoutValidationResult {
  const errors: { email?: string; gamerTag?: string } = {};
  const trimmedEmail = email.trim();
  const trimmedTag = gamerTag.trim();

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!trimmedEmail) {
    errors.email = 'Email address is required to receive your session token.';
  } else if (!emailPattern.test(trimmedEmail)) {
    errors.email = 'Enter a valid email address (for example, alex@domain.com).';
  }

  if (!trimmedTag) {
    errors.gamerTag = 'Enter a gamer tag for your encrypted cloud save profile.';
  } else if (trimmedTag.length < 3 || trimmedTag.length > 24) {
    errors.gamerTag = 'Gamer tag must be between 3 and 24 characters.';
  } else if (!/^[a-zA-Z0-9_-]+$/.test(trimmedTag)) {
    errors.gamerTag = 'Use only letters, numbers, underscores, or hyphens.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function generateBladeAssignment(clusterCode: string, gamerTag: string): {
  orderId: string;
  bladeId: string;
  sessionUrl: string;
} {
  let hash = 0;
  const seed = `${clusterCode}-${gamerTag}`;
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash * 31 + seed.charCodeAt(i)) % 900;
  }
  const rigNumber = 100 + Math.abs(hash);
  const orderNum = 4100 + (Math.abs(hash) % 5800);
  const shortCluster = clusterCode.toUpperCase().slice(0, 3);

  return {
    orderId: `VC-${orderNum}`,
    bladeId: `PS5-${shortCluster}-${rigNumber}`,
    sessionUrl: `https://play.vicecloud.gg/stream/session-${rigNumber}`,
  };
}
