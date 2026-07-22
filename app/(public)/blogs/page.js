import Link from "next/link";
import { getAllBlogs } from "@/server/repositories/blogs-repository";
import { getMetadataDefaults } from "@/server/services/settings-service";

export async function generateMetadata() {
  return getMetadataDefaults("Blogs & Shopping Guides");
}

export const dynamic = "force-dynamic";

const FALLBACK_BLOGS = [
  {
    slug: "smart-shopping-tips-2026",
    title: "10 Smart Shopping Tips to Maximize Savings in 2026",
    shortDescription: "Learn how to combine promo codes, seasonal sales, and cashback options to get the most value out of every order you place online.",
    createdAt: "2026-07-12T10:00:00.000Z",
    readTime: "5 min read",
    category: "Savings Guide",
    author: "Persuekey Editorial",
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1200&q=80",
    content: `
      Shopping online efficiently requires more than just waiting for holiday clearance sales. In 2026, smart shoppers combine stacked coupon codes, price tracking extensions, and cashback portals to maximize total savings.

      ### 1. Always Search for Stacking Coupon Codes
      Before clicking "Place Order", check Persuekey for active store discount codes. Many retailers allow entering both a percentage-off promo code and a free shipping voucher on the exact same purchase.

      ### 2. Time Your Purchases Around Major Sales Events
      Black Friday and Cyber Monday are great, but mid-season sales, end-of-quarter clearances, and store anniversary events often match or beat holiday prices with fewer stock shortages.

      ### 3. Join Free Store Loyalty Programs
      Retailers frequently reserve exclusive promo codes for signed-in members. Creating a free store account can unlock instant 15% off welcome vouchers and early access to flash sales.
    `,
  },
  {
    slug: "exclusive-rewards-programs",
    title: "The Ultimate Guide to Premium Loyalty & Reward Programs",
    shortDescription: "A deep dive into store membership perks, coupon club updates, and how to get early access to major flash drops.",
    createdAt: "2026-07-08T10:00:00.000Z",
    readTime: "7 min read",
    category: "Store Perks",
    author: "Persuekey Editorial",
    image: "https://images.unsplash.com/photo-1556742049-0a670fc4119f?auto=format&fit=crop&w=1200&q=80",
    content: `
      Store loyalty programs have evolved beyond basic point tracking. Modern rewards programs offer VIP discount tiers, birthday gifts, and dedicated coupon drops for loyal customers.

      ### Why Membership Matters
      Stores prioritize registered members with higher discount percentages and free express shipping thresholds. Combining member discounts with Persuekey promo codes provides the ultimate savings stack.
    `,
  },
  {
    slug: "avoiding-common-shopping-traps",
    title: "Avoiding Common Online Shopping Pitfalls During Sales",
    shortDescription: "How to identify artificial markups, verify coupon validity, and ensure you are actually getting a true markdown.",
    createdAt: "2026-06-28T10:00:00.000Z",
    readTime: "4 min read",
    category: "Consumer Guide",
    author: "Persuekey Editorial",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1200&q=80",
    content: `
      Not every discount banner indicates a genuine bargain. Retailers sometimes raise original list prices right before a major event to make a 20% discount seem larger than it actually is.

      ### How to Spot Artificial Discounts
      Compare sale prices against historical average prices, read full promo code terms, and verify voucher expiration dates on Persuekey before placing your order.
    `,
  },
  {
    slug: "best-cashback-apps-2026",
    title: "Best Cashback Apps & Extensions That Actually Pay",
    shortDescription: "We tested cashback tools so you don't have to. Here's which ones stack with coupons, which pay fastest, and which to avoid.",
    createdAt: "2026-06-20T10:00:00.000Z",
    readTime: "6 min read",
    category: "Tools",
    author: "Persuekey Editorial",
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80",
    content: `
      Combining cashback tracking with verified coupon codes is the single fastest way to lower your annual shopping budget.
    `,
  },
];

