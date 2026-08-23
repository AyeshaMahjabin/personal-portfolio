import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import SectionHeading from "../ui/SectionHeading";
import Reveal from "../ui/Reveal";
import Sticker from "../ui/Sticker";
import { about, profile } from "../data/site";
import { useMood, useScene } from "../scene/store";

export default function About() {
  const moodRef = useMood("pink");
  const ref = useRef(null);
  const { reduced } = useScene();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <section id="about" ref={moodRef} className="section">
      <div className="shell" ref={ref}>
        <SectionHeading
          kicker="about"
          title="The person"
          italic="behind it."
          note="Short version: I like making things, and I like knowing why they work."
        />

        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <p
                  className={`mb-6 leading-relaxed ${i === 0 ? "text-[21px]" : "text-[17px]"}`}
                  style={{ color: i === 0 ? "var(--ink)" : "var(--ink-soft)" }}
                >
                  {p}
                </p>
              </Reveal>
            ))}

            <Reveal delay={0.2}>
              <dl className="mt-10 grid gap-x-8 gap-y-6 sm:grid-cols-2">
                {about.facts.map((f) => (
                  <div key={f.k}>
                    <dt className="display-italic text-[16px]" style={{ color: "var(--mood-solid)" }}>
                      {f.k}
                    </dt>
                    <dd className="mt-1 text-[16px] font-semibold">{f.v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          {/* the photo, taped to the page --------------------------- */}
          <Reveal delay={0.1}>
            <div className="relative mx-auto w-full max-w-[26rem]">
              <motion.div
                className="toy relative p-4 pb-16"
                style={{ rotate: "2.2deg", background: "var(--card)" }}
                whileHover={reduced ? undefined : { rotate: 0, y: -8 }}
                transition={{ type: "spring", stiffness: 220, damping: 20 }}
              >
                <span
                  aria-hidden="true"
                  className="absolute -top-4 left-1/2 z-10 h-8 w-28 -translate-x-1/2 rotate-[-4deg] rounded-[3px]"
                  style={{ background: "rgba(255,255,255,0.75)", border: "1px solid var(--lip)" }}
                />

                <div
                  className="relative aspect-[4/5] overflow-hidden rounded-[18px]"
                  style={{ background: "var(--mood)", border: "1.5px solid var(--lip)" }}
                >
                  <motion.img
                    src="/assets/coding-pov.png"
                    alt="A desk, a laptop, and far too many open tabs"
                    loading="lazy"
                    className="absolute inset-0 h-[110%] w-full object-cover"
                    style={{ y: reduced ? 0 : y }}
                  />
                </div>

                <p className="display absolute bottom-5 left-6 text-[20px]">{profile.short}</p>
                <p
                  className="absolute bottom-[22px] right-6 text-[13px] font-bold"
                  style={{ color: "var(--ink-soft)" }}
                >
                  St. John&apos;s, NL
                </p>
              </motion.div>

              <div className="absolute -right-5 -top-7">
                <Sticker rotate={14} color="var(--lime)" size={92} label="Open to work">
                  <span className="display text-[14px] leading-tight">
                    open
                    <br />
                    to work
                  </span>
                </Sticker>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
