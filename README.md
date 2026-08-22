<p align="center">
  <h1 align="center">🛍️ Ryuuka Store</h1>
  <p align="center"><strong>Demo Marketplace Digital Subscription & License Voucher</strong></p>
  <p align="center">
    <a href="https://premium-tools-hub.vercel.app"><img src="https://img.shields.io/badge/Live%20Demo-Vercel-black?style=for-the-badge&logo=vercel" alt="Live Demo"></a>
    <a href="https://github.com/riorizqi-dev/Ryuuka-Store"><img src="https://img.shields.io/github/stars/riorizqi-dev/Ryuuka-Store?style=for-the-badge&logo=github&color=gold" alt="Stars"></a>
    <a href="https://github.com/riorizqi-dev/Ryuuka-Store"><img src="https://img.shields.io/github/forks/riorizqi-dev/Ryuuka-Store?style=for-the-badge&logo=github&color=blue" alt="Forks"></a>
    <a href="https://github.com/riorizqi-dev/Ryuuka-Store"><img src="https://img.shields.io/github/issues/riorizqi-dev/Ryuuka-Store?style=for-the-badge&logo=github&color=red" alt="Issues"></a>
    <a href="https://github.com/riorizqi-dev/Ryuuka-Store/blob/main/LICENSE"><img src="https://img.shields.io/github/license/riorizqi-dev/Ryuuka-Store?style=for-the-badge" alt="License"></a>
  </p>
  <p align="center">
    <img src="https://img.shields.io/badge/Next.js-13.5.11-black?style=for-the-badge&logo=next.js" alt="Next.js">
    <img src="https://img.shields.io/badge/TypeScript-5.9.2-3178C6?style=for-the-badge&logo=typescript" alt="TypeScript">
    <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS">
    <img src="https://img.shields.io/badge/Prisma-5.22-2D3748?style=for-the-badge&logo=prisma" alt="Prisma">
    <img src="https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite" alt="SQLite">
    <img src="https://img.shields.io/badge/Framer_Motion-11.18-0055FF?style=for-the-badge&logo=framer" alt="Framer Motion">
  </p>
</p>

---

## 📖 About The Project

**Ryuuka Store** adalah platform marketplace demo untuk penjualan produk digital seperti **subscription service**, **license voucher**, dan **akun premium** berbagai layanan populer.

