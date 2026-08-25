import { useEffect, useRef } from "react";
import { useScene } from "../scene/store";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/\\<>[]{}*#%&";

/**
 * Text that decodes into place the first time it scrolls into view.
 *
 * Each character locks in on its own schedule, left to right, so the string
 * resolves like a signal tuning in rather than a typewriter. It writes
 * straight to textContent inside a rAF loop — a setState per frame per label
 * would be dozens of renders a second for pure decoration.
 */
export default function ScrambleText({
  text,
  as: Tag = "span",
  className,
  speed = 34,
  style,
}) {
  const el = useRef(null);
  const { reduced } = useScene();

  useEffect(() => {
    const node = el.current;
    if (!node) return;

    if (reduced) {
      node.textContent = text;
      return;
    }

    let raf = 0;
    let started = false;

    const run = () => {
      const chars = [...text];
      /* every character gets a frame at which it stops being noise */
      const settleAt = chars.map((c, i) =>
        c === " " ? 0 : i * 1.6 + Math.random() * 10
      );
      let frame = 0;

      const tick = () => {
        let done = true;
        node.textContent = chars
          .map((c, i) => {
            if (frame >= settleAt[i]) return c;
            done = false;
            return GLYPHS[(Math.random() * GLYPHS.length) | 0];
          })
          .join("");
        frame += 1;
        if (!done) raf = requestAnimationFrame(tick);
      };
      tick();
    };

    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting || started) return;
        started = true;
        setTimeout(run, speed);
        io.disconnect();
      },
      { rootMargin: "-10% 0px -10% 0px" }
    );

    node.textContent = text.replace(/\S/g, " ");
    io.observe(node);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [text, reduced, speed]);

  return <Tag ref={el} className={className} style={style} aria-label={text} />;
}
