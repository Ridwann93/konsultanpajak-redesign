'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/app/lib/supabase';
import { User, Mail, Save, Loader2, KeyRound } from 'lucide-react';

export default function SettingsPage() {
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  
  const [userData, setUserData] = useState({
    id: '',
    name: '',
    email: '',
    role: ''
  });

  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (!error && data) {
          setUserData(data);
        }
      }
      setFetchLoading(false);
    };

    fetchUserProfile();
  }, []);

  const handleUpdateProfile = async () => {
    if (!userData.id) {
      alert("Sesi tidak valid. Silakan login kembali.");
      return;
    }

    setLoading(true);
    
    // 1. Update Nama di tabel 'users'
    const { error: profileError } = await supabase
      .from('users')
      .update({ name: userData.name })
      .eq('id', userData.id);

    if (profileError) {
      alert("Gagal update nama: " + profileError.message);
      setLoading(false);
      return;
    }

    // 2. Update Password
    if (newPassword.length > 0) {
      if (newPassword.length < 6) {
        alert("Password minimal 6 karakter!");
        setLoading(false);
        return;
      }

      const { error: passError } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (passError) {
        alert("Gagal update password: " + passError.message);
      } else {
        setNewPassword('');
        alert("Profil dan Password berhasil diperbarui!");
      }
    } else {
      alert("Profil berhasil diperbarui!");
    }

    setLoading(false);
  };

  if (fetchLoading) {
    return (
      <div className="p-8 flex items-center gap-2 text-slate-500 font-bold">
        <Loader2 className="animate-spin" /> Memuat Profil...
      </div>
    );
  }

  return (
    <div className="p-8 bg-slate-50 min-h-screen space-y-8 text-slate-900">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Account Settings</h1>
        <p className="text-slate-500 mt-2 font-medium">Kelola informasi profil dan keamanan akun Anda.</p>
      </div>

      <div className="max-w-4xl bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="md:flex">
          {/* Sidebar Profil */}
          <div className="md:w-1/3 bg-teal-600 p-8 text-white">
            <div className="w-20 h-20 bg-yellow-500 rounded-2xl flex items-center justify-center text-3xl font-black mb-4">
              {userData.name ? userData.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <h2 className="text-xl font-bold">{userData.name || 'User'}</h2>
            <p className="text-md capitalize">{userData.role ? userData.role.replace('_', ' ') : '-'}</p>
          </div>

          {/* Form Edit */}
          <div className="md:w-2/3 p-8 space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Nama Lengkap</label>
                <div className="relative">
                  <User className="absolute left-4 top-3.5 text-slate-400" size={18} />
                  <input 
                    type="text" 
                    value={userData.name}
                    placeholder="Masukkan nama Anda"
                    onChange={(e) => setUserData({...userData, name: e.target.value})}
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-bold transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Email (Tidak bisa diubah)</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-3.5 text-slate-400" size={18} />
                  <input 
                    disabled
                    type="email" 
                    value={userData.email}
                    className="w-full pl-12 pr-4 py-3 bg-slate-100 border border-slate-200 rounded-xl outline-none font-bold text-slate-400 cursor-not-allowed"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Ganti Password</label>
                <div className="relative">
                  <KeyRound className="absolute left-4 top-3.5 text-slate-400" size={18} />
                  <input 
                    type="password" 
                    placeholder="Masukkan password baru"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-bold transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button 
                onClick={handleUpdateProfile}
                disabled={loading || !userData.id}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold transition-all active:scale-95 disabled:opacity-50"
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                Simpan Perubahan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}