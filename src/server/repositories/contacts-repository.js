import "server-only";
import { readCollection, writeCollection } from "@/server/database/json-store";
import { supabase } from "@/lib/supabase";
import { createNotification } from "@/server/repositories/notifications-repository";

const FILE_NAME = "contacts.json";

export async function getAllContacts() {
  const contacts = await readCollection(FILE_NAME, []);
  return [...contacts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

export async function createContact(payload) {
  const contacts = await getAllContacts();

  const newContact = {
    id: `contact_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
    name: String(payload.name || "").trim(),
    email: String(payload.email || "").trim().toLowerCase(),
    subject: String(payload.subject || "").trim(),
    message: String(payload.message || "").trim(),
    createdAt: new Date().toISOString(),
  };

  if (supabase) {
    try {
      await supabase.from("contacts").insert({
        id: newContact.id,
        name: newContact.name,
        email: newContact.email,
        subject: newContact.subject,
        message: newContact.message,
      });
    } catch (e) {
      // ignore
    }
  }

  // Create real-time notification
  try {
    const isSubmission = newContact.subject?.includes("Coupon Submission");
    const notifMsg = isSubmission
      ? `🎁 New Coupon Submitted: "${newContact.subject}"`
      : `New support message from ${newContact.name}: "${newContact.subject}"`;

    await createNotification("contact", notifMsg);
  } catch (err) {
    console.error("Failed to generate contact notification:", err);
  }

  contacts.unshift(newContact);
  await writeCollection(FILE_NAME, contacts);
  return newContact;
}

export async function deleteContact(id) {
  const contacts = await getAllContacts();
  const nextContacts = contacts.filter((c) => c.id !== id);

  if (supabase) {
    try {
      await supabase.from("contacts").delete().eq("id", id);
    } catch (e) {
      // ignore
    }
  }

  await writeCollection(FILE_NAME, nextContacts);
  return true;
}
