import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { orderCustomerSchema } from "@/lib/validations";
import { prisma } from "@/lib/prisma";
import { ensureGuestTokenSession, setUserEmailSession } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = orderCustomerSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, message: parsed.error.issues[0]?.message ?? "Input tidak valid" },
        { status: 400 },
      );
    }

    const { userName, userEmail, whatsapp, productId, planId, qty } = parsed.data;
    const guestToken = ensureGuestTokenSession();

    const [product, plan] = await Promise.all([
      prisma.product.findUnique({ where: { id: productId } }),
      prisma.plan.findUnique({ where: { id: planId } }),
    ]);

    if (!product || !plan || plan.productId !== product.id) {
      return NextResponse.json({ ok: false, message: "Produk atau paket tidak ditemukan" }, { status: 404 });
    }

    const totalAmount = plan.price * qty;

    const order = await prisma.$transaction(async (tx) => {
      const created = await tx.order.create({
        data: {
          userName,
          userEmail,
          guestToken,
          accessToken: randomUUID(),
          whatsapp,
          totalAmount,
          status: "WAITING_PAYMENT",
          expiresAt: new Date(Date.now() + 15 * 60 * 1000),
          orderItems: {
            create: {
              productId,
              planId,
              qty,
              unitPrice: plan.price,
            },
          },
        },
        select: {
          id: true,
          expiresAt: true,
          status: true,
        },
      });

      await tx.orderUpdate.create({
        data: {
          orderId: created.id,
          status: created.status,
          actor: "SYSTEM",
          message: "Order dibuat, menunggu pembayaran.",
        },
      });

      return created;
    });

    setUserEmailSession(userEmail);
    return NextResponse.json({ ok: true, order });
  } catch (error) {
    console.error("[api/create-order] failed:", error);
    return NextResponse.json({ ok: false, message: "Terjadi kesalahan server" }, { status: 500 });
  }
}
