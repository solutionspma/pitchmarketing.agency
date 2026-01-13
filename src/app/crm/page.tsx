'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Stats {
  totalClients: number;
  eliteClients: number;
  todayBookings: number;
  pendingBookings: number;
  weekBookings: number;
  completedBookings: number;
}

interface Booking {
  id: string;
  name: string;
  email: string;
  service: string;
  date: string;
  time: string;
  status: string;
  created_at: string;
}

export default function CRMDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalClients: 0,
    eliteClients: 0,
    todayBookings: 0,
    pendingBookings: 0,
    weekBookings: 0,
    completedBookings: 0,
  });
  const [recentBookings, setRecentBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const today = new Date().toISOString().split('T')[0];
      const weekFromNow = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

      const [clientsRes, eliteRes, todayRes, pendingRes, weekRes, completedRes, bookingsRes] = await Promise.all([
        supabase.from('clients').select('id', { count: 'exact' }),
        supabase.from('clients').select('id', { count: 'exact' }).eq('elite', true),
        supabase.from('bookings').select('id', { count: 'exact' }).eq('date', today),
        supabase.from('bookings').select('id', { count: 'exact' }).eq('status', 'pending'),
        supabase.from('bookings').select('id', { count: 'exact' }).gte('date', today).lte('date', weekFromNow),
        supabase.from('bookings').select('id', { count: 'exact' }).eq('status', 'completed'),
        supabase.from('bookings').select('*').order('created_at', { ascending: false }).limit(5),
      ]);

      setStats({
        totalClients: clientsRes.count || 0,
        eliteClients: eliteRes.count || 0,
        todayBookings: todayRes.count || 0,
        pendingBookings: pendingRes.count || 0,
        weekBookings: weekRes.count || 0,
        completedBookings: completedRes.count || 0,
      });

      setRecentBookings(bookingsRes.data || []);
      setLoading(false);
    }

    fetchData();
  }, []);

  const updateBookingStatus = async (id: string, status: string) => {
    await supabase.from('bookings').update({ status }).eq('id', id);
    setRecentBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status } : b))
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="flex items-center gap-3 text-gray-400">
          <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <span>Loading dashboard...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-500 mt-1">Overview of your client relationships and bookings</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-10">
        <StatCard title="Total Clients" value={stats.totalClients} icon="👥" />
        <StatCard title="Elite Clients" value={stats.eliteClients} icon="⭐" highlight />
        <StatCard title="Today" value={stats.todayBookings} icon="📅" />
        <StatCard title="This Week" value={stats.weekBookings} icon="📆" />
        <StatCard title="Pending" value={stats.pendingBookings} icon="⏳" />
        <StatCard title="Completed" value={stats.completedBookings} icon="✓" />
      </div>

      {/* Recent Bookings */}
      <div className="bg-pitch-dark border border-white/10 rounded-2xl overflow-hidden">
        <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">Recent Bookings</h2>
            <p className="text-gray-500 text-sm">Latest consultation requests</p>
          </div>
          <a href="/crm/bookings" className="text-pitch-gold text-sm hover:underline">View All →</a>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Client</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Service</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Schedule</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {recentBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-white/5 transition">
                  <td className="px-6 py-4">
                    <div className="font-medium text-white">{booking.name}</div>
                    <div className="text-sm text-gray-500">{booking.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-300 capitalize">{booking.service?.replace(/-/g, ' ')}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-gray-300">{booking.date}</div>
                    <div className="text-sm text-gray-500">{booking.time}</div>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={booking.status} />
                  </td>
                  <td className="px-6 py-4 text-right">
                    {booking.status === 'pending' && (
                      <div className="flex gap-2 justify-end">
                        <button
                          onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                          className="px-3 py-1.5 text-xs font-medium bg-green-500/10 text-green-400 rounded-lg hover:bg-green-500/20 transition"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                          className="px-3 py-1.5 text-xs font-medium bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition"
                        >
                          Decline
                        </button>
                      </div>
                    )}
                    {booking.status === 'confirmed' && (
                      <button
                        onClick={() => updateBookingStatus(booking.id, 'completed')}
                        className="px-3 py-1.5 text-xs font-medium bg-pitch-gold/10 text-pitch-gold rounded-lg hover:bg-pitch-gold/20 transition"
                      >
                        Complete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {recentBookings.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    <div className="text-4xl mb-3">📅</div>
                    <p>No bookings yet</p>
                    <p className="text-sm mt-1">New consultation requests will appear here</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, highlight }: { title: string; value: number; icon: string; highlight?: boolean }) {
  return (
    <div className={`bg-pitch-dark border rounded-xl p-5 ${highlight ? 'border-pitch-gold/30' : 'border-white/10'}`}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-2xl">{icon}</span>
        {highlight && <span className="text-xs text-pitch-gold font-semibold">PREMIUM</span>}
      </div>
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="text-gray-500 text-sm mt-1">{title}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    pending: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    confirmed: 'bg-green-500/10 text-green-400 border-green-500/20',
    cancelled: 'bg-red-500/10 text-red-400 border-red-500/20',
    completed: 'bg-pitch-gold/10 text-pitch-gold border-pitch-gold/20',
  };

  return (
    <span className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-full border ${styles[status] || 'bg-gray-500/10 text-gray-400 border-gray-500/20'}`}>
      {status}
    </span>
  );
}
