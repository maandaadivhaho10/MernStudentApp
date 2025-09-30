import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "./store/authStore";

const LogoutPage = () => {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-80 text-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Logout</h2>
        <p className="mb-8 text-gray-600">
          Are you sure you want to log out?
        </p>
        <button onClick={handleLogout} className="w-full py-3 px-4 bg-red-600 text-white rounded-md hover:bg-red-500 cursor-pointer mb-4">
          Yes, Log Out
        </button>
        <button
          onClick={() => navigate(-1)}
          className="w-full py-3 px-4 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};



export default LogoutPage;