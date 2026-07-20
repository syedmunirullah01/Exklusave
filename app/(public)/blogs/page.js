"use client";

import Link from "next/link";
import { useState } from "react";

const blogs = [
  {
    slug: "smart-shopping-tips-2026",
    title: "10 Smart Shopping Tips to Maximize Savings in 2026",
    description: "Learn how to combine promo codes, seasonal sales, and cashback options to get the most value out of every order you place online.",
    date: "July 12, 2026",
    readingTime: "5 min read",
    category: "Savings Guide",
    featured: true,
    accent: "from-emerald-500 to-teal-500",
    emoji: "💡",
  },
  {
    slug: "exclusive-rewards-programs",
    title: "The Ultimate Guide to Premium Loyalty & Reward Programs",
    description: "A deep dive into store membership perks, coupon club updates, and how to get early access to major flash drops.",
    date: "July 08, 2026",
    readingTime: "7 min read",
    category: "Store Perks",
    featured: false,
    accent: "from-violet-500 to-purple-500",
    emoji: "🎯",
  },
  {
    slug: "avoiding-common-shopping-traps",
    title: "Avoiding Common Online Shopping Pitfalls During Sales",
    description: "How to identify artificial markups, verify coupon validity, and ensure you are actually getting a true markdown.",
    date: "June 28, 2026",
    readingTime: "4 min read",
    category: "Consumer Guide",
    featured: false,
    accent: "from-amber-500 to-orange-500",
    emoji: "🛡️",
  },
  {
    slug: "best-cashback-apps-2026",
    title: "Best Cashback Apps & Extensions That Actually Pay",
    description: "We tested 12 cashback tools so you don't have to. Here's which ones stack with coupons, which pay fastest, and which to avoid.",
    date: "June 20, 2026",
    readingTime: "6 min read",
    category: "Tools",
    featured: false,
    accent: "from-blue-500 to-cyan-500",
    emoji: "💳",
  },
  {
    slug: "seasonal-sale-calendar-2026",
    title: "The 2026 Seasonal Sale Calendar Every Shopper Needs",
    description: "From Amazon Prime Day to Black Friday, here's every major retail event mapped out with tips to prepare early for each one.",
    date: "June 15, 2026",
    readingTime: "8 min read",
    category: "Savings Guide",
    featured: false,
    accent: "from-rose-500 to-pink-500",
    emoji: "📅",
  },
  {
    slug: "student-discount-guide",
    title: "The Complete Student Discount Guide for 2026",
    description: "Hundreds of brands offer verified student deals — from tech and fashion to food delivery. Here's how to unlock every single one.",
    date: "June 10, 2026",
    readingTime: "5 min read",
    category: "Consumer Guide",
    featured: false,
    accent: "from-indigo-500 to-blue-500",
    emoji: "🎓",
  },
];

const categories = ["All", "Savings Guide", "Store Perks", "Consumer Guide", "Tools"];

const categoryColors = {
  "Savings Guide": "bg-emerald-500/10 text-emerald-700 border-emerald-500/20",
  "Store Perks": "bg-violet-500/10 text-violet-700 border-violet-500/20",
  "Consumer Guide": "bg-amber-500/10 text-amber-700 border-amber-500/20",
  "Tools": "bg-blue-500/10 text-blue-700 border-blue-500/20",
};

