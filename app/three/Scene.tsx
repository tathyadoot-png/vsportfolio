"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial, TorusKnot, Float } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function KineticKnot() {
  const meshRef = useRef<THREE.Mesh>(null!);
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = t * 0.2;
    meshRef.current.rotation.y = t * 0.3;
    meshRef.current.rotation.z = t * 0.1;
  });

  return (
    <Float speed={4} rotationIntensity={1.5} floatIntensity={1.8}>
      <TorusKnot ref={meshRef} args={[1.5, 0.4, 64, 16]}>
        <MeshTransmissionMaterial
          backside
          samples={16}
          thickness={1}
          chromaticAberration={0.1} // Premium color split effect
          anisotropy={0.3}
          distortion={0.5}
          distortionScale={0.5}
          temporalDistortion={0.1}
          color="#FFE0B2" // Very Light Saffron tint
          attenuationDistance={0.5}
          attenuationColor="#ff6e00" // Saffron core inside the glass
        />
      </TorusKnot>
    </Float>
  );
}

export default function Scene() {
  return (
    <div className="h-full w-full">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        {/* Cinematic Stage Lights */}
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={25} color="#ff6e00" />
        <pointLight position={[-5, -5, 5]} intensity={10} color="#ffaf00" />
        
        <KineticKnot />
      </Canvas>
    </div>
  );
}