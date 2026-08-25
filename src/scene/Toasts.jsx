import { AnimatePresence, motion } from "motion/react";
import { useScene } from "./store";

/** Small notes that pop in when you find something. */
export default function Toasts() {
  const { toasts } = useScene();

  return (
    <div className="pointer-events-none fixed bottom-6 left-1/2 z-[80] w-[min(92vw,24rem)] -translate-x-1/2">
      <AnimatePresence initial={false}>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            layout
            initial={{ opacity: 0, y: 40, rotate: -3, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, rotate: -1.5, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 320, damping: 22 }}
            className="toy flex items-center gap-3 px-5 py-4"
            style={{ background: "var(--mood)" }}
          >
            <span className="text-2xl">{t.emoji || "✦"}</span>
            <span>
              <span className="display block text-[19px]">{t.title}</span>
              {t.body && (
                <span className="mt-0.5 block text-[13px]" style={{ color: "var(--ink-soft)" }}>
                  {t.body}
                </span>
              )}
            </span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
