import { motion } from "motion/react";
import Reveal from "../ui/Reveal";
import Sticker from "../ui/Sticker";
import CopyEmailButton from "../components/CopyEmailButton";
import { useMood, useScene } from "../scene/store";
import { links } from "../data/site";

const LINKS = [
  { label: "GitHub", href: links.github, color: "var(--lime)" },
  { label: "LinkedIn", href: links.linkedin, color: "var(--sky)" },
  { label: "Résumé", href: links.resume, color: "var(--butter)" },
];

export default function Contact() {
  const ref = useMood("violet");
  const { reduced } = useScene();

  return (
    <section id="contact" ref={ref} className="section pb-16">
      <div className="shell">
        <div
          className="toy relative overflow-hidden px-6 py-16 text-center sm:px-14 sm:py-20"
          style={{ background: "var(--mood)" }}
        >
          <div className="absolute left-6 top-8 hidden sm:block">
            <Sticker rotate={-14} color="var(--pink)" size={88} label="Hello">
              <span className="display text-[17px]">hi!</span>
            </Sticker>
          </div>
          <div className="absolute bottom-10 right-8 hidden sm:block">
            <Sticker rotate={12} color="var(--card)" size={96} label="Coffee">
              <span className="display text-[14px] leading-tight">
                let&apos;s
                <br />
                talk
              </span>
            </Sticker>
          </div>

          <Reveal>
            <h2 className="display mx-auto max-w-3xl text-[clamp(2.6rem,7.4vw,5rem)]">
              Got something{" "}
              <span className="display-italic" style={{ color: "var(--mood-solid)" }}>
                worth building?
              </span>
            </h2>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="lede mx-auto mt-6 max-w-xl text-[17px]">
              I&apos;m looking for software engineering roles where I get to keep growing across the
              stack. Internships, new-grad roles, or a project that sounds interesting — my inbox is
              open.
            </p>
          </Reveal>

          <Reveal delay={0.14}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <a href={links.email} className="btn btn-ink">
                Send an email
              </a>
              <CopyEmailButton />
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
              {LINKS.map((l, i) => (
                <motion.a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full px-6 py-3 text-[15px] font-bold"
                  style={{
                    background: l.color,
                    border: "1.5px solid var(--lip)",
                    boxShadow: "0 5px 0 var(--lip)",
                  }}
                  whileHover={reduced ? undefined : { y: -4, rotate: i % 2 ? 2 : -2 }}
                  whileTap={reduced ? undefined : { y: 3 }}
                  transition={{ type: "spring", stiffness: 400, damping: 18 }}
                >
                  {l.label} ↗
                </motion.a>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
