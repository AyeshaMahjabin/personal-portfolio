/**
 * Where the fluid is allowed to be loud.
 *
 * The simulation runs under the whole page, but it shouldn't compete with
 * text everywhere. Sections declare a zone as they scroll into view, and the
 * sim reads it once per frame to scale how much dye a gesture leaves behind.
 *
 * Deliberately a module singleton rather than React state: the sim reads this
 * inside its rAF loop, and routing that through a context would re-render the
 * tree sixty times a second. Same reasoning as lib/pointer.js.
 */

export const ZONE = {
  /** text-dense reading — the sim keeps running but leaves nothing */
  OFF: "off",
  /** the default: present, but well under the type */
  CALM: "calm",
  /** hero, playground, contact — let it rip */
  LOUD: "loud",
};

const GAIN = {
  [ZONE.OFF]: 0,
  [ZONE.CALM]: 0.72,
  [ZONE.LOUD]: 1.15,
};

let zone = ZONE.CALM;
/* The sim stays mounted for the life of the page; this is what the Playground
   switch actually turns off. Unmounting it used to be the toggle, which meant
   any false value anywhere killed the canvas outright. */
let enabled = true;

export function setEnabled(next) {
  enabled = !!next;
}

export function isEnabled() {
  return enabled;
}

export function setZone(next) {
  if (next && next !== zone && next in GAIN) zone = next;
}

export function getZone() {
  return zone;
}

/** Dye multiplier for the current zone. Called per splat, so keep it cheap. */
export function zoneGain() {
  if (!enabled) return 0;
  return GAIN[zone] ?? GAIN[ZONE.CALM];
}

/* ------------------------------------------------------------------ */
/* Bangs: a burst of dye thrown from a point, fired by the page rather
   than by the cursor — a button press, a copied email, a poked robot. */

const bangs = new Set();

/** The sim registers here. Returns an unsubscribe, so it can go in `bound`. */
export function registerBang(fn) {
  bangs.add(fn);
  return () => bangs.delete(fn);
}

/** Fire a burst at viewport coordinates. No-op if the sim isn't mounted. */
export function bang(clientX, clientY) {
  for (const fn of bangs) fn(clientX, clientY);
}

/** Fire a burst at the centre of an element — the usual call site. */
export function bangFrom(el) {
  if (!el?.getBoundingClientRect) return;
  const r = el.getBoundingClientRect();
  bang(r.left + r.width / 2, r.top + r.height / 2);
}

/* ------------------------------------------------------------------ */
/* Status. The sim lives inside an error boundary that renders null on
   failure, which used to mean a dead simulation looked exactly like a
   working one. It reports in here instead, so the HUD can say so. */

let status = "idle";
let statusNote = "";
const statusSubs = new Set();

export function setStatus(next, note = "") {
  status = next;
  statusNote = note;
  for (const fn of statusSubs) fn(status, statusNote);
}

export function getStatus() {
  return { status, note: statusNote };
}

export function subscribeStatus(fn) {
  statusSubs.add(fn);
  fn(status, statusNote);
  return () => statusSubs.delete(fn);
}
