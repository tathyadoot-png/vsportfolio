"use client";
import { useRef, useEffect } from "react";
import { educationData } from "@/app/data/education";
import { useLanguage } from "@/app/context/LanguageContext";
import gsap from "@/app/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeader from "../ui/SectionHeader";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Education() {
  const { lang } = useLanguage();
  const data = educationData[lang as keyof typeof educationData];
  const containerRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    if (!data) return;

    const ctx = gsap.context(() => {
      // 1. Line Path Animation
      gsap.from(".edu-line-path", {
        scaleY: 0,
        transformOrigin: "top center",
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top 70%",
          end: "bottom 80%",
          scrub: 1,
        }
      });

      // 2. Responsive 3D Cards
      const cards = gsap.utils.toArray(".edu-card-wrapper");
      cards.forEach((card: any, i) => {
        const isEven = i % 2 === 0;
        
        // Mobile par tilt thoda kam rakhenge taaki overflow na ho
        const isMobile = window.innerWidth < 768;
        
        gsap.fromTo(card, 
          { 
            opacity: 0,
            x: isMobile ? 50 : (isEven ? -100 : 100),
            rotateY: isMobile ? 20 : (isEven ? 35 : -35),
            scale: 0.8
          },
          {
            opacity: 1,
            x: 0,
            rotateY: 0,
            scale: 1,
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              end: "top 60%",
              scrub: 1,
            }
          }
        );

        // Individual Dot Glow
        gsap.to(`.edu-dot-${i}`, {
          boxShadow: "0 0 20px 5px rgba(234, 88, 12, 0.6)",
          repeat: -1,
          yoyo: true,
          duration: 1.5,
          delay: i * 0.2
        });
      });

    }, containerRef);
    return () => ctx.revert();
  }, [lang, data]);

  if (!data) return null;

  return (
    <section 
      ref={containerRef} 
      id="education" 
      className="relative min-h-screen bg-black py-20 px-4 md:px-0 overflow-hidden"
      style={{ perspective: "1200px" }}
    >
      <div className="w-full max-w-6xl mx-auto relative z-10">
        
        <div className="mb-16">
          <SectionHeader 
            title={data.title} 
            subtitle={lang === "en" ? "My Academic Roadmap" : "मेरा शैक्षणिक सफर"} 
          />
        </div>

        <div ref={triggerRef} className="relative">
          
          {/* Responsive Line: Mobile par left mein, Desktop par center mein */}
          <div className="edu-line-path absolute left-4 md:left-1/2 -translate-x-1/2 top-0 w-[2px] h-full bg-gradient-to-b from-orange-600 via-orange-500/10 to-transparent z-0" />

          <div className="relative space-y-12 md:space-y-24">
            {data.items.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={index} className="edu-card-wrapper relative w-full flex md:justify-center items-center">
                  
                  {/* Glowing Dot: Line ke sath sync rahega */}
                  <div className={`edu-dot-${index} absolute left-4 md:left-1/2 -translate-x-1/2 w-3 h-3 md:w-4 md:h-4 rounded-full bg-orange-600 z-20 border-2 md:border-4 border-black`} />

                  {/* Card Structure */}
                  <div className={`flex w-full items-center pl-10 md:pl-0 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    
                    {/* Content Area */}
                    <div className={`w-full md:w-[45%] ${isEven ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}`}>
                      
                      <div className="relative p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] bg-white/[0.03] border border-white/10 backdrop-blur-3xl group hover:border-orange-500/50 transition-all duration-500 overflow-hidden">
                        
                        {/* Mobile Index Indicator */}
                        <span className="absolute right-4 top-4 md:hidden text-2xl font-black text-white/5 italic">
                          0{index + 1}
                        </span>

                        {/* Desktop Index Indicator */}
                        <span className={`hidden md:block absolute ${isEven ? 'right-6' : 'left-6'} -top-8 text-6xl font-black text-white/[0.02] italic group-hover:text-orange-500/5 transition-colors`}>
                          0{index + 1}
                        </span>

                        <h3 className="text-xl md:text-2xl font-bold text-orange-500 mb-2 md:mb-3 group-hover:text-white transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-gray-400 text-xs md:text-base leading-relaxed font-light">
                          {item.desc}
                        </p>

                        {/* Interactive Hover Glow */}
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>

                    </div>

                    {/* Desktop Spacers */}
                    <div className="hidden md:block md:w-[10%]"></div>
                    <div className="hidden md:block md:w-[45%]"></div>
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