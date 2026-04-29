"use server";

import { revalidatePath } from "next/cache";
import { adminLoginSchema, orderCustomerSchema, updateOrderStatusSchema, updateSettingsSchema } from "@/lib/validations";
import { prisma } from "@/lib/prisma";
import { clearAdminSession, setAdminSession, setUserEmailSession } from "@/lib/auth";

export async function createDraftOrder(input: unknown) {
  const parsed = orderCustomerSchema.safeParse(input);

  if (!parsed.success) {
    return { ok: false as const, message: parsed.error.issues[0]?.message ?? "Input tidak valid" };
  }

  const { userName, userEmail, whatsapp, productId, planId, qty } = parsed.data;

  const product = await prisma.product.findUnique({ where: { id: productId } });
  const plan = await prisma.plan.findUnique({ where: { id: planId } });

  if (!product || !plan || plan.productId !== product.id) {
    return { ok: false as const, message: "Produk atau paket tidak ditemukan" };
  }

  const totalAmount = plan.price * qty;

  const order = await prisma.order.create({
    data: {
      userName,
      userEmail,
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
    include: {
      orderItems: {
        include: {
          product: true,
          plan: true,
        },
      },
    },
  });

  setUserEmailSession(userEmail);
  revalidatePath("/orders");

  return { ok: true as const, order };
}

export async function markOrderWaitingVerification(orderId: string) {
  const order = await prisma.order.findUnique({ where: { id: orderId } });

  if (!order) {
    return { ok: false as const, message: "Order tidak ditemukan" };
  }

  await prisma.order.update({
    where: { id: orderId },
    data: { status: "WAITING_VERIFICATION" },
  });

  revalidatePath(`/orders/${orderId}`);
  revalidatePath("/orders");
  revalidatePath("/admin/orders");
  return { ok: true as const };
}

export async function adminLogin(input: unknown) {
  const parsed = adminLoginSchema.safeParse(input);
  const expectedPassword = process.env.ADMIN_PASSWORD ?? "kunci123";

  if (!parsed.success || parsed.data.password !== expectedPassword) {
    return { ok: false as const, message: "Password admin salah" };
  }

  setAdminSession();
  return { ok: true as const };
}

export async function adminLogout() {
  clearAdminSession();
  return { ok: true as const };
}

export async function updateOrderStatus(input: unknown) {
  const parsed = updateOrderStatusSchema.safeParse(input);

  if (!parsed.success) {
    return { ok: false as const, message: "Data status tidak valid" };
  }

  const { orderId, status, adminNotes } = parsed.data;

  await prisma.order.update({
    where: { id: orderId },
    data: {
      status,
      adminNotes: adminNotes?.trim() || null,
    },
  });

  revalidatePath("/admin/orders");
  revalidatePath(`/admin/orders/${orderId}`);
  revalidatePath("/orders");
  revalidatePath(`/orders/${orderId}`);

  return { ok: true as const };
}

export async function updateQrisSettings(input: unknown) {
  const parsed = updateSettingsSchema.safeParse(input);

  if (!parsed.success) {
    return { ok: false as const, message: "URL QRIS tidak valid" };
  }

  await prisma.settings.upsert({
    where: { id: 1 },
    create: {
      id: 1,
      qrisImageUrl: parsed.data.qrisImageUrl || null,
    },
    update: {
      qrisImageUrl: parsed.data.qrisImageUrl || null,
    },
  });

  revalidatePath("/checkout");
  revalidatePath("/admin/settings");
  return { ok: true as const };
}
