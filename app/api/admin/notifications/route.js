import { NextResponse } from "next/server";
import { getNotifications, markAllNotificationsAsRead, clearNotifications } from "@/server/repositories/notifications-repository";
import { requirePermission } from "@/server/auth";

export async function GET() {
  const access = await requirePermission("dashboard");
  if (access.error) {
    return access.error;
  }

  try {
    const list = await getNotifications();
    return NextResponse.json({ success: true, data: list });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST() {
  const access = await requirePermission("dashboard");
  if (access.error) {
    return access.error;
  }

  try {
    await markAllNotificationsAsRead();
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE() {
  const access = await requirePermission("dashboard");
  if (access.error) {
    return access.error;
  }

  try {
    await clearNotifications();
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
