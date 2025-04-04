import React, { useState } from 'react';
import { Plus, Calendar, Building, BarChart } from 'lucide-react';
import { donations as initialDonations, donationStats } from '../Adata/dummyData';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Donations1 = () => {
  const [donations, setDonations] = useState(initialDonations);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddDonation = (donation) => {
    setDonations([...donations, donation]);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Food Donations</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          Schedule Donation
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4 flex items-center">
          <BarChart className="w-5 h-5 mr-2 text-orange-600" />
          Monthly Donation Statistics
        </h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsBarChart data={donationStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="meals" fill="#f97316" name="Meals Donated" />
            </RechartsBarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {donations.map((donation) => (
          <DonationCard
            key={donation.id}
            donation={donation}
            onStatusChange={(status) => {
              setDonations(
                donations.map((d) =>
                  d.id === donation.id ? { ...d, status } : d
                )
              );
            }}
          />
        ))}
      </div>

      {isModalOpen && (
        <DonationModal
          onClose={() => setIsModalOpen(false)}
          onSave={handleAddDonation}
        />
      )}
    </div>
  );
};

const DonationCard = ({ donation, onStatusChange }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold">{donation.organization}</h3>
            <div className="flex items-center text-gray-600 mt-1">
              <Calendar className="w-4 h-4 mr-2" />
              <span>{new Date(donation.date).toLocaleDateString()}</span>
            </div>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              donation.status === 'completed'
                ? 'bg-green-100 text-green-800'
                : 'bg-yellow-100 text-yellow-800'
            }`}
          >
            {donation.status === 'completed' ? 'Completed' : 'Scheduled'}
          </span>
        </div>

        <div className="space-y-2">
          <h4 className="font-medium">Donated Items:</h4>
          {donation.items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center text-sm"
            >
              <span>{item.name}</span>
              <span className="text-gray-600">{donation.quantity} portions</span>
            </div>
          ))}
        </div>

        {donation.status === 'scheduled' && (
          <button
            onClick={() => onStatusChange('completed')}
            className="mt-4 w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
          >
            Mark as Completed
          </button>
        )}
      </div>
    </div>
  );
};

const DonationModal = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    organization: '',
    date: '',
    items: [],
    quantity: 0,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      id: Date.now().toString(),
      ...formData,
      date: new Date(formData.date),
      status: 'scheduled',
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Schedule Food Donation</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Organization Name
              </label>
              <div className="mt-1 relative">
                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={formData.organization}
                  onChange={(e) =>
                    setFormData({ ...formData, organization: e.target.value })
                  }
                  className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Donation Date
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Quantity (portions)
              </label>
              <input
                type="number"
                value={formData.quantity}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    quantity: parseInt(e.target.value, 10),
                  })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
                required
                min="1"
              />
            </div>

            <div className="flex justify-end space-x-4 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700"
              >
                Schedule Donation
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Donations1;