export default async function BlogsPage() {
  const dbBlogs = await getAllBlogs().catch(() => []);
  const publishedDbBlogs = dbBlogs.filter((b) => b.status !== "Draft");

  const blogsList = publishedDbBlogs.length > 0 ? publishedDbBlogs : FALLBACK_BLOGS;
  const featured = blogsList[0];
  const remainingBlogs = blogsList.slice(1);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="relative overflow-hidden bg-zinc-950 pb-16 pt-14 sm:pb-24 sm:pt-20 text-white">
        <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[800px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[100px]" />
        <div className="pointer-events-none absolute bottom-0 left-1/2 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />

        <div className="relative mx-auto max-w-[1200px] px-5 sm:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 mb-5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.22em] text-emerald-400">
              Persuekey Editorial
            </span>
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-[-0.04em] leading-[1.05] text-white">
            Shopping{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Insights & Guides
            </span>
          </h1>
          <p className="mt-4 text-sm sm:text-base max-w-md sm:max-w-xl mx-auto leading-relaxed text-white/70">
            Smart shopping guides, promo code strategies, and retail deal breakdowns — written by our moderation desk.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-white/40">
            <span>✦ {blogsList.length} Verified Articles</span>
            <span>✦ Updated Daily</span>
            <span>✦ 100% Free Access</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        {/* Featured Article */}
        {featured && (
          <div className="-mt-10 mb-16 relative z-10">
            <Link
              href={`/blogs/${featured.slug}`}
              className="group block overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="grid lg:grid-cols-[1.1fr_1fr]">
                {/* Left Banner Image */}
                <div className="relative min-h-[260px] lg:min-h-[380px] bg-zinc-900 overflow-hidden">
                  <img
                    src={featured.image || "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1200&q=80"}
                    alt={featured.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500 px-3.5 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-black shadow-md">
                      ★ Featured
                    </span>
                  </div>
                </div>

                {/* Right Content */}
                <div className="p-8 sm:p-10 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="inline-flex items-center rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.15em] text-emerald-700">
                        {featured.category || "Guide"}
                      </span>
                      <span className="text-xs text-zinc-400 font-semibold">{featured.readTime || "5 min read"}</span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-zinc-900 leading-snug group-hover:text-emerald-600 transition-colors mb-4">
                      {featured.title}
                    </h2>
                    <p className="text-sm text-zinc-600 leading-relaxed mb-6 line-clamp-3">
                      {featured.shortDescription || featured.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-t border-zinc-100 pt-5 mt-auto">
                    <div className="flex items-center gap-2 text-xs font-semibold text-zinc-400">
                      <span>{new Date(featured.createdAt || Date.now()).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                      <span>•</span>
                      <span>{featured.author || "Persuekey Editorial"}</span>
                    </div>
                    <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-emerald-600">
                      Read Article
                      <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Article Cards Grid */}
        <div className="mb-10 flex items-center justify-between border-b border-zinc-200 pb-4">
          <h3 className="text-xl font-black tracking-tight text-zinc-900">Latest Articles</h3>
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">{remainingBlogs.length} Stories</span>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mb-20">
          {remainingBlogs.map((blog) => (
            <Link
              key={blog.slug}
              href={`/blogs/${blog.slug}`}
              className="group flex flex-col overflow-hidden rounded-3xl border border-zinc-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-xl"
            >
              {/* Thumbnail Image */}
              <div className="relative h-48 w-full bg-zinc-100 overflow-hidden">
                <img
                  src={blog.image || "https://images.unsplash.com/photo-1556742049-0a670fc4119f?auto=format&fit=crop&w=800&q=80"}
                  alt={blog.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center rounded-full bg-black/70 backdrop-blur-md px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.15em] text-white">
                    {blog.category || "Savings"}
                  </span>
                </div>
              </div>

              <div className="flex flex-col flex-1 p-6">
                <h2 className="text-lg font-black tracking-tight text-zinc-900 leading-snug group-hover:text-emerald-600 transition-colors mb-3 line-clamp-2">
                  {blog.title}
                </h2>
                <p className="text-sm text-zinc-500 leading-relaxed line-clamp-3 flex-1">
                  {blog.shortDescription || blog.description}
                </p>

                <div className="mt-6 flex items-center justify-between border-t border-zinc-100 pt-4">
                  <span className="text-[11px] font-bold text-zinc-400">
                    {new Date(blog.createdAt || Date.now()).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-emerald-600">
                    Read Story
                    <svg viewBox="0 0 24 24" className="h-3 w-3 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
