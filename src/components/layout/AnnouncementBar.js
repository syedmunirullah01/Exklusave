"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const DEFAULT_ANNOUNCEMENTS = [
  { text: "Neeman's Comfort Rush Deal - Up To 65% OFF", icon: "🔥", badge: "HOT", href: "/stores" },
  { text: "Vijay Sales AC Festival - Up To 50% Off", icon: "🚨", badge: "SALE", href: "/stores" },
  { text: "Nykaa Hot Pink Sale - Live Now!", icon: "🔥", badge: "LIMITED", href: "/stores" },
  { text: "The Ajiomania Sale | 40-80% Off", icon: "✨", badge: "EXCLUSIVE", href: "/stores" },
  { text: "Exclusive Verified Coupon Codes & Cashbacks", icon: "⚡", badge: "VERIFIED", href: "/stores" },
];

export default function AnnouncementBar() {
  const [items, setItems] = useState(DEFAULT_ANNOUNCEMENTS);

  useEffect(() => {
    let isMounted = true;
    async function fetchTopOffers() {
      try {
        const res = await fetch("/api/offers?limit=8", { cache: "no-store" });
        const json = await res.json();
        if (isMounted && Array.isArray(json?.data) && json.data.length > 0) {
          const mapped = json.data.map((offer) => ({
            text: `${offer.storeName || "Store"}: ${offer.title}`,
            icon: offer.discountTag ? "🔥" : "✨",
            badge: offer.discountTag || "DEAL",
            href: offer.storeSlug ? `/stores/general/${offer.storeSlug}` : "/stores",
          }));
          if (mapped.length >= 3) {
            setItems(mapped);
          }
        }
      } catch (err) {
        // Fallback to defaults
      }
    }
    fetchTopOffers();
    return () => { isMounted = false; };
  }, []);

  // Double the array for seamless marquee looping
  const marqueeItems = [...items, ...items, ...items];

  return (
    <div className="relative z-50 overflow-hidden bg-gradient-to-r from-zinc-950 via-emerald-950 to-zinc-950 border-b border-emerald-900/40 py-2 text-white shadow-sm">
      {/* Side gradient overlays for smooth fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-zinc-950 to-transparent sm:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-zinc-950 to-transparent sm:w-24" />

      <div className="flex w-full overflow-hidden select-none">
        <div className="flex min-w-max shrink-0 animate-[activityMarquee_35s_linear_infinite] items-center gap-8 hover:[animation-play-state:paused]">
          {marqueeItems.map((item, idx) => (
            <Link
              key={idx}
              href={item.href}
              className="inline-flex items-center gap-2.5 text-xs font-semibold text-zinc-200 transition-colors hover:text-emerald-400 group"
            >
              <span className="text-sm">{item.icon}</span>
              <span className="tracking-wide group-hover:underline">{item.text}</span>
              {item.badge && (
                <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[9.5px] font-black uppercase tracking-wider text-emerald-400 border border-emerald-500/30">
                  {item.badge}
                </span>
              )}
              <span className="ml-4 text-zinc-700">|</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
