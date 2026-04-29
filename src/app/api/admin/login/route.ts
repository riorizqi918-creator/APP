import { NextResponse } from "next/server";
import { setAdminSession } from "@/lib/auth";
import { adminLoginSchema } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = adminLoginSchema.safeParse(body);
    const expectedPassword = process.env.ADMIN_PASSWORD ?? "kunci123";

    if (!parsed.success || parsed.data.password !== expectedPassword) {
      return NextResponse.json({ ok: false, message: "Password admin salah" }, { status: 401 });
    }

    setAdminSession();
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[api/admin/login] failed:", error);
    return NextResponse.json({ ok: false, message: "Gagal login admin" }, { status: 500 });
  }
}
