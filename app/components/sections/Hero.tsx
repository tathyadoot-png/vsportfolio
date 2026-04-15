"use client";
import { useRef, useEffect, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Float, Environment, ContactShadows } from "@react-three/drei";
import gsap from "@/app/lib/gsap";
import { heroData } from "@/app/data/hero";
import { useLanguage } from "@/app/context/LanguageContext";
import * as THREE from "three";

function SceneController({ scrollProgress }: { scrollProgress: { value: number } }) {
  const { camera } = useThree();
  
  useFrame(() => {
    const p = scrollProgress.value;
    
    // INNOVATION: Double-Axis Circular Path
    // Camera ab ek "Arc" (Curve) mein ghumega character ke charon taraf
    const radius = 8;
    const angle = THREE.MathUtils.lerp(0, Math.PI / 2, p); // 0 to 90 degrees
    
    camera.position.x = Math.sin(angle) * radius;
    camera.position.z = Math.cos(angle) * radius + THREE.MathUtils.lerp(0, 10, p);
    camera.position.y = THREE.MathUtils.lerp(2, 4, p);
    
    camera.lookAt(0, 0, 0);
  });

  return null;
}

function HeroModel() {
  const { scene } = useGLTF("/models/model.glb"); 
  const modelRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (modelRef.current) {
      // Very smooth floating
      modelRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.1;
      
      // Auto-rotation stays subtle
      modelRef.current.rotation.y += 0.002;
    }
  });

  return (
    <primitive 
      ref={modelRef} 
      object={scene} 
      scale={1.8}   // 👈 Model ko chota kiya (2.5 se 1.8)
      position={[0, -1.2, 0]} 
    />
  );
}

export default function Hero() {
  const { lang } = useLanguage();
  const data = heroData[lang as keyof typeof heroData];
  const containerRef = useRef(null);
  const scrollValue = useRef({ value: 0 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Smooth Scroll Logic
      gsap.to(scrollValue.current, {
        value: 1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 2, // Smoothness badhane ke liye scrub value 2 rakhi hai
        }
      });

      // Text Entrance with Perspective Rotation
      gsap.from(".char", {
        opacity: 0,
        scale: 0.5,
        z: -500,
        rotationY: 90,
        stagger: 0.03,
        duration: 2.5,
        ease: "power4.out",
      });
      
      // Floating line animation
      gsap.from(".hero-line", {
        width: 0,
        duration: 1.5,
        delay: 1,
        ease: "expo.out"
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const nameArray = data.name.split("");

  return (
    <section ref={containerRef} className="relative h-[350vh] bg-[#020202]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        
        {/* 3D Core */}
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 2, 8], fov: 35 }}>
            <ambientLight intensity={0.4} />
            <spotLight position={[10, 15, 10]} angle={0.3} penumbra={1} intensity={2.5} color="#EA580C" />
            <pointLight position={[-10, -10, -10]} color="#ffffff" intensity={0.8} />
            <fog attach="fog" args={["#000000", 5, 25]} />

            <Suspense fallback={null}>
              <SceneController scrollProgress={scrollValue.current} />
              <HeroModel />
              <ContactShadows position={[0, -1.5, 0]} opacity={0.6} scale={15} blur={3} far={4} />
              <Environment preset="night" />
            </Suspense>
          </Canvas>
        </div>

        {/* Content Layer */}
        <div className="relative z-10 h-full flex flex-col justify-center items-center pointer-events-none px-6">
          <h1 className="flex overflow-hidden text-[13vw] font-black text-white italic  mix-blend-difference leading-none uppercase">
            {nameArray.map((char, i) => (
              <span key={i} className="char inline-block will-change-transform">
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h1>
          
          <div className="mt-8 flex items-center gap-6">
            <div className="hero-line h-[1px] w-20 bg-orange-600" />
            <p className="text-orange-600 font-mono  uppercase text-[9px] md:text-xs font-bold">
              {data.tagline}
            </p>
            <div className="hero-line h-[1px] w-20 bg-orange-600" />
          </div>
        </div>

        {/* Premium Vignette Overlay */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
        
        {/* Cinematic Borders */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black via-black/40 to-transparent opacity-90" />
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />
      </div>
    </section>
  );
}