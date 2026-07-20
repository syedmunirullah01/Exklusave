export default function CategoryFilter({ categories, activeCategory, onSelectCategory }) {
  return (
    <aside className="w-full lg:w-[260px] lg:flex-shrink-0">
      <div className="rounded-3xl border border-black/8 bg-white p-6 shadow-sm lg:sticky lg:top-24 space-y-5">
        <div className="flex items-center justify-between border-b border-black/5 pb-4">
          <h2 className="text-xs font-black uppercase tracking-[0.16em] text-zinc-900">Filter By Category</h2>
          <span className="text-[10px] font-bold text-zinc-400 font-mono bg-zinc-100 px-2 py-0.5 rounded-full">{categories.length}</span>
        </div>

        <div className="space-y-1.5 max-h-[460px] overflow-y-auto pr-1 custom-scrollbar">
          {categories.map((category) => {
            const isSelected = activeCategory ? activeCategory === category.slug : category.active;
            return (
              <button
                key={category.name || category.slug}
                type="button"
                onClick={() => onSelectCategory && onSelectCategory(category.slug)}
                className={`w-full flex items-center justify-between rounded-2xl px-4 py-3 text-xs font-bold transition-all text-left ${
                  isSelected
                    ? "bg-zinc-900 text-white shadow-md scale-[1.02]"
                    : "bg-zinc-50/80 text-zinc-600 hover:bg-zinc-100 hover:text-black"
                }`}
              >
                <span>{category.name}</span>
                {category.count !== undefined ? (
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${isSelected ? 'bg-white/20 text-white' : 'bg-black/5 text-zinc-400'}`}>
                    {category.count}
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}

