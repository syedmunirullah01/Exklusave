"use client";

import { useState, useEffect } from "react";
import SectionHeader from "@/components/shared/SectionHeader";
import Link from "next/link";

const CATEGORY_IMAGES = {
  "animals-pets": "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=150&h=150&q=80",
  "apparel-clothing": "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=150&h=150&q=80",
  "appliances-electronics": "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=150&h=150&q=80",
  "arts-crafts": "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=150&h=150&q=80",
  "automotive": "https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&w=150&h=150&q=80",
  "babies-kids": "https://images.unsplash.com/photo-1559251606-c623743a6d76?auto=format&fit=crop&w=150&h=150&q=80",
  "computers-softwares": "https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&w=150&h=150&q=80",
  "electric": "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=150&h=150&q=80",
  "events-entertainment": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=150&h=150&q=80",
  "fashion": "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=150&h=150&q=80",
  "food-drinks": "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=150&h=150&q=80",
  "games-toys": "https://images.unsplash.com/photo-1559251606-c623743a6d76?auto=format&fit=crop&w=150&h=150&q=80",
  "gifts-flowers": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=150&h=150&q=80",
  "health-beauty": "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=150&h=150&q=80",
  "home-garden": "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=150&h=150&q=80",
  "office-supplies": "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=150&h=150&q=80",
  "phone": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=150&h=150&q=80",
  "service": "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=150&h=150&q=80",
  "sports-outdoors": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=150&h=150&q=80",
  "travel-vacations": "https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=150&h=150&q=80",
  "default": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=150&h=150&q=80",
};

export default function TopCategoriesSection() {
  const [categories, setCategories] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(6);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    async function loadCategories() {
      try {
        const res = await fetch("/api/categories", { cache: "no-store" });
        const json = await res.json();
        if (json?.data) {
          setCategories(json.data);
        }
      } catch (err) {
        console.error("Failed to load categories for slider:", err);
      }
    }
    loadCategories();
  }, []);

  const totalItems = categories.length;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) setVisibleItems(6);
      else if (window.innerWidth >= 1024) setVisibleItems(5);
      else if (window.innerWidth >= 768) setVisibleItems(4);
      else if (window.innerWidth >= 640) setVisibleItems(3);
      else setVisibleItems(2);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, totalItems - visibleItems);

  useEffect(() => {
    if (maxIndex <= 0 || isPaused) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => {
        if (prev >= maxIndex) {
          return 0;
        }
        return prev + 1;
      });
    }, 3800);

    return () => clearInterval(interval);
  }, [maxIndex, isPaused]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  if (totalItems === 0) {
    return null;
  }

  return (
    <section 
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="flex items-center justify-between mb-1">
        <SectionHeader title="Top Categories" href="/categories" />
        
        {/* Navigation Arrows */}
        <div className="flex items-center gap-2 mb-3 sm:mb-4">
          <button 
            onClick={handlePrev}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-650 transition hover:bg-zinc-50 hover:text-zinc-950 active:scale-95 shadow-sm cursor-pointer"
            aria-label="Previous Categories"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            onClick={handleNext}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-650 transition hover:bg-zinc-50 hover:text-zinc-950 active:scale-95 shadow-sm cursor-pointer"
            aria-label="Next Categories"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Slider Carousel track wrapper */}
      <div className="w-full overflow-hidden">
        <div 
          className="flex transition-transform duration-700 ease-out"
          style={{ 
            transform: `translateX(-${activeIndex * (100 / visibleItems)}%)` 
          }}
        >
          {categories.map((cat) => {
            const imageSrc = CATEGORY_IMAGES[cat.slug] || CATEGORY_IMAGES["default"];
            return (
              <Link
                key={cat.slug} 
                href={`/categories/${cat.slug}`}
                className="flex-shrink-0 flex flex-col items-center px-3 group select-none"
                style={{ width: `${100 / visibleItems}%` }}
              >
                {/* Circular category icon wrapper - Edge to Edge Image */}
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-zinc-100 flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:scale-105 group-hover:shadow-md cursor-pointer border border-black/8 shadow-xs">
                  <img 
                    src={imageSrc} 
                    alt={cat.name} 
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>

                {/* Title label */}
                <h3 className="text-xs sm:text-[13px] font-bold text-zinc-600 mt-2.5 text-center tracking-tight leading-snug group-hover:text-emerald-600 transition-colors">
                  {cat.name}
                </h3>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Bullet dots indicator */}
      {maxIndex > 0 && (
        <div className="flex items-center justify-center gap-1.5 mt-3.5">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeIndex === i 
                  ? "w-6 bg-emerald-600" 
                  : "w-1.5 bg-zinc-200 hover:bg-zinc-300"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
