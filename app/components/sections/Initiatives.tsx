"use client";
import { useRef, useEffect } from "react";
import Image from "next/image";
import { initiativesData } from "@/app/data/initiatives";
import { useLanguage } from "@/app/context/LanguageContext";
import gsap from "@/app/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeader from "../ui/SectionHeader";
import vsImage from "@/public/vs1.png";
import { 
  Briefcase, HeartPulse, GraduationCap, Users, 
  Droplets, TreePine, Utensils, Shirt, PartyPopper, Lightbulb 
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const icons = [Briefcase, HeartPulse, Lightbulb, GraduationCap, Users, Droplets, TreePine, Utensils, Shirt, PartyPopper];

export default function Initiatives() {
  const { lang } = useLanguage();
  const data = initiativesData[lang as keyof typeof initiativesData];
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray(".init-content");
      
      items.forEach((item: any) => {
        gsap.to(item, {
          scrollTrigger: {
            trigger: item,
            start: "top 60%", // Jab center ke thoda upar ho
            end: "bottom 40%", // Jab center ke thoda niche ho
            onToggle: (self) => {
              if (self.isActive) {
                item.classList.add("is-highlighted");
              } else {
                item.classList.remove("is-highlighted");
              }
            },
            // Dynamic scaling and blur reduction on scroll
            scrub: 1
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [lang]);

  if (!data) return null;

  return (
    <section 
      ref={containerRef} 
      className="relative bg-black w-full overflow-hidden"
    >
      <div className="relative z-50 pt-16">
        <SectionHeader title={data.title} subtitle="Community Leadership" />
      </div>

      {/* Grid: 2 columns for Desktop, 1 for Mobile */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 relative">
        
        {/* LEFT: FIXED STICKY IMAGE */}
        <div className="hidden lg:block relative">
          <div className="sticky top-0 h-screen w-full flex items-center justify-center">
            <div className="relative w-full h-[80%] flex items-center justify-center">
              {/* Glow for PNG depth */}
              <div className="absolute w-64 h-64 bg-orange-600/20 blur-[120px] rounded-full" />
              <Image 
                src={vsImage} 
                alt="Vikalp Singh" 
                fill 
                className="object-contain grayscale hover:grayscale-0 transition-all duration-1000"
                priority
              />
            </div>
          </div>
        </div>

        {/* RIGHT: SCROLLING CONTENT */}
        <div className="w-full flex flex-col space-y-[35vh] py-[40vh] lg:pl-12">
          {data.items.map((item, index) => {
            const Icon = icons[index % icons.length];
            const [title, desc] = item.includes(" – ") ? item.split(" – ") : [item, ""];
            
            return (
              <div 
                key={index} 
                className="init-content group flex flex-col items-center lg:items-start opacity-15 blur-[3px] scale-90 transition-all duration-700 ease-out"
              >
                {/* CSS Magic for Highlighted State */}
                <style jsx>{`
                  .init-content.is-highlighted {
                    opacity: 1 !important;
                    filter: blur(0px) !important;
                    scale: 1.1 !important; /* Bada hokar dikhega */
                  }
                  .init-content.is-highlighted h3 {
                    color: #EA580C !important; /* Orange Change */
                  }
                  .init-content.is-highlighted .icon-box {
                    background: #EA580C;
                    box-shadow: 0 0 40px rgba(234, 88, 12, 0.5);
                    border-color: #EA580C;
                  }
                  .init-content.is-highlighted .icon-box :global(svg) {
                    color: white;
                  }
                `}</style>

                {/* Header: Icon & Index */}
                <div className="flex items-center gap-5 mb-8">
                  <div className="icon-box w-14 h-14 rounded-2xl border border-white/10 flex items-center justify-center bg-white/5 transition-all duration-500">
                    <Icon className="w-6 h-6 text-white/40" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-mono text-orange-600 font-bold tracking-[0.3em]">INITIATIVE</span>
                    <span className="text-xl font-black text-white/20 italic">0{index + 1}</span>
                  </div>
                </div>

                {/* Content: Title & Desc */}
                <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase italic tracking-tighter leading-[0.9] transition-all duration-500 text-center lg:text-left">
                  {title}
                </h3>
                
                {desc && (
                  <p className="mt-6 max-w-md text-sm md:text-lg text-white/50 font-mono uppercase tracking-widest leading-relaxed text-center lg:text-left border-l-2 border-orange-600/30 pl-6">
                    {desc}
                  </p>
                )}

                {/* Responsive Mobile Image (Sirf mobile pe dikhegi inside scroll) */}
                <div className="lg:hidden mt-10 relative w-full aspect-square opacity-30">
                   <Image src={vsImage} alt="Vikalp Singh" fill className="object-contain grayscale" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Aesthetic Background Text */}
      <div className="absolute top-20 left-10 pointer-events-none opacity-[0.03] select-none z-0">
        <h2 className="text-[25vw] font-black italic uppercase leading-none">ACTION</h2>
      </div>
    </section>
  );
}