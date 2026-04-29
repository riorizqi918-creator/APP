import Link from "next/link";
import { getOrdersByGuestToken } from "@/lib/data";
import { getGuestTokenSession } from "@/lib/auth";
import { formatRupiah, generateInvoiceId } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { OrderStatusBadge } from "@/components/shared/order-status-badge";

export default async function OrdersPage() {
  const guestToken = getGuestTokenSession();

  if (!guestToken) {
    return (
      <section className="pt-28 sm:pt-24">
        <div className="rounded-2xl border border-dashed border-white/20 bg-white/5 p-10 text-center">
          <h1 className="text-2xl font-semibold text-white">Belum ada order dalam sesi ini</h1>
          <p className="mt-2 text-sm text-slate-300">Silakan checkout terlebih dahulu agar riwayat order muncul otomatis.</p>
          <Button asChild className="mt-4"><Link href="/products">Pilih Produk</Link></Button>
        </div>
      </section>
    );
  }

  const orders = await getOrdersByGuestToken(guestToken);

  if (!orders.length) {
    return (
      <section className="pt-28 sm:pt-24">
        <div className="rounded-2xl border border-dashed border-white/20 bg-white/5 p-10 text-center">
          <h1 className="text-2xl font-semibold text-white">Order tidak ditemukan</h1>
          <p className="mt-2 text-sm text-slate-300">Belum ada transaksi pada device/browser ini.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-5 pt-24 sm:pt-20">
      <h1 className="text-3xl font-bold text-white">Order Saya</h1>
      <div className="grid gap-4">
        {orders.map((order) => (
          <Card key={order.id} className="border-white/10 bg-white/5">
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <CardTitle className="text-base text-white">{generateInvoiceId(order.id)}</CardTitle>
              <OrderStatusBadge status={order.status} />
            </CardHeader>
            <CardContent className="flex flex-col gap-3 text-sm text-slate-300 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p>{order.orderItems[0]?.product.name}</p>
                <p>{formatRupiah(order.totalAmount)}</p>
              </div>
              <Button asChild variant="outline" className="border-white/20 bg-slate-900/70">
                <Link href={`/orders/${order.id}`}>Lihat Detail</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
