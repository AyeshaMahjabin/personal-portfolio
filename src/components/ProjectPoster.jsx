import { motion } from "motion/react";
import { useScene } from "../scene/store";

/* Each project owns an accent. It is used as a light source behind the art —
   a wash and a hairline — never as a flat fill. */
const ART = {
  scraper: {
    accent: "#00d9ff",
    line: "paste a link,",
    lead: "ask a question",
    foot: "answered on your own machine",
  },
  kivi: { accent: "#b14bff" },
  portfolio: { accent: "#ff2e88" },
};

/**
 * The art for a project row. A real screenshot sits square inside a lit frame;
 * a project without one gets a typographic plate instead of a fake interface.
 * Nothing is tilted any more — the previous version rotated everything a
 * couple of degrees, which was most of why the page read as a scrapbook.
 */
export default function ProjectPoster({ project, hovered, ratio = "16/11" }) {
  const { reduced } = useScene();
  const art = ART[project.id] || ART.portfolio;

  return (
    <div
      className="relative w-full overflow-hidden rounded-[14px]"
      style={{
        aspectRatio: ratio,
        background:
          `radial-gradient(ellipse at 20% 15%, color-mix(in srgb, ${art.accent} 34%, transparent) 0%, transparent 55%),` +
          `radial-gradient(ellipse at 85% 100%, color-mix(in srgb, var(--violet-neon) 30%, transparent) 0%, transparent 60%),` +
          `linear-gradient(150deg, color-mix(in srgb, ${art.accent} 14%, var(--panel)) 0%, var(--panel) 60%)`,
        border: "1px solid var(--line)",
        boxShadow: hovered
          ? `inset 0 0 60px -30px ${art.accent}, 0 0 40px -22px ${art.accent}`
          : "inset 0 0 60px -40px transparent",
        transition: "box-shadow 260ms cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      {project.image ? (
        <motion.img
          src={project.image}
          alt={`${project.title} screenshot`}
          loading="lazy"
          className="absolute left-1/2 top-1/2 w-[88%] -translate-x-1/2 -translate-y-1/2 rounded-[10px] object-cover"
          style={{
            border: "1px solid var(--lip)",
            boxShadow: "0 26px 50px -26px rgba(0,0,0,1)",
            background: "var(--ground)",
            aspectRatio: "16/10",
          }}
          animate={reduced ? {} : { scale: hovered ? 1.04 : 1, y: hovered ? -4 : 0 }}
          transition={{ type: "spring", stiffness: 220, damping: 22 }}
        />
      ) : (
        <motion.div
          className="absolute inset-0 grid place-items-center px-8 text-center"
          animate={reduced ? {} : { y: hovered ? -5 : 0 }}
          transition={{ type: "spring", stiffness: 220, damping: 22 }}
        >
          <div>
            <p className="display text-[clamp(1.4rem,2.8vw,2.1rem)] leading-[1.08]">
              {art.line}
              <br />
              <span style={{ color: art.accent }}>{art.lead}</span>
            </p>
            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-inkfaint">
              {art.foot}
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
