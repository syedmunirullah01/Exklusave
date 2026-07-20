import Link from "next/link";
import { getMetadataDefaults } from "@/server/services/settings-service";
import SitemapGrid from "./SitemapGrid";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return getMetadataDefaults("Sitemap");
}

async function getLiveStores() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/stores`, { cache: "no-store" });
    const data = await res.json();
    return Array.isArray(data?.data) ? data.data : [];
  } catch {
    return [];
  }
}

async function getLiveCategories() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/categories`, { cache: "no-store" });
    const data = await res.json();
    return Array.isArray(data?.data) ? data.data : [];
  } catch {
    return [];
  }
}

const staticSections = [
  {
    section: "Main Pages",
    emoji: "🏠",
    accent: "from-emerald-500/15 to-teal-500/10 border-emerald-500/20",
    iconBg: "bg-emerald-500/15 text-emerald-600",
    links: [
      { label: "Home", href: "/", description: "Discover daily verified deals and top offers" },
      { label: "All Stores", href: "/stores", description: "Browse all partner stores" },
      { label: "Categories", href: "/categories", description: "Explore deals by shopping category" },
      { label: "Blogs", href: "/blogs", description: "Smart shopping guides and tips" },
    ],
  },
  {
    section: "Company",
    emoji: "🏢",
    accent: "from-blue-500/15 to-cyan-500/10 border-blue-500/20",
    iconBg: "bg-blue-500/15 text-blue-600",
    links: [
      { label: "About Us", href: "/about", description: "Our story, mission and team values" },
      { label: "Contact Us", href: "/contact", description: "Get in touch with our support team" },
      { label: "Blogs", href: "/blogs", description: "Shopping tips and deal guides" },
      { label: "Imprint", href: "/imprint", description: "Legal company information" },
    ],
  },
  {
    section: "Legal",
    emoji: "⚖️",
    accent: "from-zinc-200/60 to-zinc-100/40 border-zinc-200",
    iconBg: "bg-zinc-100 text-zinc-500",
    links: [
      { label: "Privacy Policy", href: "/privacy", description: "How we collect and handle your data" },
      { label: "Terms of Use", href: "/terms", description: "Rules and conditions for using Persuekey" },
      { label: "Cookie Policy", href: "/cookies", description: "How we use cookies on this site" },
      { label: "Sitemap", href: "/site-index", description: "Full site structure overview" },
    ],
  },
];

export default async function SitemapPage() {
  const [stores, categories] = await Promise.all([getLiveStores(), getLiveCategories()]);

  const storeLinks = stores.map((store) => ({
    label: store.name,
    href: `/stores/${store.categorySlug || "general"}/${store.slug}`,
    description: store.description?.slice(0, 60) || `${store.name} deals and coupons`,
  }));

  const categoryLinks = categories.map((cat) => ({
    label: cat.name,
    href: `/categories/${cat.slug}`,
    description: `${cat.name} deals and coupons`,
  }));

  const totalCount =
    staticSections.reduce((a, s) => a + s.links.length, 0) +
    storeLinks.length +
    categoryLinks.length;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="relative overflow-hidden bg-zinc-950 pb-20 pt-20">
        <div className="pointer-events-none absolute -top-20 left-1/2 h-56 w-[600px] -translate-x-1/2 rounded-full bg-emerald-500/8 blur-[100px]" />
        <div className="pointer-events-none absolute bottom-0 left-1/2 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
        <div className="relative mx-auto max-w-[1200px] px-5 sm:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-4 py-1.5 mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.22em] text-emerald-400">Site Navigation</span>
          </div>
          <h1 className="text-5xl sm:text-6xl font-black tracking-[-0.04em] mb-4" style={{ color: "#ffffff" }}>
            Sitemap
          </h1>
          <p className="text-base max-w-lg mx-auto leading-relaxed" style={{ color: "rgba(255,255,255,0.85)" }}>
            Complete overview of all {totalCount} pages — stores & categories auto-update with live data.
          </p>
          <div className="mt-6">
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-2.5 text-[12px] font-bold transition hover:border-white/50 hover:bg-white/15"
              style={{ color: "#ffffff" }}
            >
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              View XML Sitemap for Search Engines
            </a>
          </div>
        </div>
      </div>

      {/* Grid — client component handles pagination */}
      <SitemapGrid
        staticSections={staticSections}
        storeLinks={storeLinks}
        categoryLinks={categoryLinks}
      />
    </div>
  );
}
