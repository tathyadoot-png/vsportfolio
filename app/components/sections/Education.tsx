"use client";
import { useRef, useEffect } from "react";
import { educationData } from "@/app/data/education";
import { useLanguage } from "@/app/context/LanguageContext";
import gsap from "@/app/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Education() {
  const { lang } = useLanguage();
  const data = educationData[lang as keyof typeof educationData];
  const containerRef = useRef(null);
  const triggerRef = useRef(null);
  const beamRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Title Reveal
      gsap.from(".edu-title-reveal", {
        opacity: 0,
        y: 50,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        }
      });

      // 2. Timeline Pinning
      const timelineTl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top 15%",
          end: "bottom top",
          scrub: 1.5,
          pin: true,
          anticipatePin: 1,
        }
      });

      // Beam Animation
      timelineTl.from(beamRef.current, {
        scaleY: 0,
        transformOrigin: "top center",
        duration: 2,
        ease: "none",
      });

      // 3. Item Animation - "Pop & Flow"
      data.items.forEach((item, index) => {
        const isEven = index % 2 === 0;
        const selector = `.edu-item-${index}`;

        timelineTl.from(selector, {
          x: isEven ? -100 : 100,
          opacity: 0,
          scale: 0.5,
          filter: "blur(10px)",
          duration: 1.5,
          ease: "expo.out",
        }, `-=1`);

        timelineTl.from(`${selector} .edu-dot`, {
          scale: 0,
          duration: 0.4,
        }, `-=1.2`);
      });

    }, containerRef);
    return () => ctx.revert();
  }, [lang]);

  return (
    <section 
      ref={containerRef} 
      id="education" 
      className="relative min-h-screen bg-black flex flex-col items-center py-24 px-6 md:px-24 overflow-hidden"
    >
      
      {/* Background Decorative Text */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full opacity-[0.02] select-none pointer-events-none">
        <h2 className="text-[22vw] font-black text-white uppercase italic leading-none">
          {lang === "en" ? "Academy" : "अकादमी"}
        </h2>
      </div>

      <div className="w-full max-w-6xl mx-auto relative z-10">
        
        <div className="edu-title-reveal mb-20 text-center">
          <span className="text-orange-600 font-mono text-[10px] tracking-[0.6em] uppercase mb-3 block">Timeline</span>
          <h2 className="text-5xl md:text-7xl font-black text-white uppercase italic tracking-tighter">{data.title}</h2>
        </div>

        <div ref={triggerRef} className="relative min-h-[80vh]">
          
          {/* Vertical Beam */}
          <div 
            ref={beamRef}
            className="absolute left-1/2 -translate-x-1/2 top-0 w-[1px] h-full bg-gradient-to-b from-orange-600 via-orange-600/20 to-transparent"
          />

          <div className="relative space-y-16 md:space-y-0">
            {data.items.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <div 
                  key={index} 
                  className={`edu-item-${index} flex flex-col md:flex-row items-center md:items-start ${isEven ? 'md:justify-start' : 'md:justify-end'} relative w-full md:min-h-[200px]`}
                >
                  {/* Dot */}
                  <div className="edu-dot absolute left-1/2 -translate-x-1/2 top-0 md:top-4 w-4 h-4 rounded-full border-2 border-orange-600 bg-black z-20 shadow-[0_0_15px_rgba(234,88,12,0.5)]" />
                  
                  {/* Card Capsule */}
                  <div className={`relative w-full md:w-[44%] p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/10 backdrop-blur-md group hover:border-orange-500/50 transition-all duration-700 hover:bg-orange-600/[0.04] ${isEven ? 'md:mr-[6%] md:text-right' : 'md:ml-[6%]'}`}>
                    
                    <span className={`absolute ${isEven ? 'left-8' : 'right-8'} top-1/2 -translate-y-1/2 text-9xl font-black text-white/[0.02] group-hover:text-orange-500/5 transition-colors`}>
                      0{index + 1}
                    </span>

                    <div className="relative z-10">
                      <h3 className="text-orange-600 font-bold text-xl uppercase tracking-widest mb-4 group-hover:text-white transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-gray-400 text-sm md:text-base font-light leading-relaxed group-hover:text-white/90">
                        {item.desc}
                      </p>
                    </div>

                    <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-orange-600/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-1000" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}