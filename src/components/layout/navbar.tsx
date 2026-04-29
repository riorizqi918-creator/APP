"use client";

import Link from "next/link";
import { Menu, ShoppingBag } from "lucide-react";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const links = [
    { href: "/products", label: "Products" },
    { href: "/orders", label: "Orders" },
    { href: "/admin", label: "Admin" },
  ];

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2 text-base font-semibold text-white sm:text-xl">
          <span className="rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500 p-2 text-white">
            <ShoppingBag className="h-5 w-5" strokeWidth={2.2} />
          </span>
          Premium Tools Hub
        </Link>

        <nav className="hidden items-center gap-2 sm:flex">
          {links.map((item) => (
            <Button key={item.href} asChild variant="ghost" className="text-slate-200 hover:text-white">
              <Link href={item.href}>{item.label}</Link>
            </Button>
          ))}
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-2 sm:hidden">
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="border-white/20 bg-slate-900/60">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent className="space-y-3">
              <p className="text-lg font-semibold text-white">Menu</p>
              {links.map((item) => (
                <Button key={item.href} asChild className="w-full justify-start bg-white/5 text-slate-100 hover:bg-white/10">
                  <Link href={item.href}>{item.label}</Link>
                </Button>
              ))}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
