"use client";

import Link from "next/link";
import { useState } from "react";
import SectionHeader from "@/components/shared/SectionHeader";

function LogoCard({ store }) {
  const [err, setErr] = useState(false);
  const slug = store.slug || store.name?.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const href = store.href ?? `/stores/${store.categorySlug || "general"}/${slug}`;
  const initials = (store.logoText || store.name || "?")
    .split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase().slice(0, 2);

  return (
    <Link
      href={href}
      className="group relative flex items-center justify-center overflow-hidden rounded-2xl border border-zinc-200/80 bg-white transition-all duration-200 hover:border-violet-300 hover:shadow-md shadow-sm"
      style={{ aspectRatio: "3/2" }}
    >
      {store.logoImage && !err ? (
        <img
          src={store.logoImage}
          alt={store.name}
          onError={() => setErr(true)}
          className="h-full w-full object-contain p-1.5 sm:p-2.5 transition-transform duration-200 group-hover:scale-105"
        />
      ) : (
        <span className="text-sm font-black text-zinc-500 uppercase tracking-widest">{initials}</span>
      )}
    </Link>
  );
}

function FeaturedCardMobile({ store }) {
  const [err, setErr] = useState(false);
  const slug = store.slug || store.name?.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const href = store.href ?? `/stores/${store.categorySlug || "general"}/${slug}`;
  const initials = (store.logoText || store.name || "?")
    .split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase().slice(0, 2);

  return (
    <Link
      href={href}
      className="group relative flex w-full items-center justify-between overflow-hidden rounded-2xl border-2 border-violet-200/90 bg-gradient-to-r from-violet-100/80 via-purple-50 to-indigo-100/80 px-4 py-3.5 shadow-[0_6px_25px_rgba(168,85,247,0.12)] transition-all hover:border-violet-400 hover:shadow-lg"
    >
      {/* Background glow & decorative accents */}
      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-violet-200/50 blur-xl" />

      {/* Left Title */}
      <span className="relative z-10 text-base font-extrabold text-zinc-900 tracking-tight">
        Featured Store
      </span>

      {/* Right Brand Info */}
      <div className="relative z-10 flex items-center gap-2.5">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm border border-violet-100">
          {store.logoImage && !err ? (
            <img
              src={store.logoImage}
              alt={store.name}
              onError={() => setErr(true)}
              className="h-8.5 w-8.5 object-contain"
            />
          ) : (
            <span className="text-base font-black text-violet-600 uppercase">{initials}</span>
          )}
        </div>
        <span className="text-base font-bold text-zinc-900 group-hover:text-violet-700 transition-colors">
          {store.name}
        </span>
      </div>
    </Link>
  );
}

function FeaturedCardDesktop({ store }) {
  const [err, setErr] = useState(false);
  const slug = store.slug || store.name?.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const href = store.href ?? `/stores/${store.categorySlug || "general"}/${slug}`;
  const initials = (store.logoText || store.name || "?")
    .split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase().slice(0, 2);

  return (
    <Link
      href={href}
      className="group relative flex shrink-0 flex-col overflow-hidden rounded-2xl border-2 border-violet-200 transition-all duration-200 hover:border-violet-400 hover:shadow-lg"
      style={{ width: "180px", minWidth: "180px" }}
    >
      {/* Full-bleed gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-100" />

      {/* Decorative circles */}
      <div className="absolute -top-8 -right-8 h-24 w-24 rounded-full bg-violet-200/40" />
      <div className="absolute -bottom-6 -left-6 h-20 w-20 rounded-full bg-indigo-200/30" />

      {/* Content */}
      <div className="relative flex h-full flex-col items-center justify-center gap-3 p-5">
        {/* Logo box */}
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-md border border-violet-100">
          {store.logoImage && !err ? (
            <img
              src={store.logoImage}
              alt={store.name}
              onError={() => setErr(true)}
              className="h-12 w-12 object-contain"
            />
          ) : (
            <span className="text-lg font-black text-violet-600 uppercase">{initials}</span>
          )}
        </div>

        {/* Store name */}
        <span className="text-center text-sm font-black text-zinc-800 leading-tight group-hover:text-violet-700 transition-colors max-w-full truncate px-1">
          {store.name}
        </span>

        {/* Badge */}
        <div className="rounded-full bg-violet-600 px-3 py-1">
          <span className="text-[9px] font-black uppercase tracking-widest text-white">Featured</span>
        </div>
      </div>
    </Link>
  );
}

export default function TrendingStoresSection({ trendingStores = [], title = "Top Stores" }) {
  // Only use real database stores — no mock backfill
  const featured = trendingStores[0] ?? null;
  const gridStores = trendingStores.slice(1, 15);

  if (!featured) return null;

  return (
    <section className="pt-2">
      <SectionHeader title={title} href="/stores" />

      {/* Desktop Layout (md and up): Vertical Featured Card + 6-col Logo Grid */}
      <div className="hidden md:flex gap-3 items-stretch">
        <FeaturedCardDesktop store={featured} />
        <div className="flex-1 grid grid-cols-6 gap-3">
          {gridStores.map((store) => (
            <LogoCard key={store.name} store={store} />
          ))}
        </div>
      </div>

      {/* Mobile Layout (below md): Horizontal Featured Banner + 4-col Logo Grid */}
      <div className="flex flex-col gap-3 md:hidden">
        <FeaturedCardMobile store={featured} />
        <div className="grid grid-cols-4 gap-2">
          {gridStores.map((store) => (
            <LogoCard key={store.name} store={store} />
          ))}
        </div>
      </div>
    </section>
  );
}
