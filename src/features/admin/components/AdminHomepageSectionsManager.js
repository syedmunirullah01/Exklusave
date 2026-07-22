"use client";

import { startTransition, useDeferredValue, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

const initialState = {
  marquee: {
    enabled: true,
    text: "🔥 Neeman's Extra 10% Off | Vijay Sales Tech Deals | Nykaa Hot Pink Sale | Ajio Fashion Sale",
    speed: "normal",
  },
  trendingStores: {
    title: "Trending Stores",
    selectedStoreSlugs: [],
    limit: 14,
  },
  featuredCoupons: {
    title: "Featured Coupons",
    selectedOfferIds: [],
    limit: 4,
  },
  topCategories: {
    title: "Top Categories",
    selectedCategorySlugs: [],
    limit: 8,
  },
  featuredProducts: {
    title: "Top Selling Beauty Products",
    selectedProductIds: [],
    limit: 4,
  },
  latestStores: {
    title: "Latest Stores",
    selectedStoreSlugs: [],
    limit: 10,
  },
};

function Spinner() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 animate-spin" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" className="stroke-current opacity-25" strokeWidth="3" />
      <path d="M21 12a9 9 0 0 0-9-9" className="stroke-current" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function SectionCard({ title, badge, description, children }) {
  return (
    <div className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 sm:p-6 shadow-xs transition hover:border-zinc-300 dark:hover:border-zinc-700">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-4 mb-5">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-zinc-900 dark:text-white">{title}</h3>
            {badge && (
              <span className="rounded-md bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 px-2 py-0.5 text-[10px] font-bold text-emerald-800 dark:text-emerald-300 uppercase">
                {badge}
              </span>
            )}
          </div>
          {description && <p className="text-xs text-zinc-700 dark:text-zinc-400 mt-1 font-medium">{description}</p>}
        </div>
      </div>
      {children}
    </div>
  );
}

function StoreSelectionList({ stores, selectedStoreSlugs, onToggle, searchValue, onSearchChange, visibleCount, onLoadMore }) {
  const deferredSearchValue = useDeferredValue(searchValue);

  const filteredStores = useMemo(() => {
    const normalizedQuery = deferredSearchValue.trim().toLowerCase();
    if (!normalizedQuery) return stores;
    return stores.filter((store) => {
      const fields = [store.name, store.slug, store.category, store.description];
      return fields.some((field) => String(field || "").toLowerCase().includes(normalizedQuery));
    });
  }, [deferredSearchValue, stores]);

  const visibleStores = filteredStores.slice(0, visibleCount);
  const hasMore = visibleStores.length < filteredStores.length;

  return (
    <div className="grid gap-3">
      <div className="grid gap-1.5 text-xs text-zinc-500">
        <span className="font-semibold text-zinc-700 dark:text-zinc-300">Filter Stores Catalog</span>
        <Input
          value={searchValue}
          onChange={onSearchChange}
          placeholder="Search store by name, category, or description..."
          className="bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white"
        />
      </div>

      <div className="overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
        <div className="grid grid-cols-[auto_minmax(0,1.4fr)_minmax(0,0.8fr)_90px] gap-3 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-800/80 px-4 py-2.5 text-[11px] font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
          <span>Select</span>
          <span>Store</span>
          <span>Category</span>
          <span>Offers</span>
        </div>

        {visibleStores.length ? (
          visibleStores.map((store) => (
            <label
              key={store.slug}
              className="grid cursor-pointer grid-cols-[auto_minmax(0,1.4fr)_minmax(0,0.8fr)_90px] gap-3 border-b border-zinc-100 dark:border-zinc-800/60 px-4 py-3 transition last:border-b-0 hover:bg-zinc-50/60 dark:hover:bg-zinc-800/40"
            >
              <input
                type="checkbox"
                checked={selectedStoreSlugs.includes(store.slug)}
                onChange={() => onToggle(store.slug)}
                className="mt-0.5 h-4 w-4 rounded border-zinc-300 dark:border-zinc-700 accent-emerald-600 cursor-pointer"
              />
              <div className="min-w-0">
                <p className="truncate font-semibold text-zinc-900 dark:text-white text-xs">{store.name}</p>
                <p className="truncate text-[11px] text-zinc-500 dark:text-zinc-400">{store.description || store.slug}</p>
              </div>
              <p className="truncate text-xs text-zinc-700 dark:text-zinc-300">{store.category || "-"}</p>
              <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">{store.offersCount || 0} offers</p>
            </label>
          ))
        ) : (
          <div className="px-4 py-6 text-xs text-zinc-500 dark:text-zinc-400">No stores matched your search.</div>
        )}
      </div>

      <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
        <span>Showing {visibleStores.length} of {filteredStores.length} stores</span>
        {hasMore && (
          <Button type="button" variant="outline" size="sm" onClick={onLoadMore} className="dark:bg-zinc-800 dark:border-zinc-700 dark:text-white">
            Load More
          </Button>
        )}
      </div>
    </div>
  );
}

function OfferSelectionList({ offers, selectedOfferIds, onToggle, searchValue, onSearchChange, visibleCount, onLoadMore }) {
  const deferredSearchValue = useDeferredValue(searchValue);

  const filteredOffers = useMemo(() => {
    const normalizedQuery = deferredSearchValue.trim().toLowerCase();
    if (!normalizedQuery) return offers;
    return offers.filter((offer) => {
      const fields = [offer.title, offer.storeName, offer.type, offer.code, offer.description];
      return fields.some((field) => String(field || "").toLowerCase().includes(normalizedQuery));
    });
  }, [deferredSearchValue, offers]);

  const visibleOffers = filteredOffers.slice(0, visibleCount);
  const hasMore = visibleOffers.length < filteredOffers.length;

  return (
    <div className="grid gap-3">
      <div className="grid gap-1.5 text-xs text-zinc-500">
        <span className="font-semibold text-zinc-700 dark:text-zinc-300">Filter Coupons & Deals</span>
        <Input
          value={searchValue}
          onChange={onSearchChange}
          placeholder="Search coupon by title, store, code, or type..."
          className="bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white"
        />
      </div>

      <div className="overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
        <div className="grid grid-cols-[auto_minmax(0,1.4fr)_minmax(0,0.9fr)_100px] gap-3 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-800/80 px-4 py-2.5 text-[11px] font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
          <span>Select</span>
          <span>Coupon Title</span>
          <span>Store</span>
          <span>Type</span>
        </div>

        {visibleOffers.length ? (
          visibleOffers.map((offer) => (
            <label
              key={offer.id}
              className="grid cursor-pointer grid-cols-[auto_minmax(0,1.4fr)_minmax(0,0.9fr)_100px] gap-3 border-b border-zinc-100 dark:border-zinc-800/60 px-4 py-3 transition last:border-b-0 hover:bg-zinc-50/60 dark:hover:bg-zinc-800/40"
            >
              <input
                type="checkbox"
                checked={selectedOfferIds.includes(offer.id)}
                onChange={() => onToggle(offer.id)}
                className="mt-0.5 h-4 w-4 rounded border-zinc-300 dark:border-zinc-700 accent-emerald-600 cursor-pointer"
              />
              <div className="min-w-0">
                <p className="truncate font-semibold text-zinc-900 dark:text-white text-xs">{offer.title}</p>
                <p className="truncate text-[11px] font-mono text-emerald-700 dark:text-emerald-400">{offer.code || "DEAL-ACTIVATED"}</p>
              </div>
              <p className="truncate text-xs text-zinc-700 dark:text-zinc-300">{offer.storeName || "-"}</p>
              <span className={`inline-block rounded px-2 py-0.5 text-[10px] font-semibold uppercase text-center ${offer.type === 'Coupon' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300' : 'bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300'}`}>
                {offer.type || "Deal"}
              </span>
            </label>
          ))
        ) : (
          <div className="px-4 py-6 text-xs text-zinc-500 dark:text-zinc-400">No coupons matched your search.</div>
        )}
      </div>

      <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
        <span>Showing {visibleOffers.length} of {filteredOffers.length} offers</span>
        {hasMore && (
          <Button type="button" variant="outline" size="sm" onClick={onLoadMore} className="dark:bg-zinc-800 dark:border-zinc-700 dark:text-white">
            Load More
          </Button>
        )}
      </div>
    </div>
  );
}

function ProductSelectionList({ products, selectedProductIds, onToggle, searchValue, onSearchChange, visibleCount, onLoadMore }) {
  const deferredSearchValue = useDeferredValue(searchValue);

  const filteredProducts = useMemo(() => {
    const normalizedQuery = deferredSearchValue.trim().toLowerCase();
    if (!normalizedQuery) return products;
    return products.filter((product) => {
      const fields = [product.title, product.storeName, product.status, product.description];
      return fields.some((field) => String(field || "").toLowerCase().includes(normalizedQuery));
    });
  }, [deferredSearchValue, products]);

  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleProducts.length < filteredProducts.length;

  return (
    <div className="grid gap-3">
      <div className="grid gap-1.5 text-xs text-zinc-500">
        <span className="font-semibold text-zinc-700 dark:text-zinc-300">Filter Featured Products</span>
        <Input
          value={searchValue}
          onChange={onSearchChange}
          placeholder="Search product by title, store, or price..."
          className="bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white"
        />
      </div>

      <div className="overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
        <div className="grid grid-cols-[auto_minmax(0,1.5fr)_minmax(0,0.8fr)_100px] gap-3 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-800/80 px-4 py-2.5 text-[11px] font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
          <span>Select</span>
          <span>Product Title</span>
          <span>Store</span>
          <span>Price</span>
        </div>

        {visibleProducts.length ? (
          visibleProducts.map((product) => (
            <label
              key={product.id}
              className="grid cursor-pointer grid-cols-[auto_minmax(0,1.5fr)_minmax(0,0.8fr)_100px] gap-3 border-b border-zinc-100 dark:border-zinc-800/60 px-4 py-3 transition last:border-b-0 hover:bg-zinc-50/60 dark:hover:bg-zinc-800/40"
            >
              <input
                type="checkbox"
                checked={selectedProductIds.includes(product.id)}
                onChange={() => onToggle(product.id)}
                className="mt-0.5 h-4 w-4 rounded border-zinc-300 dark:border-zinc-700 accent-emerald-600 cursor-pointer"
              />
              <div className="min-w-0">
                <p className="truncate font-semibold text-zinc-900 dark:text-white text-xs">{product.title}</p>
                <p className="truncate text-[11px] text-zinc-500 dark:text-zinc-400">{product.description || "Beauty Item"}</p>
              </div>
              <p className="truncate text-xs text-zinc-700 dark:text-zinc-300">{product.storeName || "-"}</p>
              <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">${product.price ?? 0}</p>
            </label>
          ))
        ) : (
          <div className="px-4 py-6 text-xs text-zinc-500 dark:text-zinc-400">No products matched your search.</div>
        )}
      </div>

      <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
        <span>Showing {visibleProducts.length} of {filteredProducts.length} products</span>
        {hasMore && (
          <Button type="button" variant="outline" size="sm" onClick={onLoadMore} className="dark:bg-zinc-800 dark:border-zinc-700 dark:text-white">
            Load More
          </Button>
        )}
      </div>
    </div>
  );
}

export default function AdminHomepageSectionsManager() {
  const [sections, setSections] = useState(initialState);
  const [stores, setStores] = useState([]);
  const [offers, setOffers] = useState([]);
  const [products, setProducts] = useState([]);

  const [trendingStoreSearch, setTrendingStoreSearch] = useState("");
  const [featuredOfferSearch, setFeaturedOfferSearch] = useState("");
  const [featuredProductSearch, setFeaturedProductSearch] = useState("");
  const [latestStoreSearch, setLatestStoreSearch] = useState("");

  const [trendingVisibleCount, setTrendingVisibleCount] = useState(10);
  const [featuredVisibleCount, setFeaturedVisibleCount] = useState(10);
  const [featuredProductVisibleCount, setFeaturedProductVisibleCount] = useState(10);
  const [latestVisibleCount, setLatestVisibleCount] = useState(10);

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    let active = true;

    async function loadData() {
      try {
        const [sectionsResponse, storesResponse, offersResponse, productsResponse] = await Promise.all([
          fetch("/api/homepage/sections", { cache: "no-store" }),
          fetch("/api/stores", { cache: "no-store" }),
          fetch("/api/offers", { cache: "no-store" }),
          fetch("/api/products", { cache: "no-store" }),
        ]);

        const [sectionsPayload, storesPayload, offersPayload, productsPayload] = await Promise.all([
          sectionsResponse.json(),
          storesResponse.json(),
          offersResponse.json(),
          productsResponse.json(),
        ]);

        if (active) {
          setSections({ ...initialState, ...(sectionsPayload.data || {}) });
          setStores(storesPayload.data || []);
          setOffers(offersPayload.data || []);
          setProducts(productsPayload.data || []);
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    }

    loadData();

    return () => {
      active = false;
    };
  }, []);

  function updateSectionField(sectionKey, field, value) {
    setSections((current) => ({
      ...current,
      [sectionKey]: {
        ...current[sectionKey],
        [field]: value,
      },
    }));
  }

  function toggleStoreSelection(sectionKey, storeSlug) {
    setSections((current) => {
      const selectedStoreSlugs = current[sectionKey]?.selectedStoreSlugs || [];
      const exists = selectedStoreSlugs.includes(storeSlug);

      return {
        ...current,
        [sectionKey]: {
          ...current[sectionKey],
          selectedStoreSlugs: exists
            ? selectedStoreSlugs.filter((slug) => slug !== storeSlug)
            : [...selectedStoreSlugs, storeSlug],
        },
      };
    });
  }

  function toggleOfferSelection(offerId) {
    setSections((current) => {
      const selectedOfferIds = current.featuredCoupons?.selectedOfferIds || [];
      const exists = selectedOfferIds.includes(offerId);

      return {
        ...current,
        featuredCoupons: {
          ...current.featuredCoupons,
          selectedOfferIds: exists
            ? selectedOfferIds.filter((id) => id !== offerId)
            : [...selectedOfferIds, offerId],
        },
      };
    });
  }

  function toggleProductSelection(productId) {
    setSections((current) => {
      const selectedProductIds = current.featuredProducts?.selectedProductIds || [];
      const exists = selectedProductIds.includes(productId);

      return {
        ...current,
        featuredProducts: {
          ...current.featuredProducts,
          selectedProductIds: exists
            ? selectedProductIds.filter((id) => id !== productId)
            : [...selectedProductIds, productId],
        },
      };
    });
  }

  async function saveSections() {
    try {
      setIsSaving(true);
      const response = await fetch("/api/homepage/sections", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sections }),
      });
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error || "Unable to save homepage content.");
      }

      setSections({ ...initialState, ...payload.data });
      toast.success("All Homepage sections and content updated successfully!");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSaving(false);
    }
  }

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-8 text-center text-xs font-semibold text-zinc-500 dark:text-zinc-400">
        Loading homepage section manager...
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-[1500px] mx-auto">
      
      {/* Top Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-xs">
        <div>
          <h1 className="text-xl font-bold text-zinc-900 dark:text-white tracking-tight">Homepage Content & Section Control</h1>
          <p className="text-xs text-zinc-700 dark:text-zinc-400 mt-0.5 font-medium">
            Configure every section, banner marquee, trending stores, featured coupons, and beauty products rendered on the public homepage.
          </p>
        </div>

        <Button
          type="button"
          onClick={saveSections}
          disabled={isSaving}
          className="rounded-xl bg-emerald-600 hover:bg-emerald-700 px-5 py-2.5 text-xs font-semibold text-white shadow-xs transition cursor-pointer"
        >
          {isSaving ? "Saving All Sections..." : "Save All Homepage Sections"}
        </Button>
      </div>

      <div className="grid gap-6">

        {/* 1. TOP ANNOUNCEMENT MARQUEE SECTION */}
        <SectionCard
          title="Top Announcement Ticker Marquee"
          badge="TOP HEADER"
          description="Edit continuous sliding ticker announcements, scroll speed, and exact gap spacing shown at the top of the site."
        >
          <div className="grid gap-4 md:grid-cols-3">
            <label className="flex items-center gap-2 text-xs font-semibold text-zinc-800 dark:text-zinc-200 md:col-span-3 cursor-pointer">
              <input
                type="checkbox"
                checked={sections.marquee?.enabled !== false}
                onChange={(e) => updateSectionField("marquee", "enabled", e.target.checked)}
                className="h-4 w-4 rounded border-zinc-300 dark:border-zinc-700 accent-emerald-600 cursor-pointer"
              />
              Enable Top Announcement Ticker Bar
            </label>

            <label className="grid gap-1.5 text-xs text-zinc-500 dark:text-zinc-400 md:col-span-3">
              <span className="font-semibold text-zinc-800 dark:text-zinc-200">Announcement Offers (Separate each offer with |)</span>
              <textarea
                rows={3}
                value={sections.marquee?.text || ""}
                onChange={(e) => updateSectionField("marquee", "text", e.target.value)}
                placeholder="🔥 Addidas: Free Shipping on all orders | ⚡ Vijay Sales: Up to 50% Off | ✨ Nykaa: Hot Pink Sale Live Now!"
                className="w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 p-3 text-xs text-zinc-900 dark:text-white outline-none focus:border-emerald-500"
              />
              <span className="text-[11px] text-zinc-400">Tip: Each item separated by '|' will scroll continuously in the top bar.</span>
            </label>

            <label className="grid gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
              <span className="font-semibold text-zinc-800 dark:text-zinc-200">Scroll Speed</span>
              <select
                value={sections.marquee?.speed || "normal"}
                onChange={(e) => updateSectionField("marquee", "speed", e.target.value)}
                className="rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 p-2.5 text-xs text-zinc-900 dark:text-white outline-none"
              >
                <option value="slow">Slow (55s)</option>
                <option value="normal">Normal (35s)</option>
                <option value="fast">Fast (20s)</option>
              </select>
            </label>

            <label className="grid gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
              <span className="font-semibold text-zinc-800 dark:text-zinc-200">Exact Gap Between Items (Pixels)</span>
              <Input
                type="number"
                min="12"
                max="200"
                value={sections.marquee?.gap || 48}
                onChange={(e) => updateSectionField("marquee", "gap", Number(e.target.value) || 48)}
                placeholder="48"
                className="bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white"
              />
            </label>
          </div>
        </SectionCard>

        {/* 2. TRENDING STORES SECTION */}
        <SectionCard
          title="Trending Stores Section"
          badge="LIMIT: 14 STORES"
          description="Select exactly which catalog stores should appear in the Trending Stores grid."
        >
          <div className="mb-4 grid gap-4 md:grid-cols-2">
            <label className="grid gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
              <span className="font-semibold text-zinc-800 dark:text-zinc-200">Section Title</span>
              <Input
                value={sections.trendingStores?.title || "Trending Stores"}
                onChange={(e) => updateSectionField("trendingStores", "title", e.target.value)}
                className="bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white"
              />
            </label>
            <label className="grid gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
              <span className="font-semibold text-zinc-800 dark:text-zinc-200">Grid Limit (Max: 14)</span>
              <Input
                type="number"
                min="1"
                max="20"
                value={sections.trendingStores?.limit || 14}
                onChange={(e) => updateSectionField("trendingStores", "limit", Number(e.target.value) || 14)}
                className="bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white"
              />
            </label>
          </div>

          <StoreSelectionList
            stores={stores}
            selectedStoreSlugs={sections.trendingStores?.selectedStoreSlugs || []}
            onToggle={(slug) => toggleStoreSelection("trendingStores", slug)}
            searchValue={trendingStoreSearch}
            onSearchChange={(e) => {
              const val = e.target.value;
              startTransition(() => setTrendingStoreSearch(val));
            }}
            visibleCount={trendingVisibleCount}
            onLoadMore={() => setTrendingVisibleCount((prev) => prev + 10)}
          />
        </SectionCard>

        {/* 3. FEATURED COUPONS SECTION */}
        <SectionCard
          title="Featured Coupons Section"
          badge="PROMO CODES"
          description="Select high-conversion promo coupons to feature on the homepage."
        >
          <div className="mb-4 grid gap-4 md:grid-cols-2">
            <label className="grid gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
              <span className="font-semibold text-zinc-800 dark:text-zinc-200">Section Title</span>
              <Input
                value={sections.featuredCoupons?.title || "Featured Coupons"}
                onChange={(e) => updateSectionField("featuredCoupons", "title", e.target.value)}
                className="bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white"
              />
            </label>
            <label className="grid gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
              <span className="font-semibold text-zinc-800 dark:text-zinc-200">Coupons Limit</span>
              <Input
                type="number"
                min="1"
                max="20"
                value={sections.featuredCoupons?.limit || 4}
                onChange={(e) => updateSectionField("featuredCoupons", "limit", Number(e.target.value) || 4)}
                className="bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white"
              />
            </label>
          </div>

          <OfferSelectionList
            offers={offers}
            selectedOfferIds={sections.featuredCoupons?.selectedOfferIds || []}
            onToggle={toggleOfferSelection}
            searchValue={featuredOfferSearch}
            onSearchChange={(e) => {
              const val = e.target.value;
              startTransition(() => setFeaturedOfferSearch(val));
            }}
            visibleCount={featuredVisibleCount}
            onLoadMore={() => setFeaturedVisibleCount((prev) => prev + 10)}
          />
        </SectionCard>

        {/* 4. FEATURED BEAUTY PRODUCTS SECTION */}
        <SectionCard
          title="Top Selling Beauty Products"
          badge="BUY NOW ITEMS"
          description="Select beauty and featured store items to display on the homepage with Buy Now CTAs."
        >
          <div className="mb-4 grid gap-4 md:grid-cols-2">
            <label className="grid gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
              <span className="font-semibold text-zinc-800 dark:text-zinc-200">Section Title</span>
              <Input
                value={sections.featuredProducts?.title || "Top Selling Beauty Products"}
                onChange={(e) => updateSectionField("featuredProducts", "title", e.target.value)}
                className="bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white"
              />
            </label>
            <label className="grid gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
              <span className="font-semibold text-zinc-800 dark:text-zinc-200">Products Limit</span>
              <Input
                type="number"
                min="1"
                max="20"
                value={sections.featuredProducts?.limit || 4}
                onChange={(e) => updateSectionField("featuredProducts", "limit", Number(e.target.value) || 4)}
                className="bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white"
              />
            </label>
          </div>

          <ProductSelectionList
            products={products}
            selectedProductIds={sections.featuredProducts?.selectedProductIds || []}
            onToggle={toggleProductSelection}
            searchValue={featuredProductSearch}
            onSearchChange={(e) => {
              const val = e.target.value;
              startTransition(() => setFeaturedProductSearch(val));
            }}
            visibleCount={featuredProductVisibleCount}
            onLoadMore={() => setFeaturedProductVisibleCount((prev) => prev + 10)}
          />
        </SectionCard>

      </div>
    </div>
  );
}
