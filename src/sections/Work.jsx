import { useState } from "react";
import { motion } from "motion/react";
import SectionHeading from "../ui/SectionHeading";
import Reveal from "../ui/Reveal";
import ProjectPoster from "../components/ProjectPoster";
import CaseStudy from "../components/CaseStudy";
import { useMood, useScene } from "../scene/store";
import { projects } from "../data/site";

const TILT = [-1.2, 1.4, -0.8];

function ProjectCard({ project, index, featured, onOpen }) {
  const [hovered, setHovered] = useState(false);
  const { reduced } = useScene();

  const meta = (
    <div className={featured ? "flex h-full flex-col justify-center px-2 py-4 sm:px-6" : "px-2 pb-1 pt-5"}>
      <p className="text-[13px] font-bold" style={{ color: "var(--ink-soft)" }}>
        {project.index} · {project.kind} · {project.period}
      </p>

      <h3
        className={`display mt-2 ${
          featured ? "text-[clamp(2rem,4vw,3rem)]" : "text-[clamp(1.6rem,3vw,2.1rem)]"
        }`}
      >
        {project.title}
      </h3>

      <p className="mt-3 max-w-md text-[16px]" style={{ color: "var(--ink-soft)" }}>
        {project.subtitle}
      </p>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {project.stack.slice(0, featured ? 5 : 4).map((s) => (
          <span
            key={s}
            className="rounded-full px-3 py-1 text-[12px] font-bold"
            style={{ background: "var(--mood)", color: "var(--ink)" }}
          >
            {s}
          </span>
        ))}
      </div>

      <span className="mt-7 flex items-center gap-3 text-[15px] font-bold">
        Read the case study
        <motion.span
          className="grid h-10 w-10 place-items-center rounded-full text-[17px]"
          style={{ background: "var(--ink)", color: "var(--paper)" }}
          animate={reduced ? {} : { rotate: hovered ? 45 : 0, scale: hovered ? 1.1 : 1 }}
          transition={{ type: "spring", stiffness: 320, damping: 18 }}
        >
          ↗
        </motion.span>
      </span>
    </div>
  );

  return (
    <Reveal delay={index * 0.06}>
      <motion.button
        onClick={() => onOpen(project)}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        data-touchable
        className="toy toy-press block w-full p-4 text-left sm:p-5"
        style={{ rotate: `${TILT[index % TILT.length]}deg` }}
        whileHover={reduced ? undefined : { rotate: 0, y: -8 }}
        whileTap={reduced ? undefined : { scale: 0.985, y: 2 }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        aria-label={`Open the ${project.title} case study`}
      >
        {featured ? (
          <div className="grid items-stretch gap-4 md:grid-cols-[1.15fr_0.85fr]">
            <ProjectPoster project={project} hovered={hovered} ratio="16/10" />
            {meta}
          </div>
        ) : (
          <>
            <ProjectPoster project={project} hovered={hovered} />
            {meta}
          </>
        )}
      </motion.button>
    </Reveal>
  );
}

export default function Work() {
  const ref = useMood("violet");
  const [open, setOpen] = useState(null);

  return (
    <section id="work" ref={ref} className="section">
      <div className="shell">
        <SectionHeading
          kicker="the work"
          title="Three things I"
          italic="actually built."
          note="What it is, why it exists, what I owned, and the part that turned out to be harder than it looked. Open one."
        />

        <div className="grid gap-7 md:grid-cols-2">
          {projects.map((p, i) => (
            <div key={p.id} className={i === 0 ? "md:col-span-2" : ""}>
              <ProjectCard project={p} index={i} featured={i === 0} onOpen={setOpen} />
            </div>
          ))}
        </div>
      </div>

      <CaseStudy project={open} onClose={() => setOpen(null)} onNext={setOpen} />
    </section>
  );
}
