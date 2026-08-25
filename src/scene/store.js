import { createContext, useContext, useEffect, useRef } from "react";
import { setZone, ZONE } from "../lib/fluid";

/* Re-exported so a section can name its colour and its fluid zone in one
   import: useMood("pink", ZONE.LOUD). */
export { ZONE };

export const SceneCtx = createContext(null);

export function useScene() {
  const ctx = useContext(SceneCtx);
  if (!ctx) throw new Error("useScene must be used inside <SceneProvider>");
  return ctx;
}

/** Every section owns a colour and a fluid zone. Attach this ref: the ground
 *  behind the page drifts to that colour while the section is on screen, and
 *  the fluid sim turns its dye up or down to match. */
export function useMood(color, zone = ZONE.CALM) {
  const { setMood } = useScene();
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        setMood(color);
        setZone(zone);
      },
      { rootMargin: "-40% 0px -40% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [color, zone, setMood]);

  return ref;
}

/* Three neons, assigned so that consecutive sections never land on the same
   hue — the page shifts as you travel down it. `counter` is the opposing
   bloom, which keeps any single screen from sitting in one colour.
   (Keys are the old ones until phase four renames the call sites.) */
export const MOODS = {
  pink: { tint: "rgba(255,46,136,0.12)", solid: "#ff2e88", counter: "#00d9ff" },
  sky: { tint: "rgba(0,217,255,0.10)", solid: "#00d9ff", counter: "#b14bff" },
  violet: { tint: "rgba(177,75,255,0.12)", solid: "#b14bff", counter: "#ff2e88" },
  lime: { tint: "rgba(0,217,255,0.10)", solid: "#00d9ff", counter: "#ff2e88" },
  butter: { tint: "rgba(255,46,136,0.12)", solid: "#ff2e88", counter: "#b14bff" },
};
