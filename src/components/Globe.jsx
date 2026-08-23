import createGlobe from "cobe";
import { useEffect, useRef } from "react";

/** A small light-mode globe with exactly one marker on it: St. John's. */
export default function Globe({ className = "" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let phi = 4.15; // facing the north Atlantic
    let width = canvas.offsetWidth || 200;
    let globe = null;

    const start = () => {
      globe?.destroy();
      globe = createGlobe(canvas, {
        devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
        width: width * 2,
        height: width * 2,
        phi,
        theta: 0.36,
        dark: 0,
        diffuse: 1.25,
        mapSamples: 14000,
        mapBrightness: 5.6,
        baseColor: [0.96, 0.94, 1],
        markerColor: [1, 0.31, 0.64],
        glowColor: [0.87, 0.85, 1],
        markers: [{ location: [47.5615, -52.7126], size: 0.1 }],
        onRender: (state) => {
          phi += 0.0035;
          state.phi = phi;
          state.width = width * 2;
          state.height = width * 2;
        },
      });
      canvas.style.opacity = "1";
    };

    /* cobe sizes its buffer once, so re-create it whenever the card resizes */
    const ro = new ResizeObserver(([entry]) => {
      const next = Math.round(entry.contentRect.width);
      if (next > 0 && Math.abs(next - width) > 8) {
        width = next;
        start();
      }
    });

    width = canvas.offsetWidth || 200;
    start();
    ro.observe(canvas);

    return () => {
      ro.disconnect();
      globe?.destroy();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`aspect-square w-full opacity-0 transition-opacity duration-700 ${className}`}
    />
  );
}
