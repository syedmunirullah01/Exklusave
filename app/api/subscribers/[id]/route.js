import { NextResponse } from "next/server";
import { deleteSubscriber } from "@/server/repositories/subscribers-repository";
import { requirePermission } from "@/server/auth";

export async function DELETE(request, { params }) {
  const access = await requirePermission("dashboard");
  if (access.error) {
    return access.error;
  }

  try {
    const { id } = await params;
    await deleteSubscriber(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
