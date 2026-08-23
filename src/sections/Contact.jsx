import { useState } from "react";
import { motion } from "motion/react";
import SectionHeading from "../ui/SectionHeading";
import Reveal from "../ui/Reveal";
import Magnetic from "../ui/Magnetic";
import { bang } from "../lib/fluid";
import { useMood, useScene, ZONE } from "../scene/store";
import { links, profile } from "../data/site";

const ELSEWHERE = [
  { label: "GitHub", href: links.github },
  { label: "LinkedIn", href: links.linkedin },
  { label: "Résumé", href: links.resume },
];

/**
 * The ending, rebuilt as a finale rather than a centred card.
 *
 * It used to be one big tinted box holding three solid-neon pills — the last
 * candy left on the site, and the only section that skipped the rail-and-
 * numeral system every other section opens with. Now the address itself is the
 * largest thing on the page: one enormous mailto you cannot miss, hairline
 * links underneath, and the whole block set left like everything above it.
 */
export default function Contact() {
  const ref = useMood("violet", ZONE.LOUD);
  const { reduced, toast } = useScene();
  const [copied, setCopied] = useState(false);

  const copy = async (e) => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
      const r = e.currentTarget.getBoundingClientRect();
      bang(r.left + r.width / 2, r.top + r.height / 2);
      toast?.({ title: "Copied", body: profile.email, emoji: "✦" });
    } catch {
      toast?.({ title: profile.email, body: "Copy it by hand — clipboard said no." });
    }
  };

  return (
    <section id="contact" ref={ref} className="section pb-0" data-tone="lift">
      <div className="shell">
        <SectionHeading
          index="06"
          kicker="contact"
          title="Got something"
          italic="worth building?"
          note="I'm looking for software engineering roles where I get to keep growing across the stack. Internships, new-grad roles, or a project that sounds interesting."
        />

        {/* the address, as the largest object on the page */}
        <Reveal>
          <a
            href={links.email}
            className="group block border-t border-line pt-10"
            aria-label={`Email ${profile.email}`}
          >
            <span className="flex items-baseline gap-4 font-mono text-[10px] uppercase tracking-[0.24em] text-inkfaint">
              <span style={{ color: "var(--mood-solid)" }}>write to me</span>
              <span className="h-px flex-1 bg-[var(--line)]" />
            </span>

            <motion.span
              className="display mt-6 block break-all text-[clamp(1.6rem,6.4vw,4.6rem)]
                         transition-colors duration-[300ms] group-hover:text-[var(--mood-solid)]"
              whileHover={reduced ? undefined : { x: 10 }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
            >
              {profile.email}
            </motion.span>
          </a>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-6">
            <Magnetic>
              <button onClick={copy} className="btn btn-ink min-w-[10.5rem]">
                {copied ? "Copied ✓" : "Copy address"}
              </button>
            </Magnetic>

            <ul className="flex flex-wrap items-center gap-x-8 gap-y-3">
              {ELSEWHERE.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-baseline gap-2 font-mono text-[11px]
                               uppercase tracking-[0.2em] text-inksoft transition-colors
                               duration-[240ms] hover:text-ink"
                  >
                    <span
                      className="relative after:absolute after:-bottom-1 after:left-0 after:h-px
                                 after:w-full after:origin-left after:scale-x-0
                                 after:bg-[var(--mood-solid)] after:transition-transform
                                 after:duration-[380ms] group-hover:after:scale-x-100"
                    >
                      {l.label}
                    </span>
                    <span style={{ color: "var(--mood-solid)" }}>↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
