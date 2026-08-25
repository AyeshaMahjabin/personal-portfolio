import { useEffect, useState } from "react";
import { motion } from "motion/react";
import SectionHeading from "../ui/SectionHeading";
import Reveal from "../ui/Reveal";
import ProjectPoster from "../components/ProjectPoster";
import CaseStudy from "../components/CaseStudy";
import { useMood, useScene } from "../scene/store";
import { projects } from "../data/site";

/**
 * Projects as alternating asymmetric spreads.
 *
 * Three identical rows in a stack read as a table of contents no matter how
 * nicely they are set. Alternating the side the art lands on gives the section
 * a rhythm you feel while scrolling, and letting the index numeral run at
 * display scale — breaking out over the art rather than sitting politely
 * beside it — gives each project a landmark of its own.
 */
function Project({ project, index, onOpen }) {
  const [hovered, setHovered] = useState(false);
  const { reduced } = useScene();
  const flip = index % 2 === 1;

  return (
    <Reveal delay={0.04}>
      <motion.button
        onClick={() => onOpen(project)}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        data-touchable
        className="group relative block w-full py-16 text-left md:py-24"
        aria-label={`Open the ${project.title} case study`}
      >
        <div className="grid items-center gap-12 md:gap-16 lg:grid-cols-2">
          {/* art */}
          <div className={`relative ${flip ? "lg:order-2" : "lg:order-1"}`}>
            <motion.div
              animate={reduced ? {} : { y: hovered ? -6 : 0 }}
              transition={{ type: "spring", stiffness: 220, damping: 24 }}
            >
              <ProjectPoster project={project} hovered={hovered} ratio="4/3" />
            </motion.div>

            {/* the numeral, breaking out over the art */}
            <span
              aria-hidden="true"
              className="display pointer-events-none absolute select-none leading-none"
              style={{
                fontSize: "clamp(4.5rem,11vw,9rem)",
                [flip ? "right" : "left"]: "-0.05em",
                bottom: "-0.26em",
                color: "var(--ground)",
                WebkitTextStroke: "1.5px var(--mood-solid)",
              }}
            >
              {project.index}
            </span>
          </div>

          {/* type */}
          <div className={`min-w-0 ${flip ? "lg:order-1 lg:pr-8" : "lg:order-2 lg:pl-8"}`}>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10px] uppercase tracking-[0.24em] text-inkfaint">
              <span style={{ color: "var(--mood-solid)" }}>{project.kind}</span>
              <span>/</span>
              <span>{project.period}</span>
            </div>

            <h3 className="display mt-5 text-[clamp(2.2rem,5.4vw,3.8rem)]">
              {project.title}
            </h3>

            <p className="lede mt-5 max-w-md text-[17px]">{project.subtitle}</p>

            <ul className="mt-8 flex flex-wrap gap-x-4 gap-y-2">
              {project.stack.slice(0, 5).map((t) => (
                <li
                  key={t}
                  className="font-mono text-[10px] uppercase tracking-[0.18em] text-inkfaint
                             transition-colors duration-[260ms] group-hover:text-inksoft"
                >
                  {t}
                </li>
              ))}
            </ul>

            <span className="mt-10 inline-flex items-center gap-3 text-[15px] font-semibold">
              <span
                className="relative after:absolute after:-bottom-1 after:left-0 after:h-px
                           after:w-full after:origin-left after:scale-x-0 after:bg-[var(--mood-solid)]
                           after:transition-transform after:duration-[420ms]
                           after:ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:after:scale-x-100"
              >
                Read the case study
              </span>
              <motion.span
                aria-hidden="true"
                animate={reduced ? {} : { x: hovered ? 8 : 0 }}
                transition={{ type: "spring", stiffness: 320, damping: 20 }}
                style={{ color: "var(--mood-solid)" }}
              >
                →
              </motion.span>
            </span>
          </div>
        </div>
      </motion.button>
    </Reveal>
  );
}

export default function Work() {
  const ref = useMood("violet");
  const [open, setOpen] = useState(null);

  /* the command palette can open a case study from anywhere on the page */
  useEffect(() => {
    const onOpen = (e) => {
      const p = projects.find((x) => x.id === e.detail);
      if (p) setTimeout(() => setOpen(p), 420);
    };
    window.addEventListener("case:open", onOpen);
    return () => window.removeEventListener("case:open", onOpen);
  }, []);

  return (
    <section id="work" ref={ref} className="section">
      <div className="shell">
        <SectionHeading
          index="01"
          kicker="the work"
          title="Selected"
          italic="projects."
          note="What each one does, what I built, and the part that was hard."
        />

        <div className="divide-y divide-[var(--line)]">
          {projects.map((p, i) => (
            <Project key={p.id} project={p} index={i} onOpen={setOpen} />
          ))}
        </div>
      </div>

      <CaseStudy project={open} onClose={() => setOpen(null)} onNext={setOpen} />
    </section>
  );
}
