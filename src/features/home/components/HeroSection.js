"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { buildCountryPath, COUNTRY_COOKIE_KEY, DEFAULT_COUNTRY_CODE, normalizeCountryCode } from "@/lib/countries";

function SearchIcon({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

function ShieldCheckIcon({ className = "h-4.5 w-4.5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 11 2 2 4-4" />
    </svg>
  );
}

function SparklesIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 text-yellow-400 animate-pulse" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    </svg>
  );
}

function KeyIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 text-[var(--color-primary)]" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="m21 2-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0 1.5 1.5M15.5 7.5 14 6" />
    </svg>
  );
}

const liveTickerItems = [
  "Nike: 42 codes verified 2m ago",
  "Zara: -30% code claimed by user 4m ago",
  "Apple: $150 saving activated in US",
  "Sephora: 18 coupons synced 10m ago",
  "Adidas: -40% deal verified just now"
];

export default function HeroSection() {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const [stores, setStores] = useState([]);
  const [spend, setSpend] = useState(500);
  const [tickerIndex, setTickerIndex] = useState(0);
  const [countryCode] = useState(() => {
    if (typeof document === "undefined") {
      return DEFAULT_COUNTRY_CODE;
    }
    const matchedCookie = document.cookie
      .split("; ")
      .find((entry) => entry.startsWith(`${COUNTRY_COOKIE_KEY}=`))
      ?.split("=")[1];
    return normalizeCountryCode(decodeURIComponent(matchedCookie || DEFAULT_COUNTRY_CODE));
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % liveTickerItems.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let cancelled = false;
    async function loadStores() {
      try {
        const response = await fetch(`/api/stores?country=${countryCode}`, { cache: "no-store" });
        const payload = await response.json();
        if (!cancelled) {
          setStores(Array.isArray(payload.data) ? payload.data : []);
        }
      } catch {
        if (!cancelled) {
          setStores([]);
        }
      }
    }
    loadStores();
    return () => {
      cancelled = true;
    };
  }, [countryCode]);

  function handleSearchSubmit(event) {
    event.preventDefault();
    const rawQuery = searchValue.trim();
    const query = rawQuery.toLowerCase();

    if (!query) {
      router.push(buildCountryPath("/stores", countryCode));
      return;
    }

    const matchedStore = stores.find(
      (store) =>
        store.name?.toLowerCase() === query ||
        store.slug?.toLowerCase() === query
    );

    if (matchedStore) {
      router.push(buildCountryPath(`/stores/${matchedStore.categorySlug}/${matchedStore.slug}`, countryCode));
      return;
    }

    router.push(`${buildCountryPath("/stores", countryCode)}?search=${encodeURIComponent(rawQuery)}`);
  }

  const estimatedSavings = Math.round(spend * 0.28);
  const percent = ((spend - 50) / (2000 - 50)) * 100;

  return (
    <section className="relative grid gap-16 lg:grid-cols-[1.15fr_0.85fr] lg:items-center py-10 lg:py-16 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/4 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(163,230,53,0.12),transparent_70%)] blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.15),transparent_70%)] blur-[100px] pointer-events-none" />

      {/* Left Column: Savings Calculator, Massive Branding & Search */}
      <div className="space-y-10 relative z-10">

        {/* Live Ticker Status Header */}
        <div className="inline-flex items-center gap-3 rounded-2xl border border-zinc-300 bg-zinc-200/50 px-4 py-2 shadow-sm">
          <span className="flex h-2.5 w-2.5 items-center justify-center">
            <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-[var(--color-primary)] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-primary)]" />
          </span>
          <span className="text-xs font-mono tracking-wide text-zinc-850">
            {liveTickerItems[tickerIndex]}
          </span>
        </div>

        {/* Hero Title - Responsive sizes to prevent cutoffs */}
        <div className="space-y-6">
          <h1 className="text-4xl xs:text-5xl sm:text-6xl lg:text-[5.5rem] font-black uppercase leading-[1.0] tracking-[-0.05em] text-[var(--text)]">
            Access The
            <br />
            <span className="bg-gradient-to-r from-[var(--color-primary)] via-emerald-600 to-teal-600 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(22,163,74,0.15)]">
              Unattainable.
            </span>
          </h1>
          <p className="max-w-2xl text-base sm:text-lg leading-relaxed text-zinc-650">
            Exklusave unlocks premium checkout permissions, private promo credentials, and verified member markdowns for global luxury stores and designer boutiques.
          </p>
        </div>

        {/* Search Command input - Responsive flex column on mobile, row on desktop */}
        <form
          onSubmit={handleSearchSubmit}
          className="flex max-w-2xl flex-col sm:flex-row items-stretch sm:items-center gap-3 rounded-2xl sm:rounded-3xl border border-zinc-400 bg-zinc-100 p-2.5 sm:p-2 shadow-[0_20px_40px_rgba(0,0,0,0.04)] transition duration-300 focus-within:border-[var(--color-primary)]/50 focus-within:shadow-[0_0_30px_rgba(22,163,74,0.08)]"
        >
          <div className="flex flex-1 items-center gap-3 px-3 sm:px-4 py-1 sm:py-0">
            <span className="text-zinc-600 shrink-0">
              <KeyIcon />
            </span>
            <input
              type="text"
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
              placeholder="Enter store name..."
              className="w-full min-w-0 bg-transparent text-sm sm:text-base font-bold text-zinc-900 outline-none placeholder:text-zinc-500 placeholder:font-normal"
            />
          </div>
          <button
            type="submit"
            className="h-12 rounded-xl sm:rounded-[22px] bg-[var(--color-primary)] px-8 text-xs font-black uppercase tracking-[0.2em] text-white shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98] shrink-0"
          >
            Search Stores
          </button>
        </form>

        {/* Live Savings Calculator widget */}
        {/* Live Savings Calculator widget - Premium Gift Design */}
        <div className="max-w-2xl rounded-2xl border border-zinc-200 bg-gradient-to-b from-white to-zinc-50/50 p-4 sm:p-5 shadow-[0_20px_40px_rgba(0,0,0,0.03)] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-5 relative group/calc transition-all hover:shadow-[0_24px_50px_rgba(0,0,0,0.055)] hover:border-zinc-300/80">
          
          {/* Left Side: Sparkles Label & Spend Badge */}
          <div className="flex flex-col gap-1.5 min-w-[140px] shrink-0 justify-center">
            <div className="flex items-center gap-1.5 text-zinc-900">
              <span className="text-emerald-500 animate-spin-slow">
                <SparklesIcon />
              </span>
              <span className="text-[10px] font-black uppercase tracking-wider">Live Savings</span>
            </div>
            <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest leading-none">
              Spend Rate / mo
            </div>
          </div>

          {/* Middle: Interactive Slider with Floating Dynamic Value Tooltip */}
          <div className="flex-1 flex flex-col justify-center relative py-5 select-none">
            {/* Real-time Dynamic Tooltip Bubble */}
            <div 
              className="absolute top-0 -mt-1 px-2.5 py-1 bg-emerald-600 text-white text-[11px] font-black rounded-lg shadow-[0_4px_12px_rgba(22,163,74,0.3)] transition-all duration-75 pointer-events-none after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-[4px] after:border-transparent after:border-t-emerald-600 font-mono tracking-tight"
              style={{ 
                left: `${percent}%`, 
                transform: 'translateX(-50%)' 
              }}
            >
              ${spend.toLocaleString()}
            </div>

            <input
              type="range"
              min="50"
              max="2000"
              step="50"
              value={spend}
              onChange={(e) => setSpend(Number(e.target.value))}
              className="w-full h-1.5 rounded-full appearance-none cursor-pointer outline-none transition-all duration-200 custom-range-slider"
              style={{
                background: `linear-gradient(to right, #10b981 ${percent}%, #e4e4e7 ${percent}%)`
              }}
            />
            
            <div className="flex justify-between text-[8px] font-extrabold text-zinc-400 uppercase tracking-widest leading-none mt-2.5">
              <span>$50 Min</span>
              <span>$2,000 Max</span>
            </div>
          </div>

          {/* Right Side: Projected Savings Glowing Capsule Badge */}
          <div className="flex items-center gap-4.5 pl-0 md:pl-5 border-t md:border-t-0 md:border-l border-zinc-200 min-w-[170px] shrink-0 justify-between md:justify-end pt-3 md:pt-0">
            <div className="space-y-0.5 text-left md:text-right leading-none">
              <span className="text-[9px] text-zinc-500 font-extrabold uppercase tracking-wider block">SAVINGS</span>
              <span className="text-[10px] text-zinc-400 font-medium">Projected monthly</span>
            </div>
            <span className="text-xl font-black text-emerald-600 bg-emerald-50 border border-emerald-200/50 px-4 py-2 rounded-xl shadow-sm tracking-tight font-mono transition-transform duration-300 group-hover/calc:scale-[1.04]">
              +${estimatedSavings}
            </span>
          </div>
        </div>

      </div>

      {/* Right Column: Two Staggered Premium Interactive Discount Cards */}
      <div className="hidden lg:grid gap-6 sm:grid-cols-2 relative z-10 lg:pl-4">

        {/* Card 1: Nike Black Pass */}
        <div className="relative group rounded-[32px] border border-white/15 bg-gradient-to-br from-[#121620] via-[#090b10] to-[#040507] p-6 shadow-[0_25px_50px_rgba(0,0,0,0.7)] transition-all duration-500 hover:scale-[1.04] hover:border-[var(--color-primary)]/40 hover:shadow-[0_25px_60px_rgba(163,230,53,0.15)] flex flex-col justify-between min-h-[300px]">
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[32px]" />

          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className="text-[9px] font-black tracking-[0.2em] text-[var(--color-primary)] uppercase">VERIFIED DEAL ACCESS</span>
              <h3 className="text-lg font-black text-white tracking-tight">NIKE PRO MEMBERS</h3>
            </div>
            <div className="flex h-1.5 w-1.5 rounded-full bg-[var(--color-primary)] animate-pulse" />
          </div>

          <div className="my-4">
            <span className="block text-5xl font-black tracking-[-0.05em] text-white">
              -30% OFF
            </span>
            <p className="text-xs text-zinc-400 mt-2 font-medium leading-relaxed">
              Private checkout coupon verified for global stores & partners.
            </p>
          </div>

          <div className="border-t border-white/5 pt-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500">EXKLU MASTER CODE</span>
              <span className="font-mono text-xs font-black uppercase text-[var(--color-primary)] bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 rounded-lg px-3 py-1">
                NIKE30
              </span>
            </div>
            <div className="space-y-1.5">
              <div className="flex justify-between text-[9px] font-bold text-zinc-500 uppercase">
                <span>SUCCESS RATE</span>
                <span className="text-white">84% Claims</span>
              </div>
              <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[var(--color-primary)] to-emerald-400 w-[84%]" />
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Zara Diamond Pass (Staggered layout via translate-y) */}
        <div className="relative group rounded-[32px] border border-white/15 bg-gradient-to-br from-[#201812] via-[#100c09] to-[#070504] p-6 shadow-[0_25px_50px_rgba(0,0,0,0.7)] transition-all duration-500 hover:scale-[1.04] hover:border-amber-500/40 hover:shadow-[0_25px_60px_rgba(245,158,11,0.15)] sm:translate-y-8 flex flex-col justify-between min-h-[300px]">
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[32px]" />

          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className="text-[9px] font-black tracking-[0.2em] text-amber-400 uppercase">DIAMOND VIP</span>
              <h3 className="text-lg font-black text-white tracking-tight">ZARA LUXURY</h3>
            </div>
            <div className="flex h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
          </div>

          <div className="my-4">
            <span className="block text-5xl font-black tracking-[-0.05em] text-white">
              -25% OFF
            </span>
            <p className="text-xs text-zinc-400 mt-2 font-medium leading-relaxed">
              Exclusive site-wide VIP access code released for registered users.
            </p>
          </div>

          <div className="border-t border-white/5 pt-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500">EXKLU MASTER CODE</span>
              <span className="font-mono text-xs font-black uppercase text-amber-400 bg-amber-400/10 border border-amber-400/20 rounded-lg px-3 py-1">
                ZARA25
              </span>
            </div>
            <div className="space-y-1.5">
              <div className="flex justify-between text-[9px] font-bold text-zinc-500 uppercase">
                <span>SUCCESS RATE</span>
                <span className="text-white">91% Claims</span>
              </div>
              <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-amber-400 to-yellow-500 w-[91%]" />
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
