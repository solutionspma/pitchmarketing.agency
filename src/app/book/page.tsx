'use client';

import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Meeting types - single free consultation option
const MEETING_TYPES = [
  {
    id: 'free-consultation',
    name: 'Free Discovery Call',
    duration: '15 min',
    description: 'Complimentary consultation to discuss your goals and see how we can help',
    icon: '💬',
  },
];

// Generate available time slots (this would be synced with your calendar in production)
function generateTimeSlots() {
  const slots = [];
  const startHour = 9; // 9 AM
  const endHour = 17; // 5 PM
  
  for (let hour = startHour; hour < endHour; hour++) {
    slots.push(`${hour > 12 ? hour - 12 : hour}:00 ${hour >= 12 ? 'PM' : 'AM'}`);
    slots.push(`${hour > 12 ? hour - 12 : hour}:30 ${hour >= 12 ? 'PM' : 'AM'}`);
  }
  return slots;
}

// Get the next 14 days excluding weekends
function getAvailableDates() {
  const dates = [];
  const today = new Date();
  let currentDate = new Date(today);
  
  while (dates.length < 14) {
    currentDate.setDate(currentDate.getDate() + 1);
    const day = currentDate.getDay();
    // Skip weekends (0 = Sunday, 6 = Saturday)
    if (day !== 0 && day !== 6) {
      dates.push(new Date(currentDate));
    }
  }
  return dates;
}

