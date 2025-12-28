import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';

function ModelFloare() {
  // Aici citim fișierul din folderul public
  const { scene } = useGLTF('/floare.glb');
  const meshRef = useRef();

  // Animația de rotație
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005; // Se învârte încet
      meshRef.current.rotation.x += 0.002; // Se învârte încet
    }
  });

  return <primitive object={scene} ref={meshRef} scale={0.2} />;
}

export default function Floare3D() {
  return (
    <div style={{
    position: "absolute",
    top: "20px",
    left: "20px",
    height: "150px",
    width: "150px%",
    zIndex: 10,
    pointerEvents: "none"
      }}>
      <Canvas camera={{ position: [0, 0, 3] }} gl ={{alpha: true}}>
        {/* Lumini */}
        <ambientLight intensity={1.5} />
        <pointLight position={[10, 10, 10]} />

        {/* Floarea */}
        <ModelFloare />

        {/* Control cu mouse-ul */}
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
}