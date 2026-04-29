import { z } from "zod";

export const orderCustomerSchema = z.object({
  userName: z.string().trim().min(2, "Nama minimal 2 karakter").max(80),
  userEmail: z.string().trim().email("Format email tidak valid").max(120),
  whatsapp: z
    .string()
    .trim()
    .max(20)
    .optional()
    .transform((v) => (v ? v : undefined)),
  productId: z.string().cuid(),
  planId: z.string().cuid(),
  qty: z.coerce.number().int().min(1).max(10),
});

export const updateOrderStatusSchema = z.object({
  orderId: z.string().cuid(),
  status: z.enum([
    "WAITING_VERIFICATION",
    "VERIFIED",
    "PAID",
    "COMPLETED",
    "REJECTED",
  ]),
  adminNotes: z.string().max(500).optional(),
});

export const adminLoginSchema = z.object({
  password: z.string().min(1),
});

export const updateSettingsSchema = z.object({
  qrisImageUrl: z.string().trim().url().or(z.literal("")),
});

export const uploadProofSchema = z.object({
  orderId: z.string().cuid(),
});
