import { ProductsClient } from "@/components/shared/products-client";
import { PageTransition } from "@/components/shared/motion";
import { getProducts } from "@/lib/data";

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <PageTransition>
      <section className="space-y-2">
        <h1 className="text-3xl font-bold text-white">Semua Produk</h1>
        <p className="text-sm text-slate-300">Pilih digital subscription sesuai kebutuhanmu.</p>
      </section>
      <section className="mt-6">
        <ProductsClient products={products} />
      </section>
    </PageTransition>
  );
}
