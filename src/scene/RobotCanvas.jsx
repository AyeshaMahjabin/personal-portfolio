import { Suspense, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useAnimations, useGLTF } from "@react-three/drei";
import { getPointer } from "../lib/pointer";

const MODEL = "/3Dmodel/robot_playground.glb";

function Robot({ onReady, jumpRef }) {
  const group = useRef(null);
  const { scene, animations } = useGLTF(MODEL);
  const { actions } = useAnimations(animations, scene);
  const jump = useRef(0);
  const spin = useRef(0);

  useEffect(() => {
    const first = actions && actions[Object.keys(actions)[0]];
    if (first) first.reset().fadeIn(0.5).play();
    onReady?.();
    return () => first?.fadeOut(0.2);
  }, [actions, onReady]);

  /* The GLB is a complete holo playground — the deck the robot stands on plus
     the cube, pyramid, platonics, gears, helixes, tori and their scattered
     MASH copies orbiting it, all on the one animation clip. It ships as a
     whole scene and it reads as one; nothing here is culled. (`ground` is the
     deck's parent, not a floor — hiding it takes the halo with it.) */
  useEffect(() => {

    scene.traverse((o) => {
      if (!o.isMesh || !o.material) return;
      const mats = Array.isArray(o.material) ? o.material : [o.material];
      mats.forEach((m) => {
        if (!m) return;
        if (m.emissive && m.emissiveIntensity !== undefined) {
          m.emissiveIntensity = Math.max(m.emissiveIntensity, 0.35);
        }
        if ("roughness" in m) m.roughness = Math.min(m.roughness ?? 0.6, 0.55);
      });
    });
  }, [scene]);

  useFrame((state, dt) => {
    const g = group.current;
    if (!g) return;

    if (jumpRef.current) {
      jump.current = 1;
      spin.current += 0.9;
      jumpRef.current = 0;
    }
    jump.current *= 0.9;
    spin.current *= 0.93;

    const p = getPointer();
    const targetY = p.nx * 0.5 + spin.current;
    const targetX = p.ny * 0.18;
    const k = Math.min(1, dt * 3);
    g.rotation.y += (targetY - g.rotation.y) * k;
    g.rotation.x += (targetX - g.rotation.x) * k;

    const bob = Math.sin(state.clock.elapsedTime * 1.1) * 0.07;
    g.position.y = -1.55 + bob + jump.current * 0.55;
    const squash = 1 + jump.current * 0.06;
    g.scale.setScalar(2.35 / squash);
  });

  return <primitive ref={group} object={scene} dispose={null} scale={2.35} position={[0, -1.55, 0]} />;
}

useGLTF.preload(MODEL);

/* The canvas is drawn 35% larger than its layout box on every side. The
   animation throws a ring and a few props well outside the robot's own
   footprint, and at the old size they hit the edge of the drawing buffer and
   were sliced off — which read as a hard rectangle cutting through the scene.
   OVERDRAW is that margin; MODEL_SCALE cancels it out so the robot still
   occupies exactly the same pixels as before, just with air around it. */
const OVERDRAW = 0.35;
const MODEL_SCALE = 1 / (1 + OVERDRAW * 2);

/** Transparent canvas — the robot stands on the page, not inside a box. */
export default function RobotCanvas({ onReady, jumpRef, coarse }) {
  return (
    <Canvas
      dpr={[1, coarse ? 1.3 : 1.9]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{
        /* width/height are set explicitly rather than via `inset`: R3F's
           wrapper carries its own width:100%;height:100%, which wins over the
           right/bottom insets — so `inset` alone moved the box without
           resizing it. */
        position: "absolute",
        left: `${-OVERDRAW * 100}%`,
        top: `${-OVERDRAW * 100}%`,
        width: `${(1 + OVERDRAW * 2) * 100}%`,
        height: `${(1 + OVERDRAW * 2) * 100}%`,
        background: "transparent",
        /* the poke button underneath owns the clicks; without this the
           overflowing canvas would swallow them outside the button's box */
        pointerEvents: "none",
      }}
    >
      {/* Dark scene, hard neon rims. Ambient stays low so the model reads as
          lit *by the city* rather than by a studio. */}
      <ambientLight intensity={0.35} />
      <hemisphereLight intensity={0.4} color="#00d9ff" groundColor="#0a0611" />
      <directionalLight position={[3, 6, 4]} intensity={0.9} color="#f0e9f7" />
      <pointLight position={[-4, 1, 3]} intensity={45} color="#ff2e88" />
      <pointLight position={[4, -1, 2]} intensity={34} color="#00d9ff" />
      <pointLight position={[0, 3, -4]} intensity={26} color="#b14bff" />
      <Suspense fallback={null}>
        <group scale={MODEL_SCALE}>
          <Robot onReady={onReady} jumpRef={jumpRef} />
        </group>
      </Suspense>
    </Canvas>
  );
}
