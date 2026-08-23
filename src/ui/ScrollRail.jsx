import { useEffect, useRef, useState } from "react";
import { useScene } from "../scene/store";

const STOPS = [
  { id: "home", n: "00", label: "Top" },
  { id: "work", n: "01", label: "Work" },
  { id: "experience", n: "02", label: "Experience" },
  { id: "skills", n: "03", label: "Toolkit" },
  { id: "playground", n: "04", label: "Playground" },
  { id: "about", n: "05", label: "About" },
  { id: "contact", n: "06", label: "Contact" },
];

/**
 * A fixed rail down the right edge: one tick per section, a travelling fill
 * that tracks scroll depth, and the label of whichever section you are in.
 *
 * The progress fill is written to a CSS variable from inside a rAF-throttled
 * scroll handler — the only React state here is which section is active, which
 * changes seven times over the whole page rather than on every scroll event.
 */
export default function ScrollRail() {
  const [active, setActive] = useState("home");
  const fill = useRef(null);
  const { reduced } = useScene();

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const max = document.body.scrollHeight - innerHeight;
        const p = max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0;
        fill.current?.style.setProperty("--p", `${(p * 100).toFixed(2)}%`);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const io = new IntersectionObserver(
      (entries) => {
        const seen = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (seen) setActive(seen.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.3, 0.7] }
    );
    STOPS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <nav
      aria-label="Section progress"
      className="fixed right-5 top-1/2 z-[55] hidden -translate-y-1/2 lg:block"
    >
      <div className="relative flex flex-col items-end gap-5">
        {/* the track and its travelling fill */}
        <div
          aria-hidden="true"
          className="absolute right-[3px] top-0 h-full w-px"
          style={{ background: "var(--line)" }}
        >
          <div
            ref={fill}
            className="w-full"
            style={{
              height: "var(--p, 0%)",
              background: "var(--mood-solid)",
              boxShadow: "0 0 10px var(--mood-solid)",
              transition: reduced ? "none" : "height 120ms linear",
            }}
          />
        </div>

        {STOPS.map((s) => {
          const on = active === s.id;
          return (
            <button
              key={s.id}
              onClick={() =>
                document
                  .getElementById(s.id)
                  ?.scrollIntoView({ behavior: reduced ? "auto" : "smooth" })
              }
              className="group relative flex items-center gap-3"
              aria-label={s.label}
              aria-current={on ? "true" : undefined}
            >
              <span
                className="whitespace-nowrap font-mono text-[9.5px] uppercase tracking-[0.22em]
                           opacity-0 transition-all duration-[260ms] group-hover:opacity-100"
                style={{
                  color: on ? "var(--mood-solid)" : "var(--ink-soft)",
                  opacity: on ? 1 : undefined,
                }}
              >
                {s.n} {s.label}
              </span>
              <span
                className="block rounded-full transition-all duration-[300ms]"
                style={{
                  width: on ? "7px" : "5px",
                  height: on ? "7px" : "5px",
                  background: on ? "var(--mood-solid)" : "var(--ink-faint)",
                  boxShadow: on ? "0 0 12px var(--mood-solid)" : "none",
                }}
              />
            </button>
          );
        })}
      </div>
    </nav>
  );
}
