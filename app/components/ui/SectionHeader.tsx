"use client";
import { useEffect, useRef } from "react";
import gsap from "@/app/lib/gsap";

type Props = {
  title: string;
  subtitle?: string;
};

export default function SectionHeader({ title, subtitle }: Props) {
  const containerRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main Title Reveal
      gsap.from(".reveal-text", {
        y: "100%",
        duration: 1.2,
        ease: "expo.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 90%",
        }
      });

      // Decorative Line Scale
      gsap.from(lineRef.current, {
        scaleX: 0,
        transformOrigin: "right",
        duration: 1.5,
        ease: "power4.inOut",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        }
      });

      // Icon Rotation
      gsap.from(".header-icon", {
        rotate: -180,
        scale: 0,
        duration: 1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 90%",
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-[94%] lg:w-[90%] mx-auto py-12 flex flex-col items-start gap-4 overflow-hidden relative">
      
      {/* Background Decorative Text (Unique Layer) */}
      <div className="absolute -top-4 -left-2 opacity-[0.03] pointer-events-none select-none">
        <h2 className="text-[12vw] font-black uppercase text-white leading-none tracking-tighter">
          {title.split(' ')[0]}
        </h2>
      </div>

      <div className="flex items-center gap-6 z-10">
        {/* Dynamic Icon Styling */}
        <div className="header-icon w-16 h-16 relative flex items-center justify-center">
          <div className="absolute inset-0 border-2 border-orange-600 rotate-45 group-hover:rotate-90 transition-transform duration-700" />
          <div className="absolute inset-2 border border-white/20 -rotate-12" />
          <span className="text-orange-600 font-black text-2xl tracking-tighter italic">V</span>
        </div>

        <div className="flex flex-col">
          {/* Masked Title Reveal */}
          <div className="overflow-hidden">
            <h2 className="reveal-text text-5xl md:text-8xl font-black text-white uppercase italic leading-[0.9] tracking-tighter">
              {title}
            </h2>
          </div>
          
          {subtitle && (
            <div className="overflow-hidden mt-2">
              <p className="reveal-text text-xs md:text-sm text-orange-600 font-mono uppercase tracking-[0.5em] font-semibold">
                // {subtitle}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Unique Right-aligned Divider */}
      <div className="w-full flex justify-end items-center gap-4 mt-2">
        <span className="text-[10px] text-white/20 font-mono tracking-widest uppercase hidden md:block">
          Established 2018
        </span>
        <div ref={lineRef} className="h-[2px] w-32 md:w-96 bg-gradient-to-l from-orange-600 via-orange-600/50 to-transparent" />
      </div>
    </div>
  );
}