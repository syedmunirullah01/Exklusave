import "server-only";

import { readCollection, writeCollection } from "@/server/database/json-store";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { normalizeCountryCode } from "@/lib/countries";

const FILE_NAME = "stores.json";

function normalizeStore(input) {
  const now = new Date().toISOString();
  const slug = input.slug.trim().toLowerCase();
  const category = input.category.trim();
  const categorySlug =
    input.categorySlug?.trim().toLowerCase() ||
    category
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

  return {
    id: input.id || `store_${slug}`,
    name: input.name.trim(),
    slug,
    category,
    categorySlug,
    countryCode: normalizeCountryCode(input.countryCode),
    logoImage: input.logoImage?.trim() || "",
    logoText: input.logoText?.trim() || input.name.trim(),
    affiliateLink: input.affiliateLink?.trim() || "",
    logoClassName:
      input.logoClassName?.trim() ||
      "border border-[var(--border)] bg-[var(--surface-soft)] text-[var(--text)] text-[12px] font-black",
    description: input.description?.trim() || `${input.name.trim()} deals and coupons updated by Exklusave.`,
    contentIntroTitle: input.contentIntroTitle?.trim() || "",
    contentIntroParagraph1: input.contentIntroParagraph1?.trim() || "",
    contentIntroParagraph2: input.contentIntroParagraph2?.trim() || "",
    contentWhyItemsText: input.contentWhyItemsText?.trim() || "",
    contentOutro: input.contentOutro?.trim() || "",
    faq1Question: input.faq1Question?.trim() || "",
    faq1Answer: input.faq1Answer?.trim() || "",
    faq2Question: input.faq2Question?.trim() || "",
    faq2Answer: input.faq2Answer?.trim() || "",
    faq3Question: input.faq3Question?.trim() || "",
    faq3Answer: input.faq3Answer?.trim() || "",
    trustStatus: input.trustStatus?.trim() || "Active",
    isFeatured: Boolean(input.isFeatured),
    heroImage:
      input.heroImage?.trim() ||
      "https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=900&q=80",
    rating: input.rating?.trim() || "4.7 (0 reviews)",
    offersCount: Number(input.offersCount ?? 0),
    createdAt: input.createdAt || now,
    updatedAt: now,
  };
}

function shouldUseSupabaseCatalog() {
  return isSupabaseConfigured();
}

function serializeSupabaseStore(source) {
  if (!source) {
    return null;
  }

  return {
    id: source.id || `store_${source.slug}`,
    name: source.name,
    slug: source.slug,
    category: source.category,
    categorySlug: source.category_slug,
    countryCode: normalizeCountryCode(source.country_code),
    logoImage: source.logo_image || "",
    logoText: source.logo_text || source.name || "",
    affiliateLink: source.affiliate_link || "",
    logoClassName:
      source.logo_class_name ||
      "border border-[var(--border)] bg-[var(--surface-soft)] text-[var(--text)] text-[12px] font-black",
    description: source.description || "",
    contentIntroTitle: source.content_intro_title || "",
    contentIntroParagraph1: source.content_intro_paragraph1 || "",
    contentIntroParagraph2: source.content_intro_paragraph2 || "",
    contentWhyItemsText: source.content_why_items_text || "",
    contentOutro: source.content_outro || "",
    faq1Question: source.faq1_question || "",
    faq1Answer: source.faq1_answer || "",
    faq2Question: source.faq2_question || "",
    faq2Answer: source.faq2_answer || "",
    faq3Question: source.faq3_question || "",
    faq3Answer: source.faq3_answer || "",
    trustStatus: source.trust_status || "Active",
    isFeatured: Boolean(source.is_featured),
    heroImage: source.hero_image || "https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=900&q=80",
    rating: source.rating || "4.7 (0 reviews)",
    offersCount: Number(source.offers_count ?? 0),
    createdAt: source.created_at ? new Date(source.created_at).toISOString() : new Date().toISOString(),
    updatedAt: source.updated_at ? new Date(source.updated_at).toISOString() : new Date().toISOString(),
  };
}

function mapStoreToDb(input) {
  const store = normalizeStore(input);
  return {
    id: store.id,
    name: store.name,
    slug: store.slug,
    category: store.category,
    category_slug: store.categorySlug,
    country_code: store.countryCode,
    logo_image: store.logoImage,
    logo_text: store.logoText,
    affiliate_link: store.affiliateLink,
    logo_class_name: store.logoClassName,
    description: store.description,
    content_intro_title: store.contentIntroTitle,
    content_intro_paragraph1: store.contentIntroParagraph1,
    content_intro_paragraph2: store.contentIntroParagraph2,
    content_why_items_text: store.contentWhyItemsText,
    content_outro: store.contentOutro,
    faq1_question: store.faq1Question,
    faq1_answer: store.faq1Answer,
    faq2_question: store.faq2Question,
    faq2_answer: store.faq2Answer,
    faq3_question: store.faq3Question,
    faq3_answer: store.faq3Answer,
    trust_status: store.trustStatus,
    is_featured: store.isFeatured,
    hero_image: store.heroImage,
    rating: store.rating,
    offers_count: store.offersCount,
    updated_at: new Date().toISOString(),
  };
}

function normalizeStoreBatch(inputs) {
  return inputs.map((input) => normalizeStore(input));
}

export async function getAllStores() {
  if (shouldUseSupabaseCatalog()) {
    const { data, error } = await supabase
      .from("stores")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      return data.map(serializeSupabaseStore);
    }
    console.error("[supabase] Error loading stores, falling back to JSON:", error?.message);
  }

  const stores = await readCollection(FILE_NAME);
  return [...stores]
    .map((store) => ({
      ...store,
      countryCode: normalizeCountryCode(store.countryCode),
    }))
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

