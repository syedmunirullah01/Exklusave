import { NextResponse } from "next/server";
import { addSubscriber, getAllSubscribers } from "@/server/repositories/subscribers-repository";
import { requirePermission } from "@/server/auth";

export async function GET() {
  const access = await requirePermission("dashboard");
  if (access.error) {
    return access.error;
  }

  try {
    const subs = await getAllSubscribers();
    return NextResponse.json({ success: true, data: subs });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const payload = await request.json();
    const { email } = payload;

    if (!email) {
      return NextResponse.json({ error: "Email is required." }, { status: 400 });
    }

    const sub = await addSubscriber(email);
    return NextResponse.json({ success: true, data: sub }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message || "Unable to subscribe." }, { status: 400 });
  }
}
