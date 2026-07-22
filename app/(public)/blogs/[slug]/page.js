import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllBlogs, getBlogBySlug } from "@/server/repositories/blogs-repository";
import { getAllStores } from "@/server/repositories/stores-repository";
import { getMetadataDefaults } from "@/server/services/settings-service";

const FALLBACK_BLOGS = [
  {
    slug: "smart-shopping-tips-2026",
    title: "10 Smart Shopping Tips to Maximize Savings in 2026",
    shortDescription: "Learn how to combine promo codes, seasonal sales, and cashback options to get the most value out of every order you place online.",
    createdAt: "2026-07-12T10:00:00.000Z",
    readTime: "5 min read",
    category: "Savings Guide",
    author: "Persuekey Editorial Desk",
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1200&q=80",
    content: `Online shopping in 2026 has evolved beyond waiting for annual holiday clearance sales. Retailers frequently roll out unannounced flash discounts, member-only promo codes, and targeted category markdowns. By structuring how you browse and check out, you can save significant money on every transaction.

### 1. Stack Promo Codes and Member Vouchers
Before finalizing any online order, check Persuekey for active promo codes. Many major brands allow users to stack a sitewide percentage-off voucher on top of existing sale item markdowns or free delivery promotions.

### 2. Time Purchases Around Key Retail Windows
While Black Friday and Cyber Monday are popular, mid-season clearances and end-of-quarter brand inventory refreshes often yield higher discount percentages with far better item availability.

### 3. Join Free Store Rewards Programs
Creating a free store account almost always unlocks instant privileges — including 15% off welcome vouchers, birthday rewards, and exclusive early access to major sale drops.

### 4. Verify Voucher Validity Before Checkout
Not all discount codes found on search engines are current. Persuekey's moderation team manually verifies coupon codes and tracks trust signals so you never waste time with expired vouchers.

### Summary
Smart shopping is all about consistency. By applying verified coupon codes, tracking price trends, and leveraging store rewards, you can easily maximize your total savings on every purchase.`,
  },
  {
    slug: "exclusive-rewards-programs",
    title: "The Ultimate Guide to Premium Loyalty & Reward Programs",
    shortDescription: "A deep dive into store membership perks, coupon club updates, and how to get early access to major flash drops.",
    createdAt: "2026-07-08T10:00:00.000Z",
    readTime: "7 min read",
    category: "Store Perks",
    author: "Persuekey Editorial Desk",
    image: "https://images.unsplash.com/photo-1556742049-0a670fc4119f?auto=format&fit=crop&w=1200&q=80",
    content: `Retail loyalty programs offer far more than simple point collection. Leading online stores provide tiered member perks, exclusive discount events, and early preview access to upcoming seasonal collections.

### Unlocking Store Membership Value
By combining free loyalty registration with active Persuekey promo codes, smart shoppers unlock double savings on popular fashion, beauty, and tech categories.`,
  },
  {
    slug: "avoiding-common-shopping-traps",
    title: "Avoiding Common Online Shopping Pitfalls During Sales",
    shortDescription: "How to identify artificial markups, verify coupon validity, and ensure you are actually getting a true markdown.",
    createdAt: "2026-06-28T10:00:00.000Z",
    readTime: "4 min read",
    category: "Consumer Guide",
    author: "Persuekey Editorial Desk",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1200&q=80",
    content: `Not every banner advertising 50% off delivers authentic value. Retailers sometimes increase list prices shortly before running a promotion to make standard discounts appear larger.

### Evaluating True Discount Worth
Always check price histories, read fine print on minimum purchase thresholds, and cross-reference coupon codes on Persuekey before submitting payment.`,
  },
  {
    slug: "best-cashback-apps-2026",
    title: "Best Cashback Apps & Extensions That Actually Pay",
    shortDescription: "We tested cashback tools so you don't have to. Here's which ones stack with coupons, which pay fastest, and which to avoid.",
    createdAt: "2026-06-20T10:00:00.000Z",
    readTime: "6 min read",
    category: "Tools",
    author: "Persuekey Editorial Desk",
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80",
    content: `Cashback tools provide an additional layer of savings on top of store promo codes. Understanding which portals allow stacking promo codes without invalidating cash rewards is essential for maximum savings.`,
  },
];

