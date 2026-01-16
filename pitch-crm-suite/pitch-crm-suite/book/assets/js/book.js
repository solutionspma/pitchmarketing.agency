import { supabase } from '../../crm/auth/supabaseClient.js';

const form = document.getElementById('booking-form');
const confirmation = document.getElementById('confirmation');

// Set minimum date to today
const dateInput = document.getElementById('date');
const today = new Date().toISOString().split('T')[0];
dateInput.setAttribute('min', today);

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const formData = new FormData(form);
  const booking = {
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    service: formData.get('service'),
    date: formData.get('date'),
    time: formData.get('time'),
    notes: formData.get('notes'),
    status: 'pending',
    created_at: new Date().toISOString()
  };
  
  try {
    const { data, error } = await supabase
      .from('bookings')
      .insert([booking]);
    
    if (error) throw error;
    
    form.classList.add('hidden');
    confirmation.classList.remove('hidden');
    
    // Send confirmation email via CRM
    await fetch('/crm/notifications/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: booking.email,
        template: 'booking_confirmation',
        data: booking
      })
    });
    
  } catch (err) {
    console.error('Booking error:', err);
    alert('Something went wrong. Please try again.');
  }
});
