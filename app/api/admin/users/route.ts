export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { readUsers } from "@/lib/payment-store";

export async function GET() {
  try {
    const users = readUsers();
    return NextResponse.json({ success: true, users });
  } catch (error) {
    console.error("Admin users list error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
