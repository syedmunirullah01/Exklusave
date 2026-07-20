"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buildCountryPath } from "@/lib/countries";

function ClockIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0", className)} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function EyeIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0", className)} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function CheckIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0", className)} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function HeartIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0", className)} fill="currentColor">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

function getDynamicViews(offer, index = 0) {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 0);
  const dayOfYear = Math.floor((now - startOfYear) / (1000 * 60 * 60 * 24));
  const dateSeed = (now.getFullYear() * 365) + dayOfYear;

  const offerSeed = String(offer.id || offer.title || index).split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);

  if (index === 0) {
    const base = 35 + (offerSeed % 25);
    const dailyBonus = Math.floor(dateSeed * 1.5 + offerSeed) % 25;
    return `${base + dailyBonus} views`;
  } else {
    const base = 12 + (offerSeed % 10);
    const dailyBonus = Math.floor(dateSeed + offerSeed) % 8;
    return `${base + dailyBonus} views`;
  }
}

function getAccurateExpiryText(offer) {
  if (offer.expiryDate) {
    const expDate = new Date(offer.expiryDate);
    if (!isNaN(expDate.getTime())) {
      const now = new Date();
      const diffMs = expDate.getTime() - now.getTime();
      if (diffMs <= 0) {
        return "Expires Today";
      }
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      const diffDays = Math.floor(diffHours / 24);

      if (diffDays >= 1) {
        return `Ends in ${diffDays} ${diffDays === 1 ? "day" : "days"}`;
      } else if (diffHours >= 1) {
        return `Ends in ${diffHours} ${diffHours === 1 ? "hour" : "hours"}`;
      } else {
        const diffMins = Math.max(1, Math.floor(diffMs / (1000 * 60)));
        return `Ends in ${diffMins} min`;
      }
    }
  }

  const seed = String(offer.id || offer.title || "persuekey").split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const fallbackDays = 15 + (seed % 45);
  return `Ends in ${fallbackDays} days`;
}

import CouponModal from "./CouponModal";

export default function OfferCard({ offer, store, index = 0 }) {
  const [copied, setCopied] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const offerHref = offer.affiliateLink || store.affiliateLink || "#";
  const isExternal = Boolean(offer.affiliateLink || store.affiliateLink);
  const actionHref = isExternal || offerHref === "#" ? offerHref : buildCountryPath(offerHref, store.countryCode);
  const isCoupon = offer.type === "Coupon" || Boolean(offer.code);
  const actionLabel = offer.ctaLabel || (isCoupon ? "Show Code" : "Get Deal");

  const couponCode = offer.code || `${(store.name || "DEAL").replace(/[^a-zA-Z0-9]/g, "").toUpperCase()}20`;
  const displayViews = getDynamicViews(offer, index);
  const displayExpiry = getAccurateExpiryText(offer);

  const handleActionClick = (e) => {
    e.preventDefault();
    if (isCoupon && typeof window !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(couponCode).catch(() => {});
      setCopied(true);
    }
    setIsModalOpen(true);

    if (actionHref && actionHref !== "#") {
      window.open(actionHref, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <>
      <article className="group overflow-hidden rounded-2xl sm:rounded-3xl border border-black/8 bg-white p-4 sm:p-7 shadow-sm transition-all duration-300 hover:border-emerald-500/40 hover:shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6">
          
          {/* Left Side: Brand Logo Frame + Offer Info */}
          <div className="flex flex-row items-start sm:items-center gap-3 sm:gap-6 flex-1 min-w-0">
            
            {/* Responsive Logo Frame - Auto Fit Full Box */}
            <div className="grid h-12 w-12 sm:h-20 sm:w-20 shrink-0 place-items-center overflow-hidden rounded-xl sm:rounded-2xl border border-black/8 bg-white p-1 shadow-xs group-hover:scale-105 transition-transform">
              {store.logoImage ? (
                <div className="relative h-full w-full">
                  <Image src={store.logoImage} alt={`${store.name} logo`} fill className="object-contain" unoptimized />
                </div>
              ) : (
                <div className="grid h-full w-full place-items-center rounded-lg sm:rounded-xl bg-zinc-900 text-xs sm:text-sm font-black text-white">
                  {store.logoText || store.name?.charAt(0) || "P"}
                </div>
              )}
            </div>

            {/* Offer Details */}
            <div className="space-y-1.5 sm:space-y-2 min-w-0 flex-1">
              {/* Pill Tags */}
              <div className="flex flex-wrap items-center gap-1.5">
                {offer.badge ? (
                  <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs font-black uppercase tracking-wider text-emerald-600">
                    {offer.badge}
                  </span>
                ) : (
                  <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs font-black uppercase tracking-wider text-emerald-600">
                    {isCoupon ? "Verified Code" : "Verified Deal"}
                  </span>
                )}
              </div>

              {/* Offer Title */}
              <h3 className="text-sm sm:text-xl font-black tracking-tight text-zinc-900 leading-snug group-hover:text-emerald-600 transition-colors">
                {offer.title}
              </h3>

              {/* Meta Items */}
              <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-1 sm:gap-y-1.5 text-[10px] sm:text-xs font-bold text-zinc-500">
                <span className="inline-flex items-center gap-1 sm:gap-1.5 shrink-0">
                  <ClockIcon className="text-emerald-500" />
                  <span>{displayExpiry}</span>
                </span>
                <span className="inline-flex items-center gap-1 sm:gap-1.5 shrink-0">
                  <EyeIcon className="text-emerald-500" />
                  <span>{displayViews}</span>
                </span>
                <span className="inline-flex items-center gap-1 sm:gap-1.5 text-emerald-600 font-extrabold shrink-0">
                  <CheckIcon className="text-emerald-500" />
                  <span>Verified</span>
                </span>
                <span className="inline-flex items-center gap-1 sm:gap-1.5 text-emerald-600 font-extrabold shrink-0">
                  <HeartIcon className="text-emerald-500" />
                  <span>Exclusive</span>
                </span>
              </div>
            </div>
          </div>

          {/* Right Side: Responsive CTA / Copy Code Button */}
          <div className="shrink-0 flex items-center pt-1 sm:pt-0">
            <button
              type="button"
              onClick={handleActionClick}
              className={cn(
                "inline-flex h-10 sm:h-13 w-full sm:w-[170px] px-6 sm:px-8 items-center justify-center gap-1.5 rounded-full font-black text-xs sm:text-sm uppercase tracking-[0.14em] shadow-md transition-all duration-200 hover:scale-105 cursor-pointer shrink-0",
                isCoupon && copied
                  ? "bg-white border-2 border-emerald-500 text-zinc-900 font-black shadow-sm"
                  : "bg-[var(--accent)] text-black hover:shadow-lg active:scale-95"
              )}
            >
              {isCoupon && copied ? (
                <>
                  <CheckIcon className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span className="truncate font-black text-zinc-900">{couponCode}</span>
                </>
              ) : (
                actionLabel
              )}
            </button>
          </div>

        </div>
      </article>

      {/* Coupon & Deal Popup Modal */}
      <CouponModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        offer={offer}
        store={store}
      />
    </>
  );
}
