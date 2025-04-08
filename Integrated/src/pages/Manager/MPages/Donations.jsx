import React, { useState, useEffect } from 'react';
import { Plus, Check, X } from 'lucide-react';
import { collection, query, where, onSnapshot, doc, updateDoc, addDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
import NgoPopup from '../MPages/NgoPopup';

export default function Donations() {
  const [donations, setDonations] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedNgo, setSelectedNgo] = useState(null);
  const [ngoList, setNgoList] = useState([]);
  const [showNgoPopup, setShowNgoPopup] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [locationError, setLocationError] = useState('');
  const [currentDonationId, setCurrentDonationId] = useState(null);

  // Load NGO data from JSON file
  useEffect(() => {
    const loadNgoData = async () => {
      try {
        const response = await fetch('/data/ngo.json');
        const data = await response.json();
        setNgoList(data);
      } catch (error) {
        console.error('Error loading NGO data:', error);
      }
    };

    loadNgoData();
  }, []);

  // Fetch donations from Firestore
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData?.uid) {
      setLoading(false);
      return;
    }

    const q = query(collection(db, 'wasteLogs'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const fetchedDonations = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        fetchedDonations.push({
          id: doc.id,
          ...data,
        });
      });
      fetchedDonations.sort((a, b) => new Date(b.date) - new Date(a.date));
      setDonations(fetchedDonations);
      setLoading(false);
    }, (error) => {
      console.error('Error fetching donations:', error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const location = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            };
            resolve(location);
          },
          (error) => {
            let errorMessage;
            switch (error.code) {
              case error.PERMISSION_DENIED:
                errorMessage = "User denied the request for Geolocation.";
                break;
              case error.POSITION_UNAVAILABLE:
                errorMessage = "Location information is unavailable.";
                break;
              case error.TIMEOUT:
                errorMessage = "The request to get user location timed out.";
                break;
              case error.UNKNOWN_ERROR:
                errorMessage = "An unknown error occurred.";
                break;
              default:
                errorMessage = "An unexpected error occurred.";
            }
            reject(new Error(errorMessage));
          }
        );
      } else {
        reject(new Error("Geolocation is not supported by this browser."));
      }
    });
  };

  const handleNgoClick = (organizationName) => {
    const ngo = ngoList.find(n =>
      n.organizationName.toLowerCase().includes(organizationName.toLowerCase()) ||
      organizationName.toLowerCase().includes(n.organizationName.toLowerCase())
    );

    if (ngo) {
      setSelectedNgo(ngo);
    } else {
      setSelectedNgo({
        organizationName,
        address: 'Address not available',
        coordinates: null
      });
    }
  };

  const openNgoPopup = async (donationId) => {
    try {
      const location = await getCurrentLocation();
      setCurrentLocation(location);
      setLocationError('');

      // Store the donation ID in state
      setCurrentDonationId(donationId);

      // Show the NGO popup
      setShowNgoPopup(true);
    } catch (error) {
      console.error('Error getting location:', error);
      setLocationError(error.message);
    }
  };

  const handleNgoSelect = async (selectedNgo) => {
    if (!currentDonationId) return;

    try {
      // Update the donation with the selected NGO and complete status
      await updateDoc(doc(db, 'wasteLogs', currentDonationId), {
        status: 'completed',
        organization: selectedNgo.organizationName,
        pickupLocation: {
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude
        }
      });

      setShowNgoPopup(false);
      setCurrentDonationId(null);
    } catch (error) {
      console.error('Error updating donation:', error);
    }
  };

  const closeNgoPopup = () => {
    setShowNgoPopup(false);
  };

  const updateStatus = async (id, status) => {
    try {
      await updateDoc(doc(db, 'wasteLogs', id), { status });
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center h-64">
        <p>Loading donations...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      {locationError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {locationError}
        </div>
      )}

      <div className="bg-white rounded-lg shadow">
        {donations.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No donations found. Create your first donation!
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Item</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Organization</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {donations.map((donation) => (
                <tr key={donation.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{donation.dishName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{donation.quantity}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(donation.createdAt).toLocaleDateString()}
                  </td>
                  <td
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 cursor-pointer hover:text-indigo-600 hover:underline"
                    onClick={() => handleNgoClick(donation.organization)}
                  >
                    {donation.organization}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${donation.status === 'completed' ? 'bg-green-100 text-green-800' :
                        donation.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'}`}>
                      {donation.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {donation.status === 'pending' && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => openNgoPopup(donation.id)}
                          className="text-green-600 hover:text-green-900"
                        >
                          <Check className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => updateStatus(donation.id, 'cancelled')}
                          className="text-red-600 hover:text-red-900"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showNgoPopup && (
        <NgoPopup
          ngo={ngoList}
          currentLocation={currentLocation}
          onClose={closeNgoPopup}
          onSelect={handleNgoSelect}
        />
      )}
    </div>
  );
}