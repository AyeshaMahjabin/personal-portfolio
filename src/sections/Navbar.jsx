import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useScene } from "../scene/store";
import { links } from "../data/site";

const NAV = [
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Toolkit" },
  { id: "playground", label: "Playground" },
  { id: "about", label: "About" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [lifted, setLifted] = useState(false);
  const { reduced } = useScene();

  useEffect(() => {
    const ids = ["home", ...NAV.map((n) => n.id), "contact"];
    const io = new IntersectionObserver(
      (entries) => {
        const seen = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (seen) setActive(seen.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.6] }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    const onScroll = () => setLifted(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const go = (id) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <header className="fixed inset-x-0 top-0 z-[60] pt-4">
      <div className="shell">
        <motion.nav
          animate={{
            backgroundColor: lifted ? "rgba(10,6,17,0.72)" : "rgba(10,6,17,0)",
            borderColor: lifted ? "var(--line)" : "rgba(0,0,0,0)",
            boxShadow: lifted ? "0 20px 44px -34px rgba(0,0,0,1)" : "none",
          }}
          transition={{ duration: 0.3 }}
          className="flex items-center justify-between gap-3 rounded-xl border px-3 py-2 backdrop-blur-xl"
        >
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" })}
            className="flex items-center gap-2.5 pl-2 pr-1"
            aria-label="Back to top"
          >
            <motion.span
              className="grid h-2 w-2 place-items-center rounded-full"
              style={{
                background: "var(--mood-solid)",
                boxShadow: "0 0 12px 1px var(--mood-solid)",
              }}
              animate={reduced ? undefined : { opacity: [1, 0.35, 1] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            />
            <span className="display text-[17px] tracking-[-0.03em]">Ayesha</span>
          </button>

          <ul className="hidden items-center gap-0.5 lg:flex">
            {NAV.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => go(item.id)}
                  className="relative rounded-full px-3.5 py-2 text-[14px] font-semibold transition-colors"
                  style={{ color: active === item.id ? "var(--ink)" : "var(--ink-soft)" }}
                >
                  {active === item.id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full"
                      style={{ background: "var(--mood)" }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <button onClick={() => go("contact")} className="btn btn-ink !px-5 !py-2.5 !text-[14px]">
              Contact
            </button>

            <button
              onClick={() => setOpen((v) => !v)}
              className="grid h-10 w-10 place-items-center rounded-full lg:hidden"
              style={{ border: "1px solid var(--line)", background: "var(--card)" }}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              <span className="relative block h-3 w-4">
                <motion.span
                  animate={{ rotate: open ? 45 : 0, y: open ? 5 : 0 }}
                  className="absolute inset-x-0 top-0 h-[2px] rounded"
                  style={{ background: "var(--ink)" }}
                />
                <motion.span
                  animate={{ rotate: open ? -45 : 0, y: open ? -5 : 0 }}
                  className="absolute inset-x-0 bottom-0 h-[2px] rounded"
                  style={{ background: "var(--ink)" }}
                />
              </span>
            </button>
          </div>
        </motion.nav>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 340, damping: 26 }}
              className="toy mt-3 overflow-hidden p-2 lg:hidden"
            >
              {NAV.map((item) => (
                <button
                  key={item.id}
                  onClick={() => go(item.id)}
                  className="block w-full rounded-[18px] px-4 py-3 text-left text-[17px] font-semibold"
                  style={{ color: active === item.id ? "var(--ink)" : "var(--ink-soft)" }}
                >
                  {item.label}
                </button>
              ))}
              <a
                href={links.resume}
                target="_blank"
                rel="noreferrer"
                className="block w-full rounded-[18px] px-4 py-3 text-left text-[17px] font-semibold"
                style={{ color: "var(--violet)" }}
              >
                Résumé ↗
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
