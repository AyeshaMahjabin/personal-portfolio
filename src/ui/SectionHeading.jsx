import Reveal from "./Reveal";

/** Section openers: a small solid pill, an enormous serif line, one sentence. */
export default function SectionHeading({ kicker, title, italic, note, align = "left" }) {
  return (
    <header className={`mb-14 md:mb-20 ${align === "center" ? "text-center" : ""}`}>
      <Reveal>
        <span className="kicker" style={{ background: "var(--mood-solid)", color: "var(--ink)" }}>
          {kicker}
        </span>
      </Reveal>

      <Reveal delay={0.06}>
        <h2 className="display mt-6 text-[clamp(2.4rem,6.4vw,4.6rem)]">
          {title}{" "}
          {italic && <span className="display-italic" style={{ color: "var(--mood-solid)" }}>{italic}</span>}
        </h2>
      </Reveal>

      {note && (
        <Reveal delay={0.12}>
          <p
            className={`lede mt-5 max-w-xl text-[17px] ${align === "center" ? "mx-auto" : ""}`}
          >
            {note}
          </p>
        </Reveal>
      )}
    </header>
  );
}
