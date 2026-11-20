export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { readPayments } from "@/lib/payment-store";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Missing payment id" },
        { status: 400 }
      );
    }

    const payments = readPayments();
    const payment = payments.find((p) => p.id === id);

    if (!payment) {
      return NextResponse.json(
        { success: false, error: "Payment record not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      status: payment.status,
      payment: {
        id: payment.id,
        status: payment.status,
        allocatedNode: payment.allocatedNode,
        sessionPasscode: payment.sessionPasscode,
        rejectionReason: payment.rejectionReason,
        planName: payment.planName,
        hours: payment.hours,
      },
    });
  } catch (error) {
    console.error("Payment status check error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
