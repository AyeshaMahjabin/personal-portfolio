import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { copyText } from "../lib/clipboard";
import { useScene } from "../scene/store";
import { links, profile, projects } from "../data/site";

/**
 * ⌘K / Ctrl-K. Jump anywhere, open any case study, flip any switch.
 *
 * Scored substring matching rather than a fuzzy-search dependency: a match at
 * a word boundary outranks one in the middle of a word, which is enough to
 * make short queries land on the obvious thing. Fully keyboard driven, with
 * the list virtualised down to the filtered set and the active row scrolled
 * into view as you arrow through it.
 */
function score(needle, hay) {
  if (!needle) return 0;
  const h = hay.toLowerCase();
  const i = h.indexOf(needle);
  if (i === -1) return -1;
  /* prefix beats word-start beats anywhere */
  if (i === 0) return 3;
  return /\s/.test(h[i - 1]) ? 2 : 1;
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const listRef = useRef(null);
  const { effects, setEffects, setMood, toast } = useScene();

  const go = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const commands = useMemo(
    () => [
      { id: "home", group: "Go", label: "Top", hint: "hero", run: () => go("home") },
      { id: "work", group: "Go", label: "Work", hint: "01", run: () => go("work") },
      { id: "experience", group: "Go", label: "Experience", hint: "02", run: () => go("experience") },
      { id: "skills", group: "Go", label: "Toolkit", hint: "03", run: () => go("skills") },
      { id: "playground", group: "Go", label: "Playground", hint: "04", run: () => go("playground") },
      { id: "about", group: "Go", label: "About", hint: "05", run: () => go("about") },
      { id: "contact", group: "Go", label: "Contact", hint: "06", run: () => go("contact") },

      ...projects.map((p) => ({
        id: `case-${p.id}`,
        group: "Case studies",
        label: p.title,
        hint: p.kind,
        run: () => {
          go("work");
          window.dispatchEvent(new CustomEvent("case:open", { detail: p.id }));
        },
      })),

      {
        id: "fluid",
        group: "Switches",
        label: effects ? "Turn the fluid cursor off" : "Turn the fluid cursor on",
        hint: effects ? "on" : "off",
        run: () => setEffects((v) => !v),
      },
      ...[
        ["pink", "Magenta"],
        ["sky", "Cyan"],
        ["violet", "Violet"],
      ].map(([key, label]) => ({
        id: `mood-${key}`,
        group: "Switches",
        label: `Accent: ${label}`,
        hint: "theme",
        run: () => setMood(key),
      })),

      {
        id: "email",
        group: "Links",
        label: "Copy email",
        hint: profile.email,
        run: async () => {
          const ok = await copyText(profile.email);
          toast?.(
            ok
              ? { title: "Copied", body: profile.email, emoji: "✦" }
              : { title: profile.email, body: "Copy it from the contact section." }
          );
        },
      },
      { id: "resume", group: "Links", label: "Résumé", hint: "pdf", run: () => window.open(links.resume, "_blank") },
      { id: "github", group: "Links", label: "GitHub", hint: "↗", run: () => window.open(links.github, "_blank") },
      { id: "linkedin", group: "Links", label: "LinkedIn", hint: "↗", run: () => window.open(links.linkedin, "_blank") },
    ],
    [effects, setEffects, setMood, toast, go]
  );

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return commands;
    return commands
      .map((c) => ({ c, s: Math.max(score(needle, c.label), score(needle, c.group)) }))
      .filter((r) => r.s >= 0)
      .sort((a, b) => b.s - a.s)
      .map((r) => r.c);
  }, [q, commands]);

  /* open / close */
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) {
      setQ("");
      setActive(0);
    }
  }, [open]);

  useEffect(() => {
    setActive(0);
  }, [q]);

  /* keep the highlighted row on screen */
  useEffect(() => {
    listRef.current?.children[active]?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const onInputKey = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (i + 1) % Math.max(results.length, 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (i - 1 + results.length) % Math.max(results.length, 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const cmd = results[active];
      if (cmd) {
        setOpen(false);
        cmd.run();
      }
    }
  };

  let lastGroup = null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[95] flex items-start justify-center px-4 pt-[14vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.16 }}
        >
          <div
            className="absolute inset-0"
            style={{ background: "rgba(6,3,12,0.7)", backdropFilter: "blur(6px)" }}
            onClick={() => setOpen(false)}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            initial={{ opacity: 0, y: -12, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.99 }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
            className="relative w-full max-w-xl overflow-hidden rounded-xl border"
            style={{
              background: "rgba(16,10,26,0.96)",
              borderColor: "color-mix(in srgb, var(--mood-solid) 30%, transparent)",
              boxShadow:
                "0 40px 90px -40px rgba(0,0,0,1), 0 0 60px -30px var(--mood-solid)",
            }}
          >
            <div className="flex items-center gap-3 border-b border-line px-4 py-3.5">
              <span
                className="font-mono text-[13px]"
                style={{ color: "var(--mood-solid)" }}
              >
                &gt;
              </span>
              <input
                autoFocus
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={onInputKey}
                placeholder="Jump to, open, toggle…"
                className="w-full bg-transparent font-mono text-[14px] text-ink outline-none
                           placeholder:text-inkfaint"
              />
              <kbd className="rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-inkfaint">
                ESC
              </kbd>
            </div>

            <div ref={listRef} className="max-h-[46vh] overflow-y-auto py-2">
              {results.length === 0 && (
                <p className="px-4 py-6 text-center font-mono text-[12px] text-inkfaint">
                  nothing matches “{q}”
                </p>
              )}

              {results.map((c, i) => {
                const header = c.group !== lastGroup ? c.group : null;
                lastGroup = c.group;
                const on = i === active;
                return (
                  <div key={c.id}>
                    {header && (
                      <p className="px-4 pb-1 pt-3 font-mono text-[9.5px] uppercase tracking-[0.24em] text-inkfaint">
                        {header}
                      </p>
                    )}
                    <button
                      onMouseEnter={() => setActive(i)}
                      onClick={() => {
                        setOpen(false);
                        c.run();
                      }}
                      className="flex w-full items-center justify-between gap-4 px-4 py-2.5 text-left"
                      style={{
                        background: on ? "var(--mood)" : "transparent",
                        color: on ? "var(--ink)" : "var(--ink-soft)",
                        borderLeft: `2px solid ${on ? "var(--mood-solid)" : "transparent"}`,
                      }}
                    >
                      <span className="text-[14px]">{c.label}</span>
                      <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.14em] text-inkfaint">
                        {c.hint}
                      </span>
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center gap-4 border-t border-line px-4 py-2.5 font-mono text-[9.5px] uppercase tracking-[0.16em] text-inkfaint">
              <span>↑↓ navigate</span>
              <span>⏎ select</span>
              <span className="ml-auto">{results.length} results</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
