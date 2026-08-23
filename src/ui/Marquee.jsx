import { useScene } from "../scene/store";

/** A fat coloured band of serif type sliding past. Punctuation between
 *  chapters, and a place for the page to show off its own voice. */
export default function Marquee({ items, color = "var(--ink)", ink = "var(--paper)", tilt = -2 }) {
  const { reduced } = useScene();
  const run = [...items, ...items];

  return (
    <div
      aria-hidden="true"
      className="relative my-6 overflow-hidden py-5"
      style={{
        background: color,
        transform: `rotate(${tilt}deg) scale(1.04)`,
        borderTop: "1.5px solid var(--lip)",
        borderBottom: "1.5px solid var(--lip)",
      }}
    >
      <div className={`flex w-max items-center gap-10 ${reduced ? "" : "animate-marquee"}`}>
        {run.map((item, i) => (
          <span key={i} className="flex shrink-0 items-center gap-10">
            <span
              className="display text-[clamp(1.4rem,3.4vw,2.4rem)] whitespace-nowrap"
              style={{ color: ink }}
            >
              {item}
            </span>
            <span className="text-[1.4rem]" style={{ color: ink, opacity: 0.65 }}>
              ✦
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
