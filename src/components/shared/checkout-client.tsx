"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState, useTransition } from "react";
import { Copy, Loader2, Upload } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatRupiah, generateInvoiceId } from "@/lib/utils";

type CheckoutPayload = {
  productId: string;
  planId: string;
  qty: number;
  productName: string;
  planLabel: string;
  unitPrice: number;
};

export function CheckoutClient({ payload, qrisImageUrl }: { payload: CheckoutPayload; qrisImageUrl: string }) {
  const [step, setStep] = useState(1);
  const [orderId, setOrderId] = useState("");
  const [expiresAt, setExpiresAt] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [isPending, startTransition] = useTransition();
  const [isUploading, setIsUploading] = useState(false);

  const total = payload.unitPrice * payload.qty;
  const countdownText = useCountdown(expiresAt);

  const invoiceId = useMemo(() => (orderId ? generateInvoiceId(orderId) : "-"), [orderId]);

  const handleCreateOrder = () => {
    startTransition(async () => {
      const response = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userName: name,
          userEmail: email,
          whatsapp,
          productId: payload.productId,
          planId: payload.planId,
          qty: payload.qty,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.ok) {
        toast.error(result.message);
        return;
      }

      setOrderId(result.order.id);
      setExpiresAt(new Date(result.order.expiresAt ?? new Date()).getTime());
      setStep(2);
      toast.success("Order draft berhasil dibuat");
    });
  };

  const handleUploadProof = async () => {
    if (!proofFile || !orderId) {
      toast.error("Pilih file bukti pembayaran terlebih dahulu");
      return;
    }

    const formData = new FormData();
    formData.append("orderId", orderId);
    formData.append("file", proofFile);

    setIsUploading(true);
    const response = await fetch("/api/upload-proof", { method: "POST", body: formData });
    const data = await response.json();
    setIsUploading(false);

    if (!response.ok || !data.ok) {
      toast.error(data.message ?? "Upload bukti gagal");
      return;
    }

    setStep(4);
    toast.success("Order berhasil dibuat, menunggu verifikasi admin");
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <Card className="border-white/10 bg-white/5 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-white">Checkout</CardTitle>
          <div className="flex flex-wrap gap-2 text-xs">
            {["Data Pembeli", "Ringkasan", "Pembayaran", "Selesai"].map((label, index) => (
              <Badge key={label} variant={step >= index + 1 ? "default" : "outline"}>
                {index + 1}. {label}
              </Badge>
            ))}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {step === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Nama</Label>
                <Input value={name} onChange={(event) => setName(event.target.value)} placeholder="Nama lengkap" className="border-white/20 bg-slate-900/70" />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="nama@email.com" className="border-white/20 bg-slate-900/70" />
              </div>
              <div className="space-y-2">
                <Label>WhatsApp (opsional)</Label>
                <Input value={whatsapp} onChange={(event) => setWhatsapp(event.target.value)} placeholder="08xxxxxxxxxx" className="border-white/20 bg-slate-900/70" />
              </div>
              <Button disabled={isPending} onClick={handleCreateOrder} className="w-full bg-gradient-to-r from-indigo-500 to-cyan-400 text-slate-950">
                {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Lanjut ke Ringkasan
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="rounded-lg border border-white/20 bg-slate-900/60 p-4 text-sm">
                <p className="text-slate-300">Produk</p>
                <p className="font-semibold text-white">{payload.productName}</p>
                <p className="text-slate-300">{payload.planLabel} x {payload.qty}</p>
                <p className="mt-2 text-cyan-300">Total: {formatRupiah(total)}</p>
              </div>
              <Button className="w-full" onClick={() => setStep(3)}>Lanjut Pembayaran</Button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="rounded-lg border border-cyan-300/30 bg-cyan-500/10 p-4 text-sm">
                <p>Instruksi pembayaran:</p>
                <ol className="mt-2 list-decimal space-y-1 pl-4 text-slate-300">
                  <li>Scan QRIS di bawah ini dengan aplikasi e-wallet/mobile banking.</li>
                  <li>Bayar sesuai nominal yang tertera.</li>
                  <li>Upload bukti pembayaran untuk verifikasi admin.</li>
                </ol>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-slate-300">Batas waktu pembayaran: <span className="font-semibold text-amber-300">{countdownText}</span></p>
                <p className="text-sm text-slate-300">Invoice ID: <span className="font-medium text-white">{invoiceId}</span></p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <Button variant="outline" className="border-white/20 bg-slate-900/70" onClick={() => navigator.clipboard.writeText(invoiceId).then(() => toast.success("Invoice ID disalin"))}>
                  <Copy className="mr-2 h-4 w-4" /> Copy Invoice ID
                </Button>
                <Button variant="outline" className="border-white/20 bg-slate-900/70" onClick={() => navigator.clipboard.writeText(String(total)).then(() => toast.success("Nominal disalin"))}>
                  <Copy className="mr-2 h-4 w-4" /> Copy Nominal
                </Button>
              </div>

              <div className="relative mx-auto aspect-square w-full max-w-[320px] overflow-hidden rounded-2xl border border-white/20 bg-white p-4">
                <Image src={qrisImageUrl} alt="QRIS" fill className="object-contain p-4" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="proof">Upload bukti pembayaran (jpg/png/webp, max 3MB)</Label>
                <Input
                  id="proof"
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  className="border-white/20 bg-slate-900/70"
                  onChange={(event) => setProofFile(event.target.files?.[0] ?? null)}
                />
              </div>

              <Button disabled={isUploading} onClick={handleUploadProof} className="w-full bg-gradient-to-r from-indigo-500 to-cyan-400 text-slate-950">
                {isUploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
                Kirim Bukti Pembayaran
              </Button>
            </div>
          )}

          {step === 4 && (
            <div className="rounded-xl border border-emerald-400/30 bg-emerald-500/10 p-6 text-center">
              <h3 className="text-xl font-semibold text-emerald-200">Order berhasil dibuat</h3>
              <p className="mt-2 text-sm text-slate-300">Status order: Menunggu Verifikasi Admin</p>
              <Button asChild className="mt-4">
                <Link href={`/orders/${orderId}`}>Lihat Detail Order</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="h-fit border-white/10 bg-white/5 backdrop-blur-xl lg:sticky lg:top-24">
        <CardHeader>
          <CardTitle className="text-white">Ringkasan Pesanan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-slate-300">
          <p>{payload.productName}</p>
          <p>{payload.planLabel}</p>
          <p>Qty: {payload.qty}</p>
          <p className="text-base font-semibold text-cyan-300">{formatRupiah(total)}</p>
          {orderId ? (
            <Button asChild variant="outline" className="mt-4 w-full border-white/20 bg-slate-900/70">
              <Link href="/orders">Lihat Semua Order</Link>
            </Button>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}

function useCountdown(target: number | null) {
  const [tick, setTick] = useState(Date.now());

  useEffect(() => {
    const timer = setInterval(() => setTick(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!target) {
    return "15:00";
  }

  const distance = Math.max(0, target - tick);
  const minutes = Math.floor(distance / 60000);
  const seconds = Math.floor((distance % 60000) / 1000);

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}
