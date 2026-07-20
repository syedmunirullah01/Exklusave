import "server-only";

import { readCollection, writeCollection } from "@/server/database/json-store";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

const FILE_NAME = "offers.json";

function normalizeOffer(input) {
  const now = new Date().toISOString();
  const storeSlug = input.storeSlug.trim().toLowerCase();

  return {
    id: input.id || `offer_${storeSlug}_${Math.random().toString(36).slice(2, 10)}`,
    title: input.title.trim(),
    description: input.description?.trim() || "Fresh offer imported into Persuekey.",
    type: input.type?.trim() || "Coupon",
    storeSlug,
    storeName: input.storeName.trim(),
    source: input.source?.trim() || "Manual",
    expiryDate: input.expiryDate,
    status: input.status?.trim() || "Active",
    code: input.code?.trim() || "",
    affiliateLink: input.affiliateLink?.trim() || "",
    ctaLabel: input.ctaLabel?.trim() || (input.type === "Deal" ? "Get Deal" : "Get Code"),
    createdAt: input.createdAt || now,
    updatedAt: now,
  };
}

function shouldUseSupabaseCatalog() {
  return isSupabaseConfigured();
}

function serializeSupabaseOffer(source) {
  if (!source) {
    return null;
  }

  return {
    id: source.id || `offer_${source.store_slug}_${Math.random().toString(36).slice(2, 10)}`,
    title: source.title,
    description: source.description || "Fresh offer imported into Persuekey.",
    type: source.type || "Coupon",
    storeSlug: source.store_slug,
    storeName: source.store_name,
    source: source.source || "Manual",
    expiryDate: source.expiry_date,
    status: source.status || "Active",
    code: source.code || "",
    affiliateLink: source.affiliate_link || "",
    ctaLabel: source.cta_label || (source.type === "Deal" ? "Get Deal" : "Get Code"),
    createdAt: source.created_at ? new Date(source.created_at).toISOString() : new Date().toISOString(),
    updatedAt: source.updated_at ? new Date(source.updated_at).toISOString() : new Date().toISOString(),
  };
}

function mapOfferToDb(input) {
  const offer = normalizeOffer(input);
  return {
    id: offer.id,
    title: offer.title,
    description: offer.description,
    type: offer.type,
    store_slug: offer.storeSlug,
    store_name: offer.storeName,
    source: offer.source,
    expiry_date: offer.expiryDate,
    status: offer.status,
    code: offer.code,
    affiliate_link: offer.affiliateLink,
    cta_label: offer.ctaLabel,
    updated_at: new Date().toISOString(),
  };
}

function normalizeOfferBatch(inputs) {
  return inputs.map((input) => normalizeOffer(input));
}

export async function getAllOffers() {
  if (shouldUseSupabaseCatalog()) {
    const { data, error } = await supabase
      .from("offers")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      return data.map(serializeSupabaseOffer);
    }
    console.error("[supabase] Error loading offers, falling back to JSON:", error?.message);
  }

  const offers = await readCollection(FILE_NAME);
  return [...offers].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

export async function getOfferById(id) {
  if (shouldUseSupabaseCatalog()) {
    const { data, error } = await supabase
      .from("offers")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (!error && data) {
      return serializeSupabaseOffer(data);
    }
  }

  const offers = await getAllOffers();
  return offers.find((offer) => offer.id === id) ?? null;
}

export async function getOffersByStoreSlug(storeSlug) {
  if (shouldUseSupabaseCatalog()) {
    const { data, error } = await supabase
      .from("offers")
      .select("*")
      .eq("store_slug", storeSlug)
      .order("created_at", { ascending: false });

    if (!error && data) {
      return data.map(serializeSupabaseOffer);
    }
  }

  const offers = await getAllOffers();
  return offers.filter((offer) => offer.storeSlug === storeSlug);
}

export async function createOffer(payload) {
  if (shouldUseSupabaseCatalog()) {
    const dbOffer = mapOfferToDb(payload);
    const { data, error } = await supabase
      .from("offers")
      .insert(dbOffer)
      .select("*")
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return serializeSupabaseOffer(data);
  }

  const offers = await getAllOffers();
  const offer = normalizeOffer(payload);
  const nextOffers = [offer, ...offers];
  await writeCollection(FILE_NAME, nextOffers);
  return offer;
}

export async function createOffersBulk(payloads) {
  if (shouldUseSupabaseCatalog()) {
    const dbOffers = payloads.map(mapOfferToDb);
    const { data, error } = await supabase
      .from("offers")
      .insert(dbOffers)
      .select("*");

    if (error) {
      throw new Error(error.message);
    }

    return data.map(serializeSupabaseOffer);
  }

  const offers = await getAllOffers();
  const nextOffers = [...normalizeOfferBatch(payloads), ...offers];
  await writeCollection(FILE_NAME, nextOffers);
  return nextOffers;
}

export async function updateOffer(id, payload) {
  if (shouldUseSupabaseCatalog()) {
    const { data: currentOffer, error: fetchError } = await supabase
      .from("offers")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (fetchError || !currentOffer) {
      return null;
    }

    const merged = normalizeOffer({
      ...serializeSupabaseOffer(currentOffer),
      ...payload,
      id: currentOffer.id,
      createdAt: currentOffer.created_at,
    });

    const dbOffer = mapOfferToDb(merged);
    const { data, error } = await supabase
      .from("offers")
      .update(dbOffer)
      .eq("id", id)
      .select("*")
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return serializeSupabaseOffer(data);
  }

  const offers = await getAllOffers();
  const currentOffer = offers.find((offer) => offer.id === id);

  if (!currentOffer) {
    return null;
  }

  const merged = normalizeOffer({
    ...currentOffer,
    ...payload,
    id: currentOffer.id,
    createdAt: currentOffer.createdAt,
  });

  const nextOffers = offers.map((offer) => (offer.id === id ? merged : offer));
  await writeCollection(FILE_NAME, nextOffers);
  return merged;
}

export async function deleteOffer(id) {
  if (shouldUseSupabaseCatalog()) {
    const { error } = await supabase
      .from("offers")
      .delete()
      .eq("id", id);

    if (error) {
      throw new Error(error.message);
    }

    return true;
  }

  const offers = await getAllOffers();
  const nextOffers = offers.filter((offer) => offer.id !== id);

  if (nextOffers.length === offers.length) {
    return false;
  }

  await writeCollection(FILE_NAME, nextOffers);
  return true;
}

export async function deleteOffersByStoreSlug(storeSlug) {
  if (shouldUseSupabaseCatalog()) {
    const { error } = await supabase
      .from("offers")
      .delete()
      .eq("store_slug", storeSlug);

    if (error) {
      throw new Error(error.message);
    }

    return true;
  }

  const offers = await getAllOffers();
  const nextOffers = offers.filter((offer) => offer.storeSlug !== storeSlug);
  await writeCollection(FILE_NAME, nextOffers);
  return true;
}
