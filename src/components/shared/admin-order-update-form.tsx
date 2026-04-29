"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { OrderStatus } from "@/types";

const statusOptions: OrderStatus[] = ["WAITING_VERIFICATION", "VERIFIED", "PAID", "COMPLETED", "REJECTED"];

export function AdminOrderUpdateForm({ orderId, initialStatus, initialNotes }: { orderId: string; initialStatus: string; initialNotes?: string | null }) {
  const safeInitialStatus = (statusOptions.includes(initialStatus as OrderStatus)
    ? (initialStatus as OrderStatus)
    : "WAITING_VERIFICATION") as OrderStatus;
  const [status, setStatus] = useState<OrderStatus>(safeInitialStatus);
  const [adminNotes, setAdminNotes] = useState(initialNotes ?? "");
  const [isPending, startTransition] = useTransition();

  const onSubmit = () => {
    startTransition(async () => {
      const response = await fetch(`/api/admin/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, adminNotes }),
      });
      const result = await response.json();

      if (!response.ok || !result.ok) {
        toast.error(result.message);
        return;
      }

      toast.success("Status order diperbarui");
    });
  };

  return (
    <div className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="space-y-2">
        <Label>Status Order</Label>
        <Select value={status} onValueChange={(value) => setStatus(value as OrderStatus)}>
          <SelectTrigger className="border-white/20 bg-slate-900/70">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {statusOptions.map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Catatan Admin</Label>
        <Textarea value={adminNotes} onChange={(event) => setAdminNotes(event.target.value)} className="border-white/20 bg-slate-900/70" />
      </div>

      <Button onClick={onSubmit} disabled={isPending} className="w-full">
        {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
        Simpan Perubahan
      </Button>
    </div>
  );
}
