import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3">
      <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[var(--color-primary)] text-[15px] font-black text-black shadow-[0_18px_40px_rgba(163,230,53,0.18)]">
        P
      </span>
      <span className="text-[15px] font-extrabold tracking-tight text-white uppercase tracking-wider">
        Persue<span className="text-[var(--color-primary)]">key</span>
      </span>
    </Link>
  );
}
