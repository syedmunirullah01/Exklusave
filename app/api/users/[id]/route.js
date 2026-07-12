import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { supabase } from "@/lib/supabase";
import { getPermissionsForRole, ROLE_LABELS } from "@/lib/access-control";
import { requirePermission } from "@/server/auth";

function sanitizeUser(user) {
  return {
    id: user.id,
    name: user.name || "",
    email: user.email,
    role: user.role,
    roleLabel: ROLE_LABELS[user.role] || user.role,
    permissions: getPermissionsForRole(user.role, user.permissions),
    isActive: user.is_active,
    createdAt: user.created_at,
    updatedAt: user.updated_at,
  };
}

export async function PATCH(request, { params }) {
  const access = await requirePermission("settings");
  if (access.error) {
    return access.error;
  }

  if (!supabase) {
    return NextResponse.json({ error: "Database is not configured." }, { status: 500 });
  }

  try {
    const { id } = await params;
    const payload = await request.json();

    const { data: existingUser, error: fetchError } = await supabase
      .from("users")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (fetchError || !existingUser) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    const updates = {};

    if (payload?.name !== undefined) {
      updates.name = payload.name.trim();
    }

    if (payload?.email !== undefined) {
      updates.email = payload.email.trim().toLowerCase();
    }

    if (payload?.role !== undefined) {
      updates.role = payload.role;
    }

    if (payload?.permissions !== undefined) {
      updates.permissions = getPermissionsForRole(payload.role || existingUser.role, payload.permissions);
    } else if (payload?.role !== undefined) {
      updates.permissions = getPermissionsForRole(payload.role, existingUser.permissions);
    }

    if (payload?.isActive !== undefined) {
      if (access.session.user.id === id && payload.isActive === false) {
        return NextResponse.json({ error: "You cannot deactivate your own account." }, { status: 400 });
      }
      updates.is_active = Boolean(payload.isActive);
    }

    if (payload?.password) {
      if (payload.password.trim().length < 8) {
        return NextResponse.json({ error: "Password must be at least 8 characters long." }, { status: 400 });
      }

      updates.password = await bcrypt.hash(payload.password.trim(), 10);
    }

    updates.updated_at = new Date().toISOString();

    const { data: updatedUser, error: updateError } = await supabase
      .from("users")
      .update(updates)
      .eq("id", id)
      .select("*")
      .single();

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    return NextResponse.json({ data: sanitizeUser(updatedUser) });
  } catch (error) {
    return NextResponse.json({ error: error.message || "Unable to update user." }, { status: 400 });
  }
}

export async function DELETE(_request, { params }) {
  const access = await requirePermission("settings");
  if (access.error) {
    return access.error;
  }

  if (!supabase) {
    return NextResponse.json({ error: "Database is not configured." }, { status: 500 });
  }

  try {
    const { id } = await params;

    const { data: user, error: fetchError } = await supabase
      .from("users")
      .select("id")
      .eq("id", id)
      .maybeSingle();

    if (fetchError || !user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    if (access.session.user.id === user.id) {
      return NextResponse.json({ error: "You cannot delete your own account." }, { status: 400 });
    }

    const { error: deleteError } = await supabase
      .from("users")
      .delete()
      .eq("id", id);

    if (deleteError) {
      return NextResponse.json({ error: deleteError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message || "Unable to delete user." }, { status: 400 });
  }
}