export default function BlogsPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const featured = blogs.find((b) => b.featured);
  const filtered = blogs
    .filter((b) => !b.featured)
    .filter((b) => activeCategory === "All" || b.category === activeCategory);

  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <div className="relative overflow-hidden bg-zinc-950 pb-16 pt-14 sm:pb-24 sm:pt-20">
        <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[800px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[100px]" />
        <div className="pointer-events-none absolute bottom-0 left-1/2 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />

        <div className="relative mx-auto max-w-[1200px] px-5 sm:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-4 py-1.5 mb-5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.22em] text-emerald-400">Persuekey Editorial</span>
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-[-0.04em] leading-[1.05]" style={{color:'#ffffff'}}>
            Shopping{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Insights
            </span>
          </h1>
          <p className="mt-4 text-sm sm:text-base max-w-md sm:max-w-xl mx-auto leading-relaxed px-2" style={{color:'rgba(255,255,255,0.75)'}}>
            Smart shopping guides, deal breakdowns, and retail tips — from our desk to your cart.
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest" style={{color:'rgba(255,255,255,0.45)'}}>✦ {blogs.length} Articles</span>
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest" style={{color:'rgba(255,255,255,0.45)'}}>✦ Updated Weekly</span>
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest" style={{color:'rgba(255,255,255,0.45)'}}>✦ Free to Read</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">

        {/* Featured Article */}
        {featured && (
          <div className="-mt-10 mb-16 relative z-10">
            <Link href={`/blogs/${featured.slug}`} className="group block overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="grid lg:grid-cols-[1fr_1.2fr]">
                {/* Left gradient panel */}
                <div className={`relative min-h-[240px] bg-gradient-to-br ${featured.accent} flex items-center justify-center`}>
                  <div className="absolute inset-0 bg-black/10" />
                  <div className="relative text-center p-10">
                    <div className="text-8xl mb-4">{featured.emoji}</div>
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 backdrop-blur-sm">
                      <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Featured</span>
                    </div>
                  </div>
                </div>
                {/* Right content */}
                <div className="p-8 sm:p-10 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-[0.15em] ${categoryColors[featured.category]}`}>
                      {featured.category}
                    </span>
                    <span className="text-xs text-zinc-400">{featured.readingTime}</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-zinc-900 leading-snug group-hover:text-emerald-600 transition-colors mb-4">
                    {featured.title}
                  </h2>
                  <p className="text-sm text-zinc-500 leading-relaxed mb-6">{featured.description}</p>
                  <div className="flex items-center justify-between border-t border-zinc-100 pt-5">
                    <span className="text-xs text-zinc-400">{featured.date}</span>
                    <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-emerald-600">
                      Read Article
                      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Category Filter — horizontal scroll on mobile */}
        <div className="mb-10 -mx-5 sm:mx-0">
          <div className="flex items-center gap-2 overflow-x-auto px-5 sm:px-0 pb-2 sm:pb-0 sm:flex-wrap scrollbar-none"
            style={{scrollbarWidth:'none', msOverflowStyle:'none'}}>
            <span className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400 mr-1 shrink-0">Filter:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 rounded-full px-4 py-2 text-xs font-black uppercase tracking-[0.14em] transition-all duration-200 border ${
                  activeCategory === cat
                    ? "border-emerald-500 bg-emerald-500 text-white shadow-md shadow-emerald-500/25"
                    : "border-zinc-200 bg-white text-zinc-500 hover:border-zinc-300 hover:text-zinc-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>


        {/* Blog Cards Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-20">
          {filtered.map((blog) => (
            <Link
              key={blog.slug}
              href={`/blogs/${blog.slug}`}
              className="group flex flex-col overflow-hidden rounded-3xl border border-zinc-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-xl"
            >
              {/* Top gradient bar */}
              <div className={`h-2 w-full bg-gradient-to-r ${blog.accent}`} />

              <div className="flex flex-col flex-1 p-6">
                {/* Emoji + Category */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">{blog.emoji}</span>
                  <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.15em] ${categoryColors[blog.category]}`}>
                    {blog.category}
                  </span>
                </div>

                <h2 className="text-lg font-black tracking-tight text-zinc-900 leading-snug group-hover:text-emerald-600 transition-colors mb-3 line-clamp-2">
                  {blog.title}
                </h2>
                <p className="text-sm text-zinc-500 leading-relaxed line-clamp-3 flex-1">
                  {blog.description}
                </p>

                <div className="mt-5 flex items-center justify-between border-t border-zinc-100 pt-4">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] font-bold text-zinc-400">{blog.date}</span>
                    <span className="text-[10px] text-zinc-300">{blog.readingTime}</span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-emerald-600">
                    Read
                    <svg viewBox="0 0 24 24" className="h-3 w-3 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}

          {filtered.length === 0 && (
            <div className="col-span-3 py-20 text-center text-zinc-400 text-sm font-semibold">
              No articles in this category yet. Check back soon!
            </div>
          )}
        </div>

        {/* Newsletter Strip */}
        <div className="relative mb-20 overflow-hidden rounded-3xl bg-zinc-950 px-8 py-12 text-center">
          <div className="pointer-events-none absolute -top-12 left-1/2 h-40 w-[500px] -translate-x-1/2 rounded-full bg-emerald-500/15 blur-[60px]" />
          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-4 py-1.5 mb-5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.22em] text-emerald-400">Weekly Digest</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-3">
              Get New Articles in Your Inbox
            </h3>
            <p className="text-sm text-white/40 mb-8 max-w-sm mx-auto">
              Join 126k+ shoppers who get our weekly shopping guide, deal alerts, and money-saving tips.
            </p>
            <form className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="h-12 w-full rounded-2xl border border-white/10 bg-white/8 px-5 text-sm text-white outline-none placeholder:text-white/30 focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition"
              />
              <button
                type="button"
                className="h-12 flex-shrink-0 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 px-7 text-[11px] font-black uppercase tracking-[0.18em] text-black shadow-lg shadow-emerald-500/25 transition-all hover:scale-105 hover:shadow-emerald-500/40"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
