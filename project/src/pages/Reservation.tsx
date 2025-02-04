import React, { useState } from 'react';
import { Calendar, Clock, Users, UserCheck } from 'lucide-react';

const Reservation = () => {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    guests: '2',
    name: '',
    phone: '',
    specialRequests: '',
  });

  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
    setFormData({
      date: '',
      time: '',
      guests: '2',
      name: '',
      phone: '',
      specialRequests: '',
    });
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
              <label htmlFor="date" className="block text-gray-700 mb-2">
                Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="date"
                  id="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition-all outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="time" className="block text-gray-700 mb-2">
                Time
              </label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <select
                  id="time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition-all outline-none"
                  required
                >
                  <option value="">Select time</option>
                  <option value="11:00">11:00 AM</option>
                  <option value="12:00">12:00 PM</option>
                  <option value="13:00">1:00 PM</option>
                  <option value="14:00">2:00 PM</option>
                  <option value="15:00">3:00 PM</option>
                  <option value="16:00">4:00 PM</option>
                  <option value="17:00">5:00 PM</option>
                  <option value="18:00">6:00 PM</option>
                  <option value="19:00">7:00 PM</option>
                  <option value="20:00">8:00 PM</option>
                  <option value="21:00">9:00 PM</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="guests" className="block text-gray-700 mb-2">
                Number of Guests
              </label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <select
                  id="guests"
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
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
              <label htmlFor="name" className="block text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition-all outline-none"
                required
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition-all outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="specialRequests" className="block text-gray-700 mb-2">
              Special Requests (Optional)
            </label>
            <textarea
              id="specialRequests"
              value={formData.specialRequests}
              onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
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