import fs from "fs/promises";
import path from "path";
import os from "os";
import bcrypt from "bcryptjs";
import { supabase } from "@/lib/supabase";
import { getPermissionsForRole } from "@/lib/access-control";

const USERS_FILE_PATH = path.join(process.cwd(), "data", "database", "users.json");
const TMP_USERS_FILE_PATH = path.join(os.tmpdir(), "persuekey_users.json");

const DEFAULT_ADMIN_USER = {
  id: "usr_admin_master",
  name: "Master Admin",
  email: "admin@persuekey.com",
  password: "$2b$10$tV.edxtiHAVT8XEC77LFi.m2VvOtQ2vlFPa.hUpU34kJc5caE5/q6", // admin123
  role: "admin",
  permissions: getPermissionsForRole("admin"),
  isActive: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

async function safeWriteUsers(users) {
  const content = JSON.stringify(users, null, 2);
  try {
    await fs.writeFile(USERS_FILE_PATH, content, "utf-8");
  } catch (err) {
    try {
      await fs.writeFile(TMP_USERS_FILE_PATH, content, "utf-8");
    } catch (tmpErr) {
      console.warn("Serverless filesystem save fallback:", tmpErr.message);
    }
  }
}

export async function getUsers() {
  try {
    const tmpRaw = await fs.readFile(TMP_USERS_FILE_PATH, "utf-8");
    const tmpUsers = JSON.parse(tmpRaw);
    if (Array.isArray(tmpUsers) && tmpUsers.length > 0) {
      return tmpUsers;
    }
  } catch {}

  try {
    const raw = await fs.readFile(USERS_FILE_PATH, "utf-8");
    const users = JSON.parse(raw);
    if (Array.isArray(users) && users.length > 0) {
      return users;
    }
  } catch (err) {
    console.error("Failed to read users.json:", err);
  }

  return [DEFAULT_ADMIN_USER];
}

export async function getUserByEmail(email) {
  const normalizedEmail = email.trim().toLowerCase();
  const users = await getUsers();
  return users.find((u) => u.email.toLowerCase() === normalizedEmail) || null;
}

export async function createUser(userData) {
  const users = await getUsers();
  const normalizedEmail = userData.email.trim().toLowerCase();

  const existing = users.find((u) => u.email.toLowerCase() === normalizedEmail);
  if (existing) {
    throw new Error("A user with this email address already exists.");
  }

  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const newUser = {
    id: `usr_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
    name: userData.name ? userData.name.trim() : "New User",
    email: normalizedEmail,
    password: hashedPassword,
    role: userData.role || "editor",
    permissions: getPermissionsForRole(userData.role || "editor", userData.permissions),
    isActive: userData.isActive !== false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  if (supabase) {
    try {
      await supabase.from("users").insert({
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        password: newUser.password,
        role: newUser.role,
        permissions: newUser.permissions,
        is_active: newUser.isActive,
      });
    } catch (e) {
      // silently ignore Supabase errors
    }
  }

  users.unshift(newUser);
  await safeWriteUsers(users);
  return newUser;
}

export async function updateUser(id, updates) {
  const users = await getUsers();
  const index = users.findIndex((u) => u.id === id);

  if (index === -1) {
    throw new Error("User not found.");
  }

  const current = users[index];
  let hashedPassword = current.password;

  if (updates.password && updates.password.trim()) {
    hashedPassword = await bcrypt.hash(updates.password.trim(), 10);
  }

  const updatedUser = {
    ...current,
    name: updates.name ? updates.name.trim() : current.name,
    email: updates.email ? updates.email.trim().toLowerCase() : current.email,
    password: hashedPassword,
    role: updates.role || current.role,
    permissions: getPermissionsForRole(updates.role || current.role, updates.permissions || current.permissions),
    isActive: updates.isActive !== undefined ? updates.isActive : current.isActive,
    updatedAt: new Date().toISOString(),
  };

  if (supabase) {
    try {
      await supabase
        .from("users")
        .update({
          name: updatedUser.name,
          email: updatedUser.email,
          password: updatedUser.password,
          role: updatedUser.role,
          permissions: updatedUser.permissions,
          is_active: updatedUser.isActive,
        })
        .eq("id", id);
    } catch (e) {
      // ignore
    }
  }

  users[index] = updatedUser;
  await safeWriteUsers(users);
  return updatedUser;
}

export async function deleteUser(id) {
  const users = await getUsers();
  const filtered = users.filter((u) => u.id !== id);

  if (supabase) {
    try {
      await supabase.from("users").delete().eq("id", id);
    } catch (e) {
      // ignore
    }
  }

  await safeWriteUsers(filtered);
  return true;
}
