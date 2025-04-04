import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  ClipboardList,
  UtensilsCrossed,
  Users,
  TableProperties,
  Heart,
  BarChart3,
  Settings as SettingsIcon,
  Briefcase,
} from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { path: '', icon: LayoutDashboard, label: 'Dashboard' }, // Empty for `/admin`
    { path: 'orders', icon: ClipboardList, label: 'Orders' }, // ✅ Relative path
    { path: 'menu', icon: UtensilsCrossed, label: 'Menu' },
    { path: 'tables', icon: TableProperties, label: 'Tables' },
    { path: 'customers', icon: Users, label: 'Customers' },
    { path: 'staff', icon: Briefcase, label: 'Staff Management' }, // Added Staff Management
    { path: 'donations', icon: Heart, label: 'Donations' },
    { path: 'reports', icon: BarChart3, label: 'Reports' },
    { path: 'settings', icon: SettingsIcon, label: 'Settings' },
  ];

  return (
    <div className="w-64 bg-white shadow-lg">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-orange-600">Desi Delight</h1>
      </div>
      <nav className="mt-8">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path} // ✅ Uses relative path
            end // Ensures exact match for index route
            className={({ isActive }) =>
              `flex items-center px-6 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors ${
                isActive ? 'bg-orange-50 text-orange-600' : ''
              }`
            }
          >
            <item.icon className="w-5 h-5 mr-3" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
