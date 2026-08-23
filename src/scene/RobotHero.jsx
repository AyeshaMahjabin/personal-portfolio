import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useScene } from "./store";
import Boundary from "../ui/Boundary";

const RobotCanvas = lazy(() => import("./RobotCanvas"));

const REACTIONS = ["boop", "hey!", "again?", "ha", "okay okay"];

/**
 * The robot, full size and unframed: a big candy disc behind it, a soft
 * contact shadow underneath, nothing else. It watches the cursor and jumps
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
          background: "var(--butter)",
          border: "1.5px solid var(--lip)",
        }}
      />

      {/* an offset outline, like a badly aligned print run */}
      <div
        aria-hidden="true"
        className="absolute rounded-full"
        style={{
          left: "13%",
          top: "2%",
          width: "80%",
          height: "80%",
          border: "1.5px solid var(--ink)",
          opacity: 0.28,
        }}
      />

      {/* the step it stands on: catches the feet and gives the figure ground */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-[68%] h-[9%] w-[46%] -translate-x-1/2 rounded-[50%]"
        style={{ background: "rgba(26,22,38,0.18)", filter: "blur(18px)" }}
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

      {/* foreground half of the step, so the robot stands *in* the scene */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[70%] h-[8%] w-[44%] -translate-x-1/2 rounded-[50%]"
        style={{
          background: "color-mix(in srgb, var(--butter) 78%, var(--ink) 12%)",
          border: "1.5px solid var(--lip)",
        }}
      />

      {/* the only words it ever says */}
      <AnimatePresence>
        {pop && (
          <motion.span
            key={pop.id}
            initial={{ opacity: 0, y: 10, scale: 0.7, rotate: -8 }}
            animate={{ opacity: 1, y: -14, scale: 1, rotate: -6 }}
            exit={{ opacity: 0, y: -40, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 320, damping: 18 }}
            className="display absolute left-[66%] top-[12%] rounded-full px-4 py-2 text-[18px]"
            style={{
              background: "var(--ink)",
              color: "var(--paper)",
              boxShadow: "0 10px 24px -16px rgba(26,22,38,0.9)",
            }}
          >
            {pop.word}
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
