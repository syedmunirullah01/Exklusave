// app/sitemap.js — Auto-generated XML sitemap for SEO
// Next.js will serve this at /sitemap.xml

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

  // Static routes
  const staticEntries = staticRoutes.map((route) => ({
    url: `${BASE_URL}${route.url}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  // Dynamic store routes
  let storeEntries = [];
  try {
    const res = await fetch(`${BASE_URL}/api/stores`, { cache: "no-store" });
    const data = await res.json();
    const stores = Array.isArray(data?.data) ? data.data : [];
    storeEntries = stores.map((store) => ({
      url: `${BASE_URL}/stores/${store.categorySlug || "general"}/${store.slug}`,
      lastModified: store.updatedAt || now,
      changeFrequency: "daily",
      priority: 0.8,
    }));
  } catch {
    // fallback: no store entries
  }

  // Dynamic category routes
  let categoryEntries = [];
  try {
    const res = await fetch(`${BASE_URL}/api/categories`, { cache: "no-store" });
    const data = await res.json();
    const cats = Array.isArray(data?.data) ? data.data : [];
    categoryEntries = cats.map((cat) => ({
      url: `${BASE_URL}/categories/${cat.slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.75,
    }));
  } catch {
    // fallback: no category entries
  }

  return [...staticEntries, ...storeEntries, ...categoryEntries];
}
