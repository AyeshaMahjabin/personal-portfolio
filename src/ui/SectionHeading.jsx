import Reveal from "./Reveal";
import ScrambleText from "./ScrambleText";

/**
 * Section openers, rebuilt around asymmetry instead of a centred stack.
 *
 * The label runs vertically down a lit rail on the left edge, the numeral sits
 * enormous and outlined behind the type, and the headline carries two weights
 * at once — solid for the claim, outlined for the part that should recede.
 * Every section previously opened with the same small-label-then-headline
 * column, which is what made them read as one long template.
 */
export default function SectionHeading({
  index,
  kicker,
  title,
  italic,
  note,
  align = "left",
}) {
  return (
    <header className="relative mb-16 md:mb-24">
      <div className="grid grid-cols-[1.75rem_1fr] gap-x-5 md:grid-cols-[3.5rem_1fr] md:gap-x-10">
        {/* the rail: a lit hairline and the label turned on its side */}
        <div className="relative flex justify-start">
          <div
            aria-hidden="true"
            className="absolute inset-y-0 left-0 w-px"
            style={{
              background:
                "linear-gradient(to bottom, var(--mood-solid), transparent 85%)",
              boxShadow: "0 0 12px -2px var(--mood-solid)",
            }}
          />
          <Reveal>
            <span
              className="rail-label relative pl-4 pt-1 md:pl-5"
              style={{ color: "var(--mood-solid)" }}
            >
              {kicker}
            </span>
          </Reveal>
        </div>

        <div className="relative min-w-0">
          {index && (
            <span
              aria-hidden="true"
              className="display pointer-events-none absolute select-none"
              style={{
                top: "-0.28em",
                right: "-0.02em",
                fontSize: "clamp(8rem, 21vw, 19rem)",
                color: "transparent",
                WebkitTextStroke: "1px var(--line)",
                lineHeight: 0.8,
              }}
            >
              {index}
            </span>
          )}

          <Reveal delay={0.06}>
            <h2
              className={`display relative text-[clamp(2.6rem,7.6vw,5.6rem)] ${
                align === "center" ? "text-center" : ""
              }`}
            >
              {title}
              {italic && (
                <>
                  {" "}
                  <span className="display-ghost">{italic}</span>
                </>
              )}
            </h2>
          </Reveal>

          {note && (
            <Reveal delay={0.12}>
              <div className="relative mt-7 flex max-w-2xl items-start gap-4">
                <span
                  aria-hidden="true"
                  className="mt-2.5 h-px w-10 shrink-0"
                  style={{ background: "var(--mood-solid)" }}
                />
                <p className="lede text-[16px]">{note}</p>
              </div>
            </Reveal>
          )}

          <Reveal delay={0.16}>
            <ScrambleText
              text={`— ${kicker} //`}
              className="mt-6 block font-mono text-[10px] uppercase tracking-[0.3em] text-inkfaint"
            />
          </Reveal>
        </div>
      </div>
    </header>
  );
}
