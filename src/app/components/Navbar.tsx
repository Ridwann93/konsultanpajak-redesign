"use client";

import React, { useState, useEffect } from 'react';
import { Instagram, Linkedin, Phone } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("beranda");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      const sections = ["beranda", "layanan", "tentang", "kontak"];
      const scrollPosition = window.scrollY + 150;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) return null;

  const navLinks = [
    { name: "Beranda", id: "beranda" },
    { name: "Layanan", id: "layanan" },
    { name: "Tentang", id: "tentang" },
    { name: "Kontak", id: "kontak" },
  ];

  return (
    <nav className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
      <div className="bg-white/80 backdrop-blur-md shadow-sm border border-slate-100 rounded-full px-6 h-20 flex items-center justify-between w-full max-w-5xl">
        
        <Link href="#beranda" className="flex items-center transition-transform hover:scale-105">
          <Image 
            src="/konsultanpajak-logo1.png" 
            alt="Logo Konsultan Pajak" 
            width={180} 
            height={40} 
            className="h-10 w-auto md:h-25 pt-2" 
            priority
          />
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navLinks.map((link) => (
            <Link 
              key={link.id} 
              href={`#${link.id}`}
              className={`transition-all duration-300 ${
                activeSection === link.id 
                ? "text-teal-700 font-bold scale-105" 
                : "text-slate-600 hover:text-teal-700"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-3 text-slate-500">
            <Link href="#" className="hover:text-teal-600"><Instagram size={18} /></Link>
            <Link href="#" className="hover:text-teal-600"><Linkedin size={18} /></Link>
          </div>
          <Link href="https://wa.me/6285353041213" className="bg-teal-700 hover:bg-teal-800 text-white px-5 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2">
            <Phone size={16} />
            Hubungi Kami
          </Link>
        </div>
      </div>
    </nav>
  );
}