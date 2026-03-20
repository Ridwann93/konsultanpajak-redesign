'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/app/lib/supabase';
import LeadDetailModal from '../components/LeadDetailModal';
import { Eye, RotateCcw, CheckCircle, MessageSquare, Mail, MessageCircle, Trash2 } from 'lucide-react';

export default function LeadsPage() {
    const [leads, setLeads] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedLead, setSelectedLead] = useState<any>(null);
    const [userRole, setUserRole] = useState<string | null>(null); // State untuk simpan role

    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('All Status');

    const fetchLeads = async () => {
        try {
            setLoading(true);

            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                const { data: userData } = await supabase
                    .from('users')
                    .select('role')
                    .eq('id', session.user.id)
                    .single();
                if (userData) setUserRole(userData.role);
            }

            const { data, error } = await supabase
                .from('leads')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Error fetching leads:', error.message);
            } else {
                setLeads(data || []);
            }
        } finally {
            setLoading(false);
        }
    };

    const deleteLead = async (id: string | number) => {
        if (!confirm('Apakah Anda yakin ingin menghapus data lead ini? Tindakan ini tidak dapat dibatalkan.')) return;

        try {
            const { error } = await supabase
                .from('leads')
                .delete()
                .eq('id', id);

            if (error) throw error;

            setLeads(prev => prev.filter(lead => lead.id !== id));
            alert('Lead berhasil dihapus.');
        } catch (error: any) {
            alert('Gagal menghapus data: ' + error.message);
        }
    };

    const updateLeadStatus = async (id: string | number, newStatus: string) => {
        try {
            const leadToConvert = leads.find(l => l.id === id);
            if (!leadToConvert) return;

            if (newStatus === 'Converted') {
                const { data: existingClient } = await supabase
                    .from('clients')
                    .select('id')
                    .eq('lead_id', id)
                    .single();

                if (!existingClient) {
                    const { error: clientError } = await supabase
                        .from('clients')
                        .insert([
                            {
                                name: leadToConvert.name,
                                email: leadToConvert.email,
                                phone: leadToConvert.phone,
                                lead_id: leadToConvert.id,
                                notes: leadToConvert.message || ''
                            }
                        ]);

                    if (clientError) {
                        alert(`Gagal memproses Client: ${clientError.message}`);
                        return; 
                    }
                }
            } 
            else {
                const { error: deleteError } = await supabase
                    .from('clients')
                    .delete()
                    .eq('lead_id', id);

                if (deleteError) {
                    console.error('Gagal hapus client:', deleteError.message);
                }
            }

            const { error: updateError } = await supabase
                .from('leads')
                .update({ status: newStatus })
                .eq('id', id);

            if (updateError) throw updateError;

            setLeads(prevLeads =>
                prevLeads.map(lead =>
                    lead.id === id ? { ...lead, status: newStatus } : lead
                )
            );
            
            if (newStatus === 'Converted') {
                alert('Berhasil! Lead telah resmi menjadi Client.');
            } else if (newStatus === 'New') {
                alert('Status direset ke New. Data di tabel Clients telah dibersihkan.');
            }

        } catch (error: any) {
            alert('Terjadi kesalahan sistem: ' + error.message);
        }
    };

    useEffect(() => {
        fetchLeads();
    }, []);

    const filteredLeads = leads.filter((lead) => {
        const matchesSearch =
            lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (lead.phone && lead.phone.includes(searchQuery));

        const currentStatus = (lead.status || 'New').trim().toLowerCase();
        const targetFilter = statusFilter.toLowerCase();

        const matchesStatus =
            statusFilter === 'All Status' ||
            currentStatus === targetFilter;

        return matchesSearch && matchesStatus;
    });

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Manajemen Leads</h1>
                    <p className="text-sm text-gray-500">Kelola calon klien yang masuk dari form kontak.</p>
                </div>

                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        placeholder="Cari nama atau email..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="border-slate-400 text-black px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm w-64"
                    />

                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="border-slate-400 text-black px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm bg-white"
                    >
                        <option value="All Status">All Status</option>
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Converted">Converted</option>
                    </select>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-100">
                            <th className="px-6 py-4 text-sm font-semibold text-gray-600">Nama</th>
                            <th className="px-6 py-4 text-sm font-semibold text-gray-600">WhatsApp</th>
                            <th className="px-6 py-4 text-sm font-semibold text-gray-600">Status</th>
                            <th className="px-6 py-4 text-sm font-semibold text-gray-600">Tanggal</th>
                            <th className="px-6 py-4 text-sm font-semibold text-gray-600 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {loading ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-10 text-center text-gray-500">Memuat data...</td>
                            </tr>
                        ) : filteredLeads.length > 0 ? (
                            filteredLeads.map((lead) => (
                                <tr key={lead.id} className="hover:bg-gray-50 transition-colors text-sm">
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-gray-900">{lead.name}</div>
                                        <div className="text-md text-gray-500">{lead.email}</div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">
                                        {lead.phone || '-'}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${lead.status === 'Converted' ? 'bg-green-100 text-green-700' :
                                            lead.status === 'Contacted' ? 'bg-yellow-100 text-yellow-700' :
                                                'bg-blue-100 text-blue-700'
                                            }`}>
                                            {lead.status || 'New'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-500">
                                        {new Date(lead.created_at).toLocaleDateString('id-ID')}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-wrap justify-center gap-2">
                                            <button
                                                onClick={() => window.open(`https://wa.me/${lead.phone?.replace(/\D/g, '')}`, '_blank')}
                                                className="flex items-center gap-1 p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors border border-transparent hover:border-green-200"
                                                title="Chat WhatsApp"
                                                disabled={!lead.phone}
                                            >
                                                <MessageCircle size={16} />
                                                <span className="text-[10px] font-semibold uppercase">WhatsApp</span>
                                            </button>

                                            <button
                                                onClick={() => {
                                                    const subject = encodeURIComponent("Tindak Lanjut Layanan Nusa Indo Technology");
                                                    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${lead.email}&su=${subject}`;
                                                    window.open(gmailUrl, '_blank');
                                                }}
                                                className="flex items-center gap-1 p-1.5 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors border border-transparent hover:border-purple-200"
                                                title="Kirim Email"
                                                disabled={!lead.email}
                                            >
                                                <Mail size={16} />
                                                <span className="text-[10px] font-semibold uppercase">Email</span>
                                            </button>

                                            <div className="w-px h-6 bg-gray-500 mx-1 hidden md:block" />

                                            <button
                                                onClick={() => setSelectedLead(lead)}
                                                className="flex items-center gap-1 p-1.5 text-teal-600 hover:bg-teal-50 rounded-lg transition-colors border border-transparent hover:border-teal-200"
                                                title="View Detail"
                                            >
                                                <Eye size={16} />
                                                <span className="text-[10px] font-semibold uppercase">Detail</span>
                                            </button>

                                            {(lead.status || 'New').trim().toLowerCase() !== 'new' && (
                                                <button
                                                    onClick={() => updateLeadStatus(lead.id, 'New')}
                                                    className="flex items-center gap-1 p-1.5 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors border border-transparent hover:border-gray-200"
                                                    title="Reset to New"
                                                >
                                                    <RotateCcw size={16} />
                                                    <span className="text-[10px] font-semibold uppercase">Reset</span>
                                                </button>
                                            )}

                                            <button
                                                onClick={() => updateLeadStatus(lead.id, 'Converted')}
                                                className="flex items-center gap-1 p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-transparent hover:border-blue-200"
                                                title="Mark as Converted"
                                            >
                                                <CheckCircle size={16} />
                                                <span className="text-[10px] font-semibold uppercase">Convert</span>
                                            </button>

                                            <button
                                                onClick={() => updateLeadStatus(lead.id, 'Contacted')}
                                                className="flex items-center gap-1 p-1.5 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors border border-transparent hover:border-yellow-200"
                                                title="Mark as Contacted"
                                            >
                                                <MessageSquare size={16} />
                                                <span className="text-[10px] font-semibold uppercase">Contact</span>
                                            </button>

                                            {userRole === 'admin' && (
                                                <button
                                                    onClick={() => deleteLead(lead.id)}
                                                    className="flex items-center gap-1 p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-200"
                                                    title="Hapus Data"
                                                >
                                                    <Trash2 size={16} />
                                                    <span className="text-[10px] font-semibold uppercase">Hapus</span>
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="px-6 py-10 text-center text-gray-500">
                                    {searchQuery || statusFilter !== 'All Status'
                                        ? "Data tidak ditemukan dengan kriteria pencarian tersebut."
                                        : "Belum ada leads yang masuk."}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {selectedLead && (
                <LeadDetailModal
                    lead={selectedLead}
                    onClose={() => setSelectedLead(null)}
                />
            )}
        </div>
    );
}