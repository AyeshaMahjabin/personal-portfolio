import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useScene } from "./store";

const COLORS = ["var(--pink)", "var(--violet)", "var(--lime)", "var(--butter)", "var(--sky)"];

/** Candy rain. Fires on the cheat code and nowhere else. */
export default function Confetti() {
  const [on, setOn] = useState(false);
  const { reduced } = useScene();

  useEffect(() => {
    const go = () => {
      setOn(true);
      setTimeout(() => setOn(false), 3000);
    };
    window.addEventListener("scene:party", go);
    return () => window.removeEventListener("scene:party", go);
  }, []);

  if (reduced) return null;

  return (
    <AnimatePresence>
      {on && (
        <div className="pointer-events-none fixed inset-0 z-[85] overflow-hidden">
          {Array.from({ length: 60 }).map((_, i) => {
            const size = 10 + Math.random() * 16;
            return (
              <motion.span
                key={i}
                initial={{ y: "-14vh", opacity: 1, rotate: 0 }}
                animate={{ y: "112vh", rotate: Math.random() * 900 - 450, opacity: [1, 1, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.9 + Math.random() * 1.2, delay: Math.random() * 0.5, ease: "easeIn" }}
                style={{
                  position: "absolute",
                  left: `${Math.random() * 100}%`,
                  width: size,
                  height: Math.random() > 0.4 ? size : size * 0.42,
                  borderRadius: Math.random() > 0.4 ? "50%" : 4,
                  background: COLORS[i % COLORS.length],
                  border: "1.5px solid var(--lip)",
                }}
              />
            );
          })}
        </div>
      )}
    </AnimatePresence>
  );
}
