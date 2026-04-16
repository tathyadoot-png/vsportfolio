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
    /* FIX: 'overflow-visible' kiya taaki icon rotate hote waqt na kate.
       FIX: 'pl-4' add kiya mobile ke liye taaki left se space rahe.
    */
    <div ref={containerRef} className="w-full lg:w-[90%] mx-auto py-12 flex flex-col items-start gap-4 overflow-visible relative px-4 md:px-0">
      
      {/* Background Decorative Text */}
      <div className="absolute -top-4 -left-2 opacity-[0.03] pointer-events-none select-none overflow-hidden">
        <h2 className="text-[12vw] font-black uppercase text-white leading-none ">
          {title.split(' ')[0]}
        </h2>
      </div>

      <div className="flex items-center gap-4 md:gap-6 z-10">
        {/* FIX: 'flex-shrink-0' add kiya taaki mobile pe icon chapta na ho */}
        <div className="header-icon w-14 h-14 md:w-16 md:h-16 relative flex items-center justify-center flex-shrink-0">
          <div className="absolute inset-0 border-2 border-orange-600 rotate-45" />
          <div className="absolute inset-2 border border-white/20 -rotate-12" />
          <span className="text-orange-600 font-black text-xl md:text-2xl  italic">V</span>
        </div>

        <div className="flex flex-col">
          <div className="overflow-hidden">
            <h2 className="reveal-text text-4xl py-4 pr-5 md:text-8xl font-black text-white uppercase italic leading-[0.9]  ">
              {title}
            </h2>
          </div>
          
          {subtitle && (
            <div className="overflow-hidden mt-2">
              <p className="reveal-text text-[10px] md:text-sm text-orange-600 font-mono uppercase  font-semibold">
                // {subtitle}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="w-full flex justify-end items-center gap-4 mt-2">
        <span className="text-[10px] text-white/20 font-mono uppercase hidden md:block">
          Established 2018
        </span>
        <div ref={lineRef} className="h-[2px] w-32 md:w-96 bg-gradient-to-l from-orange-600 via-orange-600/50 to-transparent" />
      </div>
    </div>
  );
}