async function resolveBlog(slug) {
  const dbBlog = await getBlogBySlug(slug).catch(() => null);
  if (dbBlog) {
    return dbBlog;
  }
  return FALLBACK_BLOGS.find((b) => b.slug === slug) || null;
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const blog = await resolveBlog(resolvedParams.slug);

  if (!blog) {
    return getMetadataDefaults("Blog Post Not Found");
  }

  return {
    title: `${blog.title} | Persuekey Journal`,
    description: blog.shortDescription || blog.title,
    openGraph: {
      title: blog.title,
      description: blog.shortDescription || blog.title,
      images: blog.image ? [blog.image] : [],
    },
  };
}

export const dynamic = "force-dynamic";

export default async function BlogPostPage({ params }) {
  const resolvedParams = await params;
  const blog = await resolveBlog(resolvedParams.slug);

  if (!blog) {
    notFound();
  }

  const [allDbBlogs, stores] = await Promise.all([
    getAllBlogs().catch(() => []),
    getAllStores().catch(() => []),
  ]);

  const allBlogsList = allDbBlogs.length > 0 ? allDbBlogs : FALLBACK_BLOGS;
  const relatedArticles = allBlogsList
    .filter((item) => item.slug !== blog.slug)
    .slice(0, 3);

  const topStores = stores.slice(0, 6);
  const formattedDate = new Date(blog.createdAt || Date.now()).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  // Determine actual main body text
  const mainBodyText = blog.content && blog.content.trim() ? blog.content : blog.shortDescription || "";

  // Split into clean paragraphs
  const rawParagraphs = mainBodyText
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <article className="min-h-screen bg-white">
      {/* Top Header Banner */}
      <div className="relative overflow-hidden bg-zinc-950 pb-16 pt-12 sm:pb-20 sm:pt-16 text-white">
        <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[800px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[100px]" />
        <div className="pointer-events-none absolute bottom-0 left-1/2 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />

        <div className="relative mx-auto max-w-[1000px] px-5 sm:px-8">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs font-semibold text-white/50 mb-8">
            <Link href="/" className="hover:text-emerald-400 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blogs" className="hover:text-emerald-400 transition-colors">Blogs</Link>
            <span>/</span>
            <span className="text-white/80 truncate max-w-[200px] sm:max-w-none">{blog.title}</span>
          </div>

          {/* Category & Meta */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center rounded-full border border-emerald-500/40 bg-emerald-500/15 px-3.5 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-emerald-400">
              {blog.category || "Guide"}
            </span>
            <span className="text-xs text-white/40 font-semibold">•</span>
            <span className="text-xs text-white/60 font-semibold">{blog.readTime || "4 min read"}</span>
            <span className="text-xs text-white/40 font-semibold">•</span>
            <span className="text-xs text-white/60 font-semibold">{formattedDate}</span>
          </div>

          {/* Article Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.15] mb-6">
            {blog.title}
          </h1>

          {/* Author */}
          <div className="flex items-center gap-3 pt-4 border-t border-white/10">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-black font-black text-sm shadow-md">
              PK
            </div>
            <div>
              <p className="text-sm font-bold text-white">{blog.author || "Persuekey Editorial Desk"}</p>
              <p className="text-[11px] text-white/50">Verified Savings & Deals Intelligence</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Body */}
      <div className="mx-auto max-w-[1000px] px-5 sm:px-8 py-12">
        {/* Banner Image */}
        {blog.image ? (
          <div className="-mt-20 mb-12 relative z-10 overflow-hidden rounded-3xl border border-zinc-200 shadow-2xl bg-zinc-900">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full max-h-[480px] object-cover"
            />
          </div>
        ) : null}

        <div className="grid gap-12 lg:grid-cols-[1fr_300px]">

          {/* Main Article Content */}
          <div className="space-y-6 text-zinc-700 text-base sm:text-lg font-normal leading-[1.8]">

            {/* Paragraphs */}
            {rawParagraphs.map((paragraph, index) => {

              // HEADING 1 (or paragraph 0 intro block) gets the GREEN ACCENT LEFT LINE!
              const isHeading1 = paragraph.startsWith("# ") || (index === 0 && !paragraph.startsWith("#") && !paragraph.startsWith("##"));

              if (isHeading1) {
                const text = paragraph.replace(/^#\s*/, "");
                return (
                  <div key={index} className="border-l-4 border-emerald-500 pl-5 py-2 my-6 bg-emerald-50/30 rounded-r-2xl">
                    <p className="text-xl sm:text-2xl font-bold text-zinc-900 leading-snug">
                      {text}
                    </p>
                  </div>
                );
              }

              // Heading 2 / Sub-headings
              if (paragraph.startsWith("## ")) {
                return (
                  <h2 key={index} className="text-2xl sm:text-3xl font-black text-zinc-900 tracking-tight pt-6 pb-2 border-b border-zinc-200">
                    {paragraph.replace(/^##\s*/, "")}
                  </h2>
                );
              }

              // Heading 3
              if (paragraph.startsWith("### ")) {
                return (
                  <h3 key={index} className="text-xl sm:text-2xl font-bold text-zinc-900 tracking-tight pt-4 pb-2 border-b border-zinc-100">
                    {paragraph.replace(/^###\s*/, "")}
                  </h3>
                );
              }

              // Normal Body Paragraphs (NO green line)
              return (
                <p key={index} className="text-zinc-700 text-base sm:text-lg font-normal leading-[1.85]">
                  {paragraph}
                </p>
              );
            })}

            {/* Share / Back Bar */}
            <div className="mt-12 pt-8 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <Link
                href="/blogs"
                className="inline-flex items-center gap-2 rounded-2xl border border-zinc-200 bg-zinc-50 px-5 py-2.5 text-xs font-bold text-zinc-700 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 transition-all"
              >
                ← Back to All Articles
              </Link>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 mr-2">Share:</span>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(blog.title)}&url=${encodeURIComponent(`https://persuekey.com/blogs/${blog.slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-600 hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-600 transition"
                  aria-label="Share on X"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://persuekey.com/blogs/${blog.slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-600 hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-600 transition"
                  aria-label="Share on Facebook"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            {/* Popular Stores Widget */}
            {topStores.length > 0 && (
              <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-6 space-y-4">
                <h4 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400">Popular Stores</h4>
                <div className="space-y-2">
                  {topStores.map((store) => (
                    <Link
                      key={store.slug}
                      href={`/stores/${store.categorySlug || "general"}/${store.slug}`}
                      className="flex items-center justify-between rounded-xl border border-zinc-200/80 bg-white px-3.5 py-2.5 text-xs font-bold text-zinc-800 hover:border-emerald-500 hover:text-emerald-600 transition"
                    >
                      <span className="truncate">{store.name}</span>
                      <span className="text-[10px] text-emerald-600 font-bold uppercase">Deals →</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Newsletter Card */}
            <div className="rounded-3xl bg-zinc-950 p-6 text-white text-center space-y-4 relative overflow-hidden">
              <div className="pointer-events-none absolute -top-10 left-1/2 h-32 w-32 -translate-x-1/2 rounded-full bg-emerald-500/20 blur-2xl" />
              <p className="text-2xl">📬</p>
              <h4 className="text-base font-bold tracking-tight">Stay Informed</h4>
              <p className="text-xs text-white/50">Get instant alerts when new verified coupon codes drop.</p>
              <Link
                href="/stores"
                className="block w-full rounded-xl bg-emerald-500 py-2.5 text-center text-xs font-black uppercase tracking-wider text-black hover:bg-emerald-400 transition font-bold"
              >
                Browse All Stores
              </Link>
            </div>
          </aside>
        </div>

        {/* Related Articles Section */}
        {relatedArticles.length > 0 && (
          <div className="mt-20 pt-12 border-t border-zinc-200">
            <h3 className="text-2xl font-black text-zinc-900 tracking-tight mb-8">Related Articles</h3>
            <div className="grid gap-6 sm:grid-cols-3">
              {relatedArticles.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/blogs/${rel.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white hover:border-zinc-300 hover:shadow-lg transition-all"
                >
                  <div className="h-36 bg-zinc-100 overflow-hidden relative">
                    <img
                      src={rel.image || "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=800&q=80"}
                      alt={rel.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <span className="text-[9px] font-black uppercase tracking-wider text-emerald-600 mb-1">
                      {rel.category || "Guide"}
                    </span>
                    <h4 className="text-sm font-bold text-zinc-900 group-hover:text-emerald-600 transition-colors line-clamp-2 mb-2">
                      {rel.title}
                    </h4>
                    <span className="mt-auto text-[10px] text-zinc-400 font-semibold">
                      Read Story →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
