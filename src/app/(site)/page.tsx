import Link from "next/link";
import { CheckCircle2, Mail, MessageCircle, ShieldCheck, Sparkles, WalletCards } from "lucide-react";
import { getFeaturedProducts } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ProductCard } from "@/components/shared/product-card";
import { TestimonialWall } from "@/components/shared/testimonial-wall";
import { PageTransition, Reveal } from "@/components/shared/motion";

const stats = [
  { value: "24/7", label: "Support Fast Response" },
  { value: "< 5 Menit", label: "Proses Order Masuk" },
  { value: "100%", label: "Asset Self-Contained" },
];

const benefits = [
  {
    icon: ShieldCheck,
    title: "Transaksi Aman",
    text: "Status order dilacak end-to-end dari checkout sampai verifikasi.",
  },
  {
    icon: WalletCards,
    title: "Checkout Ringkas",
    text: "Flow pembelian singkat dengan opsi pembayaran QRIS.",
  },
  {
    icon: Sparkles,
    title: "Nyaman Dipakai Seharian",
    text: "Desain dark yang tetap jelas dan gak bikin mata capek.",
  },
];

export default async function LandingPage() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <PageTransition>
      <section className="relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-slate-900/90 via-slate-900/70 to-blue-950/70 px-6 py-16 backdrop-blur-xl sm:px-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_20%,rgba(56,189,248,.23),transparent_32%),radial-gradient(circle_at_85%_0%,rgba(99,102,241,.27),transparent_36%),radial-gradient(circle_at_50%_100%,rgba(14,165,233,.14),transparent_40%)]" />
        <div className="relative grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">Marketplace Digital</p>
            <h1 className="mt-5 font-[var(--font-space)] text-4xl font-bold leading-tight text-white sm:text-6xl">
              Marketplace Tools Premium
              <span className="block bg-gradient-to-r from-cyan-300 to-indigo-300 bg-clip-text text-transparent">Cepat, Aman, Tanpa Ribet</span>
            </h1>
            <p className="mt-5 max-w-xl text-slate-300">
              Beli akun digital favorit lo dengan proses instan, tanpa ribet, dan status order yang jelas dari awal sampai selesai.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild className="bg-gradient-to-r from-indigo-500 to-cyan-400 text-slate-950 hover:opacity-90">
                <Link href="/products">Mulai Belanja</Link>
              </Button>
              <Button asChild variant="outline" className="border-white/25 bg-white/5">
                <Link href="/orders">Lacak Order</Link>
              </Button>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            {stats.map((item) => (
              <div key={item.label} className="rounded-2xl border border-white/15 bg-black/30 p-4">
                <p className="text-2xl font-semibold text-cyan-300">{item.value}</p>
                <p className="mt-1 text-sm text-slate-300">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-16 space-y-6">
        <Reveal>
          <h2 className="text-2xl font-semibold text-white">Produk Unggulan</h2>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((product, index) => (
            <Reveal key={product.id} delay={index * 0.05}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mt-16 grid gap-4 md:grid-cols-3">
        {benefits.map((item) => (
          <Card key={item.title} className="border-white/15 bg-white/5 backdrop-blur-xl">
            <CardContent className="p-5">
              <item.icon className="h-6 w-6 text-cyan-300" />
              <h3 className="mt-4 font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-300">{item.text}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <TestimonialWall />

      <section className="mt-16">
        <h2 className="text-2xl font-semibold text-white">FAQ</h2>
        <Accordion type="single" collapsible className="mt-4 rounded-2xl border border-white/10 bg-white/5 px-4">
          <AccordionItem value="q1">
            <AccordionTrigger>Akun dikirim berapa lama setelah pembayaran?</AccordionTrigger>
            <AccordionContent>Kalau bukti transfer sudah masuk dan valid, biasanya diproses hitungan menit. Saat ramai bisa sedikit lebih lama.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="q2">
            <AccordionTrigger>Kalau order belum masuk, harus gimana?</AccordionTrigger>
            <AccordionContent>Langsung kirim invoice ID ke support supaya bisa dicek manual dan diprioritaskan prosesnya.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="q3">
            <AccordionTrigger>Ada garansi kalau akun bermasalah?</AccordionTrigger>
            <AccordionContent>Ada. Selama masih masa garansi, chat support dan sertakan bukti kendala supaya bisa langsung dibantu.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      <section className="mt-16 rounded-2xl border border-white/15 bg-white/5 p-6 text-center">
        <h2 className="text-2xl font-semibold text-white">Butuh bantuan?</h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-300">
          Kalau ada kendala saat order atau pertanyaan lainnya, langsung hubungi tim support kami.
        </p>
        <div className="mt-4 flex items-center justify-center gap-3">
          <Link
            href="mailto:riorizqi918@gmail.com"
            aria-label="Email support"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-slate-100 transition hover:border-cyan-300/50 hover:text-cyan-300"
          >
            <Mail className="h-4 w-4" />
          </Link>
          <Link
            href="https://wa.me/6285810383881"
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp support"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-slate-100 transition hover:border-emerald-300/50 hover:text-emerald-300"
          >
            <MessageCircle className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="mt-16 rounded-2xl border border-cyan-300/30 bg-cyan-500/10 p-6 text-center">
        <CheckCircle2 className="mx-auto h-7 w-7 text-cyan-300" />
        <p className="mt-3 text-sm text-slate-200">Tinggal pilih dan checkout. Order langsung diproses tanpa ribet.</p>
      </section>
    </PageTransition>
  );
}

