export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getAdminStats } from "@/lib/payment-store";

export async function GET() {
  try {
    const stats = getAdminStats();
    return NextResponse.json({ success: true, stats });
  } catch (error) {
    console.error("Admin stats fetch error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
