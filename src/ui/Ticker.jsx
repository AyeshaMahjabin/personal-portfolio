import { useScene } from "../scene/store";

/**
 * The status strip pinned to the bottom edge of the viewport.
 *
 * This is what the two tilted marquee bands became. Same motion, opposite
 * register: monospace, hairline, level with the grid, and quiet enough that
 * you read it only when you go looking for it.
 */
export default function Ticker({ items }) {
  const { reduced } = useScene();
  const run = [...items, ...items];

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 bottom-0 z-50 overflow-hidden
                 border-t border-line bg-ground/70 py-1.5 backdrop-blur-md"
    >
      <div className={`flex w-max items-center gap-8 ${reduced ? "" : "animate-marquee"}`}>
        {run.map((item, i) => (
          <span key={i} className="flex shrink-0 items-center gap-8">
            <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-inkfaint">
              {item}
            </span>
            <span className="text-[10px] text-[var(--mood-solid)] opacity-60">/</span>
          </span>
        ))}
      </div>
    </div>
  );
}
