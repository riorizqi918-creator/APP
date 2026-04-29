import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/auth";
import { AdminLoginForm } from "@/components/shared/admin-login-form";

export default function AdminEntryPage() {
  if (isAdminAuthenticated()) {
    redirect("/admin/orders");
  }

  return (
    <div className="mx-auto w-full max-w-md py-24 sm:py-16">
      <AdminLoginForm />
      <p className="mt-3 text-center text-xs text-slate-400">
        <Link href="/" className="hover:text-cyan-300">Kembali ke beranda</Link>
      </p>
    </div>
  );
}
