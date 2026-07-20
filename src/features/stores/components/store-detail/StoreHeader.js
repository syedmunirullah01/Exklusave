import Image from "next/image";

function SparklesIcon({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    </svg>
  );
}

function VerifiedBadgeIcon({ className = "h-3.5 w-3.5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 11 2 2 4-4" />
    </svg>
  );
}

export function BrandMark({ size = "large", logoText, logoClassName, logoImage, name }) {
  const base = size === "large" ? "h-12 w-12 sm:h-16 sm:w-16" : "h-10 w-10";
  return (
    <div className={`grid ${base} place-items-center overflow-hidden rounded-2xl border border-white/20 bg-white ${logoImage ? "p-1.5" : "p-2"} shadow-xl ring-2 ring-emerald-500/40 transition-transform duration-300 hover:scale-105 shrink-0`}>
      {logoImage ? (
        <div className="relative h-full w-full overflow-hidden rounded-xl">
          <Image src={logoImage} alt={`${name} logo`} fill className="object-contain" unoptimized />
        </div>
      ) : (
        <div className={`flex h-full w-full items-center justify-center rounded-xl text-center font-black text-sm text-white ${logoClassName || 'bg-gradient-to-br from-zinc-800 to-black'}`}>
          <span>{logoText || name?.charAt(0) || "P"}</span>
        </div>
      )}
    </div>
  );
}

export default function StoreHeader({ singleStore, activeTab, onTabChange }) {
  const totalCoupons = singleStore.activeCoupons || 0;
  const totalDeals = singleStore.activeDeals || 0;
  const totalCount = totalCoupons + totalDeals || 10;

  const currentDate = new Date();
  const monthYearStr = currentDate.toLocaleString("en-US", { month: "long", year: "numeric" });

  return (
    <div className="space-y-3 mb-6">
      {/* Top Announcement Bar */}
      <div className="w-full overflow-hidden rounded-xl border border-white/20 bg-gradient-to-r from-emerald-600 via-teal-500 to-green-600 py-2 px-3 text-center text-[10px] sm:text-xs font-black uppercase tracking-[0.16em] text-white shadow-md flex items-center justify-center gap-2">
        <span className="flex h-1.5 w-1.5 rounded-full bg-white animate-ping shrink-0" />
        <span className="hidden sm:inline">BEST STORE COLLECTION • VERIFIED MEMBER DISCOUNTS & PROMO CODES</span>
        <span className="sm:hidden">BEST STORE COLLECTION</span>
      </div>

      {/* Compact Hero Cover Banner */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/15 bg-gradient-to-br from-[#0c2417] via-[#081b11] to-[#040d08] px-4 py-5 sm:px-8 sm:py-8 text-center text-white shadow-lg">
        {/* Background Glowing Ambient Light Orbs */}
        <div className="absolute top-0 left-1/4 h-60 w-60 rounded-full bg-emerald-500/20 blur-[80px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 h-60 w-60 rounded-full bg-teal-400/20 blur-[80px] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.06),transparent_60%)] pointer-events-none" />

        <div className="relative z-10 space-y-3.5 flex flex-col items-center">
          
          {/* Brand Logo Avatar + Verified Pill Row */}
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
            <BrandMark
              size="large"
              logoText={singleStore.logoText}
              logoClassName={singleStore.logoClassName}
              logoImage={singleStore.logoImage}
              name={singleStore.name}
            />

            <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[10px] sm:text-xs font-black uppercase tracking-[0.14em] text-emerald-400 backdrop-blur-md">
              <VerifiedBadgeIcon className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
              <span>VERIFIED {singleStore.name?.toUpperCase()} STORE</span>
            </div>
          </div>

          {/* Dynamic Month & Year Title - Fully Visible */}
          <div className="space-y-1 max-w-3xl px-2 w-full">
            <h1 className="text-sm sm:text-2xl lg:text-3xl font-black tracking-tight text-white leading-snug drop-shadow-md">
              {singleStore.name} Promo Codes & Coupons {monthYearStr}
            </h1>
            <p className="text-[10px] sm:text-xs text-zinc-300 font-medium leading-relaxed">
              Unlock verified discount codes, exclusive deals, and member-only coupons for {singleStore.name}. Updated daily.
            </p>
          </div>

          {/* Filter Pills Embedded in Banner */}
          <div className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-black/40 p-1 backdrop-blur-xl shadow-md max-w-full">
            {[
              { key: "all", label: `All (${totalCount})` },
              { key: "coupon", label: `Codes (${totalCoupons})` },
              { key: "deal", label: `Deals (${totalDeals})` },
            ].map(({ key, label }) => {
              const isSelected = activeTab === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => onTabChange && onTabChange(key)}
                  className={`px-2.5 sm:px-3.5 py-1 text-[9px] sm:text-[11px] font-black uppercase tracking-wider transition-all duration-200 rounded-full text-center whitespace-nowrap ${
                    isSelected
                      ? "bg-[var(--accent)] text-black shadow-md scale-[1.02]"
                      : "bg-white/10 text-white/80 hover:bg-white/20 hover:text-white border border-white/10"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
