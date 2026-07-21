import Link from "next/link";
import { getPublicSiteSettings } from "@/server/services/settings-service";

export const metadata = {
  title: "Terms of Service | Persuekey",
  description: "Read the legal Terms of Service and user agreement governing your use of Persuekey.",
};

const DEFAULT_TERMS_SECTIONS = [
  { id: "tsec-1", icon: "📜", title: "1. Acceptance of Terms", content: `By accessing or using the website Persuekey, its mobile interface, or associated coupon recommendation services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not access or use our platform.` },
  { id: "tsec-2", icon: "🏷️", title: "2. Description of Services", content: `Persuekey is a promotional discovery platform that aggregates verified store coupons, cashback offers, discount voucher codes, and affiliate product links. All services provided on our platform are free for individual non-commercial use.` },
  { id: "tsec-3", icon: "✅", title: "3. Coupon Accuracy & Availability", content: `While our verification desk tests and updates coupon codes daily, discount terms, promotional expiration dates, and merchant availability are controlled exclusively by third-party retailers. Persuekey does not guarantee that every code will be accepted at checkout.` },
  { id: "tsec-4", icon: "🤝", title: "4. Affiliate Partnerships & Disclosure", content: `Persuekey participates in affiliate marketing programs. When you click on a store deal or redeem a promotional coupon via our referral links, we may earn an affiliate commission from the merchant.` },
  { id: "tsec-5", icon: "💡", title: "5. Intellectual Property", content: `All original text content, design graphics, software code, custom logos, and brand elements on Persuekey are the exclusive property of Persuekey.` },
  { id: "tsec-6", icon: "⚠️", title: "6. Limitation of Liability", content: `In no event shall Persuekey, its owners, or team members be liable for any indirect, incidental, or consequential damages resulting from your use of merchant coupon codes.` },
  { id: "tsec-7", icon: "📩", title: "7. Governance & Questions", content: `These terms shall be governed in accordance with international commercial software standard regulations. For legal inquiries, contact our administrative desk.` }
];

export default async function TermsPage() {
  const siteSettings = await getPublicSiteSettings();
  const pageData = siteSettings.pages?.terms || {};

  const heroBadge = pageData.heroBadge || "User Agreement & Governance";
  const heroTitle = pageData.heroTitle || "Terms of Service";
  const heroSubtitle = pageData.heroSubtitle || "Please review the rules, responsibilities, and operational guidelines that govern your use of Persuekey.";
  const lastUpdated = pageData.lastUpdated || "July 2026";
  const sections = pageData.sections && pageData.sections.length > 0 ? pageData.sections : DEFAULT_TERMS_SECTIONS;

  return (
    <div className="min-h-screen bg-zinc-50 pb-20 text-zinc-900">
      {/* Hero Header Banner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-zinc-950 via-purple-950 to-zinc-950 py-16 text-white sm:py-24">
        <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[800px] -translate-x-1/2 rounded-full bg-violet-500/10 blur-3xl" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />

        <div className="mx-auto max-w-[1200px] px-6 text-center lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-3.5 py-1 mb-6 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-violet-400 animate-pulse" />
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-violet-400">
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
            <span>Effective Date:</span>
            <span className="font-bold text-violet-400">{lastUpdated}</span>
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
                    href={`#tsec-${i}`}
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-zinc-600 hover:bg-violet-50 hover:text-violet-700 transition"
                  >
                    <span>{sec.icon || "📜"}</span>
                    <span className="truncate">{sec.title}</span>
                  </a>
                ))}
              </nav>

              <div className="mt-6 border-t border-zinc-100 pt-4">
                <Link
                  href="/contact"
                  className="block w-full rounded-xl bg-emerald-600 hover:bg-emerald-700 py-3 text-center text-xs font-extrabold text-white shadow-sm transition-all hover:scale-[1.02] active:scale-95"
                >
                  Contact Legal Support →
                </Link>
              </div>
            </div>
          </aside>

          {/* Terms Detail Cards */}
          <main className="flex flex-col gap-8">
            {sections.map((sec, i) => (
              <section
                key={sec.id || i}
                id={`tsec-${i}`}
                className="scroll-mt-24 rounded-3xl border border-zinc-200/80 bg-white p-6 sm:p-8 shadow-sm transition-all hover:border-violet-200 hover:shadow-md"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-violet-50 border border-violet-100 text-xl shadow-xs">
                    {sec.icon || "📜"}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-zinc-900 tracking-tight">
                    {sec.title}
                  </h2>
                </div>

                <p className="text-sm sm:text-base text-zinc-600 leading-relaxed whitespace-pre-line">
                  {sec.content}
                </p>

                {i === sections.length - 1 && (
                  <div className="mt-6 rounded-2xl border border-violet-200/80 bg-violet-50/50 p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-bold text-zinc-900">Need legal clarification?</p>
                      <p className="text-xs text-zinc-600">Reach out to our compliance department anytime.</p>
                    </div>
                    <a
                      href={`mailto:${siteSettings.supportEmail || "support@persuekey.com"}`}
                      className="shrink-0 rounded-xl bg-violet-600 px-5 py-2.5 text-xs font-extrabold text-white shadow-sm transition hover:bg-violet-700 active:scale-95"
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
