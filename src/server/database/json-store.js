import "server-only";

import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import os from "node:os";

const databaseDirectory = path.join(process.cwd(), "data", "database");
const tmpDatabaseDirectory = path.join(os.tmpdir(), "persuekey_database");

async function ensureDatabaseDirectory() {
  try {
    await mkdir(databaseDirectory, { recursive: true });
  } catch {}
  try {
    await mkdir(tmpDatabaseDirectory, { recursive: true });
  } catch {}
}

async function ensureCollectionFile(fileName, fallback = []) {
  await ensureDatabaseDirectory();

  const filePath = path.join(databaseDirectory, fileName);
  try {
    await access(filePath);
  } catch {
    try {
      await writeFile(filePath, `${JSON.stringify(fallback, null, 2)}\n`, "utf8");
    } catch {
      // Ignore read-only filesystem errors on Vercel
    }
  }
  return filePath;
}

export async function readCollection(fileName, fallback = []) {
  const tmpFilePath = path.join(tmpDatabaseDirectory, fileName);
  try {
    const tmpContents = await readFile(tmpFilePath, "utf8");
    return JSON.parse(tmpContents);
  } catch {}

  try {
    const filePath = await ensureCollectionFile(fileName, fallback);
    const fileContents = await readFile(filePath, "utf8");
    return JSON.parse(fileContents);
  } catch (err) {
    return fallback;
  }
}

export async function writeCollection(fileName, records) {
  const content = `${JSON.stringify(records, null, 2)}\n`;
  const filePath = path.join(databaseDirectory, fileName);
  const tmpFilePath = path.join(tmpDatabaseDirectory, fileName);

  await ensureDatabaseDirectory();

  try {
    await writeFile(filePath, content, "utf8");
  } catch (err) {
    // Vercel serverless environment fallback (EROFS)
    try {
      await writeFile(tmpFilePath, content, "utf8");
    } catch (tmpErr) {
      console.warn("Unable to write collection to serverless temp directory:", tmpErr.message);
    }
  }

  return records;
}
