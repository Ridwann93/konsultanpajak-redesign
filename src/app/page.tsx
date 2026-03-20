"use client";

import { useEffect, useState } from 'react';
import { supabase } from './lib/supabase';
import { XCircle, CheckCircle2, ArrowRight } from 'lucide-react';
import Navbar from './components/Navbar'; 
import Services from './components/Services';
import About from './components/About';
import Contact from './components/Contact';

export default function Home() {
  const [cms, setCms] = useState<any>({});

  useEffect(() => {
    async function getLandingContent() {
      const { data, error } = await supabase
        .from('landing_contents')
        .select('section_name, content_key, content_value');
      
      if (data && !error) {
        const formatted = data.reduce((acc: any, item: any) => {
          const key = `${item.section_name.toLowerCase()}_${item.content_key.toLowerCase()}`;
          acc[key] = item.content_value;
          return acc;
        }, {});
        
        console.log("Data CMS Berhasil Ditarik:", formatted); 
        setCms(formatted);
      }
    }
    getLandingContent();
  }, []);

  return (
    <div className="bg-white min-h-screen font-sans text-slate-800 scroll-smooth">
      <Navbar />

      {/* SECTION 1 - HERO */}
      <section 
        id="beranda" 
        className="min-h-screen flex flex-col justify-center items-center text-center px-4 relative overflow-hidden pt-20 animate-bg-bergerak"
      >
        <div className="absolute inset-0 bg-black/5 backdrop-blur-[1px] -z-10"></div>
        
        <h1 className="text-5xl md:text-8xl font-extrabold tracking-tight text-white mb-6 max-w-5xl drop-shadow-md">
          {cms.hero_title || "Jasa Konsultan Pajak Terbaik & Terpercaya"}
        </h1>

        <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl font-bold drop-shadow-sm">
          {cms.hero_subtitle || "Kami memberikan garansi aman, terkontrol, dan terpercaya untuk setiap urusan perpajakan dan laporan keuangan bisnis Anda."}
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button className="px-8 py-4 bg-white text-teal-800 hover:scale-105 transition-transform rounded-full font-bold shadow-xl flex items-center gap-2">
            Konsultasi Gratis <ArrowRight size={18} />
          </button>
          <button className="px-8 py-4 bg-transparent backdrop-blur-md hover:bg-white text-white hover:text-teal-800 border border-white/40 rounded-full font-semibold transition-all">
            Lihat Layanan Kami
          </button>
        </div>
      </section>

      {/* SECTION 2 - PROBLEMS & SOLUTIONS */}
      <section id="" className="flex flex-col justify-center px-4 pt-60 bg-slate-50">
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-24">
            
            <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-200">
              <h2 className="text-4xl font-bold text-slate-800 mb-8 pb-4 border-b border-slate-100">
                {cms.problem_title || "Masalah yang Sering Terjadi"}
              </h2>
              <ul className="space-y-6 text-lg">
                {[
                  "Gak ngerti aturan pajak yang sering berubah.",
                  "Takut salah lapor dan kena denda.",
                  "Pembukuan berantakan, bingung hitung laba.",
                  "Gak punya waktu urus administrasi."
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <XCircle className="text-red-400 shrink-0 mt-0.5" />
                    <span className="text-slate-600 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-teal-700 p-8 md:p-12 rounded-3xl shadow-xl text-white flex flex-col justify-center">
              <p className="text-white font-semibold mb-2">Tenang, Anda tidak sendirian</p>
              <h2 className="text-3xl font-bold mb-8">
                {cms.solution_title || "Apa yang Anda Dapatkan?"}
              </h2>
              <ul className="space-y-6">
                {[
                  "Laporan keuangan rapi tiap bulan",
                  "Pajak aman & terpantau",
                  "Pendampingan SP2DK & pemeriksaan tanpa panik",
                  "Konsultasi tak terbatas selama bekerja sama",
                  "Harga terjangkau khusus UMKM"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <CheckCircle2 className="text-sky-300 shrink-0 mt-0.5" />
                    <span className="font-medium text-white">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 3 - SKILLS/EXPERIENCE */}
      <section id="" className="flex flex-col justify-center px-4 py-20 bg-teal-50/50">
        <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center">
          
          <div>
            <div className="text-teal-700 font-bold tracking-wider text-sm mb-4 uppercase">
              Pengalaman Kami
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
              "Tim kami sudah bersertifikasi dari DJP serta berpengalaman."
            </h2>
            <p className="mt-6 text-slate-500 text-lg">
              "Kami telah membantu berbagai skala perusahaan dalam mengelola konsultasi pajak dan merapikan laporan keuangan mereka dengan akurasi tinggi."
            </p>
          </div>

          <div className="space-y-10 bg-white p-10 rounded-3xl shadow-sm border border-slate-100">
            {[
              { label: "Konsultan Pajak", value: 95 },
              { label: "Konsultan Laporan Keuangan", value: 90 },
              { label: "Konsultasi Pajak", value: 90 },
            ].map((skill, idx) => (
              <div key={idx}>
                <div className="flex justify-between font-bold text-slate-700 mb-3">
                  <span>{skill.label}</span>
                  <span className="text-teal-700">{skill.value}/100</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-3">
                  <div 
                    className="bg-teal-700 h-3 rounded-full" 
                    style={{ width: `${skill.value}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      <Services cms={cms} />
      <About cms={cms} />
      <Contact cms={cms} />

      <footer className="py-12 px-4 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-slate-400 text-sm tracking-wide">
            Copyright © 2026 by <span className="text-slate-600 font-medium">konsultanpajakdanpembukuan.com</span>
          </p>
        </div>
      </footer>
    </div>
  );
}