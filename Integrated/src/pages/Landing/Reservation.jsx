import React, { useState } from 'react';
import { Calendar, Clock, Users, UserCheck } from 'lucide-react';
import { db } from '../../firebase';
import { collection, doc, setDoc, serverTimestamp } from 'firebase/firestore';

const randomAlphaNumeric = (length) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

const Reservation = () => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState('2');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const id = randomAlphaNumeric(10);
    const reservationRef = doc(collection(db, 'reservations'), id);

    try {
      await setDoc(reservationRef, {
        id,
        date,
        time,
        guests,
        name,
        phone,
        specialRequests,
        createdAt: serverTimestamp(),
        reservationConfirmed: false, // Default to false
      });

      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);

      // Reset fields
      setDate('');
      setTime('');
      setGuests('2');
      setName('');
      setPhone('');
      setSpecialRequests('');

      alert('Reservation successfully added!');
    } catch (error) {
      console.error('Error adding reservation:', error);
      alert('Error saving reservation. Please try again.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">Book a Table</h1>

      <div className="bg-white rounded-lg shadow-md p-8">
        {showSuccess && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6">
            <UserCheck className="inline-block mr-2" size={20} />
            Reservation successful! We'll contact you to confirm your booking.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="date" className="block text-gray-700 mb-2">Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="date"
                  id="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition-all outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="time" className="block text-gray-700 mb-2">Time</label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <select
                  id="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition-all outline-none"
                  required
                >
                  <option value="">Select time</option>
                  {[...Array(10)].map((_, i) => (
                    <option key={i} value={`${i + 11}:00`}>
                      {i + 11}:00 {i + 11 < 12 ? 'AM' : 'PM'}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="guests" className="block text-gray-700 mb-2">Number of Guests</label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <select
                  id="guests"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition-all outline-none"
                  required
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'Guest' : 'Guests'}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="name" className="block text-gray-700 mb-2">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition-all outline-none"
                required
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-gray-700 mb-2">Phone Number</label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition-all outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="specialRequests" className="block text-gray-700 mb-2">Special Requests (Optional)</label>
            <textarea
              id="specialRequests"
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition-all outline-none h-32"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition-colors font-medium"
          >
            Book Table
          </button>
        </form>
      </div>
    </div>
  );
};

export default Reservation;
