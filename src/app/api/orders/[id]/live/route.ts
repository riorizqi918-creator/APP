import { NextResponse } from "next/server";
import { getGuestTokenSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const guestToken = getGuestTokenSession();

  if (!guestToken) {
    return NextResponse.json({ ok: false, message: "Sesi order tidak ditemukan" }, { status: 401 });
  }

  const order = await prisma.order.findFirst({
    where: {
      id: params.id,
      guestToken,
    },
    select: {
      id: true,
      status: true,
      adminNotes: true,
      updatedAt: true,
      updates: {
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          status: true,
          message: true,
          actor: true,
          createdAt: true,
        },
      },
    },
  });

  if (!order) {
    return NextResponse.json({ ok: false, message: "Order tidak ditemukan" }, { status: 404 });
  }

  return NextResponse.json({ ok: true, order });
}
