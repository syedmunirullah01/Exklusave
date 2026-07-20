export default function Pagination({ currentPage = 1, totalPages = 2, onPageChange }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  if (totalPages <= 1) return null;

  return (
    <div className="mt-12 flex items-center justify-center gap-2">
      <button
        type="button"
        disabled={currentPage <= 1}
        onClick={() => onPageChange && onPageChange(currentPage - 1)}
        className="grid h-10 w-10 place-items-center rounded-2xl border border-black/8 bg-white text-zinc-600 shadow-sm transition-all hover:bg-zinc-50 hover:text-black disabled:opacity-30 disabled:pointer-events-none"
        aria-label="Previous page"
      >
        ‹
      </button>
      {pages.map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => onPageChange && onPageChange(page)}
          className={`grid h-10 min-w-10 px-3.5 place-items-center rounded-2xl text-xs font-black transition-all ${
            page === currentPage
              ? "bg-zinc-900 text-white shadow-md scale-105"
              : "border border-black/8 bg-white text-zinc-600 hover:bg-zinc-50 hover:text-black shadow-sm"
          }`}
        >
          {page}
        </button>
      ))}
      <button
        type="button"
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange && onPageChange(currentPage + 1)}
        className="grid h-10 w-10 place-items-center rounded-2xl border border-black/8 bg-white text-zinc-600 shadow-sm transition-all hover:bg-zinc-50 hover:text-black disabled:opacity-30 disabled:pointer-events-none"
        aria-label="Next page"
      >
        ›
      </button>
    </div>
  );
}
