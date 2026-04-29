import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { safeFilename } from "@/lib/utils";
import { uploadProofSchema } from "@/lib/validations";

const MAX_SIZE = 3 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const orderId = formData.get("orderId");
    const file = formData.get("file");

    const parsed = uploadProofSchema.safeParse({ orderId });
    if (!parsed.success) {
      return NextResponse.json({ ok: false, message: "Order ID tidak valid" }, { status: 400 });
    }

    if (!(file instanceof File)) {
      return NextResponse.json({ ok: false, message: "File gambar wajib diisi" }, { status: 400 });
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json({ ok: false, message: "Format file harus jpg/png/webp" }, { status: 400 });
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json({ ok: false, message: "Ukuran maksimal file 3MB" }, { status: 400 });
    }

    const order = await prisma.order.findUnique({ where: { id: parsed.data.orderId } });
    if (!order) {
      return NextResponse.json({ ok: false, message: "Order tidak ditemukan" }, { status: 404 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await fs.mkdir(uploadDir, { recursive: true });

    const extension = file.type === "image/png" ? "png" : file.type === "image/webp" ? "webp" : "jpg";
    const filename = safeFilename(`${parsed.data.orderId}-${Date.now()}.${extension}`);
    const filepath = path.join(uploadDir, filename);

    await fs.writeFile(filepath, buffer);

    const imageUrl = `/uploads/${filename}`;
    await prisma.paymentProof.upsert({
      where: { orderId: parsed.data.orderId },
      update: { imageUrl },
      create: { orderId: parsed.data.orderId, imageUrl },
    });

    await prisma.order.update({
      where: { id: parsed.data.orderId },
      data: { status: "WAITING_VERIFICATION" },
    });

    return NextResponse.json({ ok: true, imageUrl });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ ok: false, message: "Gagal upload bukti pembayaran" }, { status: 500 });
  }
}
