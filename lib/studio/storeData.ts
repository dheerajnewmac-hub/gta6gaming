export const STORE_ASSETS = {
  heroGta6Duo: '/assets/images/hero_gta6_duo_1795187933539.jpg',
  heroGta6DuoMobile: '/assets/images/hero_gta6_duo_vertical_1795194804194.jpg',
  heroViceSunset: '/assets/images/hero_vice_sunset_1795185609402.jpg',
  causewayDrive: '/assets/images/feature_vice_night_drive_1795185639048.jpg',
  deskSetup: '/assets/images/feature_dualsense_setup_1795185633819.jpg',
  leonidaSkyline: '/assets/images/feature_leonida_skyline_1795185611848.jpg',
  viceNightBackdrop: '/assets/images/vice_night_skyline_backdrop_1795197821902.jpg',
  viceSunsetBackdrop: '/assets/images/vice_sunset_skyline_backdrop_1795197824502.jpg',
  viceNeonWorldMap: '/assets/images/vice_neon_world_map_1795197834409.jpg',
  viceCloudLogo: '/assets/images/vicecloud_logo_mark_1795205737536.jpg',
} as const;

export interface RentalPlan {
  id: string;
  tier: 'hourly' | 'unlimited';
  name: string;
  price: number;
  unitLabel: string;
  durationSummary: string;
  qualityLabel: string;
  featured?: boolean;
  kicker?: string;
  features: string[];
}

export const RENTAL_PLANS: RentalPlan[] = [
  {
    id: 'quick-session',
    tier: 'hourly',
    name: 'Quick Session Pass',
    price: 4.99,
    unitLabel: '2 hours · 7-day validity',
    durationSummary: '2 Hours Dedicated PS5 Blade',
    qualityLabel: '1080p / 4K 60FPS',
    kicker: 'Test Drive',
    features: [
      '2 hours of dedicated remote PS5 session time',
      'Instant hardware blade allocation in under 10s',
      'Sub-15ms high-bitrate 60FPS WebRTC stream',
      'Keyboard, mouse & controller autodetect',
    ],
  },
  {
    id: 'gta6-campaign',
    tier: 'hourly',
    name: 'GTA VI Campaign',
    price: 11.99,
    unitLabel: '5 hours · 30-day validity',
    durationSummary: '5 Hours 4K HDR Gameplay',
    qualityLabel: '4K HDR 60FPS',
    featured: true,
    kicker: 'Most Popular',
    features: [
      '5 hours of dedicated 4K HDR 60FPS gameplay',
      'Priority queue jump during peak evening hours',
      'DualSense adaptive trigger & haptic emulation',
      'Encrypted AES-256 cloud mission save vault',
    ],
  },
  {
    id: 'weekend-immersion',
    tier: 'hourly',
    name: 'Weekend Immersion',
    price: 24.99,
    unitLabel: '12 hours · 45-day validity',
    durationSummary: '12 Hours Ultra-Bitrate 4K',
    qualityLabel: '4K HDR Ultra 60FPS',
    kicker: 'Best Hourly Value',
    features: [
      '12 hours of ultra-high bitrate 4K HDR 60FPS',
      'Guaranteed 24/7 dedicated blade reservation',
      'DualSense & Xbox wireless rumble support',
      'Valid for 45 full days with instant resume',
    ],
  },
  {
    id: 'gta6-15d',
    tier: 'unlimited',
    name: '15-Day GTA VI Pass',
    price: 34.99,
    unitLabel: 'Unlimited hours · 15 days',
    durationSummary: '15 Days Unlimited Access',
    qualityLabel: '4K HDR 60FPS',
    kicker: 'Two-Week Sprint',
    features: [
      'Unlimited GTA VI sessions for 15 consecutive days',
      'Unshared PS5 hardware allocation per launch',
      '1080p & 4K HDR streaming unlocked at 60FPS',
      'Automatic cloud save sync across any browser',
    ],
  },
  {
    id: 'gta6-vip-30d',
    tier: 'unlimited',
    name: '30-Day GTA VI VIP',
    price: 59.99,
    unitLabel: 'Unlimited hours · 30 days',
    durationSummary: '30 Days Unlimited VIP Blade',
    qualityLabel: '4K HDR Ultra 60FPS',
    featured: true,
    kicker: 'Most Popular',
    features: [
      'Unlimited 4K HDR 60FPS gameplay for 30 full days',
      'Zero-wait VIP blade reservation on all 4 clusters',
      'Full DualSense haptics & 1000Hz mouse polling',
      '50GB encrypted cloud save & screenshot archive',
    ],
  },
  {
    id: 'gta6-ultra-90d',
    tier: 'unlimited',
    name: '90-Day GTA VI Ultra',
    price: 139.99,
    unitLabel: 'Unlimited hours · 90 days',
    durationSummary: '90 Days Unlimited Priority',
    qualityLabel: '4K HDR Ultra 60FPS',
    kicker: 'Lowest Daily Cost',
    features: [
      'Full 90-day unrestricted access with zero hourly cap',
      'Pinned regional Equinix Tier-4 blade cluster',
      'Priority 24/7 operator routing via Telegram desk',
      'Instant rig swap guarantee if ping exceeds 25ms',
    ],
  },
];

