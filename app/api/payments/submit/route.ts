import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createPayment } from "@/lib/payment-store";

const paymentSchema = z.object({
  userEmail: z.string().email("Invalid email address"),
  gamerTag: z.string().min(1, "GamerTag is required"),
  planName: z.string().min(1, "Plan name is required"),
  amount: z.string().min(1, "Amount is required"),
  hours: z.string().min(1, "Hours is required"),
  walletAddress: z.string().min(2, "Invalid target address or ID"),
  paymentMethod: z.string().optional(),
  txid: z.string().optional(),
  screenshotUrl: z.string().min(10, "Payment proof screenshot is required"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = paymentSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        { success: false, error: validated.error.issues[0]?.message || "Validation failed" },
        { status: 400 }
      );
    }

    const newPayment = await createPayment(validated.data);

    return NextResponse.json({
      success: true,
      payment: newPayment,
    });
  } catch (error) {
    console.error("Payment submit error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error submitting payment" },
      { status: 500 }
    );
  }
}
