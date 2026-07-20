export default function BreadcrumbBar({ breadcrumbItems }) {
  return (
    <div className="border-b border-black/5 bg-zinc-50/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1240px] items-center gap-2 px-4 py-3 text-xs font-semibold text-zinc-500 sm:px-6 lg:px-8">
        {breadcrumbItems.map((item, index) => (
          <div key={item} className="flex items-center gap-2">
            <span className={index === breadcrumbItems.length - 1 ? "font-bold text-black" : "hover:text-black transition"}>{item}</span>
            {index < breadcrumbItems.length - 1 ? <span className="text-zinc-300 font-normal">/</span> : null}
          </div>
        ))}
      </div>
    </div>
  );
}

