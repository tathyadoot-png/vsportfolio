"use client";
import { useRef, useEffect } from "react";
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

  useEffect(() => {
    if (!sectionRef.current || !data) return;

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;

      if (!isMobile) {
        // --- DESKTOP: PREMIUM STACKING ---
        const cards = gsap.utils.toArray(".legal-card-stack");
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=250%",
            pin: true,
            scrub: 1,
          }
        });

        tl.to(cards, {
          x: (i) => [-380, 380, -420, 420, -380, 380][i % 6],
          y: (i) => [-180, -180, 0, 0, 180, 180][i % 6],
          opacity: 1,
          scale: 1,
          stagger: 0.1,
          ease: "power2.out"
        });
      } else {
        // --- MOBILE: SMOOTH SCROLL REVEAL (UP & DOWN) ---
        const mobileCards = gsap.utils.toArray(".legal-card-mobile");
        
        mobileCards.forEach((card: any) => {
          gsap.fromTo(card, 
            { 
              opacity: 0, 
              y: 60, 
              scale: 0.9,
              rotateX: -15 
            },
            {
              opacity: 1, 
              y: 0, 
              scale: 1,
              rotateX: 0,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 90%", // Jab card screen ke thoda upar aaye
                end: "top 60%",
                scrub: 1,
                toggleActions: "play reverse play reverse" // Up/Down dono side animation chalegi
              }
            }
          );
        });

        // Mobile background image movement
        gsap.to(".hero-legal-img-mobile", {
          y: -30,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [data]);

  if (!data) return null;

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-[#050505] py-20 md:py-0 overflow-hidden">
      <div className="w-full px-6 md:px-20 z-50 relative mb-12">
        <SectionHeader title={data.title} subtitle="Strategic Advocacy" />
      </div>

      {/* MOBILE LIST: Dynamic Scroll Animation */}
      <div className="md:hidden flex flex-col gap-8 px-6 relative z-20">
        {data.items.map((item, index) => (
          <div
            key={index}
            className="legal-card-mobile p-6 rounded-2xl bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 backdrop-blur-xl shadow-2xl"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-orange-600 font-black text-2xl italic tracking-tighter">0{index + 1}</span>
              <div className="w-8 h-8 rounded-full bg-orange-600/10 flex items-center justify-center border border-orange-600/20">
                 <span className="text-orange-500 text-xs">§</span>
              </div>
            </div>
            <h3 className="text-white text-lg font-bold leading-tight uppercase tracking-tight">{item}</h3>
            <div className="mt-4 h-[1px] w-12 bg-orange-600" />
          </div>
        ))}
      </div>

      {/* DESKTOP CONTAINER */}
      <div className="hidden md:flex relative w-full h-[85vh] items-center justify-center" style={{ perspective: "1000px" }}>
        <h2 className="absolute text-[18vw] font-black text-white/[0.01] uppercase italic select-none">JUSTICE</h2>
        {data.items.map((item, index) => (
          <div key={index} className="legal-card-stack absolute w-[380px] p-8 rounded-[2rem] bg-[#0a0a0a]/95 border border-white/10 backdrop-blur-xl opacity-0 scale-50 z-20 group">
             <div className="flex items-center gap-4 mb-4">
                <span className="text-white/10 text-4xl font-black">0{index+1}</span>
             </div>
             <h3 className="text-xl font-bold text-white group-hover:text-orange-500 transition-colors uppercase">{item}</h3>
          </div>
        ))}
        <div className="hero-legal-img relative z-30 w-[420px]">
          <Image src={withoutbg} alt="Advocate" className="w-full h-auto object-contain drop-shadow-[0_0_50px_rgba(234,88,12,0.1)]" />
        </div>
      </div>

      {/* Faded Background Hero for Mobile */}
      <div className="hero-legal-img-mobile md:hidden absolute bottom-[-5%] right-[-10%] opacity-20 pointer-events-none w-[300px] z-0">
         <Image src={withoutbg} alt="bg-vikalp" className="w-full h-auto grayscale" />
      </div>
    </section>
  );
}