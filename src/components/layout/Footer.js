import Link from "next/link";
import { getPublicSiteSettings } from "@/server/services/settings-service";
import { getAllCategories } from "@/server/repositories/categories-repository";
import { getAllStores } from "@/server/repositories/stores-repository";
import NewsletterForm from "@/components/layout/NewsletterForm";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "All Stores", href: "/stores" },
  { label: "Categories", href: "/categories" },
  { label: "Submit a Coupon", href: "/submit-coupon" },
  { label: "Blogs", href: "/blogs" },
  { label: "Contact Us", href: "/contact" },
  { label: "About Us", href: "/about" },
  { label: "Sitemap", href: "/site-index" },
];

const socialIcons = {
  Facebook: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  ),
  Instagram: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <rect width="20" height="20" x="2" y="2" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  X: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  TikTok: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" />
    </svg>
  ),
  YouTube: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.54C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white" />
    </svg>
  ),
};

export default async function Footer() {
  const [settings, categoriesData, storesData] = await Promise.all([
    getPublicSiteSettings(),
    getAllCategories().catch(() => []),
    getAllStores().catch(() => []),
  ]);

  // Live Categories from DB (up to 8)
  const topCategories = categoriesData.slice(0, 8).map((cat) => ({
    label: cat.name,
    href: `/categories/${cat.slug}`,
  }));

  // Live Stores from DB (up to 8)
  const topStores = storesData.slice(0, 8).map((store) => ({
    label: store.name,
    href: `/stores/${store.categorySlug || "general"}/${store.slug}`,
  }));

  const socialLinks = [
    { label: "Facebook", href: settings.social?.facebook },
    { label: "Instagram", href: settings.social?.instagram },
    { label: "X", href: settings.social?.x },
    { label: "TikTok", href: settings.social?.tiktok },
    { label: "YouTube", href: settings.social?.youtube },
  ].filter((item) => item.href);

  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-24 overflow-hidden bg-zinc-950 text-white">

      {/* Top glow accent */}
      <div className="pointer-events-none absolute top-0 left-1/2 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-emerald-500/60 to-transparent" />
      <div className="pointer-events-none absolute -top-32 left-1/2 h-64 w-[900px] -translate-x-1/2 rounded-full bg-emerald-500/8 blur-[100px]" />

      {/* Newsletter Banner */}
      <div className="relative border-b border-white/8">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-12 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400">Exclusive Members Only</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Never Miss a Deal Again.
            </h3>
            <p className="mt-2 text-sm text-white/45 max-w-md">
              Join 126k+ smart shoppers getting daily verified coupons, flash drops, and brand highlights.
            </p>
          </div>

          <NewsletterForm />
        </div>
      </div>

      {/* Main Link Grid */}
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-16">
        <div className="grid gap-12 lg:grid-cols-[2fr_1fr_1fr_1fr]">

          {/* Brand Column */}
          <div className="flex flex-col gap-6">
            {/* Logo */}
            <Link href="/" className="relative inline-flex w-fit items-center rounded-xl bg-emerald-600 px-4 py-2 overflow-hidden shadow-lg shadow-emerald-600/30">
              <span className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white/30" />
              <span className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white/30" />
              <span className="text-[1.5rem] font-black italic leading-none tracking-[-0.07em] text-white px-1">Persuekey</span>
            </Link>

            <p className="text-sm leading-relaxed text-white/40 max-w-xs">
              Your one-stop destination for verified coupons, exclusive deals, and trusted store partnerships — updated daily.
            </p>

            {/* Social Icons */}
            {socialLinks.length > 0 && (
              <div className="flex items-center gap-2">
                {socialLinks.map((s) => (
                  <Link
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/50 transition-all hover:border-emerald-500/40 hover:bg-emerald-500/15 hover:text-emerald-400"
                  >
                    {socialIcons[s.label]}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Top Categories (Dynamic Live Database Data) */}
          <div>
            <h4 className="mb-5 text-[10px] font-black uppercase tracking-[0.25em] text-white/30">Top Categories</h4>
            <nav className="flex flex-col gap-2.5">
              {topCategories.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="group inline-flex items-center gap-2 text-[13px] font-semibold text-white/55 transition-all hover:text-emerald-400"
                >
                  <span className="h-px w-3 bg-white/20 transition-all group-hover:w-5 group-hover:bg-emerald-400" />
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Top Stores (Dynamic Live Database Data) */}
          <div>
            <h4 className="mb-5 text-[10px] font-black uppercase tracking-[0.25em] text-white/30">Top Stores</h4>
            <nav className="flex flex-col gap-2.5">
              {topStores.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="group inline-flex items-center gap-2 text-[13px] font-semibold text-white/55 transition-all hover:text-emerald-400"
                >
                  <span className="h-px w-3 bg-white/20 transition-all group-hover:w-5 group-hover:bg-emerald-400" />
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-5 text-[10px] font-black uppercase tracking-[0.25em] text-white/30">Quick Links</h4>
            <nav className="flex flex-col gap-2.5">
              {quickLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="group inline-flex items-center gap-2 text-[13px] font-semibold text-white/55 transition-all hover:text-emerald-400"
                >
                  <span className="h-px w-3 bg-white/20 transition-all group-hover:w-5 group-hover:bg-emerald-400" />
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/8">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="text-[11px] font-black uppercase tracking-[0.18em] text-white/25">
              © {year} {settings.siteName}
            </span>
            <span className="text-white/15">·</span>
            <Link href="/privacy" className="text-[11px] font-semibold text-white/30 uppercase tracking-wider hover:text-emerald-400 transition-colors">Privacy</Link>
            <span className="text-white/15">·</span>
            <Link href="/terms" className="text-[11px] font-semibold text-white/30 uppercase tracking-wider hover:text-emerald-400 transition-colors">Terms</Link>
            <span className="text-white/15">·</span>
            <Link href="/cookies" className="text-[11px] font-semibold text-white/30 uppercase tracking-wider hover:text-emerald-400 transition-colors">Cookies</Link>
            <span className="text-white/15">·</span>
            <Link href="/imprint" className="text-[11px] font-semibold text-white/30 uppercase tracking-wider hover:text-emerald-400 transition-colors">Imprint</Link>
          </div>

          <a
            href={`mailto:${settings.supportEmail}`}
            className="text-[11px] font-semibold lowercase tracking-wide text-white/30 transition-colors hover:text-emerald-400"
          >
            {settings.supportEmail}
          </a>
        </div>
      </div>
    </footer>
  );
}
