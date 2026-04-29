"use client";
import { useRef, useEffect } from "react";
import Image from "next/image";
import { aboutData } from "@/app/data/about";
import { useLanguage } from "@/app/context/LanguageContext";
import gsap from "@/app/lib/gsap";
import vs from "@/public/vs.png";

export default function About() {
  const { lang } = useLanguage();
  const data = aboutData[lang as keyof typeof aboutData];
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-reveal", {
        y: 50,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, [lang]);

  if (!data) return null;

  return (
    <section 
      ref={containerRef} 
      id="about" 
      className="relative bg-[#FDFCF0] py-16 md:py-24 lg:py-32 overflow-hidden"
    >
      {/* Background Watermark - Adjusted for better responsiveness */}
      <div className="absolute top-0 right-0 pointer-events-none opacity-[0.03] select-none translate-x-1/4">
        <h2 className="text-[30vw] font-black text-[#001F3F] leading-none uppercase italic">
          {data.name.split(' ')[0]}
        </h2>
      </div>

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          
          {/* LEFT: TEXT CONTENT */}
          <div className="w-full lg:w-[60%] space-y-8 md:space-y-12">
            <div className="about-reveal">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-[2px] w-12 bg-[#001F3F]" />
                <span className="text-[#001F3F] font-black text-[10px] md:text-xs uppercase tracking-[0.3em]">
                  {data.title}
                </span>
              </div>
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-[#001F3F] uppercase leading-[0.9] tracking-tighter">
                Legacy <br /> 
                <span className="text-transparent stroke-navy italic opacity-50">In Motion.</span>
              </h2>
            </div>

            <p className="about-reveal text-[#001F3F]/90 text-lg md:text-2xl font-medium leading-relaxed max-w-2xl border-l-4 border-[#001F3F] pl-6">
              {data.intro}
            </p>

            {/* Highlights - Responsive Grid */}
            <div className="about-reveal grid grid-cols-1 sm:grid-cols-2 gap-4">
              {data.highlights.map((item, idx) => (
                <div key={idx} className="p-4 bg-white/50 backdrop-blur-sm border border-[#001F3F]/10 rounded-xl shadow-sm">
                  <p className="text-[#001F3F] font-bold text-[10px] md:text-[11px] uppercase tracking-wide">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: VISUALS (Image + Vision) */}
          <div className="w-full lg:w-[40%] flex flex-col gap-6 md:gap-8">
            {/* Portrait Container */}
            <div className="about-reveal relative aspect-[4/5] w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <Image 
                src={vs} 
                alt={data.name} 
                fill 
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700" 
                sizes="(max-width: 1024px) 100vw, 40vw"
                priority 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#001F3F]/30 to-transparent" />
            </div>

            {/* Vision Card - Snug fit under image */}
            <div className="about-reveal bg-[#001F3F] p-8 md:p-10 rounded-3xl text-[#FDFCF0] shadow-xl relative overflow-hidden">
              <span className="text-[#C5A059] font-black text-[10px] uppercase tracking-[0.4em] block mb-4">
                {lang === 'en' ? 'Nation Building' : 'राष्ट्र निर्माण'}
              </span>
              <h3 className="text-lg md:text-xl font-bold leading-snug uppercase tracking-tight relative z-10">
                {data.vision}
              </h3>
              <span className="absolute -bottom-4 -right-2 text-8xl font-black text-white/5 select-none font-serif rotate-12">”</span>
            </div>
          </div>

        </div>
      </div>

      <style jsx global>{`
        .stroke-navy {
          -webkit-text-stroke: 1px #001F3F;
        }
        @media (min-width: 768px) {
          .stroke-navy {
            -webkit-text-stroke: 2px #001F3F;
          }
        }
      `}</style>
    </section>
  );
}