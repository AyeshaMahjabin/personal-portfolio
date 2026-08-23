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

  /* The model ships with its own holo-platform underneath. On a page made of
     coloured paper the character reads better floating on its own circle, so
     the platform stays hidden and the robot keeps its original materials. */
  useEffect(() => {
    const stage = scene.getObjectByName("ground");
    if (stage) stage.visible = false;

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

/** Transparent canvas — the robot stands on the page, not inside a box. */
export default function RobotCanvas({ onReady, jumpRef, coarse }) {
  return (
    <Canvas
      dpr={[1, coarse ? 1.3 : 1.9]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ position: "absolute", inset: 0, background: "transparent" }}
    >
      <ambientLight intensity={1.15} />
      <hemisphereLight intensity={0.7} color="#ffffff" groundColor="#ffd9ec" />
      <directionalLight position={[3, 6, 4]} intensity={2.1} />
      <pointLight position={[-4, 1, 3]} intensity={26} color="#ff4fa3" />
      <pointLight position={[4, -1, 2]} intensity={20} color="#7c5cff" />
      <Suspense fallback={null}>
        <Robot onReady={onReady} jumpRef={jumpRef} />
      </Suspense>
    </Canvas>
  );
}
