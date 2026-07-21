import Link from "next/link";
import { getPublicSiteSettings } from "@/server/services/settings-service";

export const metadata = {
  title: "Privacy Policy | Persuekey",
  description: "Learn how Persuekey collects, uses, protects, and handles your personal information and coupon data.",
};

const DEFAULT_SECTIONS = [
  {
    id: "overview",
    icon: "🛡️",
    title: "1. Overview & Commitment",
    content: `At Persuekey, we are committed to upholding the highest standards of data privacy and transparency. This Privacy Policy outlines how we handle information when you visit our website, browse verified store offers, interact with coupon codes, or subscribe to our daily deal updates. Your trust is our highest priority, and we never sell your personal information to third-party advertisers.`,
  },
  {
    id: "information-collected",
    icon: "📊",
    title: "2. Information We Collect",
    content: `We collect minimal data necessary to provide a smooth, personalized savings experience: Voluntary Information, Usage & Analytics, and Cookies & Session Data.`,
  },
  {
    id: "how-we-use-data",
    icon: "⚙️",
    title: "3. How We Use Your Data",
    content: `The data we collect is strictly used to enhance your shopping experience, deliver verified coupon alerts, and optimize page load performance.`,
  },
  {
    id: "third-party-links",
    icon: "🔗",
    title: "4. Third-Party Links & Affiliate Partners",
    content: `Persuekey partners with major affiliate networks (such as CJ, Rakuten, Impact) and retail merchants. When you click on a store deal or copy a coupon code, you may be redirected to the merchant's external website.`,
  },
  {
    id: "data-security",
    icon: "🔐",
    title: "5. Data Security & Retention",
    content: `We employ enterprise-grade encryption (TLS/SSL), secure database storage, and strict access controls. Your data is retained only as long as necessary.`,
  },
  {
    id: "user-rights",
    icon: "⚖️",
    title: "6. Your Rights & Choices",
    content: `Regardless of your location, Persuekey grants you full control over your personal data under GDPR and CCPA guidelines.`,
  },
  {
    id: "contact",
    icon: "💬",
    title: "7. Contact Privacy Team",
    content: `If you have any questions, concerns, or requests regarding this Privacy Policy, please reach out to our dedicated Data Protection Desk.`,
  },
];

export default async function PrivacyPage() {
  const siteSettings = await getPublicSiteSettings();
  const pageData = siteSettings.pages?.privacy || {};

  const heroBadge = pageData.heroBadge || "Data Protection & Privacy";
  const heroTitle = pageData.heroTitle || "Privacy Policy";
  const heroSubtitle = pageData.heroSubtitle || "Transparent, secure, and user-first data practices. Learn how we safeguard your personal information and shopping choices.";
  const lastUpdated = pageData.lastUpdated || "July 2026";
  const sections = pageData.sections && pageData.sections.length > 0 ? pageData.sections : DEFAULT_SECTIONS;

  return (
    <div className="min-h-screen bg-zinc-50 pb-20 text-zinc-900">
      {/* Hero Header Banner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-zinc-950 via-emerald-950 to-zinc-950 py-16 text-white sm:py-24">
        <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[800px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />

        <div className="mx-auto max-w-[1200px] px-6 text-center lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 mb-6 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-emerald-400">
              {heroBadge}
            </span>
          </div>

          <h1 className="text-3xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
            {heroTitle}
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base text-zinc-400 sm:text-lg">
            {heroSubtitle}
          </p>

          <div className="mt-8 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-zinc-300">
            <span>Last Updated:</span>
            <span className="font-bold text-emerald-400">{lastUpdated}</span>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="mx-auto max-w-[1200px] px-4 pt-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[280px_1fr]">
          
          {/* Quick Navigation Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
              <h3 className="text-xs font-black uppercase tracking-[0.18em] text-zinc-400 mb-4">
                Table of Contents
              </h3>
              <nav className="flex flex-col gap-2">
                {sections.map((sec, i) => (
                  <a
                    key={sec.id || i}
                    href={`#sec-${i}`}
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-zinc-600 hover:bg-emerald-50 hover:text-emerald-700 transition"
                  >
                    <span>{sec.icon || "🛡️"}</span>
                    <span className="truncate">{sec.title}</span>
                  </a>
                ))}
              </nav>

              <div className="mt-6 border-t border-zinc-100 pt-4">
                <Link
                  href="/contact"
                  className="block w-full rounded-xl bg-emerald-600 hover:bg-emerald-700 py-3 text-center text-xs font-extrabold text-white shadow-sm transition-all hover:scale-[1.02] active:scale-95"
                >
                  Contact Privacy Support →
                </Link>
              </div>
            </div>
          </aside>

          {/* Policy Detail Cards */}
          <main className="flex flex-col gap-8">
            {sections.map((sec, i) => (
              <section
                key={sec.id || i}
                id={`sec-${i}`}
                className="scroll-mt-24 rounded-3xl border border-zinc-200/80 bg-white p-6 sm:p-8 shadow-sm transition-all hover:border-emerald-200 hover:shadow-md"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-50 border border-emerald-100 text-xl shadow-xs">
                    {sec.icon || "🛡️"}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-zinc-900 tracking-tight">
                    {sec.title}
                  </h2>
                </div>

                <p className="text-sm sm:text-base text-zinc-600 leading-relaxed whitespace-pre-line">
                  {sec.content}
                </p>

                {i === sections.length - 1 && (
                  <div className="mt-6 rounded-2xl border border-emerald-200/80 bg-emerald-50/50 p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-bold text-zinc-900">Have questions about your data?</p>
                      <p className="text-xs text-zinc-600">Our privacy team is available 24/7 to assist you.</p>
                    </div>
                    <a
                      href={`mailto:${siteSettings.supportEmail || "support@persuekey.com"}`}
                      className="shrink-0 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-extrabold text-white shadow-sm transition hover:bg-emerald-700 active:scale-95"
                    >
                      {siteSettings.supportEmail || "support@persuekey.com"}
                    </a>
                  </div>
                )}
              </section>
            ))}
          </main>

        </div>
      </div>
    </div>
  );
}
