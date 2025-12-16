'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface AnalyticsData {
  totalBookings: number;
  completedBookings: number;
  cancelledBookings: number;
  conversionRate: number;
  serviceBreakdown: Record<string, number>;
  weeklyBookings: { date: string; count: number }[];
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAnalytics() {
      const { data: bookings } = await supabase.from('bookings').select('*');
      
      if (!bookings) {
        setLoading(false);
        return;
      }

      const total = bookings.length;
      const completed = bookings.filter((b) => b.status === 'completed').length;
      const cancelled = bookings.filter((b) => b.status === 'cancelled').length;

      // Service breakdown
      const serviceBreakdown: Record<string, number> = {};
      bookings.forEach((b) => {
        serviceBreakdown[b.service] = (serviceBreakdown[b.service] || 0) + 1;
      });

      // Weekly bookings (last 7 days)
      const weeklyBookings: { date: string; count: number }[] = [];
      for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        const count = bookings.filter((b) => b.date === dateStr).length;
        weeklyBookings.push({ date: dateStr, count });
      }

      setData({
        totalBookings: total,
        completedBookings: completed,
        cancelledBookings: cancelled,
        conversionRate: total > 0 ? Math.round((completed / total) * 100) : 0,
        serviceBreakdown,
        weeklyBookings,
      });
      setLoading(false);
    }

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl text-gray-600">No data available</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 flex items-center gap-4">
          <Link href="/crm" className="text-gray-500 hover:text-gray-700">← Back</Link>
          <h1 className="text-2xl font-bold text-gray-900">📈 Analytics</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard title="Total Bookings" value={data.totalBookings} color="purple" />
          <StatCard title="Completed" value={data.completedBookings} color="green" />
          <StatCard title="Cancelled" value={data.cancelledBookings} color="red" />
          <StatCard title="Conversion Rate" value={`${data.conversionRate}%`} color="blue" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Service Breakdown */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Service Breakdown</h2>
            <div className="space-y-3">
              {Object.entries(data.serviceBreakdown).map(([service, count]) => (
                <div key={service} className="flex items-center justify-between">
                  <span className="capitalize text-gray-700">{service}</span>
                  <div className="flex items-center gap-3">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-purple-600 h-2 rounded-full"
                        style={{ width: `${(count / data.totalBookings) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-500 w-8">{count}</span>
                  </div>
                </div>
              ))}
              {Object.keys(data.serviceBreakdown).length === 0 && (
                <p className="text-gray-500 text-center py-4">No data yet</p>
              )}
            </div>
          </div>

          {/* Weekly Chart */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Last 7 Days</h2>
            <div className="flex items-end justify-between h-40 gap-2">
              {data.weeklyBookings.map((day) => (
                <div key={day.date} className="flex-1 flex flex-col items-center">
                  <div
                    className="w-full bg-purple-500 rounded-t"
                    style={{
                      height: `${Math.max((day.count / Math.max(...data.weeklyBookings.map((d) => d.count), 1)) * 100, 4)}%`,
                    }}
                  />
                  <span className="text-xs text-gray-500 mt-2">
                    {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
                  </span>
                  <span className="text-xs font-medium">{day.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({ title, value, color }: { title: string; value: string | number; color: string }) {
  const colors: Record<string, string> = {
    purple: 'border-purple-500',
    green: 'border-green-500',
    red: 'border-red-500',
    blue: 'border-blue-500',
  };

  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 border-l-4 ${colors[color]}`}>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
    </div>
  );
}
