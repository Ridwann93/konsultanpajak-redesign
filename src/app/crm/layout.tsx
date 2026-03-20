'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; 
import { supabase } from '@/app/lib/supabase';
import { 
  LayoutDashboard, 
  Mail, 
  Users, 
  ShieldCheck, 
  Settings, 
  Globe
} from 'lucide-react';

export default function CRMLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [role, setRole] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const pathname = usePathname(); 

  useEffect(() => {
    const fetchUserData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data } = await supabase
          .from('users')
          .select('role, name')
          .eq('id', session.user.id)
          .single();
        
        if (data) {
          setRole(data.role);
          setUserName(data.name);
        }
      }
    };
    fetchUserData();
  }, []);

  const menuItems = [
    { name: 'Dashboard', href: '/crm', icon: <LayoutDashboard size={20} /> },
    { name: 'Leads', href: '/crm/leads', icon: <Mail size={20} /> },
    { name: 'Clients', href: '/crm/clients', icon: <Users size={20} /> },
    { name: 'Users', href: '/crm/users', icon: <ShieldCheck size={20} />, adminOnly: true },
    { name: 'Settings', href: '/crm/settings', icon: <Settings size={20} /> },
    { name: 'CMS', href: '/crm/cms-landing', icon: <Globe size={20} />, adminOnly: true },
  ];

  const filteredMenu = menuItems.filter(item => {
    if (item.adminOnly && role !== 'admin') return false;
    return true;
  });

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-teal-600 text-white flex flex-col shadow-xl">
        <div className="p-6 text-2xl font-black border-b border-teal-500 tracking-tighter">
          <span className="text-yellow-400 font-black">KonsultanPajak</span> CRM
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {filteredMenu.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link 
                key={item.name} 
                href={item.href}
                className={`flex items-center p-3 rounded-xl font-bold transition-all active:scale-95 ${
                  isActive 
                    ? 'bg-teal-700 text-yellow-300 shadow-inner' 
                    : 'hover:bg-teal-700 hover:text-yellow-300'  
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* User Info */}
        <div className="p-4 border-t border-teal-500 bg-teal-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-yellow-500 border-2 border-yellow-400 flex items-center justify-center font-black">
              {userName ? userName.substring(0, 2).toUpperCase() : '...'}
            </div>
            <div>
              <p className="text-sm font-bold text-white leading-none">
                {userName || 'Loading...'}
              </p>
              <p className="text-[10px] uppercase font-black text-blue-200 tracking-widest mt-1">
                {role ? role.replace('_', ' ') : 'Loading...'}
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white shadow-sm border-b flex items-center justify-between px-8">
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">Manajemen Konsultan</h2>
          <div className="flex space-x-3">
             <button 
               onClick={async () => {
                 await supabase.auth.signOut();
                 window.location.href = '/login_crm';
               }}
               className="px-5 py-2 bg-yellow-400 text-slate-900 font-black rounded-xl hover:bg-yellow-500 text-sm shadow-sm transition-all active:scale-95"
             >
                LOGOUT
             </button>
          </div>
        </header>

        <section className="flex-1 overflow-y-auto p-8 bg-slate-50">
          {children}
        </section>
      </main>
    </div>
  );
}