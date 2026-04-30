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
  const imageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content Entrance
      gsap.from(".about-reveal", {
        y: 60,
        opacity: 0,
        stagger: 0.2,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        }
      });

      // Subtle Parallax for Image
      gsap.to(imageRef.current, {
        y: -50,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
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
      className="relative bg-[#FDFCF0] py-24 lg:py-40 overflow-hidden"
    >
      {/* 1. BLANK SPACE FIX: Noise & Grid Texture */}
      <div className="absolute inset-0 opacity-[0.4] pointer-events-none mix-blend-multiply" 
           style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/natural-paper.png")` }} />
      
      {/* 2. Mega Watermark positioned to fill empty areas */}
      <div className="absolute -bottom-10 left-10 pointer-events-none opacity-[0.04] select-none">
        <h2 className="text-[25vw] font-black text-[#001F3F] leading-none uppercase tracking-tighter">
          {lang === 'en' ? 'LEADER' : 'नेतृत्व'}
        </h2>
      </div>

      <div className="container mx-auto px-6 lg:px-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* LEFT: Portrait (4 cols) - Pushed to fill space */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative group">
              <div ref={imageRef} className="about-reveal relative aspect-[3/4] w-full rounded-[2.5rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,31,63,0.3)] border-[12px] border-white z-10">
                <Image 
                  src={vs} 
                  alt={data.name} 
                  fill 
                  className="object-cover transition-transform duration-1000 group-hover:scale-110" 
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  priority 
                />
                {/* Navy Overlay on image */}
                <div className="absolute inset-0 bg-[#001F3F]/10 group-hover:bg-transparent transition-colors duration-500" />
              </div>
              
              {/* Decorative Floating Element */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#001F3F] rounded-full hidden lg:flex items-center justify-center p-8 z-20 animate-spin-slow">
                 <p className="text-[#FDFCF0] text-[10px] font-bold text-center uppercase tracking-widest leading-tight">
                   Advocate • Thinker • Leader
                 </p>
              </div>
            </div>
          </div>

          {/* RIGHT: Text Content (7 cols) */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-10">
            <div className="about-reveal">
              <div className="flex items-center gap-4 mb-6">
                <span className="h-[2px] w-16 bg-[#001F3F]" />
                <span className="text-[#001F3F] font-black text-xs uppercase tracking-[0.4em]">
                  {data.title}
                </span>
              </div>
              
              <h2 className="text-6xl md:text-8xl lg:text-9xl font-black text-[#001F3F] uppercase leading-[0.8] tracking-tighter mb-8">
                Legacy <br /> 
                <span className="text-transparent stroke-navy italic">In Motion.</span>
              </h2>
              
              <p className="text-[#001F3F]/80 text-xl md:text-3xl font-light leading-relaxed max-w-3xl">
                {data.intro}
              </p>
            </div>

            {/* BLANK SPACE FIX: Wide Highlights Grid */}
            <div className="about-reveal grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
              {data.highlights.map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 p-6 bg-white border border-[#001F3F]/5 rounded-2xl hover:border-[#001F3F]/20 transition-all shadow-sm group">
                  <div className="text-[#001F3F]/20 font-black text-2xl group-hover:text-[#001F3F] transition-colors">0{idx + 1}</div>
                  <p className="text-[#001F3F] font-bold text-sm uppercase tracking-wide pt-1">
                    {item}
                  </p>
                </div>
              ))}
            </div>

            {/* Vision Quote Section */}
            <div className="about-reveal mt-12 pl-8 border-l-4 border-[#001F3F]/10">
               <p className="text-[#001F3F] text-2xl md:text-3xl font-serif italic italic max-w-2xl">
                 "{data.vision}"
               </p>
               <div className="mt-4 flex items-center gap-2">
                 <div className="w-4 h-4 bg-[#001F3F] rounded-full" />
                 <span className="text-[#001F3F] font-bold uppercase text-xs tracking-widest">Our Vision</span>
               </div>
            </div>
          </div>

        </div>
      </div>

      <style jsx global>{`
        .stroke-navy {
          -webkit-text-stroke: 1.5px #001F3F;
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 15s linear infinite;
        }
        @media (min-width: 1024px) {
          .stroke-navy {
            -webkit-text-stroke: 3px #001F3F;
          }
        }
      `}</style>
    </section>
  );
}