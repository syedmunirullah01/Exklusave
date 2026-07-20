import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

function ArrowRightIcon({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function VerifiedCheckIcon({ className = "h-3.5 w-3.5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 11 2 2 4-4" />
    </svg>
  );
}

export default function StoreCard({ store }) {
  const storeHref = `/stores/${store.categorySlug || 'general'}/${store.slug}`;

  return (
    <Link
      href={storeHref}
      className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-black/8 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-emerald-500/40 hover:shadow-[0_20px_40px_rgba(16,185,129,0.12)]"
    >
      {/* Verified Pill Badge */}
      <div className="flex items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-emerald-600">
          <VerifiedCheckIcon className="h-3 w-3 text-emerald-500" />
          <span>Verified</span>
        </span>

        <span className="text-[11px] font-bold text-zinc-400 font-mono">
          {store.count || `${store.offersCount || 0} Deals`}
        </span>
      </div>

      {/* Brand Logo & Name */}
      <div className="my-6 text-center">
        {store.logoImage ? (
          <div className="mx-auto flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl border border-black/8 bg-zinc-50 p-3 shadow-inner group-hover:scale-105 transition-transform duration-300">
            <div className="relative h-full w-full">
              <Image src={store.logoImage} alt={`${store.name} logo`} fill className="object-contain" unoptimized />
            </div>
          </div>
        ) : (
          <div
            className={cn(
              "mx-auto flex h-20 w-20 items-center justify-center rounded-2xl border border-black/8 bg-gradient-to-br from-zinc-800 to-black text-center text-white font-black text-xl shadow-md group-hover:scale-105 transition-transform duration-300",
              store.logoClassName
            )}
          >
            <span>{store.logoText || store.name?.charAt(0) || "P"}</span>
          </div>
        )}

        <h3 className="mt-4 text-lg font-black tracking-tight text-zinc-900 group-hover:text-emerald-600 transition-colors">
          {store.name}
        </h3>
      </div>

      {/* Footer CTA Button */}
      <div className="flex items-center justify-between border-t border-black/5 pt-4 text-xs font-bold text-zinc-500 group-hover:text-black">
        <span>Explore Coupons</span>
        <span className="grid h-7 w-7 place-items-center rounded-full bg-zinc-100 text-black transition-all group-hover:bg-emerald-500 group-hover:text-white group-hover:translate-x-1">
          <ArrowRightIcon className="h-3.5 w-3.5" />
        </span>
      </div>
    </Link>
  );
}

