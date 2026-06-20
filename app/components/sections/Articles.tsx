"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeader from "../ui/SectionHeader";
import { useLanguage } from "@/app/context/LanguageContext";
import { articlesData } from "@/app/data/articles";

export default function Articles() {
  const { lang } = useLanguage();
  const data = articlesData[lang as keyof typeof articlesData] || articlesData.en;

  // State to manage visible items count (Starts at 3)
  const [visibleCount, setVisibleCount] = useState(3);

  // Handle loading 3 more entries
  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + 3);
  };

  const visibleItems = data.items.slice(0, visibleCount);
  const hasMore = visibleCount < data.items.length;

  return (
    // Py-24 ko py-16 kiya section compact karne ke liye
    <section id="articles" className="relative bg-[#FDFCF0] py-16 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 md:px-10">
        <SectionHeader title={data.title} subtitle="Editorial Intelligence" />

        {/* mt-14 ko mt-8 kiya taaki gap kam ho */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          <AnimatePresence mode="popLayout">
            {visibleItems.map((item, index) => (
              <motion.a
                key={index}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                whileHover={{ y: -6 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                // Rounded corner ko 2.5rem se thoda kam (2rem) kiya functional/compact look ke liye
                className="group block overflow-hidden rounded-[2rem] border border-[#001F3F]/10 bg-white shadow-xl transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,31,63,0.1)]"
              >
                {/* Image Section: bg-slate-100 lagaya aur object-contain kiya taaki top-bottom se cut na ho */}
                <div className="relative h-52 sm:h-60 overflow-hidden bg-[#001F3F]/5">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-contain p-2 transition-transform duration-700 group-hover:scale-103"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#001F3F]/50 via-transparent to-transparent opacity-40" />
                </div>

                {/* Content Section: Padding p-8 se kam karke p-5 vertical aur p-6 horizontal kiya */}
                <div className="p-5 sm:p-6">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#001F3F]/10 text-[#001F3F] text-[10px] font-black uppercase tracking-[0.25em]">
                    {lang === "en" ? "Article" : "लेख"}
                  </span>
                  
                  {/* Title size text-2xl/3xl se chota karke text-lg/xl kiya */}
                  <h3 className="mt-3 text-lg md:text-xl font-bold text-[#001F3F] leading-snug tracking-tight line-clamp-2 min-h-[3.5rem]">
                    {item.title}
                  </h3>
                  
                  {/* Description text size and margin compressed */}
                  <p className="mt-2 text-xs md:text-sm text-[#001F3F]/70 leading-relaxed line-clamp-3">
                    {data.description}
                  </p>
                </div>
              </motion.a>
            ))}
          </AnimatePresence>
        </div>

        {/* View More Button Section */}
        {hasMore && (
          <div className="flex justify-center mt-10">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={loadMore}
              className="px-8 py-3 rounded-full bg-[#001F3F] text-[#FDFCF0] font-bold text-sm tracking-wide shadow-md hover:bg-[#001F3F]/90 transition-all duration-300"
            >
              {lang === "en" ? "View More" : "और देखें"}
            </motion.button>
          </div>
        )}
      </div>
    </section>
  );
}