import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { ProductDetailClient } from "@/components/shared/product-detail-client";
import { ProductVisual } from "@/components/shared/product-visual";
import { PageTransition } from "@/components/shared/motion";
import { getProductBySlug } from "@/lib/data";
import { formatRupiah } from "@/lib/utils";

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  return (
    <PageTransition>
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          <div className="relative h-64 overflow-hidden rounded-2xl border border-white/15">
            <ProductVisual name={product.name} slug={product.slug} className="h-full w-full" />
          </div>
          <Badge variant="secondary" className="w-fit">{product.category}</Badge>
          <h1 className="text-3xl font-bold text-white">{product.name}</h1>
          <p className="text-slate-300">{product.description}</p>
          <p className="text-sm text-slate-400">Harga mulai {formatRupiah(product.basePrice)}</p>
        </div>

        <ProductDetailClient product={product} />
      </div>
    </PageTransition>
  );
}
