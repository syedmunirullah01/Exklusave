import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { getPublicSiteSettings } from "@/server/services/settings-service";

const topCategories = ["Fashion", "Food", "Footwear", "Travel", "Beauty", "Furniture", "Home & Garden", "E-Bike"];
const topStores = ["Waterdrop", "Dorothy Perkins", "Debenhams", "Gousto UK", "EcoFlow", "FlexShopper", "Vitality", "Beginning Boutique AU"];
const usefulLinks = ["Home", "Stores", "Categories", "Contact Us", "About Us", "Imprint", "Sitemap"];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function MailIcon({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

export default async function Footer() {
  const settings = await getPublicSiteSettings();
  const socialLinks = [
    { label: "Facebook", href: settings.social.facebook },
    { label: "Instagram", href: settings.social.instagram },
    { label: "X", href: settings.social.x },
    { label: "TikTok", href: settings.social.tiktok },
    { label: "YouTube", href: settings.social.youtube },
  ].filter((item) => item.href);

  return (
    <footer className="relative mt-32 overflow-hidden border-t border-zinc-200 bg-gradient-to-b from-white to-zinc-50/70 pt-20 pb-12 text-zinc-650 font-sans">
      <div className="absolute top-0 left-1/4 h-px w-1/2 bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
      <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-[800px] -translate-x-1/2 rounded-full bg-emerald-500/5 blur-[120px]" />

      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid gap-16 border-b border-zinc-200 pb-16 lg:grid-cols-[1.45fr_0.95fr] lg:items-start">
          
          {/* Left Grid: 4 Columns of Links */}
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            
            <div className="flex flex-col gap-4.5">
              <h4 className="text-[11px] font-black uppercase tracking-[0.22em] text-zinc-800">Top Categories</h4>
              <nav className="flex flex-col gap-3">
                {topCategories.map((link) => (
                  <Link 
                    key={link} 
                    href="#" 
                    className="text-[13px] font-bold text-zinc-500 transition-all duration-300 hover:text-emerald-600 hover:translate-x-1 inline-block"
                  >
                    {link}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="flex flex-col gap-4.5">
              <h4 className="text-[11px] font-black uppercase tracking-[0.22em] text-zinc-800">Top Stores</h4>
              <nav className="flex flex-col gap-3">
                {topStores.map((link) => (
                  <Link 
                    key={link} 
                    href="#" 
                    className="text-[13px] font-bold text-zinc-500 transition-all duration-300 hover:text-emerald-600 hover:translate-x-1 inline-block"
                  >
                    {link}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="flex flex-col gap-4.5">
              <h4 className="text-[11px] font-black uppercase tracking-[0.22em] text-zinc-800">Useful Links</h4>
              <nav className="flex flex-col gap-3">
                {usefulLinks.map((link) => (
                  <Link 
                    key={link} 
                    href="#" 
                    className="text-[13px] font-bold text-zinc-500 transition-all duration-300 hover:text-emerald-600 hover:translate-x-1 inline-block"
                  >
                    {link}
                  </Link>
                ))}
              </nav>
            </div>

            {socialLinks.length ? (
              <div className="flex flex-col gap-4.5">
                <h4 className="text-[11px] font-black uppercase tracking-[0.22em] text-zinc-800">Social</h4>
                <nav className="flex flex-col gap-3">
                  {socialLinks.map((link) => (
                    <Link 
                      key={link.label} 
                      href={link.href} 
                      target="_blank" 
                      className="text-[13px] font-bold text-zinc-500 transition-all duration-300 hover:text-emerald-600 hover:translate-x-1 inline-block"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>
            ) : null}
          </div>

          {/* Right Section: Join Newsletter Card */}
          <div className="flex flex-col lg:items-end">
            <h4 className="text-[14px] font-black uppercase tracking-[0.2em] text-zinc-800">
              Join the Elite
            </h4>
            <p className="mt-3.5 max-w-sm text-xs leading-relaxed text-zinc-400 lg:text-right">
              Subscribe for updates, featured drops, and store highlights.
            </p>
            
            <div className="mt-8 flex w-full max-w-md flex-col gap-3.5 sm:flex-row sm:items-center">
              <div className="group relative flex-1">
                <MailIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400 group-focus-within:text-emerald-600 transition-colors pointer-events-none z-10" />
                <input
                  type="email"
                  placeholder="name@exklusave.com"
                  className="h-14 w-full rounded-2xl border border-zinc-250 bg-white pl-11 pr-5 text-sm text-zinc-950 outline-none transition-all placeholder:text-zinc-400 focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/5"
                />
              </div>
              <Button 
                type="button" 
                className="group h-14 gap-3 bg-gradient-to-r from-emerald-600 to-teal-600 px-8 text-[11px] font-black uppercase tracking-[0.2em] text-white transition-all shadow-md shadow-emerald-600/10 hover:shadow-emerald-600/20 hover:scale-[1.03] active:scale-97"
              >
                Join Now
                <ArrowIcon />
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 flex flex-col gap-6 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 sm:flex-row sm:items-center sm:justify-between font-mono">
          <div className="flex items-center gap-4">
            <p>{`© 2026 ${settings.siteName}`}</p>
            <span className="text-zinc-250">|</span>
            <span className="text-[9px] text-zinc-450 border border-zinc-200 bg-zinc-100 px-2 py-0.5 rounded tracking-wider leading-none">
              🔒 SSL SECURED
            </span>
          </div>
          <a 
            href={`mailto:${settings.supportEmail}`} 
            className="hover:text-emerald-600 transition-colors lowercase tracking-normal"
          >
            {settings.supportEmail}
          </a>
        </div>
      </div>
    </footer>
  );
}
