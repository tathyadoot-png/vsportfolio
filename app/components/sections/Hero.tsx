"use client";
import { useRef, useEffect } from "react";
import Scene from "@/app/three/Scene";
import { heroData } from "@/app/data/hero";
import { useLanguage } from "@/app/context/LanguageContext";
import gsap from "@/app/lib/gsap";

export default function Hero() {
  const { lang } = useLanguage();
  const data = heroData[lang as keyof typeof heroData];
  const containerRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // INITIAL LANDING: Text comes FROM the camera (Scale 5 -> 1)
      tl.from(".hero-main-title", {
        scale: 8,
        filter: "blur(20px)",
        opacity: 0,
        duration: 2,
        ease: "power4.out",
      })
      .from(".hero-sub-items", {
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out"
      }, "-=1");

      // SCROLL ANIMATION: Zoom into the section
      gsap.to(contentRef.current, {
        scale: 2.5,
        opacity: 0,
        filter: "blur(15px)",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
          pin: true, // This locks the screen while zooming
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="hero" className="relative h-screen w-full bg-black overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Scene />
      </div>

      <div ref={contentRef} className="relative z-10 h-full flex flex-col justify-center items-center px-6">
        <p className="hero-sub-items text-orange-600 font-mono text-xs tracking-[0.8em] uppercase mb-8">
          {lang === "en" ? "Strategic Leadership" : "रणनीतिक नेतृत्व"}
        </p>
        
<h1 className="hero-main-title text-[12vw] font-bold text-white leading-[1.1] tracking-tighter text-center">
  {data.name}
</h1>

        <div className="hero-sub-items mt-10 text-center">
          <p className="text-white/40 text-sm md:text-lg tracking-[0.4em] uppercase font-light">
            {data.tagline}
          </p>
        </div>
      </div>
    </section>
  );
}