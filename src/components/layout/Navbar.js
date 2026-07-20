"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const PRIMARY_NAV = [
  { label: "Home", href: "/" },
  { label: "Stores", href: "/stores", badge: "HOT" },
  { label: "Categories", href: "/categories" },
  { label: "Blogs", href: "/blogs" },
  { label: "Contact", href: "/contact" },
];

function SearchIcon({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
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

function isExactStoreMatch(store, query) {
  return [store.name, store.slug].filter(Boolean).some((v) => v.trim().toLowerCase() === query);
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const menuRef = useRef(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [stores, setStores] = useState([]);

  useEffect(() => {
    let cancelled = false;
    async function loadStores() {
      try {
        const res = await fetch("/api/stores", { cache: "no-store" });
        const payload = await res.json();
        if (!cancelled && Array.isArray(payload.data)) {
          setStores(payload.data);
        }
      } catch {
        // ignore
      }
    }
    loadStores();
    return () => { cancelled = true; };
  }, [pathname]);

  useEffect(() => {
    function handlePointerDown(e) {
      if (!menuRef.current?.contains(e.target)) {
        // close any open dropdowns if needed
      }
    }
    function handleEscape(e) {
      if (e.key === "Escape") {
        setMobileOpen(false);
      }
    }
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const searchMatches = useMemo(() => {
    const q = searchValue.trim().toLowerCase();
    if (!q) return [];
    return stores
      .filter((s) =>
        s.name?.toLowerCase().includes(q) ||
        s.slug?.toLowerCase().includes(q) ||
        s.category?.toLowerCase().includes(q)
      )
      .slice(0, 6);
  }, [searchValue, stores]);

  function handleSearchSubmit(e) {
    e.preventDefault();
    const raw = searchValue.trim();
    const norm = raw.toLowerCase();
    const exact = stores.find((s) => isExactStoreMatch(s, norm));
    if (exact) {
      router.push(`/stores/${exact.categorySlug || "general"}/${exact.slug}`);
    } else {
      router.push(raw ? `/stores?search=${encodeURIComponent(raw)}` : "/stores");
    }
    setMobileOpen(false);
    setSearchValue("");
  }

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/90 backdrop-blur-md">
      {/* Desktop Navbar */}
      <div
        className={cn(
          "mx-auto max-w-[1440px] items-center justify-between gap-4 px-5 py-3 sm:px-6 lg:px-8",
          mobileOpen ? "hidden lg:flex" : "flex"
        )}
      >
        {/* Logo + Nav */}
        <div className="flex items-center gap-4 lg:gap-6">
          <Link href="/" className="relative inline-flex items-center rounded-xl bg-[var(--accent)] px-4 py-1.5 shadow-[0_10px_20px_rgba(21,128,61,0.15)] overflow-hidden">
            <span className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white" />
            <span className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white" />
            <span className="text-[1.4rem] font-black italic leading-none tracking-[-0.07em] text-white px-1">Persuekey</span>
          </Link>

          <nav className="hidden items-center gap-6 lg:flex">
            {PRIMARY_NAV.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.label}
                  href={item.href}
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

        {/* Search + Mobile Toggle */}
        <div className="relative flex items-center gap-3">
          <form
            onSubmit={handleSearchSubmit}
            className="relative hidden items-center gap-2.5 rounded-full border border-zinc-300 bg-zinc-100 px-4 py-2 w-[240px] transition focus-within:border-zinc-400 lg:flex"
          >
            <span className="text-black/40">
              <SearchIcon className="h-4 w-4" />
            </span>
            <input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search stores..."
              className="w-full border-0 bg-transparent text-xs font-semibold text-black outline-none placeholder:text-black/30"
            />
            {searchMatches.length > 0 && (
              <div className="absolute left-0 top-[calc(100%+8px)] w-full rounded-2xl border border-black/8 bg-white shadow-xl z-50 overflow-hidden">
                {searchMatches.map((store) => (
                  <Link
                    key={store.slug}
                    href={`/stores/${store.categorySlug || "general"}/${store.slug}`}
                    onClick={() => setSearchValue("")}
                    className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-zinc-800 hover:bg-emerald-50 hover:text-emerald-700 transition"
                  >
                    {store.name}
                  </Link>
                ))}
              </div>
            )}
          </form>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-black/8 text-black transition hover:border-black/15 hover:bg-black/5 lg:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <div
        className={cn(
          "fixed inset-x-0 top-0 z-[70] h-[100dvh] overflow-y-auto bg-white transition lg:hidden",
          mobileOpen ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"
        )}
      >
        <div className="mx-auto flex min-h-[100dvh] max-w-[1400px] flex-col px-4 pb-5 pt-4">
          {/* Mobile Header */}
          <div className="border-b border-black/5 pb-4">
            <div className="flex items-center justify-between gap-4">
              <Link href="/" onClick={() => setMobileOpen(false)} className="relative inline-flex items-center rounded-xl bg-[var(--accent)] px-3.5 py-1.5 shadow-sm overflow-hidden">
                <span className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white" />
                <span className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white" />
                <span className="text-[1.35rem] font-black italic leading-none tracking-[-0.07em] text-white px-1">Persuekey</span>
              </Link>
              <button type="button" onClick={() => setMobileOpen(false)} className="inline-flex h-10 w-10 items-center justify-center">
                <CloseIcon className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSearchSubmit} className="mt-4 flex items-center gap-3 rounded-[16px] border border-black/8 bg-black/[0.03] px-4 py-3">
              <span className="text-black/45">
                <SearchIcon className="h-4 w-4" />
              </span>
              <input
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search stores, coupons..."
                className="w-full border-0 bg-transparent text-[0.98rem] font-medium text-black outline-none placeholder:text-black/38"
              />
            </form>
          </div>

          {/* Mobile Nav Links */}
          {PRIMARY_NAV.map((item) => (
            <div key={item.label} className="border-b border-black/5 py-5">
              <Link
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "inline-flex items-center gap-2 text-[1.05rem] font-semibold transition",
                  (item.href === "/" && pathname === "/") ||
                  (item.href !== "/" && pathname.startsWith(item.href))
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
