import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, Cat as Categories, Coffee, PlusSquare, Heart, BarChart2, UserCircle, LogOut } from 'lucide-react';

const navigation = [
  { name: 'Menu', path: '/manager/menu', icon: Menu },
  { name: 'Categories', path: '/manager/categories', icon: Categories },
  { name: 'Manage Items', path: '/manager/items', icon: Coffee },
  { name: 'Add Table', path: '/manager/add-table', icon: PlusSquare },
  { name: 'Food Donations', path: '/manager/donations', icon: Heart },
  { name: 'Statistics', path: '/manager/statistics', icon: BarChart2 },
];

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white border-r border-gray-200">
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-center h-16 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-800">Restaurant Manager</h1>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1">
            {navigation.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 text-sm font-medium ${
                      isActive
                        ? 'bg-indigo-50 text-indigo-600'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`
                  }
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-gray-200 p-4">
          <NavLink
            to="/manager/profile"
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md"
          >
            <UserCircle className="mr-3 h-5 w-5" />
            Profile
          </NavLink>
          <button
            onClick={() => {/* Add logout logic */}}
            className="w-full flex items-center px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md"
          >
            <LogOut className="mr-3 h-5 w-5" />
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;