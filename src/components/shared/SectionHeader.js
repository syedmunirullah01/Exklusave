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


    </div>
  );
}
