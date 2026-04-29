import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { getAllOrders } from "@/lib/data";
import { formatRupiah, generateInvoiceId } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { OrderStatusBadge } from "@/components/shared/order-status-badge";
import { AdminLogoutButton } from "@/components/shared/admin-logout-button";

export default async function AdminOrdersPage() {
  requireAdmin();
  const orders = await getAllOrders();

  return (
    <section className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-bold text-white">Admin - Orders</h1>
        <div className="flex gap-2">
          <Button asChild variant="outline" className="border-white/20 bg-slate-900/60">
            <Link href="/admin/settings">Settings</Link>
          </Button>
          <AdminLogoutButton />
        </div>
      </div>

      <div className="grid gap-3">
        {orders.map((order) => (
          <Card key={order.id} className="border-white/10 bg-white/5">
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <CardTitle className="text-base text-white">{generateInvoiceId(order.id)}</CardTitle>
              <OrderStatusBadge status={order.status} />
            </CardHeader>
            <CardContent className="flex flex-wrap items-center justify-between gap-3 text-sm text-slate-300">
              <div>
                <p>{order.userName} ({order.userEmail})</p>
                <p>{order.orderItems[0]?.product.name} - {formatRupiah(order.totalAmount)}</p>
              </div>
              <Button asChild variant="outline" className="border-white/20 bg-slate-900/70">
                <Link href={`/admin/orders/${order.id}`}>Kelola</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
