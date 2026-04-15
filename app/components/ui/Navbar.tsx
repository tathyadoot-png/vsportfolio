"use client";
import { useState, useEffect } from "react";
import { useLanguage } from "@/app/context/LanguageContext";
import Link from "next/link";
import { Menu, X, Globe } from "lucide-react";

export default function Navbar() {
  const { lang, setLang } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  type NavItem = {
    id: string;
    label: { en: string; hi: string };
  };

  const navItems: NavItem[] = [
    { id: "hero", label: { en: "Home", hi: "होम" } },
    { id: "about", label: { en: "About", hi: "परिचय" } },
    { id: "education", label: { en: "Education", hi: "शिक्षा" } },
    { id: "legal", label: { en: "Legal", hi: "कानूनी" } },
    // { id: "social", label: { en: "Social Work", hi: "सामाजिक कार्य" } },
    // { id: "ideology", label: { en: "Journey", hi: "यात्रा" } },
    { id: "sports", label: { en: "Sports", hi: "खेल" } },
    { id: "initiatives", label: { en: "Initiatives", hi: "पहल" } },
    // { id: "speaking", label: { en: "Speaking", hi: "वक्तव्य" } },
    { id: "media", label: { en: "Media", hi: "मीडिया" } },
    { id: "contact", label: { en: "Contact", hi: "संपर्क" } },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
        isScrolled ? "py-3" : "py-6"
      }`}
    >
      <div className={`max-w-7xl mx-auto px-6`}>
        <div
          className={`relative flex items-center justify-between px-6 py-3 transition-all duration-500 rounded-full border ${
            isScrolled
              ? "bg-black/70 backdrop-blur-xl border-white/10 shadow-2xl"
              : "bg-transparent border-transparent"
          }`}
        >
          {/* LOGO - Branded Typography */}
          <Link
            href="#hero"
            className="group relative flex flex-col items-start overflow-hidden"
          >
            {/* The Main Name Container */}
            <div className="relative flex flex-col leading-none">
              {/* Upper Layer: VIKALP SINGH */}
              <span
                className={`
      font-black uppercase italic transition-all duration-700 ease-in-out pr-7
      ${
        isScrolled
          ? "text-lg tracking-[0.3em] text-orange-600"
          : "text-2xl md:text-3xl tracking-tighter text-white"
      }
    `}
              >
                Vikalp Singh
              </span>

              {/* The Innovation: A "Ghost" scan line that passes on hover */}
              <span className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg] group-hover:left-[100%] transition-all duration-1000 ease-in-out" />
            </div>

            {/* Underline Decoration: Industrial Style */}
            <div
              className={`
    flex gap-1 mt-1 transition-all duration-500
    ${isScrolled ? "opacity-100 w-full" : "opacity-0 w-0"}
  `}
            >
              <div className="h-[2px] w-full bg-orange-600/50" />
              <div className="h-[2px] w-2 bg-orange-600" />
            </div>

            {/* Background Glow on Hover */}
            <div className="absolute inset-0 bg-orange-600/0 group-hover:bg-orange-600/5 blur-xl transition-all duration-500" />
          </Link>
          {/* DESKTOP NAV - Capsule Style */}
          <nav className="hidden lg:flex items-center gap-2">
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={`#${item.id}`}
                className="relative px-4 py-2 text-[11px] font-bold uppercase tracking-[0.03em] text-white/50 hover:text-orange-500 transition-all group"
              >
                <span className="relative z-10">
                  {item.label[lang as "en" | "hi"]}
                </span>
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-orange-600 transition-all group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* RIGHT SIDE: Language & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setLang(lang === "en" ? "hi" : "en")}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all group"
            >
              <Globe className="w-4 h-4 text-orange-600 group-hover:rotate-180 transition-transform duration-700" />
              <span className="text-[10px] font-black uppercase tracking-widest">
                {lang === "en" ? "हिन्दी" : "English"}
              </span>
            </button>

            <button
              className="lg:hidden text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU - Fullscreen Overlay */}
      <div
        className={`fixed inset-0 bg-black z-[-1] transition-all duration-700 ${
          mobileMenuOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-full pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setMobileMenuOpen(false)}
              className="text-4xl font-black uppercase italic tracking-tighter text-white/20 hover:text-orange-600 hover:scale-110 transition-all"
            >
              {item.label[lang as "en" | "hi"]}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
