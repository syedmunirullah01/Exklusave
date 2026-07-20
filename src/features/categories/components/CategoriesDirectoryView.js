"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

function SearchIcon({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

function ClearIcon({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

function SparklesIcon({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    </svg>
  );
}

function ArrowRightIcon({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function CategoryIcon({ slug, name }) {
  const s = (slug || name || "").toLowerCase();
  
  if (s.includes("fashion") || s.includes("apparel") || s.includes("clothing")) {
    return (
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-pink-500" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />
      </svg>
    );
  }
  
  if (s.includes("tech") || s.includes("electronic") || s.includes("gadget")) {
    return (
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-sky-500" fill="none" stroke="currentColor" strokeWidth="2">
        <rect width="18" height="12" x="3" y="4" rx="2" />
        <path d="M2 20h20" />
      </svg>
    );
  }

  if (s.includes("beauty") || s.includes("health") || s.includes("skin") || s.includes("cosmetic")) {
    return (
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-rose-500" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    );
  }

  if (s.includes("travel") || s.includes("hotel") || s.includes("flight")) {
    return (
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-amber-500" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.7 5.2c.3.4.8.5 1.3.3l.5-.3c.4-.2.6-.6.5-1.1z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 text-emerald-500" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m7.5 4.27 9 5.15" />
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 12v10" />
    </svg>
  );
}

export default function CategoriesDirectoryView({ categories = [], storeCountsMap = {} }) {
  const [query, setQuery] = useState("");

  const filteredCategories = useMemo(() => {
    if (!query.trim()) return categories;
    const q = query.toLowerCase().trim();
    return categories.filter(
      (cat) =>
        cat.name?.toLowerCase().includes(q) ||
        cat.slug?.toLowerCase().includes(q) ||
        cat.description?.toLowerCase().includes(q)
    );
  }, [categories, query]);

  return (
    <div className="min-h-screen bg-[var(--page-bg,#fcfdfd)]">
      {/* Breadcrumb Header Bar */}
      <div className="border-b border-black/5 bg-zinc-50/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1240px] items-center gap-2 px-4 py-3 text-xs font-semibold text-zinc-500 sm:px-6 lg:px-8">
          <Link href="/" className="hover:text-black transition">Home</Link>
          <span className="text-zinc-300 font-normal">/</span>
          <span className="font-bold text-black">Categories</span>
        </div>
      </div>

      {/* Hero Banner Header */}
      <section className="relative overflow-hidden border-b border-black/5 bg-gradient-to-b from-zinc-900 via-zinc-950 to-black px-4 py-12 text-white sm:px-6 sm:py-16 lg:px-8">
        <div className="absolute top-0 right-1/4 h-96 w-96 rounded-full bg-emerald-500/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 h-96 w-96 rounded-full bg-purple-500/10 blur-[120px] pointer-events-none" />

        <div className="relative mx-auto max-w-[1240px]">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-black uppercase tracking-[0.2em] text-emerald-400 backdrop-blur-md mb-6">
            <SparklesIcon className="h-4 w-4 animate-pulse" />
            <span>CATEGORIES DIRECTORY</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight leading-[1.05]">
                Browse Categories
              </h1>
              <p className="text-sm sm:text-base text-zinc-300 font-medium leading-relaxed">
                Find verified partner stores, coupon codes, and special sales grouped conveniently by shopping category.
              </p>
            </div>

            {/* Instant Search Input */}
            <div className="w-full lg:w-[400px] shrink-0">
              <div className="relative flex items-center rounded-2xl border border-white/20 bg-white/10 p-2 backdrop-blur-xl shadow-2xl focus-within:border-emerald-400 transition-all">
                <span className="pl-3 text-zinc-400">
                  <SearchIcon className="h-5 w-5" />
                </span>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search categories..."
                  className="w-full border-0 bg-transparent px-3 py-2 text-sm text-white font-medium outline-none placeholder:text-zinc-400"
                />
                {query ? (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    className="p-2 text-zinc-400 hover:text-white transition"
                    aria-label="Clear search"
                  >
                    <ClearIcon className="h-4 w-4" />
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid Section */}
      <main className="mx-auto max-w-[1240px] px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between border-b border-black/5 pb-4">
          <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
            Showing <span className="font-extrabold text-black">{filteredCategories.length}</span> Categories
          </p>
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="text-xs font-extrabold text-emerald-600 hover:underline"
            >
              Reset Search ✕
            </button>
          ) : null}
        </div>

        {filteredCategories.length ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCategories.map((category) => {
              const count = storeCountsMap[category.slug] || 0;
              return (
                <Link
                  key={category.slug}
                  href={`/stores?category=${category.slug}`}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-black/8 bg-white p-6 sm:p-8 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-emerald-500/40 hover:shadow-[0_20px_40px_rgba(16,185,129,0.12)] min-h-[220px]"
                >
                  <div>
                    {/* Header Row: Icon & Store Count */}
                    <div className="flex items-center justify-between gap-4 mb-5">
                      <div className="grid h-12 w-12 place-items-center rounded-2xl border border-black/6 bg-zinc-50 group-hover:bg-emerald-50 group-hover:border-emerald-500/20 transition-colors">
                        <CategoryIcon slug={category.slug} name={category.name} />
                      </div>

                      <span className="rounded-full bg-zinc-100 border border-black/5 px-3 py-1 text-[11px] font-mono font-bold text-zinc-600 group-hover:bg-emerald-500 group-hover:text-white group-hover:border-emerald-500 transition-colors">
                        {count} {count === 1 ? "Store" : "Stores"}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <h2 className="text-xl font-black tracking-tight text-zinc-900 group-hover:text-emerald-600 transition-colors">
                      {category.name}
                    </h2>
                    <p className="mt-2 text-xs sm:text-sm leading-relaxed text-zinc-500 font-medium line-clamp-2">
                      {category.description || `Discover curated coupon codes, deals, and verified promotions in the ${category.name} category.`}
                    </p>
                  </div>

                  {/* Footer CTA */}
                  <div className="mt-6 flex items-center justify-between border-t border-black/5 pt-4 text-xs font-bold text-zinc-500 group-hover:text-black">
                    <span>Explore Stores</span>
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-zinc-100 text-black transition-all group-hover:bg-emerald-500 group-hover:text-white group-hover:translate-x-1">
                      <ArrowRightIcon className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="rounded-3xl border border-black/8 bg-white p-12 text-center shadow-sm space-y-4">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-zinc-100 text-zinc-400">
              <SearchIcon className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-zinc-900">No categories found</h3>
            <p className="text-xs sm:text-sm text-zinc-500 max-w-md mx-auto">
              We couldn&apos;t find any category matching &quot;{query}&quot;. Try searching with a different keyword.
            </p>
            <button
              type="button"
              onClick={() => setQuery("")}
              className="inline-flex items-center gap-2 rounded-2xl bg-zinc-900 px-6 py-3 text-xs font-black uppercase tracking-wider text-white hover:bg-black transition shadow-md"
            >
              Clear Search
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
