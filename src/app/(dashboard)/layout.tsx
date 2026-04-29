import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto w-full max-w-6xl px-4 pb-8 pt-20 sm:pt-24">{children}</main>
      <Footer />
    </div>
  );
}
