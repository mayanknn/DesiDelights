import React, { useState } from 'react';
import {
  User,
  Building,
  Clock,
  Mail,
  Phone,
  MapPin,
  Globe,
  Bell,
  Shield,
} from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>

      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 px-4 py-2 text-sm font-medium rounded-md ${
              activeTab === tab.id
                ? 'bg-white text-gray-900 shadow'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow">
        {activeTab === 'general' && <GeneralSettings />}
        {activeTab === 'notifications' && <NotificationSettings />}
        {activeTab === 'security' && <SecuritySettings />}
      </div>
    </div>
  );
};

const tabs = [
  { id: 'general', name: 'General' },
  { id: 'notifications', name: 'Notifications' },
  { id: 'security', name: 'Security' },
];

const GeneralSettings = () => {
  const [formData, setFormData] = useState({
    restaurantName: 'Desi Delight',
    ownerName: 'John Doe',
    email: 'contact@desidelight.com',
    phone: '+1 234 567 8900',
    address: '123 Food Street, Cuisine City',
    website: 'www.desidelight.com',
    openingHours: '10:00 AM',
    closingHours: '10:00 PM',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label icon={Building} text="Restaurant Name" />
          <Input
            value={formData.restaurantName}
            onChange={(e) =>
              setFormData({ ...formData, restaurantName: e.target.value })
            }
          />
        </div>
        <div>
          <Label icon={User} text="Owner Name" />
          <Input
            value={formData.ownerName}
            onChange={(e) =>
              setFormData({ ...formData, ownerName: e.target.value })
            }
          />
        </div>
        <div>
          <Label icon={Mail} text="Email Address" />
          <Input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
        <div>
          <Label icon={Phone} text="Phone Number" />
          <Input
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>
        <div>
          <Label icon={MapPin} text="Address" />
          <Input
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
          />
        </div>
        <div>
          <Label icon={Globe} text="Website" />
          <Input
            value={formData.website}
            onChange={(e) =>
              setFormData({ ...formData, website: e.target.value })
            }
          />
        </div>
        <div>
          <Label icon={Clock} text="Opening Hours" />
          <Input
            type="time"
            value={formData.openingHours}
            onChange={(e) =>
              setFormData({ ...formData, openingHours: e.target.value })
            }
          />
        </div>
        <div>
          <Label icon={Clock} text="Closing Hours" />
          <Input
            type="time"
            value={formData.closingHours}
            onChange={(e) =>
              setFormData({ ...formData, closingHours: e.target.value })
            }
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};

const NotificationSettings = () => {
  const [notifications, setNotifications] = useState({
    newOrders: true,
    orderStatus: true,
    reviews: true,
    lowStock: true,
    dailyReport: false,
    marketing: false,
  });

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-4">
        {Object.entries(notifications).map(([key, value]) => (
          <div
            key={key}
            className="flex items-center justify-between py-2 border-b"
          >
            <div className="flex items-center space-x-3">
              <Bell className="w-5 h-5 text-gray-500" />
              <div>
                <p className="font-medium">
                  {key
                    .split(/(?=[A-Z])/)
                    .join(' ')
                    .charAt(0)
                    .toUpperCase() +
                    key
                      .split(/(?=[A-Z])/)
                      .join(' ')
                      .slice(1)}
                </p>
                <p className="text-sm text-gray-500">
                  Receive notifications for {key
                    .split(/(?=[A-Z])/)
                    .join(' ')
                    .toLowerCase()}
                </p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={value}
                onChange={() =>
                  setNotifications({ ...notifications, [key]: !value })
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

const SecuritySettings = () => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle password change
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-6">
      <div className="space-y-4">
        <div>
          <Label icon={Shield} text="Current Password" />
          <Input
            type="password"
            value={formData.currentPassword}
            onChange={(e) =>
              setFormData({ ...formData, currentPassword: e.target.value })
            }
          />
        </div>
        <div>
          <Label icon={Shield} text="New Password" />
          <Input
            type="password"
            value={formData.newPassword}
            onChange={(e) =>
              setFormData({ ...formData, newPassword: e.target.value })
            }
          />
        </div>
        <div>
          <Label icon={Shield} text="Confirm New Password" />
          <Input
            type="password"
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700"
        >
          Update Password
        </button>
      </div>
    </form>
  );
};

const Label = ({ icon: Icon, text }) => (
  <label className="block text-sm font-medium text-gray-700 mb-1">
    <div className="flex items-center space-x-2">
      <Icon className="w-4 h-4" />
      <span>{text}</span>
    </div>
  </label>
);

const Input = (props) => (
  <input
    {...props}
    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
  />
);

export default Settings;