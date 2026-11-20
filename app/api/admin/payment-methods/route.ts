export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import {
  readPaymentMethods,
  upsertPaymentMethod,
  deletePaymentMethod,
  togglePaymentMethod,
} from "@/lib/payment-store";

export async function GET() {
  try {
    const list = readPaymentMethods().sort((a, b) => a.sortOrder - b.sortOrder);
    return NextResponse.json({ success: true, methods: list });
  } catch (err) {
    console.error("Admin payment methods error:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

const methodSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  type: z.enum(["crypto_address", "binance_pay", "card", "custom"]),
  accountValue: z.string(),
  networkName: z.string(),
  qrCodeUrl: z.string().optional(),
  instructions: z.string().optional(),
  badge: z.string().optional(),
  isEnabled: z.boolean(),
  isComingSoon: z.boolean(),
  sortOrder: z.number().default(1),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = methodSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        { success: false, error: validated.error.issues[0]?.message || "Validation failed" },
        { status: 400 }
      );
    }

    const saved = upsertPaymentMethod(validated.data);
    return NextResponse.json({ success: true, method: saved });
  } catch (err) {
    console.error("Admin save payment method error:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Missing method id" },
        { status: 400 }
      );
    }

    const deleted = deletePaymentMethod(id);
    return NextResponse.json({ success: deleted });
  } catch (err) {
    console.error("Admin delete payment method error:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Missing method id" },
        { status: 400 }
      );
    }

    const toggled = togglePaymentMethod(id);
    return NextResponse.json({ success: !!toggled, method: toggled });
  } catch (err) {
    console.error("Admin toggle payment method error:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
