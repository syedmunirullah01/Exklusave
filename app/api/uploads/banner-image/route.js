import { NextResponse } from "next/server";
import { uploadImageBufferToSupabase } from "@/server/supabase-storage";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ["image/png", "image/jpeg", "image/webp", "image/svg+xml"];

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Banner image file is required." }, { status: 400 });
    }

    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      return NextResponse.json({ error: "Banner image must be PNG, JPG, WEBP, or SVG." }, { status: 400 });
    }

    if (file.size > MAX_IMAGE_SIZE) {
      return NextResponse.json({ error: "Banner image must be 5MB or smaller." }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const ext = file.type.split("/")[1]?.split("+")[0] || "png";
    const filename = `banner-${Date.now()}-${Math.random().toString(36).substring(2, 7)}.${ext}`;

    try {
      // Attempt Supabase upload first
      const uploadResult = await uploadImageBufferToSupabase(buffer, `banners/${filename}`, file.type);
      return NextResponse.json({
        data: {
          publicId: uploadResult.public_id,
          secureUrl: uploadResult.secure_url,
        },
      });
    } catch (storageError) {
      // Fallback: write to local public/banners folder
      const bannersDir = path.join(process.cwd(), "public", "banners");
      await mkdir(bannersDir, { recursive: true });
      const localFilePath = path.join(bannersDir, filename);
      await writeFile(localFilePath, buffer);

      return NextResponse.json({
        data: {
          publicId: filename,
          secureUrl: `/banners/${filename}`,
        },
      });
    }
  } catch (error) {
    return NextResponse.json({ error: error.message || "Unable to upload banner image." }, { status: 500 });
  }
}
