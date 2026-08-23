import { motion } from "motion/react";
import SectionHeading from "../ui/SectionHeading";
import Reveal from "../ui/Reveal";
import { coursework, skills } from "../data/site";
import { useMood, useScene } from "../scene/store";

const TRAY = ["var(--pink-tint)", "var(--violet-tint)", "var(--lime-tint)", "var(--sky-tint)", "var(--butter-tint)"];
const DOT = ["var(--pink)", "var(--violet)", "var(--lime)", "var(--sky)", "var(--butter)"];

const ICONS = {
  JavaScript: "/assets/javascript.svg",
  Python: "/assets/python.svg",
  Java: "/assets/java.png",
  React: "/assets/react.svg",
  "Tailwind CSS": "/assets/tailwindcss.svg",
  Vite: "/assets/vitejs.svg",
  "Git & GitHub": "/assets/github.svg",
};

export default function Skills() {
  const ref = useMood("lime");
  const { reduced } = useScene();

  return (
    <section id="skills" ref={ref} className="section">
      <div className="shell">
        <SectionHeading
          kicker="toolkit"
          title="What I build"
          italic="with."
          note="No progress bars — they never meant anything. Just the things I've genuinely written code in, sorted by where they live."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skills.map((group, gi) => (
            <Reveal key={group.label} delay={(gi % 3) * 0.05}>
              <div className="toy h-full p-6" style={{ background: TRAY[gi % TRAY.length] }}>
                <div className="flex items-baseline gap-2">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ background: DOT[gi % DOT.length] }}
                  />
                  <h3 className="display text-[24px]">{group.label}</h3>
                </div>
                <p className="display-italic mt-1 text-[15px]" style={{ color: "var(--ink-soft)" }}>
                  {group.hint}
                </p>

                <ul className="mt-6 flex flex-wrap gap-2">
                  {group.items.map((item, i) => (
                    <motion.li
                      key={item}
                      className="flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[13.5px] font-bold"
                      style={{
                        background: "var(--card)",
                        border: "1.5px solid var(--lip)",
                        boxShadow: "0 3px 0 var(--lip)",
                      }}
                      whileHover={
                        reduced ? undefined : { y: -4, rotate: i % 2 ? 3 : -3, scale: 1.04 }
                      }
                      transition={{ type: "spring", stiffness: 420, damping: 16 }}
                    >
                      {ICONS[item] && (
                        <img src={ICONS[item]} alt="" aria-hidden="true" className="h-3.5 w-3.5 object-contain" />
                      )}
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}

          <Reveal delay={0.1}>
            <div className="toy h-full p-6" style={{ background: "var(--ink)", color: "var(--paper)" }}>
              <h3 className="display text-[24px]">Studied</h3>
              <p className="display-italic mt-1 text-[15px]" style={{ color: "rgba(251,249,245,0.6)" }}>
                B.Sc. Computer Science, MUN
              </p>
              <ul className="mt-6 space-y-2.5">
                {coursework.map((c) => (
                  <li key={c} className="flex items-center gap-3 text-[15px] font-medium">
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--lime)" }} />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
