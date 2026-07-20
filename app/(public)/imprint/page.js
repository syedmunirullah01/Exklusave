import { getMetadataDefaults } from "@/server/services/settings-service";
import { getPublicSiteSettings } from "@/server/services/settings-service";

export async function generateMetadata() {
  return getMetadataDefaults("Imprint");
}

const sections = [
  {
    title: "Information According to § 5 TMG",
    content: [
      { label: "Company Name", value: "Persuekey Ltd." },
      { label: "Registered Address", value: "123 Commerce Street, London, EC1A 1BB, United Kingdom" },
      { label: "Company Type", value: "Private Limited Company" },
      { label: "Registration Number", value: "UK12345678" },
      { label: "VAT ID", value: "GB 123 456 789" },
    ],
  },
  {
    title: "Contact Information",
    content: [
      { label: "Email", value: "support@persuekey.com", href: "mailto:support@persuekey.com" },
      { label: "Partnership Inquiries", value: "partners@persuekey.com", href: "mailto:partners@persuekey.com" },
      { label: "Trust & Safety", value: "trust@persuekey.com", href: "mailto:trust@persuekey.com" },
    ],
  },
  {
    title: "Responsible for Content",
    content: [
      { label: "Editorial Responsibility", value: "Persuekey Editorial Team" },
      { label: "Address", value: "123 Commerce Street, London, EC1A 1BB, United Kingdom" },
      { label: "Jurisdiction", value: "England & Wales" },
    ],
  },
];

const disclaimers = [
  {
    title: "Liability for Content",
    text: "The contents of our pages have been created with the utmost care. However, we cannot guarantee the accuracy, completeness, or topicality of the content. As a service provider, we are liable for our own content on these pages according to general laws. As a service provider, we are not obligated to monitor transmitted or stored third-party information.",
  },
  {
    title: "Liability for Links",
    text: "Our offer contains links to external websites of third parties, on whose contents we have no influence. Therefore, we cannot assume any liability for these external contents. The respective provider or operator of the linked pages is always responsible for their content. The linked pages were checked for possible legal violations at the time of linking. Illegal content was not recognisable at the time of linking.",
  },
  {
    title: "Affiliate Disclosure",
    text: "Persuekey participates in affiliate marketing programs. When you click on certain links and make purchases, we may earn a commission. This does not affect the price you pay. We only promote deals and stores that we believe provide genuine value to our members. Affiliate relationships do not influence our editorial decisions or offer verification process.",
  },
  {
    title: "Copyright",
    text: "The content and works created by the site operators on these pages are subject to copyright law. Duplication, processing, distribution, or any form of commercialisation of such material beyond the scope of the copyright law shall require the prior written consent of its respective author or creator. Downloads and copies of this site are only permitted for private, non-commercial use.",
  },
];

export default async function ImprintPage() {
  const settings = await getPublicSiteSettings();
  const year = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <div className="relative overflow-hidden bg-zinc-950 pb-20 pt-20">
        <div className="pointer-events-none absolute -top-20 left-1/2 h-56 w-[600px] -translate-x-1/2 rounded-full bg-emerald-500/8 blur-[100px]" />
        <div className="pointer-events-none absolute bottom-0 left-1/2 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
        <div className="relative mx-auto max-w-[900px] px-5 sm:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 mb-6">
            <span className="text-[10px] font-black uppercase tracking-[0.22em] text-white/50">Legal Information</span>
          </div>
          <h1 className="text-5xl sm:text-6xl font-black tracking-[-0.04em] text-white mb-4">Imprint</h1>
          <p className="text-sm text-white/35 max-w-lg mx-auto leading-relaxed">
            Legal disclosure and company information for {settings.siteName} as required by applicable law.
          </p>
          <p className="mt-3 text-[11px] text-white/20 uppercase tracking-widest">Last updated: {year}</p>
        </div>
      </div>

      <div className="mx-auto max-w-[900px] px-5 sm:px-8 py-16 space-y-8">

        {/* Company Info Sections */}
        {sections.map((section) => (
          <div key={section.title} className="rounded-3xl border border-zinc-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="border-b border-zinc-100 px-6 py-4 bg-zinc-50/70">
              <h2 className="text-sm font-black uppercase tracking-[0.18em] text-zinc-700">{section.title}</h2>
            </div>
            <div className="divide-y divide-zinc-100">
              {section.content.map((row) => (
                <div key={row.label} className="flex flex-col sm:flex-row sm:items-center gap-1 px-6 py-4">
                  <span className="w-full sm:w-48 shrink-0 text-xs font-black uppercase tracking-[0.14em] text-zinc-400">{row.label}</span>
                  {row.href ? (
                    <a href={row.href} className="text-sm font-semibold text-emerald-600 hover:underline transition-colors">
                      {row.value}
                    </a>
                  ) : (
                    <span className="text-sm font-semibold text-zinc-700">{row.value}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Disclaimer Sections */}
        <div className="rounded-3xl border border-zinc-200 bg-white overflow-hidden shadow-sm">
          <div className="border-b border-zinc-100 px-6 py-4 bg-zinc-50/70">
            <h2 className="text-sm font-black uppercase tracking-[0.18em] text-zinc-700">Legal Notices & Disclaimers</h2>
          </div>
          <div className="divide-y divide-zinc-100">
            {disclaimers.map((d) => (
              <div key={d.title} className="px-6 py-6">
                <h3 className="text-sm font-black text-zinc-900 mb-3 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                  {d.title}
                </h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{d.text}</p>
              </div>
            ))}
          </div>
        </div>

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
