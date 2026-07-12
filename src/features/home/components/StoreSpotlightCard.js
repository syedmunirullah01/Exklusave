import Link from "next/link";
import Image from "next/image";

export default function StoreSpotlightCard({ store }) {
  const shortMark = (store.logoText || store.name)
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <Link
      href={store.href ?? "#"}
      className="group relative block overflow-hidden rounded-[24px] border border-zinc-200/75 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(0,0,0,0.06)] hover:border-zinc-350"
    >
      <div className="flex flex-col items-center p-5 text-center min-h-[190px] justify-between">
        {/* Logo Container */}
        <div className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-[16px] border border-zinc-200/80 bg-zinc-50/50 p-2 transition-transform duration-300 group-hover:scale-105">
          {store.logoImage ? (
            <img 
              src={store.logoImage} 
              alt={`${store.name} logo`} 
              className="max-h-full max-w-full object-contain rounded-[12px]" 
            />
          ) : (
            <span className="text-sm font-black bg-gradient-to-br from-zinc-700 to-zinc-950 bg-clip-text text-transparent uppercase font-mono">
              {shortMark}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col items-center w-full mt-3">
          <h3 className="text-[12px] font-black uppercase tracking-[0.08em] text-zinc-800 transition-colors duration-300 group-hover:text-zinc-950 truncate max-w-full w-full px-1">
            {store.name}
          </h3>
          <p className="text-[9px] font-bold uppercase tracking-wider text-zinc-400 mt-1">
            Coupon Code
          </p>
          
          {/* Minimalist horizontal underline */}
          <div className="w-8 h-[2px] bg-zinc-200 mt-3.5 transition-colors duration-300 group-hover:bg-zinc-800" />
        </div>
      </div>
    </Link>
  );
}
