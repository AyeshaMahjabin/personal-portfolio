import { motion } from "motion/react";
import { useScene } from "../scene/store";

/** Scroll-in reveal: things arrive with a little spring, like they were
 *  placed on the page rather than faded in. */
export default function Reveal({
  children,
  delay = 0,
  y = 26,
  once = true,
  className = "",
  ...rest
}) {
  const { reduced } = useScene();

  if (reduced) {
    return (
      <div className={className} {...rest}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-10% 0px -10% 0px" }}
      transition={{ type: "spring", stiffness: 130, damping: 20, mass: 0.9, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
