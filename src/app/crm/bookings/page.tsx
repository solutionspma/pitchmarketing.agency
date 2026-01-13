'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  notes: string;
  status: string;
  created_at: string;
}

const SERVICE_LABELS: Record<string, string> = {
  'strategy-session': 'Strategy Session',
  'brand-consultation': 'Brand Consultation',
  'growth-audit': 'Growth Audit',
  'executive-advisory': 'Executive Advisory',
};

const SERVICE_PRICES: Record<string, string> = {
  'strategy-session': '$500',
  'brand-consultation': '$750',
  'growth-audit': '$1,000',
  'executive-advisory': '$2,500',
};

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  async function fetchBookings() {
    const { data } = await supabase
      .from('bookings')
      .select('*')
      .order('date', { ascending: true });
    setBookings(data || []);
    setLoading(false);
  }

  const updateStatus = async (id: string, status: string) => {
    await supabase.from('bookings').update({ status }).eq('id', id);
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status } : b))
    );
    if (selectedBooking?.id === id) {
      setSelectedBooking((prev) => (prev ? { ...prev, status } : null));
    }
  };

  const deleteBooking = async (id: string) => {
    if (confirm('Are you sure you want to delete this booking?')) {
      await supabase.from('bookings').delete().eq('id', id);
      setBookings((prev) => prev.filter((b) => b.id !== id));
      setSelectedBooking(null);
    }
  };

  const filteredBookings = bookings.filter((booking) =>
    statusFilter === 'all' ? true : booking.status === statusFilter
  );

  const statusCounts = {
    all: bookings.length,
    pending: bookings.filter((b) => b.status === 'pending').length,
    confirmed: bookings.filter((b) => b.status === 'confirmed').length,
    completed: bookings.filter((b) => b.status === 'completed').length,
    cancelled: bookings.filter((b) => b.status === 'cancelled').length,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="flex items-center gap-3 text-gray-400">
          <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <span>Loading bookings...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Bookings</h1>
          <p className="text-gray-500 mt-1">Manage consultation requests and appointments</p>
        </div>
        <a
          href="/book"
          target="_blank"
          className="inline-flex items-center gap-2 border border-white/10 text-white font-medium px-5 py-2.5 rounded-xl hover:bg-white/5 transition"
        >
          <span>↗</span>
          <span>View Booking Page</span>
        </a>
      </div>

      {/* Status Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {(['all', 'pending', 'confirmed', 'completed', 'cancelled'] as const).map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition flex items-center gap-2 ${
              statusFilter === status
                ? status === 'all'
                  ? 'bg-white/10 text-white'
                  : status === 'pending'
                  ? 'bg-yellow-500/20 text-yellow-400'
                  : status === 'confirmed'
                  ? 'bg-green-500/20 text-green-400'
                  : status === 'completed'
                  ? 'bg-pitch-gold/20 text-pitch-gold'
                  : 'bg-red-500/20 text-red-400'
                : 'bg-pitch-dark border border-white/10 text-gray-400 hover:text-white'
            }`}
          >
            <span className="capitalize">{status}</span>
            <span className="bg-white/10 px-1.5 py-0.5 rounded text-xs">{statusCounts[status]}</span>
          </button>
        ))}
      </div>

      {/* Bookings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredBookings.map((booking) => (
          <div
            key={booking.id}
            onClick={() => setSelectedBooking(booking)}
            className={`bg-pitch-dark border rounded-2xl p-5 cursor-pointer transition hover:border-pitch-gold/30 ${
              selectedBooking?.id === booking.id ? 'border-pitch-gold/50 ring-1 ring-pitch-gold/20' : 'border-white/10'
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-white">{booking.name}</h3>
                <p className="text-gray-500 text-sm">{booking.email}</p>
              </div>
              <StatusBadge status={booking.status} />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-500">Service:</span>
                <span className="text-gray-300">{SERVICE_LABELS[booking.service] || booking.service}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-500">Date:</span>
                <span className="text-gray-300">{booking.date} at {booking.time}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-500">Value:</span>
                <span className="text-pitch-gold font-semibold">{SERVICE_PRICES[booking.service] || '-'}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-white/5 flex gap-2">
              {booking.status === 'pending' && (
                <>
                  <button
                    onClick={(e) => { e.stopPropagation(); updateStatus(booking.id, 'confirmed'); }}
                    className="flex-1 px-3 py-2 text-xs font-medium bg-green-500/10 text-green-400 rounded-lg hover:bg-green-500/20 transition"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); updateStatus(booking.id, 'cancelled'); }}
                    className="flex-1 px-3 py-2 text-xs font-medium bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition"
                  >
                    Decline
                  </button>
                </>
              )}
              {booking.status === 'confirmed' && (
                <button
                  onClick={(e) => { e.stopPropagation(); updateStatus(booking.id, 'completed'); }}
                  className="flex-1 px-3 py-2 text-xs font-medium bg-pitch-gold/10 text-pitch-gold rounded-lg hover:bg-pitch-gold/20 transition"
                >
                  Mark Complete
                </button>
              )}
              {(booking.status === 'completed' || booking.status === 'cancelled') && (
                <button
                  onClick={(e) => { e.stopPropagation(); deleteBooking(booking.id); }}
                  className="flex-1 px-3 py-2 text-xs font-medium bg-gray-500/10 text-gray-400 rounded-lg hover:bg-red-500/10 hover:text-red-400 transition"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
        
        {filteredBookings.length === 0 && (
          <div className="col-span-full bg-pitch-dark border border-white/10 rounded-2xl p-12 text-center">
            <div className="text-4xl mb-3">📅</div>
            <p className="text-gray-400">No {statusFilter === 'all' ? '' : statusFilter} bookings found</p>
            <p className="text-gray-500 text-sm mt-1">Bookings from the public booking page will appear here</p>
          </div>
        )}
      </div>

      {/* Detail Sidebar */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-end">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedBooking(null)} />
          <div className="relative h-full w-full max-w-md bg-pitch-dark border-l border-white/10 overflow-y-auto">
            <div className="sticky top-0 bg-pitch-dark border-b border-white/10 px-6 py-5 flex items-center justify-between z-10">
              <h3 className="text-lg font-bold text-white">Booking Details</h3>
              <button
                onClick={() => setSelectedBooking(null)}
                className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Status */}
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Status</span>
                <StatusBadge status={selectedBooking.status} />
              </div>

              {/* Client Info */}
              <div className="bg-pitch-black rounded-xl p-5 border border-white/5">
                <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Client Information</h4>
                <div className="space-y-3">
                  <div>
                    <span className="text-gray-500 text-sm">Name</span>
                    <p className="text-white font-medium">{selectedBooking.name}</p>
                  </div>
                  <div>
                    <span className="text-gray-500 text-sm">Email</span>
                    <p className="text-white">{selectedBooking.email}</p>
                  </div>
                  {selectedBooking.phone && (
                    <div>
                      <span className="text-gray-500 text-sm">Phone</span>
                      <p className="text-white">{selectedBooking.phone}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Booking Info */}
              <div className="bg-pitch-black rounded-xl p-5 border border-white/5">
                <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Booking Details</h4>
                <div className="space-y-3">
                  <div>
                    <span className="text-gray-500 text-sm">Service</span>
                    <p className="text-white font-medium">{SERVICE_LABELS[selectedBooking.service] || selectedBooking.service}</p>
                  </div>
                  <div>
                    <span className="text-gray-500 text-sm">Value</span>
                    <p className="text-pitch-gold font-bold text-xl">{SERVICE_PRICES[selectedBooking.service] || '-'}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-gray-500 text-sm">Date</span>
                      <p className="text-white">{selectedBooking.date}</p>
                    </div>
                    <div>
                      <span className="text-gray-500 text-sm">Time</span>
                      <p className="text-white">{selectedBooking.time}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Notes */}
              {selectedBooking.notes && (
                <div className="bg-pitch-black rounded-xl p-5 border border-white/5">
                  <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Notes</h4>
                  <p className="text-gray-300">{selectedBooking.notes}</p>
                </div>
              )}

              {/* Created */}
              <div className="text-center pt-4 border-t border-white/5">
                <span className="text-gray-500 text-sm">
                  Submitted {new Date(selectedBooking.created_at).toLocaleString()}
                </span>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                {selectedBooking.status === 'pending' && (
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => updateStatus(selectedBooking.id, 'confirmed')}
                      className="w-full px-4 py-3 bg-green-500/10 text-green-400 font-medium rounded-xl hover:bg-green-500/20 transition"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() => updateStatus(selectedBooking.id, 'cancelled')}
                      className="w-full px-4 py-3 bg-red-500/10 text-red-400 font-medium rounded-xl hover:bg-red-500/20 transition"
                    >
                      Decline
                    </button>
                  </div>
                )}
                {selectedBooking.status === 'confirmed' && (
                  <button
                    onClick={() => updateStatus(selectedBooking.id, 'completed')}
                    className="w-full px-4 py-3 bg-pitch-gold text-black font-semibold rounded-xl hover:bg-pitch-gold/90 transition"
                  >
                    Mark as Complete
                  </button>
                )}
                <a
                  href={`mailto:${selectedBooking.email}?subject=Re: Your ${SERVICE_LABELS[selectedBooking.service] || 'Consultation'} Booking`}
                  className="block w-full px-4 py-3 border border-white/10 text-white font-medium rounded-xl text-center hover:bg-white/5 transition"
                >
                  Send Email
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
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
    <span className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-full border capitalize ${styles[status] || 'bg-gray-500/10 text-gray-400 border-gray-500/20'}`}>
      {status}
    </span>
  );
}
