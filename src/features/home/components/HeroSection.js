"use client";

import { useEffect, useState } from "react";

function ChevronLeftIcon({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function CopyCheckIcon({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m20 6-11 11-5-5" />
    </svg>
  );
}

const promoBanners = [
  {
    id: "b1",
    badge: "FLASH SALE • LIVE NOW",
    badgeBg: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
    accentBg: "bg-emerald-500",
    title: "NIKE AIR & ATHLETICS",
    subtitle: "Exclusive verified promo codes & member-only markdowns on premium footwear & sportswear.",
    discount: "-50% OFF",
    discountSub: "MAX SAVINGS",
    code: "NIKE50",
    bgGradient: "from-[#0c2417] via-[#08170f] to-[#040b07]",
    glowColor: "rgba(16,185,129,0.22)",
    accentText: "text-emerald-400",
    accentBorder: "border-emerald-500/30",
    progressBar: "bg-gradient-to-r from-emerald-500 to-teal-400",
    claims: "88% Claims Today",
    claimsWidth: "88%",
  },
  {
    id: "b2",
    badge: "LUXURY SPOTLIGHT • VIP ACCESS",
    badgeBg: "bg-amber-500/10 border-amber-500/30 text-amber-400",
    accentBg: "bg-amber-500",
    title: "ZARA & BOUTIQUE FASHION",
    subtitle: "Unlock site-wide VIP access codes for new season luxury arrivals & designer edits.",
    discount: "-35% OFF",
    discountSub: "FLAT DISCOUNT",
    code: "ZARA35",
    bgGradient: "from-[#28180c] via-[#180e07] to-[#0a0503]",
    glowColor: "rgba(245,158,11,0.22)",
    accentText: "text-amber-400",
    accentBorder: "border-amber-500/30",
    progressBar: "bg-gradient-to-r from-amber-400 to-yellow-500",
    claims: "94% Claims Today",
    claimsWidth: "94%",
  },
  {
    id: "b3",
    badge: "TECH DEALS • TRENDING",
    badgeBg: "bg-sky-500/10 border-sky-500/30 text-sky-400",
    accentBg: "bg-sky-500",
    title: "APPLE & PREMIUM TECH",
    subtitle: "Verified member vouchers for laptops, noise-canceling audio gear & wearables.",
    discount: "$250 OFF",
    discountSub: "SAVE UP TO",
    code: "TECH250",
    bgGradient: "from-[#0d2238] via-[#071321] to-[#030912]",
    glowColor: "rgba(56,189,248,0.22)",
    accentText: "text-sky-400",
    accentBorder: "border-sky-500/30",
  },
];

export default function HeroSection() {
  const [slides, setSlides] = useState(promoBanners);
  const [slideIndex, setSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [copiedCode, setCopiedCode] = useState(null);

  useEffect(() => {
    let active = true;
    async function fetchHeroSlides() {
      try {
        const response = await fetch("/api/homepage/hero", { cache: "no-store" });
        const payload = await response.json();
        if (active && payload?.data?.slides && Array.isArray(payload.data.slides) && payload.data.slides.length > 0) {
          const formattedSlides = payload.data.slides.map((s, idx) => ({
            id: s.id || `slide-${idx}`,
            badge: s.badge || "PROMO DEAL • LIVE NOW",
            badgeBg: s.badgeBg || "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
            accentBg: s.accentBg || "bg-emerald-500",
            title: s.title || "EXCLUSIVE CAMPAIGN",
            subtitle: s.description || "Verified promotional vouchers and member discounts.",
            discount: s.discount || "-30% OFF",
            discountSub: s.kicker || "SPECIAL DEAL",
            code: s.code || "SAVE30",
            image: s.image || "",
            bgGradient: s.bgGradient || "from-[#0c2417] via-[#08170f] to-[#040b07]",
            glowColor: s.glowColor || "rgba(16,185,129,0.22)",
            accentText: s.accentText || "text-emerald-400",
            progressBar: s.progressBar || "bg-gradient-to-r from-emerald-500 to-teal-400",
            claims: s.claims || "90% Claims Today",
            claimsWidth: s.claimsWidth || "90%",
            link: s.link || "",
          }));
          setSlides(formattedSlides);
        }
      } catch {
        // Fallback to promoBanners
      }
    }
    fetchHeroSlides();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (isPaused || slides.length <= 1) return;
    const slideInterval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % slides.length);
    }, 3800);
    return () => clearInterval(slideInterval);
  }, [isPaused, slides.length]);

  function handleCopy(code) {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(code);
    }
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  }

  function handlePrevSlide() {
    setSlideIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }

  function handleNextSlide() {
    setSlideIndex((prev) => (prev + 1) % slides.length);
  }

  const activeBanner = slides[slideIndex] || promoBanners[0];

  return (
    <section 
      className="relative py-4 sm:py-8 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/4 h-[400px] sm:h-[600px] w-[400px] sm:w-[600px] rounded-full bg-[radial-gradient(circle,rgba(163,230,53,0.14),transparent_70%)] blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 h-[400px] sm:h-[600px] w-[400px] sm:w-[600px] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.14),transparent_70%)] blur-[100px] pointer-events-none" />

      {/* Full-Width Large Hero Banner Card */}
      <div 
        className={`relative overflow-hidden rounded-[28px] sm:rounded-[44px] border border-white/15 bg-gradient-to-br ${activeBanner.bgGradient || 'from-[#0c2417] via-[#08170f] to-[#040b07]'} p-5 sm:p-10 lg:p-14 shadow-[0_25px_70px_rgba(0,0,0,0.65)] transition-all duration-700 min-h-[360px] sm:min-h-[460px] lg:min-h-[500px] flex flex-col justify-between group`}
        style={{
          boxShadow: `0 25px 80px -10px ${activeBanner.glowColor || 'rgba(16,185,129,0.22)'}, 0 20px 40px rgba(0,0,0,0.85)`
        }}
      >
        {/* If custom banner image is provided, display background image with overlay */}
        {activeBanner.image ? (
          <div 
            className="absolute inset-0 bg-cover bg-center transition-all duration-700 opacity-30 group-hover:scale-105"
            style={{ backgroundImage: `url(${activeBanner.image})` }}
          />
        ) : null}

        {/* Background Glowing Orb & Grid Texture */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.06),transparent_60%)] pointer-events-none rounded-[28px] sm:rounded-[44px]" />
        <div 
          className="absolute -right-24 -top-24 h-72 sm:h-96 w-72 sm:w-96 rounded-full blur-[90px] pointer-events-none transition-all duration-700" 
          style={{ backgroundColor: activeBanner.glowColor || 'rgba(16,185,129,0.22)' }} 
        />

        {/* Top Header: Live Badge & Slide Counter */}
        <div className="relative z-10 flex items-center justify-between gap-2">
          <div className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 sm:px-4 sm:py-2 text-[10px] sm:text-xs font-black uppercase tracking-[0.16em] ${activeBanner.badgeBg} shadow-sm backdrop-blur-md`}>
            <span className="flex h-2 w-2 rounded-full bg-current animate-ping" />
            <span className="truncate max-w-[200px] sm:max-w-none">{activeBanner.badge}</span>
          </div>

          <div className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 sm:px-4 sm:py-1.5 text-[10px] sm:text-xs font-mono font-bold text-white/80 backdrop-blur-md shrink-0">
            <span className={activeBanner.accentText}>{String(slideIndex + 1).padStart(2, '0')}</span>
            <span>/</span>
            <span>{String(slides.length).padStart(2, '0')}</span>
          </div>
        </div>

        {/* Middle Content: Big Headline, Subtitle, Discount Highlight & Interactive CTA */}
        <div className="relative z-10 my-4 sm:my-8 grid gap-4 sm:gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
          {/* Main Info */}
          <div className="space-y-3 sm:space-y-6">
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-[0.2em] text-white/50">{activeBanner.discountSub}</span>
              <span className={`text-[10px] sm:text-xs font-black uppercase tracking-wider px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-lg border ${activeBanner.badgeBg}`}>VERIFIED TODAY</span>
            </div>

            <div className="space-y-1.5 sm:space-y-3">
              <h1 className="text-2xl sm:text-5xl lg:text-7xl font-black uppercase tracking-[-0.04em] text-white leading-[1.05] sm:leading-[1.0] drop-shadow-lg">
                {activeBanner.title}
              </h1>
              <p className="max-w-2xl text-xs sm:text-base lg:text-lg leading-relaxed text-zinc-300 font-medium line-clamp-3 sm:line-clamp-none">
                {activeBanner.subtitle}
              </p>
            </div>
          </div>

          {/* Right Side: Huge Discount Pill & Code Box */}
          <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-3 sm:gap-6 pt-2 sm:pt-0">
            <div className="text-left lg:text-right">
              <span className="block text-3xl sm:text-6xl lg:text-8xl font-black tracking-[-0.05em] text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                {activeBanner.discount}
              </span>
            </div>

            {/* Quick Action Code Box */}
            <div className="w-auto sm:w-full max-w-sm rounded-2xl sm:rounded-3xl border border-white/15 bg-black/50 p-2.5 sm:p-4 backdrop-blur-xl space-y-2 sm:space-y-3 shadow-2xl">
              <div className="hidden sm:flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-zinc-400">
                <span>PERSUE MASTER CODE</span>
                <span className="text-emerald-400">LIVE CLAIM</span>
              </div>
              
              <div className="flex items-center gap-2 sm:gap-3">
                <span className={`font-mono text-sm sm:text-xl lg:text-2xl font-black uppercase ${activeBanner.accentText} tracking-wider px-1`}>
                  {activeBanner.code}
                </span>

                <button
                  type="button"
                  onClick={() => handleCopy(activeBanner.code)}
                  className={`h-9 sm:h-12 px-3 sm:px-6 rounded-xl sm:rounded-2xl font-black text-[10px] sm:text-xs uppercase tracking-[0.14em] transition-all duration-200 flex items-center justify-center gap-1.5 sm:gap-2 shadow-xl shrink-0 ${
                    copiedCode === activeBanner.code
                      ? "bg-emerald-500 text-black border border-emerald-400"
                      : "bg-white text-black hover:bg-zinc-100 hover:scale-[1.03] active:scale-[0.97]"
                  }`}
                >
                  {copiedCode === activeBanner.code ? (
                    <>
                      <CopyCheckIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      COPIED
                    </>
                  ) : (
                    "COPY"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Community Claims Progress & Nav Controls */}
        <div className="relative z-10 pt-3 sm:pt-6 border-t border-white/10 flex flex-row items-center justify-between gap-3 sm:gap-6">
          
          {/* Community Meter */}
          <div className="flex-1 max-w-md space-y-1 sm:space-y-2">
            <div className="flex justify-between text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-zinc-400">
              <span className="truncate">COMMUNITY VERIFIED</span>
              <span className="text-white font-mono shrink-0 ml-1">{activeBanner.claims}</span>
            </div>
            <div className="h-1.5 sm:h-2 w-full rounded-full bg-white/10 overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-700 ${activeBanner.progressBar}`} 
                style={{ width: activeBanner.claimsWidth }} 
              />
            </div>
          </div>

          {/* Pagination Dots & Navigation Buttons */}
          <div className="flex items-center gap-3 sm:gap-6 shrink-0">
            {/* Slide Dots */}
            <div className="flex items-center gap-1.5 sm:gap-2.5">
              {slides.map((banner, index) => (
                <button
                  key={banner.id}
                  type="button"
                  onClick={() => setSlideIndex(index)}
                  className={`h-2 sm:h-2.5 rounded-full transition-all duration-300 ${
                    index === slideIndex 
                      ? `w-6 sm:w-10 ${banner.accentBg || 'bg-emerald-500'}` 
                      : "w-2 sm:w-2.5 bg-white/30 hover:bg-white/60"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Navigation Arrows */}
            <div className="hidden sm:flex items-center gap-2.5">
              <button
                type="button"
                onClick={handlePrevSlide}
                className="grid h-11 w-11 place-items-center rounded-2xl border border-white/15 bg-black/40 text-white transition-all hover:bg-white hover:text-black hover:scale-105 active:scale-95 backdrop-blur-md"
                aria-label="Previous slide"
              >
                <ChevronLeftIcon className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={handleNextSlide}
                className="grid h-11 w-11 place-items-center rounded-2xl border border-white/15 bg-black/40 text-white transition-all hover:bg-white hover:text-black hover:scale-105 active:scale-95 backdrop-blur-md"
                aria-label="Next slide"
              >
                <ChevronRightIcon className="h-5 w-5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