export type JourneyStageType = 'pass' | 'blade' | 'stream' | 'saves';

export interface JourneyStep {
  id: string;
  stageType: JourneyStageType;
  index: string;
  timeWindow: string;
  shortLabel: string;
  shortBenefit: string;
  kicker: string;
  title: string;
  description: string;
  bullets: string[];
}

export const JOURNEY_STEPS: JourneyStep[] = [
  {
    id: 'pick-pass',
    stageType: 'pass',
    index: '01',
    timeWindow: '00–10s',
    shortLabel: 'Pick Your Pass',
    shortBenefit: 'From $4.99 · 25% OFF 1st buy',
    kicker: 'Zero Upfront Hardware',
    title: 'Choose hours or unlimited play — GTA VI is already installed',
    description:
      'Skip buying a $600 PlayStation 5 or a $70 retail copy. Pick a quick 2-hour test pass, a campaign pack, or unlimited access and get an instant private session token.',
    bullets: [
      'Official GTA VI license pre-loaded on every console blade',
      'Flexible hourly passes from $4.99 (25% OFF 1st buy) or unlimited access',
      'Instant activation with zero recurring contract traps',
    ],
  },
  {
    id: 'blade-boot',
    stageType: 'blade',
    index: '02',
    timeWindow: '10–25s',
    shortLabel: 'PS5 Blade Assigned',
    shortBenefit: 'Unshared hardware · 0 GB install',
    kicker: 'Dedicated Cloud Hardware',
    title: 'A private PlayStation 5 blade boots in your nearest cluster',
    description:
      'Within 10 seconds of checkout, our Tier-4 Equinix racks allocate an isolated PS5 hardware blade solely for your session—eliminating the 150GB download and day-one patches.',
    bullets: [
      '100% unshared PS5 rendering at native 4K HDR 60FPS',
      'Zero local SSD space used on your Windows PC or Mac',
      'Direct 10Gbps edge peering routes you to the lowest-ping rack',
    ],
  },
  {
    id: 'browser-stream',
    stageType: 'stream',
    index: '03',
    timeWindow: '25–40s',
    shortLabel: 'Play in Browser',
    shortBenefit: '4K 60FPS · Controller or KB/Mouse',
    kicker: 'Instant WebRTC Stream',
    title: 'Launch inside Chrome, Edge, or Safari with full controls',
    description:
      'Click your session link and launch GTA VI in fullscreen. Plug in a PlayStation DualSense, Xbox controller, or use Keyboard & Mouse with native pointer lock and 14ms average response.',
    bullets: [
      'Works on any standard laptop, Mac, Chromebook, or handheld',
      '1000Hz input polling with DualSense haptics & raw mouse aim',
      'Runs smoothly on regular 15–35 Mbps 5GHz Wi-Fi or Ethernet',
    ],
  },
  {
    id: 'cloud-saves',
    stageType: 'saves',
    index: '04',
    timeWindow: '40–45s',
    shortLabel: 'Auto-Save Anywhere',
    shortBenefit: 'AES-256 vault · Resume any screen',
    kicker: 'Encrypted Progress Vault',
    title: 'Your story progress saves automatically across every device',
    description:
      'When you disconnect, your mission checkpoints, garage cars, and settings mirror straight to your private AES-256 cloud vault while the PS5 blade wipes clean for security.',
    bullets: [
      'Resume your exact Leonida checkpoint on laptop, Mac, or desktop',
      'Isolated sandbox guarantees private credentials and save files',
      'Save history retained up to 60 days on hourly and custom passes',
    ],
  },
];

export interface CloudCluster {
  id: string;
  code: string;
  name: string;
  backbone: string;
  countries: string[];
  edgeNodes: string;
  activeBlades: number;
  totalBlades: number;
  avgLatencyMs: number;
}

