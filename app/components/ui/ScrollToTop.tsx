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
          className="fixed bottom-8 right-8 z-[9999] cursor-pointer"
        >
          <div className="relative w-16 h-16 flex items-center justify-center group">
            
            {/* 1. Subtle Outer Glow */}
            <div className="absolute inset-0 bg-orange-600/20 rounded-full blur-xl group-hover:bg-orange-600/40 transition-all duration-500" />

            {/* 2. SVG Progress Ring with Modern Stroke */}
            <svg className="w-full h-full rotate-[-90deg] drop-shadow-2xl">
              <circle
                cx="32"
                cy="32"
                r="28"
                stroke="white"
                strokeWidth="1.5"
                fill="transparent"
                className="opacity-10"
              />
              <motion.circle
                cx="32"
                cy="32"
                r="28"
                stroke="#ea580c" // Orange-600
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
              {/* Progress Text - Very Subtle */}
              <span className="text-[8px] font-bold text-white/40 mb-[-4px] opacity-0 group-hover:opacity-100 transition-opacity">
                {Math.round(progress)}%
              </span>
              
              <motion.div
                animate={{ y: [0, -3, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <ArrowUp className="w-5 h-5 text-white group-hover:text-orange-500 transition-colors" />
              </motion.div>
            </div>

            {/* 4. Glassmorphism Background */}
            <div className="absolute inset-2 bg-white/5 backdrop-blur-md rounded-full -z-10 border border-white/10 group-hover:bg-white/10 transition-all" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}