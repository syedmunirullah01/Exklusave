import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const PUBLIC_DIR = path.join(process.cwd(), "public");

export async function GET() {
  try {
    const files = await fs.readdir(PUBLIC_DIR);
    const seoFiles = [];

    for (const fileName of files) {
      if (
        fileName === "robots.txt" ||
        fileName.endsWith(".xml") ||
        fileName.endsWith(".html") ||
        fileName.endsWith(".txt")
      ) {
        const filePath = path.join(PUBLIC_DIR, fileName);
        const stats = await fs.stat(filePath);

        if (stats.isFile()) {
          let content = "";
          try {
            if (stats.size < 500000) {
              content = await fs.readFile(filePath, "utf-8");
            }
          } catch {
            content = "";
          }

          seoFiles.push({
            name: fileName,
            path: `/${fileName}`,
            size: stats.size,
            updatedAt: stats.mtime,
            content,
          });
        }
      }
    }

    return NextResponse.json({ success: true, files: seoFiles });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");
    const customFileName = formData.get("fileName");

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const fileName = (customFileName || file.name).replaceAll(/[^a-zA-Z0-9._-]/g, "_");
    const buffer = Buffer.from(await file.arrayBuffer());

    const targetPath = path.join(PUBLIC_DIR, fileName);
    try {
      await fs.writeFile(targetPath, buffer);
    } catch (err) {
      if (err.code === "EROFS" || err.message?.includes("read-only")) {
        return NextResponse.json({
          error: "Vercel serverless environment file system is read-only. File could not be saved to disk.",
        }, { status: 400 });
      }
      throw err;
    }

    return NextResponse.json({
      success: true,
      message: `File ${fileName} uploaded successfully!`,
      fileName,
      url: `/${fileName}`,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const body = await req.json();
    const { fileName, content } = body;

    if (!fileName || content === undefined) {
      return NextResponse.json({ error: "File name and content are required" }, { status: 400 });
    }

    const safeName = fileName.replaceAll(/[^a-zA-Z0-9._-]/g, "_");
    const targetPath = path.join(PUBLIC_DIR, safeName);

    try {
      await fs.writeFile(targetPath, content, "utf-8");
    } catch (err) {
      if (err.code === "EROFS" || err.message?.includes("read-only")) {
        return NextResponse.json({
          error: "Vercel serverless environment file system is read-only. File could not be updated on disk.",
        }, { status: 400 });
      }
      throw err;
    }

    return NextResponse.json({
      success: true,
      message: `File ${safeName} updated successfully!`,
      fileName: safeName,
      url: `/${safeName}`,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const fileName = searchParams.get("fileName");

    if (!fileName) {
      return NextResponse.json({ error: "File name required" }, { status: 400 });
    }

    const safeName = fileName.replaceAll(/[^a-zA-Z0-9._-]/g, "_");
    const targetPath = path.join(PUBLIC_DIR, safeName);

    try {
      await fs.unlink(targetPath);
    } catch (err) {
      if (err.code === "EROFS" || err.message?.includes("read-only")) {
        return NextResponse.json({
          error: "Vercel serverless environment file system is read-only.",
        }, { status: 400 });
      }
      throw err;
    }

    return NextResponse.json({
      success: true,
      message: `File ${safeName} deleted successfully!`,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
