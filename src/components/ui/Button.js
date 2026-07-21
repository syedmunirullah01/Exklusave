import React from "react";
import { cn } from "@/lib/utils";

const Button = React.forwardRef(
  (
    {
      className,
      variant = "primary",
      size = "md",
      leadingIcon,
      trailingIcon,
      asChild = false,
      children,
      ...props
    },
    ref
  ) => {
    const variants = {
      primary:
        "bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold border-transparent shadow-xs transition-colors cursor-pointer",
      secondary:
        "bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white font-semibold border border-zinc-200 dark:border-zinc-700 transition-colors cursor-pointer",
      outline:
        "bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-900 dark:text-white font-semibold border border-zinc-200 dark:border-zinc-700 transition-colors cursor-pointer",
      ghost:
        "bg-transparent text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white font-semibold transition-colors cursor-pointer",
      club:
        "bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-extrabold uppercase tracking-wider border-transparent shadow-xs transition-colors cursor-pointer",
    };

    const sizes = {
      sm: "h-8 px-3 text-xs rounded-xl",
      md: "h-9 px-4 text-xs rounded-xl",
      lg: "h-11 px-6 text-sm rounded-xl",
      club: "h-11 px-5 text-[11px] font-black uppercase tracking-[0.18em] rounded-xl",
    };

    const buttonClassName = cn(
      "inline-flex items-center justify-center gap-2 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 disabled:pointer-events-none disabled:opacity-50 select-none",
      variants[variant],
      sizes[size],
      className
    );

    const buttonChildren =
      asChild && React.isValidElement(children)
        ? children.props.children
        : children;

    const content = (
      <span className="flex items-center justify-center gap-2 whitespace-nowrap">
        {leadingIcon && (
          <span className="grid h-4 w-4 shrink-0 place-items-center">
            {leadingIcon}
          </span>
        )}
        <span>{buttonChildren}</span>
        {trailingIcon && (
          <span className="grid h-4 w-4 shrink-0 place-items-center">
            {trailingIcon}
          </span>
        )}
      </span>
    );

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children, {
        ...props,
        className: cn(buttonClassName, children.props.className),
        children: content,
      });
    }

    return (
      <button ref={ref} className={buttonClassName} {...props}>
        {content}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
