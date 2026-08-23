import { motion } from "motion/react";
import RobotHero from "../scene/RobotHero";
import Sticker from "../ui/Sticker";
import WordCycler from "../ui/WordCycler";
import { useMood, useScene } from "../scene/store";
import { heroWords, links } from "../data/site";

const spring = { type: "spring", stiffness: 120, damping: 18, mass: 0.9 };

export default function Hero() {
  const ref = useMood("pink");
  const { reduced } = useScene();

  const rise = (delay) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0 },
          transition: { ...spring, delay },
        };

  return (
    <section
      id="home"
      ref={ref}
      className="relative flex min-h-[100svh] items-center pb-20 pt-32 lg:pt-28"
    >
      <div className="shell grid w-full items-center gap-14 lg:grid-cols-[1.02fr_0.98fr] lg:gap-10">
        <div className="relative order-1">
          <motion.p {...rise(0)} className="flex flex-wrap items-center gap-2">
            <span className="pill" style={{ background: "var(--lime)" }}>
              Software Development Intern
            </span>
            <span className="pill">Final POS · St. John&apos;s</span>
          </motion.p>

          <motion.h1 {...rise(0.07)} className="display mt-7 text-[clamp(3rem,8.4vw,6.4rem)]">
            Software
            <br />
            that feels{" "}
            <span className="display-italic" style={{ color: "var(--pink)" }}>
              good
            </span>
            <br />
            to use.
          </motion.h1>

          <motion.p {...rise(0.14)} className="lede mt-7 max-w-[30rem] text-[18px]">
            I&apos;m <strong style={{ color: "var(--ink)" }}>Ayesha</strong> — a Computer Science
            student at Memorial University, building across the whole stack: frontend features
            inside a real production codebase, backend work, Playwright tests, and the debugging
            that comes with all of it.
          </motion.p>

          <motion.div {...rise(0.2)} className="mt-7">
            <p className="display-italic text-[18px]" style={{ color: "var(--ink-soft)" }}>
              currently into
            </p>
            <p className="display mt-1 text-[clamp(1.3rem,2.6vw,1.9rem)]">
              <WordCycler words={heroWords} />
            </p>
          </motion.div>

          <motion.div {...rise(0.26)} className="mt-10 flex flex-wrap items-center gap-3">
            <a href="#work" className="btn btn-ink">
              See the work
            </a>
            <a href={links.resume} target="_blank" rel="noreferrer" className="btn btn-plain">
              Résumé ↗
            </a>
            <span className="flex items-center gap-4 pl-1">
              <a
                href={links.github}
                target="_blank"
                rel="noreferrer"
                className="link-underline text-[15px]"
              >
                GitHub
              </a>
              <a
                href={links.linkedin}
                target="_blank"
                rel="noreferrer"
                className="link-underline text-[15px]"
              >
                LinkedIn
              </a>
            </span>
          </motion.div>
        </div>

        <div className="relative order-2">
          <RobotHero />

          <div className="absolute -top-2 right-2 hidden sm:block">
            <Sticker rotate={12} color="var(--butter)" size={92} label="Poke me">
              <span className="display text-[15px] leading-tight">
                poke
                <br />
                me →
              </span>
            </Sticker>
          </div>

          <div className="absolute -bottom-2 left-0 hidden sm:block">
            <Sticker rotate={-10} color="var(--sky)" size={78} label="Made in Newfoundland">
              <span className="display text-[13px] leading-tight">
                made in
                <br />
                NL
              </span>
            </Sticker>
          </div>
        </div>
      </div>
    </section>
  );
}
