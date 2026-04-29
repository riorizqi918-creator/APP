import { prisma } from "@/lib/prisma";
import { OrderStatus, ProductCategory } from "@/types";

export async function getFeaturedProducts() {
  return prisma.product.findMany({
    where: { isFeatured: true },
    include: { plans: { orderBy: { price: "asc" } } },
    orderBy: { createdAt: "desc" },
  });
}

export async function getProducts(params?: {
  category?: ProductCategory | "ALL";
  search?: string;
}) {
  const search = params?.search?.trim();

  return prisma.product.findMany({
    where: {
      ...(params?.category && params.category !== "ALL" ? { category: params.category } : {}),
      ...(search
        ? {
            OR: [
              { name: { contains: search } },
              { description: { contains: search } },
            ],
          }
        : {}),
    },
    include: { plans: { orderBy: { price: "asc" } } },
    orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
  });
}

export async function getProductBySlug(slug: string) {
  return prisma.product.findUnique({
    where: { slug },
    include: { plans: { orderBy: { price: "asc" } } },
  });
}

export async function getOrderById(id: string) {
  return prisma.order.findUnique({
    where: { id },
    include: {
      orderItems: {
        include: {
          product: true,
          plan: true,
        },
      },
      paymentProof: true,
      updates: {
        orderBy: { createdAt: "desc" },
      },
    },
  });
}

export async function getOrdersByEmail(email: string) {
  return prisma.order.findMany({
    where: { userEmail: email },
    include: {
      orderItems: {
        include: {
          product: true,
          plan: true,
        },
      },
      paymentProof: true,
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getOrdersByGuestToken(guestToken: string) {
  return prisma.order.findMany({
    where: { guestToken },
    include: {
      orderItems: {
        include: {
          product: true,
          plan: true,
        },
      },
      paymentProof: true,
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getOrderByIdForGuest(orderId: string, guestToken: string) {
  return prisma.order.findFirst({
    where: { id: orderId, guestToken },
    include: {
      orderItems: {
        include: {
          product: true,
          plan: true,
        },
      },
      paymentProof: true,
      updates: {
        orderBy: { createdAt: "desc" },
      },
    },
  });
}

export async function getAllOrders() {
  return prisma.order.findMany({
    include: {
      orderItems: {
        include: {
          product: true,
          plan: true,
        },
      },
      paymentProof: true,
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getSettings() {
  return prisma.settings.upsert({
    where: { id: 1 },
    update: {},
    create: { id: 1 },
  });
}

export function statusLabel(status: string) {
  const map: Record<OrderStatus, string> = {
    DRAFT: "Draft",
    WAITING_PAYMENT: "Menunggu Pembayaran",
    WAITING_VERIFICATION: "Menunggu Verifikasi",
    VERIFIED: "Terverifikasi",
    PAID: "Lunas",
    COMPLETED: "Selesai",
    REJECTED: "Ditolak",
  };

  return map[status as OrderStatus] ?? status;
}
