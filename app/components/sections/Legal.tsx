"use client";
import { useRef, useEffect, useState } from "react";
import { 
  Shield, Gavel, Briefcase, FileText, ArrowUpRight, 
  Plus, Zap, Trophy, Landmark, ExternalLink 
} from "lucide-react";
import { legalData } from "@/app/data/legal";
import { useLanguage } from "@/app/context/LanguageContext";
import SectionHeader from "../ui/SectionHeader";
import gsap from "@/app/lib/gsap";

export default function Legal() {
  const { lang } = useLanguage();
  // Safe data fetching
  const currentLang = lang === 'hi' ? 'hi' : 'en';
  const data = legalData[currentLang];
  
  const containerRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
    const ctx = gsap.context(() => {
      // Direct visibility set
      gsap.set(".reveal-up", { opacity: 1 });

      gsap.from(".reveal-up", {
        y: 60,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, [lang]);

  // Early return fix to prevent "undefined" errors
  if (!data || !data.sections || !data.policy) {
    return <div className="py-20 text-center">Loading Legal Data...</div>;
  }

  return (
    <section ref={containerRef} id="legal" className="py-24 bg-[#FDFCF0] relative overflow-hidden">
      {/* Decorative Background Text */}
      <div className="absolute right-[-2%] top-[15%] opacity-[0.03] select-none pointer-events-none hidden lg:block">
        <h2 className="text-[18vw] font-black text-[#001F3F] leading-none uppercase">COUNSEL</h2>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <SectionHeader title={data.title} subtitle="Jurisprudence & Policy" />

        <div className={`mt-20 space-y-12 transition-opacity duration-700 ${isReady ? 'opacity-100' : 'opacity-0'}`}>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* 01. LITIGATION SECTION */}
            <div className="reveal-up lg:col-span-7 bg-white rounded-[3rem] p-10 lg:p-14 border border-[#001F3F]/5 shadow-sm hover:shadow-md transition-all group">
              <div className="flex flex-col h-full">
                <div className="w-16 h-16 bg-[#001F3F] rounded-2xl flex items-center justify-center mb-10 shadow-lg group-hover:-rotate-3 transition-transform">
                  <Gavel className="text-white" size={28} />
                </div>
                <h3 className="text-5xl lg:text-7xl font-black text-[#001F3F] uppercase leading-[0.9] tracking-tighter italic mb-10">
                  {data.sections[0]?.title || "Litigation"}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-auto">
                  {data.sections[0]?.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-[#FDFCF0] border border-[#001F3F]/5">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#001F3F]" />
                      <span className="text-[10px] font-black uppercase text-[#001F3F]/80">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 02. ADVISORY SECTION */}
            <div className="reveal-up lg:col-span-5 bg-[#001F3F] text-[#FDFCF0] rounded-[3rem] p-10 lg:p-14 shadow-2xl relative overflow-hidden group">
              <Briefcase size={180} className="absolute -right-12 -bottom-12 opacity-5" />
              <h3 className="text-3xl font-black uppercase italic mb-12 tracking-tight border-l-4 border-white/20 pl-6">
                {data.sections[1]?.title || "Advisory"}
              </h3>
              <div className="space-y-8 relative z-10">
                {data.sections[1]?.items.map((item, i) => (
                  <p key={i} className="text-lg font-medium italic opacity-75 hover:opacity-100 transition-opacity leading-snug">
                    {item}
                  </p>
                ))}
              </div>
              <div className="mt-12 pt-8 border-t border-white/10 flex items-center justify-between opacity-40">
                <span className="text-[9px] font-black tracking-[0.4em] uppercase">Firm Partner Status</span>
                <Landmark size={18} />
              </div>
            </div>

            {/* 03. POLICY GRID */}
            <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              {data.policy.items.map((p, i) => (
                <div key={i} className="reveal-up group bg-white border border-[#001F3F]/5 rounded-[2.5rem] p-10 hover:bg-[#001F3F] transition-all duration-500">
                  <div className="flex justify-between items-start mb-10">
                    <div className="p-4 bg-[#FDFCF0] rounded-2xl group-hover:bg-white/10 group-hover:text-white transition-colors">
                      {i === 0 ? <Zap size={22} /> : i === 1 ? <Trophy size={22} /> : <FileText size={22} />}
                    </div>
                    <ArrowUpRight className="text-[#001F3F]/10 group-hover:text-white transition-all" size={22} />
                  </div>
                  <h4 className="text-2xl font-black text-[#001F3F] group-hover:text-white uppercase tracking-tighter mb-4">{p.title}</h4>
                  <p className="text-xs text-[#001F3F]/50 group-hover:text-white/60 font-semibold leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}