export async function getStoreBySlug(slug) {
  const stores = await getAllStores();
  return stores.find((store) => store.slug === slug) ?? null;
}

export async function createStore(payload) {
  if (shouldUseSupabaseCatalog()) {
    const dbStore = mapStoreToDb(payload);

    const { data: existing, error: checkError } = await supabase
      .from("stores")
      .select("id")
      .eq("slug", dbStore.slug)
      .maybeSingle();

    if (existing) {
      throw new Error("A store with this slug already exists.");
    }

    const { data, error } = await supabase
      .from("stores")
      .insert(dbStore)
      .select("*")
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return serializeSupabaseStore(data);
  }

  const stores = await getAllStores();
  const store = normalizeStore(payload);

  if (stores.some((item) => item.slug === store.slug)) {
    throw new Error("A store with this slug already exists.");
  }

  const nextStores = [store, ...stores];
  await writeCollection(FILE_NAME, nextStores);

  return store;
}

export async function createStoresBulk(payloads) {
  if (shouldUseSupabaseCatalog()) {
    const dbStores = payloads.map(mapStoreToDb);
    const { data, error } = await supabase
      .from("stores")
      .insert(dbStores)
      .select("*");

    if (error) {
      throw new Error(error.message);
    }

    return data.map(serializeSupabaseStore);
  }

  const stores = await getAllStores();
  const nextStores = [...normalizeStoreBatch(payloads), ...stores];
  await writeCollection(FILE_NAME, nextStores);
  return nextStores;
}

export async function updateStore(slug, payload) {
  if (shouldUseSupabaseCatalog()) {
    const { data: currentStore, error: fetchError } = await supabase
      .from("stores")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();

    if (fetchError || !currentStore) {
      return null;
    }

    const merged = normalizeStore({
      ...serializeSupabaseStore(currentStore),
      ...payload,
      id: currentStore.id,
      createdAt: currentStore.created_at,
    });

    const dbStore = mapStoreToDb(merged);

    const { data: existing, error: checkError } = await supabase
      .from("stores")
      .select("id")
      .eq("slug", dbStore.slug)
      .neq("id", dbStore.id)
      .maybeSingle();

    if (existing) {
      throw new Error("Another store already uses this slug.");
    }

    const { data, error } = await supabase
      .from("stores")
      .update(dbStore)
      .eq("id", dbStore.id)
      .select("*")
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return serializeSupabaseStore(data);
  }

  const stores = await getAllStores();
  const currentStore = stores.find((item) => item.slug === slug);

  if (!currentStore) {
    return null;
  }

  const merged = normalizeStore({
    ...currentStore,
    ...payload,
    id: currentStore.id,
    createdAt: currentStore.createdAt,
  });

  if (stores.some((item) => item.slug === merged.slug && item.id !== currentStore.id)) {
    throw new Error("Another store already uses this slug.");
  }

  const nextStores = stores.map((item) => (item.id === currentStore.id ? merged : item));
  await writeCollection(FILE_NAME, nextStores);

  return merged;
}

export async function deleteStore(slug) {
  if (shouldUseSupabaseCatalog()) {
    const { data: existing, error: fetchError } = await supabase
      .from("stores")
      .select("id")
      .eq("slug", slug)
      .maybeSingle();

    if (fetchError || !existing) {
      return false;
    }

    const { error } = await supabase
      .from("stores")
      .delete()
      .eq("slug", slug);

    if (error) {
      throw new Error(error.message);
    }

    return true;
  }

  const stores = await getAllStores();
  const nextStores = stores.filter((item) => item.slug !== slug);

  if (nextStores.length === stores.length) {
    return false;
  }

  await writeCollection(FILE_NAME, nextStores);
  return true;
}

export async function syncStoreOfferCount(slug, offersCount) {
  if (shouldUseSupabaseCatalog()) {
    const { data, error } = await supabase
      .from("stores")
      .update({ offers_count: offersCount, updated_at: new Date().toISOString() })
      .eq("slug", slug)
      .select("*")
      .maybeSingle();

    if (error) {
      throw new Error(error.message);
    }

    return serializeSupabaseStore(data);
  }

  const stores = await getAllStores();
  const currentStore = stores.find((item) => item.slug === slug);

  if (!currentStore) {
    return null;
  }

  const nextStore = {
    ...currentStore,
    offersCount,
    updatedAt: new Date().toISOString(),
  };

  const nextStores = stores.map((item) => (item.id === currentStore.id ? nextStore : item));
  await writeCollection(FILE_NAME, nextStores);

  return nextStore;
}

export async function syncStoresForCategoryChange({ previousName, previousSlug, nextName, nextSlug }) {
  if (shouldUseSupabaseCatalog()) {
    const { error } = await supabase
      .from("stores")
      .update({
        category: nextName,
        category_slug: nextSlug,
        updated_at: new Date().toISOString(),
      })
      .or(`category_slug.eq.${previousSlug},category.eq.${previousName}`);

    if (error) {
      throw new Error(error.message);
    }

    return;
  }

  const stores = await getAllStores();
  let didChange = false;

  const nextStores = stores.map((store) => {
    if (store.categorySlug !== previousSlug && store.category !== previousName) {
      return store;
    }

    didChange = true;

    return {
      ...store,
      category: nextName,
      categorySlug: nextSlug,
      updatedAt: new Date().toISOString(),
    };
  });

  if (didChange) {
    await writeCollection(FILE_NAME, nextStores);
  }
}
