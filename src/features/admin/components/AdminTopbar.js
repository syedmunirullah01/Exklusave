"use client";

import { Input } from "@/components/ui/Input";
import { useAdminTheme } from "./AdminThemeProvider";

function ChevronRightIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg className="h-4 w-4 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M18.36 5.64l-1.41 1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg className="h-4 w-4 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}

export default function AdminTopbar({ title, breadcrumbTrail = [] }) {
  const { theme, toggleTheme } = useAdminTheme();

  return (
    <header className="border-b border-zinc-200/80 bg-white/90 dark:bg-zinc-900/90 dark:border-zinc-800 px-4 py-4 backdrop-blur-xl sm:px-6 lg:px-8 transition-colors">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-zinc-500 dark:text-zinc-400">
            {breadcrumbTrail.map((item, index) => (
              <div key={item} className="flex items-center gap-2">
                {index > 0 ? <ChevronRightIcon /> : null}
                <span>{item}</span>
              </div>
            ))}
          </div>
          <h2 className="mt-1.5 text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">{title}</h2>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative min-w-[260px] flex-1 sm:flex-none">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400">
              <SearchIcon />
            </span>
            <Input className="pl-11 rounded-xl bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-xs" placeholder="Search stores, coupons, deals..." />
          </div>

          {/* Dedicated Admin Theme Toggle Button */}
          <button
            type="button"
            onClick={toggleTheme}
            className="flex items-center gap-2 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 px-3.5 py-2 text-xs font-semibold text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition cursor-pointer"
            title={`Switch to ${theme === "light" ? "Dark" : "Light"} Mode`}
          >
            {theme === "light" ? <MoonIcon /> : <SunIcon />}
            <span>{theme === "light" ? "Dark Mode" : "Light Mode"}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
