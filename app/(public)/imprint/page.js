import { getMetadataDefaults, getPublicSiteSettings } from "@/server/services/settings-service";

export async function generateMetadata() {
  return getMetadataDefaults("Imprint");
}

const DEFAULT_IMPRINT_SECTIONS = [
  { id: "isec-1", icon: "🏢", title: "1. Information According to § 5 TMG", content: `Company Name: Persuekey Ltd.\nRegistered Address: 123 Commerce Street, London, EC1A 1BB, United Kingdom\nCompany Type: Private Limited Company\nRegistration Number: UK12345678\nVAT ID: GB 123 456 789` },
  { id: "isec-2", icon: "📞", title: "2. Contact Information", content: `General Support: support@persuekey.com\nPartnership Inquiries: partners@persuekey.com\nTrust & Safety: trust@persuekey.com` },
  { id: "isec-3", icon: "📝", title: "3. Responsible for Content", content: `Editorial Responsibility: Persuekey Editorial Team\nAddress: 123 Commerce Street, London, EC1A 1BB, United Kingdom\nJurisdiction: England & Wales` },
  { id: "isec-4", icon: "⚖️", title: "4. Legal Disclaimers & Copyright", content: `Liability for Content: The contents of our pages have been created with the utmost care.\nLiability for Links: Our offer contains links to external websites of third parties, on whose contents we have no influence.\nAffiliate Disclosure: Persuekey participates in affiliate marketing programs.\nCopyright: Duplication or distribution beyond copyright scope requires prior written consent.` }
];

export default async function ImprintPage() {
  const settings = await getPublicSiteSettings();
  const pageData = settings.pages?.imprint || {};

  const heroBadge = pageData.heroBadge || "Legal Information";
  const heroTitle = pageData.heroTitle || "Imprint";
  const heroSubtitle = pageData.heroSubtitle || `Legal disclosure and company information for ${settings.siteName} as required by applicable law.`;
  const lastUpdated = pageData.lastUpdated || "July 2026";
  const sections = pageData.sections && pageData.sections.length > 0 ? pageData.sections : DEFAULT_IMPRINT_SECTIONS;
  const year = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-white">

      {/* Hero Header */}
      <div className="relative overflow-hidden bg-zinc-950 pb-20 pt-20">
        <div className="pointer-events-none absolute -top-20 left-1/2 h-56 w-[600px] -translate-x-1/2 rounded-full bg-emerald-500/8 blur-[100px]" />
        <div className="pointer-events-none absolute bottom-0 left-1/2 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
        <div className="relative mx-auto max-w-[900px] px-5 sm:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 mb-6">
            <span className="text-[10px] font-black uppercase tracking-[0.22em] text-white/50">{heroBadge}</span>
          </div>
          <h1 className="text-5xl sm:text-6xl font-black tracking-[-0.04em] text-white mb-4">{heroTitle}</h1>
          <p className="text-sm text-white/35 max-w-lg mx-auto leading-relaxed">
            {heroSubtitle}
          </p>
          <p className="mt-3 text-[11px] text-white/20 uppercase tracking-widest">Last updated: {lastUpdated}</p>
        </div>
      </div>

      <div className="mx-auto max-w-[900px] px-5 sm:px-8 py-16 space-y-8">
        {/* Company Info Sections */}
        {sections.map((section, idx) => (
          <div key={section.id || idx} className="rounded-3xl border border-zinc-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="border-b border-zinc-100 px-6 py-4 bg-zinc-50/70 flex items-center gap-2">
              <span className="text-base">{section.icon || "🏢"}</span>
              <h2 className="text-sm font-black uppercase tracking-[0.18em] text-zinc-700">{section.title}</h2>
            </div>
            <div className="px-6 py-5 text-sm text-zinc-700 leading-relaxed whitespace-pre-line">
              {section.content}
            </div>
          </div>
        ))}

        {/* Dispute Resolution */}
        <div className="rounded-3xl border border-amber-200 bg-amber-50/60 p-6">
          <h2 className="text-sm font-black uppercase tracking-[0.18em] text-amber-700 mb-3 flex items-center gap-2">
            <span className="text-base">⚖️</span>
            Online Dispute Resolution
          </h2>
          <p className="text-sm text-amber-800/70 leading-relaxed">
            The European Commission provides a platform for online dispute resolution (OS) at{" "}
            <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noreferrer" className="font-bold text-amber-700 hover:underline">
              https://ec.europa.eu/consumers/odr
            </a>
            . We are not obligated nor willing to participate in dispute resolution proceedings before a consumer arbitration board.
          </p>
        </div>

        {/* Footer note */}
        <div className="text-center py-6 border-t border-zinc-100">
          <p className="text-xs text-zinc-400">
            © {year} {settings.siteName} — All rights reserved.{" "}
            <a href="/privacy" className="hover:text-emerald-600 transition-colors">Privacy Policy</a>
            {" · "}
            <a href="/terms" className="hover:text-emerald-600 transition-colors">Terms of Use</a>
          </p>
        </div>
      </div>
    </div>
  );
}
