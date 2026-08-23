import { useCallback, useRef } from "react";
import { cn } from "../lib/cn";

/**
 * A list row that lights up under the cursor.
 *
 * The pointer position is written to CSS custom properties on the element and
 * a radial gradient reads them, so the highlight tracks the cursor without a
 * single React render. An accent bar wipes in from the left edge at the same
 * time. This is what replaced the card: the row still responds to being
 * touched, it just doesn't need a border to prove it is there.
 */
export default function GlowRow({
  as: Tag = "div",
  className,
  children,
  intensity = 0.1,
  ...props
}) {
  const ref = useRef(null);
  const raf = useRef(0);

  const onMove = useCallback((e) => {
    const node = ref.current;
    if (!node || raf.current) return;
    const { clientX, clientY } = e;
    raf.current = requestAnimationFrame(() => {
      raf.current = 0;
      const r = node.getBoundingClientRect();
      node.style.setProperty("--gx", `${clientX - r.left}px`);
      node.style.setProperty("--gy", `${clientY - r.top}px`);
    });
  }, []);

  return (
    <Tag
      ref={ref}
      onPointerMove={onMove}
      className={cn(
        "group relative isolate border-t border-line transition-colors duration-[260ms]",
        "before:pointer-events-none before:absolute before:inset-0 before:-z-10",
        "before:opacity-0 before:transition-opacity before:duration-[320ms]",
        "before:bg-[radial-gradient(28rem_18rem_at_var(--gx,50%)_var(--gy,50%),color-mix(in_srgb,var(--mood-solid)_var(--glow-a),transparent),transparent_70%)]",
        "hover:before:opacity-100",
        /* the accent bar that wipes in from the left */
        "after:pointer-events-none after:absolute after:left-0 after:top-0 after:-z-10",
        "after:h-full after:w-px after:origin-top after:scale-y-0",
        "after:bg-[var(--mood-solid)] after:shadow-[0_0_12px_var(--mood-solid)]",
        "after:transition-transform after:duration-[420ms] after:ease-[cubic-bezier(0.22,1,0.36,1)]",
        "hover:after:scale-y-100",
        className
      )}
      style={{ "--glow-a": `${Math.round(intensity * 100)}%` }}
      {...props}
    >
      {children}
    </Tag>
  );
}
