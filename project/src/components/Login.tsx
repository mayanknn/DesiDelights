import React, { useState } from "react";

interface LoginProps {
  isOpen: boolean;
  onClose: () => void;
}

const Login: React.FC<LoginProps> = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");

  const handleLogin = () => {
    console.log("Logging in with:", { username, phoneNumber, otp });
    onClose(); // ✅ Close modal after login
  };

  if (!isOpen) return null; // ✅ Don't render modal if it's closed

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Login</h2>

        <input
          type="text"
          placeholder="Username"
          className="border p-2 w-full mt-2 rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="text"
          placeholder="Phone Number"
          className="border p-2 w-full mt-2 rounded"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />

        <input
          type="text"
          placeholder="OTP"
          className="border p-2 w-full mt-2 rounded"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />

        <div className="flex justify-between mt-4">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            Close
          </button>

          <button
            className="bg-orange-600 text-white px-4 py-2 rounded"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
