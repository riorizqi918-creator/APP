import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatRupiah(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function safeFilename(name: string) {
  return name.replace(/[^a-zA-Z0-9._-]/g, "_");
}

export function generateInvoiceId(orderId: string) {
  return `INV-${orderId.slice(0, 8).toUpperCase()}`;
}

export function calculateCountdown(minutes = 15, baseDate?: Date) {
  const start = baseDate ?? new Date();
  return new Date(start.getTime() + minutes * 60 * 1000);
}
