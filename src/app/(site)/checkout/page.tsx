import { notFound } from "next/navigation";
import { CheckoutClient } from "@/components/shared/checkout-client";
import { getSettings } from "@/lib/data";
import { resolveImageSrc } from "@/lib/image";
import { prisma } from "@/lib/prisma";

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: { productId?: string; planId?: string; qty?: string };
}) {
  const productId = searchParams.productId;
  const planId = searchParams.planId;
  const qty = Number(searchParams.qty ?? 1);

  if (!productId || !planId || Number.isNaN(qty) || qty < 1) {
    notFound();
  }

  let product = null;
  let plan = null;
  let qrisImageUrl = "/assets/qris-default.svg";

  try {
    [product, plan] = await Promise.all([
      prisma.product.findUnique({ where: { id: productId } }),
      prisma.plan.findUnique({ where: { id: planId } }),
    ]);

    const settings = await getSettings();
    qrisImageUrl = resolveImageSrc(
      settings.qrisImageUrl || process.env.NEXT_PUBLIC_QRIS_IMAGE_URL,
      "/assets/qris-default.svg",
    );
  } catch (error) {
    console.error("[checkout-page] failed to load checkout data", error);

    return (
      <section className="rounded-2xl border border-red-400/25 bg-red-500/10 p-5 text-sm text-red-100">
        <h1 className="text-lg font-semibold">Checkout sedang gangguan sementara</h1>
        <p className="mt-2 text-red-200/90">Coba reload halaman. Kalau masih error, kembali ke produk lalu coba checkout lagi.</p>
      </section>
    );
  }

  if (!product || !plan || plan.productId !== product.id) {
    notFound();
  }

  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Checkout</h1>
      <CheckoutClient
        qrisImageUrl={qrisImageUrl}
        payload={{
          productId: product.id,
          planId: plan.id,
          qty,
          productName: product.name,
          planLabel: plan.label,
          unitPrice: plan.price,
        }}
      />
    </section>
  );
}
