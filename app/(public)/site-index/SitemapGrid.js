"use client";

import Link from "next/link";
import { useState } from "react";

const PAGE_SIZE = 10;

function PaginatedSection({ section }) {
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(section.links.length / PAGE_SIZE);
  const visible = section.links.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);
  const hasPrev = page > 0;
  const hasNext = page < totalPages - 1;

  return (
    <div className={`rounded-3xl border bg-gradient-to-br ${section.accent} overflow-hidden`}>
      {/* Card Header */}
      <div className="flex items-center justify-between gap-3 px-5 py-4 sm:px-6 sm:py-5 border-b border-black/5">
        <div className="flex items-center gap-3">
          <div className={`inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-2xl text-lg sm:text-xl ${section.iconBg}`}>
            {section.emoji}
          </div>
          <div>
            <h2 className="text-sm font-black text-zinc-900">{section.section}</h2>
            <p className="text-[10px] text-zinc-400 font-semibold">{section.links.length} pages</p>
          </div>
        </div>
        {/* Pagination indicator */}
        {totalPages > 1 && (
          <span className="text-[10px] font-bold text-zinc-400 shrink-0">
            {page + 1} / {totalPages}
          </span>
        )}
      </div>

      {/* Links */}
      <div className="divide-y divide-black/5">
        {visible.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="group flex items-start justify-between gap-3 px-5 py-3.5 sm:px-6 sm:py-4 transition-colors hover:bg-white/60"
          >
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="h-px w-3 bg-zinc-300 transition-all group-hover:w-5 group-hover:bg-emerald-500 shrink-0" />
                <span className="text-sm font-bold text-zinc-800 group-hover:text-emerald-600 transition-colors truncate">
                  {link.label}
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 leading-snug pl-5 line-clamp-1">{link.description}</p>
            </div>
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 shrink-0 mt-1 text-zinc-300 transition-all group-hover:text-emerald-500 group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between gap-2 border-t border-black/5 px-5 py-3 sm:px-6">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={!hasPrev}
            className="inline-flex items-center gap-1.5 rounded-xl border border-black/8 bg-white px-3 py-1.5 text-[11px] font-bold text-zinc-600 transition hover:border-emerald-500/30 hover:text-emerald-600 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="m15 18-6-6 6-6" />
            </svg>
            Prev
          </button>

          {/* Page dots */}
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === page ? "w-4 bg-emerald-500" : "w-1.5 bg-zinc-300 hover:bg-zinc-400"
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={!hasNext}
            className="inline-flex items-center gap-1.5 rounded-xl border border-black/8 bg-white px-3 py-1.5 text-[11px] font-bold text-zinc-600 transition hover:border-emerald-500/30 hover:text-emerald-600 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Next
            <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

export default function SitemapGrid({ staticSections, storeLinks, categoryLinks }) {
  const allSections = [
    staticSections[0], // Main Pages

    // Categories (live)
    {
      section: "Top Categories",
      emoji: "🗂️",
      accent: "from-violet-500/15 to-purple-500/10 border-violet-500/20",
      iconBg: "bg-violet-500/15 text-violet-600",
      links: categoryLinks.length > 0
        ? categoryLinks
        : [{ label: "All Categories", href: "/categories", description: "Explore all categories" }],
    },

    // Stores (live, paginated)
    {
      section: "All Stores",
      emoji: "🏪",
      accent: "from-amber-500/15 to-orange-500/10 border-amber-500/20",
      iconBg: "bg-amber-500/15 text-amber-600",
      links: storeLinks.length > 0
        ? storeLinks
        : [{ label: "All Stores", href: "/stores", description: "Browse all stores" }],
    },

    ...staticSections.slice(1), // Company + Legal
  ];

  const totalLinks = allSections.reduce((a, s) => a + s.links.length, 0);

  return (
    <div className="mx-auto max-w-[1200px] px-4 sm:px-5 lg:px-8 py-12 sm:py-16">
      {/* Total count */}
      <p className="text-xs font-semibold text-zinc-400 mb-6 text-center">
        Showing all <span className="font-black text-zinc-700">{totalLinks}</span> pages
      </p>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {allSections.map((section) => (
          <PaginatedSection key={section.section} section={section} />
        ))}
      </div>

      {/* Auto-update note */}
      <div className="mt-10 flex items-center justify-center gap-2 rounded-2xl border border-emerald-500/20 bg-emerald-50 px-5 py-4">
        <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
        <p className="text-xs font-semibold text-emerald-700">
          Stores and categories auto-update whenever new data is added from the admin panel.
        </p>
      </div>

      <div className="mt-6 text-center">
        <p className="text-xs text-zinc-400">
          Can&apos;t find what you&apos;re looking for?{" "}
          <Link href="/contact" className="font-bold text-emerald-600 hover:underline">
            Contact our support team
          </Link>
        </p>
      </div>
    </div>
  );
}
