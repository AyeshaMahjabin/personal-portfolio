import { useState } from "react";
import { motion } from "motion/react";
import SectionHeading from "../ui/SectionHeading";
import Reveal from "../ui/Reveal";
import { principles } from "../data/site";
import { useMood, useScene } from "../scene/store";

const NOTE_COLORS = [
  "var(--butter)",
  "var(--pink-tint)",
  "var(--lime)",
  "var(--sky-tint)",
  "var(--violet-tint)",
  "var(--butter-tint)",
  "var(--pink)",
];

const ROT = [-2.5, 1.8, -1.2, 2.4, -1.8, 1.2, -2];

/** A pinned note. Tap it and it turns over. */
function Note({ p, i }) {
  const [flipped, setFlipped] = useState(false);
  const { reduced } = useScene();

  return (
    <Reveal delay={(i % 3) * 0.05} className="[perspective:1600px]">
      <motion.button
        onClick={() => setFlipped((v) => !v)}
        data-touchable
        className="relative block h-full min-h-[15rem] w-full text-left"
        style={{ rotate: `${ROT[i % ROT.length]}deg` }}
        whileHover={reduced ? undefined : { rotate: 0, y: -6, scale: 1.02 }}
        whileTap={reduced ? undefined : { scale: 0.98 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        aria-label={`${p.front} — turn over`}
      >
        {/* tape */}
        <span
          aria-hidden="true"
          className="absolute -top-3 left-1/2 z-10 h-6 w-20 -translate-x-1/2 rotate-[-3deg] rounded-[3px]"
          style={{ background: "rgba(255,255,255,0.7)", border: "1px solid var(--lip)" }}
        />

        <motion.div
          className="relative h-full min-h-[15rem] w-full [transform-style:preserve-3d]"
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 160, damping: 20 }}
        >
          <div
            className="absolute inset-0 flex flex-col justify-between rounded-[22px] p-6 [backface-visibility:hidden]"
            style={{
              background: NOTE_COLORS[i % NOTE_COLORS.length],
              border: "1.5px solid var(--lip)",
              boxShadow: "0 5px 0 var(--lip), 0 22px 40px -30px rgba(26,22,38,0.7)",
            }}
          >
            <span className="display text-[15px]" style={{ opacity: 0.5 }}>
              {p.n}
            </span>
            <p className="display text-[22px] leading-[1.12]">{p.front}</p>
            <span className="text-[12px] font-bold uppercase tracking-wider" style={{ opacity: 0.55 }}>
              turn over →
            </span>
          </div>

          <div
            className="absolute inset-0 flex flex-col justify-between rounded-[22px] p-6 [backface-visibility:hidden]"
            style={{
              transform: "rotateY(180deg)",
              background: "var(--card)",
              border: "1.5px solid var(--lip)",
              boxShadow: "0 5px 0 var(--lip), 0 22px 40px -30px rgba(26,22,38,0.7)",
            }}
          >
            <span className="display-italic text-[15px]" style={{ color: "var(--mood-solid)" }}>
              because
            </span>
            <p className="text-[16px] leading-relaxed">{p.back}</p>
            <span className="text-[12px] font-bold uppercase tracking-wider" style={{ opacity: 0.45 }}>
              ← back
            </span>
          </div>
        </motion.div>
      </motion.button>
    </Reveal>
  );
}

export default function Mindset() {
  const ref = useMood("butter");

  return (
    <section id="mindset" ref={ref} className="section">
      <div className="shell">
        <SectionHeading
          kicker="how i think"
          title="Seven things I learned"
          italic="the annoying way."
          note="By getting them wrong first, mostly. Turn a note over for the reasoning."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {principles.map((p, i) => (
            <Note key={p.n} p={p} i={i} />
          ))}

          <Reveal delay={0.1} className="sm:col-span-2">
            <div
              className="toy flex h-full min-h-[15rem] flex-col justify-center p-8"
              style={{ background: "var(--ink)", color: "var(--paper)" }}
            >
              <p className="display text-[clamp(1.7rem,3.4vw,2.6rem)] leading-[1.08]">
                Curiosity is the only one
                <br />I didn&apos;t have to{" "}
                <span className="display-italic" style={{ color: "var(--lime)" }}>
                  learn.
                </span>
              </p>
              <p className="mt-4 max-w-md text-[16px]" style={{ color: "rgba(251,249,245,0.72)" }}>
                The rest are habits I built, because being curious without them just means breaking
                things faster.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
