import { useEffect, useRef } from "react";
import { subscribePointer } from "../lib/pointer";

/**
 * A soft highlighter blob that trails the pointer, stretches in the direction
 * you're moving, and swells over anything you can touch. It multiplies over
 * the paper, so it colours what it passes like a marker.
 */
export default function BlobCursor() {
  const blob = useRef(null);
  const dot = useRef(null);

  useEffect(() => {
    document.body.style.cursor = "none";
    const s = { x: innerWidth / 2, y: innerHeight / 2, bx: 0, by: 0, scale: 1, raf: 0 };

    const off = subscribePointer((p) => {
      s.x = p.x;
      s.y = p.y;
      if (dot.current) dot.current.style.transform = `translate3d(${p.x - 4}px, ${p.y - 4}px, 0)`;
    });

    const loop = () => {
      const dx = s.x - s.bx;
      const dy = s.y - s.by;
      s.bx += dx * 0.16;
      s.by += dy * 0.16;

      // stretch along the direction of travel — the "squash and stretch" rule
      const speed = Math.min(Math.hypot(dx, dy) / 42, 0.6);
      const angle = (Math.atan2(dy, dx) * 180) / Math.PI;

      if (blob.current) {
        blob.current.style.transform =
          `translate3d(${s.bx - 26}px, ${s.by - 26}px, 0) rotate(${angle}deg) ` +
          `scale(${(s.scale * (1 + speed)).toFixed(3)}, ${(s.scale * (1 - speed * 0.55)).toFixed(3)})`;
      }
      s.raf = requestAnimationFrame(loop);
    };
    s.raf = requestAnimationFrame(loop);

    const over = (e) => {
      const hit = e.target.closest?.("a, button, input, [data-touchable]");
      s.scale = hit ? 1.9 : 1;
    };
    const down = () => (s.scale *= 0.7);
    const up = () => (s.scale = s.scale < 1 ? 1 : s.scale);

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

  return (
    <div className="pointer-events-none fixed inset-0 z-[75]" aria-hidden="true">
      <div
        ref={blob}
        className="absolute left-0 top-0 h-[52px] w-[52px] rounded-full"
        style={{
          background: "var(--mood-solid)",
          mixBlendMode: "multiply",
          opacity: 0.5,
          transition: "background 700ms ease",
          willChange: "transform",
        }}
      />
      <div
        ref={dot}
        className="absolute left-0 top-0 h-2 w-2 rounded-full"
        style={{ background: "var(--ink)", willChange: "transform" }}
      />
    </div>
  );
}
