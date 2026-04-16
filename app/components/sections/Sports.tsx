"use client";
import { useRef, useEffect } from "react";
import { sportsData } from "@/app/data/sports";
import { useLanguage } from "@/app/context/LanguageContext";
import gsap from "@/app/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeader from "../ui/SectionHeader";
import { Trophy, Target, Activity, Rocket, Medal } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const icons = [Trophy, Target, Activity, Rocket, Medal];

export default function Sports() {
  const { lang } = useLanguage();
  const data = sportsData[lang as keyof typeof sportsData];
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !scrollRef.current) return;

    const ctx = gsap.context(() => {
      const el = scrollRef.current;
      if (!el) return;

      const totalWidth = el.scrollWidth;
      const windowWidth = window.innerWidth;

      // 1. Horizontal Scroll Trigger
      gsap.to(el, {
        x: () => -(totalWidth - windowWidth + 100),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${totalWidth}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // Smooth Skew based on Velocity
            const skew = self.getVelocity() / 300;
            gsap.to(".sports-card-inner", {
              skewX: skew,
              duration: 0.5,
              overwrite: true
            });
          }
        }
      });

      // 2. SVG Path Animation
      gsap.fromTo(".path-line", 
        { strokeDashoffset: 1000 },
        { 
          strokeDashoffset: 0,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top center",
            end: "bottom center",
            scrub: 2
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [lang]);

  if (!data) return null;

  return (
    <section 
    id="sports"
      ref={sectionRef} 
      className="relative min-h-screen bg-black overflow-hidden flex flex-col z-10"
    >
      {/* Background Animated Track - Fixed Viewbox */}
      <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none z-0" viewBox="0 0 1440 800">
        <path 
          className="path-line"
          d="M-100,400 C200,100 600,700 900,400 C1200,100 1600,400 1600,400" 
          stroke="#EA580C" 
          strokeWidth="4" 
          fill="none" 
          strokeDasharray="1000"
        />
      </svg>

      {/* Header - Ensure it's on top */}
      <div className="pt-6 relative z-50">
        <SectionHeader 
          title={data.title} 
          subtitle="Athletic Prowess & Leadership" 
        />
      </div>

      {/* Cards Container - Main Data Visibility Fix */}
      <div className="flex-1 flex items-center relative z-20 overflow-visible h-full">
        <div 
          ref={scrollRef} 
          className="flex flex-nowrap gap-12 px-10 md:px-24 items-center w-fit h-fit min-h-[400px]"
        >
          {data.items.map((item, index) => {
            const Icon = icons[index % icons.length];
            return (
              <div 
                key={index}
                className="sports-card-inner relative w-[320px] md:w-[480px] h-[320px] md:h-[380px] flex-shrink-0 origin-bottom"
                style={{ transform: "skewX(-8deg)" }}
              >
                {/* Content Card */}
                <div className="absolute inset-0 bg-white/[0.03] border-l-4 border-orange-600 backdrop-blur-md p-8 md:p-12 flex flex-col justify-between group overflow-hidden shadow-2xl">
                  
                  {/* Floating Large Index */}
                  <span className="absolute -top-6 -right-6 text-[10rem] font-black text-white/[0.04] italic select-none">
                    0{index + 1}
                  </span>

                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-orange-600 flex items-center justify-center mb-8 shadow-xl shadow-orange-600/30">
                      <Icon className="text-white w-9 h-9" style={{ transform: "skewX(8deg)" }} />
                    </div>
                    
                    <h3 
                      className="text-2xl md:text-4xl font-black text-white uppercase italic leading-tight"
                      style={{ transform: "skewX(8deg)" }}
                    >
                      {item}
                    </h3>
                  </div>

                  <div className="flex items-center gap-4 relative z-10" style={{ transform: "skewX(8deg)" }}>
                     <div className="h-[2px] w-full bg-white/10 overflow-hidden">
                        <div className="h-full bg-orange-600 w-0 group-hover:w-full transition-all duration-700" />
                     </div>
                  </div>
                </div>
              </div>
            );
          })}
          {/* Spacer to ensure last card is fully visible */}
          <div className="w-[50vw] flex-shrink-0" />
        </div>
      </div>

      {/* Background Performance Text - Adjusted Opacity and Position */}
      <div className="absolute bottom-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] pointer-events-none select-none z-0">
        <span className="text-[25vw] font-black text-white uppercase italic">
          SPEED
        </span>
      </div>
    </section>
  );
}