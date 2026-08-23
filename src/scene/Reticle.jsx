import { useEffect, useRef } from "react";
import { subscribePointer } from "../lib/pointer";

/**
 * The cursor, as an instrument. A hard dot sits exactly under the pointer with
 * zero lag; a ring and four corner ticks trail slightly behind and lock on —
 * expanding, squaring up and turning cyan — over anything you can touch.
 *
 * Runs entirely on refs inside one rAF loop. It never triggers a React render,
 * which is what keeps it free while the fluid sim and the scene are also live.
 */
export default function Reticle() {
  const ring = useRef(null);
  const dot = useRef(null);
  const ticks = useRef(null);

  useEffect(() => {
    document.body.style.cursor = "none";

    const s = {
      x: innerWidth / 2,
      y: innerHeight / 2,
      rx: innerWidth / 2,
      ry: innerHeight / 2,
      lock: 0, // 0 = idle, 1 = locked onto a target
      target: 0,
      press: 1,
      spin: 0,
      raf: 0,
    };

    const off = subscribePointer((p) => {
      s.x = p.x;
      s.y = p.y;
      if (dot.current) {
        dot.current.style.transform = `translate3d(${p.x - 2}px, ${p.y - 2}px, 0)`;
      }
    });

    const loop = () => {
      // the ring chases the dot — the gap between them reads as momentum
      s.rx += (s.x - s.rx) * 0.22;
      s.ry += (s.y - s.ry) * 0.22;
      s.lock += (s.target - s.lock) * 0.16;
      s.spin += 0.25;

      const size = 26 + s.lock * 16;
      const half = size / 2;
      const scale = s.press;

      if (ring.current) {
        const st = ring.current.style;
        st.transform = `translate3d(${s.rx - half}px, ${s.ry - half}px, 0) scale(${scale})`;
        st.width = `${size}px`;
        st.height = `${size}px`;
        // squares up as it locks on: a ring idle, a bracket engaged
        st.borderRadius = `${999 - s.lock * 990}px`;
        st.borderColor = s.lock > 0.5 ? "var(--cyan)" : "var(--lip)";
        st.opacity = `${0.45 + s.lock * 0.55}`;
        st.boxShadow = s.lock > 0.05 ? `0 0 ${12 * s.lock}px -2px var(--cyan)` : "none";
      }

      if (ticks.current) {
        // the ticks drift open when idle and clamp shut on a target
        const spread = 15 + (1 - s.lock) * 5;
        ticks.current.style.transform =
          `translate3d(${s.rx}px, ${s.ry}px, 0) rotate(${(1 - s.lock) * s.spin}deg)`;
        ticks.current.style.setProperty("--spread", `${spread}px`);
        ticks.current.style.opacity = `${0.25 + s.lock * 0.75}`;
      }

      s.raf = requestAnimationFrame(loop);
    };
    s.raf = requestAnimationFrame(loop);

    const over = (e) => {
      s.target = e.target.closest?.("a, button, input, textarea, [data-touchable]") ? 1 : 0;
    };
    const down = () => (s.press = 0.82);
    const up = () => (s.press = 1);

    document.addEventListener("pointerover", over, { passive: true });
    document.addEventListener("pointerdown", down, { passive: true });
    document.addEventListener("pointerup", up, { passive: true });

    return () => {
      document.body.style.cursor = "";
      cancelAnimationFrame(s.raf);
      document.removeEventListener("pointerover", over);
      document.removeEventListener("pointerdown", down);
      document.removeEventListener("pointerup", up);
      off();
    };
  }, []);

  const tick = "absolute h-px w-2 bg-cyan";

  return (
    <div className="pointer-events-none fixed inset-0 z-[75]" aria-hidden="true">
      <div
        ref={ring}
        className="absolute left-0 top-0 border will-change-transform"
        style={{ transition: "border-color 200ms linear" }}
      />

      <div ref={ticks} className="absolute left-0 top-0 will-change-transform">
        <span className={tick} style={{ transform: "translate(calc(var(--spread) * -1 - 8px), 0)" }} />
        <span className={tick} style={{ transform: "translate(var(--spread), 0)" }} />
        <span
          className={tick}
          style={{ transform: "rotate(90deg) translate(calc(var(--spread) * -1 - 8px), 0)" }}
        />
        <span className={tick} style={{ transform: "rotate(90deg) translate(var(--spread), 0)" }} />
      </div>

      <div
        ref={dot}
        className="absolute left-0 top-0 h-1 w-1 rounded-full bg-ink will-change-transform"
        style={{ boxShadow: "0 0 8px 1px var(--cyan)" }}
      />
    </div>
  );
}
