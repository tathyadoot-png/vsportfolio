"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import SectionHeader from "../ui/SectionHeader";
import { useLanguage } from "@/app/context/LanguageContext";
import { articlesData } from "@/app/data/articles";

export default function Articles() {
  const { lang } = useLanguage();
  const data = articlesData[lang as keyof typeof articlesData] || articlesData.en;

  return (
    <section id="articles" className="relative bg-[#FDFCF0] py-24 overflow-hidden">
      <div className="container mx-auto px-6 md:px-10">
        <SectionHeader title={data.title} subtitle="Editorial Intelligence" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-14">
          {data.items.map((item, index) => (
            <motion.a
              key={index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -6 }}
              whileTap={{ scale: 0.98 }}
              className="group block overflow-hidden rounded-[2.5rem] border border-[#001F3F]/10 bg-white shadow-2xl transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_80px_rgba(0,31,63,0.12)]"
            >
              <div className="relative h-72 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#001F3F]/70 via-transparent to-transparent" />
              </div>

              <div className="p-8">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#001F3F]/10 text-[#001F3F] text-[11px] font-black uppercase tracking-[0.35em]">
                  {lang === "en" ? "Article" : "लेख"}
                </span>
                <h3 className="mt-6 text-2xl md:text-3xl font-black text-[#001F3F] leading-tight tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-5 text-sm md:text-base text-[#001F3F]/70 leading-relaxed">
                  {data.description}
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
