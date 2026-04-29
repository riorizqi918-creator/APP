import Image from "next/image";
import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { getSettings } from "@/lib/data";
import { resolveImageSrc } from "@/lib/image";
import { QrisSettingsForm } from "@/components/shared/qris-settings-form";

export default async function AdminSettingsPage() {
  requireAdmin();
  const settings = await getSettings();
  const qrisUrl = resolveImageSrc(settings.qrisImageUrl || process.env.NEXT_PUBLIC_QRIS_IMAGE_URL, "/assets/qris-default.svg");

  return (
    <section className="space-y-5">
      <h1 className="text-3xl font-bold text-white">Admin Settings</h1>
      <QrisSettingsForm initialUrl={settings.qrisImageUrl ?? ""} />
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
        <p className="mb-3 text-sm text-slate-300">Preview QRIS aktif:</p>
        <div className="relative h-64 w-full max-w-64 overflow-hidden rounded-xl border border-white/10 bg-white">
          <Image src={qrisUrl} alt="Current QRIS" fill className="object-contain p-4" />
        </div>
      </div>
      <Link href="/admin/orders" className="text-sm text-cyan-300 underline">Kembali ke Orders</Link>
    </section>
  );
}
