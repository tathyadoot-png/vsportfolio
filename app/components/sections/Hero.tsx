"use client";
import { useRef, useEffect } from "react";
import Scene from "@/app/three/Scene";
import { heroData } from "@/app/data/hero";
import { useLanguage } from "@/app/context/LanguageContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const { lang } = useLanguage();
  const data = heroData[lang as keyof typeof heroData];
  const containerRef = useRef(null);
  const heroTextRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Lag-Free Scroll Animation
      gsap.to(heroTextRef.current, {
        y: -150,
        opacity: 0.1,
        scale: 0.8,
        filter: "blur(15px)",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom center",
          scrub: 2, // Smoothness badha di
          invalidateOnRefresh: true,
        }
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-[180vh] bg-black">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Layer 1: Background 3D */}
        <div className="absolute inset-0 z-0 opacity-80 pointer-events-none">
          <Scene />
        </div>

        {/* Layer 2: Ultra-Smooth Typography */}
        <div ref={heroTextRef} className="relative z-10 text-center will-change-transform">
          <h1 className="text-[15vw] font-black uppercase italic leading-[0.75] tracking-tighter text-white">
            {data.name.split(" ")[0]} <br />
            <span className="text-transparent" style={{ WebkitTextStroke: "2px #ff6e00" }}>
              {data.name.split(" ")[1]}
            </span>
          </h1>
          
          <div className="mt-8 overflow-hidden">
            <p className="text-[#ff6e00] font-mono text-[10px] tracking-[1em] uppercase opacity-60">
               Tactical Leadership
            </p>
          </div>
        </div>

        {/* Layer 3: Contrast Mask */}
        <div className="absolute inset-0 z-20 bg-gradient-to-b from-black/20 via-transparent to-black pointer-events-none" />
      </div>
    </section>
  );
}