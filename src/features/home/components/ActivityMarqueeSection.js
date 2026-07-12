import { activityMarqueeItems } from "@/features/home/data/activity-marquee-data";
import { cn } from "@/lib/utils";

const statusToneClasses = {
  success: "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]",
  warning: "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]",
  muted: "bg-zinc-500",
};

function ActivityMarqueeTrack({ items }) {
  return (
    <div className="flex min-w-max shrink-0 animate-[activityMarquee_28s_linear_infinite] items-center">
      {items.map((item, index) => (
        <div
          key={`${item.store}-${item.code}-${index}`}
          className="flex items-center gap-4.5 border-r border-zinc-800/60 px-8 py-4 text-[11px] uppercase tracking-[0.18em] text-zinc-400"
        >
          <span className="font-black text-white italic">[{item.store}]</span>
          <span className="text-zinc-500">{item.action}:</span>
          <span className="font-mono text-[10px] font-black text-emerald-450 bg-emerald-500/10 border border-emerald-500/25 px-2 py-0.5 rounded">
            {item.code}
          </span>
          <span className="flex items-center gap-2">
            <span className={cn("h-1.5 w-1.5 rounded-full animate-pulse", statusToneClasses[item.statusTone])} />
            <span
              className={cn(
                "font-extrabold text-[10px] tracking-wider",
                item.statusTone === "success" && "text-emerald-400",
                item.statusTone === "warning" && "text-amber-400",
                item.statusTone === "muted" && "text-zinc-500"
              )}
            >
              {item.statusLabel}
            </span>
          </span>
          <span className="text-zinc-500 lowercase tracking-normal">by {item.actor}</span>
        </div>
      ))}
    </div>
  );
}

export default function ActivityMarqueeSection() {
  const marqueeItems = [...activityMarqueeItems, ...activityMarqueeItems];

  return (
    <section className="overflow-hidden border-y border-zinc-800 bg-zinc-900">
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-[linear-gradient(90deg,#18181b,transparent)]" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-[linear-gradient(270deg,#18181b,transparent)]" />

        <div className="flex overflow-hidden">
          <ActivityMarqueeTrack items={marqueeItems} />
          <ActivityMarqueeTrack items={marqueeItems} />
        </div>
      </div>
    </section>
  );
}
