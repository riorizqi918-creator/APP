const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const products = [
  {
    slug: "chatgpt",
    name: "CHATGPT",
    description: "Akun Seller, Garansi 7 hari, harap tanyakan stok sebelum order.",
    category: "AI",
    basePrice: 15000,
    imageUrl: "/assets/chatgpt.svg",
    isFeatured: true,
    plans: [
      { label: "GPT PRO - 1 bulan", price: 18000 },
      { label: "GPT PLUS - 1 bulan", price: 15000 },
      { label: "GPT HEAD - 1 bulan (invite 5 member)", price: 38000 },
    ],
  },
  {
    slug: "youtube-premium",
    name: "YOUTUBE PREMIUM",
    description: "Akun Seller, Full garansi, YT Famhead bisa invite 5 member.",
    category: "PRODUCTIVITY",
    basePrice: 9000,
    imageUrl: "/assets/youtube-premium.svg",
    isFeatured: true,
    plans: [
      { label: "YT INVITE - 1 bulan (email buyer)", price: 9000 },
      { label: "YT FAMHEAD - 1 bulan (email buyer fresh)", price: 20000 },
    ],
  },
  {
    slug: "spotify-premium",
    name: "SPOTIFY PREM",
    description: "Akun Seller, Garansi 7 hari, harap tanyakan stok sebelum order.",
    category: "PRODUCTIVITY",
    basePrice: 12000,
    imageUrl: "/assets/spotify-premium.svg",
    isFeatured: false,
    plans: [
      { label: "INDPLAN - 1 bulan (stok kosong)", price: 0 },
      { label: "INDPLAN - 3 bulan", price: 28000 },
      { label: "SPOTIFY PC METHOD NO IKLAN - Lifetime", price: 12000 },
    ],
  },
  {
    slug: "capcut-pro",
    name: "CAPCUT PRO",
    description: "Akun Seller, Garansi 7 hari, harap tanyakan stok sebelum order.",
    category: "DESIGN",
    basePrice: 6000,
    imageUrl: "/assets/logos/capcut.jpeg",
    isFeatured: true,
    plans: [
      { label: "PRIVAT - 7 hari", price: 6000 },
      { label: "PRIVAT - 1 bulan", price: 18000 },
      { label: "PRIVAT - 3 bulan", price: 40000 },
      { label: "PRIVAT - 6 bulan", price: 68000 },
    ],
  },
  {
    slug: "grok-ai",
    name: "GROK AI",
    description: "Akun dari Seller, Full Garansi, harap tanyakan stok sebelum order.",
    category: "AI",
    basePrice: 8000,
    imageUrl: "/assets/logos/grok.jpeg",
    isFeatured: false,
    plans: [
      { label: "PRIVAT - 3 hari", price: 8000 },
    ],
  },
  {
    slug: "netflix",
    name: "NETFLIX",
    description: "1U 1P, No Garansi, harap tanyakan stok sebelum order.",
    category: "PRODUCTIVITY",
    basePrice: 15000,
    imageUrl: "/assets/logos/netflix.svg",
    isFeatured: true,
    plans: [
      { label: "NETFLIX BULE - 1 bulan", price: 20000 },
      { label: "NETFLIX PC METHOD - Trik tanpa akun", price: 15000 },
    ],
  },
  {
    slug: "gemini-pro",
    name: "GEMINI PRO",
    description: "Akun Seller, Garansi 20 hari, harap tanyakan stok sebelum order.",
    category: "AI",
    basePrice: 18000,
    imageUrl: "/assets/logos/gemini.svg",
    isFeatured: false,
    plans: [
      { label: "INVIT EMAIL - 4 bulan", price: 18000 },
      { label: "INVIT EMAIL - 6 bulan", price: 24000 },
      { label: "INVIT EMAIL - 9 bulan", price: 29000 },
    ],
  },
];

async function main() {
  await prisma.paymentProof.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.plan.deleteMany();
  await prisma.product.deleteMany();

  for (const product of products) {
    await prisma.product.create({
      data: {
        slug: product.slug,
        name: product.name,
        description: product.description,
        category: product.category,
        basePrice: product.basePrice,
        imageUrl: product.imageUrl,
        isFeatured: product.isFeatured,
        plans: {
          create: product.plans,
        },
      },
    });
  }

  await prisma.settings.upsert({
    where: { id: 1 },
    create: { id: 1, qrisImageUrl: process.env.NEXT_PUBLIC_QRIS_IMAGE_URL || null },
    update: { qrisImageUrl: process.env.NEXT_PUBLIC_QRIS_IMAGE_URL || null },
  });

  console.log("Seed completed.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
