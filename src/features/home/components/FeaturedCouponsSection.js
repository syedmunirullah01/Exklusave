"use client";

import { useState, useEffect } from "react";
import SectionHeader from "@/components/shared/SectionHeader";
import FeaturedCouponCard from "./FeaturedCouponCard";

const MOCK_COUPONS = [
  {
    brand: "ISDIN",
    tag: "CODE",
    title: "10% Off Sitewide",
    description: "Get 10% Off Sitewide on your order.",
    code: "ISDIN10",
    affiliateLink: "https://isdin.com",
    logoImage: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=150&q=80",
    logoText: "ISDIN",
    clicksCount: 101,
  },
  {
    brand: "Los Angeles Apparel",
    tag: "DEAL",
    title: "Free Shipping",
    description: "Get Free Shipping On Orders Over $145.",
    code: "",
    affiliateLink: "https://losangelesapparel.net",
    logoImage: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=150&q=80",
    logoText: "LAA",
    clicksCount: 2,
  },
  {
    brand: "Fellow",
    tag: "DEAL",
    title: "25% Off 24V Battery",
    description: "Save up to 25% Off 24V Battery items.",
    code: "",
    affiliateLink: "https://fellowproducts.com",
    logoImage: "",
    logoText: "FELW",
    clicksCount: 21114,
  },
  {
    brand: "Smartwings",
    tag: "DEAL",
    title: "50% Off From $3,700",
    description: "Get 50% Off From $3,700 on select lines.",
    code: "",
    affiliateLink: "https://smartwingshome.com",
    logoImage: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=150&q=80",
    logoText: "SMART",
    clicksCount: 4,
  },
  {
    brand: "Adidas",
    tag: "CODE",
    title: "20% Off Footwear",
    description: "Save 20% on selected Adidas sneakers.",
    code: "ADI20",
    affiliateLink: "https://adidas.com",
    logoImage: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=150&q=80",
    logoText: "ADI",
    clicksCount: 485,
  },
  {
    brand: "Nike",
    tag: "CODE",
    title: "15% Off App Orders",
    description: "Get 15% off on Nike app purchases.",
    code: "NIKE15",
    affiliateLink: "https://nike.com",
    logoImage: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=150&q=80",
    logoText: "NIKE",
    clicksCount: 923,
  },
  {
    brand: "Zarina",
    tag: "DEAL",
    title: "Up to 60% Off Sale",
    description: "Save up to 60% on Zarina summer items.",
    code: "",
    affiliateLink: "https://zarina.ru",
    logoImage: "",
    logoText: "ZARA",
    clicksCount: 88,
  },
  {
    brand: "Colleen Rothschild",
    tag: "CODE",
    title: "20% Off Skincare",
    description: "Save 20% on all Colleen Rothschild items.",
    code: "CR20",
    affiliateLink: "https://colleenrothschild.com",
    logoImage: "https://images.unsplash.com/photo-1556229174-5e42a09e45af?auto=format&fit=crop&w=150&q=80",
    logoText: "COLN",
    clicksCount: 312,
  },
  {
    brand: "Modlily",
    tag: "DEAL",
    title: "Buy 1 Get 1 Free",
    description: "Buy one swimsuit and get second free.",
    code: "",
    affiliateLink: "https://modlily.com",
    logoImage: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=150&q=80",
    logoText: "MOD",
    clicksCount: 190,
  },
  {
    brand: "Gleamin",
    tag: "CODE",
    title: "15% Off Clay Masks",
    description: "Get 15% off Gleamin Vitamin C masks.",
    code: "CLAY15",
    affiliateLink: "https://gleamin.com",
    logoImage: "",
    logoText: "GLEM",
    clicksCount: 54,
  },
];

export default function FeaturedCouponsSection({ featuredCoupons = [], title = "Featured Coupons" }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(4);
  const [isPaused, setIsPaused] = useState(false);

  // Merge real coupons with mock coupons to guarantee exactly 10 items
  const displayedCoupons = [...featuredCoupons];
  for (let i = 0; i < MOCK_COUPONS.length; i++) {
    if (displayedCoupons.length >= 10) break;
    const mock = MOCK_COUPONS[i];
    if (!displayedCoupons.some(c => c.brand?.toLowerCase() === mock.brand.toLowerCase())) {
      displayedCoupons.push(mock);
    }
  }

  const totalItems = displayedCoupons.length;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) setVisibleItems(4);
      else if (window.innerWidth >= 1024) setVisibleItems(3);
      else if (window.innerWidth >= 768) setVisibleItems(2);
      else setVisibleItems(1);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = totalItems - visibleItems;

  useEffect(() => {
    if (maxIndex <= 0 || isPaused) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => {
        if (prev >= maxIndex) {
          return 0;
        }
        return prev + 1;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [maxIndex, isPaused]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  return (
    <section 
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="flex items-center justify-between mb-1">
        <SectionHeader title={title} href="#" />
        
        {/* Navigation Arrows */}
        <div className="flex items-center gap-2 mb-10">
          <button 
            onClick={handlePrev}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-650 transition hover:bg-zinc-50 hover:text-zinc-950 active:scale-95 shadow-sm"
            aria-label="Previous Coupons"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            onClick={handleNext}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-650 transition hover:bg-zinc-50 hover:text-zinc-950 active:scale-95 shadow-sm"
            aria-label="Next Coupons"
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
          {displayedCoupons.map((coupon, idx) => (
            <div 
              key={`${coupon.brand}-${idx}`} 
              className="flex-shrink-0 px-2.5"
              style={{ width: `${100 / visibleItems}%` }}
            >
              <FeaturedCouponCard coupon={coupon} />
            </div>
          ))}
        </div>
      </div>

      {/* Bullet dots indicator */}
      {maxIndex > 0 && (
        <div className="flex items-center justify-center gap-1.5 mt-8">
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
