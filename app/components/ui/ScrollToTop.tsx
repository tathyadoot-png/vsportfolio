"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (scrollTop / height) * 100;

      setProgress(scrolled);
      setShow(scrollTop > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9, y: -5 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[9999] cursor-pointer"
        >
          <div className="relative w-14 h-14 md:w-16 md:h-16 flex items-center justify-center group">
            
            {/* 1. Subtle Outer Glow - Navy Blue */}
            <div className="absolute inset-0 bg-[#001F3F]/5 rounded-full blur-xl group-hover:bg-[#001F3F]/10 transition-all duration-500" />

            {/* 2. SVG Progress Ring - Navy Theme */}
            <svg className="w-full h-full rotate-[-90deg] drop-shadow-xl">
              <circle
                cx="32"
                cy="32"
                r="28"
                stroke="#001F3F"
                strokeWidth="1.5"
                fill="transparent"
                className="opacity-10"
              />
              <motion.circle
                cx="32"
                cy="32"
                r="28"
                stroke="#001F3F" 
                strokeWidth="3"
                fill="transparent"
                strokeDasharray="176"
                animate={{ strokeDashoffset: 176 - (progress / 100) * 176 }}
                transition={{ type: "spring", stiffness: 50, damping: 20 }}
                strokeLinecap="round"
              />
            </svg>

            {/* 3. Central Icon Container */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              {/* Progress Text - Navy */}
              <span className="text-[8px] font-black text-[#001F3F]/40 mb-[-2px] opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-tighter">
                {Math.round(progress)}%
              </span>
              
              <motion.div
                animate={{ y: [0, -3, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <ArrowUp className="w-5 h-5 text-[#001F3F] transition-transform duration-300 group-hover:scale-110" />
              </motion.div>
            </div>

            {/* 4. Glassmorphism Background - Beige/White Blend */}
            <div className="absolute inset-2 bg-white/80 backdrop-blur-md rounded-full -z-10 border border-[#001F3F]/10 group-hover:bg-[#FDFCF0] transition-all shadow-sm" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}