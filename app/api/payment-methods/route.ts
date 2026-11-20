export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { readPaymentMethods } from "@/lib/payment-store";

export async function GET() {
  try {
    const list = readPaymentMethods();
    const active = list
      .filter((m) => m.isEnabled)
      .sort((a, b) => a.sortOrder - b.sortOrder);
    return NextResponse.json({ success: true, methods: active });
  } catch (err) {
    console.error("Public payment methods error:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
