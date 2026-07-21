import { cn } from "@/lib/utils";

function Table({ className, ...props }) {
  return (
    <div className="overflow-x-auto">
      <table className={cn("w-full border-separate border-spacing-0", className)} {...props} />
    </div>
  );
}

function TableHeader({ className, ...props }) {
  return <thead className={cn("bg-zinc-100/80 dark:bg-zinc-800/80 border-b border-zinc-200 dark:border-zinc-800", className)} {...props} />;
}

function TableBody({ className, ...props }) {
  return <tbody className={cn("[&_tr:last-child_td]:border-b-0 divide-y divide-zinc-100 dark:divide-zinc-800/60", className)} {...props} />;
}

function TableRow({ className, ...props }) {
  return <tr className={cn("transition hover:bg-zinc-50/70 dark:hover:bg-zinc-800/50 border-b border-zinc-100 dark:border-zinc-800/60", className)} {...props} />;
}

function TableHead({ className, ...props }) {
  return (
    <th
      className={cn(
        "border-b border-zinc-200 dark:border-zinc-800 px-4 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300",
        className
      )}
      {...props}
    />
  );
}

function TableCell({ className, ...props }) {
  return <td className={cn("border-b border-zinc-100 dark:border-zinc-800/60 px-4 py-3.5 text-xs text-zinc-900 dark:text-white font-medium", className)} {...props} />;
}

export { Table, TableHeader, TableBody, TableRow, TableHead, TableCell };
