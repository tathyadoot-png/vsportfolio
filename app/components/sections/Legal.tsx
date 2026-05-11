"use client";
import { useRef, useEffect, useState } from "react";
import { 
  Shield, Gavel, Briefcase, FileText, ArrowUpRight, 
  Plus, Zap, Trophy, Landmark, Scale 
} from "lucide-react";
import { legalData } from "@/app/data/legal";
import { useLanguage } from "@/app/context/LanguageContext";
import SectionHeader from "../ui/SectionHeader";
import gsap from "@/app/lib/gsap";

export default function Legal() {
  const { lang } = useLanguage();
  const currentLang = lang === 'hi' ? 'hi' : 'en';
  const data = legalData[currentLang];
  
  const containerRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
    const ctx = gsap.context(() => {
      gsap.set(".reveal-up", { opacity: 0, y: 40 });

      gsap.to(".reveal-up", {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 1,
        ease: "expo.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, [lang]);

  if (!data || !data.sections || !data.policy) {
    return (
      <div className="py-20 flex items-center justify-center min-h-[400px]">
        <div className="animate-pulse font-black text-[#001F3F] uppercase tracking-widest">
          Loading Jurisprudence...
        </div>
      </div>
    );
  }

  return (
    <section ref={containerRef} id="legal" className="py-32 bg-[#FDFCF0] relative overflow-hidden">
      {/* Background Architectural Element */}
      <div className="absolute left-[-5%] top-[10%] opacity-[0.02] select-none pointer-events-none">
        <Scale size={600} strokeWidth={1} className="text-[#001F3F]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="reveal-up mb-16">
          <SectionHeader title={data.title} subtitle="Jurisprudence & Strategic Counsel" />
        </div>

        <div className={`space-y-8 transition-all duration-1000 ${isReady ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* 01. LITIGATION SECTION - High Impact */}
{/* 01. LITIGATION SECTION - Enhanced Layout */}
<div className="reveal-up lg:col-span-8 bg-white border border-[#001F3F]/10 rounded-[3.5rem] p-10 lg:p-16 shadow-sm group relative overflow-hidden flex flex-col justify-between">
  {/* Top Accent Line */}
  <div className="absolute top-0 left-16 w-32 h-1 bg-[#001F3F] rounded-full opacity-20" />
  
  <div>
    <div className="flex justify-between items-start mb-12">
      <div className="w-20 h-20 bg-[#001F3F] rounded-[2rem] flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-500">
        <Gavel className="text-white" size={32} />
      </div>
      <span className="text-[10px] font-black tracking-[0.4em] text-[#001F3F]/30 uppercase mt-4">Section 01</span>
    </div>

    <h3 className="text-6xl lg:text-[7.5rem] font-black text-[#001F3F] uppercase leading-[0.8] tracking-tighter mb-4 italic">
      {data.sections[0]?.title || "Litigation"}
    </h3>
    <p className="text-[#001F3F]/50 text-sm font-bold uppercase tracking-widest ml-2 mb-12">
      High-Stakes Representation
    </p>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    {data.sections[0]?.items.map((item, i) => (
      <div 
        key={i} 
        className="flex flex-col gap-3 p-6 rounded-[2rem] bg-[#FDFCF0] border border-[#001F3F]/5 group/item hover:bg-[#001F3F] transition-all duration-300"
      >
        <div className="w-1.5 h-1.5 rounded-full bg-[#001F3F] group-hover/item:bg-white" />
        <span className="text-[11px] font-black uppercase leading-tight text-[#001F3F] group-hover/item:text-white">
          {item}
        </span>
      </div>
    ))}
  </div>
</div>
            {/* 02. ADVISORY SECTION - Dark Mode Contrast */}
            <div className="reveal-up lg:col-span-4 bg-[#001F3F] text-[#FDFCF0] rounded-[3.5rem] p-10 lg:p-14 shadow-2xl relative overflow-hidden flex flex-col justify-between group">
              <Briefcase size={220} className="absolute -right-16 -top-16 opacity-10 group-hover:scale-110 transition-transform duration-700" />
              
              <div className="relative z-10">
                <h3 className="text-3xl font-black uppercase italic mb-10 tracking-tight flex items-center gap-4">
                  <div className="w-8 h-[2px] bg-white/30" />
                  {data.sections[1]?.title || "Advisory"}
                </h3>
                
                <div className="space-y-6">
                  {data.sections[1]?.items.map((item, i) => (
                    <div key={i} className="group/adv">
                      <p className="text-lg font-medium opacity-70 group-hover/adv:opacity-100 group-hover/adv:translate-x-2 transition-all duration-300 flex items-start gap-3">
                        <span className="text-white/20 text-sm mt-1">0{i+1}</span>
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-16 pt-8 border-t border-white/10 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black tracking-widest uppercase opacity-40">Consultancy Status</p>
                  <p className="text-xs font-bold text-white">Certified Lead Counsel</p>
                </div>
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-[#001F3F] transition-all">
                  <Landmark size={20} />
                </div>
              </div>
            </div>

            {/* 03. POLICY GRID - Horizontal Stripe */}
            <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
              {data.policy.items.map((p, i) => (
                <div 
                  key={i} 
                  className="reveal-up group relative bg-white border border-[#001F3F]/10 rounded-[3rem] p-10 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden"
                >
                  {/* Hover background slide */}
                  <div className="absolute inset-0 bg-[#001F3F] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-expo" />
                  
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-14">
                      <div className="w-14 h-14 bg-[#FDFCF0] text-[#001F3F] border border-[#001F3F]/10 rounded-2xl flex items-center justify-center group-hover:bg-white/10 group-hover:text-white group-hover:border-transparent transition-all">
                        {i === 0 ? <Zap size={24} /> : i === 1 ? <Trophy size={24} /> : <FileText size={24} />}
                      </div>
                      <div className="w-10 h-10 rounded-full border border-[#001F3F]/10 flex items-center justify-center group-hover:border-white/20 transition-colors">
                        <ArrowUpRight className="text-[#001F3F] group-hover:text-white" size={20} />
                      </div>
                    </div>
                    
                    <h4 className="text-2xl font-black text-[#001F3F] group-hover:text-white uppercase tracking-tighter mb-4 leading-none">
                      {p.title}
                    </h4>
                    <p className="text-sm text-[#001F3F]/60 group-hover:text-white/70 font-medium leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}