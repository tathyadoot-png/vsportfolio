"use client";

import { useLanguage } from "@/app/context/LanguageContext";
import Link from "next/link";

export default function Navbar() {
  const { lang } = useLanguage();

type NavItem = {
  id: string;
  label: {
    en: string;
    hi: string;
  };
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
  { id: "speaking", label: { en: "Speaking", hi: "वक्तव्य" } },
  { id: "media", label: { en: "Media", hi: "मीडिया" } },
  { id: "contact", label: { en: "Contact", hi: "संपर्क" } },
];

  return (
    <header className="fixed top-0 left-0 w-full z-50">

      {/* Background */}
      <div className="backdrop-blur-md bg-black/60 border-b border-white/10">

        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* Logo */}
          <div className="text-lg md:text-xl font-bold tracking-wide">
            Vikalp
          </div>

          {/* Nav Items */}
          <nav className="hidden md:flex gap-6 text-sm font-medium">

            {navItems.map((item) => (
              <Link
                key={item.id}
                href={`#${item.id}`}
                className="text-gray-300 hover:text-white transition"
              >
               {item.label[lang as "en" | "hi"]}
              </Link>
            ))}

          </nav>

        </div>
      </div>
    </header>
  );
}