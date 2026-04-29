import Image from "next/image";
import { cn } from "@/lib/utils";

type ProductVisualProps = {
  name: string;
  slug: string;
  className?: string;
};

const visualTheme: Record<string, string> = {
  chatgpt: "from-sky-600 via-blue-600 to-indigo-700",
  "youtube-premium": "from-red-600 via-rose-600 to-zinc-900",
  "spotify-premium": "from-emerald-500 via-green-600 to-zinc-900",
  "capcut-pro": "from-slate-200 via-zinc-300 to-zinc-500",
  "grok-ai": "from-zinc-700 via-slate-900 to-black",
  "gemini-pro": "from-zinc-800 via-slate-900 to-black",
  netflix: "from-red-700 via-red-600 to-black",
};

const logoMap: Record<string, string> = {
  chatgpt: "/assets/logos/chatgpt.jpeg",
  "youtube-premium": "/assets/logos/youtube.svg",
  "spotify-premium": "/assets/logos/spotify.svg",
  "capcut-pro": "/assets/logos/capcut.jpeg",
  "grok-ai": "/assets/logos/grok.jpeg",
  "gemini-pro": "/assets/logos/gemini.svg",
  netflix: "/assets/logos/netflix.svg",
};

export function ProductVisual({ name, slug, className }: ProductVisualProps) {
  const theme = visualTheme[slug] ?? "from-indigo-600 via-blue-600 to-cyan-600";
  const logo = logoMap[slug];

  return (
    <div className={cn("relative overflow-hidden bg-gradient-to-br", theme, className)}>
      <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-white/15 blur-sm" />
      <div className="absolute -right-12 top-8 h-36 w-36 rounded-full bg-white/10 blur-sm" />
      {logo ? (
        <div className="absolute inset-0 flex items-center justify-center px-8 py-8">
          <Image src={logo} alt={`${name} logo`} width={120} height={120} className="h-24 w-24 rounded-2xl object-contain shadow-[0_20px_40px_-18px_rgba(0,0,0,.65)] sm:h-28 sm:w-28" />
        </div>
      ) : null}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/35 to-transparent" />
      <div className="absolute bottom-3 left-3 rounded-md border border-white/25 bg-black/30 px-2 py-1 text-[11px] font-semibold tracking-wide text-white">
        {name}
      </div>
    </div>
  );
}
