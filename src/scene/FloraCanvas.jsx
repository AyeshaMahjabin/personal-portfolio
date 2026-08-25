import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { getPointer } from "../lib/pointer";

/* The three neons, as linear-space colours the shaders can lerp between. */
const PALETTE = [
  new THREE.Color("#ff2e88"),
  new THREE.Color("#00d9ff"),
  new THREE.Color("#b14bff"),
];

/* ------------------------------------------------------------------ */
/* Spores: one draw call for the whole drifting field.                  */

const SPORE_COUNT = 460;

const sporeVert = /* glsl */ `
  uniform float uTime;
  uniform float uScroll;
  uniform float uPixelRatio;
  attribute float aSize;
  attribute float aPhase;
  attribute float aSpeed;
  attribute vec3 aColor;
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vColor = aColor;
    vec3 p = position;

    /* drift upward forever, wrapping through the volume */
    p.y = mod(p.y + uTime * aSpeed + uScroll * 0.9, 26.0) - 13.0;
    /* a lazy sway, out of phase per spore so the field never pulses together */
    p.x += sin(uTime * 0.22 + aPhase) * 0.55;
    p.z += cos(uTime * 0.17 + aPhase * 1.7) * 0.4;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = aSize * uPixelRatio * (14.0 / -mv.z);

    /* fade at the top and bottom of the volume, and with distance */
    float edge = 1.0 - smoothstep(7.0, 13.0, abs(p.y));
    vAlpha = edge * smoothstep(-26.0, -6.0, mv.z);
  }
`;

const sporeFrag = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    /* soft round falloff with a hot core — a mote, not a square */
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float glow = pow(1.0 - d * 2.0, 2.4);
    float core = pow(1.0 - d * 2.0, 9.0);
    gl_FragColor = vec4(vColor * (glow + core * 1.8), (glow * 0.55 + core) * vAlpha);
  }
`;

function Spores({ scrollRef }) {
  const mat = useRef(null);

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(SPORE_COUNT * 3);
    const col = new Float32Array(SPORE_COUNT * 3);
    const size = new Float32Array(SPORE_COUNT);
    const phase = new Float32Array(SPORE_COUNT);
    const speed = new Float32Array(SPORE_COUNT);

    for (let i = 0; i < SPORE_COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 26;
      pos[i * 3 + 2] = -Math.random() * 18 - 2;

      const c = PALETTE[(Math.random() * PALETTE.length) | 0];
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;

      /* a few big bright ones carry the eye, the rest are dust */
      size[i] = Math.random() < 0.08 ? 9 + Math.random() * 7 : 1.6 + Math.random() * 3.4;
      phase[i] = Math.random() * Math.PI * 2;
      speed[i] = 0.16 + Math.random() * 0.42;
    }

    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("aColor", new THREE.BufferAttribute(col, 3));
    g.setAttribute("aSize", new THREE.BufferAttribute(size, 1));
    g.setAttribute("aPhase", new THREE.BufferAttribute(phase, 1));
    g.setAttribute("aSpeed", new THREE.BufferAttribute(speed, 1));
    return g;
  }, []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uPixelRatio: { value: Math.min(window.devicePixelRatio || 1, 2) },
    }),
    []
  );

  useFrame((_, dt) => {
    if (!mat.current) return;
    uniforms.uTime.value += Math.min(dt, 0.05);
    uniforms.uScroll.value = scrollRef.current;
  });

  return (
    <points geometry={geometry} frustumCulled={false}>
      <shaderMaterial
        ref={mat}
        uniforms={uniforms}
        vertexShader={sporeVert}
        fragmentShader={sporeFrag}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ------------------------------------------------------------------ */
/* Vines: tendrils that hang in from the edges, with buds that breathe. */

function makeVine(seed, side) {
  const pts = [];
  const n = 7;
  const x0 = side * (11.5 + seed * 2.2);
  for (let i = 0; i < n; i++) {
    const t = i / (n - 1);
    pts.push(
      new THREE.Vector3(
        x0 + Math.sin(t * 4.4 + seed * 3) * (1.1 + seed * 0.6) - side * t * 1.1,
        7.5 - t * 16,
        -9 - seed * 2.4 + Math.cos(t * 3 + seed) * 1.6
      )
    );
  }
  return new THREE.CatmullRomCurve3(pts, false, "catmullrom", 0.6);
}

function Vine({ seed, side, color }) {
  const buds = useRef(null);
  const curve = useMemo(() => makeVine(seed, side), [seed, side]);
  const geo = useMemo(() => new THREE.TubeGeometry(curve, 90, 0.022, 6, false), [curve]);

  /* buds sit along the curve at uneven intervals so it reads as growth */
  const spots = useMemo(() => {
    const out = [];
    for (let i = 0; i < 9; i++) {
      const t = 0.12 + (i / 9) * 0.85 + (Math.sin(i * 12.9 + seed) * 0.02);
      out.push({ p: curve.getPointAt(Math.min(t, 1)), s: 0.05 + Math.random() * 0.09 });
    }
    return out;
  }, [curve, seed]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    if (!buds.current) return;
    const t = state.clock.elapsedTime;
    spots.forEach((sp, i) => {
      /* each bud breathes on its own clock */
      const pulse = 0.75 + Math.sin(t * 1.1 + i * 1.7 + seed * 2) * 0.35;
      dummy.position.copy(sp.p);
      dummy.scale.setScalar(sp.s * pulse);
      dummy.updateMatrix();
      buds.current.setMatrixAt(i, dummy.matrix);
    });
    buds.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <group>
      <mesh geometry={geo}>
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.2}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <instancedMesh ref={buds} args={[null, null, spots.length]} frustumCulled={false}>
        <sphereGeometry args={[1, 10, 10]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.7}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </instancedMesh>
    </group>
  );
}

/* ------------------------------------------------------------------ */

function Scene({ scrollRef }) {
  const group = useRef(null);

  useFrame((state, dt) => {
    if (!group.current) return;
    /* the whole growth leans toward the cursor, and drifts with scroll */
    const p = getPointer();
    const k = Math.min(1, dt * 1.6);
    group.current.rotation.y += (p.nx * 0.09 - group.current.rotation.y) * k;
    group.current.rotation.x += (p.ny * 0.05 - group.current.rotation.x) * k;
    group.current.position.y += (scrollRef.current * 0.35 - group.current.position.y) * k;
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <group ref={group}>
      <Spores scrollRef={scrollRef} />
      <Vine seed={0.2} side={-1} color="#b14bff" />
      <Vine seed={1.1} side={1} color="#00d9ff" />
      <Vine seed={2.0} side={-1} color="#ff2e88" />
      <Vine seed={0.7} side={1} color="#b14bff" />
    </group>
  );
}

/**
 * A bioluminescent layer behind the whole page: a drifting spore field and a
 * few vines hanging in from the edges with buds that breathe.
 *
 * Everything is additive and depth-write-off, so it only ever *adds* light to
 * the dark ground and can never occlude type. One draw call for 620 spores via
 * a single shader; the buds are instanced. Scroll is read from a ref rather
 * than state so the scene never triggers a React render.
 */
export default function FloraCanvas() {
  const scrollRef = useRef(0);

  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{ position: [0, 0, 12], fov: 55 }}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      style={{ width: "100%", height: "100%" }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
        const onScroll = () => {
          const max = document.documentElement.scrollHeight - innerHeight;
          scrollRef.current = max > 0 ? (scrollY / max) * 6 : 0;
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
      }}
    >
      <Scene scrollRef={scrollRef} />
    </Canvas>
  );
}
