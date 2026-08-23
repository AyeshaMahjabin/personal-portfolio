import { createContext, useContext, useEffect, useRef } from "react";

export const SceneCtx = createContext(null);

export function useScene() {
  const ctx = useContext(SceneCtx);
  if (!ctx) throw new Error("useScene must be used inside <SceneProvider>");
  return ctx;
}

/** Every section owns a colour. Attach this ref and the paper behind the whole
 *  page drifts to that colour while the section is on screen. */
export function useMood(color) {
  const { setMood } = useScene();
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setMood(color);
      },
      { rootMargin: "-40% 0px -40% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [color, setMood]);

  return ref;
}

export const MOODS = {
  pink: { tint: "#ffe7f2", solid: "#ff4fa3" },
  violet: { tint: "#eeeaff", solid: "#7c5cff" },
  lime: { tint: "#f0fbd8", solid: "#b8f02e" },
  sky: { tint: "#e2f4ff", solid: "#46c8ff" },
  butter: { tint: "#fff5d4", solid: "#ffd84d" },
};
