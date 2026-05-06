"use client";
import { useRef, useEffect } from "react";
import Image from "next/image";
import { initiativesData } from "@/app/data/initiatives";
import { useLanguage } from "@/app/context/LanguageContext";
import gsap from "@/app/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeader from "../ui/SectionHeader";
import vsImage from "@/public/vs1.png";
import Lenis from "@studio-freight/lenis";
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
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      wheelMultiplier: 1.5,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const ctx = gsap.context(() => {
      if (!sectionRef.current) return;

      const totalWidth = sectionRef.current.scrollWidth;
      const viewportWidth = window.innerWidth;
      const scrollDistance = totalWidth - viewportWidth;

      gsap.to(sectionRef.current, {
        x: -scrollDistance,
        ease: "none",
        scrollTrigger: {
          trigger: triggerRef.current,
          pin: true,
          scrub: 0.8, 
          start: "top top",
          end: () => `+=${totalWidth * 0.6}`, 
          invalidateOnRefresh: true,
        },
      });
    }, triggerRef);

    return () => {
      ctx.revert();
      lenis.destroy();
    };
  }, [lang]);

  if (!data) return null;

  return (
    <div ref={triggerRef} id='initiatives' className="bg-[#FDFCF0] w-full overflow-hidden">
      <section className="relative h-screen w-full flex flex-col justify-center">
        
        {/* Header */}
        <div className="relative z-30 mb-8 px-6 md:px-12 lg:px-6">
          <SectionHeader title={data.title} subtitle="Impact & Vision" />
        </div>

        {/* Fixed Center Background Image - Adjusted opacity for light theme */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <div className="relative w-[60vh] h-[80vh] opacity-10 md:opacity-60 scale-110 lg:scale-125">
            <Image 
              src={vsImage} 
              alt="Vikalp Singh" 
              fill 
              className="object-contain grayscale contrast-less: brightness-95 pt-32"
              priority
            />
            {/* Glow effect changed to light navy */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-[#001F3F]/5 blur-[180px] rounded-full" />
          </div>
        </div>

        {/* Horizontal Scrolling Container */}
        <div 
          ref={sectionRef} 
          className="flex gap-16 md:gap-32 lg:gap-48 items-center relative z-20 px-6 md:px-12 lg:px-20 will-change-transform"
        >
          {data.items.map((item, index) => {
            const Icon = icons[index % icons.length];
            const [title, desc] = item.includes(" – ") ? item.split(" – ") : [item, ""];
            
            return (
              <div 
                key={index} 
                className="min-w-[85vw] md:min-w-[45vw] lg:min-w-[35vw] flex flex-col group"
              >
                <div className="flex items-center gap-6 mb-4">
                  {/* Icon Box: Navy border/bg */}
                  <div className="w-14 h-14 md:w-20 md:h-20 rounded-3xl border border-[#001F3F]/10 bg-[#001F3F]/5 flex items-center justify-center group-hover:bg-[#001F3F] group-hover:border-[#001F3F] transition-all duration-700">
                    <Icon className="w-6 h-6 md:w-10 md:h-10 text-[#001F3F]/40 group-hover:text-white transition-colors" />
                  </div>
                  {/* Watermark Index: Light Navy */}
                  <span className="text-6xl md:text-8xl font-black text-[#001F3F]/[0.05] italic ">
                    0{index + 1}
                  </span>
                </div>

                {/* Title: Navy */}
                <h3 className="text-4xl md:text-5xl lg:text-7xl font-black text-[#001F3F] uppercase italic leading-[0.8] group-hover:opacity-70 transition-all duration-500">
                  {title}
                </h3>

                {/* Desc: Navy with Border */}
                {desc && (
                  <p className="mt-8 max-w-md text-[#001F3F]/50 font-mono text-xs md:text-sm uppercase leading-relaxed border-l-2 border-[#001F3F]/20 pl-6">
                    {desc}
                  </p>
                )}
              </div>
            );
          })}
          
          <div className="min-w-[10vw] h-10" />
        </div>
      </section>
    </div>
  );
}