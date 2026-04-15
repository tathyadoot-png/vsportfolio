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
      wheelMultiplier: 1.5, // Thoda fast scroll feel ke liye
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
      // Full distance calculation
      const scrollDistance = totalWidth - viewportWidth;

      gsap.to(sectionRef.current, {
        x: -scrollDistance,
        ease: "none",
        scrollTrigger: {
          trigger: triggerRef.current,
          pin: true,
          scrub: 0.8, 
          start: "top top",
          // Scroll length control: Jitna chota number, utna fast horizontal movement
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
    <div ref={triggerRef} id='initiatives' className="bg-black w-full overflow-hidden">
      <section className="relative h-screen w-full flex flex-col justify-center">
        
        {/* Header - Full Width Padding */}
        <div className="relative z-30 mb-8 px-6 md:px-12 lg:px-6">
          <SectionHeader title={data.title} subtitle="Impact & Vision" />
        </div>

        {/* Fixed Center Background Image */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <div className="relative w-[60vh] h-[80vh] opacity-20 md:opacity-40 scale-110 lg:scale-125">
            <Image 
              src={vsImage} 
              alt="Vikalp Singh" 
              fill 
              className="object-contain grayscale contrast-125 brightness-95 pt-28"
              priority
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-orange-600/5 blur-[180px] rounded-full" />
          </div>
        </div>

        {/* Horizontal Scrolling Container - No Max Width */}
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
                  <div className="w-14 h-14 md:w-20 md:h-20 rounded-3xl border border-white/10 bg-white/5 flex items-center justify-center group-hover:bg-orange-600 group-hover:border-orange-600 transition-all duration-700">
                    <Icon className="w-6 h-6 md:w-10 md:h-10 text-white/40 group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-6xl md:text-8xl font-black text-white/[0.03] italic tracking-tighter">
                    0{index + 1}
                  </span>
                </div>

                <h3 className="text-4xl md:text-5xl lg:text-7xl font-black text-white uppercase italic tracking-tighter leading-[0.8] group-hover:text-orange-600 transition-all duration-500">
                  {title}
                </h3>

                {desc && (
                  <p className="mt-8 max-w-md text-white/30 font-mono text-xs md:text-sm uppercase tracking-[0.25em] leading-relaxed border-l-2 border-orange-600/20 pl-6">
                    {desc}
                  </p>
                )}
              </div>
            );
          })}
          
          {/* End Spacer for full exit */}
          <div className="min-w-[10vw] h-10" />
        </div>

        {/* Action Label Watermark */}
        
      </section>
    </div>
  );
}