export const siteConfig = {
  name: "Premium Tools Hub",
  description: "Marketplace demo untuk subscription & voucher digital.",
};

export const categories = [
  { label: "Semua", value: "ALL" },
  { label: "AI", value: "AI" },
  { label: "Design", value: "DESIGN" },
  { label: "Productivity", value: "PRODUCTIVITY" },
] as const;

export const orderStatuses = [
  "DRAFT",
  "WAITING_PAYMENT",
  "WAITING_VERIFICATION",
  "VERIFIED",
  "PAID",
  "COMPLETED",
  "REJECTED",
] as const;
