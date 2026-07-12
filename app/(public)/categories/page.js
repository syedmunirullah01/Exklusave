import Link from "next/link";
import { getAllCategories } from "@/server/repositories/categories-repository";
import { getMetadataDefaults } from "@/server/services/settings-service";

export async function generateMetadata() {
  return getMetadataDefaults("Categories");
}

export const dynamic = "force-dynamic";

export default async function CategoriesPage() {
  const categories = await getAllCategories();

  return (
    <div className="mx-auto w-full max-w-[1240px] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="mb-12">
        <h1 className="text-5xl font-black uppercase tracking-[-0.05em] text-white sm:text-6xl">Browse Categories</h1>
        <div className="mt-4 h-1.5 w-20 rounded-full bg-[var(--accent)]" />
        <p className="mt-6 max-w-2xl text-base leading-7 text-white/50">
          Find the best offers, deals, and promo codes grouped by shopping category.
        </p>
      </div>

      {categories.length ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/stores?category=${category.slug}`}
              className="group relative block overflow-hidden rounded-[24px] border border-[var(--border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.02),transparent),var(--surface)] p-6 transition duration-300 hover:-translate-y-1 hover:border-[var(--accent)]/30 hover:shadow-[0_16px_32px_rgba(0,0,0,0.3)]"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(163,230,53,0.08),transparent_40%)] opacity-0 transition duration-300 group-hover:opacity-100" />
              <div className="relative z-10 flex flex-col justify-between h-full min-h-[140px]">
                <div>
                  <h2 className="text-2xl font-black tracking-tight text-white group-hover:text-[var(--accent)] transition-colors">
                    {category.name}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-white/50 line-clamp-2">
                    {category.description || `Discover curated coupon codes, deals, and promotions in the ${category.name} catalog.`}
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-1.5 text-xs font-black uppercase tracking-[0.2em] text-[var(--accent)]">
                  <span>Explore Stores</span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="rounded-[28px] border border-dashed border-[var(--border)] bg-[var(--surface)] p-12 text-center text-white/50">
          No categories found. Add categories from the admin dashboard.
        </div>
      )}
    </div>
  );
}
