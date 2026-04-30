"use client";
import { useRef, useEffect, cloneElement } from "react";
import { Users, GraduationCap, Trophy, Heart, ArrowUpRight, Target } from "lucide-react";
import { publicImpactData } from "@/app/data/publicImpact";
import { useLanguage } from "@/app/context/LanguageContext";
import SectionHeader from "../ui/SectionHeader";
import gsap from "@/app/lib/gsap";


export default function PublicImpact() {
  const { lang } = useLanguage();
  const currentLang = lang === 'hi' ? 'hi' : 'en';
  const data = publicImpactData[currentLang];
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".impact-card", {
        y: 100,
        opacity: 0,
        stagger: 0.2,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, [lang]);

  if (!data) return null;

  const icons = [<Users />, <GraduationCap />, <Trophy />, <Heart />];

  return (
    <section ref={containerRef} id="impact" className="py-24 bg-[#FDFCF0] relative overflow-hidden">
      {/* Structural Background Pattern */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none select-none">
        <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(#001F3F 1px, transparent 1px)' }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <SectionHeader title={data.title} subtitle="Grassroots Leadership & Community Empowerment" />

        <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {data.items.map((item, i) => (
            <div 
              key={i} 
              className="impact-card group relative bg-white border border-[#001F3F]/5 rounded-[2.5rem] p-8 lg:p-12 hover:bg-[#001F3F] transition-all duration-700 overflow-hidden shadow-sm hover:shadow-2xl"
            >
              {/* Decorative Number Background */}
              <div className="absolute -right-4 -top-4 text-[12rem] font-black text-[#001F3F]/[0.03] group-hover:text-white/[0.05] transition-colors leading-none pointer-events-none">
                0{i + 1}
              </div>

              <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-10">
                  <div className="w-16 h-16 bg-[#FDFCF0] group-hover:bg-white/10 rounded-2xl flex items-center justify-center text-[#001F3F] group-hover:text-white transition-all duration-500 shadow-inner">
                {cloneElement(icons[i % icons.length], { size: 28 })}
                  </div>
                  <div className="px-6 py-2 bg-[#001F3F]/5 group-hover:bg-white/20 rounded-full border border-[#001F3F]/10 group-hover:border-white/30 transition-all">
                    <span className="text-[11px] font-black uppercase tracking-widest text-[#001F3F] group-hover:text-white">
                      {item.numbers}
                    </span>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-3xl lg:text-4xl font-black text-[#001F3F] group-hover:text-white uppercase italic leading-none tracking-tighter">
                    {item.title}
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <Target size={18} className="text-[#001F3F]/20 group-hover:text-white/40 mt-1 shrink-0" />
                      <p className="text-sm font-semibold text-[#001F3F]/60 group-hover:text-white/70 leading-relaxed">
                        {item.what}
                      </p>
                    </div>
                    
                    <div className="pt-6 border-t border-[#001F3F]/10 group-hover:border-white/10">
                      <p className="text-base font-bold text-[#001F3F] group-hover:text-white leading-snug italic">
                        "{item.impact}"
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-12 flex justify-end">
                   <div className="flex items-center gap-2 text-[#001F3F] group-hover:text-white transition-colors">
                     <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 group-hover:opacity-100 transition-opacity">Initiative Details</span>
                     <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                   </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner - Collective Impact */}
        <div className="impact-card mt-12 bg-[#001F3F] rounded-[3rem] p-10 lg:p-16 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
          <div className="relative z-10 text-center md:text-left">
            <h4 className="text-[#FDFCF0] text-4xl lg:text-5xl font-black uppercase italic tracking-tighter leading-none mb-2">
              Transforming Lives
            </h4>
            <p className="text-[#FDFCF0]/50 font-bold uppercase tracking-widest text-[10px]">At the Intersection of Policy & People</p>
          </div>
          <div className="relative z-10 flex gap-4">
            <div className="px-8 py-5 bg-white rounded-2xl text-center">
              <div className="text-3xl font-black text-[#001F3F]">10K+</div>
              <div className="text-[10px] font-black text-[#001F3F]/40 uppercase tracking-wider">Beneficiaries</div>
            </div>
            <div className="px-8 py-5 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-center">
              <div className="text-3xl font-black text-white">5+</div>
              <div className="text-[10px] font-black text-white/40 uppercase tracking-wider">Major Initiatives</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}