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
          // ✅ Y offsets ko thoda adjust kiya taaki bottom cards screen ke andar rahein
          x: (i) => [-360, 360, -400, 400, -360, 360][i % 6],
          y: (i) => [-180, -180, 0, 0, 180, 180][i % 6],
          opacity: 1,
          scale: 1,
          stagger: 0.1,
          ease: "power2.out"
        });
      } else {
        const mobileCards = gsap.utils.toArray(".legal-card-mobile");
        mobileCards.forEach((card: any) => {
          gsap.fromTo(card, 
            { opacity: 0, y: 60, scale: 0.9, rotateX: -15 },
            {
              opacity: 1, y: 0, scale: 1, rotateX: 0,
              duration: 1, ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 90%",
                end: "top 60%",
                scrub: 1,
                toggleActions: "play reverse play reverse"
              }
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [data]);

  if (!data) return null;

  return (
    // ✅ min-h-screen aur py-20 kiya hai taaki overflow na ho aur cards dikhein
    <section ref={sectionRef} id="legal" className="relative min-h-screen bg-[#050505] flex flex-col overflow-hidden py-10 md:py-20">
      
      <div className="w-full px-6 md:px-20 z-50 relative">
        <SectionHeader title={data.title} subtitle="Strategic Advocacy" />
      </div>

      {/* MOBILE LIST */}
      <div className="md:hidden flex flex-col gap-8 px-6 relative z-20 mt-10">
        {data.items.map((item, index) => (
          <div key={index} className="legal-card-mobile p-6 rounded-2xl bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 backdrop-blur-xl shadow-2xl">
            <div className="flex items-center justify-between mb-3">
              <span className="text-orange-600 font-black text-2xl italic">0{index + 1}</span>
            </div>
            <h3 className="text-white text-lg font-bold uppercase">{item}</h3>
          </div>
        ))}
      </div>

      {/* ✅ DESKTOP CONTAINER: Height ko auto kiya aur flex-1 rakha taaki content size ke hisab se phail sake */}
      <div className="hidden md:flex relative flex-1 w-full min-h-[600px] items-center justify-center" style={{ perspective: "1000px" }}>
        <h2 className="absolute text-[18vw] font-black text-white/[0.01] uppercase italic select-none">JUSTICE</h2>
        
        {data.items.map((item, index) => (
          <div key={index} className="legal-card-stack absolute w-[380px] p-8 rounded-[2rem] bg-[#0a0a0a]/95 border border-white/10 backdrop-blur-xl opacity-0 scale-50 z-20 group shadow-2xl">
             <div className="flex items-center gap-4 mb-4">
                <span className="text-white/10 text-4xl font-black">0{index+1}</span>
             </div>
             <h3 className="text-xl font-bold text-white group-hover:text-orange-500 transition-colors uppercase">{item}</h3>
          </div>
        ))}

        <div className="hero-legal-img relative z-30 w-[400px]">
          <Image src={withoutbg} alt="Advocate" className="w-full h-auto object-contain drop-shadow-[0_0_50px_rgba(234,88,12,0.1)]" />
        </div>
      </div>
    </section>
  );
}