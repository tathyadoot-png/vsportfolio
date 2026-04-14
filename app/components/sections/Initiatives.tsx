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
      const items = gsap.utils.toArray(".init-card");

      items.forEach((item: any) => {
        ScrollTrigger.create({
          trigger: item,
          start: "top 50%", 
          end: "bottom 50%",
          onToggle: (self) => {
            if (self.isActive) {
              item.classList.add("is-active-center");
            } else {
              item.classList.remove("is-active-center");
            }
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [lang]);

  if (!data) return null;

  return (
    <section 
    id="initiatives"
      ref={containerRef} 
      className="relative bg-black w-full overflow-visible"
    >
      <div className="relative z-50 pt-20">
        <SectionHeader title={data.title} subtitle="Community Leadership" />
      </div>

      {/* Main Flex Wrapper - Explicitly no overflow here */}
      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-start relative">
        
        {/* LEFT SIDE: THE FIXED IMAGE BOX */}
        <div className="hidden lg:block w-1/2 sticky top-0 h-screen overflow-hidden">
          <div className="relative w-full h-full flex items-center justify-center p-12">
            {/* Glow effect */}
            <div className="absolute w-72 h-72 bg-orange-600/10 blur-[140px] rounded-full z-0" />
            
            <div className="relative w-full h-[90%] z-10">
              <Image 
                src={vsImage} 
                alt="Vikalp Singh" 
                fill 
                className="object-contain grayscale contrast-125 brightness-110"
                priority
              />
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: THE SCROLLING LIST */}
        <div className="w-full lg:w-1/2 flex flex-col py-[35vh]">
          {data.items.map((item, index) => {
            const Icon = icons[index % icons.length];
            const [title, desc] = item.includes(" – ") ? item.split(" – ") : [item, ""];
            
            return (
              <div 
                key={index} 
                className="init-card relative mb-[45vh] transition-all duration-700 opacity-15 blur-[4px] scale-90"
              >
                <style jsx>{`
                  .init-card.is-active-center {
                    opacity: 1 !important;
                    filter: blur(0px) !important;
                    scale: 1.15 !important; /* Proper Highlight Zoom */
                  }
                  .init-card.is-active-center .text-orange-glow {
                    color: #EA580C !important;
                    text-shadow: 0 0 20px rgba(234, 88, 12, 0.2);
                  }
                  .init-card.is-active-center .icon-box {
                    background: #EA580C;
                    box-shadow: 0 0 40px rgba(234, 88, 12, 0.6);
                    border-color: #EA580C;
                  }
                  .init-card.is-active-center .icon-box :global(svg) {
                    color: white;
                  }
                `}</style>

                {/* Counter & Icon */}
                <div className="flex items-center gap-6 mb-8">
                  <div className="icon-box w-14 h-14 rounded-2xl border border-white/10 flex items-center justify-center bg-white/5 transition-all duration-500">
                    <Icon className="w-6 h-6 text-white/30" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-mono text-orange-600 font-bold tracking-[0.4em]">INITIATIVE</span>
                    <span className="text-2xl font-black text-white/10 italic leading-none">0{index + 1}</span>
                  </div>
                </div>

                {/* Content Area */}
                <div className="text-content">
                  <h3 className="text-orange-glow text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase italic tracking-tighter leading-[0.9] transition-all duration-700">
                    {title}
                  </h3>
                  
                  {desc && (
                    <p className="mt-8 max-w-md text-sm md:text-lg text-white/40 font-mono uppercase tracking-widest leading-relaxed border-l-2 border-orange-600/20 pl-6 py-2">
                      {desc}
                    </p>
                  )}
                </div>

                {/* Mobile Fallback Image */}
                <div className="lg:hidden mt-12 relative w-full aspect-square opacity-20 pointer-events-none">
                  <Image src={vsImage} alt="Vikalp Singh" fill className="object-contain grayscale" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Decorative Background Branding */}
      <div className="absolute bottom-20 left-10 pointer-events-none opacity-[0.02] select-none">
        <h2 className="text-[25vw] font-black italic uppercase leading-none -ml-10">ACTION</h2>
      </div>
    </section>
  );
}