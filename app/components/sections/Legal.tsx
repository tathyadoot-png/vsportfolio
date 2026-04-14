"use client";
import { useRef, useEffect } from "react";
import { legalData } from "@/app/data/legal";
import { useLanguage } from "@/app/context/LanguageContext";
import gsap from "@/app/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeader from "../ui/SectionHeader";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Legal() {
  const { lang } = useLanguage();
  const data = legalData[lang as keyof typeof legalData];
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Safety Guard
    if (!sectionRef.current || !scrollRef.current) return;

    const ctx = gsap.context(() => {
      const scrollEl = scrollRef.current;
      if (!scrollEl) return;

      // 2. Horizontal Move Logic
      // Jitne cards hain uske hisaab se calculate karega
      const totalWidth = scrollEl.offsetWidth;
      const amountToMove = totalWidth - window.innerWidth;

      if (amountToMove > 0) {
        gsap.to(scrollEl, {
          x: -amountToMove - 200, // Thoda extra space last card ke baad
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => `+=${amountToMove}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [lang]); // Sirf lang par dependency rakho

  // Agar data load nahi hua toh fallback dikhao (Black screen se bachne ke liye)
  if (!data)
    return <div className="h-screen bg-black text-white p-20">Loading...</div>;

  return (
    <section
    id="legal"
      ref={sectionRef}
      className="relative h-screen bg-black overflow-hidden flex flex-col"
    >
      {/* 1. Heading (Fixed Height) */}
      <div className="pt-10">
        <SectionHeader
          title={data.title}
          subtitle="Professional Jurisprudence"
        />
      </div>

      {/* 2. Horizontal Container */}
      <div className="flex-1 relative z-10 flex items-center overflow-visible">
        <div
          ref={scrollRef}
          className="flex flex-nowrap gap-10 px-10 md:px-24 w-fit"
        >
          {data.items.map((item, index) => (
            <div
              key={index}
              className="legal-card group relative w-[300px] md:w-[450px] h-[350px] p-10 rounded-[3rem] bg-white/[0.03] border border-white/10 backdrop-blur-xl flex flex-col justify-between transition-all duration-500 hover:border-orange-600/50 flex-shrink-0"
            >
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 rounded-xl border border-orange-600/30 flex items-center justify-center group-hover:bg-orange-600 transition-all duration-500">
                  <span className="text-orange-500 group-hover:text-white text-xs font-bold italic">
                    L
                  </span>
                </div>
                <span className="text-white/5 text-6xl font-black italic">
                  0{index + 1}
                </span>
              </div>

              <div className="space-y-4">
                <div className="h-[2px] w-8 bg-orange-600 group-hover:w-full transition-all duration-700" />
                <h3 className="text-xl md:text-3xl font-bold text-white leading-tight">
                  {item}
                </h3>
              </div>
            </div>
          ))}
          {/* Last Spacer */}
          <div className="w-[30vw] flex-shrink-0" />
        </div>
      </div>

      {/* 3. Global Decorative Elements */}
      <div className="absolute top-0 right-0 opacity-[0.02] pointer-events-none p-10 z-0">
        <span className="text-[30vh] font-black italic uppercase leading-none">
          LAW
        </span>
      </div>
    </section>
  );
}
