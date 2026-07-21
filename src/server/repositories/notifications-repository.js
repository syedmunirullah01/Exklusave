import "server-only";
import { readCollection, writeCollection } from "@/server/database/json-store";
import { supabase } from "@/lib/supabase";

const FILE_NAME = "notifications.json";

export async function getNotifications() {
  const list = await readCollection(FILE_NAME, []);
  return [...list].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 50);
}

export async function createNotification(type, message) {
  const list = await readCollection(FILE_NAME, []);
  const newNotif = {
    id: `notif_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
    type, // "contact" | "subscriber"
    message,
    read: false,
    createdAt: new Date().toISOString(),
  };

  if (supabase) {
    try {
      await supabase.from("notifications").insert({
        id: newNotif.id,
        type: newNotif.type,
        message: newNotif.message,
        read: newNotif.read,
      });
    } catch (e) {
      // ignore
    }
  }

  list.unshift(newNotif);
  await writeCollection(FILE_NAME, list);
  return newNotif;
}

export async function markAllNotificationsAsRead() {
  const list = await readCollection(FILE_NAME, []);
  const updated = list.map((item) => ({ ...item, read: true }));

  if (supabase) {
    try {
      await supabase.from("notifications").update({ read: true }).eq("read", false);
    } catch (e) {
      // ignore
    }
  }

  await writeCollection(FILE_NAME, updated);
  return true;
}

export async function clearNotifications() {
  if (supabase) {
    try {
      await supabase.from("notifications").delete().neq("id", "");
    } catch (e) {
      // ignore
    }
  }
  await writeCollection(FILE_NAME, []);
  return true;
}
