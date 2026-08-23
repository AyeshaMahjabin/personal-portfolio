import { motion } from "motion/react";
import { MOODS } from "./store";
import { useScene } from "./store";

/**
 * The ground the whole site sits on: warm paper, a little grain, and two
 * enormous soft colour washes that drift to whatever section you're reading.
 * No gradients pretending to be a sky — just coloured paper.
 */
export default function Paper() {
  const { mood, reduced } = useScene();
  const m = MOODS[mood] || MOODS.pink;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0" style={{ background: "var(--paper)" }} />

      <motion.div
        className="absolute rounded-full"
        animate={{ backgroundColor: m.tint }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        style={{
          left: "-20%",
          top: "-18%",
          width: "78vw",
          height: "78vw",
          filter: "blur(90px)",
          opacity: 0.95,
        }}
      />

      <motion.div
        className={reduced ? "absolute rounded-full" : "absolute rounded-full animate-bob"}
        animate={{ backgroundColor: m.solid }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        style={{
          right: "-24%",
          bottom: "-14%",
          width: "62vw",
          height: "62vw",
          filter: "blur(110px)",
          opacity: 0.16,
        }}
      />

      <div className="grain absolute inset-0" style={{ opacity: 0.35, mixBlendMode: "multiply" }} />
    </div>
  );
}
