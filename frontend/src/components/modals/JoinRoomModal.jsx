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

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

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

    if (!/^\d{4}$/.test(formData.roomId)) {
      setError("Room ID must be a 4-digit number!");
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roomId: parseInt(formData.roomId),
          isPrivate: formData.isPrivate,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem(
          "currentRoom",
          JSON.stringify({
            roomCode: parseInt(formData.roomId),
            roomName: data.room.roomName,
            isAdmin: false,
          })
        );

        navigate(`/room/${formData.roomId}`);
        onClose();
      } else {
        if (response.status === 404) {
          setError("Room not found! Please check your room code.");
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
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      ></div>

      <div className="relative bg-white border-8 border-black shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] max-w-2xl w-full transform -rotate-1 hover:rotate-0 transition-transform">
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

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {error && (
            <div className="bg-red-500 text-white border-4 border-black p-4 font-bold">
              ⚠️ {error}
            </div>
          )}

          <div className="space-y-3">
            <label
              htmlFor="roomId"
              className="block text-xl font-black uppercase"
            >
              Room ID <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="roomId"
              name="roomId"
              value={formData.roomId}
              onChange={handleChange}
              placeholder="1234"
              required
              className="w-full px-6 py-4 text-2xl font-black text-center border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            />
            <p className="text-sm font-bold text-gray-600">
              Enter the <b>4-digit</b> room code shared with you
            </p>
          </div>

          {/* Private Toggle */}
          <label className="flex items-center space-x-4 cursor-pointer">
            <input
              type="checkbox"
              name="isPrivate"
              checked={formData.isPrivate}
              onChange={handleChange}
              className="sr-only peer"
            />
            <div className="w-16 h-8 bg-gray-300 border-4 border-black peer-checked:bg-yellow-400 transition-all relative">
              <div className="absolute left-1 top-1 w-6 h-6 bg-black transition-all peer-checked:translate-x-8" />
            </div>
            <span className="text-xl font-black">Private Room 🔒</span>
          </label>

          {formData.isPrivate && (
            <div className="space-y-3 bg-yellow-300 border-4 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <label className="block text-xl font-black uppercase">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter room password"
                  className="w-full px-6 py-4 border-4 border-black font-bold"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-2 bg-black text-white font-black border-2 border-black hover:bg-white hover:text-black transition-all"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>
          )}

          <div className="flex space-x-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-8 py-5 text-xl font-black bg-black text-white border-4 border-black hover:bg-white hover:text-black transition-all"
            >
              {loading ? "JOINING..." : "JOIN ROOM"}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-8 py-5 text-xl font-black border-4 border-black hover:bg-black hover:text-white transition-all"
            >
              CANCEL
            </button>
          </div>

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
              className="text-sm font-black underline decoration-4 decoration-yellow-300 hover:decoration-black"
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
