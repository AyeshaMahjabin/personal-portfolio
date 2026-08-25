import classNames from "classnames";
import { twMerge } from "tailwind-merge";

/**
 * Compose class names, then let tailwind-merge resolve conflicts so a prop
 * passed by a caller always wins over the component's own default.
 *
 *   cn("px-4 py-2", "px-6")        -> "py-2 px-6"
 *   cn("text-ink", muted && "…")   -> conditionals, arrays, objects
 */
export function cn(...inputs) {
  return twMerge(classNames(inputs));
}

export default cn;
