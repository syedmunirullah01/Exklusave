"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function CouponModal({ isOpen, onClose, offer, store }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen || !offer || !store) return null;

  const isCoupon = offer.type === "Coupon" || Boolean(offer.code);
  const couponCode = offer.code || (isCoupon ? `${(store.name || "DEAL").replace(/[^a-zA-Z0-9]/g, "").toUpperCase()}20` : null);

  const handleCopy = () => {
    if (couponCode && typeof window !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(couponCode).catch(() => {});
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      
      {/* Backdrop overlay click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Dialog Card */}
      <div className="relative z-10 w-full max-w-md sm:max-w-lg overflow-hidden rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-black/8 space-y-6 animate-in zoom-in-95 duration-200">
        
        {/* Top Header Row: Logo Avatar + Offer Title + Close Icon */}
        <div className="flex items-start gap-4 pr-8">
          
          {/* Logo Frame */}
          <div className="grid h-16 w-16 sm:h-20 sm:w-20 shrink-0 place-items-center overflow-hidden rounded-2xl border border-black/8 bg-white p-1 shadow-xs">
            {store.logoImage ? (
              <div className="relative h-full w-full">
                <Image src={store.logoImage} alt={`${store.name} logo`} fill className="object-contain" unoptimized />
              </div>
            ) : (
              <div className="grid h-full w-full place-items-center rounded-xl bg-zinc-900 text-sm font-black text-white">
                {store.logoText || store.name?.charAt(0) || "P"}
              </div>
            )}
          </div>

          {/* Title & Description */}
          <div className="space-y-1 pt-0.5 min-w-0 flex-1">
            <h3 className="text-base sm:text-lg font-black tracking-tight text-zinc-900 leading-snug">
              {offer.title}
            </h3>
            {offer.description ? (
              <p className="text-xs font-medium text-zinc-500 leading-relaxed line-clamp-2">
                {offer.description}
              </p>
            ) : (
              <p className="text-xs font-medium text-zinc-500 leading-relaxed line-clamp-2">
                Save big with verified discount offers for {store.name}.
              </p>
            )}
          </div>

          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 grid h-8 w-8 place-items-center rounded-full bg-zinc-100 text-zinc-500 font-bold hover:bg-zinc-200 hover:text-zinc-900 transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Divider Line */}
        <div className="h-px w-full bg-black/8" />

        {/* Subtitle Message */}
        <div className="text-center space-y-4">
          <p className="text-xs sm:text-sm font-medium text-zinc-600 leading-relaxed max-w-sm mx-auto">
            {isCoupon
              ? `Copy and paste the code into the ${store.name} shopping cart`
              : `No code needed for this deal. Click to visit ${store.name} official store directly.`}
          </p>

          {/* Code Bar Container matching user design */}
          <div className="flex items-center justify-between gap-3 rounded-full bg-zinc-100/90 p-2 pl-5 max-w-sm mx-auto border border-black/5">
            <span className={cn(
              "truncate font-black text-xs sm:text-sm tracking-wider",
              isCoupon ? "text-zinc-900 font-mono" : "text-zinc-700 font-medium"
            )}>
              {isCoupon ? couponCode : "No code needed"}
            </span>

            {isCoupon ? (
              <button
                type="button"
                onClick={handleCopy}
                className={cn(
                  "inline-flex h-9 sm:h-10 px-6 items-center justify-center rounded-full font-black text-xs uppercase tracking-wider text-black shadow-sm transition-all cursor-pointer shrink-0",
                  copied ? "bg-emerald-600 text-white" : "bg-[var(--accent)] text-black hover:scale-105"
                )}
              >
                {copied ? "Copied ✓" : "Copy"}
              </button>
            ) : (
              <a
                href={offer.affiliateLink || store.affiliateLink || "#"}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-9 sm:h-10 px-6 items-center justify-center rounded-full bg-[var(--accent)] font-black text-xs uppercase tracking-wider text-black shadow-sm transition-all hover:scale-105 shrink-0"
              >
                Shop Deal ↗
              </a>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
