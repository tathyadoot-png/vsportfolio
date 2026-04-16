"use client";
import { useState, useEffect } from "react";
import { useLanguage } from "@/app/context/LanguageContext";
import Link from "next/link";
import Image from "next/image"; // ✅ Import Image
import { Menu, X, Globe } from "lucide-react";
import logo from "@/public/VS_Logo_orange.png"; // ✅ Aapka import

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
    { id: "sports", label: { en: "Sports", hi: "खेल" } },
    { id: "initiatives", label: { en: "Initiatives", hi: "पहल" } },
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
          className={`relative flex items-center justify-between px-6 py-2 transition-all duration-500 rounded-full border ${
            isScrolled
              ? "bg-black/70 backdrop-blur-xl border-white/10 shadow-2xl"
              : "bg-transparent border-transparent"
          }`}
        >
          {/* LOGO - Replaced Text with Image */}
          <Link
            href="#hero"
            className="group relative flex items-center"
          >
            <div className={`relative transition-all duration-500 ease-in-out ${isScrolled ? "w-16 md:-24" : "w-16 md:w-35"}`}>
              <Image 
                src={logo} 
                alt="Vikalp Singh" 
                width={200} 
                height={60} 
                className="object-contain"
                priority
              />
            </div>
            {/* Background Glow on Hover */}
            <div className="absolute inset-0 bg-orange-600/0 group-hover:bg-orange-600/5 blur-xl transition-all duration-500" />
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-2">
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={`#${item.id}`}
                className="relative px-4 py-2 text-[11px] font-bold uppercase text-white/50 hover:text-orange-500 transition-all group"
              >
                <span className="relative z-10">
                  {item.label[lang as "en" | "hi"]}
                </span>
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-orange-600 transition-all group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setLang(lang === "en" ? "hi" : "en")}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all group"
            >
              <Globe className="w-4 h-4 text-orange-600 group-hover:rotate-180 transition-transform duration-700" />
              <span className="text-[10px] font-black uppercase ">
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

      {/* MOBILE MENU */}
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
              className="text-4xl font-black uppercase italic text-white/20 hover:text-orange-600 hover:scale-110 transition-all"
            >
              {item.label[lang as "en" | "hi"]}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}