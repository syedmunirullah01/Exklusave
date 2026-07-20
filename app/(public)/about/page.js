import { getMetadataDefaults } from "@/server/services/settings-service";

export async function generateMetadata() {
  return getMetadataDefaults("About Us");
}

const stats = [
  { value: "126k+", label: "Active Members" },
  { value: "8,400+", label: "Verified Offers" },
  { value: "1,200+", label: "Partner Stores" },
  { value: "99%", label: "Satisfaction Rate" },
];

const values = [
  {
    emoji: "🔍",
    title: "Transparency First",
    description: "Every deal we list is manually reviewed or sourced from verified affiliate networks. No fakes, no inflated prices.",
    accent: "from-emerald-500/15 to-teal-500/10 border-emerald-500/20",
    iconBg: "bg-emerald-500/15 text-emerald-600",
  },
  {
    emoji: "⚡",
    title: "Always Up to Date",
    description: "Our catalog syncs daily with live offers. Expired coupons are flagged and removed automatically so you never waste a click.",
    accent: "from-violet-500/15 to-purple-500/10 border-violet-500/20",
    iconBg: "bg-violet-500/15 text-violet-600",
  },
  {
    emoji: "🤝",
    title: "Member-Centric",
    description: "We built Persuekey for shoppers, not advertisers. Every feature — from alerts to curated picks — is designed for your wallet.",
    accent: "from-amber-500/15 to-orange-500/10 border-amber-500/20",
    iconBg: "bg-amber-500/15 text-amber-600",
  },
  {
    emoji: "🌍",
    title: "Global Reach",
    description: "We partner with stores across multiple regions to ensure deals are accessible no matter where you shop from.",
    accent: "from-blue-500/15 to-cyan-500/10 border-blue-500/20",
    iconBg: "bg-blue-500/15 text-blue-600",
  },
];

