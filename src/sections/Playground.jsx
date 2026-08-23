import { motion } from "motion/react";
import SectionHeading from "../ui/SectionHeading";
import Reveal from "../ui/Reveal";
import Globe from "../components/Globe";
import Sticker from "../ui/Sticker";
import { MOODS, useMood, useScene } from "../scene/store";

const SWATCHES = [
  { key: "pink", label: "Pink" },
  { key: "violet", label: "Violet" },
  { key: "lime", label: "Lime" },
  { key: "sky", label: "Sky" },
  { key: "butter", label: "Butter" },
];

export default function Playground() {
  const ref = useMood("violet");
  const { effects, setEffects, coarse, mood, setMood, reduced } = useScene();

  return (
    <section id="playground" ref={ref} className="section">
      <div className="shell">
        <SectionHeading
          kicker="playground"
          title="Things I built"
          italic="for fun."
          note="Most of these are alive on this page right now. None of them are trying to be a product — that's the whole point."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* fluid cursor -------------------------------------------- */}
          <Reveal>
            <div className="toy flex h-full flex-col justify-between p-7">
              <div>
                <span className="pill" style={{ background: "var(--pink-tint)" }}>
                  WebGL
                </span>
                <h3 className="display mt-5 text-[26px]">Fluid cursor</h3>
                <p className="lede mt-3 text-[15px]">
                  A fluid simulation running underneath the whole page. Your cursor pushes dye
                  through a velocity field, and it borrows its colours from whichever section
                  you&apos;re in.
                </p>
              </div>
              <button
                onClick={() => setEffects((v) => !v)}
                disabled={coarse}
                className="btn btn-plain mt-6 w-full disabled:opacity-45"
              >
                {coarse ? "desktop only, sorry" : effects ? "Turn it off" : "Turn it on"}
              </button>
            </div>
          </Reveal>

          {/* colour machine ------------------------------------------- */}
          <Reveal delay={0.06}>
            <div
              className="toy flex h-full flex-col justify-between p-7"
              style={{ background: "var(--mood)" }}
            >
              <div>
                <span className="pill">Design system</span>
                <h3 className="display mt-5 text-[26px]">The colour machine</h3>
                <p className="lede mt-3 text-[15px]">
                  Every section owns a colour, and the paper behind everything drifts to match it as
                  you scroll. Press a swatch to move it by hand.
                </p>
              </div>

              <div className="mt-6 flex gap-2.5">
                {SWATCHES.map((s) => (
                  <motion.button
                    key={s.key}
                    onClick={() => setMood(s.key)}
                    aria-label={`Switch the page to ${s.label}`}
                    aria-pressed={mood === s.key}
                    className="h-11 flex-1 rounded-full"
                    style={{
                      background: MOODS[s.key].solid,
                      border: "1.5px solid var(--lip)",
                      boxShadow: mood === s.key ? "0 2px 0 var(--lip)" : "0 5px 0 var(--lip)",
                    }}
                    animate={{ y: mood === s.key ? 3 : 0 }}
                    whileHover={reduced ? undefined : { y: mood === s.key ? 3 : -3 }}
                    transition={{ type: "spring", stiffness: 420, damping: 20 }}
                  />
                ))}
              </div>
            </div>
          </Reveal>

          {/* globe ---------------------------------------------------- */}
          <Reveal delay={0.12}>
            <div className="toy relative flex h-full flex-col justify-between overflow-hidden p-7">
              <div className="relative z-10">
                <span className="pill" style={{ background: "var(--sky-tint)" }}>
                  Canvas
                </span>
                <h3 className="display mt-5 text-[26px]">Where I am</h3>
                <p className="lede mt-3 max-w-[17rem] text-[15px]">
                  St. John&apos;s: the easternmost city in North America, and half an hour out of
                  sync with the entire continent.
                </p>
              </div>
              <div className="pointer-events-none relative mx-auto mt-5 w-[78%] max-w-[13rem]">
                <Globe />
              </div>
            </div>
          </Reveal>

          {/* the robot ------------------------------------------------- */}
          <Reveal delay={0.06} className="md:col-span-2">
            <div
              className="toy flex h-full flex-col items-start justify-between gap-6 p-7 sm:flex-row sm:items-center"
              style={{ background: "var(--lime)" }}
            >
              <div>
                <span className="pill">3D</span>
                <h3 className="display mt-5 text-[26px]">The robot upstairs</h3>
                <p className="mt-3 max-w-lg text-[15px] leading-relaxed" style={{ color: "rgba(26,22,38,0.75)" }}>
                  A glTF character rendered with react-three-fiber, standing right on the page with
                  no frame around it. It follows your cursor and jumps when you poke it — three.js
                  only downloads once it&apos;s near the screen.
                </p>
                <a href="#home" className="btn btn-ink mt-6">
                  Go poke it
                </a>
              </div>

              <div className="shrink-0 pr-2">
                <Sticker rotate={8} color="var(--card)" size={110} label="Drag me">
                  <span className="display text-[19px] leading-tight">
                    drag
                    <br />
                    me
                  </span>
                </Sticker>
              </div>
            </div>
          </Reveal>

          {/* next ------------------------------------------------------ */}
          <Reveal delay={0.12}>
            <div
              className="flex h-full min-h-[15rem] flex-col justify-between rounded-[28px] p-7"
              style={{ border: "2px dashed var(--lip)" }}
            >
              <span className="pill">In progress</span>
              <div>
                <h3 className="display text-[26px]">Whatever&apos;s next</h3>
                <p className="lede mt-3 text-[15px]">
                  Reserved space: creative coding, small tools, 3D printing, half-formed ideas that
                  turn out to be worth finishing.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
