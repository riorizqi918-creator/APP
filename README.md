# Premium Tools Hub (Demo)

Demo web marketplace untuk jualan **Digital Subscription / License Voucher** dengan UI premium, animasi halus, dan flow checkout QRIS.

## Tech Stack
- Next.js App Router + TypeScript
- Tailwind CSS
- shadcn/ui-style components (Button, Card, Badge, Input, Select, Accordion, Dialog/Drawer)
- Framer Motion
- Prisma + SQLite
- Zod validation
- Sonner toast

## Fitur Utama
- Landing page premium + section unggulan, trust, testimoni, FAQ
- Products page dengan search + filter kategori (`AI`, `DESIGN`, `PRODUCTIVITY`)
- Product detail: pilih paket + qty + CTA checkout drawer
- Checkout 4 step:
  1. Data pembeli
  2. Ringkasan order
  3. Pembayaran QRIS + countdown 15 menit
  4. Upload bukti bayar (jpg/png/webp max 3MB) -> status `WAITING_VERIFICATION`
- Orders page + detail order status
- Admin dashboard:
  - login gate via env password
  - list order masuk
  - lihat bukti pembayaran
  - update status `WAITING_VERIFICATION/VERIFIED/PAID/COMPLETED/REJECTED`
  - admin notes
- Admin settings untuk update URL QRIS

## Legal Note
Semua nama produk adalah placeholder (contoh: `AI Pro Plus`, `Design Suite Pro`, `Search AI Premium`).
Tidak ada penggunaan logo/trademark brand asli.

## Setup
1. Install dependency
```bash
npm install
```

2. Siapkan environment
```bash
cp .env.example .env
```
Atur value `.env`:
```env
DATABASE_URL="file:../dev.db"
ADMIN_PASSWORD="admin123"
NEXT_PUBLIC_QRIS_IMAGE_URL=""
```

3. Generate Prisma Client
```bash
npm run prisma:generate
```

4. Inisialisasi DB schema

Opsional utama (jika `prisma migrate dev` bekerja di mesin Anda):
```bash
npm run prisma:migrate -- --name init
```

Jika engine Prisma migrate tidak bisa berjalan di environment Anda, gunakan fallback lokal:
```bash
sqlite3 dev.db < prisma/init.sql
```

5. Seed data produk + plan
```bash
npm run prisma:seed
```

6. Jalankan development server
```bash
npm run dev
```

Buka: `http://localhost:3000`

## Akun Admin Demo
- URL: `/admin`
- Password: dari `ADMIN_PASSWORD` (default fallback di kode: `admin123`)

## Konfigurasi QRIS
Prioritas sumber QRIS image:
1. `Settings.qrisImageUrl` (dari `/admin/settings`)
2. `NEXT_PUBLIC_QRIS_IMAGE_URL`
3. fallback default: `/assets/qris-default.svg`

## Scripts
- `npm run dev` - run local dev
- `npm run build` - production build
- `npm run lint` - linting
- `npm run prisma:generate` - generate prisma client
- `npm run prisma:migrate` - prisma migrate dev
- `npm run prisma:seed` - isi data demo

## Struktur Route
- Public: `/(site)` -> `/`, `/products`, `/products/[slug]`, `/checkout`
- Dashboard: `/(dashboard)` -> `/orders`, `/orders/[id]`
- Admin: `/(admin)` -> `/admin`, `/admin/orders`, `/admin/orders/[id]`, `/admin/settings`
