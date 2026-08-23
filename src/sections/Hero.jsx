import { motion } from "motion/react";
import RobotHero from "../scene/RobotHero";
import WordCycler from "../ui/WordCycler";
import ScrambleText from "../ui/ScrambleText";
import Magnetic from "../ui/Magnetic";
import { useMood, useScene, ZONE } from "../scene/store";
import { heroWords, links } from "../data/site";

const spring = { type: "spring", stiffness: 120, damping: 18, mass: 0.9 };

export default function Hero() {
  const ref = useMood("sky", ZONE.LOUD);
  const { reduced } = useScene();

  const rise = (delay) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { ...spring, delay },
        };

  return (
    <section
      id="home"
      ref={ref}
      className="relative flex min-h-[100svh] items-center pb-24 pt-32 lg:pt-28"
    >
      <div className="shell grid w-full items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
        <div className="relative order-1">
          {/* availability, as a live indicator rather than a badge */}
          <motion.div {...rise(0)} className="flex items-center gap-2.5">
            <motion.span
              className="h-1.5 w-1.5 rounded-full"
              style={{
                background: "var(--mood-solid)",
                boxShadow: "0 0 10px var(--mood-solid)",
              }}
              animate={reduced ? undefined : { opacity: [1, 0.3, 1] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            />
            <ScrambleText
              text="available — 2026"
              className="font-mono text-[11px] uppercase tracking-[0.24em] text-inksoft"
            />
          </motion.div>

          {/* the name, at the size it deserves */}
          <motion.h1
            {...rise(0.06)}
            className="display mt-7 text-[clamp(2.9rem,9.5vw,7rem)] font-normal leading-[0.92] tracking-[-0.03em]"
          >
            <ScrambleText as="span" text="AYESHA" className="block" />
            <ScrambleText
              as="span"
              text="MAHJABIN"
              speed={90}
              className="display-accent block"
            />
          </motion.h1>

          <motion.div
            {...rise(0.14)}
            className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono
                       text-[11px] uppercase tracking-[0.2em] text-inkfaint"
          >
            <span>Software Developer</span>
            <span style={{ color: "var(--mood-solid)" }}>/</span>
            <span>St. John&apos;s NL</span>
            <span style={{ color: "var(--mood-solid)" }}>/</span>
            <span>UTC−03:30</span>
          </motion.div>

          <motion.p {...rise(0.2)} className="lede mt-8 max-w-[27rem] text-[17px]">
            Frontend features inside a production codebase. Backend when it&apos;s needed.
            Playwright, and the debugging in between.
          </motion.p>

          <motion.div {...rise(0.26)} className="mt-10 flex flex-wrap items-center gap-3">
            <Magnetic>
              <a href="#work" className="btn btn-ink">
                See the work
              </a>
            </Magnetic>
            <Magnetic>
              <a href={links.resume} target="_blank" rel="noreferrer" className="btn btn-plain">
                Résumé ↗
              </a>
            </Magnetic>
            <span className="flex items-center gap-4 pl-1">
              <a
                href={links.github}
                target="_blank"
                rel="noreferrer"
                className="link-underline text-[14px]"
              >
                GitHub
              </a>
              <a
                href={links.linkedin}
                target="_blank"
                rel="noreferrer"
                className="link-underline text-[14px]"
              >
                LinkedIn
              </a>
            </span>
          </motion.div>

          {/* the one line that changes — a readout, bottom of the block */}
          <motion.div
            {...rise(0.32)}
            className="mt-12 flex items-baseline gap-3 border-t border-line pt-5"
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-inkfaint">
              currently
            </span>
            <span className="font-mono text-[13px] text-inksoft">
              <WordCycler words={heroWords} />
            </span>
            <span className="ml-auto hidden items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-inkfaint sm:flex">
              <kbd className="rounded border border-line px-1.5 py-0.5">⌘K</kbd>
              anywhere
            </span>
          </motion.div>
        </div>

        <div className="relative order-2">
          <RobotHero />
        </div>
      </div>
    </section>
  );
}
