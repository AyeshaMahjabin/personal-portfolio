import { cn } from "../lib/cn";

/* ==================================================================
   The design system, as components rather than @apply classes.
   Colours come from the @theme tokens (bg-panel, text-magenta,
   border-line …). The one exception is the live section accent —
   --mood / --mood-solid are mutated on :root at runtime by the scroll
   observer, so those are read as arbitrary values instead of compiled
   utilities. Every consumer can still override anything: tailwind-merge
   resolves the conflict in the caller's favour.
   ==================================================================*/

const ACCENT_BORDER = "border-[color-mix(in_srgb,var(--mood-solid)_40%,transparent)]";

/* ---------------------------------------------------------------- */

const PANEL_BASE =
  "relative rounded-[14px] border border-line bg-panel " +
  "bg-gradient-to-b from-white/[0.05] to-white/[0.015] " +
  "shadow-[0_18px_40px_-24px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(240,233,247,0.06)] " +
  "transition-[transform,box-shadow,border-color] duration-[260ms] ease-[cubic-bezier(0.22,1,0.36,1)]";

const PANEL_INTERACTIVE =
  "hover:-translate-y-[3px] active:-translate-y-px " +
  "hover:border-[color-mix(in_srgb,var(--mood-solid)_45%,transparent)] " +
  "hover:shadow-[0_26px_60px_-28px_rgba(0,0,0,1),inset_0_1px_0_rgba(240,233,247,0.08),0_0_32px_-10px_color-mix(in_srgb,var(--mood-solid)_70%,transparent)]";

/** Glass over the city: a hairline, a whisper of fill, a lit top edge. */
export function Panel({ as: Tag = "div", interactive = false, className, ...props }) {
  return (
    <Tag className={cn(PANEL_BASE, interactive && PANEL_INTERACTIVE, className)} {...props} />
  );
}

/* ---------------------------------------------------------------- */

const BUTTON_BASE =
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap " +
  "rounded-md border border-transparent px-5 py-3 text-sm font-semibold tracking-[-0.01em] " +
  "cursor-pointer transition-[transform,box-shadow,background-color,color,border-color] " +
  "duration-[160ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 active:translate-y-0";

const BUTTON_VARIANTS = {
  /* the one bright object on the page */
  primary:
    "bg-ink text-ground shadow-[0_0_30px_-12px_rgba(240,233,247,0.5)] " +
    "hover:shadow-[0_0_40px_-8px_rgba(240,233,247,0.7)]",
  accent:
    "bg-magenta text-white shadow-[0_0_34px_-10px_#ff2e88] hover:shadow-[0_0_46px_-6px_#ff2e88]",
  ghost:
    "bg-transparent text-ink border-lip hover:border-cyan hover:text-cyan " +
    "hover:shadow-[0_0_28px_-14px_#00d9ff]",
};

export function Button({ as: Tag = "button", variant = "ghost", className, ...props }) {
  return <Tag className={cn(BUTTON_BASE, BUTTON_VARIANTS[variant], className)} {...props} />;
}

/* ---------------------------------------------------------------- */

const TAG_BASE =
  "inline-flex items-center gap-2 rounded-md border px-3 py-1.5 " +
  "font-mono text-[11px] font-medium uppercase tracking-[0.16em] " +
  "transition-[color,border-color,background-color] duration-[260ms] ease-[cubic-bezier(0.22,1,0.36,1)]";

const TAG_VARIANTS = {
  default: "border-line bg-glass text-inksoft hover:border-lip hover:text-ink",
  /* the accent as a hairline and text — never as a fill */
  accent: `${ACCENT_BORDER} bg-[var(--mood)] text-[var(--mood-solid)]`,
};

export function Tag({ as: Component = "span", variant = "default", className, ...props }) {
  return <Component className={cn(TAG_BASE, TAG_VARIANTS[variant], className)} {...props} />;
}

/* ---------------------------------------------------------------- */

/** The instrument label: `03 / STACK`, `ST. JOHN'S · UTC−03:30`. */
export function Label({ as: Component = "span", className, ...props }) {
  return (
    <Component
      className={cn(
        "font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-inkfaint",
        className
      )}
      {...props}
    />
  );
}

/** A hairline rule that fades out — used to separate bands of content. */
export function Rule({ className }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "h-px w-full bg-gradient-to-r from-transparent via-lip to-transparent",
        className
      )}
    />
  );
}
