"use client";
import { useRef, useEffect } from "react";
import { pillarsData } from "@/app/data/pillars";
import { useLanguage } from "@/app/context/LanguageContext";
import gsap from "@/app/lib/gsap";
import { Scale, Landmark, Sprout } from "lucide-react";
import SectionHeader from "../ui/SectionHeader"; // Path verify kar lena

export default function Pillars() {
  const { lang } = useLanguage();
  const data = pillarsData[lang as keyof typeof pillarsData];
  const containerRef = useRef(null);

  const icons = [
    <Scale key="legal" size={36} strokeWidth={1.2} />,
    <Landmark key="policy" size={36} strokeWidth={1.2} />,
    <Sprout key="impact" size={36} strokeWidth={1.2} />,
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // GSAP Animation logic for Cards Stagger (unchanged)
      gsap.from(".pillar-card", {
        y: 100,
        opacity: 0,
        stagger: 0.25,
        duration: 1.5,
        ease: "expo.out",
        scrollTrigger: {
          trigger: ".pillars-grid",
          start: "top 80%",
        },
      });
    }, containerRef);
    return () => ctx.revert();
  }, [lang]);

  if (!data) return null;

  return (
    // Ivory Background Foundation
    <section ref={containerRef} id="pillars" className="relative bg-[#FDFCF0] py-28 md:py-40 overflow-hidden">
      
      {/* 1. Fully Theme-Synced Header */}
      <div className="mb-24 md:mb-32">
        <SectionHeader 
          title={data.title} // E.g., "CORE AREAS" or "मुख्य क्षेत्र"
          subtitle={lang === 'en' ? 'Identity Structure' : 'विरासत का निर्माण'}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* 2. Three Cards Grid (Ivory/Glass Look) */}
        <div className="pillars-grid grid md:grid-cols-3 gap-8 lg:gap-12">
          {data.items.map((item, idx) => (
            <div
              key={idx}
              className="pillar-card group relative p-12 lg:p-14 bg-white/50 backdrop-blur-md border border-[#001F3F]/10 rounded-[2.5rem] hover:bg-white hover:shadow-[0_50px_120px_-30px_rgba(0,31,63,0.18)] hover:-translate-y-4 transition-all duration-700 flex flex-col items-start"
            >
              {/* Premium Icon with Color Flip */}
              <div className="mb-12 p-6 rounded-3xl bg-[#001F3F]/5 text-[#001F3F] group-hover:bg-[#001F3F] group-hover:text-[#FDFCF0] group-hover:rotate-[360deg] transition-all duration-1000 ease-in-out">
                {icons[idx]}
              </div>

              {/* Text: Navy Deep Color */}
              <h3 className="text-2xl md:text-3xl font-black text-[#001F3F] uppercase mb-5 tracking-tight leading-none">
                {item.title}
              </h3>
              <p className="text-[#001F3F]/70 text-base font-medium leading-relaxed max-w-sm">
                {item.desc}
              </p>

              {/* Decorative Large Index (Subtle Navy) */}
              <span className="absolute bottom-12 right-12 text-7xl font-black text-[#001F3F]/5 italic group-hover:text-[#001F3F]/10 transition-colors">
                0{idx + 1}
              </span>
              
              {/* Bottom Decorative Line (Hover Reveal) */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[3px] bg-[#001F3F] transition-all duration-700 group-hover:w-1/3" />
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        .stroke-navy {
          -webkit-text-stroke: 1.5px #001F3F;
        }
        @media (min-width: 1024px) {
          .stroke-navy {
            -webkit-text-stroke: 2.5px #001F3F;
          }
        }
      `}</style>
    </section>
  );
}