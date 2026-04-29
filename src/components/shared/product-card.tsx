"use client";

import Link from "next/link";
import { Product } from "@prisma/client";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ProductVisual } from "@/components/shared/product-visual";
import { formatRupiah } from "@/lib/utils";

type ProductWithPlans = Product & { plans: { id: string; price: number }[] };

export function ProductCard({ product }: { product: ProductWithPlans }) {
  const startPrice = product.plans[0]?.price ?? product.basePrice;

  return (
    <motion.div whileHover={{ y: -6, scale: 1.01 }} transition={{ duration: 0.2 }}>
      <Card className="group overflow-hidden rounded-[24px] border-white/15 bg-white/5 backdrop-blur-xl transition-all hover:border-cyan-300/40 hover:shadow-[0_18px_44px_-16px_rgba(56,189,248,.45)]">
        <Link href={`/products/${product.slug}`}>
          <div className="relative h-48 overflow-hidden">
            <ProductVisual name={product.name} slug={product.slug} className="h-full w-full transition duration-500 group-hover:scale-105" />
            <div className="absolute right-4 top-4">
              {product.isFeatured ? <Badge>Best Seller</Badge> : <Badge variant="secondary">Popular</Badge>}
            </div>
          </div>
          <CardContent className="space-y-3 p-5">
            <h3 className="text-lg font-semibold text-white">{product.name}</h3>
            <p className="line-clamp-2 text-base leading-relaxed text-slate-300">{product.description}</p>
            <p className="text-base text-slate-300">
              Harga mulai <span className="text-base font-semibold text-cyan-300">{formatRupiah(startPrice)}</span>
            </p>
          </CardContent>
        </Link>
      </Card>
    </motion.div>
  );
}
