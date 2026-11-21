export interface PaymentSubmission {
  id: string;
  userEmail: string;
  gamerTag: string;
  planName: string;
  amount: string;
  hours: string;
  walletAddress: string;
  paymentMethod?: string;
  txid?: string;
  screenshotUrl?: string | null;
  status: "pending" | "approved" | "rejected";
  allocatedNode: string;
  sessionPasscode: string;
  rejectionReason?: string;
  createdAt: string;
  reviewedAt?: string;
}

export interface UserProfile {
  id: string;
  email: string;
  gamerTag: string;
  createdAt: string;
  lastActive: string;
  totalOrders: number;
  totalSpent: number;
  status: "active" | "banned";
}

export interface AdminStats {
  totalUsers: number;
  totalRevenue: number;
  pendingCount: number;
  approvedCount: number;
  activeStreams: number;
}

export interface PaymentMethodConfig {
  id: string;
  name: string;
  type: "crypto_address" | "binance_pay" | "card" | "custom";
  accountValue: string;
  networkName: string;
  qrCodeUrl?: string;
  instructions?: string;
  badge?: string;
  isEnabled: boolean;
  isComingSoon: boolean;
  sortOrder: number;
}
