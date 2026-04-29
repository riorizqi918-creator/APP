import Image from "next/image";
import { notFound } from "next/navigation";
import { getGuestTokenSession } from "@/lib/auth";
import { getOrderByIdForGuest } from "@/lib/data";
import { formatRupiah, generateInvoiceId } from "@/lib/utils";
import { OrderStatusBadge } from "@/components/shared/order-status-badge";
import { OrderLivePanel } from "@/components/shared/order-live-panel";

export default async function OrderDetailPage({ params }: { params: { id: string } }) {
  const guestToken = getGuestTokenSession();
  if (!guestToken) {
    notFound();
  }

  const order = await getOrderByIdForGuest(params.id, guestToken);

  if (!order) {
    notFound();
  }

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold text-white">{generateInvoiceId(order.id)}</h1>
      <OrderStatusBadge status={order.status} />
      <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-slate-300">
        <p>Pembeli: {order.userName}</p>
        <p>Total: {formatRupiah(order.totalAmount)}</p>
        <p>Produk: {order.orderItems[0]?.product.name}</p>
        <p>Paket: {order.orderItems[0]?.plan.label}</p>
      </div>
      <OrderLivePanel
        orderId={order.id}
        initialStatus={order.status}
        initialAdminNotes={order.adminNotes}
        initialUpdatedAt={order.updatedAt.toISOString()}
        initialUpdates={order.updates.map((item) => ({
          id: item.id,
          status: item.status,
          message: item.message,
          actor: item.actor,
          createdAt: item.createdAt.toISOString(),
        }))}
      />
      {order.paymentProof ? (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="mb-3 text-sm text-slate-300">Bukti pembayaran:</p>
          <div className="relative h-72 w-full overflow-hidden rounded-xl border border-white/10">
            <Image src={order.paymentProof.imageUrl} alt="Payment proof" fill className="object-contain" />
          </div>
        </div>
      ) : null}
    </section>
  );
}
