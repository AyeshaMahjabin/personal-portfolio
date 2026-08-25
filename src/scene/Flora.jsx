import { lazy, Suspense } from "react";
import Boundary from "../ui/Boundary";
import { useScene } from "./store";

/* three.js is the heaviest thing on the page, so the flora arrives after the
   first paint rather than blocking it. */
const FloraCanvas = lazy(() => import("./FloraCanvas"));

/**
 * Mount point for the bioluminescent layer. Skipped entirely on touch and for
 * reduced motion — it is atmosphere, and atmosphere is the first thing that
 * should go when a device or a person cannot afford it.
 */
export default function Flora() {
  const { coarse, reduced } = useScene();
  if (coarse || reduced) return null;

  /* The positioning lives here rather than on <Canvas>: R3F puts its own
     style on an inner wrapper, so a `position: fixed` passed to the Canvas
     never reached the element and the layer sat in normal flow. */
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0"
      style={{ zIndex: -9 }}
    >
      <Boundary fallback={null}>
        <Suspense fallback={null}>
          <FloraCanvas />
        </Suspense>
      </Boundary>
    </div>
  );
}
