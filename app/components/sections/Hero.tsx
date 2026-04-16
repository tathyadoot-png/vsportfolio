"use client";
import { useRef, useEffect } from "react";
import Scene from "@/app/three/Scene";
import gsap from "@/app/lib/gsap";
import { heroData } from "@/app/data/hero";
import { useLanguage } from "@/app/context/LanguageContext";

export default function Hero() {
  const { lang } = useLanguage();
  const data = heroData[lang as keyof typeof heroData];
  const containerRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // INITIAL ENTRANCE
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

      // ✅ SCROLL ANIMATION: Gap fix karne ke liye 'end' ko chota kiya hai
      gsap.to(contentRef.current, {
        scale: 2.5,
        opacity: 0,
        filter: "blur(15px)",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          // Mobile par 60% scroll aur Desktop par 100% scroll pe khatam ho jayega
          end: window.innerWidth < 768 ? "+=60%" : "+=100%", 
          scrub: 1.5, // Scrub thoda kam kiya taaki response fast ho
          pin: true,
          pinSpacing: false, // Isse agla section niche se upar slide hota hua feel hoga
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, [lang]);

  if (!data) return null;

  return (
    <section ref={containerRef} id="hero" className="relative h-screen w-full bg-black overflow-hidden">
      
      <div className="absolute inset-0 z-0">
        <Scene />
      </div>

      <div ref={contentRef} className="relative z-10 h-full flex flex-col justify-center items-center px-6 pointer-events-none">
        
        <p className="hero-sub-items text-orange-600 font-mono text-xl uppercase mb-8">
          {lang === "en" ? "Strategic Leadership" : "रणनीतिक नेतृत्व"}
        </p>

        <h1 className="hero-main-title text-[12vw] font-bold text-white leading-[1.1] text-center uppercase italic">
          {data.name}
        </h1>

        <div className="hero-sub-items mt-10 text-center">
          <p className="text-white/40 text-sm md:text-lg uppercase font-light">
            {data.tagline}
          </p>
        </div>

        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black to-transparent opacity-90" />
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent opacity-90" />
      </div>

      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.5)_100%)]" />
    </section>
  );
}