import { NextResponse } from "next/server";
import { getUsers, createUser } from "@/server/repositories/users-repository";
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

export async function GET() {
  const access = await requirePermission("settings");
  if (access.error) {
    return access.error;
  }

  try {
    const users = await getUsers();
    return NextResponse.json({ data: (users || []).map(sanitizeUser) });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  const access = await requirePermission("settings");
  if (access.error) {
    return access.error;
  }

  try {
    const payload = await request.json();
    const newUser = await createUser(payload);
    return NextResponse.json({ data: sanitizeUser(newUser) }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message || "Unable to create user." }, { status: 400 });
  }
}
