import React, { useState } from 'react';

export default function Auth() {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [otp, setOtp] = useState('');

  const handleSubmitPhone = (e) => {
    e.preventDefault();
    // In a real app, this would trigger OTP sending
    setStep('otp');
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    // In a real app, this would verify OTP and complete order
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      {step === 'phone' ? (
        <form onSubmit={handleSubmitPhone} className="space-y-4">
          <h2 className="text-2xl font-bold text-center">Login to Continue</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700"
          >
            Send OTP
          </button>
        </form>
      ) : (
        <form onSubmit={handleVerifyOtp} className="space-y-4">
          <h2 className="text-2xl font-bold text-center">Enter OTP</h2>
          <p className="text-center text-gray-600">
            We've sent a code to {phone}
          </p>
          <div>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
              maxLength={6}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700"
          >
            Verify OTP
          </button>
        </form>
      )}
    </div>
  );
}