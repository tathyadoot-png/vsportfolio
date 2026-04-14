"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial, Float, Stars, Sparkles } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function AnimatedShape() {
  const meshRef = useRef<THREE.Mesh>(null!);
  
  useFrame((state) => {
    meshRef.current.rotation.x += 0.01;
    meshRef.current.rotation.y += 0.01;
  });

  return (
    <Float speed={5} rotationIntensity={2} floatIntensity={2}>
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[1.2, 0.4, 128, 32]} />
        <MeshTransmissionMaterial
          samples={16}
          thickness={1.5}
          chromaticAberration={0.1}
          anisotropy={0.3}
          distortion={0.3}
          color="#ffffff"
          attenuationColor="#ff4500" // Neon Orange
          attenuationDistance={0.1}
        />
      </mesh>
    </Float>
  );
}

export default function Scene() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#ff4500" />
        <Sparkles count={50} scale={10} size={2} speed={0.5} color="#ff4500" />
        <AnimatedShape />
      </Canvas>
    </div>
  );
}