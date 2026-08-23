import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { MOODS, SceneCtx } from "./store";

const prefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const isCoarse = () =>
  typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;

export function SceneProvider({ children }) {
  const [reduced] = useState(prefersReduced);
  const [coarse] = useState(isCoarse);
  const [effects, setEffects] = useState(() => !prefersReduced() && !isCoarse());
  const [mood, setMood] = useState("pink");
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

  /* Paint the current mood onto the document so CSS can use it anywhere. */
  useEffect(() => {
    const m = MOODS[mood] || MOODS.pink;
    document.documentElement.style.setProperty("--mood", m.tint);
    document.documentElement.style.setProperty("--mood-solid", m.solid);
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
