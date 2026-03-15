"use client";

import React from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Instagram, 
  Linkedin, 
  Send 
} from 'lucide-react';

export default function Contact() {
  return (
    <section id="kontak" className="py-38 px-4 bg-slate-50/50">
      <div className="max-w-6xl mx-auto">
        
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          <div>
            <h2 className="text-teal-700 font-bold tracking-[0.2em] text-xs uppercase mb-4">
              Hubungi Kami
            </h2>
            <h3 className="text-4xl font-extrabold text-slate-900 mb-8">
              Siap Membantu <span className="text-teal-600">Bisnis Anda</span> Bertumbuh
            </h3>
            
            <div className="grid sm:grid-cols-2 gap-8 mb-12">
              {/* Jam Operasional */}
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-slate-800 uppercase tracking-widest flex items-center gap-2">
                  <Clock size={16} className="text-teal-600" /> Opening Hours
                </h4>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Senin - Jumat<br />
                  08:00 AM - 05:00 PM
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-bold text-slate-800 uppercase tracking-widest flex items-center gap-2">
                   Social Media
                </h4>
                <div className="flex gap-3">
                  {[
                    { icon: <Instagram size={18} />, link: "#" },
                    { icon: <Linkedin size={18} />, link: "#" },
                    { icon: <Phone size={18} />, link: "#" }
                  ].map((social, i) => (
                    <a key={i} href={social.link} className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-teal-600 hover:text-white hover:border-teal-600 transition-all shadow-sm">
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6 border-t border-slate-200 pt-8">
              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center text-teal-600 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter mb-1">Telepon / WhatsApp</p>
                  <p className="text-slate-800 font-medium">(+62) 853-5304-1213</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center text-teal-600 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter mb-1">Email Resmi</p>
                  <p className="text-slate-800 font-medium lowercase">hallo@konsultanpajakdanpembukuan.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center text-teal-600 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter mb-1">Lokasi Kantor</p>
                  <div className="text-slate-800 font-medium space-y-3">
                    <p>Sovereign Plaza, Cilandak Bar., Jakarta Selatan</p>
                    <p>Summarecon Bekasi, Marga Mulya, Bekasi Utara</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Nama Lengkap</label>
                  <input type="text" placeholder="nama lengkap anda" className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/5 outline-none transition-all text-slate-800" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Email</label>
                  <input type="email" placeholder="supri@example.com" className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/5 outline-none transition-all text-slate-800" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Subjek</label>
                <input type="text" placeholder="Konsultasi Pajak UMKM" className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/5 outline-none transition-all text-slate-800" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Pesan Anda</label>
                <textarea rows={4} placeholder="Ceritakan kebutuhan bisnis Anda..." className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/5 outline-none transition-all text-slate-800 resize-none"></textarea>
              </div>
              <button className="w-full py-4 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-2xl shadow-lg shadow-teal-600/20 flex items-center justify-center gap-3 transition-all transform hover:-translate-y-1">
                Kirim Pesan <Send size={18} />
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}