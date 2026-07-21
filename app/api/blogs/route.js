import { NextResponse } from "next/server";
import { createBlog, getAllBlogs } from "@/server/repositories/blogs-repository";

export async function GET() {
  try {
    const data = await getAllBlogs();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const data = await createBlog(body);
    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
