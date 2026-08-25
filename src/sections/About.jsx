import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import SectionHeading from "../ui/SectionHeading";
import Reveal from "../ui/Reveal";
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
          index="05"
          kicker="about"
          title="A bit"
          italic="about me."
          note="Where I am, what I'm studying, and what I'm working on."
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
                <div
                  className="relative aspect-[4/5] overflow-hidden rounded-[18px]"
                  style={{ background: "var(--mood)", border: "1px solid var(--line)" }}
                >
                  <motion.img
                    src="/assets/coding-pov.png"
                    alt="My desk — laptop, second monitor, and the editor open"
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

                          </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
