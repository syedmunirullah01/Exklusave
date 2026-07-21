"use client";

import { useState, useEffect } from "react";
import SectionHeader from "@/components/shared/SectionHeader";

const BEAUTY_PRODUCTS = [
  {
    name: "L'Oreal Paris Extraordinary Oil Hair Serum",
    brand: "Loreal Paris",
    image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=400&q=80",
    price: 15,
    oldPrice: 28,
    discount: "45% off",
    cashbackText: "After Rewards of $2",
    bestPrice: 13,
  },
  {
    name: "Sebamed Clear Face Care Gel Ph 5.5 Acne Prone Skin Care",
    brand: "Sebamed",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=400&q=80",
    price: 18,
    oldPrice: 22,
    discount: "18% off",
    cashbackText: "After Rewards of $3",
    bestPrice: 15,
  },
  {
    name: "Neutrogena Ultrasheer Sunscreen SPF 50+",
    brand: "Neutrogena",
    image: "https://images.unsplash.com/photo-1556229174-5e42a09e45af?auto=format&fit=crop&w=400&q=80",
    price: 10,
    oldPrice: 14,
    discount: "28% off",
    cashbackText: "After Cashback of $1",
    bestPrice: 9,
  },
  {
    name: "WishCare Niacinamide Oil Balance Fluid Sunscreen SPF 50+",
    brand: "WishCare",
    image: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=400&q=80",
    price: 14,
    oldPrice: 20,
    discount: "30% off",
    cashbackText: "After Cashback of $2",
    bestPrice: 12,
  },
  {
    name: "Cetaphil Sun SPF 50 Very High Protection Light Gel",
    brand: "Cetaphil",
    image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=400&q=80",
    price: 45,
    oldPrice: 52,
    discount: "13% off",
    cashbackText: "After Rewards of $6",
    bestPrice: 39,
  },
  {
    name: "The Derma Co 1% Salicylic Acid Gel Face Wash",
    brand: "The Derma Co",
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=400&q=80",
    price: 9,
    oldPrice: 12,
    discount: "25% off",
    cashbackText: "After Cashback of $1",
    bestPrice: 8,
  },
  {
    name: "Plum Green Tea Pore Cleansing Face Wash",
    brand: "Plum",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=400&q=80",
    price: 12,
    oldPrice: 16,
    discount: "25% off",
    cashbackText: "After Rewards of $2",
    bestPrice: 10,
  },
  {
    name: "Minimalist 10% Niacinamide Face Serum",
    brand: "Minimalist",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=400&q=80",
    price: 22,
    oldPrice: 28,
    discount: "21% off",
    cashbackText: "After Cashback of $3",
    bestPrice: 19,
  },
  {
    name: "Pilgrim Salicylic Acid & Chamomile Face Mist",
    brand: "Pilgrim",
    image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=400&q=80",
    price: 13,
    oldPrice: 18,
    discount: "27% off",
    cashbackText: "After Rewards of $2",
    bestPrice: 11,
  },
  {
    name: "Biotique Morning Nectar Flawless Skin Lotion",
    brand: "Biotique",
    image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=400&q=80",
    price: 8,
    oldPrice: 11,
    discount: "27% off",
    cashbackText: "After Cashback of $1",
    bestPrice: 7,
  },
];

export default function TopSellingBeautyProductsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(5);
  const [isPaused, setIsPaused] = useState(false);
  const totalItems = BEAUTY_PRODUCTS.length;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) setVisibleItems(5);
      else if (window.innerWidth >= 1024) setVisibleItems(4);
      else if (window.innerWidth >= 768) setVisibleItems(3);
      else if (window.innerWidth >= 640) setVisibleItems(2);
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
    }, 3500);

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
        <SectionHeader title="Top Selling Beauty Products" />
        
        {/* Navigation Arrows */}
        <div className="flex items-center gap-2 mb-3 sm:mb-4">
          <button 
            onClick={handlePrev}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-650 transition hover:bg-zinc-50 hover:text-zinc-950 active:scale-95 shadow-sm"
            aria-label="Previous Products"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            onClick={handleNext}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-650 transition hover:bg-zinc-50 hover:text-zinc-950 active:scale-95 shadow-sm"
            aria-label="Next Products"
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
          {BEAUTY_PRODUCTS.map((product, idx) => (
            <div 
              key={`${product.brand}-${idx}`} 
              className="flex-shrink-0 px-2.5"
              style={{ width: `${100 / visibleItems}%` }}
            >
              <div className="group relative flex flex-col justify-between rounded-[20px] border border-zinc-200 bg-white p-4.5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md min-h-[410px]">
                {/* Image container */}
                <div className="h-36 w-full rounded-xl overflow-hidden mb-4 relative">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Info details */}
                <div className="flex flex-col flex-1">
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider text-left">
                    {product.brand}
                  </span>
                  
                  <h3 className="text-xs font-semibold text-zinc-800 text-left mt-1.5 leading-relaxed line-clamp-2 h-9">
                    {product.name}
                  </h3>

                  <div className="flex items-baseline mt-2.5">
                    <span className="text-[14px] font-black text-zinc-900">
                      ${product.price.toLocaleString("en-US")}
                    </span>
                    <span className="text-[11px] text-zinc-400 line-through ml-1.5">
                      ${product.oldPrice.toLocaleString("en-US")}
                    </span>
                    <span className="text-[11px] font-black text-blue-600 ml-1.5">
                      ({product.discount})
                    </span>
                  </div>

                  {/* Dashed line */}
                  <div className="border-t border-dashed border-zinc-200 my-3.5" />

                  {/* Reward/Cashback card */}
                  <div className="inline-block self-start border border-zinc-200/80 bg-zinc-50/70 rounded-lg px-2.5 py-1 text-[10px] font-bold text-zinc-600 tracking-tight">
                    {product.cashbackText}
                  </div>

                  {/* Best Price & Buy Now Button */}
                  <div className="flex items-center justify-between mt-4 w-full pt-1">
                    <div className="flex flex-col items-start">
                      <span className="text-[8px] font-extrabold text-zinc-400 uppercase tracking-widest leading-none">
                        Best price
                      </span>
                      <span className="text-[16px] font-black text-zinc-900 leading-none mt-1">
                        ${product.bestPrice.toLocaleString("en-US")}
                      </span>
                    </div>

                    <button
                      type="button"
                      className="inline-flex items-center justify-center gap-1 rounded-xl bg-emerald-600 px-3 py-1.5 text-xs font-extrabold text-white shadow-sm transition-all hover:bg-emerald-700 active:scale-95 group-hover:shadow-md cursor-pointer"
                    >
                      <span>Buy Now</span>
                      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6 6 6-6 6" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
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
