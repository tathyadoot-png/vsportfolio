"use client";
import React from 'react';
import { contactData } from "@/app/data/contact";
import { useLanguage } from "@/app/context/LanguageContext";
// import { Phone, Mail, Globe, MapPin, Send, MessageSquare, Twitter, Instagram, Linkedin } from "lucide-react";
import SectionHeader from '../ui/SectionHeader';
import {
  Phone,
  Mail,
  Globe,
  MapPin,
  Send,
  MessageSquare,
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
      color: "from-blue-500/20 to-transparent"
    },
    { 
      icon: Mail, 
      label: lang === 'hi' ? "ईमेल" : "Email", 
      value: data.email, 
      link: `mailto:${data.email}`,
      color: "from-orange-500/20 to-transparent"
    },
    { 
      icon: Globe, 
      label: lang === 'hi' ? "वेबसाइट" : "Website", 
      value: data.website, 
      link: `https://${data.website}`,
      color: "from-purple-500/20 to-transparent"
    },
  ];

  return (
    <section id='contact'  className="relative bg-black py-24 overflow-hidden min-h-screen flex flex-col justify-center">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-[10%] left-[-5%] w-96 h-96 bg-orange-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] right-[-5%] w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 mx-auto px-6 w-full">
        <SectionHeader title={data.title} subtitle="Get In Touch" />

        <div className="mt-16 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* LEFT: Quick Contact Cards (Bento Style) */}
          <div className="lg:col-span-5 grid grid-cols-1 gap-6">
            {contactItems.map((item, idx) => (
              <a 
                href={item.link} 
                key={idx}
                className={`group relative overflow-hidden bg-white/[0.03] border border-white/10 p-8 rounded-[2rem] transition-all duration-500 hover:border-orange-600/50 hover:bg-white/[0.05]`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <div className="relative z-10 flex items-center gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-black border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:border-orange-600/50 transition-all duration-500">
                    <item.icon className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-xs font-mono uppercase  text-white/40 mb-1">{item.label}</p>
                    <h4 className="text-xl md:text-2xl font-bold text-white ">{item.value}</h4>
                  </div>
                </div>
              </a>
            ))}

            {/* Social Connect Small Grid */}
            <div className="grid grid-cols-3 gap-4">
             {[X, Globe, Mail].map((Icon, i) => (
                <div key={i} className="h-20 bg-white/[0.03] border border-white/10 rounded-[1.5rem] flex items-center justify-center hover:bg-orange-600 group transition-all duration-500 cursor-pointer">
                  <Icon className="w-6 h-6 text-white group-hover:scale-125 transition-transform" />
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Modern Contact Form */}
          <div className="lg:col-span-7 bg-white/[0.02] border border-white/10 p-8 md:p-12 rounded-[3rem] relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
                <Send className="w-32 h-32 -rotate-12" />
            </div>

            <h3 className="text-3xl font-black text-white uppercase italic mb-8 ">
              {lang === 'hi' ? "संदेश भेजें" : "Send a Message"}
            </h3>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-mono uppercase  text-white/40 ml-2">Name</label>
                  <input type="text" className="w-full bg-black/50 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-orange-600 transition-colors" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-mono uppercase  text-white/40 ml-2">Email</label>
                  <input type="email" className="w-full bg-black/50 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-orange-600 transition-colors" placeholder="john@example.com" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-mono uppercase  text-white/40 ml-2">Message</label>
                <textarea rows={4} className="w-full bg-black/50 border border-white/10 rounded-3xl px-6 py-4 text-white focus:outline-none focus:border-orange-600 transition-colors resize-none" placeholder="Your message here..."></textarea>
              </div>

              <button className="w-full group relative overflow-hidden bg-orange-600 py-6 rounded-2xl font-black text-white uppercase  italic transition-all hover:bg-orange-700 active:scale-[0.98]">
                <span className="relative z-10 flex items-center justify-center gap-3">
                  {lang === 'hi' ? "अभी भेजें" : "Transmit Now"}
                  <Send className="w-5 h-5 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
                </span>
              </button>
            </form>
          </div>

        </div>
      </div>

      {/* Footer Branding Text */}
     
    </section>
  )
}

export default Contact