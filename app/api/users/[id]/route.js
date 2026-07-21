import { NextResponse } from "next/server";
import { updateUser, deleteUser } from "@/server/repositories/users-repository";
import { requirePermission } from "@/server/auth";

function sanitizeUser(user) {
  return {
    id: user.id,
    name: user.name || "",
    email: user.email,
    role: user.role,
    permissions: user.permissions,
    isActive: user.isActive,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

export async function PATCH(request, { params }) {
  const access = await requirePermission("settings");
  if (access.error) {
    return access.error;
  }

  try {
    const { id } = await params;
    const payload = await request.json();

    if (payload?.isActive === false && access.session?.user?.id === id) {
      return NextResponse.json({ error: "You cannot deactivate your own account." }, { status: 400 });
    }

    const updated = await updateUser(id, payload);
    return NextResponse.json({ data: sanitizeUser(updated) });
  } catch (error) {
    return NextResponse.json({ error: error.message || "Unable to update user." }, { status: 400 });
  }
}

export async function DELETE(request, { params }) {
  const access = await requirePermission("settings");
  if (access.error) {
    return access.error;
  }

  try {
    const { id } = await params;

    if (access.session?.user?.id === id) {
      return NextResponse.json({ error: "You cannot delete your own account." }, { status: 400 });
    }

    await deleteUser(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message || "Unable to delete user." }, { status: 400 });
  }
}
