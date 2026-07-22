"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const FALLBACK_ANNOUNCEMENT_ITEMS = [
  { text: "HK Vitals Extra 15% Off", icon: "🔥", badge: "HOT", href: "/stores" },
  { text: "Ajio Fashion Sale", icon: "✨", badge: "SALE", href: "/stores" },
  { text: "Neeman's Extra 10% Off", icon: "🔥", badge: "DISCOUNT", href: "/stores" },
  { text: "Vijay Sales Tech Deals", icon: "⚡", badge: "SALE", href: "/stores" },
  { text: "Nykaa Hot Pink Sale", icon: "✨", badge: "HOT", href: "/stores" },
];

function parseAnnouncementItem(rawString) {
  const trimmed = rawString.trim();
  if (!trimmed) return null;

  let icon = "✨";
  let text = trimmed;

  const emojiRegex = /^([\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}])/u;
  const match = trimmed.match(emojiRegex);
  if (match) {
    icon = match[1];
    text = trimmed.replace(emojiRegex, "").trim();
  } else if (trimmed.includes("🔥")) {
    icon = "🔥";
    text = trimmed.replace("🔥", "").trim();
  } else if (trimmed.includes("⚡")) {
    icon = "⚡";
    text = trimmed.replace("⚡", "").trim();
  } else if (trimmed.includes("🚨")) {
    icon = "🚨";
    text = trimmed.replace("🚨", "").trim();
  }

  let badge = "DEAL";
  if (text.toLowerCase().includes("hot")) badge = "HOT";
  else if (text.toLowerCase().includes("sale")) badge = "SALE";
  else if (text.toLowerCase().includes("off")) badge = "DISCOUNT";
  else if (text.toLowerCase().includes("free")) badge = "FREE";

  return {
    text,
    icon,
    badge,
    href: "/stores",
  };
}

export default function AnnouncementBar() {
  const [items, setItems] = useState(FALLBACK_ANNOUNCEMENT_ITEMS);
  const [enabled, setEnabled] = useState(true);
  const [gapPx, setGapPx] = useState(48);
  const [durationSec, setDurationSec] = useState("35s");

  useEffect(() => {
    let isMounted = true;

    async function loadAnnouncementData() {
      try {
        const res = await fetch("/api/homepage/sections", { cache: "no-store" });
        const json = await res.json();
        const marquee = json?.data?.marquee;

        if (marquee?.enabled === false) {
          if (isMounted) setEnabled(false);
          return;
        }

        const gap = Number(marquee?.gap) || 48;
        const speedMap = { slow: "55s", normal: "35s", fast: "20s" };
        const duration = speedMap[marquee?.speed] || "35s";

        if (isMounted) {
          setGapPx(gap);
          setDurationSec(duration);
        }

        if (marquee?.text && marquee.text.trim().length > 0) {
          const rawParts = marquee.text.split("|");
          const parsed = rawParts.map(parseAnnouncementItem).filter(Boolean);

          if (parsed.length > 0 && isMounted) {
            setItems(parsed);
            return;
          }
        }
      } catch {
        // Keep fallback silently
      }
    }

    loadAnnouncementData();

    return () => {
      isMounted = false;
    };
  }, []);

  if (!enabled || items.length === 0) {
    return null;
  }

  const marqueeItems = [...items, ...items, ...items, ...items];

  return (
    <div className="relative z-50 overflow-hidden bg-gradient-to-r from-zinc-950 via-emerald-950 to-zinc-950 border-b border-emerald-900/40 py-2 text-white shadow-xs">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-zinc-950 to-transparent sm:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-zinc-950 to-transparent sm:w-24" />

      <div className="flex w-full overflow-hidden select-none">
        <div
          className="flex min-w-max shrink-0 animate-[activityMarquee_35s_linear_infinite] items-center hover:[animation-play-state:paused]"
          style={{
            animationDuration: durationSec,
            gap: `${gapPx}px`,
          }}
        >
          {marqueeItems.map((item, idx) => (
            <Link
              key={idx}
              href={item.href}
              className="inline-flex items-center text-xs font-semibold text-zinc-200 transition-colors hover:text-emerald-400 group shrink-0"
              style={{ gap: "10px" }}
            >
              <span className="text-sm">{item.icon}</span>
              <span className="tracking-wide group-hover:underline">{item.text}</span>
              {item.badge && (
                <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[9.5px] font-black uppercase tracking-wider text-emerald-400 border border-emerald-500/30">
                  {item.badge}
                </span>
              )}
              <span className="text-zinc-700" style={{ marginLeft: `${Math.max(12, gapPx / 2)}px` }}>|</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
