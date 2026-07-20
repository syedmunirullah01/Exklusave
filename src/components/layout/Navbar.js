"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import {
  buildCountryPath,
  COUNTRY_COOKIE_KEY,
  DEFAULT_COUNTRY_CODE,
  getCountryCodeFromPathname,
  getCountryByCode,
  normalizeCountryCode,
  removeCountryPrefix,
  SUPPORTED_COUNTRIES,
  sanitizeCountryList,
} from "@/lib/countries";

const PRIMARY_NAV = [
  { label: "Home", href: "/" },
  { label: "Stores", href: "/stores", badge: "HOT" },
  { label: "Categories", href: "/categories" },
  { label: "Blogs", href: "/blogs" },
  { label: "Contact", href: "/contact" },
];

const POPULAR_STORE_NAMES = ["Nike", "Old Navy", "Fashion Nova", "SHEIN", "SKIMS", "DSW", "Carter's"];

function SearchIcon({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

function ChevronDownIcon({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function ChevronRightIcon({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="m9 6 6 6-6 6" />
    </svg>
  );
}

function CloseIcon({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M6 6 18 18" />
      <path d="M18 6 6 18" />
    </svg>
  );
}

function MenuIcon({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </svg>
  );
}

function BrandMark() {
  return (
    <Link href="/" className="inline-flex items-center rounded-[18px] bg-[var(--accent)] px-4 py-2.5 shadow-[0_18px_40px_rgba(163,230,53,0.16)]">
      <span className="text-[1.8rem] font-black italic leading-none tracking-[-0.06em] text-black sm:text-[2rem]">Persuekey</span>
    </Link>
  );
}

function formatOfferCount(value) {
  if (!value) {
    return "No deals yet";
  }

  if (value === 1) {
    return "1 live deal";
  }

  return `${value} live deals`;
}

function getStoreHref(store, countryCode) {
  return buildCountryPath(`/stores/${store.categorySlug}/${store.slug}`, countryCode);
}

function formatCategoryLabel(name) {
  return String(name || "").trim() || "Category";
}

function formatOfferValue(offer) {
  const source = [offer.title, offer.description, offer.code].filter(Boolean).join(" ");
  const percentMatch = source.match(/(\d{1,3})\s*%/);
  if (percentMatch) {
    return `${percentMatch[1]}% off`;
  }

  const amountMatch = source.match(/\$ ?(\d[\d,]*)/);
  if (amountMatch) {
    return `$${amountMatch[1]} off`;
  }

  return offer.type === "Deal" ? "Deal" : offer.code || "Coupon";
}

function formatOfferAge(dateString) {
  if (!dateString) {
    return "Recently added";
  }

  const now = Date.now();
  const createdAt = new Date(dateString).getTime();
  const diffDays = Math.max(0, Math.floor((now - createdAt) / (1000 * 60 * 60 * 24)));

  if (diffDays === 0) {
    return "Today";
  }

  if (diffDays === 1) {
    return "1 day ago";
  }

  if (diffDays < 30) {
    return `${diffDays} days ago`;
  }

  const diffMonths = Math.floor(diffDays / 30);
  return `${diffMonths} mo ago`;
}

function formatOfferUsage(totalOffers) {
  if (!totalOffers) {
    return "Used recently";
  }

  if (totalOffers >= 1000) {
    return `Used ${(totalOffers / 1000).toFixed(1)}K times`;
  }

  return `Used ${Math.max(1, totalOffers * 11)} times`;
}

function isExactStoreMatch(store, query) {
  return [store.name, store.slug].filter(Boolean).some((value) => value.trim().toLowerCase() === query);
}

export default function Navbar() {
  const pathname = usePathname();
  const pathWithoutCountry = removeCountryPrefix(pathname);
  const router = useRouter();
  const menuRef = useRef(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [categories, setCategories] = useState([]);
  const [stores, setStores] = useState([]);
  const [offers, setOffers] = useState([]);
  const [events, setEvents] = useState([]);
  const [countries, setCountries] = useState(SUPPORTED_COUNTRIES);
  const [activeCategorySlug, setActiveCategorySlug] = useState("");
  const [activeStoreSlug, setActiveStoreSlug] = useState("");
  const [allCategoriesMode, setAllCategoriesMode] = useState(false);
  const [mobileDealsOpen, setMobileDealsOpen] = useState(false);
  const [mobileActiveCategorySlug, setMobileActiveCategorySlug] = useState("");
  const [desktopSearchOpen, setDesktopSearchOpen] = useState(false);
  const [selectedCountryCode, setSelectedCountryCode] = useState(() => {
    const countryFromPath = getCountryCodeFromPathname(pathname);
    if (countryFromPath) {
      return countryFromPath;
    }

    if (typeof document === "undefined") {
      return DEFAULT_COUNTRY_CODE;
    }

    const matchedCookie = document.cookie
      .split("; ")
      .find((entry) => entry.startsWith(`${COUNTRY_COOKIE_KEY}=`))
      ?.split("=")[1];

    return normalizeCountryCode(decodeURIComponent(matchedCookie || DEFAULT_COUNTRY_CODE));
  });
  const selectedCountry = getCountryByCode(selectedCountryCode, countries);

  useEffect(() => {
    let cancelled = false;

    async function loadNavigationData() {
      try {
        const [categoriesResponse, storesResponse, offersResponse, countriesResponse, eventsResponse] = await Promise.all([
          fetch("/api/categories", { cache: "no-store" }),
          fetch(`/api/stores?country=${selectedCountryCode}`, { cache: "no-store" }),
          fetch(`/api/offers?country=${selectedCountryCode}`, { cache: "no-store" }),
          fetch("/api/public/countries", { cache: "no-store" }),
          fetch("/api/public/events", { cache: "no-store" }),
        ]);

        const [categoriesPayload, storesPayload, offersPayload, countriesPayload, eventsPayload] = await Promise.all([
          categoriesResponse.json(),
          storesResponse.json(),
          offersResponse.json(),
          countriesResponse.json(),
          eventsResponse.json(),
        ]);

        if (cancelled) {
          return;
        }

        const nextCategories = Array.isArray(categoriesPayload.data) ? categoriesPayload.data : [];
        const nextStores = Array.isArray(storesPayload.data) ? storesPayload.data : [];
        const nextOffers = Array.isArray(offersPayload.data) ? offersPayload.data : [];
        const nextCountries = sanitizeCountryList(countriesPayload.data || SUPPORTED_COUNTRIES);

        setCategories(nextCategories);
        setStores(nextStores);
        setOffers(nextOffers);
        setCountries(nextCountries);
        setEvents(Array.isArray(eventsPayload.data) ? eventsPayload.data : []);

        setActiveCategorySlug((current) => {
          if (current && nextCategories.some((item) => item.slug === current)) {
            return current;
          }

          const categoryFromPath = nextCategories.find((item) => pathname.includes(`/${item.slug}`));
          return categoryFromPath?.slug || nextCategories[0]?.slug || "";
        });
      } catch {
        if (!cancelled) {
          setCategories([]);
          setStores([]);
          setOffers([]);
          setCountries(SUPPORTED_COUNTRIES);
          setEvents([]);
        }
      }
    }

    loadNavigationData();

    return () => {
      cancelled = true;
    };
  }, [pathname, selectedCountryCode]);

  function handleCountryChange(nextCountryCode) {
    const normalizedCountryCode = normalizeCountryCode(nextCountryCode);
    setSelectedCountryCode(normalizedCountryCode);
    document.cookie = `${COUNTRY_COOKIE_KEY}=${encodeURIComponent(normalizedCountryCode)}; path=/; max-age=31536000; samesite=lax`;
    const nextPath = buildCountryPath(pathname, normalizedCountryCode);
    const search = typeof window !== "undefined" ? window.location.search : "";
    router.replace(`${nextPath}${search}`);
    router.refresh();
  }

  useEffect(() => {
    function handlePointerDown(event) {
      if (!menuRef.current?.contains(event.target)) {
        setMegaOpen(false);
      }
    }

    function handleEscape(event) {
      if (event.key === "Escape") {
        setMegaOpen(false);
        setDetailOpen(false);
        setMobileOpen(false);
        setMobileDealsOpen(false);
        setMobileActiveCategorySlug("");
        setDesktopSearchOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const activeCategory = useMemo(
    () => categories.find((category) => category.slug === activeCategorySlug) || categories[0] || null,
    [activeCategorySlug, categories]
  );

  const storesByCategory = useMemo(() => {
    return stores.reduce((accumulator, store) => {
      const key = store.categorySlug || "uncategorized";
      if (!accumulator[key]) {
        accumulator[key] = [];
      }
      accumulator[key].push(store);
      return accumulator;
    }, {});
  }, [stores]);

  const storeMap = useMemo(() => new Map(stores.map((store) => [store.slug, store])), [stores]);

  const offersByStoreSlug = useMemo(() => {
    return offers.reduce((accumulator, offer) => {
      if (!accumulator[offer.storeSlug]) {
        accumulator[offer.storeSlug] = [];
      }
      accumulator[offer.storeSlug].push(offer);
      return accumulator;
    }, {});
  }, [offers]);

  const activeStores = useMemo(() => {
    if (!activeCategory) {
      return [];
    }

    return [...(storesByCategory[activeCategory.slug] || [])]
      .sort(
      (left, right) => (right.offersCount || 0) - (left.offersCount || 0) || left.name.localeCompare(right.name)
      )
      .slice(0, 7);
  }, [activeCategory, storesByCategory]);

  const allStoresPreview = useMemo(() => {
    return [...stores]
      .sort((left, right) => (right.offersCount || 0) - (left.offersCount || 0) || left.name.localeCompare(right.name))
      .slice(0, 7);
  }, [stores]);

  const visibleStores = allCategoriesMode ? allStoresPreview : activeStores;

  const effectiveActiveStoreSlug =
    activeStoreSlug && visibleStores.some((store) => store.slug === activeStoreSlug) ? activeStoreSlug : visibleStores[0]?.slug || "";

  const featuredStores = useMemo(() => {
    return [...visibleStores]
      .sort((left, right) => (right.offersCount || 0) - (left.offersCount || 0) || left.name.localeCompare(right.name))
      .slice(0, 4);
  }, [visibleStores]);

  const featuredOffers = useMemo(() => {
    const relevantStoreSlugs = new Set(
      effectiveActiveStoreSlug ? [effectiveActiveStoreSlug] : visibleStores.map((store) => store.slug)
    );

    const matchedOffers = offers
      .filter((offer) => relevantStoreSlugs.has(offer.storeSlug))
      .filter((offer) => offer.status?.toLowerCase() !== "expired")
      .sort((left, right) => new Date(right.createdAt) - new Date(left.createdAt))
      .slice(0, 4)
      .map((offer) => {
        const store = storeMap.get(offer.storeSlug);
        const storeOffers = offersByStoreSlug[offer.storeSlug] || [];

        return {
          offer,
          store,
          totalOffers: storeOffers.length || store?.offersCount || 0,
        };
      });

    return matchedOffers;
  }, [effectiveActiveStoreSlug, visibleStores, offers, offersByStoreSlug, storeMap]);

  const searchMatches = useMemo(() => {
    const query = searchValue.trim().toLowerCase();

    if (!query) {
      return [];
    }

    return stores
      .filter((store) => {
        return (
          store.name?.toLowerCase().includes(query) ||
          store.slug?.toLowerCase().includes(query) ||
          store.category?.toLowerCase().includes(query)
        );
      })
      .slice(0, 6);
  }, [searchValue, stores]);

  function handleSearchSubmit(event) {
    event.preventDefault();

    const rawQuery = searchValue.trim();
    const normalizedQuery = rawQuery.toLowerCase();
    const exactStoreMatch = stores.find((store) => isExactStoreMatch(store, normalizedQuery));

    if (exactStoreMatch) {
      router.push(getStoreHref(exactStoreMatch, selectedCountryCode));
      setMegaOpen(false);
      setDetailOpen(false);
      setMobileOpen(false);
      setMobileDealsOpen(false);
      setDesktopSearchOpen(false);
      return;
    }

    router.push(
      rawQuery
        ? `${buildCountryPath("/stores", selectedCountryCode)}?search=${encodeURIComponent(rawQuery)}`
        : buildCountryPath("/stores", selectedCountryCode)
    );
    setMegaOpen(false);
    setDetailOpen(false);
    setMobileOpen(false);
    setMobileDealsOpen(false);
    setDesktopSearchOpen(false);
  }

  function handleOpenMegaMenu() {
    setMegaOpen(true);
    setDetailOpen(false);
    if (!activeCategorySlug && categories[0]?.slug) {
      setActiveCategorySlug(categories[0].slug);
    }
  }

  const isDealsActive = pathWithoutCountry.startsWith("/stores");

  const displayCategories = categories.map((category) => ({
    ...category,
    displayName: formatCategoryLabel(category.name),
  }));

  const showMegaMenu = megaOpen && displayCategories.length > 0;
  const navItems = PRIMARY_NAV;
  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/80 backdrop-blur-md">
      <div
        className={cn(
          "mx-auto max-w-[1440px] items-center justify-between gap-4 px-5 py-3 sm:px-6 lg:px-8",
          mobileOpen ? "hidden lg:flex" : "flex"
        )}
      >
        <div className="flex items-center gap-4 lg:gap-6">
          <Link href={buildCountryPath("/", selectedCountryCode)} className="relative inline-flex items-center rounded-xl bg-[var(--accent)] px-4 py-1.5 shadow-[0_10px_20px_rgba(21,128,61,0.15)] overflow-hidden">
            <span className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white" />
            <span className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white" />
            <span className="text-[1.4rem] font-black italic leading-none tracking-[-0.07em] text-white px-1">Persuekey</span>
          </Link>

          <nav className="hidden items-center gap-6 lg:flex">
            {navItems.map((item) => {
              const isActive = pathWithoutCountry === item.href;

              return (
                <Link
                  key={item.label}
                  href={buildCountryPath(item.href, selectedCountryCode)}
                  className={cn(
                    "relative inline-flex items-center gap-1.5 text-[0.88rem] font-semibold transition group",
                    isActive ? "text-[var(--accent)] font-bold" : "text-zinc-600 hover:text-black"
                  )}
                >
                  <span>{item.label}</span>
                  {item.badge ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-rose-600 via-red-500 to-amber-500 px-2 py-0.5 text-[8.5px] font-black uppercase tracking-[0.14em] text-white shadow-[0_2px_10px_rgba(225,29,72,0.4)] border border-white/25 -translate-y-1.5 transition-transform duration-200 group-hover:scale-105">
                      <span className="flex h-1.5 w-1.5 rounded-full bg-white animate-ping" />
                      <span>{item.badge}</span>
                    </span>
                  ) : null}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="relative flex items-center gap-3">
          <form
            onSubmit={handleSearchSubmit}
            className="hidden items-center gap-2.5 rounded-full border border-zinc-300 bg-zinc-100 px-4 py-2 w-[240px] transition focus-within:border-zinc-450 lg:flex"
          >
            <span className="text-black/40">
              <SearchIcon className="h-4 w-4" />
            </span>
            <input
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
              placeholder="Search..."
              className="w-full border-0 bg-transparent text-xs font-semibold text-black outline-none placeholder:text-black/30"
            />
          </form>

          <button
            type="button"
            onClick={() => {
              setMobileOpen((current) => {
                const next = !current;
                if (next) {
                  setMobileDealsOpen(false);
                  setMobileActiveCategorySlug("");
                }
                return next;
              });
            }}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-black/8 text-black transition hover:border-black/15 hover:bg-black/5 lg:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "fixed inset-x-0 top-0 z-[70] h-[100dvh] overflow-y-auto border-t border-black/5 bg-white/98 transition lg:hidden",
          mobileOpen ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"
        )}
      >
        <div className="mx-auto flex min-h-[100dvh] max-w-[1400px] flex-col overflow-x-hidden px-4 pb-5 pt-4">
          <div className="border-b border-black/5 pb-4">
            <div className="flex items-center justify-between gap-4">
            <Link href={buildCountryPath("/", selectedCountryCode)} onClick={() => setMobileOpen(false)} className="relative inline-flex items-center rounded-xl bg-[var(--accent)] px-3.5 py-1.5 shadow-sm overflow-hidden">
              <span className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white" />
              <span className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white" />
              <span className="text-[1.35rem] font-black italic leading-none tracking-[-0.07em] text-white px-1">Persuekey</span>
            </Link>
             <div className="flex items-center gap-3 text-black">
               <button type="button" onClick={() => setMobileOpen(false)} className="inline-flex h-10 w-10 items-center justify-center">
                 <CloseIcon className="h-6 w-6" />
               </button>
             </div>
             </div>

             <form onSubmit={handleSearchSubmit} className="mt-4 flex items-center gap-3 rounded-[16px] border border-black/8 bg-black/[0.03] px-4 py-3">
               <span className="text-black/45">
                 <SearchIcon className="h-4.5 w-4.5" />
               </span>
               <input
                 value={searchValue}
                 onChange={(event) => setSearchValue(event.target.value)}
                 placeholder="Search stores, coupons..."
                 className="w-full border-0 bg-transparent text-[0.98rem] font-medium text-black outline-none placeholder:text-black/38"
               />
             </form>
             </div>

          {PRIMARY_NAV.map((item) => (
            <div key={item.label} className="border-b border-black/5 py-5">
              <Link
                href={buildCountryPath(item.href, selectedCountryCode)}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "inline-flex items-center gap-2 text-[1.05rem] font-semibold transition",
                  (item.href === "/" && pathWithoutCountry === "/") ||
                    (item.href !== "/" && pathWithoutCountry.startsWith(item.href))
                    ? "text-[var(--accent)]"
                    : "text-zinc-600 hover:text-black"
                )}
              >
                <span>{item.label}</span>
                {item.badge ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-rose-600 via-red-500 to-amber-500 px-2.5 py-0.5 text-[9px] font-black uppercase tracking-[0.14em] text-white shadow-[0_2px_10px_rgba(225,29,72,0.35)] border border-white/25">
                    <span className="flex h-1.5 w-1.5 rounded-full bg-white animate-ping" />
                    <span>{item.badge}</span>
                  </span>
                ) : null}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}
