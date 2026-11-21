import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createPayment } from "@/lib/payment-store";

const paymentSchema = z.object({
  userEmail: z.string().email("Invalid email address"),
  gamerTag: z.string().min(1, "GamerTag is required"),
  planName: z.string().min(1, "Plan name is required"),
  amount: z.string().min(1, "Amount is required"),
  hours: z.string().optional().default("Standard"),
  walletAddress: z.string().optional().default("1231019201"),
  paymentMethod: z.string().optional().default("Binance Pay"),
  txid: z.string().optional().default(""),
  screenshotUrl: z.string().optional().nullable().default(""),
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

    const newPayment = await createPayment({
      ...validated.data,
      screenshotUrl: validated.data.screenshotUrl || "",
    });

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
