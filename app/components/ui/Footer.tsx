"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Image component add kiya
import { Mail, MapPin, ArrowUpRight } from 'lucide-react';
import sociyo from "@/public/sociyo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { name: "Home", href: "#hero" },
    { name: "About", href: "#about" },
    { name: "Legal", href: "#legal" },
    { name: "Sports", href: "#sports" },
    { name: "Media", href: "#media" },
  ];

  const socialLinks = ["Instagram", "LinkedIn", "Twitter", "Facebook"];

  return (
    <footer className="relative bg-[#050505] border-t border-white/5 pt-20 pb-10 overflow-hidden">
      {/* Background Subtle Text */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 opacity-[0.02] select-none pointer-events-none whitespace-nowrap">
        <span className="text-[15vw] font-black uppercase italic ">
          Vikalp Singh
        </span>
      </div>

      <div className="container mx-auto px-6 md:px-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
          
          {/* 1. Brand Section */}
          <div className="md:col-span-5 space-y-6">
            <h2 className="text-3xl font-black  text-white italic uppercase">
              Vikalp <span className="text-orange-600 underline decoration-1 underline-offset-8">Singh</span>
            </h2>
            <p className="text-white/50 text-sm max-w-sm leading-relaxed">
              Advocating with integrity and competing with passion. Bridging the gap between 
              legal jurisprudence and athletic leadership.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <Link 
                  key={social} 
                  href="#" 
                  className="text-xs uppercase  text-white/40 hover:text-orange-500 transition-colors"
                >
                  {social}
                </Link>
              ))}
            </div>
          </div>

          {/* 2. Navigation Section */}
          <div className="md:col-span-3 space-y-6">
            <h3 className="text-white font-bold text-sm uppercase ">Navigation</h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="text-white/40 hover:text-white text-sm transition-all flex items-center group"
                  >
                    <ArrowUpRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0 transition-all text-orange-500" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Contact Section */}
          <div className="md:col-span-4 space-y-6">
            <h3 className="text-white font-bold text-sm uppercase ">Get In Touch</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4 group">
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 group-hover:border-orange-600/30 transition-colors">
                  <Mail className="w-4 h-4 text-orange-500" />
                </div>
                <div>
                  <p className="text-[10px] text-white/30 uppercase ">Email</p>
                  <p className="text-sm text-white/80 font-medium">office@vikalpsingh.com</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 group">
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 group-hover:border-orange-600/30 transition-colors">
                  <MapPin className="w-4 h-4 text-orange-500" />
                </div>
                <div>
                  <p className="text-[10px] text-white/30 uppercase ">Location</p>
                  <p className="text-sm text-white/80 font-medium">Satna, Madhya Pradesh</p>
                  <p className="text-sm text-white/80 font-medium">New Delhi</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <p className="text-white/30 text-[10px] uppercase">
              © {currentYear} ALL RIGHTS RESERVED |
            </p>
            {/* SOCIYO LOGO & LINK HERE */}
            <Link 
              href="https://thesociyo.com" 
              target="_blank" 
              className="opacity-60 hover:opacity-100 transition-opacity"
            >
              <Image 
                src={sociyo} 
                alt="The Sociyo Communication" 
                width={100} 
                height={30} 
                className="object-contain"
              />
            </Link>
          </div>
          
          <div className="flex items-center gap-8">
            <Link href="#" className="text-white/30 hover:text-white text-[10px] uppercase  transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-white/30 hover:text-white text-[10px] uppercase  transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;