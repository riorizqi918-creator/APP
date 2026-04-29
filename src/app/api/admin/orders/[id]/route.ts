import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { updateOrderStatusSchema } from "@/lib/validations";

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const parsed = updateOrderStatusSchema.safeParse({
      orderId: params.id,
      status: body?.status,
      adminNotes: body?.adminNotes,
    });

    if (!parsed.success) {
      return NextResponse.json({ ok: false, message: "Data status tidak valid" }, { status: 400 });
    }

    const { orderId, status, adminNotes } = parsed.data;
    const normalizedNotes = adminNotes?.trim() || null;

    const updated = await prisma.$transaction(async (tx) => {
      const order = await tx.order.update({
        where: { id: orderId },
        data: {
          status,
          adminNotes: normalizedNotes,
        },
        select: {
          id: true,
          status: true,
          updatedAt: true,
          adminNotes: true,
        },
      });

      await tx.orderUpdate.create({
        data: {
          orderId,
          status,
          actor: "ADMIN",
          message: normalizedNotes || "Status order diupdate oleh admin.",
        },
      });

      return order;
    });

    return NextResponse.json({ ok: true, order: updated });
  } catch (error) {
    console.error("[api/admin/orders/:id] failed:", error);
    return NextResponse.json({ ok: false, message: "Gagal memperbarui order" }, { status: 500 });
  }
}
