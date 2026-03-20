import { supabase } from "../lib/supabase";
import { Users, UserCheck, TrendingUp, Calendar } from 'lucide-react';

export default async function DashboardPage() {
  const [
    { count: totalLeads },
    { count: totalClients },
    { data: recentLeads }
  ] = await Promise.all([
    supabase.from('leads').select('*', { count: 'exact', head: true }),
    supabase.from('clients').select('*', { count: 'exact', head: true }),
    supabase.from('leads').select('*').order('created_at', { ascending: false }).limit(5)
  ]);

  return (
    <div className="p-8 bg-slate-50 min-h-screen space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900">Dashboard Overview</h1>
        <p className="text-slate-500 mt-1">Ringkasan aktivitas leads dan client Anda hari ini.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Total Leads" 
          value={totalLeads || 0} 
          icon={<Users size={24} className="text-blue-600" />} 
          bgColor="bg-blue-50"
        />
        <StatCard 
          title="Total Clients" 
          value={totalClients || 0} 
          icon={<UserCheck size={24} className="text-emerald-600" />} 
          bgColor="bg-emerald-50"
        />
        <StatCard 
          title="Leads Today" 
          value={0} 
          icon={<TrendingUp size={24} className="text-amber-600" />} 
          bgColor="bg-amber-50"
        />
      </div>

      {/* Recent Activity Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h2 className="text-xl font-bold text-slate-800">Recent Leads</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-slate-600 text-sm uppercase tracking-wider">
                <th className="py-4 px-6 font-semibold">Name</th>
                <th className="py-4 px-6 font-semibold">Subject</th>
                <th className="py-4 px-6 font-semibold">Status</th>
                <th className="py-4 px-6 font-semibold">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentLeads?.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="py-4 px-6 font-bold text-slate-800 uppercase tracking-tight">{lead.name}</td>
                  <td className="py-4 px-6 text-slate-600">{lead.subject}</td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                      lead.status === 'Converted' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {lead.status || 'New'}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-slate-500 text-sm font-medium">
                    {new Date(lead.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, bgColor }: { title: string, value: number, icon: React.ReactNode, bgColor: string }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between group hover:border-blue-300 transition-all cursor-default">
      <div>
        <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">{title}</p>
        <h3 className="text-4xl font-black text-slate-900 mt-2">{value}</h3>
      </div>
      <div className={`p-4 ${bgColor} rounded-xl group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
    </div>
  );
}