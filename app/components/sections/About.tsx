"use client";
import { useRef, useEffect } from "react";
import Image from "next/image";
import { aboutData } from "@/app/data/about";
import { useLanguage } from "@/app/context/LanguageContext";
import gsap from "@/app/lib/gsap";
import vs from "@/public/vs.png";

export default function About() {
  const { lang } = useLanguage();
  const data = aboutData[lang as keyof typeof aboutData];
  const sectionRef = useRef(null);
  const portraitRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Image Entrance Animation (Scale & Fade)
      gsap.from(portraitRef.current, {
        scale: 0.85,
        opacity: 0,
        filter: "blur(10px)",
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "#about",
          start: "top 70%",
        }
      });

      // 2. Parallax effect on image while scrolling
      gsap.to(portraitRef.current, {
        y: -50, // Subtle floating effect
        scrollTrigger: {
          trigger: "#about",
          scrub: 1, // Smooth follow
        }
      });

      // 3. Text Reveal Animation
      gsap.from(".about-reveal", {
        opacity: 0,
        y: 60,
        stagger: 0.2,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: "#about",
          start: "top 60%",
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [lang]);

  return (
    <section ref={sectionRef} id="about" className="relative min-h-screen bg-black flex items-center py-28 overflow-hidden">
      
      {/* Background Large Outlined Text (Elite UI Aesthetic) */}
      <div className="absolute top-1/3 left-10 pointer-events-none opacity-[0.05] select-none">
         <h2 className="text-[20vw] font-black text-transparent stroke-white stroke-1 uppercase leading-none" 
             style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}>
           {lang === "en" ? "Visionary" : "दृष्टिकोण"}
         </h2>
      </div>

      <div className="container mx-auto px-6 md:px-24 grid md:grid-cols-2 gap-20 items-center relative z-10">
        
        {/* 📸 Elite Image Area (Black & White to Color) */}
        <div className="relative flex justify-center order-2 md:order-1">
           <div ref={portraitRef} className="relative group aspect-[3/4] w-full max-w-md mx-auto rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm shadow-2xl">
              
              {/* Profile PNG */}
              <Image 
                src={vs} 
                alt="Vikalp Singh" 
                className="object-contain z-10 relative drop-shadow-[0_0_50px_rgba(255,110,0,0.15)] grayscale group-hover:grayscale-0 transition-all duration-1000 transform group-hover:scale-105"
                fill
                priority
              />
              
              {/* Gradient Aura Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-orange-600/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 z-0" />
           </div>
        </div>

        {/* ✍️ Clean & Impactful Typography */}
        <div className="space-y-12 order-1 md:order-2">
          <div className="about-reveal">
            <p className="text-orange-500 font-mono tracking-[0.5em] text-xs uppercase block mb-3">// {data.title}</p>
            <h2 className="text-6xl md:text-8xl font-black text-white uppercase leading-none italic tracking-tight">
              Legacy in <br/> <span className="text-orange-600">Motion.</span>
            </h2>
          </div>

          <div className="about-reveal space-y-6 text-gray-400 text-sm md:text-lg font-light leading-relaxed max-w-xl border-l-2 border-orange-600 pl-6">
             {data.description.split("\n").map((para, i) => (
                para.trim() && <p key={i} className="hover:text-white transition-colors duration-500">{para}</p>
              ))}
          </div>

          <div className="about-reveal pt-4 flex gap-6">
            <button className="px-10 py-4 bg-orange-600 text-white font-bold text-xs uppercase tracking-widest rounded-full hover:bg-white hover:text-black transition-all duration-500 shadow-lg hover:shadow-orange-500/30">
              {lang === 'en' ? 'Learn More' : 'और जानें'}
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}