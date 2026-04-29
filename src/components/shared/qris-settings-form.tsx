"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { updateQrisSettings } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

export function QrisSettingsForm({ initialUrl }: { initialUrl: string }) {
  const [qrisImageUrl, setQrisImageUrl] = useState(initialUrl);
  const [isPending, startTransition] = useTransition();

  const onSubmit = () => {
    startTransition(async () => {
      const result = await updateQrisSettings({ qrisImageUrl });
      if (!result.ok) {
        toast.error(result.message);
        return;
      }

      toast.success("Pengaturan QRIS berhasil diperbarui");
    });
  };

  return (
    <div className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-5">
      <div className="space-y-2">
        <Label>QRIS Image URL</Label>
        <Input value={qrisImageUrl} onChange={(event) => setQrisImageUrl(event.target.value)} placeholder="https://..." className="border-white/20 bg-slate-900/70" />
      </div>
      <p className="text-xs text-slate-400">Kosongkan nilai untuk kembali ke fallback `NEXT_PUBLIC_QRIS_IMAGE_URL` atau default gambar demo.</p>
      <Button onClick={onSubmit} disabled={isPending}>
        {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
        Simpan Settings
      </Button>
    </div>
  );
}
