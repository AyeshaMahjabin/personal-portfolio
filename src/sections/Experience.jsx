import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import SectionHeading from "../ui/SectionHeading";
import Reveal from "../ui/Reveal";
import { useMood, useScene } from "../scene/store";
import { experience } from "../data/site";

const KEY_COLORS = ["var(--pink)", "var(--violet)", "var(--lime)", "var(--sky)", "var(--butter)"];

export default function Experience() {
  const ref = useMood("sky");
  const { reduced } = useScene();
  const [active, setActive] = useState(0);
  const facet = experience.facets[active];

  return (
    <section id="experience" ref={ref} className="section">
      <div className="shell">
        <SectionHeading
          kicker="work experience"
          title="Inside a"
          italic="real codebase."
          note="One internship, five surfaces. Press a key to see what each part of the job actually involved."
        />

        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          {/* the role ------------------------------------------------ */}
          <Reveal>
            <div className="toy h-full p-7" style={{ background: "var(--mood)" }}>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span
                    className="absolute inline-flex h-full w-full rounded-full opacity-70"
                    style={{ background: "var(--ink)" }}
                  />
                </span>
                <span className="text-[13px] font-bold uppercase tracking-wider">Current</span>
              </div>

              <h3 className="display mt-5 text-[clamp(2rem,4vw,2.8rem)]">{experience.company}</h3>
              <p className="mt-2 text-[17px] font-semibold">{experience.role}</p>
              <p className="mt-1 text-[14px]" style={{ color: "var(--ink-soft)" }}>
                {experience.location} · {experience.period}
              </p>

              <div
                className="my-6 h-[1.5px] w-full"
                style={{ background: "var(--lip)" }}
              />

              <p className="lede text-[16px]">{experience.intro}</p>

              <ul className="mt-7 flex flex-wrap gap-1.5">
                {["Production codebase", "Playwright", "Automated tests", "Debugging", "CI", "Team process"].map(
                  (t) => (
                    <li
                      key={t}
                      className="rounded-full px-3 py-1.5 text-[12.5px] font-bold"
                      style={{ background: "var(--card)", border: "1.5px solid var(--lip)" }}
                    >
                      {t}
                    </li>
                  )
                )}
              </ul>
            </div>
          </Reveal>

          {/* the keys ------------------------------------------------- */}
          <Reveal delay={0.08}>
            <div className="toy h-full overflow-hidden p-4 sm:p-6">
              <div className="flex flex-wrap gap-2">
                {experience.facets.map((f, i) => (
                  <motion.button
                    key={f.id}
                    onClick={() => setActive(i)}
                    data-touchable
                    className="rounded-full px-4 py-2.5 text-[14px] font-bold"
                    style={{
                      background: active === i ? KEY_COLORS[i % KEY_COLORS.length] : "var(--paper)",
                      border: "1.5px solid var(--lip)",
                      boxShadow: active === i ? "0 2px 0 var(--lip)" : "0 4px 0 var(--lip)",
                    }}
                    animate={{ y: active === i ? 2 : 0 }}
                    whileHover={reduced ? undefined : { y: active === i ? 2 : -2 }}
                    transition={{ type: "spring", stiffness: 400, damping: 22 }}
                    aria-pressed={active === i}
                  >
                    {f.label}
                  </motion.button>
                ))}
              </div>

              <div className="relative mt-6 min-h-[19rem] px-1 sm:px-2">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={facet.id}
                    initial={reduced ? false : { opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduced ? undefined : { opacity: 0, y: -14 }}
                    transition={{ type: "spring", stiffness: 260, damping: 24 }}
                  >
                    <h4 className="display text-[clamp(1.5rem,3vw,2rem)]">{facet.title}</h4>

                    <ul className="mt-5 space-y-3.5">
                      {facet.lines.map((line) => (
                        <li key={line} className="flex gap-3 text-[16px]">
                          <span
                            className="mt-[9px] h-2 w-2 shrink-0 rounded-full"
                            style={{ background: KEY_COLORS[active % KEY_COLORS.length] }}
                          />
                          <span className="lede">{line}</span>
                        </li>
                      ))}
                    </ul>

                    <p
                      className="display-italic mt-7 text-[18px] leading-snug"
                      style={{ color: "var(--ink)" }}
                    >
                      “{facet.note}”
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
