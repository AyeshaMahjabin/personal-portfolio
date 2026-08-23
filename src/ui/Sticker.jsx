import { useRef, useState } from "react";
import { motion } from "motion/react";
import { useScene } from "../scene/store";

/**
 * A little object stuck to the page that you can peel off and throw. It has
 * weight, it overshoots, and it always finds its way home — which is the whole
 * joke. Three drags and you've found the toy box.
 */
export default function Sticker({
  children,
  className = "",
  rotate = -8,
  color = "var(--butter)",
  size = 84,
  label,
  style,
}) {
  const { reduced, findSecret } = useScene();
  const [held, setHeld] = useState(false);
  const drags = useRef(0);

  if (reduced) {
    return (
      <div
        className={`grid place-items-center rounded-full ${className}`}
        style={{ width: size, height: size, background: color, transform: `rotate(${rotate}deg)`, ...style }}
        aria-hidden="true"
      >
        {children}
      </div>
    );
  }

  return (
    <motion.div
      drag
      dragSnapToOrigin
      dragElastic={0.55}
      dragTransition={{ bounceStiffness: 320, bounceDamping: 18 }}
      onDragStart={() => setHeld(true)}
      onDragEnd={() => {
        setHeld(false);
        drags.current += 1;
        if (drags.current === 3) {
          findSecret("stickers", {
            title: "You found the toy box.",
            body: "Everything on this page is stuck down, but only just.",
            emoji: "✦",
          });
        }
      }}
      whileHover={{ scale: 1.08, rotate: rotate + 6 }}
      whileDrag={{ scale: 1.16, rotate: rotate - 10, cursor: "grabbing" }}
      animate={{ rotate: held ? rotate - 10 : rotate }}
      transition={{ type: "spring", stiffness: 300, damping: 18 }}
      className={`grid cursor-grab place-items-center rounded-full text-center ${className}`}
      style={{
        width: size,
        height: size,
        background: color,
        border: "1.5px solid var(--lip)",
        boxShadow: "0 10px 22px -14px rgba(26,22,38,0.7)",
        touchAction: "none",
        ...style,
      }}
      aria-label={label}
      role={label ? "img" : undefined}
      aria-hidden={label ? undefined : true}
    >
      {children}
    </motion.div>
  );
}
