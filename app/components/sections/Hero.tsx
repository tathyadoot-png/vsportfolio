"use client";
import { useRef, useEffect } from "react";
import gsap from "@/app/lib/gsap";
import { heroData } from "@/app/data/hero";
import { useLanguage } from "@/app/context/LanguageContext";

export default function Hero() {
  const { lang } = useLanguage();
  const data = heroData[lang as keyof typeof heroData];
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Cinematic Reveal
      tl.from(".hero-title-main", {
        scale: 1.2,
        opacity: 0,
        filter: "blur(20px)",
        duration: 1.8,
        ease: "expo.out",
      })
      .from(".hero-nav-detail", {
        y: -20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out"
      }, "-=1")
      .from(".hero-footer-detail", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.5");

    }, containerRef);
    return () => ctx.revert();
  }, [lang]);

  if (!data) return null;

  return (
    <section ref={containerRef} className="relative min-h-screen w-full bg-[#FDFCF0] overflow-hidden flex flex-col justify-between p-6 md:p-12 lg:p-16">
      
      {/* 1. TOP NAVIGATION DETAIL */}
      <div className="hero-nav-detail relative z-20 flex justify-between items-start w-full">
        <div className="flex flex-col gap-1 max-w-[60%]">
          <span className="text-[#001F3F] font-black text-[10px] md:text-xs tracking-[0.2em] md:tracking-[0.3em] uppercase leading-tight">
            {data.headline}
          </span>
          <div className="w-8 md:w-12 h-[2px] bg-[#001F3F]" />
        </div>
        <div className="text-right">
          <span className="text-[#001F3F]/40 font-bold text-[8px] md:text-[10px] uppercase leading-none">
            Est. 2026 <br /> Portfolio
          </span>
        </div>
      </div>

      {/* 2. CENTER CONTENT */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center py-10 md:py-0">
        <div className="hero-title-main w-full">
          <h1 className="text-[18vw] md:text-[15vw] lg:text-[12vw] font-black text-[#001F3F] leading-[0.8] uppercase tracking-tighter">
            {data.name.split(' ')[0]} <br />
            <span className="text-transparent stroke-navy">{data.name.split(' ')[1]}</span>
          </h1>
          <p className="mt-6 md:mt-10 text-[#001F3F]/70 text-sm md:text-xl lg:text-2xl font-medium max-w-[90%] md:max-w-2xl mx-auto tracking-tight leading-relaxed">
            {data.subheading}
          </p>
        </div>
      </div>

      {/* 3. FOOTER SECTION */}
      <div className="hero-footer-detail relative z-20 flex flex-col md:flex-row justify-between items-center md:items-end w-full gap-8 md:gap-4">
        <div className="max-w-xs text-center md:text-left">
          <p className="text-[#001F3F] text-[10px] md:text-xs font-bold leading-relaxed uppercase opacity-60 tracking-wide">
            {lang === "en" 
              ? "Advocacy. Policy. Strategic Leadership." 
              : "वकालत। नीति। रणनीतिक नेतृत्व।"}
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <button className="w-full sm:w-auto px-10 md:px-12 py-4 bg-[#001F3F] text-[#FDFCF0] font-black uppercase text-[10px] tracking-widest hover:scale-105 active:scale-95 transition-all">
            {data.ctaPrimary}
          </button>
          <button className="w-full sm:w-auto px-10 md:px-12 py-4 border-2 border-[#001F3F] text-[#001F3F] font-black uppercase text-[10px] tracking-widest hover:bg-[#001F3F] hover:text-[#FDFCF0] active:scale-95 transition-all">
            {data.ctaSecondary}
          </button>
        </div>
      </div>

      {/* 4. DESIGN LAYERS */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-30 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      <div className="absolute top-[-10%] right-[-10%] w-[50%] md:w-[60%] h-[40%] md:h-[60%] bg-[#001F3F]/5 blur-[80px] md:blur-[120px] rounded-full" />
      <div className="absolute bottom-[-5%] left-[-5%] w-[30%] md:w-[40%] h-[30%] md:h-[40%] bg-[#001F3F]/5 blur-[60px] md:blur-[100px] rounded-full" />

      <style jsx>{`
        .stroke-navy {
          -webkit-text-stroke: 1.5px #001F3F;
        }
        @media (min-width: 768px) {
          .stroke-navy {
            -webkit-text-stroke: 3px #001F3F;
          }
        }
      `}</style>
    </section>
  );
}