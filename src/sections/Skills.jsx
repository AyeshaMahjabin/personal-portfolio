import SectionHeading from "../ui/SectionHeading";
import Reveal from "../ui/Reveal";
import GlowRow from "../ui/GlowRow";
import { coursework, skills } from "../data/site";
import { useMood } from "../scene/store";

const ICONS = {
  JavaScript: "/assets/javascript.svg",
  Python: "/assets/python.svg",
  Java: "/assets/java.png",
  React: "/assets/react.svg",
  "Tailwind CSS": "/assets/tailwindcss.svg",
  Vite: "/assets/vitejs.svg",
  "Git & GitHub": "/assets/github.svg",
};

/**
 * The toolkit, with the category names promoted to display scale.
 *
 * Set at label size these were a spreadsheet: five grey headings and a lot of
 * small grey text. The category is the thing worth seeing from across the
 * room, so it gets the type, a running two-digit index, and the tools fall
 * underneath it as a list you scan rather than a wall you read.
 */
function Group({ n, label, hint, items, i }) {
  return (
    <Reveal delay={Math.min(i, 5) * 0.05}>
      <GlowRow className="grid gap-x-12 gap-y-6 py-10 pl-6 md:grid-cols-[1fr_1.25fr] md:py-14">
        <div className="flex items-start gap-4">
          <span
            className="mt-2 font-mono text-[10px] tabular-nums tracking-[0.2em] text-inkfaint
                       transition-colors duration-[260ms] group-hover:text-[var(--mood-solid)]"
          >
            {n}
          </span>
          <div>
            <h3 className="display text-[clamp(1.7rem,3.6vw,2.6rem)]">{label}</h3>
            {hint && (
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-inkfaint">
                {hint}
              </p>
            )}
          </div>
        </div>

        <ul className="flex flex-wrap content-start items-center gap-x-6 gap-y-3 md:pt-3">
          {items.map((item) => (
            <li
              key={item}
              className="flex items-center gap-2 text-[16px] text-inksoft
                         transition-colors duration-[200ms] hover:text-ink"
            >
              {ICONS[item] && (
                <img
                  src={ICONS[item]}
                  alt=""
                  aria-hidden="true"
                  className="h-4 w-4 object-contain opacity-50 transition-opacity
                             duration-[200ms] hover:opacity-100"
                />
              )}
              {item}
            </li>
          ))}
        </ul>
      </GlowRow>
    </Reveal>
  );
}

export default function Skills() {
  const ref = useMood("lime");
  const groups = [
    ...skills,
    { label: "Studied", hint: "B.Sc. Computer Science, MUN", items: coursework },
  ];

  return (
    <section id="skills" ref={ref} className="section">
      <div className="shell">
        <SectionHeading
          index="03"
          kicker="toolkit"
          title="What I build"
          italic="with."
          note="No progress bars — they never meant anything. Just what I've genuinely written code in."
        />

        <div className="border-b border-line">
          {groups.map((g, i) => (
            <Group
              key={g.label}
              n={String(i + 1).padStart(2, "0")}
              label={g.label}
              hint={g.hint}
              items={g.items}
              i={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
