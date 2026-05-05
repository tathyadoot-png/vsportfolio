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
    // Initial setup to avoid blank screen
    gsap.set(".impact-card", { opacity: 0, y: 50 });

    const ctx = gsap.context(() => {
      gsap.to(".impact-card", {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [lang]);

  if (!data) return null;

  const icons = [<Users />, <GraduationCap />, <Trophy />, <Heart />];

  return (
    <section ref={containerRef} id="impact" className="py-24 bg-[#FDFCF0] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none">
        <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(#001F3F 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <SectionHeader 
          title={data.title} 
          subtitle={lang === 'hi' ? "जमीनी नेतृत्व और सामुदायिक सशक्तिकरण" : "Grassroots Leadership & Community Empowerment"} 
        />

        <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {data.items.map((item, i) => (
            <div 
              key={`${currentLang}-${i}`} // Dynamic key for fresh render on lang change
              className="impact-card group relative bg-white border border-[#001F3F]/10 rounded-[2rem] p-8 lg:p-10 hover:bg-[#001F3F] transition-all duration-500 overflow-hidden shadow-sm hover:shadow-xl"
            >
              {/* Floating Background Number */}
              <div className="absolute -right-2 -top-6 text-[10rem] font-black text-[#001F3F]/[0.03] group-hover:text-white/[0.05] transition-colors leading-none pointer-events-none select-none">
                0{i + 1}
              </div>

              <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-8">
                  <div className="w-14 h-14 bg-[#FDFCF0] group-hover:bg-white/10 rounded-xl flex items-center justify-center text-[#001F3F] group-hover:text-white transition-all duration-500">
                    {cloneElement(icons[i % icons.length], { size: 24 })}
                  </div>
                  <div className="px-4 py-1.5 bg-[#001F3F]/5 group-hover:bg-white/20 rounded-full border border-[#001F3F]/10 group-hover:border-white/30 transition-all">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#001F3F] group-hover:text-white">
                      {item.numbers}
                    </span>
                  </div>
                </div>

                <div className="space-y-5">
                  <h3 className="text-2xl lg:text-3xl font-black text-[#001F3F] group-hover:text-white uppercase italic leading-tight tracking-tight">
                    {item.title}
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <Target size={16} className="text-[#001F3F]/30 group-hover:text-white/40 mt-1 shrink-0" />
                      <p className="text-sm font-medium text-[#001F3F]/70 group-hover:text-white/80 leading-relaxed">
                        {item.what}
                      </p>
                    </div>
                    
                    <div className="pt-5 border-t border-[#001F3F]/10 group-hover:border-white/10">
                      <p className="text-base font-bold text-[#001F3F] group-hover:text-white leading-snug">
                        "{item.impact}"
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                   <div className="flex items-center gap-2 text-[#001F3F] group-hover:text-white transition-colors opacity-40 group-hover:opacity-100">
                     <span className="text-[9px] font-black uppercase tracking-widest">Details</span>
                     <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                   </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Collective Impact Banner */}
        {/* <div className="impact-card mt-12 bg-[#001F3F] rounded-[2.5rem] p-8 lg:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
          <div className="relative z-10">
            <h4 className="text-[#FDFCF0] text-3xl lg:text-4xl font-black uppercase italic tracking-tighter mb-2">
              Transforming Lives
            </h4>
            <p className="text-[#FDFCF0]/50 font-bold uppercase tracking-widest text-[9px]">At the Intersection of Policy & People</p>
          </div>
          <div className="relative z-10 flex gap-4">
            <div className="px-6 py-4 bg-white rounded-xl text-center min-w-[120px]">
              <div className="text-2xl font-black text-[#001F3F]">10K+</div>
              <div className="text-[9px] font-black text-[#001F3F]/40 uppercase tracking-wider">Beneficiaries</div>
            </div>
            <div className="px-6 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-center min-w-[120px]">
              <div className="text-2xl font-black text-white">5+</div>
              <div className="text-[9px] font-black text-white/40 uppercase tracking-wider">Major Initiatives</div>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
}