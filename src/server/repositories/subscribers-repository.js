import "server-only";
import { readCollection, writeCollection } from "@/server/database/json-store";
import { supabase } from "@/lib/supabase";
import { createNotification } from "@/server/repositories/notifications-repository";

const FILE_NAME = "subscribers.json";

export async function getAllSubscribers() {
  const subscribers = await readCollection(FILE_NAME, []);
  return [...subscribers].sort((a, b) => new Date(b.subscribedAt) - new Date(a.subscribedAt));
}

export async function addSubscriber(email) {
  const subscribers = await getAllSubscribers();
  const normalizedEmail = String(email || "").trim().toLowerCase();

  if (!normalizedEmail) {
    throw new Error("Email address is required.");
  }

  const existing = subscribers.find((s) => s.email === normalizedEmail);
  if (existing) {
    return existing;
  }

  const newSubscriber = {
    id: `sub_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
    email: normalizedEmail,
    subscribedAt: new Date().toISOString(),
  };

  if (supabase) {
    try {
      await supabase.from("subscribers").insert({
        id: newSubscriber.id,
        email: newSubscriber.email,
      });
    } catch (e) {
      // ignore
    }
  }

  // Create real-time notification
  try {
    await createNotification(
      "subscriber",
      `New newsletter subscriber joined: ${newSubscriber.email}`
    );
  } catch (err) {
    console.error("Failed to generate subscriber notification:", err);
  }

  subscribers.unshift(newSubscriber);
  await writeCollection(FILE_NAME, subscribers);
  return newSubscriber;
}

export async function deleteSubscriber(id) {
  const subscribers = await getAllSubscribers();
  const nextSubscribers = subscribers.filter((s) => s.id !== id);

  if (supabase) {
    try {
      await supabase.from("subscribers").delete().eq("id", id);
    } catch (e) {
      // ignore
    }
  }

  await writeCollection(FILE_NAME, nextSubscribers);
  return true;
}
