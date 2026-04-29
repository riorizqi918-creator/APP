import { BadgeCheck, Quote, Star } from "lucide-react";
import { Reveal } from "@/components/shared/motion";
import { BorderGlow } from "@/components/shared/border-glow";

type Testimonial = {
  name: string;
  city: string;
  status: string;
  quote: string;
  rating: number;
};

const testimonials: Testimonial[] = [
  {
    name: "Rafi Pratama",
    city: "Bandung",
    status: "Verified Buyer",
    quote: "Checkout-nya rapi, cepet, dan status order update terus. Buat jual-beli digital product jadi terasa premium.",
    rating: 5,
  },
  {
    name: "Nadya Putri",
    city: "Surabaya",
    status: "Repeat Customer",
    quote: "Flow pembelian simpel banget. Dari pilih paket sampai upload bukti pembayaran semuanya jelas dan gak ribet.",
    rating: 5,
  },
  {
    name: "Ilham Ramadhan",
    city: "Jakarta",
    status: "Verified Buyer",
    quote: "UI-nya modern dan enak dilihat. Card produk informatif, jadi langsung paham paket mana yang paling cocok.",
    rating: 4,
  },
  {
    name: "Salsa Aulia",
    city: "Yogyakarta",
    status: "Verified Buyer",
    quote: "Tracking order real-time itu nilai plus. Tim admin juga responsif pas aku butuh konfirmasi cepat.",
    rating: 5,
  },
  {
    name: "Dimas Akbar",
    city: "Bekasi",
    status: "Business User",
    quote: "Buat kebutuhan tim, tampilannya terasa profesional. Secara visual ini setara landing SaaS modern.",
    rating: 5,
  },
  {
    name: "Alya Safitri",
    city: "Semarang",
    status: "Verified Buyer",
    quote: "Bagian testimoni dan produk tampil elegan. Mobile view juga tetap clean dan nyaman buat transaksi.",
    rating: 4,
  },
];

const accentMap = [
  "from-cyan-400/80 to-blue-500/80",
  "from-indigo-400/80 to-violet-500/80",
  "from-emerald-400/80 to-cyan-500/80",
  "from-fuchsia-400/80 to-indigo-500/80",
  "from-sky-400/80 to-teal-500/80",
  "from-blue-400/80 to-purple-500/80",
];

const sizeMap = [
  "min-h-[210px]",
  "min-h-[260px]",
  "min-h-[220px]",
  "min-h-[250px]",
  "min-h-[230px]",
  "min-h-[245px]",
];

function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export function TestimonialWall() {
  return (
    <section className="relative mt-16 overflow-hidden rounded-[30px] border border-white/12 bg-slate-950/50 p-6 backdrop-blur-xl sm:p-8">
      <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-cyan-400/20 blur-[110px]" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-indigo-500/20 blur-[120px]" />

      <Reveal>
        <p className="text-xs uppercase tracking-[0.28em] text-cyan-300">Trusted Voices</p>
        <h2 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">Testimoni Pembeli</h2>
        <p className="mt-3 max-w-2xl text-sm text-slate-300 sm:text-base">
          Pengalaman pengguna setelah checkout, pembayaran, dan verifikasi order di marketplace ini.
        </p>
      </Reveal>

      <div className="mt-8 columns-1 gap-4 md:columns-2 xl:columns-3">
        {testimonials.map((item, index) => {
          const accent = accentMap[index % accentMap.length];
          const sizing = sizeMap[index % sizeMap.length];

          return (
            <Reveal key={item.name} className="mb-4 break-inside-avoid" delay={index * 0.06}>
              <BorderGlow
                className={`group rounded-3xl shadow-[0_14px_42px_-24px_rgba(6,182,212,.45)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_26px_55px_-24px_rgba(56,189,248,.45)] ${sizing}`}
                contentClassName="relative overflow-hidden bg-gradient-to-b from-white/[0.09] to-white/[0.03] p-5 ring-1 ring-inset ring-white/5"
                edgeSensitivity={42}
                glowColor="40 80 80"
                backgroundColor="#080718"
                borderRadius={24}
                glowRadius={52}
                glowIntensity={1}
                colors={["#c084fc", "#f472b6", "#38bdf8"]}
              >
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="absolute -top-12 right-10 h-28 w-28 rounded-full bg-cyan-300/20 blur-3xl" />
                </div>

                <div className="relative flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br text-sm font-semibold text-white ${accent}`}>
                      {initials(item.name)}
                    </div>
                    <div>
                      <p className="font-semibold text-white">{item.name}</p>
                      <p className="text-xs text-slate-400">
                        {item.city} • {item.status}
                      </p>
                    </div>
                  </div>
                  <span className="rounded-full border border-white/15 bg-white/5 p-2 text-cyan-200">
                    <Quote className="h-3.5 w-3.5" />
                  </span>
                </div>

                <p className="relative mt-5 text-base leading-relaxed text-slate-100 sm:text-lg">{item.quote}</p>

                <div className="relative mt-5 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-300">
                    {Array.from({ length: item.rating }).map((_, starIndex) => (
                      <Star key={starIndex} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </div>
                  <div className="inline-flex items-center gap-1 rounded-full border border-emerald-300/30 bg-emerald-400/10 px-2.5 py-1 text-[11px] font-medium text-emerald-200">
                    <BadgeCheck className="h-3.5 w-3.5" />
                    verified
                  </div>
                </div>
              </BorderGlow>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
