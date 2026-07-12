import { cn } from "@/lib/utils";

function GroupIcon() {
  return (
    <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function CodeIcon() {
  return (
    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}

function TagIcon() {
  return (
    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
      <line x1="7" y1="7" x2="7.01" y2="7" />
    </svg>
  );
}

export default function FeaturedCouponCard({ coupon }) {
  const isCode = coupon.tag?.toUpperCase() === "CODE";

  return (
    <article className="group flex flex-col bg-white rounded-2xl border border-zinc-200 overflow-hidden hover:-translate-y-1 hover:shadow-md transition-all duration-300 min-h-[310px]">
      
      {/* Top Section: Lilac Grey background with Store Logo */}
      <div className="relative h-32 w-full bg-zinc-50/70 border-b border-zinc-100 flex items-center justify-center overflow-hidden">
        
        {/* Top-Right Decorative Curve Circle */}
        <span className="absolute -top-10 -right-10 h-24 w-24 rounded-full bg-zinc-200/25 pointer-events-none" />

        {/* Badge: Code or Deal */}
        <span 
          className={cn(
            "absolute top-3 left-3 px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider text-white",
            isCode ? "bg-emerald-600/90" : "bg-zinc-800"
          )}
        >
          {coupon.tag}
        </span>

        {/* Clicks Used count Pill */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1 border border-zinc-200 bg-white rounded px-1.5 py-0.5 text-[9px] font-bold text-zinc-500 shadow-sm leading-none">
          <GroupIcon />
          <span>{coupon.clicksCount || 101} Used</span>
        </div>

        {/* Store Logo display */}
        {coupon.logoImage ? (
          <img 
            src={coupon.logoImage} 
            alt={coupon.brand} 
            className="max-h-[50px] max-w-[130px] object-contain p-1"
          />
        ) : (
          <div className="h-11 w-11 rounded-xl bg-zinc-200/60 flex items-center justify-center font-black text-zinc-400 text-sm shadow-inner uppercase">
            {coupon.logoText}
          </div>
        )}
      </div>

      {/* Bottom Section: Texts & CTA Button */}
      <div className="flex flex-col p-4.5 flex-1 justify-between gap-4">
        
        <div className="flex flex-col">
          <h3 className="text-[13px] font-black text-zinc-900 leading-relaxed text-left line-clamp-1">
            {coupon.title}
          </h3>
          <p className="text-[10.5px] text-zinc-400 leading-normal text-left line-clamp-2 mt-1 min-h-[32px]">
            {coupon.description}
          </p>
        </div>

        {/* Dynamic CTA button */}
        <button
          type="button"
          className="group/btn relative w-full flex items-center justify-center gap-2 h-10.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-[10px] uppercase tracking-[0.18em] transition-all shadow-sm shadow-emerald-600/5 hover:scale-[1.02] active:scale-[0.98]"
        >
          {isCode ? (
            <>
              <CodeIcon />
              <span>Get Code →</span>
            </>
          ) : (
            <>
              <TagIcon />
              <span>Get Deal →</span>
            </>
          )}
        </button>

      </div>
      
    </article>
  );
}
