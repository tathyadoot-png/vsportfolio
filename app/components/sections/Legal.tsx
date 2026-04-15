"use client";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { legalData } from "@/app/data/legal";
import { useLanguage } from "@/app/context/LanguageContext";
import gsap from "@/app/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeader from "../ui/SectionHeader";
import withoutbg from "@/public/vs2-removebg-preview.png";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Legal() {
  const { lang } = useLanguage();
  const data = legalData[lang as keyof typeof legalData];
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !containerRef.current || !data) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".legal-card-stack");
      const isMobile = window.innerWidth < 768;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: isMobile ? `+=${cards.length * 80}%` : "+=250%",
          pin: true,
          scrub: 1,
          snap: 1 / (cards.length),
        }
      });

 if (isMobile) {
  tl.to(cards.slice(0, 3), {
    // -250 ya -300 se start karein taaki blank space khatam ho jaye
    y: (i) => -280 + (i * 140), 
    x: 0,
    opacity: 1,
    scale: 0.95,
    stagger: 0.2,
    duration: 1
  })
  .to(cards.slice(0, 3), {
    opacity: 0,
    y: -400, // Exit animation upar ki taraf
    duration: 0.5
  }, "+=0.5")
  .to(cards.slice(3, 6), {
    y: (i) => -280 + (i * 140), // Same starting point for second batch
    x: 0,
    opacity: 1,
    scale: 0.95,
    stagger: 0.2,
    duration: 1
  })
  // ... rest of the code
}else {
        

        
        tl.to(cards, {
          x: (i) => {
            const positions = [-380, 380, -420, 420, -380, 380];
            return positions[i % positions.length];
          },
          y: (i) => {
            const offsets = [-180, -180, 0, 0, 180, 180];
            return offsets[i % offsets.length];
          },
          rotation: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.1,
          ease: "power2.out"
        })
        .to(".hero-legal-img", {
          scale: 1.05,
          duration: 1
        }, 0);
      }

    }, sectionRef);

    return () => ctx.revert();
  }, [data]);

  if (!data) return null;

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-[#050505] overflow-hidden">
      <div className="w-full pt-10 md:pt-16 px-6 md:px-20 z-50 relative">
        <SectionHeader title={data.title} subtitle="Strategic Advocacy" />
      </div>

      <div ref={containerRef} className="relative w-full h-[85vh] flex flex-col items-center justify-center">
        
        {/* Background Text - Responsive size */}
        <h2 className="absolute text-[25vw] md:text-[18vw] font-black text-white/[0.01] uppercase italic select-none pointer-events-none tracking-tighter">
          JUSTICE
        </h2>

        {/* THE CARDS */}
        {data.items.map((item, index) => (
          <div
            key={index}
            className="legal-card-stack absolute w-[90%] max-w-[340px] md:max-w-[380px] p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] bg-[#0a0a0a]/95 border border-white/10 backdrop-blur-xl opacity-0 scale-50 shadow-2xl z-20 group"
          >
            <div className="flex items-center gap-4 mb-3 md:mb-4">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-orange-600/20 flex items-center justify-center border border-orange-600/30">
                <span className="text-orange-500 font-bold italic">§</span>
              </div>
              <span className="text-white/10 text-3xl md:text-4xl font-black">0{index + 1}</span>
            </div>
            <h3 className="text-base md:text-xl font-bold text-white leading-tight group-hover:text-orange-500 transition-colors">
              {item}
            </h3>
            <div className="mt-3 md:mt-4 h-[2px] w-0 bg-orange-600 group-hover:w-full transition-all duration-700" />
          </div>
        ))}

        {/* THE HERO IMAGE */}
        <div className="hero-legal-img absolute md:relative z-10 md:z-30 pointer-events-none w-[240px] md:w-[420px] bottom-0 md:bottom-auto">
          <Image 
            src={withoutbg} 
            alt="Advocate" 
            className="w-full h-auto object-contain drop-shadow-[0_0_80px_rgba(234,88,12,0.15)]"
            priority
          />
        </div>
      </div>
    </section>
  );
}