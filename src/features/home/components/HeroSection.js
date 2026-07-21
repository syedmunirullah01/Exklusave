"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

function ChevronLeftIcon({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

const DEFAULT_BANNERS = [
  {
    id: "b1",
    image: "/banners/banner-1.png",
    alt: "HK Vitals Super Saver Days - Extra 5% Off",
    link: "/stores",
  },
  {
    id: "b2",
    image: "/banners/banner-2.png",
    alt: "Flipkart Minutes - Everything in Minutes at Re 1",
    link: "/stores",
  },
  {
    id: "b3",
    image: "/banners/banner-3.png",
    alt: "Nykaa Hot Pink Sale - Live Offers",
    link: "/stores",
  },
  {
    id: "b4",
    image: "/banners/banner-4.png",
    alt: "Cyber Tech Sale - Up to 60% Off Gadgets",
    link: "/stores",
  },
  {
    id: "b5",
    image: "/banners/banner-5.png",
    alt: "Summer Fashion Fest - Flat 50% Off Apparel",
    link: "/stores",
  },
  {
    id: "b6",
    image: "/banners/banner-6.png",
    alt: "Super Grocery Days - Extra 25% Cashback",
    link: "/stores",
  },
];

export default function HeroSection() {
  const [banners, setBanners] = useState(DEFAULT_BANNERS);
  const [slideIndex, setSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let active = true;
    async function fetchHeroSlides() {
      try {
        const response = await fetch("/api/homepage/hero", { cache: "no-store" });
        const payload = await response.json();
        if (active && payload?.data?.slides && Array.isArray(payload.data.slides) && payload.data.slides.length > 0) {
          const fetchedBanners = payload.data.slides
            .filter((s) => s.image || s.bannerImage)
            .map((s, idx) => ({
              id: s.id || `banner-${idx}`,
              image: s.image || s.bannerImage,
              alt: s.title || `Promotional Banner ${idx + 1}`,
              link: s.link || "/stores",
            }));
          if (fetchedBanners.length > 0) {
            setBanners(fetchedBanners);
          }
        }
      } catch {
        // Fallback to DEFAULT_BANNERS
      }
    }
    fetchHeroSlides();
    return () => {
      active = false;
    };
  }, []);

  const totalSlides = banners.length;

  useEffect(() => {
    if (isPaused || totalSlides <= 1) return;
    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % totalSlides);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused, totalSlides]);

  const handlePrev = () => {
    setSlideIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const handleNext = () => {
    setSlideIndex((prev) => (prev + 1) % totalSlides);
  };

  const banner1 = banners[slideIndex] || DEFAULT_BANNERS[0];
  const banner2 = banners[(slideIndex + 1) % banners.length] || DEFAULT_BANNERS[1];

  return (
    <section 
      className="relative py-1 sm:py-2 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative w-full">
        {/* Responsive Banner Grid (1 on mobile, 2 side-by-side on desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {/* Main Banner (Visible on Mobile & Desktop) */}
          <Link
            href={banner1.link || "/stores"}
            className="group relative block w-full aspect-[1.85/1] sm:aspect-[2.1/1] rounded-2xl overflow-hidden border border-zinc-200 shadow-sm bg-zinc-900 transition-all duration-300 hover:shadow-lg hover:border-violet-300"
          >
            <Image
              src={banner1.image}
              alt={banner1.alt || "Promotional Banner"}
              fill
              priority
              className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              unoptimized
            />
          </Link>

          {/* Secondary Banner (Hidden on Mobile, Visible on Desktop) */}
          <Link
            href={banner2.link || "/stores"}
            className="group relative hidden md:block w-full aspect-[1.85/1] sm:aspect-[2.1/1] rounded-2xl overflow-hidden border border-zinc-200 shadow-sm bg-zinc-900 transition-all duration-300 hover:shadow-lg hover:border-violet-300"
          >
            <Image
              src={banner2.image}
              alt={banner2.alt || "Promotional Banner"}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              unoptimized
            />
          </Link>
        </div>

        {/* Floating Navigation Arrows */}
        {totalSlides > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              className="absolute -left-2 sm:left-2 top-1/2 -translate-y-1/2 grid h-9 w-9 sm:h-11 sm:w-11 place-items-center rounded-full border border-zinc-300 bg-white/90 text-zinc-800 backdrop-blur-md transition-all hover:bg-violet-600 hover:text-white hover:border-violet-600 hover:scale-105 active:scale-95 shadow-md cursor-pointer z-10"
              aria-label="Previous Slide"
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="absolute -right-2 sm:right-2 top-1/2 -translate-y-1/2 grid h-9 w-9 sm:h-11 sm:w-11 place-items-center rounded-full border border-zinc-300 bg-white/90 text-zinc-800 backdrop-blur-md transition-all hover:bg-violet-600 hover:text-white hover:border-violet-600 hover:scale-105 active:scale-95 shadow-md cursor-pointer z-10"
              aria-label="Next Slide"
            >
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </>
        )}

        {/* Slide Indicators */}
        {totalSlides > 1 && (
          <div className="mt-3 flex items-center justify-center gap-1.5 z-10">
            {banners.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSlideIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === slideIndex ? "w-6 bg-violet-600" : "w-2 bg-zinc-300 hover:bg-zinc-400"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
