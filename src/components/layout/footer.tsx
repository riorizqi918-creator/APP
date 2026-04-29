import Link from "next/link";
import { Mail, MessageCircle } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950/80 py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 text-sm text-slate-400">
        <p className="text-slate-300">Marketplace Tools Premium</p>
        <div className="flex items-center gap-3">
          <span className="text-slate-400">Support</span>
          <Link
            href="mailto:riorizqi918@gmail.com"
            aria-label="Email support"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/5 text-slate-200 transition hover:border-cyan-300/50 hover:text-cyan-300"
          >
            <Mail className="h-4 w-4" />
          </Link>
          <Link
            href="https://wa.me/6285810383881"
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp support"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/5 text-slate-200 transition hover:border-emerald-300/50 hover:text-emerald-300"
          >
            <MessageCircle className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
