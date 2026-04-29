import { prisma } from "@/lib/prisma";
import { OrderStatus, ProductCategory } from "@/types";

const fallbackProducts = [
  {
    id: "fallback-chatgpt",
    slug: "chatgpt",
    name: "CHATGPT",
    description: "Akun Seller, Garansi 7 hari, harap tanyakan stok sebelum order.",
    category: "AI",
    basePrice: 15000,
    imageUrl: "/assets/chatgpt.svg",
    isFeatured: true,
    createdAt: new Date("2026-01-01T00:00:00.000Z"),
    plans: [
      { id: "fallback-chatgpt-1", productId: "fallback-chatgpt", label: "GPT PRO - 1 bulan", price: 18000 },
      { id: "fallback-chatgpt-2", productId: "fallback-chatgpt", label: "GPT PLUS - 1 bulan", price: 15000 },
      { id: "fallback-chatgpt-3", productId: "fallback-chatgpt", label: "GPT HEAD - 1 bulan (invite 5 member)", price: 38000 },
    ],
  },
  {
    id: "fallback-youtube",
    slug: "youtube-premium",
    name: "YOUTUBE PREMIUM",
    description: "Akun Seller, Full garansi, YT Famhead bisa invite 5 member.",
    category: "PRODUCTIVITY",
    basePrice: 9000,
    imageUrl: "/assets/youtube-premium.svg",
    isFeatured: true,
    createdAt: new Date("2026-01-01T00:00:00.000Z"),
    plans: [
      { id: "fallback-youtube-1", productId: "fallback-youtube", label: "YT INVITE - 1 bulan (email buyer)", price: 9000 },
      { id: "fallback-youtube-2", productId: "fallback-youtube", label: "YT FAMHEAD - 1 bulan (email buyer fresh)", price: 20000 },
    ],
  },
  {
    id: "fallback-spotify",
    slug: "spotify-premium",
    name: "SPOTIFY PREM",
    description: "Akun Seller, Garansi 7 hari, harap tanyakan stok sebelum order.",
    category: "PRODUCTIVITY",
    basePrice: 12000,
    imageUrl: "/assets/spotify-premium.svg",
    isFeatured: false,
    createdAt: new Date("2026-01-01T00:00:00.000Z"),
    plans: [
      { id: "fallback-spotify-1", productId: "fallback-spotify", label: "INDPLAN - 1 bulan (stok kosong)", price: 0 },
      { id: "fallback-spotify-2", productId: "fallback-spotify", label: "INDPLAN - 3 bulan", price: 28000 },
      { id: "fallback-spotify-3", productId: "fallback-spotify", label: "SPOTIFY PC METHOD NO IKLAN - Lifetime", price: 12000 },
    ],
  },
];

export async function getFeaturedProducts() {
  if (!process.env.DATABASE_URL) {
    return fallbackProducts.filter((product) => product.isFeatured);
  }

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
  if (!process.env.DATABASE_URL) {
    const search = params?.search?.trim().toLowerCase();
    return fallbackProducts.filter((product) => {
      const matchCategory = params?.category && params.category !== "ALL" ? product.category === params.category : true;
      const matchSearch = search ? `${product.name} ${product.description}`.toLowerCase().includes(search) : true;
      return matchCategory && matchSearch;
    });
  }

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
  if (!process.env.DATABASE_URL) {
    return fallbackProducts.find((product) => product.slug === slug) ?? null;
  }

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
