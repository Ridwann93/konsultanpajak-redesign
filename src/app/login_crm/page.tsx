'use client';

import { useState } from 'react';
import { supabase } from '@/app/lib/supabase';
import { useRouter } from 'next/navigation';
import { LogIn, Mail, Lock, Loader2, Shield } from 'lucide-react';

export default function LoginCRMPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert("Login Gagal: " + error.message);
      setLoading(false);
    } else {
      router.push('/crm');
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-slate-900 font-sans">
      <div className="max-w-md w-full space-y-8">
        
        {/* Header Identitas */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-600 text-white rounded-2xl shadow-xl mb-4">
            <Shield size={32} />
          </div>
          <h1 className="text-4xl font-black tracking-tighter uppercase">CRM Access</h1>
          <p className="text-slate-500 font-medium">Khusus Admin & Staff Internal</p>
        </div>

        {/* Card Login */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-2xl space-y-6">
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 ml-1">Email Internal</label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 text-slate-400" size={18} />
                <input 
                  type="email" 
                  required
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-slate-900 outline-none font-bold transition-all placeholder:text-slate-300"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 text-slate-400" size={18} />
                <input 
                  type="password" 
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-slate-900 outline-none font-bold transition-all placeholder:text-slate-300"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 bg-teal-600 hover:bg-black text-white py-4 rounded-2xl font-black text-lg shadow-lg transition-all active:scale-[0.97] disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" size={22} /> : <LogIn size={22} />}
              MASUK KE DASHBOARD
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}