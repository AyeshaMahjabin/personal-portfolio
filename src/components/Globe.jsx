import createGlobe from "cobe";
import { useEffect, useRef } from "react";

/** A dark globe lit in the site palette, with one marker on it: St. John's. */
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
        dark: 1,
        diffuse: 2.2,
        mapSamples: 18000,
        mapBrightness: 5.2,
        /* landmass in cold violet, the marker in magenta, rim glow cyan —
           the same three neons the rest of the page uses */
        baseColor: [0.28, 0.16, 0.44],
        markerColor: [1, 0.18, 0.53],
        glowColor: [0.0, 0.55, 0.75],
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
