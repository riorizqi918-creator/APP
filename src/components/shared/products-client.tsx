"use client";

import { useMemo, useState } from "react";
import { Product, Plan } from "@prisma/client";
import { Search } from "lucide-react";
import { ProductCard } from "@/components/shared/product-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { categories } from "@/lib/constants";
import { ProductCategory } from "@/types";

type ProductWithPlans = Product & { plans: Plan[] };

export function ProductsClient({ products }: { products: ProductWithPlans[] }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<"ALL" | ProductCategory>("ALL");

  const filtered = useMemo(() => {
    return products.filter((product) => {
      const matchCategory = category === "ALL" ? true : product.category === category;
      const key = `${product.name} ${product.description}`.toLowerCase();
      const matchSearch = key.includes(search.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [category, products, search]);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
        <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
          <div className="relative">
            <Search className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
            <Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Cari produk..." className="border-white/20 bg-slate-900/70 pl-9" />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((item) => (
              <Button
                key={item.value}
                variant={category === item.value ? "default" : "outline"}
                className={category === item.value ? "bg-cyan-500 text-slate-900 hover:bg-cyan-400" : "border-white/20 bg-slate-900/60"}
                onClick={() => setCategory(item.value)}
              >
                {item.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/20 bg-white/[0.03] p-10 text-center">
          <h3 className="text-lg font-semibold text-white">Produk tidak ditemukan</h3>
          <p className="mt-2 text-sm text-slate-400">Coba ganti keyword atau kategori lain.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