const timeline = [
  { year: "2022", title: "The Idea", description: "Founded by a team of deal-hunters tired of outdated coupon sites and broken codes." },
  { year: "2023", title: "First 100 Stores", description: "Launched with 100 hand-curated store partnerships and a verified offers engine." },
  { year: "2024", title: "50k Members", description: "Crossed 50,000 active members and launched our affiliate network integrations." },
  { year: "2025", title: "Global Expansion", description: "Expanded to cover stores across UK, AU, DE, and more with localised deal feeds." },
  { year: "2026", title: "Today", description: "Over 126k members, 1,200+ partner stores, and a mission to keep saving you money." },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <div className="relative overflow-hidden bg-zinc-950 pb-28 pt-20">
        <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[900px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[100px]" />
        <div className="pointer-events-none absolute -right-20 top-10 h-60 w-60 rounded-full bg-teal-500/8 blur-[80px]" />
        <div className="pointer-events-none absolute bottom-0 left-1/2 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />

        <div className="relative mx-auto max-w-[1200px] px-5 sm:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-4 py-1.5 mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.22em] text-emerald-400">Our Story</span>
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-[-0.04em] text-white leading-[1.05] mb-6">
            We Help You{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Shop Smarter
            </span>
          </h1>
          <p className="text-base sm:text-lg text-white/45 max-w-2xl mx-auto leading-relaxed">
            Persuekey was built on a simple belief: everyone deserves access to verified, up-to-date deals without the noise, spam, or broken links.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 -mt-10 relative z-10 mb-20">
          {stats.map((s) => (
            <div key={s.label} className="rounded-3xl border border-zinc-200 bg-white p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-3xl sm:text-4xl font-black tracking-[-0.04em] text-zinc-900 mb-1">{s.value}</div>
              <div className="text-xs font-bold uppercase tracking-[0.15em] text-zinc-400">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Mission */}
        <div className="grid gap-12 lg:grid-cols-2 items-center mb-24">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-4 py-1.5 mb-5">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Our Mission</span>
            </div>
            <h2 className="text-4xl font-black tracking-tight text-zinc-900 leading-snug mb-5">
              Making Every Pound, Dollar & Euro Go Further
            </h2>
            <p className="text-base text-zinc-500 leading-relaxed mb-5">
              We started Persuekey because we were frustrated. Frustrated by coupon sites that showed expired deals, by affiliate pages dressed up as "reviews", and by the sheer noise of the modern internet.
            </p>
            <p className="text-base text-zinc-500 leading-relaxed mb-8">
              So we built something different: a platform where every offer is verified, every store is vetted, and every user can trust that the deal they click is real.
            </p>
            <div className="flex flex-wrap gap-3">
              {["Verified Deals Only", "No Fake Reviews", "Daily Synced", "Member First"].map((badge) => (
                <span key={badge} className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Visual panel */}
          <div className="relative rounded-3xl overflow-hidden bg-zinc-950 p-10 flex flex-col items-center justify-center text-center min-h-[320px]">
            <div className="pointer-events-none absolute -top-10 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-emerald-500/20 blur-[60px]" />
            <div className="relative text-7xl mb-5">🎯</div>
            <div className="relative text-2xl font-black text-white mb-3">Built for Shoppers</div>
            <div className="relative text-sm text-white/40 max-w-xs leading-relaxed">
              Every feature, filter and email we build starts with one question: does this help our members save more?
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-4 py-1.5 mb-4">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">What We Stand For</span>
            </div>
            <h2 className="text-4xl font-black tracking-tight text-zinc-900">Our Core Values</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.title} className={`rounded-3xl border bg-gradient-to-br ${v.accent} p-6 transition-all hover:-translate-y-1 hover:shadow-lg`}>
                <div className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl text-2xl mb-4 ${v.iconBg}`}>
                  {v.emoji}
                </div>
                <h3 className="text-base font-black text-zinc-900 mb-2">{v.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-4 py-1.5 mb-4">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Our Journey</span>
            </div>
            <h2 className="text-4xl font-black tracking-tight text-zinc-900">How We Got Here</h2>
          </div>
          <div className="relative">
            {/* Line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-500/50 via-emerald-500/20 to-transparent hidden sm:block" />
            <div className="space-y-8">
              {timeline.map((item, i) => (
                <div key={item.year} className="flex gap-8 items-start sm:pl-16 relative">
                  <div className="hidden sm:flex absolute left-0 h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-emerald-500/30 bg-white text-xs font-black text-emerald-600 shadow-sm">
                    {item.year}
                  </div>
                  <div className="flex-1 rounded-3xl border border-zinc-100 bg-zinc-50 p-6 hover:border-zinc-200 hover:bg-white transition-colors">
                    <div className="sm:hidden text-xs font-black text-emerald-600 mb-1 uppercase tracking-wider">{item.year}</div>
                    <h4 className="text-lg font-black text-zinc-900 mb-1">{item.title}</h4>
                    <p className="text-sm text-zinc-500 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="relative mb-20 overflow-hidden rounded-3xl bg-zinc-950 px-8 py-14 text-center">
          <div className="pointer-events-none absolute -top-16 left-1/2 h-48 w-[600px] -translate-x-1/2 rounded-full bg-emerald-500/15 blur-[80px]" />
          <div className="relative">
            <h3 className="text-3xl font-black text-white mb-3">Start Saving Today</h3>
            <p className="text-sm text-white/40 mb-8 max-w-sm mx-auto">Browse 8,400+ verified deals across 1,200+ stores — all free, all verified.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="/stores" className="inline-flex h-12 items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 px-8 text-[11px] font-black uppercase tracking-[0.18em] text-black shadow-lg shadow-emerald-500/25 transition-all hover:scale-105">
                Browse Stores →
              </a>
              <a href="/contact" className="inline-flex h-12 items-center gap-2 rounded-2xl border border-white/15 px-8 text-[11px] font-black uppercase tracking-[0.18em] text-white/70 transition-all hover:border-white/30 hover:text-white">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
