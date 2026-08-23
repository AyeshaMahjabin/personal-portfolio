import { useCallback, useEffect, useRef } from "react";
import { useScene } from "../scene/store";

/**
 * Wraps anything clickable so it leans toward the cursor as you approach and
 * springs back when you leave.
 *
 * The whole thing runs on transforms written directly to the node inside a
 * rAF, so hovering a button never renders React. `strength` is how far it is
 * allowed to travel; `radius` is how close you have to get before it notices.
 */
export default function Magnetic({ children, strength = 0.32, radius = 90, className }) {
  const host = useRef(null);
  const raf = useRef(0);
  const state = useRef({ x: 0, y: 0, tx: 0, ty: 0, running: false });
  const { reduced } = useScene();

  const loop = useCallback(() => {
    const s = state.current;
    s.x += (s.tx - s.x) * 0.18;
    s.y += (s.ty - s.y) * 0.18;
    if (host.current) {
      host.current.style.transform = `translate3d(${s.x.toFixed(2)}px, ${s.y.toFixed(2)}px, 0)`;
    }
    if (Math.abs(s.tx - s.x) > 0.1 || Math.abs(s.ty - s.y) > 0.1) {
      raf.current = requestAnimationFrame(loop);
    } else {
      s.running = false;
      raf.current = 0;
    }
  }, []);

  const kick = useCallback(() => {
    const s = state.current;
    if (!s.running) {
      s.running = true;
      raf.current = requestAnimationFrame(loop);
    }
  }, [loop]);

  useEffect(() => {
    if (reduced) return;
    const node = host.current;
    if (!node) return;

    const onMove = (e) => {
      const r = node.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      const reach = Math.max(r.width, r.height) / 2 + radius;

      const s = state.current;
      if (dist < reach) {
        const falloff = 1 - dist / reach;
        s.tx = dx * strength * falloff;
        s.ty = dy * strength * falloff;
      } else {
        s.tx = 0;
        s.ty = 0;
      }
      kick();
    };

    const onLeave = () => {
      state.current.tx = 0;
      state.current.ty = 0;
      kick();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf.current);
    };
  }, [reduced, strength, radius, kick]);

  return (
    <span ref={host} className={className} style={{ display: "inline-flex", willChange: "transform" }}>
      {children}
    </span>
  );
}
