"use client";

import { Target, Rocket, ShieldCheck } from 'lucide-react';

export default function About() {
  return (
    <section id="tentang" className="py-40 px-4 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <div className="relative">
            <div className="absolute -top-10 -left-10 w-64 h-64 bg-teal-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-sky-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
            
            <div className="relative bg-slate-50 border border-slate-100 rounded-[3rem] p-8 md:p-12 shadow-sm overflow-hidden">
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                  <path fill="#0D9488" d="M40,-62.1C53.3,-54.5,66.7,-45.2,73.1,-32.8C79.5,-20.5,78.9,-5.1,75.4,9.2C71.8,23.5,65.3,36.7,55.5,47.7C45.7,58.7,32.7,67.5,18.5,71.4C4.3,75.3,-11.1,74.3,-25.2,69C-39.3,63.7,-52,54.1,-61.1,41.9C-70.2,29.7,-75.7,14.8,-75.4,0.2C-75.1,-14.5,-68.9,-28.9,-59.1,-40.4C-49.3,-51.9,-35.8,-60.4,-22.2,-67.8C-8.6,-75.1,5.1,-81.3,19.3,-80.6C33.5,-79.8,47,-72.1,40,-62.1Z" transform="translate(100 100)" />
                </svg>
              </div>

              <div className="relative z-10 text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-teal-600 text-white shadow-xl mb-8 rotate-3 hover:rotate-0 transition-transform duration-500">
                  <ShieldCheck size={40} />
                </div>
                <h4 className="text-2xl font-bold text-slate-800 mb-4">Konsultan Terpercaya</h4>
                <p className="text-slate-500 leading-relaxed">
                  Lebih dari sekadar angka, kami adalah mitra strategis dalam menjaga kepatuhan dan pertumbuhan bisnis Anda di Indonesia.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-teal-700 font-bold tracking-[0.2em] text-xs uppercase mb-4">
              Tentang Kami
            </h2>
            <h3 className="text-4xl font-extrabold text-slate-900 leading-tight mb-6">
              Membangun Fondasi Finansial Bisnis yang <span className="text-teal-600">Kokoh & Transparan</span>
            </h3>
            <p className="text-slate-600 text-lg leading-relaxed mb-10">
              <span className="font-bold text-slate-800">KonsultanPajakdanPembukuan.com</span> adalah layanan profesional yang fokus membantu UMKM, startup, dan perusahaan berkembang dalam mengelola kewajiban perpajakan serta pembukuan usaha secara rapi dan aman.
            </p>

            <div className="space-y-8">
              {/* Visi */}
              <div className="flex gap-6 group">
                <div className="shrink-0 w-14 h-14 rounded-2xl bg-teal-50 flex items-center justify-center text-teal-600 group-hover:bg-teal-600 group-hover:text-white transition-all duration-300">
                  <Target size={28} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-800 mb-2">Visi Kami</h4>
                  <p className="text-slate-500 leading-relaxed">
                    Menjadi mitra terpercaya bagi pelaku usaha Indonesia dalam urusan perpajakan dan pembukuan dengan mengedepankan akurasi, kepatuhan, dan pelayanan profesional.
                  </p>
                </div>
              </div>

              {/* Misi */}
              <div className="flex gap-6 group">
                <div className="shrink-0 w-14 h-14 rounded-2xl bg-sky-50 flex items-center justify-center text-sky-600 group-hover:bg-sky-600 group-hover:text-white transition-all duration-300">
                  <Rocket size={28} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-800 mb-2">Misi Kami</h4>
                  <p className="text-slate-500 leading-relaxed">
                    Memberikan layanan perpajakan yang mudah dipahami, transparan, dan membantu bisnis memiliki laporan keuangan yang rapi serta dapat dipertanggungjawabkan.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}