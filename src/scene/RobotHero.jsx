import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useScene } from "./store";
import Boundary from "../ui/Boundary";

const RobotCanvas = lazy(() => import("./RobotCanvas"));

const REACTIONS = ["boop", "hey!", "again?", "ha", "okay okay"];

/**
 * The robot, full size and unframed: a big candy disc behind it, a soft
 * own halo from the model underneath. It watches the cursor and jumps
 * when you poke it.
 */
export default function RobotHero() {
  const { poke, pokes, coarse, reduced } = useScene();
  const [ready, setReady] = useState(false);
  const [live, setLive] = useState(false);
  const [pop, setPop] = useState(null);
  const host = useRef(null);
  const jumpRef = useRef(0);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setLive(e.isIntersecting), {
      rootMargin: "300px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const onPoke = () => {
    jumpRef.current = 1;
    poke();
    const word = REACTIONS[Math.min(pokes, REACTIONS.length - 1)];
    setPop({ id: Date.now(), word });
    setTimeout(() => setPop(null), 1400);
  };

  return (
    <div ref={host} className="relative mx-auto aspect-square w-full max-w-[560px]">
      {/* the disc it stands on */}
      <motion.div
        aria-hidden="true"
        className="absolute rounded-full"
        initial={reduced ? false : { scale: 0.86, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 90, damping: 18, delay: 0.15 }}
        style={{
          left: "9%",
          top: "6%",
          width: "80%",
          height: "80%",
          background:
            "radial-gradient(circle at 50% 60%, color-mix(in srgb, var(--mood-solid) 20%, transparent) 0%, transparent 66%)",
          filter: "blur(6px)",
        }}
      />

      <button
        onClick={onPoke}
        aria-label="Poke the robot"
        className="absolute inset-0 cursor-pointer"
        style={{ WebkitTapHighlightColor: "transparent" }}
      >
        {live && (
          <Boundary fallback={null}>
            <Suspense fallback={null}>
              <RobotCanvas onReady={() => setReady(true)} jumpRef={jumpRef} coarse={coarse} />
            </Suspense>
          </Boundary>
        )}
      </button>

      {/* the only words it ever says */}
      <AnimatePresence>
        {pop && (
          <motion.span
            key={pop.id}
            initial={{ opacity: 0, y: 10, scale: 0.7, rotate: -8 }}
            animate={{ opacity: 1, y: -14, scale: 1, rotate: -6 }}
            exit={{ opacity: 0, y: -40, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 320, damping: 18 }}
            className="absolute left-[66%] top-[12%] rounded-md border px-3 py-1.5 font-mono text-[13px] lowercase"
            style={{
              background: "rgba(10,6,17,0.9)",
              color: "var(--cyan)",
              borderColor: "color-mix(in srgb, var(--cyan) 40%, transparent)",
              boxShadow: "0 0 24px -8px var(--cyan)",
            }}
          >
            &gt; {pop.word}
          </motion.span>
        )}
      </AnimatePresence>

      {!ready && (
        <div className="absolute inset-0 grid place-items-center">
          <motion.span
            className="block h-3 w-3 rounded-full"
            style={{ background: "var(--ink)" }}
            animate={reduced ? {} : { scale: [1, 1.8, 1], opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.4, repeat: Infinity }}
          />
        </div>
      )}
    </div>
  );
}
