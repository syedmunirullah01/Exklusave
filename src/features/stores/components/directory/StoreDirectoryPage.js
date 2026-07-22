"use client";

import { useState, useMemo } from "react";
import BreadcrumbBar from "./BreadcrumbBar";
import CategoryFilter from "./CategoryFilter";
import Pagination from "./Pagination";
import StoreGrid from "./StoreGrid";

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

const ALPHABET = ["ALL", ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""), "0-9"];

export default function StoreDirectoryPage({ breadcrumbItems = ["Home", "Stores"], categories = [], stores = [], searchValue = "" }) {
  const [query, setQuery] = useState(searchValue || "");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLetter, setSelectedLetter] = useState("ALL");
  const [page, setPage] = useState(1);

  const filteredStores = useMemo(() => {
    return stores.filter((store) => {
      const name = String(store.name || "").toLowerCase();
      const slug = String(store.slug || "").toLowerCase();
      const searchLower = query.toLowerCase().trim();

      // 1. Search Query Filter
      if (searchLower && !name.includes(searchLower) && !slug.includes(searchLower)) {
        return false;
      }

      // 2. Category Filter
      if (selectedCategory !== "all") {
        const catObj = categories.find((c) => c.slug === selectedCategory);
        const selSlug = (selectedCategory || "").toLowerCase().trim();
        const selName = (catObj?.name || "").toLowerCase().trim();
        const storeCatSlug = (store.categorySlug || "").toLowerCase().trim();
        const storeCatName = (store.category || store.categoryName || "").toLowerCase().trim();

        const isMatch =
          (selSlug && storeCatSlug === selSlug) ||
          (selName && storeCatName === selName) ||
          (selSlug && storeCatName === selSlug);

        if (!isMatch) return false;
      }

      // 3. Alphabet Letter Filter
      if (selectedLetter !== "ALL") {
        if (selectedLetter === "0-9") {
          const firstChar = name.charAt(0);
          if (!/\d/.test(firstChar)) return false;
        } else {
          if (!name.startsWith(selectedLetter.toLowerCase())) return false;
        }
      }

      return true;
    });
  }, [stores, query, selectedCategory, selectedLetter, categories]);

  const STORES_PER_PAGE = 12;
  const totalPages = Math.ceil(filteredStores.length / STORES_PER_PAGE) || 1;
  const paginatedStores = useMemo(() => {
    const start = (page - 1) * STORES_PER_PAGE;
    return filteredStores.slice(start, start + STORES_PER_PAGE);
  }, [filteredStores, page]);

  const categoriesWithCounts = useMemo(() => {
    const list = [{ name: "All Categories", slug: "all", count: stores.length }];
    categories.forEach((cat) => {
      const catSlug = (cat.slug || "").toLowerCase().trim();
      const catName = (cat.name || "").toLowerCase().trim();
      const count = stores.filter((s) => {
        const storeCatSlug = (s.categorySlug || "").toLowerCase().trim();
        const storeCatName = (s.category || s.categoryName || "").toLowerCase().trim();
        return (
          (catSlug && storeCatSlug === catSlug) ||
          (catName && storeCatName === catName) ||
          (catSlug && storeCatName === catSlug)
        );
      }).length;
      list.push({ ...cat, count });
    });
    return list;
  }, [categories, stores]);

  return (
    <div className="min-h-screen bg-[var(--page-bg,#fcfdfd)]">
      <BreadcrumbBar breadcrumbItems={breadcrumbItems} />

      {/* Hero Banner Header */}
      <section className="relative overflow-hidden border-b border-black/5 bg-gradient-to-b from-zinc-900 via-zinc-950 to-black px-4 py-12 text-white sm:px-6 sm:py-16 lg:px-8">
        <div className="absolute top-0 right-1/4 h-96 w-96 rounded-full bg-emerald-500/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 h-96 w-96 rounded-full bg-blue-500/10 blur-[120px] pointer-events-none" />

        <div className="relative mx-auto max-w-[1240px]">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-black uppercase tracking-[0.2em] text-emerald-400 backdrop-blur-md mb-6">
            <SparklesIcon className="h-4 w-4 animate-pulse" />
            <span>VERIFIED BRANDS & PARTNERS</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight leading-[1.05]">
                Store Directory
              </h1>
              <p className="text-sm sm:text-base text-zinc-300 font-medium leading-relaxed">
                Browse verified partner stores, brand promo codes, and member-only vouchers to maximize your savings every day.
              </p>
            </div>

            {/* Instant Search Box inside Hero */}
            <div className="w-full lg:w-[420px] shrink-0">
              <div className="relative flex items-center rounded-2xl border border-white/20 bg-white/10 p-2 backdrop-blur-xl shadow-2xl focus-within:border-emerald-400 transition-all">
                <span className="pl-3 text-zinc-400">
                  <SearchIcon className="h-5 w-5" />
                </span>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setPage(1);
                  }}
                  placeholder="Search store name, brand, or deal..."
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

      {/* A-Z Letter Navigation Index Bar */}
      <section className="border-b border-black/5 bg-white py-4 shadow-sm sticky top-0 z-30">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 custom-scrollbar">
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 pr-2 shrink-0">INDEX:</span>
            {ALPHABET.map((letter) => {
              const isActive = selectedLetter === letter;
              return (
                <button
                  key={letter}
                  type="button"
                  onClick={() => {
                    setSelectedLetter(letter);
                    setPage(1);
                  }}
                  className={`min-w-8 h-8 px-2.5 rounded-xl text-xs font-black uppercase transition-all shrink-0 ${
                    isActive
                      ? "bg-emerald-500 text-black shadow-md scale-105"
                      : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-black"
                  }`}
                >
                  {letter}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Directory Content Grid */}
      <main className="mx-auto max-w-[1240px] px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row">
          <CategoryFilter
            categories={categoriesWithCounts}
            activeCategory={selectedCategory}
            onSelectCategory={(slug) => {
              setSelectedCategory(slug);
              setPage(1);
            }}
          />

          <div className="flex-1">
            {/* Header info bar for active filter counts */}
            <div className="mb-6 flex items-center justify-between border-b border-black/5 pb-4">
              <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
                Showing <span className="font-extrabold text-black">{filteredStores.length}</span> Stores
              </p>
              {(query || selectedCategory !== "all" || selectedLetter !== "ALL") ? (
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    setSelectedCategory("all");
                    setSelectedLetter("ALL");
                    setPage(1);
                  }}
                  className="text-xs font-extrabold text-emerald-600 hover:underline"
                >
                  Reset Filters ✕
                </button>
              ) : null}
            </div>

            {paginatedStores.length ? (
              <>
                <StoreGrid stores={paginatedStores} />
                <Pagination
                  currentPage={page}
                  totalPages={totalPages}
                  onPageChange={(p) => setPage(p)}
                />
              </>
            ) : (
              <div className="rounded-3xl border border-black/8 bg-white p-12 text-center shadow-sm space-y-4">
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-zinc-100 text-zinc-400">
                  <SearchIcon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-zinc-900">No stores found</h3>
                <p className="text-xs sm:text-sm text-zinc-500 max-w-md mx-auto">
                  We couldn&apos;t find any stores matching your current search or filter options. Try resetting your filters.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    setSelectedCategory("all");
                    setSelectedLetter("ALL");
                    setPage(1);
                  }}
                  className="inline-flex items-center gap-2 rounded-2xl bg-zinc-900 px-6 py-3 text-xs font-black uppercase tracking-wider text-white hover:bg-black transition shadow-md"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
