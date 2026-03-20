'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/app/lib/supabase';
import { Eye, MessageCircle, Mail, Search, User, Building2, Calendar } from 'lucide-react';

export default function ClientsPage() {
    const [clients, setClients] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedClient, setSelectedClient] = useState<any>(null);

    const fetchClients = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('clients')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setClients(data || []);
        } catch (error: any) {
            console.error('Error fetching clients:', error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchClients();
    }, []);

    const filteredClients = clients.filter((client) =>
        client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* HEADER & SEARCH */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Daftar Client</h1>
                    <p className="text-sm text-gray-500">Manajemen klien aktif Konsultan Pajak.</p>
                </div>

                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                    <input
                        type="text"
                        placeholder="Cari nama atau email..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 pr-4 py-2 border border-slate-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm w-full md:w-80 text-black"
                    />
                </div>
            </div>

            {/* TABLE */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-100">
                            <th className="px-6 py-4 text-sm font-semibold text-gray-600">Nama Client</th>
                            <th className="px-6 py-4 text-sm font-semibold text-gray-600">Kontak</th>
                            <th className="px-6 py-4 text-sm font-semibold text-gray-600">Tanggal Gabung</th>
                            <th className="px-6 py-4 text-sm font-semibold text-gray-600 text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {loading ? (
                            <tr>
                                <td colSpan={4} className="px-6 py-10 text-center text-gray-500">Memuat data klien...</td>
                            </tr>
                        ) : filteredClients.length > 0 ? (
                            filteredClients.map((client) => (
                                <tr key={client.id} className="hover:bg-gray-50 transition-colors text-sm">
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-gray-900">{client.name}</div>            
                                        <div className="text-gray-900">{client.email}</div>                        </td>
                                    <td className="px-6 py-4">
                                        
                                        <div className="text-sm text-gray-500">{client.phone || '-'}</div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-500">
                                        {new Date(client.created_at).toLocaleDateString('id-ID')}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex justify-center gap-2">
                                            {/* TOMBOL WHATSAPP */}
                                            <button
                                                onClick={() => window.open(`https://wa.me/${client.phone?.replace(/\D/g, '')}`, '_blank')}
                                                className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                                title="WhatsApp"
                                                disabled={!client.phone}
                                            >
                                                <MessageCircle size={20} />
                                            </button>

                                            {/* TOMBOL EMAIL (TAMBAHAN BARU) */}
                                            <button
                                                onClick={() => {
                                                    const subject = encodeURIComponent("Tindak Lanjut Layanan Nusa Indo Technology");
                                                    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${client.email}&su=${subject}`;
                                                    window.open(gmailUrl, '_blank');
                                                }}
                                                className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                                                title="Kirim Email"
                                                disabled={!client.email}
                                            >
                                                <Mail size={20} />
                                            </button>

                                            {/* TOMBOL DETAIL */}
                                            <button
                                                onClick={() => setSelectedClient(client)}
                                                className="p-2 text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
                                                title="Detail Client"
                                            >
                                                <Eye size={20} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className="px-6 py-10 text-center text-gray-500">Klien tidak ditemukan.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* MODAL DETAIL CLIENT */}
            {selectedClient && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl max-w-2xl w-full overflow-hidden shadow-xl animate-in fade-in zoom-in duration-200 text-black">
                        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                            <h3 className="font-bold text-gray-800">Profil Lengkap Klien</h3>
                            <button onClick={() => setSelectedClient(null)} className="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
                        </div>

                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Kiri: Info Utama */}
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="p-2 bg-teal-50 rounded-lg text-teal-600"><User size={20} /></div>
                                    <div>
                                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Nama Lengkap</label>
                                        <p className="text-gray-900 font-semibold">{selectedClient.name}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="p-2 bg-purple-50 rounded-lg text-purple-600"><Mail size={20} /></div>
                                    <div>
                                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Email Bisnis</label>
                                        <p className="text-gray-900">{selectedClient.email}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Kanan: Info Tambahan */}
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="p-2 bg-orange-50 rounded-lg text-orange-600"><MessageCircle size={20} /></div>
                                    <div>
                                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">No. WhatsApp</label>
                                        <p className="text-gray-900">{selectedClient.phone || '-'}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="p-2 bg-gray-50 rounded-lg text-gray-600"><Calendar size={20} /></div>
                                    <div>
                                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Terdaftar Sejak</label>
                                        <p className="text-gray-900">
                                            {new Date(selectedClient.created_at).toLocaleDateString('id-ID', {
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric'
                                            })}
                                        </p>                                    </div>
                                </div>
                            </div>

                            {/* Catatan / Notes */}
                            <div className="md:col-span-2 border-t pt-4">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Catatan Kebutuhan Pajak</label>
                                <div className="mt-2 p-3 bg-gray-50 rounded-lg border border-gray-100 text-gray-700 text-sm italic">
                                    "{selectedClient.notes || 'Belum ada catatan aktivitas tambahan.'}"
                                </div>
                            </div>
                        </div>

                        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end">
                            <button
                                onClick={() => setSelectedClient(null)}
                                className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                            >
                                Tutup
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}