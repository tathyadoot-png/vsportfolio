"use client";
import { motion } from "framer-motion";
import { Scale, Briefcase, Handshake, Trophy, Landmark } from "lucide-react";
import { credibilityData } from "@/app/data/credibility";
import { useLanguage } from "@/app/context/LanguageContext";

export default function CredibilityStrip() {
  const { lang } = useLanguage();

  // Fallback data agar import fail ho jaye
  const fallbackData = {
    en: ["8+ Years Legal Practice", "Partner – CSK Law Firm", "President – Utthan Seva Foundation", "Sports Governance Expert"],
    hi: ["8+ वर्षों का अनुभव", "पार्टनर – CSK लॉ फर्म", "अध्यक्ष – उत्थान सेवा फाउंडेशन", "खेल शासन विशेषज्ञ"]
  };

  // Safe Data Selection
  const currentLang = lang === "hi" ? "hi" : "en";
  const itemsList = credibilityData?.[currentLang]?.items || fallbackData[currentLang];

  const icons = [
    <Scale key="1" className="w-4 h-4 md:w-5 md:h-5" />,
    <Briefcase key="2" className="w-4 h-4 md:w-5 md:h-5" />,
    <Handshake key="3" className="w-4 h-4 md:w-5 md:h-5" />,
    <Trophy key="4" className="w-4 h-4 md:w-5 md:h-5" />,
    <Landmark key="5" className="w-4 h-4 md:w-5 md:h-5" />,
  ];

  // Repeat items for seamless animation
  const displayItems = [...itemsList, ...itemsList, ...itemsList];

  return (
    <div className="relative w-full bg-[#FDFCF0] border-y border-[#001F3F]/20 py-8 md:py-12 overflow-hidden z-50">
      
      {/* Heavy Fades to hide edges */}
      <div className="absolute inset-y-0 left-0 w-24 md:w-64 bg-gradient-to-r from-[#FDFCF0] via-[#FDFCF0]/90 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 md:w-64 bg-gradient-to-l from-[#FDFCF0] via-[#FDFCF0]/90 to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex items-center flex-nowrap"
        animate={{ x: ["0%", "-33.33%"] }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {displayItems.map((text, idx) => (
          <div
            key={`strip-item-${idx}`}
            className="flex items-center gap-6 px-12 md:px-20 flex-shrink-0"
          >
            {/* Visual Icon Container */}
            <div className="flex items-center justify-center w-10 h-10 md:w-14 md:h-14 rounded-full bg-[#001F3F] text-[#FDFCF0] shadow-xl">
               {icons[idx % icons.length]}
            </div>

            {/* Bold Navy Text */}
            <span className="text-[#001F3F] font-black text-xs md:text-sm uppercase tracking-[0.3em] whitespace-nowrap">
              {text}
            </span>

            {/* Vertical Marker */}
            <div className="ml-12 md:ml-20 h-8 w-[2px] bg-[#001F3F]/10 rounded-full" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}