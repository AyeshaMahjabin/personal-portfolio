import SectionHeading from "../ui/SectionHeading";
import Reveal from "../ui/Reveal";
import GlowRow from "../ui/GlowRow";
import Globe from "../components/Globe";
import { bang } from "../lib/fluid";
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

  /* Fire a burst from wherever the button is, so the demo demonstrates itself. */
  const makeAMess = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        bang(
          r.left + r.width / 2 + (Math.random() - 0.5) * 260,
          r.top + r.height / 2 + (Math.random() - 0.5) * 200
        );
      }, i * 70);
    }
  };

  return (
    <section id="playground" ref={ref} className="section" data-tone="lift">
      <div className="shell">
        <SectionHeading
          index="04"
          kicker="playground"
          title="Things I built"
          italic="for fun."
          note="All three are alive on this page right now. None of them are trying to be a product — that's the point."
        />

        <div className="border-b border-line">
          <Demo
            tag="WebGL"
            title="Fluid cursor"
            aside={
              <div className="flex flex-wrap gap-2.5">
                <button
                  onClick={makeAMess}
                  disabled={coarse || !effects}
                  className="btn btn-plain disabled:opacity-40"
                >
                  Make a mess
                </button>
                <button
                  onClick={() => setEffects((v) => !v)}
                  disabled={coarse}
                  className="btn btn-ink disabled:opacity-40"
                >
                  {coarse ? "Desktop only" : effects ? "Turn it off" : "Turn it on"}
                </button>
              </div>
            }
          >
            <p className="lede mt-3 text-[15px]">
              A Navier–Stokes simulation running underneath the whole page. Your cursor pushes dye
              through a velocity field, and it reads its colours straight out of the site&apos;s own
              CSS variables — so the fluid always wears whatever the current section is wearing.
              It&apos;s turned up loudest right here.
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
              St. John&apos;s: the easternmost city in North America, and half an hour out of sync
              with the entire continent.
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
              Every section owns an accent, and the ground behind the page drifts toward it as you
              scroll. Override it by hand and the whole site follows — including the dye in the
              fluid.
            </p>
          </Demo>
        </div>
      </div>
    </section>
  );
}
