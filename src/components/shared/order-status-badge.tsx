import { Badge } from "@/components/ui/badge";
import { statusLabel } from "@/lib/data";
import { OrderStatus } from "@/types";

const variantByStatus: Record<OrderStatus, "secondary" | "warning" | "success" | "danger" | "outline" | "default"> = {
  DRAFT: "outline",
  WAITING_PAYMENT: "warning",
  WAITING_VERIFICATION: "warning",
  VERIFIED: "secondary",
  PAID: "success",
  COMPLETED: "success",
  REJECTED: "danger",
};

export function OrderStatusBadge({ status }: { status: string }) {
  const safeStatus = (status in variantByStatus ? status : "DRAFT") as OrderStatus;
  return <Badge variant={variantByStatus[safeStatus]}>{statusLabel(status)}</Badge>;
}
