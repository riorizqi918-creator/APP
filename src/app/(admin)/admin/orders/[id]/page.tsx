import Image from "next/image";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { getOrderById } from "@/lib/data";
import { formatRupiah, generateInvoiceId } from "@/lib/utils";
import { AdminOrderUpdateForm } from "@/components/shared/admin-order-update-form";
import { OrderStatusBadge } from "@/components/shared/order-status-badge";

export default async function AdminOrderDetailPage({ params }: { params: { id: string } }) {
  requireAdmin();
  const order = await getOrderById(params.id);

  if (!order) {
    notFound();
  }

  return (
    <section className="space-y-5">
      <h1 className="text-2xl font-bold text-white">Kelola {generateInvoiceId(order.id)}</h1>
      <OrderStatusBadge status={order.status} />
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
        <p>Pembeli: {order.userName}</p>
        <p>Email: {order.userEmail}</p>
        <p>Total: {formatRupiah(order.totalAmount)}</p>
        <p>Produk: {order.orderItems[0]?.product.name}</p>
      </div>

      {order.paymentProof ? (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="mb-2 text-sm text-slate-300">Bukti pembayaran</p>
          <div className="relative h-80 overflow-hidden rounded-xl border border-white/10">
            <Image src={order.paymentProof.imageUrl} alt="Proof" fill className="object-contain" />
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-white/20 bg-white/5 p-4 text-sm text-slate-400">Belum ada bukti pembayaran.</div>
      )}

      <AdminOrderUpdateForm orderId={order.id} initialStatus={order.status} initialNotes={order.adminNotes} />
    </section>
  );
}
