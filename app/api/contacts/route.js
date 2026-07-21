import { NextResponse } from "next/server";
import { createContact, getAllContacts } from "@/server/repositories/contacts-repository";
import { requirePermission } from "@/server/auth";

export async function GET() {
  const access = await requirePermission("dashboard");
  if (access.error) {
    return access.error;
  }

  try {
    const contacts = await getAllContacts();
    return NextResponse.json({ success: true, data: contacts });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const payload = await request.json();
    const { name, email, subject, message } = payload;

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    const contact = await createContact({ name, email, subject, message });
    return NextResponse.json({ success: true, data: contact }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message || "Unable to save message." }, { status: 400 });
  }
}
