"use client";

import { useEffect, useMemo, useState } from "react";
import { Loader2 } from "lucide-react";

type UpdateItem = {
  id: string;
  status: string;
  message: string | null;
  actor: string;
  createdAt: string;
};

const STATUS_LABEL: Record<string, string> = {
  DRAFT: "Draft",
  WAITING_PAYMENT: "Menunggu Pembayaran",
  WAITING_VERIFICATION: "Menunggu Verifikasi",
  VERIFIED: "Terverifikasi",
  PAID: "Lunas",
  COMPLETED: "Selesai",
  REJECTED: "Ditolak",
};

function statusLabel(status: string) {
  return STATUS_LABEL[status] ?? status;
}

type OrderLivePanelProps = {
  orderId: string;
  initialStatus: string;
  initialAdminNotes?: string | null;
  initialUpdatedAt: string;
  initialUpdates: UpdateItem[];
};

export function OrderLivePanel({
  orderId,
  initialStatus,
  initialAdminNotes,
  initialUpdatedAt,
  initialUpdates,
}: OrderLivePanelProps) {
  const [status, setStatus] = useState(initialStatus);
  const [adminNotes, setAdminNotes] = useState(initialAdminNotes ?? "");
  const [updatedAt, setUpdatedAt] = useState(initialUpdatedAt);
  const [updates, setUpdates] = useState<UpdateItem[]>(initialUpdates);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    const poll = async () => {
      try {
        setIsRefreshing(true);
        const response = await fetch(`/api/orders/${orderId}/live`, { cache: "no-store" });
        const payload = await response.json();
        if (!response.ok || !payload.ok) return;

        setStatus(payload.order.status);
        setAdminNotes(payload.order.adminNotes ?? "");
        setUpdatedAt(payload.order.updatedAt);
        setUpdates(payload.order.updates ?? []);
      } catch (error) {
        console.error("[order-live-panel] poll failed:", error);
      } finally {
        setIsRefreshing(false);
      }
    };

    const id = setInterval(poll, 8000);
    return () => clearInterval(id);
  }, [orderId]);

  const lastUpdatedLabel = useMemo(
    () => new Date(updatedAt).toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" }),
    [updatedAt],
  );

  return (
    <div className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm text-slate-300">Status saat ini</p>
          <p className="text-lg font-semibold text-cyan-300">{statusLabel(status)}</p>
        </div>
        {isRefreshing ? <Loader2 className="h-4 w-4 animate-spin text-slate-400" /> : null}
      </div>

      <div className="rounded-xl border border-white/10 bg-slate-950/40 p-3 text-sm">
        <p className="text-slate-400">Update terakhir</p>
        <p className="mt-1 text-slate-100">{lastUpdatedLabel}</p>
      </div>

      <div className="rounded-xl border border-emerald-300/20 bg-emerald-500/10 p-3 text-sm">
        <p className="text-emerald-200">Pesan Admin</p>
        <p className="mt-1 text-slate-100">{adminNotes || "Belum ada pesan dari admin."}</p>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium text-slate-200">Riwayat update</p>
        <div className="space-y-2">
          {updates.length ? (
            updates.map((item) => (
              <div key={item.id} className="rounded-lg border border-white/10 bg-slate-900/50 p-3 text-sm">
                <p className="font-medium text-white">{statusLabel(item.status)}</p>
                <p className="mt-1 text-slate-300">{item.message || "-"}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {item.actor} • {new Date(item.createdAt).toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" })}
                </p>
              </div>
            ))
          ) : (
            <p className="text-sm text-slate-400">Belum ada riwayat update.</p>
          )}
        </div>
      </div>
    </div>
  );
}
