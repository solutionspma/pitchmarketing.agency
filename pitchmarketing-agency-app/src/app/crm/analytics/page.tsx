'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface ServiceMetrics {
  service: string;
  count: number;
  revenue: number;
}

interface WeeklyData {
  week: string;
  bookings: number;
  revenue: number;
}

const SERVICE_LABELS: Record<string, string> = {
  'strategy-session': 'Strategy Session',
  'brand-consultation': 'Brand Consultation',
  'growth-audit': 'Growth Audit',
  'executive-advisory': 'Executive Advisory',
};

const SERVICE_PRICES: Record<string, number> = {
  'strategy-session': 500,
  'brand-consultation': 750,
  'growth-audit': 1000,
  'executive-advisory': 2500,
};

export default function AnalyticsPage() {
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState({
    totalRevenue: 0,
    completedBookings: 0,
    conversionRate: 0,
    avgBookingValue: 0,
    totalClients: 0,
    eliteClients: 0,
  });
  const [serviceMetrics, setServiceMetrics] = useState<ServiceMetrics[]>([]);
  const [weeklyData, setWeeklyData] = useState<WeeklyData[]>([]);
  const [statusBreakdown, setStatusBreakdown] = useState({
    pending: 0,
    confirmed: 0,
    completed: 0,
    cancelled: 0,
  });

  useEffect(() => {
    async function fetchAnalytics() {
      // Fetch all bookings
      const { data: bookings } = await supabase.from('bookings').select('*');
      const { data: clients } = await supabase.from('clients').select('*');

      if (!bookings) {
        setLoading(false);
        return;
      }

      // Calculate status breakdown
      const statusCounts = {
        pending: bookings.filter((b) => b.status === 'pending').length,
        confirmed: bookings.filter((b) => b.status === 'confirmed').length,
        completed: bookings.filter((b) => b.status === 'completed').length,
        cancelled: bookings.filter((b) => b.status === 'cancelled').length,
      };
      setStatusBreakdown(statusCounts);

      // Calculate total revenue from completed bookings
      const completedBookings = bookings.filter((b) => b.status === 'completed');
      const totalRevenue = completedBookings.reduce((sum, b) => sum + (SERVICE_PRICES[b.service] || 0), 0);
      const avgBookingValue = completedBookings.length > 0 ? totalRevenue / completedBookings.length : 0;

      // Conversion rate: completed / (total - cancelled)
      const nonCancelled = bookings.filter((b) => b.status !== 'cancelled').length;
      const conversionRate = nonCancelled > 0 ? (statusCounts.completed / nonCancelled) * 100 : 0;

      setMetrics({
        totalRevenue,
        completedBookings: statusCounts.completed,
        conversionRate,
        avgBookingValue,
        totalClients: clients?.length || 0,
        eliteClients: clients?.filter((c) => c.elite).length || 0,
      });

      // Service metrics
      const serviceCounts: Record<string, { count: number; revenue: number }> = {};
      completedBookings.forEach((b) => {
        if (!serviceCounts[b.service]) {
          serviceCounts[b.service] = { count: 0, revenue: 0 };
        }
        serviceCounts[b.service].count++;
        serviceCounts[b.service].revenue += SERVICE_PRICES[b.service] || 0;
      });

      const serviceData = Object.entries(serviceCounts)
        .map(([service, data]) => ({
          service,
          count: data.count,
          revenue: data.revenue,
        }))
        .sort((a, b) => b.revenue - a.revenue);
      setServiceMetrics(serviceData);

      // Weekly data (last 8 weeks)
      const now = new Date();
      const weeks: WeeklyData[] = [];
      for (let i = 7; i >= 0; i--) {
        const weekStart = new Date(now);
        weekStart.setDate(weekStart.getDate() - weekStart.getDay() - i * 7);
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekEnd.getDate() + 6);

        const weekBookings = completedBookings.filter((b) => {
          const bookingDate = new Date(b.date);
          return bookingDate >= weekStart && bookingDate <= weekEnd;
        });

        weeks.push({
          week: `${weekStart.getMonth() + 1}/${weekStart.getDate()}`,
          bookings: weekBookings.length,
          revenue: weekBookings.reduce((sum, b) => sum + (SERVICE_PRICES[b.service] || 0), 0),
        });
      }
      setWeeklyData(weeks);

      setLoading(false);
    }

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="flex items-center gap-3 text-gray-400">
          <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <span>Loading analytics...</span>
        </div>
      </div>
    );
  }

  const maxWeeklyRevenue = Math.max(...weeklyData.map((w) => w.revenue), 1);

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Analytics</h1>
        <p className="text-gray-500 mt-1">Performance insights and revenue tracking</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <MetricCard
          title="Total Revenue"
          value={`$${metrics.totalRevenue.toLocaleString()}`}
          icon="💰"
          highlight
        />
        <MetricCard
          title="Completed Sessions"
          value={metrics.completedBookings.toString()}
          icon="✓"
        />
        <MetricCard
          title="Conversion Rate"
          value={`${metrics.conversionRate.toFixed(1)}%`}
          icon="📈"
        />
        <MetricCard
          title="Avg. Booking Value"
          value={`$${metrics.avgBookingValue.toLocaleString()}`}
          icon="💎"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        {/* Weekly Revenue Chart */}
        <div className="bg-pitch-dark border border-white/10 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Weekly Revenue</h3>
          <div className="space-y-4">
            {weeklyData.map((week, i) => (
              <div key={i} className="flex items-center gap-4">
                <span className="text-gray-500 text-sm w-12">{week.week}</span>
                <div className="flex-1 h-8 bg-pitch-black rounded-lg overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-pitch-gold/60 to-pitch-gold rounded-lg transition-all duration-500"
                    style={{ width: `${(week.revenue / maxWeeklyRevenue) * 100}%` }}
                  />
                </div>
                <span className="text-white font-medium w-20 text-right">
                  ${week.revenue.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Booking Status Breakdown */}
        <div className="bg-pitch-dark border border-white/10 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Booking Status</h3>
          <div className="grid grid-cols-2 gap-4">
            <StatusCard label="Pending" count={statusBreakdown.pending} color="yellow" />
            <StatusCard label="Confirmed" count={statusBreakdown.confirmed} color="green" />
            <StatusCard label="Completed" count={statusBreakdown.completed} color="gold" />
            <StatusCard label="Cancelled" count={statusBreakdown.cancelled} color="red" />
          </div>
          
          <div className="mt-6 pt-6 border-t border-white/10">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-400">Success Rate</span>
              <span className="text-white font-medium">
                {statusBreakdown.completed + statusBreakdown.cancelled > 0
                  ? ((statusBreakdown.completed / (statusBreakdown.completed + statusBreakdown.cancelled)) * 100).toFixed(0)
                  : 0}%
              </span>
            </div>
            <div className="h-2 bg-pitch-black rounded-full overflow-hidden">
              <div
                className="h-full bg-pitch-gold rounded-full"
                style={{
                  width: `${
                    statusBreakdown.completed + statusBreakdown.cancelled > 0
                      ? (statusBreakdown.completed / (statusBreakdown.completed + statusBreakdown.cancelled)) * 100
                      : 0
                  }%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Service Breakdown */}
      <div className="bg-pitch-dark border border-white/10 rounded-2xl overflow-hidden">
        <div className="px-6 py-5 border-b border-white/10">
          <h3 className="text-lg font-semibold text-white">Service Performance</h3>
          <p className="text-gray-500 text-sm">Revenue by consultation type</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Service</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Price</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Sessions</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Revenue</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Share</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {serviceMetrics.map((service) => (
                <tr key={service.service} className="hover:bg-white/5 transition">
                  <td className="px-6 py-4">
                    <span className="text-white font-medium">{SERVICE_LABELS[service.service] || service.service}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-400">${SERVICE_PRICES[service.service]?.toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-white">{service.count}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-pitch-gold font-semibold">${service.revenue.toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 bg-pitch-black rounded-full overflow-hidden max-w-24">
                        <div
                          className="h-full bg-pitch-gold rounded-full"
                          style={{
                            width: `${metrics.totalRevenue > 0 ? (service.revenue / metrics.totalRevenue) * 100 : 0}%`,
                          }}
                        />
                      </div>
                      <span className="text-gray-400 text-sm">
                        {metrics.totalRevenue > 0 ? ((service.revenue / metrics.totalRevenue) * 100).toFixed(0) : 0}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
              {serviceMetrics.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    <div className="text-4xl mb-3">📊</div>
                    <p>No completed bookings yet</p>
                    <p className="text-sm mt-1">Service performance will appear after bookings are completed</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Client Stats */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-pitch-dark border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Clients</p>
              <p className="text-3xl font-bold text-white mt-1">{metrics.totalClients}</p>
            </div>
            <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center text-2xl">
              👥
            </div>
          </div>
        </div>
        <div className="bg-pitch-dark border border-pitch-gold/20 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Elite Clients</p>
              <p className="text-3xl font-bold text-pitch-gold mt-1">{metrics.eliteClients}</p>
            </div>
            <div className="w-14 h-14 rounded-xl bg-pitch-gold/10 flex items-center justify-center text-2xl">
              ⭐
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ title, value, icon, highlight }: { title: string; value: string; icon: string; highlight?: boolean }) {
  return (
    <div className={`bg-pitch-dark border rounded-2xl p-6 ${highlight ? 'border-pitch-gold/30' : 'border-white/10'}`}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-2xl">{icon}</span>
        {highlight && <span className="text-xs text-pitch-gold font-semibold px-2 py-1 bg-pitch-gold/10 rounded-full">KEY METRIC</span>}
      </div>
      <p className={`text-3xl font-bold ${highlight ? 'text-pitch-gold' : 'text-white'}`}>{value}</p>
      <p className="text-gray-500 text-sm mt-1">{title}</p>
    </div>
  );
}

function StatusCard({ label, count, color }: { label: string; count: number; color: string }) {
  const colors: Record<string, string> = {
    yellow: 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400',
    green: 'bg-green-500/10 border-green-500/20 text-green-400',
    gold: 'bg-pitch-gold/10 border-pitch-gold/20 text-pitch-gold',
    red: 'bg-red-500/10 border-red-500/20 text-red-400',
  };

  return (
    <div className={`rounded-xl border p-4 ${colors[color]}`}>
      <p className="text-2xl font-bold">{count}</p>
      <p className="text-sm opacity-80">{label}</p>
    </div>
  );
}
