import React, { useState,useEffect } from 'react';
// import { Customer, Review } from '../Atypes/index';
import { Star, Search, Phone, Mail, Calendar, Plus, X, Edit2, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

import { db } from '../../../firebase'; // Import Firebase config
import { collection, getDocs } from 'firebase/firestore';


const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      const querySnapshot = await getDocs(collection(db, 'users'));
      const users = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  
      console.log("Fetched Users:", JSON.stringify(users, null, 2)); // Pretty print JSON
      setCustomers(users.filter(user => user.role === 'Customer'));
    };
  
    fetchCustomers();
  }, []);

  console.log("Customers:", customers); // Debugging step

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCustomer = (customer) => {
    if (editingCustomer) {
      setCustomers(customers.map(c => c.id === editingCustomer.id ? customer : c));
      toast.success('Customer updated successfully');
    } else {
      setCustomers([...customers, customer]);
      toast.success('Customer added successfully');
    }
    setIsModalOpen(false);
    setEditingCustomer(null);
  };

  const handleAddReview = (customerId, review) => {
    setCustomers(customers.map(customer => {
      if (customer.id === customerId) {
        return {
          ...customer,
          reviews: [...customer.reviews, review]
        };
      }
      return customer;
    }));
    toast.success('Review added successfully');
  };

  const handleDeleteReview = (customerId, reviewId) => {
    setCustomers(customers.map(customer => {
      if (customer.id === customerId) {
        return {
          ...customer,
          reviews: customer.reviews.filter(review => review.id !== reviewId)
        };
      }
      return customer;
    }));
    toast.success('Review deleted successfully');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl font-bold">Customer Management</h1>
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="relative flex-1 sm:flex-none">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search customers..."
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
            Add Customer
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCustomers.map((customer) => (
          <CustomerCard
            key={customer.id}
            customer={customer}
            onAddReview={handleAddReview}
            onDeleteReview={handleDeleteReview}
            onEdit={() => {
              setEditingCustomer(customer);
              setIsModalOpen(true);
            }}
          />
        ))}
      </div>

      {isModalOpen && (
        <CustomerModal
          onClose={() => {
            setIsModalOpen(false);
            setEditingCustomer(null);
          }}
          onSave={handleAddCustomer}
          customer={editingCustomer}
        />
      )}
    </div>
  );
};

const CustomerCard = ({ customer, onAddReview, onDeleteReview, onEdit }) => {
  const [showReviews, setShowReviews] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-semibold">{customer.name}</h3>
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
            <span>{customer.email}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            <span>Last Visit: {customer.date}</span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-600">Total Visits</p>
              <p className="text-lg font-semibold">{customer.visit}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Spent</p>
              <p className="text-lg font-semibold">₹</p>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex justify-between items-center">
            {/* <button
              onClick={() => setShowReviews(!showReviews)}
              className="text-orange-600 hover:text-orange-700 text-sm font-medium"
            >
              {showReviews ? 'Hide Reviews' : `Show Reviews (${customer.reviews.length})`}
            </button> */}
            <button
              onClick={() => setShowReviewForm(true)}
              className="text-sm text-orange-600 hover:text-orange-700 font-medium"
            >
              Add Review
            </button>
          </div>
          
          {showReviews && (
            <div className="mt-2 space-y-2">
              {customer.reviews.map((review) => (
                <ReviewCard
                  key={review.id}
                  review={review}
                  onDelete={() => onDeleteReview(customer.id, review.id)}
                />
              ))}
            </div>
          )}

          {showReviewForm && (
            <ReviewForm
              customerId={customer.id}
              onSubmit={(review) => {
                onAddReview(customer.id, review);
                setShowReviewForm(false);
              }}
              onCancel={() => setShowReviewForm(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

const ReviewCard = ({ review, onDelete }) => (
  <div className="bg-gray-50 p-3 rounded">
    <div className="flex items-center justify-between mb-1">
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < review.rating
                ? 'text-yellow-400 fill-current'
                : 'text-gray-300'
            }`}
          />
        ))}
        <span className="ml-2 text-sm text-gray-600">
          {new Date(review.date).toLocaleDateString()}
        </span>
      </div>
      <button
        onClick={onDelete}
        className="text-red-600 hover:text-red-800"
        title="Delete Review"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
    <p className="text-sm text-gray-700">{review.comment}</p>
  </div>
);

const ReviewForm = ({ customerId, onSubmit, onCancel }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      id: Date.now().toString(),
      rating,
      comment,
      date: new Date(),
      customerId,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Rating</label>
        <div className="flex items-center mt-1">
          {[...Array(5)].map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setRating(index + 1)}
              className="focus:outline-none"
            >
              <Star
                className={`w-5 h-5 ${
                  index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                }`}
              />
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Comment</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
          rows={3}
          required
        />
      </div>
      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-3 py-1 text-sm border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-3 py-1 text-sm bg-orange-600 text-white rounded-md hover:bg-orange-700"
        >
          Submit Review
        </button>
      </div>
    </form>
  );
};

const CustomerModal = ({ onClose, onSave, customer }) => {
  const [formData, setFormData] = useState(
    customer || {
      id: '',
      name: '',
      phone: '',
      email: '',
      visits: 0,
      totalSpent: 0,
      lastVisit: new Date(),
      reviews: [],
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      id: customer?.id || Date.now().toString(),
      reviews: customer?.reviews || [],
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-white rounded-lg w-full max-w-md shadow-lg">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">
            {customer ? 'Edit Customer' : 'Add New Customer'}
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
              Phone Number
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
              required
            />
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
          {customer && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Total Visits
                </label>
                <input
                  type="number"
                  value={formData.visit}
                  onChange={(e) =>
                    setFormData({ ...formData, visits: parseInt(e.target.value) })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Total Spent
                </label>
                <input
                  type="number"
                  value={formData.totalSpent}
                  onChange={(e) =>
                    setFormData({ ...formData, totalSpent: parseFloat(e.target.value) })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                  min="0"
                  step="0.01"
                />
              </div>
            </>
          )}
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
              {customer ? 'Update Customer' : 'Add Customer'}
            </button>
          </div>
        </form>
      </div>
    </div>

  );
};

export default Customers;