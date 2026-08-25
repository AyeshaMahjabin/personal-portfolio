import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import SectionHeading from "../ui/SectionHeading";
import Reveal from "../ui/Reveal";
import { useMood, useScene } from "../scene/store";
import { experience } from "../data/site";

/* One accent for the whole control, not five — the tabs are a segmented
   selector, and colour-coding them made five equal things look unrelated. */

export default function Experience() {
  const ref = useMood("sky");
  const { reduced } = useScene();
  const [active, setActive] = useState(0);
  const facet = experience.facets[active];

  return (
    <section id="experience" ref={ref} className="section" data-tone="lift">
      <div className="shell">
        <SectionHeading
          index="02"
          kicker="work experience"
          title="Where I've"
          italic="worked."
          note="One internship, five parts of the job. Pick a tab for what each involved."
        />

        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          {/* the role ------------------------------------------------ */}
          <Reveal>
            <div className="toy h-full p-7">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span
                    className="absolute inline-flex h-full w-full rounded-full opacity-70"
                    style={{
                      background: "var(--mood-solid)",
                      boxShadow: "0 0 10px var(--mood-solid)",
                    }}
                  />
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-inksoft">Current</span>
              </div>

              <h3 className="display mt-5 text-[clamp(2rem,4vw,2.8rem)]">{experience.company}</h3>
              <p className="mt-2 text-[17px] font-semibold">{experience.role}</p>
              <p className="mt-1 text-[14px]" style={{ color: "var(--ink-soft)" }}>
                {experience.location} · {experience.period}
              </p>

              <div
                className="my-6 h-px w-full"
                style={{ background: "var(--line)" }}
              />

              <p className="lede text-[16px]">{experience.intro}</p>

              <ul className="mt-7 flex flex-wrap gap-1.5">
                {["Production codebase", "Full stack", "TypeScript", "MongoDB", "REST APIs", "Playwright", "CI", "Jira"].map(
                  (t) => (
                    <li
                      key={t}
                      className="rounded-md border border-line bg-glass px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-[0.14em] text-inksoft"
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
              <div className="flex flex-wrap gap-1 border-b border-line pb-px">
                {experience.facets.map((f, i) => (
                  <motion.button
                    key={f.id}
                    onClick={() => setActive(i)}
                    data-touchable
                    className="relative rounded-md px-3.5 py-2 font-mono text-[11px] uppercase tracking-[0.16em] transition-colors duration-[200ms]"
                    style={{ color: active === i ? "var(--mood-solid)" : "var(--ink-faint)" }}
                    whileHover={reduced ? undefined : { y: -1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 22 }}
                    aria-pressed={active === i}
                  >
                    {f.label}
                    {active === i && (
                      <motion.span
                        layoutId="facet-underline"
                        className="absolute inset-x-2 -bottom-px h-px"
                        style={{
                          background: "var(--mood-solid)",
                          boxShadow: "0 0 10px var(--mood-solid)",
                        }}
                        transition={{ type: "spring", stiffness: 400, damping: 32 }}
                      />
                    )}
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
                            className="mt-[10px] h-1 w-1 shrink-0 rounded-full"
                            style={{ background: "var(--mood-solid)" }}
                          />
                          <span className="lede">{line}</span>
                        </li>
                      ))}
                    </ul>

                    <p
                      className="mt-8 border-l pl-5 text-[17px] leading-snug"
                      style={{
                        borderColor: "color-mix(in srgb, var(--mood-solid) 45%, transparent)",
                        color: "var(--ink)",
                      }}
                    >
                      {facet.note}
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
