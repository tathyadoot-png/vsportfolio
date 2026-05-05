"use client";
import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import gsap from "@/app/lib/gsap";
import { useLanguage } from "@/app/context/LanguageContext";
import { heroData } from "@/app/data/hero";

export default function Hero() {
  const containerRef = useRef(null);
  const { lang } = useLanguage();
  // Safe data access
  const data = heroData[lang as keyof typeof heroData] || heroData.en;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-content > *", {
        y: 30,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: "power4.out",
      });

      gsap.to(".hero-dot", {
        y: 20,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }, containerRef);
    return () => ctx.revert();
  }, [lang]);

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-screen flex items-center justify-center bg-[#FDFCF0] md:pt-36 pt-24 pb-12 overflow-hidden"
    >
      <div className="hero-dot absolute top-[20%] right-[10%] w-32 h-32 bg-[#001F3F]/5 rounded-full blur-3xl lg:w-64 lg:h-64" />
      <div className="hero-dot absolute bottom-[15%] left-[5%] w-24 h-24 bg-[#001F3F]/5 rounded-full blur-2xl delay-700" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="hero-content flex flex-col items-center text-center max-w-4xl mx-auto space-y-8 lg:space-y-12">
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#001F3F]/10 bg-white shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#001F3F] animate-pulse" />
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#001F3F]">
              {data.headline}
            </p>
          </div>

          <div className="space-y-2">
            <h1 className="text-5xl md:text-8xl lg:text-[9rem] font-black text-[#001F3F] uppercase leading-[0.8] tracking-tighter">
              {data.name.split(' ')[0]}
            </h1>
            <h1 className="text-5xl md:text-8xl lg:text-[9rem] font-black text-[#001F3F] uppercase leading-[0.8] tracking-tighter outline-text italic">
              {data.name.split(' ')[1]}
            </h1>
          </div>

          <p className="text-base md:text-xl text-[#001F3F]/70 font-medium max-w-md md:max-w-2xl leading-relaxed italic">
            {data.subheading}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-4">
            <button className="group px-8 py-5 bg-[#001F3F] text-[#FDFCF0] rounded-2xl font-black uppercase text-sm tracking-widest flex items-center justify-center gap-3 hover:scale-[1.02] transition-transform shadow-xl">
              {data.ctaPrimary} <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-5 bg-white border border-[#001F3F]/10 text-[#001F3F] rounded-2xl font-black uppercase text-sm tracking-widest hover:bg-[#001F3F]/5 transition-colors shadow-sm">
              {data.ctaSecondary}
            </button>
          </div>

          <div className="hidden md:flex flex-col items-center gap-3 pt-12 opacity-30">
             <span className="text-[10px] font-black uppercase tracking-[0.5em] rotate-90 mb-8">
               {lang === 'hi' ? 'स्क्रॉल' : 'Scroll'}
             </span>
             <div className="w-[1px] h-12 bg-[#001F3F]" />
          </div>

        </div>
      </div>

      <style jsx>{`
        .outline-text {
          -webkit-text-stroke: 1.5px #001F3F;
          color: transparent;
        }
        @media (min-width: 1024px) {
          .outline-text {
            -webkit-text-stroke: 2px #001F3F;
          }
        }
      `}</style>
    </section>
  );
}