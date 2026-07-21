import Link from "next/link";

export default function Logo({ className = "" }) {
  return (
    <Link
      href="/"
      className={`relative inline-flex items-center rounded-xl bg-emerald-600 px-4 py-1.5 shadow-md shadow-emerald-600/20 overflow-hidden ${className}`}
    >
      <span className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white dark:bg-zinc-900" />
      <span className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white dark:bg-zinc-900" />
      <span className="text-[1.35rem] font-black italic leading-none tracking-[-0.07em] text-white px-1">
        Persuekey
      </span>
    </Link>
  );
}
