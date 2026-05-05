"use client";
import React from 'react';
import { contactData } from "@/app/data/contact";
import { useLanguage } from "@/app/context/LanguageContext";
import SectionHeader from '../ui/SectionHeader';
import {
  Phone,
  Mail,
  Globe,
  Send,
  X
} from "lucide-react";

const Contact = () => {
  const { lang } = useLanguage();
  const data = contactData[lang as keyof typeof contactData];

  const contactItems = [
    { 
      icon: Phone, 
      label: lang === 'hi' ? "फ़ोन" : "Phone", 
      value: data.phone, 
      link: `tel:${data.phone}`,
      color: "from-[#001F3F]/10 to-transparent"
    },
    { 
      icon: Mail, 
      label: lang === 'hi' ? "ईमेल" : "Email", 
      value: data.email, 
      link: `mailto:${data.email}`,
      color: "from-[#001F3F]/10 to-transparent"
    },
    { 
      icon: Globe, 
      label: lang === 'hi' ? "वेबसाइट" : "Website", 
      value: data.website, 
      link: `https://${data.website}`,
      color: "from-[#001F3F]/10 to-transparent"
    },
  ];

  return (
    <section id='contact' className="relative bg-[#FDFCF0] py-16 md:py-24 overflow-hidden min-h-screen flex flex-col justify-center">
      
      {/* Background Decorative Elements - Subtle Navy Glows */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-40">
        <div className="absolute top-[10%] left-[-5%] w-72 h-72 md:w-96 md:h-96 bg-[#001F3F]/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] right-[-5%] w-72 h-72 md:w-96 md:h-96 bg-[#001F3F]/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 mx-auto px-6 w-full">
        <SectionHeader title={data.title} subtitle="Get In Touch" />

        <div className="mt-12 md:mt-16 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
          
          {/* LEFT: Quick Contact Cards */}
          <div className="lg:col-span-5 grid grid-cols-1 gap-6">
            {contactItems.map((item, idx) => (
              <a 
                href={item.link} 
                key={idx}
                className="group relative overflow-hidden bg-white border border-[#001F3F]/10 p-6 md:p-8 rounded-[2rem] transition-all duration-500 hover:border-[#001F3F]/30 hover:shadow-xl hover:shadow-[#001F3F]/5"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <div className="relative z-10 flex items-center gap-5 md:gap-6">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-[#FDFCF0] border border-[#001F3F]/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#001F3F] group-hover:border-[#001F3F] transition-all duration-500">
                    <item.icon className="w-5 h-5 md:w-6 md:h-6 text-[#001F3F] group-hover:text-[#FDFCF0] transition-colors" />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-[10px] font-mono uppercase text-[#001F3F]/50 mb-1">{item.label}</p>
                    <h4 className="text-lg md:text-2xl font-bold text-[#001F3F] truncate">{item.value}</h4>
                  </div>
                </div>
              </a>
            ))}

            {/* Social Connect Small Grid */}
            <div className="grid grid-cols-3 gap-4">
              {[X, Globe, Mail].map((Icon, i) => (
                <div key={i} className="h-16 md:h-20 bg-white border border-[#001F3F]/10 rounded-[1.5rem] flex items-center justify-center hover:bg-[#001F3F] group transition-all duration-500 cursor-pointer shadow-sm hover:shadow-lg">
                  <Icon className="w-5 h-5 md:w-6 md:h-6 text-[#001F3F] group-hover:text-[#FDFCF0] group-hover:scale-125 transition-all" />
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Modern Contact Form */}
          <div className="lg:col-span-7 bg-white border border-[#001F3F]/10 p-8 md:p-12 rounded-[2.5rem] md:rounded-[3rem] relative overflow-hidden shadow-sm">
            <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
                <Send className="w-32 h-32 -rotate-12 text-[#001F3F]" />
            </div>

            <h3 className="text-2xl md:text-3xl font-black text-[#001F3F] uppercase italic mb-8">
              {lang === 'hi' ? "संदेश भेजें" : "Send a Message"}
            </h3>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-mono uppercase text-[#001F3F]/40 ml-2">Name</label>
                  <input 
                    type="text" 
                    className="w-full bg-[#FDFCF0]/50 border border-[#001F3F]/10 rounded-2xl px-6 py-4 text-[#001F3F] focus:outline-none focus:border-[#001F3F] focus:bg-white transition-all" 
                    placeholder="John Doe" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-mono uppercase text-[#001F3F]/40 ml-2">Email</label>
                  <input 
                    type="email" 
                    className="w-full bg-[#FDFCF0]/50 border border-[#001F3F]/10 rounded-2xl px-6 py-4 text-[#001F3F] focus:outline-none focus:border-[#001F3F] focus:bg-white transition-all" 
                    placeholder="john@example.com" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-mono uppercase text-[#001F3F]/40 ml-2">Message</label>
                <textarea 
                  rows={4} 
                  className="w-full bg-[#FDFCF0]/50 border border-[#001F3F]/10 rounded-3xl px-6 py-4 text-[#001F3F] focus:outline-none focus:border-[#001F3F] focus:bg-white transition-all resize-none" 
                  placeholder="Your message here..."
                ></textarea>
              </div>

              <button className="w-full group relative overflow-hidden bg-[#001F3F] py-5 md:py-6 rounded-2xl font-black text-[#FDFCF0] uppercase italic transition-all active:scale-[0.98] shadow-xl hover:shadow-[#001F3F]/20">
                <span className="relative z-10 flex items-center justify-center gap-3 tracking-widest text-sm md:text-base">
                  {lang === 'hi' ? "अभी भेजें" : "Transmit Now"}
                  <Send className="w-5 h-5 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-[#002d5c] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;