export const CLOUD_CLUSTERS: CloudCluster[] = [
  {
    id: 'us-east',
    code: 'NAM',
    name: 'North America',
    backbone: 'Tier-4 Direct-Fiber Cluster',
    countries: ['United States', 'Canada', 'Mexico'],
    edgeNodes: 'Virginia · Miami · Oregon · Texas · Toronto',
    activeBlades: 420,
    totalBlades: 450,
    avgLatencyMs: 12,
  },
  {
    id: 'eu-central',
    code: 'EUR',
    name: 'Europe',
    backbone: 'Ultra-Low Jitter Backbone',
    countries: ['United Kingdom', 'Germany', 'France', 'Netherlands', 'Spain'],
    edgeNodes: 'London · Frankfurt · Paris · Amsterdam',
    activeBlades: 310,
    totalBlades: 330,
    avgLatencyMs: 18,
  },
  {
    id: 'apac-east',
    code: 'APC',
    name: 'Asia-Pacific',
    backbone: 'High-Bandwidth Edge Gateway',
    countries: ['Japan', 'South Korea', 'Singapore', 'Australia'],
    edgeNodes: 'Tokyo · Seoul · Singapore · Sydney',
    activeBlades: 120,
    totalBlades: 130,
    avgLatencyMs: 22,
  },
  {
    id: 'latam-south',
    code: 'LAT',
    name: 'Latin America',
    backbone: 'Regional Direct Gateway',
    countries: ['Brazil', 'Chile', 'Argentina', 'Colombia'],
    edgeNodes: 'São Paulo · Santiago · Buenos Aires',
    activeBlades: 150,
    totalBlades: 160,
    avgLatencyMs: 24,
  },
];

export interface ComparisonRow {
  metric: string;
  traditional: string;
  vicecloud: string;
}

export const HARDWARE_COMPARISON: ComparisonRow[] = [
  {
    metric: 'Hardware Investment',
    traditional: '$500 PS5 or $1,500+ RTX PC',
    vicecloud: '$0 — Use your existing laptop or Mac',
  },
  {
    metric: 'Upfront Game License',
    traditional: '$70–$100 retail purchase required',
    vicecloud: 'Included in all passes from $4.99 (1st buy)',
  },
  {
    metric: 'Local Storage Footprint',
    traditional: '150 GB+ high-speed NVMe SSD',
    vicecloud: '0 GB — Streams natively in browser',
  },
  {
    metric: 'Time to First Mission',
    traditional: '3–6 hours downloading & patching',
    vicecloud: 'Under 45 seconds from checkout',
  },
];

export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'Do I need to own GTA VI or have a PS5 account?',
    answer:
      'No. Every single one of our 1,000 PlayStation 5 hardware blades comes pre-installed with Grand Theft Auto VI and official console licenses. You never need to buy a $70 copy or own a console — simply rent the stream time you want.',
  },
  {
    question: 'What are the minimum PC or laptop system requirements?',
    answer:
      'Any Windows 10/11 PC, Apple Mac (Intel or M1–M4), Chromebook, Linux desktop, or Steam Deck that can smoothly play a 1080p or 4K 60FPS YouTube video can run ViceCloud. All ray tracing and game physics run on our remote PS5 racks.',
  },
  {
    question: 'What happens to my story mode saves and mission progress?',
    answer:
      'Your profile runs inside an isolated sandbox. When you finish playing, your story mode progress is automatically encrypted with AES-256 and archived to your cloud vault so you resume at the exact same checkpoint next time.',
  },
  {
    question: 'Can I use Keyboard & Mouse, or do I need a controller?',
    answer:
      'Both are fully supported. Connect a PlayStation DualSense, DualShock 4, Xbox Wireless controller, or use standard PC Keyboard & Mouse with native pointer lock and zero-acceleration aiming.',
  },
  {
    question: 'What internet speed do I need for smooth 60FPS streaming?',
    answer:
      'We recommend at least 15 Mbps download for crisp 1080p 60FPS and 25–35 Mbps for 4K HDR 60FPS over 5GHz Wi-Fi or wired Ethernet. If your latency spikes above target, our 15-minute ping guarantee swaps your blade instantly.',
  },
  {
    question: 'What payment methods do you accept internationally?',
    answer:
      'We accept global Visa & Mastercard cards via Stripe, Apple Pay, Google Pay, and major cryptocurrencies with instant session token activation. Note that service is restricted to operator-enabled clusters (North America, Europe, Latin America, and Asia-Pacific; India is currently unsupported).',
  },
];
