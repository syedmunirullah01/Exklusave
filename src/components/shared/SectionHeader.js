import Link from "next/link";

export default function SectionHeader({ title, centered = false, href = "#" }) {
  const hasLink = href && href !== "#";

  return (
    <div
      className={`mb-3 sm:mb-4 flex items-center justify-between gap-4 border-b border-zinc-100 pb-3.5 w-full`}
    >
      <div className={`flex items-center gap-2.5 sm:gap-3.5 ${centered ? "mx-auto" : ""}`}>
        <span className="text-[26px] sm:text-[36px] font-light text-zinc-300 select-none">|</span>
        <h2 className="font-sans text-[22px] sm:text-[30px] font-black text-zinc-900 tracking-tight">
          {title}
        </h2>
        <span className="text-[26px] sm:text-[36px] font-light text-zinc-300 select-none">|</span>
      </div>

      {!centered && hasLink ? (
        <Link
          href={href}
          className="group text-[11px] font-bold text-zinc-550 hover:text-[var(--color-primary)] transition-colors flex items-center gap-1 uppercase tracking-wider"
        >
          View All
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </Link>
      ) : null}
    </div>
  );
}
