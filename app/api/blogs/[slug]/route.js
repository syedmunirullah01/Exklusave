import { NextResponse } from "next/server";
import { deleteBlog, getBlogBySlug, updateBlog } from "@/server/repositories/blogs-repository";

export async function GET(request, { params }) {
  try {
    const { slug } = await params;
    const data = await getBlogBySlug(slug);

    if (!data) {
      return NextResponse.json({ success: false, error: "Blog post not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const { slug } = await params;
    const body = await request.json();
    const data = await updateBlog(slug, body);

    if (!data) {
      return NextResponse.json({ success: false, error: "Blog post not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { slug } = await params;
    const deleted = await deleteBlog(slug);

    if (!deleted) {
      return NextResponse.json({ success: false, error: "Blog post not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
