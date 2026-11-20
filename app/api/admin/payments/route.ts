export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { readPayments, updatePaymentStatus } from "@/lib/payment-store";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const statusFilter = searchParams.get("status");
    const searchQuery = searchParams.get("search")?.toLowerCase();

    let list = readPayments();

    if (statusFilter && statusFilter !== "all") {
      list = list.filter((p) => p.status === statusFilter);
    }

    if (searchQuery) {
      list = list.filter(
        (p) =>
          p.userEmail.toLowerCase().includes(searchQuery) ||
          p.id.toLowerCase().includes(searchQuery) ||
          (p.txid && p.txid.toLowerCase().includes(searchQuery))
      );
    }

    return NextResponse.json({ success: true, payments: list });
  } catch (error) {
    console.error("Admin payments list error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

const updateSchema = z.object({
  id: z.string().min(1),
  status: z.enum(["approved", "rejected"]),
  reason: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = updateSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        { success: false, error: validated.error.issues[0]?.message || "Validation failed" },
        { status: 400 }
      );
    }

    const { id, status, reason } = validated.data;
    const updated = await updatePaymentStatus(id, status, reason);

    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Payment not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      payment: updated,
    });
  } catch (error) {
    console.error("Admin payment update error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
