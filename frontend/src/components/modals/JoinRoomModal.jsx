import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const JoinRoomModal = ({ isOpen, onClose, onOpenCreate }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    roomId: "",
    isPrivate: false,
    password: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setError("");
  };

  const validateForm = () => {
    if (!formData.roomId) {
      setError("Room ID is required!");
      return false;
    }
    if (isNaN(formData.roomId)) {
      setError("Room ID must be a number!");
      return false;
    }
    if (formData.isPrivate && !formData.password) {
      setError("Password is required for private rooms!");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${BACKEND_URL}/api/room/join`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          roomId: parseInt(formData.roomId),
          isPrivate: formData.isPrivate,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store room info in localStorage
        localStorage.setItem(
          "currentRoom",
          JSON.stringify({
            roomCode: parseInt(formData.roomId),
            roomName: data.room.roomName,
            isAdmin: false,
          })
        );

        // Navigate to room
        navigate(`/room/${formData.roomId}`);
        onClose();
      } else {
        // Handle specific errors
        if (response.status === 404) {
          setError("Room not found! Please check the room ID.");
        } else if (response.status === 400) {
          setError(data.message || "Wrong password or invalid credentials.");
        } else {
          setError(data.message || "Failed to join room");
        }
      }
    } catch (err) {
      setError("Network error. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-white border-8 border-black shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] max-w-2xl w-full transform -rotate-1 hover:rotate-0 transition-transform">
        {/* Header */}
        <div className="bg-black text-white p-6 border-b-8 border-black">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-black tracking-tighter flex items-center space-x-3">
              <span className="text-4xl">🔗</span>
              <span>JOIN ROOM</span>
            </h2>
            <button
              onClick={onClose}
              className="w-12 h-12 bg-white text-black font-black text-2xl border-4 border-white hover:bg-black hover:text-white hover:border-white transition-all transform hover:rotate-90"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* Info Banner */}
          <div className="bg-blue-300 border-4 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex items-start space-x-3">
              <span className="text-3xl">💡</span>
              <div>
                <h3 className="font-black text-lg mb-1">NEED A ROOM CODE?</h3>
                <p className="font-bold text-sm">
                  Ask the room creator to share their unique Room ID with you.
                </p>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-500 text-white border-4 border-black p-4 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <span className="text-xl mr-2">⚠️</span>
              {error}
            </div>
          )}

          {/* Room ID */}
          <div className="space-y-3">
            <label
              htmlFor="roomId"
              className="block text-xl font-black uppercase tracking-wider"
            >
              Room ID
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              id="roomId"
              name="roomId"
              value={formData.roomId}
              onChange={handleChange}
              placeholder="123456"
              required
              className="w-full px-6 py-4 text-2xl font-black text-center border-4 border-black focus:outline-none focus:ring-0 focus:border-black focus:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all tracking-wider"
            />
            <p className="text-sm font-bold text-gray-600">
              Enter the 6-digit room code shared with you
            </p>
          </div>

          {/* Private Room Toggle */}
          <div className="space-y-4">
            <label className="flex items-center space-x-4 cursor-pointer group">
              <div className="relative">
                <input
                  type="checkbox"
                  name="isPrivate"
                  checked={formData.isPrivate}
                  onChange={handleChange}
                  className="sr-only peer"
                />
                <div className="w-16 h-8 bg-gray-300 border-4 border-black peer-checked:bg-yellow-400 transition-all"></div>
                <div className="absolute left-1 top-1 w-6 h-6 bg-black border-2 border-black transition-all peer-checked:translate-x-8"></div>
              </div>
              <div>
                <span className="text-xl font-black uppercase tracking-wider">
                  Private Room 🔒
                </span>
                <p className="text-sm font-bold text-gray-600">
                  This room requires a password
                </p>
              </div>
            </label>
          </div>

          {/* Password (Conditional) */}
          {formData.isPrivate && (
            <div className="space-y-3 bg-yellow-300 border-4 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <label
                htmlFor="password"
                className="block text-xl font-black uppercase tracking-wider"
              >
                Password
                <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter room password"
                  className="w-full px-6 py-4 pr-16 text-lg font-bold border-4 border-black focus:outline-none focus:ring-0 focus:border-black focus:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-2 bg-black text-white font-black text-sm hover:bg-white hover:text-black border-2 border-black transition-all"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
              <p className="text-sm font-bold text-black">
                🔑 Get the password from the room creator
              </p>
            </div>
          )}

          {/* Submit Buttons */}
          <div className="flex space-x-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-8 py-5 text-xl font-black bg-black text-white border-4 border-black hover:bg-white hover:text-black transition-all shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transform hover:-translate-x-1 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center space-x-3">
                  <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>JOINING...</span>
                </span>
              ) : (
                "JOIN ROOM"
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-8 py-5 text-xl font-black border-4 border-black hover:bg-black hover:text-white transition-all shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transform hover:-translate-x-1 hover:-translate-y-1 disabled:opacity-50"
            >
              CANCEL
            </button>
          </div>

          {/* Help Text */}
          <div className="text-center pt-4 space-y-2">
            <p className="text-sm font-bold text-gray-600">
              Don't have a room ID?
            </p>
            <button
              type="button"
              onClick={() => {
                onClose(); 
                onOpenCreate(); 
              }}
              className="text-sm font-black underline decoration-4 decoration-yellow-300 hover:decoration-black transition-all"
            >
              CREATE YOUR OWN ROOM INSTEAD
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JoinRoomModal;
