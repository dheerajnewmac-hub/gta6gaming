import fs from "fs";
import path from "path";
import { PaymentSubmission, UserProfile, AdminStats } from "./types";

const DATA_DIR = path.join(process.cwd(), "data");
const PAYMENTS_FILE = path.join(DATA_DIR, "payments.json");
const USERS_FILE = path.join(DATA_DIR, "users.json");

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

export function readPayments(): PaymentSubmission[] {
  try {
    ensureDir();
    if (!fs.existsSync(PAYMENTS_FILE)) return [];
    const raw = fs.readFileSync(PAYMENTS_FILE, "utf-8");
    return JSON.parse(raw) as PaymentSubmission[];
  } catch (err) {
    console.error("Error reading payments:", err);
    return [];
  }
}

export function writePayments(payments: PaymentSubmission[]) {
  try {
    ensureDir();
    fs.writeFileSync(PAYMENTS_FILE, JSON.stringify(payments, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing payments:", err);
  }
}

export function readUsers(): UserProfile[] {
  try {
    ensureDir();
    if (!fs.existsSync(USERS_FILE)) return [];
    const raw = fs.readFileSync(USERS_FILE, "utf-8");
    return JSON.parse(raw) as UserProfile[];
  } catch (err) {
    console.error("Error reading users:", err);
    return [];
  }
}

export function writeUsers(users: UserProfile[]) {
  try {
    ensureDir();
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing users:", err);
  }
}

export async function createPayment(
  data: Omit<PaymentSubmission, "id" | "status" | "createdAt" | "allocatedNode" | "sessionPasscode">
): Promise<PaymentSubmission> {
  const payments = readPayments();
  const nodeNum = Math.floor(Math.random() * 800) + 100;
  const passNum = Math.floor(Math.random() * 9000) + 1000;
  const newId = `VC-PAY-${Date.now().toString().slice(-6)}`;

  const newPayment: PaymentSubmission = {
    ...data,
    id: newId,
    status: "pending",
    allocatedNode: `PS5-RIG-0${nodeNum}`,
    sessionPasscode: `VICE-${passNum}-PS5X`,
    createdAt: new Date().toISOString(),
  };

  payments.unshift(newPayment);
  writePayments(payments);

  // Also register/update user in users store
  const amountNum = parseFloat(data.amount.replace(/[^0-9.]/g, "")) || 0;
  upsertUser(data.userEmail, data.gamerTag, amountNum);

  return newPayment;
}

export async function updatePaymentStatus(
  id: string,
  status: "approved" | "rejected",
  rejectionReason?: string
): Promise<PaymentSubmission | null> {
  const payments = readPayments();
  const idx = payments.findIndex((p) => p.id === id);
  if (idx === -1) return null;

  payments[idx] = {
    ...payments[idx],
    status,
    rejectionReason: status === "rejected" ? rejectionReason : undefined,
    reviewedAt: new Date().toISOString(),
  };

  writePayments(payments);
  return payments[idx];
}

export function upsertUser(
  email: string,
  gamerTag?: string,
  amountSpent: number = 0
): UserProfile {
  const users = readUsers();
  const existing = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

  if (existing) {
    existing.lastActive = new Date().toISOString();
    if (amountSpent > 0) {
      existing.totalOrders += 1;
      existing.totalSpent += amountSpent;
    }
    writeUsers(users);
    return existing;
  }

  const newUser: UserProfile = {
    id: `usr_${Date.now().toString().slice(-6)}`,
    email,
    gamerTag: gamerTag || `Gamer_${email.split("@")[0]}`,
    createdAt: new Date().toISOString(),
    lastActive: new Date().toISOString(),
    totalOrders: amountSpent > 0 ? 1 : 0,
    totalSpent: amountSpent,
    status: "active",
  };

  users.push(newUser);
  writeUsers(users);
  return newUser;
}

export function getAdminStats(): AdminStats {
  const payments = readPayments();
  const users = readUsers();

  const totalUsers = users.length;
  const pendingCount = payments.filter((p) => p.status === "pending").length;
  const approvedCount = payments.filter((p) => p.status === "approved").length;
  
  const totalRevenue = payments
    .filter((p) => p.status === "approved")
    .reduce((sum, p) => {
      const val = parseFloat(p.amount.replace(/[^0-9.]/g, "")) || 0;
      return sum + val;
    }, 0);

  return {
    totalUsers,
    totalRevenue,
    pendingCount,
    approvedCount,
    activeStreams: approvedCount,
  };
}
