import { motion } from "motion/react";
import { useScene } from "../scene/store";

const ART = {
  scraper: { bg: "var(--lime)", line: "paste a link,", italic: "ask a question", foot: "answered on your own machine" },
  kivi: { bg: "var(--sky)" },
  portfolio: { bg: "var(--butter)" },
};

/**
 * The lid of a project card. A real screenshot gets framed and tilted like a
 * photo dropped on the page; a project without one gets a printed poster
 * rather than a fake interface.
 */
export default function ProjectPoster({ project, hovered, ratio = "16/11" }) {
  const { reduced } = useScene();
  const art = ART[project.id] || ART.portfolio;

  return (
    <div
      className="relative w-full overflow-hidden rounded-[22px]"
      style={{ background: art.bg, border: "1.5px solid var(--lip)", aspectRatio: ratio }}
    >
      {project.image ? (
        <motion.img
          src={project.image}
          alt={`${project.title} screenshot`}
          loading="lazy"
          className="absolute left-1/2 top-1/2 w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-[14px] object-cover"
          style={{
            border: "1.5px solid var(--lip)",
            boxShadow: "0 22px 40px -24px rgba(26,22,38,0.85)",
            background: "var(--card)",
            aspectRatio: "16/10",
          }}
          animate={
            reduced ? {} : { rotate: hovered ? -1 : -3, scale: hovered ? 1.05 : 1 }
          }
          transition={{ type: "spring", stiffness: 220, damping: 20 }}
        />
      ) : (
        <motion.div
          className="absolute inset-0 grid place-items-center px-8 text-center"
          animate={reduced ? {} : { y: hovered ? -6 : 0 }}
          transition={{ type: "spring", stiffness: 220, damping: 20 }}
        >
          <div>
            <p className="display text-[clamp(1.5rem,3vw,2.3rem)] leading-[1.06]">
              {art.line}
              <br />
              <span className="display-italic">{art.italic}</span>
            </p>
            <p className="mt-3 text-[13px] font-bold" style={{ color: "rgba(26,22,38,0.55)" }}>
              {art.foot}
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
