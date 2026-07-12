import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env variables from .env.local
const envPath = path.resolve(__dirname, "../.env.local");
if (fs.existsSync(envPath)) {
  const envConfig = dotenv.parse(fs.readFileSync(envPath));
  for (const k in envConfig) {
    process.env[k] = envConfig[k];
  }
}

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error("Error: Supabase environment variables are missing from .env.local.");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

function mapStoreToDb(store) {
  return {
    id: store.id || `store_${store.slug}`,
    name: store.name,
    slug: store.slug,
    category: store.category,
    category_slug: store.categorySlug,
    country_code: store.countryCode || "US",
    logo_image: store.logoImage || "",
    logo_text: store.logoText || store.name || "",
    affiliate_link: store.affiliateLink || "",
    logo_class_name: store.logoClassName || "",
    description: store.description || "",
    content_intro_title: store.contentIntroTitle || "",
    content_intro_paragraph1: store.contentIntroParagraph1 || "",
    content_intro_paragraph2: store.contentIntroParagraph2 || "",
    content_why_items_text: store.contentWhyItemsText || "",
    content_outro: store.contentOutro || "",
    faq1_question: store.faq1Question || "",
    faq1_answer: store.faq1Answer || "",
    faq2_question: store.faq2Question || "",
    faq2_answer: store.faq2Answer || "",
    faq3_question: store.faq3Question || "",
    faq3_answer: store.faq3Answer || "",
    trust_status: store.trustStatus || "Active",
    is_featured: Boolean(store.isFeatured),
    hero_image: store.heroImage || "",
    rating: store.rating || "",
    offers_count: Number(store.offersCount ?? 0),
    created_at: store.createdAt || new Date().toISOString(),
    updated_at: store.updatedAt || new Date().toISOString(),
  };
}

async function runMigration() {
  try {
    const storesPath = path.resolve(__dirname, "../data/database/stores.json");
    if (!fs.existsSync(storesPath)) {
      console.log("No stores.json database file found to migrate.");
      return;
    }

    const storesData = JSON.parse(fs.readFileSync(storesPath, "utf8"));
    if (!Array.isArray(storesData) || storesData.length === 0) {
      console.log("stores.json database file is empty.");
      return;
    }

    console.log(`Found ${storesData.length} stores to migrate.`);

    const dbStores = storesData.map(mapStoreToDb);

    // Upsert stores into Supabase
    const { data, error } = await supabase
      .from("stores")
      .upsert(dbStores, { onConflict: "id" })
      .select("id, name");

    if (error) {
      throw new Error(`Migration failed: ${error.message}`);
    }

    console.log("Migration completed successfully! Upserted stores:");
    data.forEach((store) => {
      console.log(`- ${store.name} (${store.id})`);
    });
  } catch (error) {
    console.error("Migration error:", error.message || error);
  }
}

runMigration();
