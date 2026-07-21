import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | Persuekey",
  description: "Learn how Persuekey collects, uses, protects, and handles your personal information and coupon data.",
};

const SECTIONS = [
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
    content: `We collect minimal data necessary to provide a smooth, personalized savings experience:`,
    bullets: [
      "Voluntary Information: Email address provided when subscribing to deal newsletters or creating an account.",
      "Usage & Analytics: Aggregated data such as pages visited, coupon codes clicked, store referral links followed, browser type, and device category.",
      "Cookies & Session Data: Essential cookies to keep track of your preferences, affiliate referral attribution, and search queries.",
    ],
  },
  {
    id: "how-we-use-data",
    icon: "⚙️",
    title: "3. How We Use Your Data",
    content: `The data we collect is strictly used to enhance your shopping experience and optimize our coupon verification algorithms:`,
    bullets: [
      "Delivering verified daily coupon alerts and personalized store recommendations.",
      "Attributing affiliate rewards and cashbacks when you redeem offers via our store partner links.",
      "Improving website performance, page load speeds, and search accuracy.",
      "Preventing fraudulent activity, automated bot queries, and security threats.",
    ],
  },
  {
    id: "third-party-links",
    icon: "🔗",
    title: "4. Third-Party Links & Affiliate Partners",
    content: `Persuekey partners with major affiliate networks (such as CJ, Rakuten, Impact) and retail merchants. When you click on a store deal or copy a coupon code, you may be redirected to the merchant's external website. We do not control merchant websites, and their respective privacy policies will govern your interactions with them.`,
  },
  {
    id: "data-security",
    icon: "🔐",
    title: "5. Data Security & Retention",
    content: `We employ enterprise-grade encryption (TLS/SSL), secure database storage, and strict access controls. Your data is retained only as long as necessary to fulfill the services requested or comply with legal requirements.`,
  },
  {
    id: "user-rights",
    icon: "⚖️",
    title: "6. Your Rights & Choices",
    content: `Regardless of your location, Persuekey grants you full control over your personal data under GDPR and CCPA guidelines:`,
    bullets: [
      "Access & Export: Request a copy of the personal information we hold about you.",
      "Rectification & Erasure: Request corrections or complete deletion of your email address and data.",
      "Unsubscribe Anytime: Opt out of marketing emails instantly via the single-click 'Unsubscribe' link at the bottom of any email.",
    ],
  },
  {
    id: "contact",
    icon: "💬",
    title: "7. Contact Privacy Team",
    content: `If you have any questions, concerns, or requests regarding this Privacy Policy, please reach out to our dedicated Data Protection Desk:`,
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-zinc-50 pb-20 text-zinc-900">
      {/* Hero Header Banner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-zinc-950 via-emerald-950 to-zinc-950 py-16 text-white sm:py-24">
        {/* Glow Accents */}
        <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[800px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />

        <div className="mx-auto max-w-[1200px] px-6 text-center lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 mb-6 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-emerald-400">
              Data Protection & Privacy
            </span>
          </div>

          <h1 className="text-3xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
            Privacy Policy
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base text-zinc-400 sm:text-lg">
            Transparent, secure, and user-first data practices. Learn how we safeguard your personal information and shopping choices.
          </p>

          {/* Last Updated Badge */}
          <div className="mt-8 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-zinc-300">
            <span>Last Updated:</span>
            <span className="font-bold text-emerald-400">July 2026</span>
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
                {SECTIONS.map((sec) => (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-zinc-600 hover:bg-emerald-50 hover:text-emerald-700 transition"
                  >
                    <span>{sec.icon}</span>
                    <span className="truncate">{sec.title.split(". ")[1]}</span>
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
            {SECTIONS.map((sec) => (
              <section
                key={sec.id}
                id={sec.id}
                className="scroll-mt-24 rounded-3xl border border-zinc-200/80 bg-white p-6 sm:p-8 shadow-sm transition-all hover:border-violet-200 hover:shadow-md"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-50 border border-emerald-100 text-xl shadow-xs">
                    {sec.icon}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-zinc-900 tracking-tight">
                    {sec.title}
                  </h2>
                </div>

                <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
                  {sec.content}
                </p>

                {sec.bullets && (
                  <ul className="mt-4 flex flex-col gap-2.5 pl-2">
                    {sec.bullets.map((b, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-zinc-700">
                        <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {sec.id === "contact" && (
                  <div className="mt-6 rounded-2xl border border-emerald-200/80 bg-emerald-50/50 p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-bold text-zinc-900">Have questions about your data?</p>
                      <p className="text-xs text-zinc-600">Our privacy team is available 24/7 to assist you.</p>
                    </div>
                    <a
                      href="mailto:support@persuekey.com"
                      className="shrink-0 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-extrabold text-white shadow-sm transition hover:bg-emerald-700 active:scale-95"
                    >
                      support@persuekey.com
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
