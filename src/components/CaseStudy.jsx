import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import ProjectPoster from "./ProjectPoster";
import { projects } from "../data/site";

/** The long read, on a sheet that springs up over the page. */
export default function CaseStudy({ project, onClose, onNext }) {
  useEffect(() => {
    if (!project) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [project, onClose]);

  const next = project
    ? projects[(projects.findIndex((p) => p.id === project.id) + 1) % projects.length]
    : null;

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[90] flex justify-center overflow-y-auto overscroll-contain px-3 pt-6 sm:px-6 sm:pt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ background: "var(--scrim)", backdropFilter: "blur(8px)" }}
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.article
            initial={{ y: "60vh", opacity: 0.6 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "70vh", opacity: 0 }}
            transition={{ type: "spring", stiffness: 180, damping: 26, mass: 0.9 }}
            className="toy mb-0 h-fit w-full max-w-3xl overflow-hidden !rounded-b-none"
            role="dialog"
            aria-modal="true"
            aria-label={`${project.title} case study`}
          >
            <div
              className="sticky top-0 z-10 flex items-center justify-between gap-4 px-6 py-4 sm:px-9"
              style={{ background: "var(--card)", borderBottom: "1px solid var(--line)" }}
            >
              <p className="text-[13px] font-bold" style={{ color: "var(--ink-soft)" }}>
                {project.index} · {project.kind} · {project.period}
              </p>
              <button
                onClick={onClose}
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-[18px]"
                style={{ background: "var(--panel-hi)", color: "var(--ink)" }}
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <div className="px-6 pb-10 pt-7 sm:px-9">
              <h3 className="display text-[clamp(2.2rem,5.4vw,3.4rem)]">{project.title}</h3>
              <p className="mt-3 max-w-xl text-[18px]" style={{ color: "var(--ink-soft)" }}>
                {project.summary}
              </p>

              <div className="mt-6 flex flex-wrap gap-1.5">
                {project.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-full px-3 py-1.5 text-[12px] font-bold"
                    style={{ background: "var(--mood)", color: "var(--ink)" }}
                  >
                    {s}
                  </span>
                ))}
              </div>

              <div className="mt-8">
                <ProjectPoster project={project} hovered={false} />
              </div>

              <p className="mt-5 text-[14px] font-bold" style={{ color: "var(--ink-soft)" }}>
                My role — {project.role}
              </p>

              <div className="mt-10 space-y-9">
                {project.story.map((block, i) => (
                  <section key={block.h} className="grid gap-2 sm:grid-cols-[1fr_2fr] sm:gap-6">
                    <h4 className="display text-[20px]" style={{ color: "var(--mood-solid)" }}>
                      <span className="mr-2 text-[15px]" style={{ color: "var(--ink-faint)" }}>
                        0{i + 1}
                      </span>
                      {block.h}
                    </h4>
                    <p className="lede text-[16px]">{block.p}</p>
                  </section>
                ))}
              </div>

              {next && (
                <button
                  onClick={() => onNext(next)}
                  className="toy toy-press mt-12 flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  style={{ background: "var(--mood)" }}
                >
                  <span>
                    <span className="text-[13px] font-bold" style={{ color: "var(--ink-soft)" }}>
                      next up
                    </span>
                    <span className="display mt-1 block text-[26px]">{next.title}</span>
                  </span>
                  <span className="text-[22px]">→</span>
                </button>
              )}
            </div>
          </motion.article>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