**Live Demo:** [https://premium-tools-hub.vercel.app](https://premium-tools-hub.vercel.app) Dibangun dengan arsitektur modern menggunakan Next.js App Router, Ryuuka Store menawarkan pengalaman berbelanja produk digital yang mulus dari mulai menjelajahi katalog produk, memilih paket langganan, hingga menyelesaikan pembayaran menggunakan QRIS.

Platform ini dirancang sebagai demonstrasi lengkap dari sebuah e-commerce digital produk, mencakup halaman publik untuk pembeli dan dashboard admin untuk mengelola seluruh transaksi. Setiap fitur dibangun dengan perhatian pada detail UI/UX, mulai dari animasi transisi yang halus hingga efek visual premium yang memberikan kesan profesional pada seluruh pengalaman pengguna.

---

## ✨ Features

- **🏠 Landing Page Premium** — Halaman utama dengan showcase produk unggulan, indikator kepercayaan, testimoni, dan FAQ interaktif dengan animasi scroll yang halus
- **🔍 Katalog Produk** — Jelajahi seluruh produk digital dengan pencarian real-time dan filtering berdasarkan kategori (AI, Design, Productivity)
- **📦 Detail Produk** — Lihat detail lengkap produk, pilih paket langganan, atur jumlah, dan masuk ke proses checkout
- **🛒 Checkout 4 Langkah** — Alur checkout yang terstruktur: input data pembeli → ringkasan order → pembayaran QRIS dengan countdown 15 menit → upload bukti bayar (JPG/PNG/WebP, max 3MB)
- **📊 Tracking Pesanan** — Pantau status pesanan secara real-time dengan halaman detail order dan riwayat transaksi
- **🔐 Admin Dashboard** — Panel admin terproteksi password untuk melihat seluruh order masuk, mereview bukti pembayaran, mengupdate status pesanan, dan menambahkan catatan admin
- **⚙️ Admin Settings** — Konfigurasi URL gambar QRIS langsung dari panel admin
- **🎨 UI/UX Premium** — Dibangun dengan komponen shadcn/ui, animasi Framer Motion, SplashCursor effects, border glow, dan light pillar visual effects
- **🌓 Dark/Light Mode** — Toggle tema gelap/terang secara seamless menggunakan next-themes
- **📱 Responsive Design** — Layout fully responsive yang dioptimasi untuk desktop, tablet, dan mobile
- **🔔 Toast Notifikasi** — Feedback real-time menggunakan Sonner toast notifications

---

## 📁 Project Structure

```
Ryuuka-Store/
├── prisma/                        # Database schema & seed
│   ├── schema.prisma              # Prisma schema (SQLite)
│   ├── init.sql                   # SQL initialization script
│   └── seed.js                    # Product & plan seed data
│
├── public/                        # Static assets
│   └── assets/                    # Product images & logos
│
├── src/                           # Application source code
│   ├── app/                       # Next.js 13 App Router
│   │   ├── (admin)/               # Admin dashboard route group
│   │   ├── (dashboard)/           # User dashboard route group
│   │   ├── (site)/                # Public site route group
│   │   │   ├── page.tsx           # Landing page
│   │   │   ├── checkout/          # Checkout flow pages
│   │   │   └── products/          # Product catalog & detail pages
│   │   ├── api/                   # API routes (admin, orders, upload-proof)
│   │   └── layout.tsx             # Root layout with providers
│   │
│   ├── components/                # React components
│   │   ├── layout/                # Navbar & Footer
│   │   ├── shared/                # Shared business components
│   │   └── ui/                    # shadcn/ui primitives
│   │
│   ├── lib/                       # Utility libraries
│   │   ├── prisma.ts              # Prisma client singleton
│   │   ├── auth.ts                # Admin authentication
│   │   ├── constants.ts           # App constants & config
│   │   ├── data.ts                # Data fetching functions
│   │   ├── validations.ts         # Zod validation schemas
│   │   └── image.ts               # Image processing utilities
│   │
│   └── types/                     # TypeScript type definitions
│
├── .env.example                   # Environment variables template
├── next.config.mjs                # Next.js configuration
├── tailwind.config.js             # Tailwind CSS configuration
├── tsconfig.json                  # TypeScript configuration
└── package.json                   # Dependencies & scripts
```

---

## ⚙️ Installation

### Prerequisites

- **Node.js** >= 18.x
- **npm** >= 9.x (atau yarn / pnpm)
- **SQLite** (otomatis via Prisma)

### Step-by-step Setup

1. **Clone repository**

```bash
git clone https://github.com/riorizqi-dev/Ryuuka-Store.git
cd Ryuuka-Store
```

2. **Install dependencies**

```bash
npm install
```

> Perintah ini akan otomatis menjalankan `prisma generate` melalui script `postinstall`.

3. **Setup environment variables**

```bash
cp .env.example .env
```

Edit file `.env` dengan konfigurasi Anda:

```env
# Database (SQLite — default)
DATABASE_URL="file:../dev.db"

# Password admin panel
ADMIN_PASSWORD="your-secure-admin-password"

# URL gambar QRIS (opsional — bisa diatur via admin panel juga)
NEXT_PUBLIC_QRIS_IMAGE_URL=""
```

4. **Inisialisasi database**

```bash
# Option A: Menggunakan Prisma Migrate (recommended)
npm run prisma:migrate -- --name init

# Option B: Menggunakan SQLite langsung (fallback)
sqlite3 dev.db < prisma/init.sql
```

5. **Seed database dengan data demo**

```bash
npm run prisma:seed
```

6. **Jalankan development server**

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

---

## 🚀 Usage

### Commands

| Command | Deskripsi |
|---------|-----------|
| `npm run dev` | Jalankan development server di `localhost:3000` |
| `npm run build` | Build untuk production |
| `npm run start` | Jalankan production server |
| `npm run start:3001` | Jalankan production server di port 3001 |
| `npm run lint` | Jalankan ESLint |
| `npm run prisma:generate` | Generate Prisma Client |
| `npm run prisma:migrate` | Jalankan Prisma database migrations |
| `npm run prisma:seed` | Isi database dengan data demo |

### Routes

| Route | Deskripsi |
|-------|-----------|
| `/` | Landing page utama |
| `/products` | Katalog semua produk |
| `/products/[slug]` | Detail produk |
| `/checkout` | Alur checkout |
| `/orders` | Riwayat pesanan user |
| `/orders/[id]` | Detail pesanan |
| `/admin` | Login admin |
| `/admin/orders` | Manajemen order admin |
| `/admin/orders/[id]` | Detail order admin |
| `/admin/settings` | Pengaturan admin (QRIS) |

### Admin Access

1. Buka `/admin`
2. Masukkan password yang diatur di environment variable `ADMIN_PASSWORD`
   - Default fallback: `admin123`
3. Kelola order: lihat bukti pembayaran, update status, tambahkan catatan
4. Konfigurasi gambar QRIS via `/admin/settings`

### QRIS Image Priority

Urutan sumber gambar QRIS:

1. **Settings.qrisImageUrl** — Diatur via panel Admin Settings (`/admin/settings`)
2. **NEXT_PUBLIC_QRIS_IMAGE_URL** — Environment variable
3. **Fallback** — `/assets/qris-default.svg`

---

## 🛠 Technologies Used

### Core

| Technology | Version | Kegunaan |
|------------|---------|----------|
| [Next.js](https://nextjs.org/) | 13.5.11 | React framework dengan App Router |
| [TypeScript](https://www.typescriptlang.org/) | 5.9.2 | Type-safe JavaScript |
| [React](https://react.dev/) | 18.2.0 | UI library |

### Styling & UI

| Technology | Version | Kegunaan |
|------------|---------|----------|
| [Tailwind CSS](https://tailwindcss.com/) | 3.4.17 | Utility-first CSS framework |
| [shadcn/ui](https://ui.shadcn.com/) | — | Reusable UI primitives (New York style) |
| [Framer Motion](https://www.framer.com/motion/) | 11.18.2 | Animation library |
| [Lucide React](https://lucide.dev/) | 0.542.0 | Icon library |
| [Radix UI](https://www.radix-ui.com/) | — | Accessible UI primitives |
| [class-variance-authority](https://cva.style/) | 0.7.1 | Component variant management |
| [tailwind-merge](https://github.com/dcastil/tailwind-merge) | 3.3.1 | Tailwind class merging |

### Backend & Database

| Technology | Version | Kegunaan |
|------------|---------|----------|
| [Prisma](https://www.prisma.io/) | 5.22.0 | ORM & database toolkit |
| [SQLite](https://www.sqlite.org/) | — | Database engine |
| [Zod](https://zod.dev/) | 4.1.5 | Schema validation |

### Effects & Visuals

| Technology | Version | Kegunaan |
|------------|---------|----------|
| [Three.js](https://threejs.org/) | 0.167.1 | 3D visual effects |
| [next-themes](https://github.com/pacocoursey/next-themes) | 0.4.6 | Dark/light mode |

### Utilities

| Technology | Kegunaan |
|------------|----------|
| [Sonner](https://sonner.emilkowal.ski/) | Toast notifications |
| [ESLint](https://eslint.org/) | Code linting |
| [PostCSS](https://postcss.org/) | CSS processing |

---

## 📋 Requirements

| Dependency | Minimum Version |
|------------|----------------|
| Node.js | >= 18.x |
| npm | >= 9.x |
| SQLite | Built-in (via Prisma) |

---

## 🤝 Contributing

Kontribusi membuat komunitas open-source menjadi tempat yang luar biasa untuk belajar, terinspirasi, dan berkreasi. Setiap kontribusi yang Anda buat **sangat diapresiasi**.

1. **Fork** project ini
2. **Create** branch fitur Anda (`git checkout -b feature/AmazingFeature`)
3. **Commit** perubahan Anda (`git commit -m 'Add some AmazingFeature'`)
4. **Push** ke branch (`git push origin feature/AmazingFeature`)
5. **Open** Pull Request

### Development Guidelines

- Ikuti style guide dan konvensi coding yang ada
- Pastikan tipe TypeScript didefinisikan dengan benar
- Test perubahan Anda secara menyeluruh
- Update dokumentasi jika diperlukan
- Gunakan conventional commit messages (`feat:`, `fix:`, `chore:`, dll)

---

## 📄 License

Distributed under the **MIT License**. Lihat [`LICENSE`](LICENSE) untuk informasi lebih lanjut.

---

## 👨‍💻 Author

**Rio Rizqi Saputra** — [![GitHub](https://img.shields.io/badge/GitHub-riorizqi--dev-181717?style=for-the-badge&logo=github)](https://github.com/riorizqi-dev)

---

<p align="center">
  <strong>Ryuuka Store</strong> — Built with ❤️ using Next.js, TypeScript & Tailwind CSS
  <br /><br />
  <a href="https://github.com/riorizqi-dev/Ryuuka-Store/issues">Report Bug</a>
  ·
  <a href="https://github.com/riorizqi-dev/Ryuuka-Store/issues">Request Feature</a>
</p>

> 📝 **Legal Note:** Semua nama produk yang digunakan dalam project ini adalah placeholder (contoh: "AI Pro Plus", "Design Suite Pro", "ChatGPT", "Spotify Premium", "YouTube Premium"). Tidak ada penggunaan logo atau trademark brand asli.