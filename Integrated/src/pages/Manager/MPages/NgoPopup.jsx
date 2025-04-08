import React from 'react';

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

const NgoPopup = ({ ngo, currentLocation, onClose, onSelect }) => {
  const ngoList = Array.isArray(ngo) ? ngo : [ngo];

  const handleSelect = (selectedNgo) => {
    if (onSelect) {
      onSelect(selectedNgo);
    }
  };

  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-bold text-gray-900">Select NGO for Donation</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        
        {currentLocation && (
          <div className="mb-4 p-3 bg-blue-50 rounded-md">
            <p className="font-medium text-blue-800">Your Current Location:</p>
            <p className="text-sm text-blue-700">
              {currentLocation.latitude.toFixed(6)}°N, {currentLocation.longitude.toFixed(6)}°E
            </p>
          </div>
        )}
        
        <div className="grid gap-4 md:grid-cols-2">
          {ngoList.map((ngoItem, index) => {
            let distance = null;
            if (currentLocation && ngoItem.coordinates) {
              distance = calculateDistance(
                currentLocation.latitude,
                currentLocation.longitude,
                ngoItem.coordinates.latitude,
                ngoItem.coordinates.longitude
              );
            }

            return (
              <div 
                key={index}
                className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors relative"
                onClick={() => handleSelect(ngoItem)}
              >
                <h3 className="font-semibold text-lg mb-2">{ngoItem.organizationName}</h3>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-600">
                    <span className="font-medium">Address:</span> {ngoItem.address}
                  </p>
                  
                  {distance !== null && (
                    <div className="absolute bottom-4 right-4 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                      {distance.toFixed(1)} km away
                    </div>
                  )}

                  {ngoItem.coordinates && (
                    <div className="mt-2">
                      <p className="text-gray-600">
                        <span className="font-medium">Location:</span> 
                        {ngoItem.coordinates.latitude && ` ${ngoItem.coordinates.latitude}°N`}
                        {ngoItem.coordinates.longitude && ` ${ngoItem.coordinates.longitude}°E`}
                      </p>
                      <a
                        href={`https://www.google.com/maps?q=${ngoItem.coordinates?.latitude},${ngoItem.coordinates?.longitude}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center mt-2 px-3 py-1.5 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
                      >
                        View on Map
                      </a>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default NgoPopup;