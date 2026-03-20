'use client';

interface Lead {
  id: number;
  name: string;
  email: string;
  subject: string;
  message?: string; 
  status: string;
  created_at: string;
}

export default function LeadDetailModal({ lead, onClose }: { lead: Lead; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-lg w-full overflow-hidden shadow-xl animate-in fade-in zoom-in duration-200">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <h3 className="font-bold text-gray-800">Detail Calon Klien</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
        </div>
        
        <div className="p-6 space-y-4">
          <div>
            <label className="text-xs font-semibold text-gray-400 uppercase">Nama Lengkap</label>
            <p className="text-gray-900 font-medium">{lead.name}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-400 uppercase">Email</label>
              <p className="text-gray-900">{lead.email}</p>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-400 uppercase">Tanggal Masuk</label>
              <p className="text-gray-900">{new Date(lead.created_at).toLocaleDateString('id-ID')}</p>
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-400 uppercase">Subjek</label>
            <p className="text-gray-900 font-medium">{lead.subject}</p>
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-400 uppercase">Isi Pesan</label>
            <div className="mt-1 p-3 bg-gray-50 rounded-lg border border-gray-100 text-gray-700 text-sm whitespace-pre-wrap">
              {lead.message || "Tidak ada pesan tambahan."}
            </div>
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm font-medium"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}