export default function BookPage() {
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [availableDates] = useState(getAvailableDates());
  const [timeSlots] = useState(generateTimeSlots());
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    notes: '',
  });

  const selectedMeeting = MEETING_TYPES.find((t) => t.id === selectedType);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedType || !selectedDate || !selectedTime) return;

    setLoading(true);

    const bookingData = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      service: selectedType,
      date: selectedDate.toISOString().split('T')[0],
      time: selectedTime,
      notes: form.notes,
      status: 'pending',
    };

    try {
      const { error } = await supabase.from('bookings').insert([bookingData]);

      if (error) throw error;

      // Send confirmation email
      await fetch('/api/book/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
      });

      setSubmitted(true);
    } catch (err) {
      console.error('Booking error:', err);
      alert('There was an error submitting your booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <main className="min-h-screen bg-pitch-black text-white">
        <Navbar />
        <div className="pt-32 pb-20 px-6">
          <div className="max-w-xl mx-auto text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center">
              <span className="text-4xl">✓</span>
            </div>
            <h1 className="text-3xl font-bold mb-4">You're All Set!</h1>
            <p className="text-gray-400 mb-6">
              Your {selectedMeeting?.name} has been scheduled for{' '}
              <span className="text-white font-semibold">
                {selectedDate?.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </span>{' '}
              at <span className="text-white font-semibold">{selectedTime}</span>.
            </p>
            <p className="text-gray-500 mb-8">
              A confirmation email has been sent to <span className="text-pitch-gold">{form.email}</span>.
              You'll receive a calendar invite and meeting link shortly.
            </p>
            <div className="bg-pitch-dark border border-white/10 rounded-xl p-6 text-left mb-8">
              <h3 className="font-semibold text-white mb-4">What to Prepare</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-pitch-gold">•</span>
                  Think about your biggest challenges and goals
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pitch-gold">•</span>
                  Have examples of brands or work you admire ready
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pitch-gold">•</span>
                  Be prepared to discuss your timeline and budget range
                </li>
              </ul>
            </div>
            <a
              href="/"
              className="inline-flex items-center gap-2 text-pitch-gold hover:underline"
            >
              ← Back to Home
            </a>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-pitch-black text-white">
      <Navbar />

      <div className="pt-28 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              Book a Meeting with <span className="text-pitch-gold">Jason</span>
            </h1>
            <p className="text-gray-400">
              Schedule your free 15-minute discovery call
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-2 mb-10">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition ${
                    step >= s
                      ? 'bg-pitch-gold text-black'
                      : 'bg-pitch-dark border border-white/10 text-gray-500'
                  }`}
                >
                  {s}
                </div>
                {s < 3 && (
                  <div
                    className={`w-16 h-0.5 mx-2 ${
                      step > s ? 'bg-pitch-gold' : 'bg-white/10'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Step 1: Select Meeting Type */}
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-6">Select Meeting Type</h2>
              <div className="grid gap-4">
                {MEETING_TYPES.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => {
                      setSelectedType(type.id);
                      setStep(2);
                    }}
                    className={`flex items-start gap-4 p-5 rounded-xl border text-left transition hover:border-pitch-gold/50 ${
                      selectedType === type.id
                        ? 'border-pitch-gold bg-pitch-gold/5'
                        : 'border-white/10 bg-pitch-dark'
                    }`}
                  >
                    <div className="text-3xl">{type.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-white">{type.name}</h3>
                        <span className="text-sm text-pitch-gold font-medium">{type.duration}</span>
                      </div>
                      <p className="text-gray-400 text-sm mt-1">{type.description}</p>
                    </div>
                    <div className="text-gray-500">→</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Select Date & Time */}
          {step === 2 && (
            <div>
              <button
                onClick={() => setStep(1)}
                className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition"
              >
                ← Back to meeting types
              </button>

              <div className="flex items-center gap-4 mb-8 p-4 bg-pitch-dark rounded-xl border border-white/10">
                <div className="text-2xl">{selectedMeeting?.icon}</div>
                <div>
                  <p className="font-semibold text-white">{selectedMeeting?.name}</p>
                  <p className="text-sm text-gray-400">{selectedMeeting?.duration}</p>
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Date Selection */}
                <div>
                  <h3 className="font-semibold mb-4">Select a Date</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {availableDates.map((date, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedDate(date)}
                        className={`p-3 rounded-lg border text-left transition ${
                          selectedDate?.toDateString() === date.toDateString()
                            ? 'border-pitch-gold bg-pitch-gold/10 text-white'
                            : 'border-white/10 bg-pitch-dark text-gray-300 hover:border-white/30'
                        }`}
                      >
                        <div className="text-xs text-gray-500 uppercase">
                          {date.toLocaleDateString('en-US', { weekday: 'short' })}
                        </div>
                        <div className="font-semibold">
                          {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time Selection */}
                <div>
                  <h3 className="font-semibold mb-4">
                    {selectedDate
                      ? `Available Times for ${selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`
                      : 'Select a date first'}
                  </h3>
                  {selectedDate ? (
                    <div className="grid grid-cols-2 gap-2 max-h-[400px] overflow-y-auto pr-2">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          onClick={() => {
                            setSelectedTime(time);
                            setStep(3);
                          }}
                          className={`p-3 rounded-lg border text-center transition ${
                            selectedTime === time
                              ? 'border-pitch-gold bg-pitch-gold text-black font-semibold'
                              : 'border-white/10 bg-pitch-dark text-gray-300 hover:border-pitch-gold/50 hover:text-white'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="h-48 flex items-center justify-center text-gray-500 bg-pitch-dark rounded-xl border border-white/10">
                      <p>Please select a date</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Your Details */}
          {step === 3 && (
            <div>
              <button
                onClick={() => setStep(2)}
                className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition"
              >
                ← Back to date & time
              </button>

              {/* Booking Summary */}
              <div className="mb-8 p-5 bg-pitch-dark rounded-xl border border-white/10">
                <h3 className="font-semibold text-white mb-4">Booking Summary</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Meeting</span>
                    <span className="text-white font-medium">{selectedMeeting?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Duration</span>
                    <span className="text-white">{selectedMeeting?.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Date</span>
                    <span className="text-white">
                      {selectedDate?.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Time</span>
                    <span className="text-white">{selectedTime}</span>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="font-semibold text-white">Your Information</h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-pitch-dark border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-pitch-gold/50 transition"
                      placeholder="John Smith"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-pitch-dark border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-pitch-gold/50 transition"
                      placeholder="john@company.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full bg-pitch-dark border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-pitch-gold/50 transition"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    What would you like to discuss?
                  </label>
                  <textarea
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    rows={4}
                    className="w-full bg-pitch-dark border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-pitch-gold/50 transition resize-none"
                    placeholder="Tell us about your project, goals, or questions..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-pitch-gold text-black font-semibold py-4 rounded-xl hover:bg-pitch-gold/90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span>Scheduling...</span>
                    </>
                  ) : (
                    'Confirm Booking'
                  )}
                </button>

                <p className="text-center text-gray-500 text-sm">
                  By scheduling, you agree to our meeting policies. You'll receive a confirmation email with meeting details.
                </p>
              </form>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}
