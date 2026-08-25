import SectionHeading from "../ui/SectionHeading";
import Reveal from "../ui/Reveal";
import GlowRow from "../ui/GlowRow";
import Globe from "../components/Globe";
import { MOODS, useMood, useScene, ZONE } from "../scene/store";

/* Only the three that are actually distinct — the other two mood keys are
   aliases of these until phase four renames the call sites. */
const SWATCHES = [
  { key: "pink", label: "Magenta" },
  { key: "sky", label: "Cyan" },
  { key: "violet", label: "Violet" },
];

/** A demo row: instrument label, the thing, the controls. No box. */
function Demo({ tag, title, children, aside, delay = 0 }) {
  return (
    <Reveal delay={delay}>
      <GlowRow className="grid items-center gap-x-10 gap-y-6 py-12 pl-6 md:grid-cols-[8rem_1fr_auto]">
        <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-inkfaint">
          {tag}
        </span>

        <div className="max-w-xl">
          <h3 className="display text-[clamp(1.7rem,3.4vw,2.4rem)]">{title}</h3>
          {children}
        </div>

        {aside && <div className="md:justify-self-end">{aside}</div>}
      </GlowRow>
    </Reveal>
  );
}

export default function Playground() {
  /* LOUD: this is the one section where the fluid is meant to be the subject
     rather than the atmosphere. */
  const ref = useMood("violet", ZONE.LOUD);
  const { effects, setEffects, coarse, mood, setMood } = useScene();

  return (
    <section id="playground" ref={ref} className="section" data-tone="lift">
      <div className="shell">
        <SectionHeading
          index="04"
          kicker="playground"
          title="Things I built"
          italic="for fun."
          note="All three are running on this page right now. Try them."
        />

        <div className="border-b border-line">
          <Demo
            tag="WebGL"
            title="Fluid cursor"
            aside={
              <button
                onClick={() => setEffects((v) => !v)}
                disabled={coarse}
                className="btn btn-ink disabled:opacity-40"
              >
                {coarse ? "Desktop only" : effects ? "Turn it off" : "Turn it on"}
              </button>
            }
          >
            <p className="lede mt-3 text-[15px]">
              A Navier–Stokes fluid simulation on a WebGL canvas behind the page. The cursor pushes
              dye through a velocity field, and the shader reads its colours from the site&apos;s CSS
              variables, so the fluid tracks the current section. Turned up highest in this section.
            </p>
          </Demo>

          <Demo
            tag="Canvas"
            title="Where I am"
            delay={0.06}
            aside={
              <div className="pointer-events-none relative w-[17rem] max-w-full md:w-[22rem]">
                {/* a lit ring behind it, so the globe sits in the scene */}
                <div
                  aria-hidden="true"
                  className="absolute inset-[8%] rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle, color-mix(in srgb, var(--cyan) 18%, transparent) 0%, transparent 65%)",
                    filter: "blur(20px)",
                  }}
                />
                <Globe className="relative" />
              </div>
            }
          >
            <p className="lede mt-3 text-[15px]">
              A globe drawn to a canvas with a marker on St. John&apos;s — easternmost city in North
              America, and on a timezone half an hour off the rest of the continent.
            </p>
          </Demo>

          <Demo
            tag="Design system"
            title="The colour machine"
            delay={0.12}
            aside={
              <div className="flex items-center gap-2.5">
                {SWATCHES.map((s) => (
                  <button
                    key={s.key}
                    onClick={() => setMood(s.key)}
                    aria-label={`Switch the page to ${s.label}`}
                    aria-pressed={mood === s.key}
                    className="h-9 w-9 rounded-md border transition-all duration-[260ms]"
                    style={{
                      background: `color-mix(in srgb, ${MOODS[s.key].solid} 22%, transparent)`,
                      borderColor:
                        mood === s.key
                          ? MOODS[s.key].solid
                          : "color-mix(in srgb, var(--ink) 14%, transparent)",
                      boxShadow:
                        mood === s.key ? `0 0 20px -4px ${MOODS[s.key].solid}` : "none",
                    }}
                  />
                ))}
              </div>
            }
          >
            <p className="lede mt-3 text-[15px]">
              Every section owns an accent colour, and the background drifts toward it as you scroll.
              Set it by hand here and the rest of the site follows, fluid cursor included.
            </p>
          </Demo>
        </div>
      </div>
    </section>
  );
}
