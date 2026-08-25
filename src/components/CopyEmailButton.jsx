import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { profile } from "../data/site";
import { useScene } from "../scene/store";

export default function CopyEmailButton({ className = "" }) {
  const [copied, setCopied] = useState(false);
  const { say } = useScene();

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
    } catch {
      /* clipboard blocked — the address is written on the button anyway */
    }
    setCopied(true);
    say("copied. go on then.", "happy", 3000);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <motion.button
      onClick={copy}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.97 }}
      data-cursor="copy"
      className={`btn btn-ghost mono relative overflow-hidden !px-6 text-[13px] ${className}`}
      aria-label={`Copy email address ${profile.email}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {copied ? (
          <motion.span
            key="done"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.16 }}
            style={{ color: "var(--c-mint)" }}
          >
            copied ✓
          </motion.span>
        ) : (
          <motion.span
            key="idle"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.16 }}
          >
            {profile.email}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
