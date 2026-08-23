import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useScene } from "../scene/store";

/** One line that keeps changing its mind. */
export default function WordCycler({ words, interval = 2800, className = "" }) {
  const [i, setI] = useState(0);
  const { reduced } = useScene();

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setI((n) => (n + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [words.length, interval, reduced]);

  return (
    <span className={`relative inline-grid align-bottom ${className}`}>
      <span className="invisible col-start-1 row-start-1 whitespace-nowrap" aria-hidden="true">
        {words.reduce((a, b) => (a.length > b.length ? a : b))}
      </span>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={words[i]}
          className="col-start-1 row-start-1 block whitespace-nowrap"
          initial={reduced ? false : { opacity: 0, y: 14, rotate: -3 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          exit={reduced ? undefined : { opacity: 0, y: -14, rotate: 3 }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
