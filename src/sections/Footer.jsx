import { profile } from "../data/site";

export default function Footer() {
  return (
    <footer className="pb-12">
      <div className="shell">
        <div
          className="flex flex-col items-center gap-3 pt-8 text-center sm:flex-row sm:justify-between sm:text-left"
          style={{ borderTop: "1.5px solid var(--lip)" }}
        >
          <p className="text-[14px] font-semibold" style={{ color: "var(--ink-soft)" }}>
            © {new Date().getFullYear()} {profile.name}
          </p>
          <p className="display-italic text-[16px]" style={{ color: "var(--ink-soft)" }}>
            built in St. John&apos;s, mostly at night
          </p>
        </div>
      </div>
    </footer>
  );
}
