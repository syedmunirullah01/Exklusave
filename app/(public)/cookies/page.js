import Link from "next/link";

export const metadata = {
  title: "Cookie Policy | Persuekey",
  description: "Learn about how Persuekey uses cookies, tracking technologies, and how to manage your browser preferences.",
};

const COOKIE_SECTIONS = [
  {
    id: "what-are-cookies",
    icon: "🍪",
    title: "1. What Are Cookies?",
    content: `Cookies are small text files placed on your device when you browse websites. They help websites recognize your browser, remember your active preferences, store affiliate coupon tracking tokens, and ensure smooth navigation.`,
  },
  {
    id: "types-of-cookies",
    icon: "🧩",
    title: "2. Types of Cookies We Use",
    content: `Persuekey uses three essential categories of cookies:`,
    bullets: [
      "Strictly Necessary Cookies: Required for core website navigation, search functions, and security features.",
      "Affiliate & Attribution Cookies: Used to record when you click a merchant coupon link so our store partners can credit Persuekey for bringing you the discount.",
      "Analytics & Preference Cookies: Help us measure aggregate traffic metrics, page load performance, and popular store searches.",
    ],
  },
  {
    id: "third-party-cookies",
    icon: "🌐",
    title: "3. Third-Party & Partner Cookies",
    content: `When you click out to an affiliate retailer site (e.g. Amazon, Nike, Flipkart), third-party cookies or web beacons may be set by the merchant or affiliate network to track successful checkout redemptions. We encourage you to consult the cookie policies of merchant partner sites.`,
  },
  {
    id: "managing-cookies",
    icon: "⚙️",
    title: "4. How to Control & Disable Cookies",
    content: `You can control, block, or clear cookies directly through your web browser settings. Most modern browsers allow you to disable third-party cookies or receive a notification before a cookie is stored:`,
    bullets: [
      "Google Chrome: Settings → Privacy and Security → Cookies and other site data",
      "Mozilla Firefox: Options → Privacy & Security → Cookies and Site Data",
      "Apple Safari: Preferences → Privacy → Block all cookies",
      "Microsoft Edge: Settings → Site Permissions → Cookies and site data",
    ],
  },
  {
    id: "policy-updates",
    icon: "🔄",
    title: "5. Policy Updates & Inquiries",
    content: `We may update our Cookie Policy periodically to reflect technological or regulatory changes. If you have questions regarding cookie usage on Persuekey, feel free to contact us:`,
  },
];

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-zinc-50 pb-20 text-zinc-900">
      {/* Hero Header Banner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-zinc-950 via-teal-950 to-zinc-950 py-16 text-white sm:py-24">
        {/* Glow Accents */}
        <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[800px] -translate-x-1/2 rounded-full bg-teal-500/10 blur-3xl" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-teal-500/50 to-transparent" />

        <div className="mx-auto max-w-[1200px] px-6 text-center lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/10 px-3.5 py-1 mb-6 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-teal-400 animate-pulse" />
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-teal-400">
              Cookie Management & Preferences
            </span>
          </div>

          <h1 className="text-3xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
            Cookie Policy
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base text-zinc-400 sm:text-lg">
            Understand how cookies and affiliate tracking technologies power your savings on Persuekey.
          </p>

          <div className="mt-8 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-zinc-300">
            <span>Last Reviewed:</span>
            <span className="font-bold text-teal-400">July 2026</span>
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
                {COOKIE_SECTIONS.map((sec) => (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-zinc-600 hover:bg-teal-50 hover:text-teal-700 transition"
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
                  Cookie Settings Help →
                </Link>
              </div>
            </div>
          </aside>

          {/* Cookie Detail Cards */}
          <main className="flex flex-col gap-8">
            {COOKIE_SECTIONS.map((sec) => (
              <section
                key={sec.id}
                id={sec.id}
                className="scroll-mt-24 rounded-3xl border border-zinc-200/80 bg-white p-6 sm:p-8 shadow-sm transition-all hover:border-teal-200 hover:shadow-md"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-teal-50 border border-teal-100 text-xl shadow-xs">
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
                        <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-teal-500" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {sec.id === "policy-updates" && (
                  <div className="mt-6 rounded-2xl border border-teal-200/80 bg-teal-50/50 p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-bold text-zinc-900">Questions about cookie preferences?</p>
                      <p className="text-xs text-zinc-600">We're happy to guide you through browser cookie options.</p>
                    </div>
                    <a
                      href="mailto:support@persuekey.com"
                      className="shrink-0 rounded-xl bg-teal-600 px-5 py-2.5 text-xs font-extrabold text-white shadow-sm transition hover:bg-teal-700 active:scale-95"
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
