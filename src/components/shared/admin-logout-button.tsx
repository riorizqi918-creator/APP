"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AdminLogoutButton() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <Button
      variant="outline"
      className="border-white/20 bg-slate-900/60"
      disabled={isPending}
      onClick={() => {
        startTransition(async () => {
          await fetch("/api/admin/logout", { method: "POST" });
          router.push("/admin");
          router.refresh();
        });
      }}
    >
      <LogOut className="mr-2 h-4 w-4" /> Logout
    </Button>
  );
}
