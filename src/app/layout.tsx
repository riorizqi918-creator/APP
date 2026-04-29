import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/shared/theme-provider";
import { AppToaster } from "@/components/shared/app-toaster";
import { EffectsGate } from "@/components/shared/effects-gate";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" });

export const metadata: Metadata = {
  title: "Premium Tools Hub",
  description: "Demo marketplace digital subscription dan license voucher.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${manrope.variable} ${spaceGrotesk.variable} relative font-sans`}>
        <ThemeProvider>
          <EffectsGate />
          <div className="relative z-10">{children}</div>
          <div className="relative z-20">
            <AppToaster />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
