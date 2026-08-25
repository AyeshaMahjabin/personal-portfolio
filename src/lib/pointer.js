/**
 * One global pointer listener, shared by everything that wants to know where
 * the cursor is (the 3D robot, the blob cursor). Subscribers are
 * flushed once per frame rather than once per mousemove.
 */

const state = { x: 0, y: 0, nx: 0, ny: 0, active: false, idleSince: Date.now() };
const subs = new Set();
let started = false;
let frame = 0;
let dirty = false;

function flush() {
  frame = 0;
  if (!dirty) return;
  dirty = false;
  for (const fn of subs) fn(state);
}

function onMove(e) {
  state.x = e.clientX;
  state.y = e.clientY;
  state.nx = (e.clientX / window.innerWidth) * 2 - 1;
  state.ny = (e.clientY / window.innerHeight) * 2 - 1;
  state.active = true;
  state.idleSince = Date.now();
  dirty = true;
  if (!frame) frame = requestAnimationFrame(flush);
}

function start() {
  if (started || typeof window === "undefined") return;
  started = true;
  state.x = window.innerWidth / 2;
  state.y = window.innerHeight / 2;
  window.addEventListener("pointermove", onMove, { passive: true });
  window.addEventListener("pointerdown", onMove, { passive: true });
}

export function subscribePointer(fn) {
  start();
  subs.add(fn);
  return () => subs.delete(fn);
}

export function getPointer() {
  start();
  return state;
}
