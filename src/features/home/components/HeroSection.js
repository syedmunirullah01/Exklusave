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
    alt: "Mega Sale Up to 70% Off",
    link: "/stores",
  },
  {
    id: "b2",
    image: "/banners/banner-2.png",
    alt: "Summer Fashion & Apparel Deals",
    link: "/categories",
  },
  {
    id: "b3",
    image: "/banners/banner-3.png",
    alt: "Tech Cyber Sale & Verified Vouchers",
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

  useEffect(() => {
    if (isPaused || banners.length <= 1) return;
    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % banners.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused, banners.length]);

  const handlePrev = () => {
    setSlideIndex((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSlideIndex((prev) => (prev + 1) % banners.length);
  };

  const activeBanner = banners[slideIndex] || DEFAULT_BANNERS[0];

  return (
    <section 
      className="relative py-3 sm:py-6 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Pure Graphic Banner Container */}
      <div className="relative w-full aspect-[1.6/1] sm:aspect-[2.4/1] md:aspect-[3/1] max-h-[480px] rounded-2xl sm:rounded-3xl border border-black/8 overflow-hidden bg-zinc-950 shadow-md group">
        
        {/* Banner Link & Full Cover Image */}
        <Link href={activeBanner.link || "/stores"} className="block relative h-full w-full">
          <Image
            src={activeBanner.image}
            alt={activeBanner.alt || "Promotional Banner"}
            fill
            priority
            className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            unoptimized
          />
        </Link>

        {/* Navigation Arrows */}
        {banners.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 grid h-10 w-10 sm:h-12 sm:w-12 place-items-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-md transition-all hover:bg-white hover:text-black hover:scale-105 active:scale-95 shadow-lg opacity-80 hover:opacity-100 cursor-pointer z-10"
              aria-label="Previous Banner"
            >
              <ChevronLeftIcon className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 grid h-10 w-10 sm:h-12 sm:w-12 place-items-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-md transition-all hover:bg-white hover:text-black hover:scale-105 active:scale-95 shadow-lg opacity-80 hover:opacity-100 cursor-pointer z-10"
              aria-label="Next Banner"
            >
              <ChevronRightIcon className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
          </>
        )}

        {/* Carousel Dot Indicators */}
        {banners.length > 1 && (
          <div className="absolute bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10 bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
            {banners.map((b, idx) => (
              <button
                key={b.id || idx}
                type="button"
                onClick={() => setSlideIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === slideIndex ? "w-7 bg-emerald-500" : "w-2 bg-white/50 hover:bg-white"
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
