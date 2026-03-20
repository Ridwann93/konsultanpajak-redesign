'use client';

import { useState, useEffect } from "react";
import { supabase } from "@/app/lib/supabase";
import { UserCog, ShieldCheck, Mail, UserPlus, Trash2, X, Loader2 } from 'lucide-react';

export default function UsersPage() {
    const [adminUsers, setAdminUsers] = useState<any[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: 'staff',
        password: ''
    });

    const fetchUsers = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('users')
            .select('id, name, email, role, created_at')
            .order('created_at', { ascending: false });

        if (!error) setAdminUsers(data || []);
        setLoading(false);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const response = await fetch('/api/create-admin', {
            method: 'POST',
            body: JSON.stringify(formData),
        });

        const result = await response.json();

        if (!response.ok) {
            alert("Gagal: " + result.error);
        } else {
            alert("Berhasil menambah users ke sistem!");
            setIsModalOpen(false);
            setFormData({ name: '', email: '', role: 'staff', password: '' });
            fetchUsers();
        }
        setLoading(false);
    };

    const handleDelete = async (id: string, name: string) => {
        if (confirm(`Apakah Anda yakin ingin menghapus akses login dan data untuk ${name}?`)) {
            setDeleteLoading(id);

            try {
                const response = await fetch('/api/delete-admin', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id }),
                });

                const result = await response.json();

                if (!response.ok) {
                    throw new Error(result.error);
                }

                alert("Akses admin berhasil dicabut sepenuhnya!");
                fetchUsers(); 
            } catch (error: any) {
                alert("Gagal menghapus: " + error.message);
            } finally {
                setDeleteLoading(null);
            }
        }
    };

    return (
        <div className="p-8 bg-slate-50 min-h-screen space-y-8 relative">
            <div className="flex justify-between items-end">
                <div>
                    <div className="flex items-center gap-3">
                        <UserCog className="w-8 h-8 text-slate-800" />
                        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Users Management</h1>
                    </div>
                    <p className="text-slate-500 mt-2 font-medium">Mengatur siapa yang bisa login dan menggunakan CRM.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-md active:scale-95"
                >
                    <UserPlus size={20} />
                    Tambah Admin
                </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden text-slate-900">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50 text-slate-600 text-xs uppercase tracking-widest border-b border-slate-100">
                                <th className="py-5 px-6 font-black">Name</th>
                                <th className="py-5 px-6 font-black">Email</th>
                                <th className="py-5 px-6 font-black">Role</th>
                                <th className="py-5 px-6 font-black text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-sm">
                            {loading ? (
                                <tr><td colSpan={4} className="py-20 text-center text-slate-400 font-bold">Memuat Data Admin...</td></tr>
                            ) : adminUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-slate-50/80 transition-colors group">
                                    <td className="py-4 px-6 font-bold text-slate-800 uppercase tracking-tight">{user.name}</td>
                                    <td className="py-4 px-6 text-slate-600 font-medium">{user.email}</td>
                                    <td className="py-4 px-6">
                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase ${user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                                            }`}>
                                            <ShieldCheck size={12} />
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-center">
                                        <button
                                            onClick={() => handleDelete(user.id, user.name)}
                                            disabled={deleteLoading === user.id}
                                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all disabled:opacity-50"
                                        >
                                            {deleteLoading === user.id ? <Loader2 size={18} className="animate-spin" /> : <Trash2 size={18} />}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {!loading && adminUsers.length === 0 && (
                                <tr><td colSpan={4} className="py-20 text-center text-slate-400">Belum ada admin terdaftar.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal Tambah Admin */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white">
                            <h2 className="text-xl font-bold text-slate-800">Tambah Admin Baru</h2>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-5 bg-white">
                            <div>
                                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Nama Lengkap</label>
                                <input
                                    required name="name" value={formData.name} onChange={handleChange}
                                    type="text" placeholder="Masukkan nama admin"
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-slate-900 font-medium"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Alamat Email</label>
                                <input
                                    required name="email" value={formData.email} onChange={handleChange}
                                    type="email" placeholder="email@perusahaan.com"
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-slate-900 font-medium"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Password Login</label>
                                <input
                                    required
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    type="password"
                                    placeholder="Minimal 6 karakter"
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-slate-900 font-medium"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Role Akses</label>
                                <select
                                    name="role" value={formData.role} onChange={handleChange}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-slate-900 font-bold"
                                >
                                    <option value="staff">Staff (Akses Terbatas)</option>
                                    <option value="admin">Super Admin (Akses Penuh)</option>
                                </select>
                            </div>

                            <div className="pt-4 flex gap-3">
                                <button
                                    type="button" onClick={() => setIsModalOpen(false)}
                                    className="flex-1 px-4 py-3 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-3 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-lg active:scale-95"
                                >
                                    Simpan Admin
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}