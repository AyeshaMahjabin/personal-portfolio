import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { setEnabled } from "../lib/fluid";
import { MOODS, SceneCtx } from "./store";

const prefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const isCoarse = () =>
  typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;

export function SceneProvider({ children }) {
  const [reduced] = useState(prefersReduced);
  const [coarse] = useState(isCoarse);
  /* Off on arrival — the fluid is opt-in from the Playground switch. The sim
     still mounts unconditionally and just runs at zero gain, so turning it on
     is instant and no flag can ever make the canvas disappear the way the old
     mount-gate did. */
  const [effects, setEffects] = useState(false);
  const [mood, setMood] = useState("sky");
  const [toasts, setToasts] = useState([]);
  const [pokes, setPokes] = useState(0);
  const found = useRef(new Set());

  const toast = useCallback((payload) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((list) => [...list.slice(-1), { id, ...payload }]);
    setTimeout(() => setToasts((l) => l.filter((t) => t.id !== id)), payload.ms || 4600);
  }, []);

  const findSecret = useCallback(
    (key, payload) => {
      if (found.current.has(key)) return;
      found.current.add(key);
      toast(payload);
    },
    [toast]
  );

  const poke = useCallback(() => {
    setPokes((n) => {
      const next = n + 1;
      if (next === 5) {
        findSecret("poke", {
          title: "Okay, okay — you win.",
          body: "Five pokes. He's going to remember that.",
          emoji: "🤖",
        });
      }
      return next;
    });
  }, [findSecret]);

  /* The only keyboard secret worth keeping. */
  useEffect(() => {
    const code = [
      "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
      "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a",
    ];
    let i = 0;
    const onKey = (e) => {
      const tag = document.activeElement?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (key === code[i]) {
        i += 1;
        if (i === code.length) {
          i = 0;
          window.dispatchEvent(new CustomEvent("scene:party"));
          findSecret("konami", {
            title: "↑↑↓↓←→←→BA",
            body: "Some things never stop working.",
            emoji: "🍬",
          });
        }
      } else {
        i = key === code[0] ? 1 : 0;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [findSecret]);

  /* The switch now silences the simulation instead of unmounting it. */
  useEffect(() => {
    setEnabled(effects);
  }, [effects]);

  /* Paint the current mood onto the document so CSS can use it anywhere. */
  useEffect(() => {
    const m = MOODS[mood] || MOODS.sky;
    document.documentElement.style.setProperty("--mood", m.tint);
    document.documentElement.style.setProperty("--mood-solid", m.solid);
    /* the opposing neon, so gradients always span two hues no matter which
       accent is current */
    document.documentElement.style.setProperty("--mood-counter", m.counter);
  }, [mood]);

  const value = useMemo(
    () => ({
      reduced, coarse, effects, setEffects,
      mood, setMood, moods: MOODS,
      toasts, toast, findSecret,
      poke, pokes,
    }),
    [reduced, coarse, effects, mood, toasts, toast, findSecret, poke, pokes]
  );

  return <SceneCtx.Provider value={value}>{children}</SceneCtx.Provider>;
}
