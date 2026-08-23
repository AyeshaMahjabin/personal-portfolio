import { useEffect, useRef } from "react";
import { profile } from "../data/site";

/**
 * The colophon: a three-column readout instead of one centred line.
 *
 * The clock is real — St. John's local time, ticking. It is the detail that
 * makes the UTC−03:30 in the hero mean something, and it writes straight to
 * the node once a second rather than re-rendering the tree.
 */
function LocalClock() {
  const el = useRef(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-CA", {
      timeZone: "America/St_Johns",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const tick = () => {
      if (el.current) el.current.textContent = fmt.format(new Date());
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="tabular-nums" ref={el} style={{ color: "var(--mood-solid)" }}>
      --:--:--
    </span>
  );
}

export default function Footer() {
  return (
    /* pb clears the fixed status ticker pinned to the bottom edge */
    <footer className="pb-16">
      <div className="shell">
        <div className="grid gap-8 border-t border-line pt-10 sm:grid-cols-3">
          <div>
            <p className="display text-[19px]">{profile.short}</p>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-inkfaint">
              {profile.role}
            </p>
          </div>

          <div className="sm:text-center">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-inksoft">
              <LocalClock /> <span className="text-inkfaint">· UTC−03:30</span>
            </p>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-inkfaint">
              St. John&apos;s, NL
            </p>
          </div>

          <div className="sm:text-right">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-inkfaint">
              © {new Date().getFullYear()} {profile.name}
            </p>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-inkfaint">
              Built in St. John&apos;s, mostly at night
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
