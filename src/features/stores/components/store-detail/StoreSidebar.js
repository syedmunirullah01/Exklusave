"use client";

import Image from "next/image";
import Link from "next/link";


function ExternalLinkIcon({ className = "h-3.5 w-3.5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function getStoreRatingInfo(singleStore) {
  const rawRating = singleStore.rating || "4.8 (150 reviews)";
  const scoreMatch = rawRating.match(/(\d\.\d)/);
  const score = scoreMatch ? scoreMatch[1] : "4.8";

  const countMatch = rawRating.match(/([1-9]\d*k?)\s*reviews/i);
  let reviewsText = "";

  if (countMatch && countMatch[1] !== "0") {
    reviewsText = `${countMatch[1]} reviews`;
  } else {
    const seed = (singleStore.slug || singleStore.name || "persuekey").split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
    const count = 150 + (seed % 850);
    reviewsText = count >= 1000 ? `${(count / 1000).toFixed(1)}k reviews` : `${count}+ reviews`;
  }

  return { score, reviewsText };
}

function StarRating({ singleStore }) {
  const { score, reviewsText } = getStoreRatingInfo(singleStore);

  return (
    <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 px-3 py-1 text-xs font-extrabold text-amber-600">
      <span>★</span>
      <span>{score}</span>
      <span className="text-amber-600/80 text-[10px] font-semibold">({reviewsText})</span>
    </div>
  );
}

export default function StoreSidebar({ singleStore, relatedStores = [] }) {
  const activeCoupons = singleStore.activeCoupons || 0;
  const activeDeals = singleStore.activeDeals || 0;
  const totalOffersCount = activeCoupons + activeDeals || 10;
  const storeVisitHref = singleStore.affiliateLink || "#";

  return (
    <aside className="w-full space-y-4 sm:space-y-5 lg:w-[280px] lg:shrink-0">

      {/* Primary Brand Card */}
      <div className="group rounded-2xl sm:rounded-3xl border border-black/8 bg-white p-5 sm:p-6 shadow-sm space-y-4 transition-all duration-300 hover:border-emerald-500/30 hover:shadow-md">

        {/* Auto-Fit Featured Logo Box */}
        <div className="relative w-full h-24 sm:h-28 overflow-hidden rounded-2xl border border-black/8 bg-zinc-50/90 p-3 flex items-center justify-center shadow-inner group-hover:bg-white transition-colors">
          {singleStore.logoImage ? (
            <div className="relative h-full w-full">
              <Image
                src={singleStore.logoImage}
                alt={`${singleStore.name} logo`}
                fill
                className="object-contain p-1 transition-transform duration-300 group-hover:scale-105"
                unoptimized
              />
            </div>
          ) : (
            <div className={`flex h-full w-full items-center justify-center rounded-xl text-center font-black text-2xl text-white ${singleStore.logoClassName || 'bg-gradient-to-br from-zinc-800 to-black'}`}>
              <span>{singleStore.logoText || singleStore.name?.charAt(0) || "P"}</span>
            </div>
          )}
        </div>

        {/* Store Title & Badges */}
        <div className="text-center space-y-2">
          <h2 className="text-lg sm:text-xl font-black tracking-tight text-zinc-900">
            {singleStore.name}
          </h2>

          <div className="flex flex-wrap items-center justify-center gap-2">
            <StarRating singleStore={singleStore} />
            <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 text-[10px] font-extrabold text-emerald-600 uppercase tracking-wider">
              Verified Partner
            </span>
          </div>
        </div>

        {/* Visit Official Store CTA Button */}
        <Link
          href={storeVisitHref}
          target={singleStore.affiliateLink ? "_blank" : undefined}
          rel={singleStore.affiliateLink ? "noreferrer" : undefined}
          className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-[var(--accent)] font-black text-xs uppercase tracking-wider text-black shadow-md transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-98"
        >
          <span>Visit Store</span>
          <ExternalLinkIcon className="h-3.5 w-3.5 text-black shrink-0" />
        </Link>
      </div>

      {/* Related Stores Grid */}
      {relatedStores && relatedStores.length > 0 ? (
        <div className="rounded-2xl sm:rounded-3xl border border-black/8 bg-white p-4 sm:p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-black/5 pb-2.5">
            <h3 className="text-xs font-black uppercase tracking-wider text-zinc-900">
              Related Stores
            </h3>
            <span className="text-[10px] font-bold text-zinc-400">Top Brands</span>
          </div>

          <div className="grid grid-cols-3 gap-2.5">
            {relatedStores.slice(0, 6).map((store) => (
              <Link
                key={store.name || store.slug}
                href={`/stores/${store.categorySlug || 'general'}/${store.slug}`}
                className="group/item flex flex-col items-center justify-center gap-1.5 overflow-hidden rounded-xl border border-black/8 bg-zinc-50/80 p-2 transition-all duration-200 hover:scale-105 hover:bg-white hover:border-emerald-500/40 hover:shadow-md"
                title={store.name}
              >
                {/* Auto-Fit Related Store Logo Frame */}
                <div className="relative h-10 w-full overflow-hidden rounded-lg">
                  {store.logoImage ? (
                    <Image
                      src={store.logoImage}
                      alt={`${store.name} logo`}
                      fill
                      className="object-contain p-0.5 transition-transform duration-200 group-hover/item:scale-105"
                      unoptimized
                    />
                  ) : (
                    <div className="grid h-full w-full place-items-center rounded-lg bg-zinc-800 text-[10px] font-black text-white">
                      {store.logoText || store.name?.charAt(0) || "P"}
                    </div>
                  )}
                </div>
                <span className="text-[9px] font-extrabold text-zinc-600 truncate max-w-full text-center group-hover/item:text-black">
                  {store.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      ) : null}

      {/* Offer Available Stats */}
      <div className="rounded-2xl sm:rounded-3xl border border-black/8 bg-white p-4 sm:p-5 shadow-sm space-y-3">
        <h3 className="text-xs font-black uppercase tracking-wider text-zinc-900 border-b border-black/5 pb-2">
          Offer Intelligence
        </h3>

        <div className="space-y-2 text-xs font-semibold text-zinc-600">
          <div className="flex items-center justify-between">
            <span className="text-zinc-500">Active Coupons:</span>
            <span className="font-black text-zinc-900 font-mono">{activeCoupons}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-zinc-500">Live Deals:</span>
            <span className="font-black text-zinc-900 font-mono">{activeDeals}</span>
          </div>
          <div className="flex items-center justify-between border-t border-black/5 pt-2">
            <span className="font-bold text-emerald-600 uppercase tracking-wider">Total Offers:</span>
            <span className="font-black text-emerald-600 font-mono text-sm">{totalOffersCount}</span>
          </div>
        </div>
      </div>

    </aside>
  );
}
