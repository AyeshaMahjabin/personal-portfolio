import { motion } from "motion/react";
import { MOODS, useScene } from "./store";

/**
 * The ground under the whole site.
 *
 * The first version washed two blooms across near-black at 0.16 and 0.13
 * opacity, which is well under the threshold where a colour actually reads —
 * so every section looked like the same flat black rectangle no matter which
 * accent it owned. These are four times stronger, there are three of them, and
 * they sit at different depths so the page has a foreground and a background
 * rather than one surface. A fine grid gives the darkness something to catch on.
 */
export default function Ground() {
  const { mood, reduced } = useScene();
  const m = MOODS[mood] || MOODS.pink;

  const drift = (dur, x, y) =>
    reduced
      ? {}
      : {
          animate: { x: [0, x, 0], y: [0, y, 0] },
          transition: { duration: dur, repeat: Infinity, ease: "easeInOut" },
        };

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0" style={{ background: "var(--ground)" }} />

      {/* the section's own accent, top-left, closest to the viewer */}
      <motion.div
        className="absolute rounded-full"
        animate={{ backgroundColor: m.solid }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        style={{
          left: "-18%",
          top: "-24%",
          width: "68vw",
          height: "68vw",
          filter: "blur(120px)",
          opacity: 0.26,
        }}
      />

      {/* the cold counterweight, bottom-right — keeps a screen from ever
          sitting in a single hue */}
      <motion.div
        className="absolute rounded-full"
        animate={{ backgroundColor: m.counter }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        {...drift(26, -40, 30)}
        style={{
          right: "-22%",
          bottom: "-26%",
          width: "62vw",
          height: "62vw",
          filter: "blur(130px)",
          opacity: 0.2,
        }}
      />

      {/* a deep violet sitting behind both, far away */}
      <motion.div
        className="absolute rounded-full"
        {...drift(34, 50, -40)}
        style={{
          left: "38%",
          top: "18%",
          width: "52vw",
          height: "52vw",
          background: "#5b21a8",
          filter: "blur(150px)",
          opacity: 0.17,
        }}
      />

      {/* fine grid — gives the dark somewhere to catch light */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(240,233,247,0.03) 1px, transparent 1px)," +
            "linear-gradient(to bottom, rgba(240,233,247,0.03) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "radial-gradient(ellipse at 50% 40%, #000 20%, transparent 78%)",
          WebkitMaskImage: "radial-gradient(ellipse at 50% 40%, #000 20%, transparent 78%)",
        }}
      />

      {!reduced && (
        <div
          className="absolute inset-x-0 h-[42vh] animate-scan"
          style={{
            top: 0,
            background:
              "linear-gradient(to bottom, transparent, rgba(0,217,255,0.05), transparent)",
          }}
        />
      )}

      <div className="grain absolute inset-0" style={{ opacity: 0.45 }} />

      {/* vignette, lighter than before so the blooms survive at the edges */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 45%, transparent 55%, rgba(6,3,12,0.78) 100%)",
        }}
      />
    </div>
  );
}
