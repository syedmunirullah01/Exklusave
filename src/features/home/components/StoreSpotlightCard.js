"use client";

import { useState } from "react";
import Link from "next/link";

export default function StoreSpotlightCard({ store }) {
  const [imgError, setImgError] = useState(false);

  const shortMark = (store.logoText || store.name)
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <Link
      href={store.href ?? `/stores/general/${store.slug || store.name?.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
      className="group relative block overflow-hidden rounded-[24px] border border-black/8 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-emerald-500/30"
    >
      <div className="flex flex-col items-center p-5 text-center min-h-[190px] justify-between">
        {/* Auto-Fit Logo Container */}
        <div className="relative flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center overflow-hidden rounded-[18px] border border-black/8 bg-white p-1 transition-transform duration-300 group-hover:scale-105 shadow-xs">
          {store.logoImage && !imgError ? (
            <img 
              src={store.logoImage} 
              alt={`${store.name} logo`} 
              onError={() => setImgError(true)}
              className="w-full h-full object-contain p-0.5" 
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-gradient-to-br from-zinc-800 to-black text-white font-black text-sm uppercase">
              <span>{shortMark}</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col items-center w-full mt-3">
          <h3 className="text-[12px] font-black uppercase tracking-[0.08em] text-zinc-900 transition-colors duration-300 group-hover:text-emerald-600 truncate max-w-full w-full px-1">
            {store.name}
          </h3>
          <p className="text-[9px] font-extrabold uppercase tracking-wider text-emerald-600 mt-1">
            COUPON CODE
          </p>
          
          {/* Minimalist horizontal underline */}
          <div className="w-8 h-[2px] bg-zinc-200 mt-3 transition-colors duration-300 group-hover:bg-emerald-500" />
        </div>
      </div>
    </Link>
  );
}
