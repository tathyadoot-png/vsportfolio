"use client";

import { aboutData } from "@/app/data/about";
import { useLanguage } from "@/app/context/LanguageContext";
import SectionHeader from "@/app/components/ui/SectionHeader";

export default function About() {
  const { lang } = useLanguage();
  const data = aboutData[lang as keyof typeof aboutData];

  return (
    <section id="about" className="min-h-screen bg-black text-white px-6 md:px-20 py-24">

      {/* Header */}
      <SectionHeader
        title={data.title}
        subtitle={lang === "en" ? "Who I Am" : "मैं कौन हूँ"}
      />

      {/* 🔥 Intro Highlight */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h3 className="text-2xl md:text-3xl font-semibold text-yellow-400">
          {data.tagline}
        </h3>
      </div>

      {/* 🔥 Role Cards */}
      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">

        {[
          lang === "en" ? "Legal Expertise" : "कानूनी विशेषज्ञता",
          lang === "en" ? "Public Leadership" : "जन नेतृत्व",
          lang === "en" ? "Policy & Governance" : "नीति एवं शासन",
        ].map((item, i) => (
          <div
            key={i}
            className="p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md hover:scale-105 transition"
          >
            <h4 className="text-lg font-semibold text-yellow-400">
              {item}
            </h4>
          </div>
        ))}

      </div>

      {/* 🔥 Description */}
      <div className="max-w-4xl mx-auto text-gray-300 text-lg leading-relaxed space-y-6">
        {data.description.split("\n").map((para: string, i: number) => (
          <p key={i}>{para}</p>
        ))}
      </div>

    </section>
  );
}