// app/sitemap.js — Dynamic XML sitemap for SEO
// Next.js will serve this live at /sitemap.xml

import { getAllStores } from "@/server/repositories/stores-repository";
import { getAllCategories } from "@/server/repositories/categories-repository";

export const revalidate = 0; // Dynamic route revalidation on every request

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://persuekey.com";

const staticRoutes = [
  { url: "/", priority: 1.0, changeFrequency: "daily" },
  { url: "/stores", priority: 0.9, changeFrequency: "daily" },
  { url: "/categories", priority: 0.9, changeFrequency: "weekly" },
  { url: "/blogs", priority: 0.8, changeFrequency: "weekly" },
  { url: "/contact", priority: 0.6, changeFrequency: "monthly" },
  { url: "/about", priority: 0.6, changeFrequency: "monthly" },
  { url: "/imprint", priority: 0.4, changeFrequency: "monthly" },
  { url: "/privacy", priority: 0.4, changeFrequency: "monthly" },
  { url: "/terms", priority: 0.4, changeFrequency: "monthly" },
];

export default async function sitemap() {
  const now = new Date().toISOString();

  // 1. Static routes
  const staticEntries = staticRoutes.map((route) => ({
    url: `${BASE_URL}${route.url}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  // 2. Dynamic store routes (Direct DB fetch — auto updates instantly when a new store is added)
  let storeEntries = [];
  try {
    const stores = await getAllStores();
    if (Array.isArray(stores)) {
      storeEntries = stores.map((store) => ({
        url: `${BASE_URL}/stores/${store.categorySlug || "general"}/${store.slug}`,
        lastModified: store.updatedAt || now,
        changeFrequency: "daily",
        priority: 0.85,
      }));
    }
  } catch {
    // Fallback if DB query fails
  }

  // 3. Dynamic category routes (Direct DB fetch — auto updates instantly when a category is added)
  let categoryEntries = [];
  try {
    const categories = await getAllCategories();
    if (Array.isArray(categories)) {
      categoryEntries = categories.map((cat) => ({
        url: `${BASE_URL}/categories/${cat.slug}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.75,
      }));
    }
  } catch {
    // Fallback if DB query fails
  }

  return [...staticEntries, ...storeEntries, ...categoryEntries];
}
