import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, useAnimations } from "@react-three/drei";

function Model({ url }) {
  const { scene, animations } = useGLTF(url);
  const { actions } = useAnimations(animations, scene);

  React.useEffect(() => {
    if (actions && actions[Object.keys(actions)[0]]) {
      actions[Object.keys(actions)[0]].play();
    }
  }, [actions]);

  return (
    <primitive
      object={scene}
      dispose={null}
      scale={1.8}           // Increase scale for bigger model
      position={[0, -2.3, 0]} // Move model down (Y axis)
    />);
}

export default function PlanetModel() {
  return (
    <div style={{ width: "100%", height: "500px" }}>
      <Canvas>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 5, 2]} intensity={1} />
        <Suspense fallback={null}>
          <Model url="/3Dmodel/robot_playground.glb" />
        </Suspense>
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
}