"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Plan, Product } from "@prisma/client";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatRupiah } from "@/lib/utils";

type ProductDetailProps = {
  product: Product & { plans: Plan[] };
};

export function ProductDetailClient({ product }: ProductDetailProps) {
  const [planId, setPlanId] = useState(product.plans[0]?.id ?? "");
  const [qty, setQty] = useState(1);

  const activePlan = useMemo(() => product.plans.find((plan) => plan.id === planId) ?? product.plans[0], [planId, product.plans]);
  const total = (activePlan?.price ?? product.basePrice) * qty;

  return (
    <div className="space-y-6 rounded-2xl border border-white/15 bg-white/5 p-5 backdrop-blur-xl">
      <div>
        <h3 className="text-lg font-semibold text-white">Pilih Paket</h3>
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          {product.plans.map((plan) => (
            <button
              key={plan.id}
              onClick={() => setPlanId(plan.id)}
              className={`rounded-xl border px-4 py-3 text-left transition ${
                plan.id === activePlan?.id
                  ? "border-cyan-300 bg-cyan-500/20"
                  : "border-white/15 bg-slate-900/70 hover:border-white/40"
              }`}
            >
              <p className="text-sm text-slate-300">{plan.label}</p>
              <p className="text-base font-semibold text-white">{formatRupiah(plan.price)}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <p className="text-sm text-slate-300">Quantity</p>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" className="border-white/20 bg-white/5" onClick={() => setQty((old) => Math.max(1, old - 1))}>
            <Minus className="h-4 w-4" />
          </Button>
          <Badge variant="secondary" className="px-4 py-2 text-sm">
            {qty}
          </Badge>
          <Button variant="outline" size="icon" className="border-white/20 bg-white/5" onClick={() => setQty((old) => Math.min(10, old + 1))}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="rounded-xl border border-cyan-300/20 bg-cyan-500/10 p-4">
        <p className="text-sm text-slate-300">Total pembayaran</p>
        <p className="text-2xl font-bold text-cyan-300">{formatRupiah(total)}</p>
      </div>

      <Sheet>
        <SheetTrigger asChild>
          <Button className="w-full bg-gradient-to-r from-indigo-500 to-cyan-400 text-slate-950 hover:opacity-90">
            <ShoppingCart className="mr-2 h-4 w-4" /> Beli Sekarang
          </Button>
        </SheetTrigger>
        <SheetContent>
          <h4 className="text-xl font-semibold text-white">Checkout Cepat</h4>
          <p className="mt-2 text-sm text-slate-300">Lanjutkan ke halaman checkout untuk mengisi data pembeli dan upload bukti pembayaran.</p>
          <div className="mt-6 space-y-2 rounded-lg border border-white/10 bg-white/5 p-4">
            <p className="font-medium text-white">{product.name}</p>
            <p className="text-sm text-slate-300">{activePlan?.label} x {qty}</p>
            <p className="text-sm text-cyan-300">{formatRupiah(total)}</p>
          </div>
          <Button asChild className="mt-6 w-full bg-gradient-to-r from-indigo-500 to-cyan-400 text-slate-950 hover:opacity-90">
            <Link href={`/checkout?productId=${product.id}&planId=${activePlan?.id}&qty=${qty}`}>Lanjut Checkout</Link>
          </Button>
        </SheetContent>
      </Sheet>
    </div>
  );
}
