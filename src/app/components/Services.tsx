"use client";

import React from 'react';
import { 
  FileText, 
  Calculator, 
  Scale, 
  CalendarCheck, 
  Banknote, 
  ClipboardCheck, 
  ArrowRight 
} from 'lucide-react';

const services = [
  {
    title: "Jasa Perpajakan",
    desc: "Perencanaan dan pengelolaan kewajiban pajak secara strategis untuk efisiensi bisnis Anda.",
    icon: <FileText className="text-teal-600" size={24} />,
  },
  {
    title: "Jasa Akuntansi",
    desc: "Pencatatan keuangan yang rapi, transparan, and akurat untuk pengambilan keputusan.",
    icon: <Calculator className="text-teal-600" size={24} />,
  },
  {
    title: "Kuasa Hukum Pajak",
    desc: "Pendampingan hukum pajak resmi untuk mewakili Anda dalam penyelesaian sengketa.",
    icon: <Scale className="text-teal-600" size={24} />,
  },
  {
    title: "Pendampingan SP2DK",
    desc: "Strategi klarifikasi dan pendampingan saat menerima surat dari DJP agar tetap aman.",
    icon: <CalendarCheck className="text-teal-600" size={24} />,
  },
  {
    title: "Jasa Payroll",
    desc: "Pengelolaan penggajian karyawan secara otomatis dan sesuai dengan regulasi.",
    icon: <Banknote className="text-teal-600" size={24} />,
  },
  {
    title: "Jasa SPT Tahunan",
    desc: "Penyusunan dan pelaporan SPT Tahunan agar patuh dan terhindar dari sanksi.",
    icon: <ClipboardCheck className="text-teal-600" size={24} />,
  }
];

export default function Services({ cms }: { cms: any }) {
  const data = cms || {};
  
  return (
    <section id="layanan" className="py-45 px-4 bg-gray">
      <div className="max-w-6xl mx-auto">
        
        <div className="text-center mb-20">
          <h2 className="text-teal-700 font-bold tracking-[0.2em] text-md uppercase mb-4">
            {data.services_header || "Layanan Kami"}
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            {data.services_title || "Solusi Profesional & Terpercaya"}
          </h3>
          <div className="w-20 h-1 bg-teal-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((item, idx) => {
            const dynamicTitle = data[`services_item${idx + 1}_title`] || item.title;
            const dynamicDesc = data[`services_item${idx + 1}_desc`] || item.desc;

            return (
              <div 
                key={idx}
                className="p-10 rounded-2xl border border-slate-300 bg-white hover:bg-white hover:shadow-xl hover:border-teal-400 transition-all duration-300 group"
              >
                <div className="mb-6 inline-block p-4 rounded-xl bg-white shadow-sm group-hover:text-white transition-colors duration-300">
                  <div className="group-hover:text-white transition-colors">
                    {item.icon}
                  </div>
                </div>
                <h4 className="text-xl font-bold text-slate-800 mb-4">{dynamicTitle}</h4>
                <p className="text-slate-500 leading-relaxed text-sm mb-8">
                  {dynamicDesc}
                </p>
                <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-teal-700 hover:gap-4 transition-all">
                  Learn More <ArrowRight size={14} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}