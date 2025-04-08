import React, { useState, useEffect } from 'react';
import { Star, Search, Phone, Mail, Calendar, Plus, X, Edit2, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { db } from '../../../firebase';
import { collection, getDocs } from 'firebase/firestore';

const Staff = () => {
  const [staffMembers, setStaffMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);

  useEffect(() => {
    const fetchStaff = async () => {
      const querySnapshot = await getDocs(collection(db, 'users'));
      const users = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
      console.log("Fetched Users:", JSON.stringify(users, null, 2));
      setStaffMembers(users.filter(user => 
        user.role === 'Admin' || 
        user.role === 'Manager' || 
        user.role === 'Chef'
      ));
    };
  
    fetchStaff();
  }, []);

  console.log("Staff Members:", staffMembers);

  const filteredStaff = staffMembers.filter(staff =>
    staff.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staff.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddStaff = (staff) => {
    if (editingStaff) {
      setStaffMembers(staffMembers.map(s => s.id === editingStaff.id ? staff : s));
      toast.success('Staff member updated successfully');
    } else {
      setStaffMembers([...staffMembers, staff]);
      toast.success('Staff member added successfully');
    }
    setIsModalOpen(false);
    setEditingStaff(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl font-bold">Staff Management</h1>
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="relative flex-1 sm:flex-none">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search staff..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border rounded-lg focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center justify-center hover:bg-orange-700"
          >
            <Plus className="w-5 h-5  mr-2" />
            Add Staff
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStaff.map((staff) => (
          <StaffCard
            key={staff.id}
            staff={staff}
            onEdit={() => {
              setEditingStaff(staff);
              setIsModalOpen(true);
            }}
          />
        ))}
      </div>

      {isModalOpen && (
        <StaffModal
          onClose={() => {
            setIsModalOpen(false);
            setEditingStaff(null);
          }}
          onSave={handleAddStaff}
          staff={editingStaff}
        />
      )}
    </div>
  );
};

const StaffCard = ({ staff, onEdit }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-semibold">{staff.name}</h3>
            <p className="text-sm text-gray-500 capitalize">{staff.role?.toLowerCase()}</p>
          </div>
          <button
            onClick={onEdit}
            className="text-gray-600 hover:text-orange-600 p-2 rounded-full hover:bg-orange-50 transition-colors"
          >
            <Edit2 className="w-5 h-5" />
          </button>
        </div>
        
        <div className="space-y-2 text-gray-600 mt-4">
          <div className="flex items-center">
            <Mail className="w-4 h-4 mr-2" />
            <span>{staff.email}</span>
          </div>
          
          {staff.joinDate && (
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              <span>Joined: {new Date(staff.joinDate).toLocaleDateString()}</span>
            </div>
          )}
        </div>

        <div className="mt-4 pt-4 border-t">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-600">Status</p>
              <p className="text-lg font-semibold">
                <span className={`inline-block w-3 h-3 rounded-full mr-2 ${staff.status ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                {staff.status ? 'Active' : 'Inactive'}
              </p>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

const StaffModal = ({ onClose, onSave, staff }) => {
  const [formData, setFormData] = useState(
    staff || {
      id: '',
      name: '',
      email: '',
      role: 'Chef',
      active: true,
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      id: staff?.id || Date.now().toString(),
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-white rounded-lg w-full max-w-md shadow-lg">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">
            {staff ? 'Edit Staff Member' : 'Add New Staff Member'}
          </h2>
          <button onClick={onClose}>
            <X className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <select
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
              required
            >
              <option value="Chef">Chef</option>
              <option value="Manager">Manager</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="number"
              value={formData.salary}
              onChange={(e) =>
                setFormData({ ...formData, salary: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
              min="0"
            />
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="active"
              checked={formData.active}
              onChange={(e) =>
                setFormData({ ...formData, active: e.target.checked })
              }
              className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
            />
            <label htmlFor="active" className="ml-2 block text-sm text-gray-700">
              Active
            </label>
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
              {staff ? 'Update Staff' : 'Add Staff'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Staff;