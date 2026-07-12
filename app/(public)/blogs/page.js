import Link from "next/link";
import { getMetadataDefaults } from "@/server/services/settings-service";

export async function generateMetadata() {
  return getMetadataDefaults("Blogs");
}

const placeholderBlogs = [
  {
    slug: "smart-shopping-tips-2026",
    title: "10 Smart Shopping Tips to Maximize Savings in 2026",
    description: "Learn how to combine promo codes, seasonal sales, and cashback options to get the most value out of every order.",
    date: "July 12, 2026",
    readingTime: "5 min read",
    category: "Savings Guide",
  },
  {
    slug: "exclusive-rewards-programs",
    title: "The Ultimate Guide to Premium Loyalty & Reward Programs",
    description: "A deep dive into store membership perks, coupon club updates, and how to get early access to major flash drops.",
    date: "July 08, 2026",
    readingTime: "7 min read",
    category: "Store Perks",
  },
  {
    slug: "avoiding-common-shopping-traps",
    title: "Avoiding Common Online Shopping Pitfalls During Sales",
    description: "How to identify artificial markups, verify coupon validity, and ensure you are actually getting a true markdown.",
    date: "June 28, 2026",
    readingTime: "4 min read",
    category: "Consumer Guide",
  },
];

export default function BlogsPage() {
  return (
    <div className="mx-auto w-full max-w-[1240px] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="mb-12">
        <h1 className="text-5xl font-black uppercase tracking-[-0.05em] text-white sm:text-6xl">Exklusave Insights</h1>
        <div className="mt-4 h-1.5 w-20 rounded-full bg-[var(--accent)]" />
        <p className="mt-6 max-w-2xl text-base leading-7 text-white/50">
          Stay updated with smart shopping guides, retail tips, and seasonal deals analysis compiled by our desk.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {placeholderBlogs.map((blog) => (
          <article
            key={blog.slug}
            className="group flex flex-col justify-between overflow-hidden rounded-[28px] border border-[var(--border)] bg-[var(--surface)] p-6 transition duration-300 hover:-translate-y-1 hover:border-[var(--accent)]/30 hover:shadow-[0_16px_32px_rgba(0,0,0,0.3)]"
          >
            <div>
              <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-white/40">
                <span>{blog.category}</span>
                <span>{blog.readingTime}</span>
              </div>
              <h2 className="mt-4 text-2xl font-black tracking-tight text-white group-hover:text-[var(--accent)] transition-colors leading-snug">
                {blog.title}
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/50 line-clamp-3">
                {blog.description}
              </p>
            </div>
            <div className="mt-8 flex items-center justify-between border-t border-[var(--border)] pt-4">
              <span className="text-xs text-white/30">{blog.date}</span>
              <span className="text-xs font-black uppercase tracking-[0.2em] text-[var(--accent)]">
                Read Article →
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
