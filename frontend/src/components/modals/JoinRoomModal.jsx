import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useTheme } from "../../context/ThemeContext";

const JoinRoomModal = ({ isOpen, onClose, onOpenCreate }) => {
  const { theme } = useTheme();
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
        const roomCodeInt = parseInt(formData.roomId);
        const storedAdminToken =
          sessionStorage.getItem(`hush_admin_${roomCodeInt}`) ||
          localStorage.getItem(`hush_admin_${roomCodeInt}`);

        let isAdmin = false;
        if (storedAdminToken) {
          try {
            const verifyRes = await fetch(`${BACKEND_URL}/api/room/verify-admin`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                roomCode: roomCodeInt,
                adminToken: storedAdminToken,
              }),
            });
            const verifyData = await verifyRes.json();
            isAdmin = Boolean(verifyData.isAdmin);
          } catch (e) {
            console.error("Admin verification error:", e);
          }
        }

        localStorage.setItem(
          "currentRoom",
          JSON.stringify({
            roomCode: roomCodeInt,
            roomName: data.room.roomName,
            isAdmin,
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
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      <div className={`relative w-full max-w-md transform transition-all duration-200 scale-100 overflow-hidden ${theme === 'dark'
        ? 'bg-[#18181B] border border-[#27272A] text-white rounded-3xl shadow-2xl'
        : 'bg-white border-4 border-black text-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]'
        }`}>
        {/* Header */}
        <div className={`p-6 border-b ${theme === 'dark' ? 'border-[#27272A]' : 'bg-black text-white border-black border-b-4'}`}>
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight flex items-center gap-3">
              <span className="text-2xl">🔗</span>
              <span>Join Room</span>
            </h2>
            <button
              onClick={onClose}
              className={`w-8 h-8 flex items-center justify-center transition-colors ${theme === 'dark'
                ? 'bg-[#27272A] text-gray-400 hover:text-white hover:bg-[#3F3F46] rounded-full'
                : 'bg-white text-black font-black border-2 border-white hover:bg-black hover:text-white hover:border-white'
                }`}
            >
              ✕
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className={`p-4 text-sm font-medium flex items-center gap-2 ${theme === 'dark'
              ? 'bg-red-500/10 text-red-400 rounded-xl'
              : 'bg-red-500 text-white border-4 border-black font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
              }`}>
              <span>⚠️</span>
              {error}
            </div>
          )}

          <div className="space-y-3">
            <label
              htmlFor="roomId"
              className={`block text-sm font-bold uppercase tracking-wider ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}
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
              className={`w-full px-4 py-4 text-2xl font-black text-center tracking-widest outline-none transition-all ${theme === 'dark'
                ? 'bg-[#09090B] border-2 border-[#27272A] focus:border-[#EAB308] text-white placeholder-gray-700 rounded-xl'
                : 'bg-white border-4 border-black text-black placeholder-gray-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
                }`}
            />
            <p className={`text-xs text-center font-medium ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
              Enter the 4-digit room code
            </p>
          </div>

          {/* Private Toggle */}
          <div className="space-y-4">
            <label className={`flex items-center gap-4 cursor-pointer p-4 border transition-all ${theme === 'dark'
              ? 'border-[#27272A] hover:bg-[#27272A]/50 rounded-2xl'
              : 'border-2 border-black hover:bg-gray-50'
              }`}>
              <div className="relative">
                <input
                  type="checkbox"
                  name="isPrivate"
                  checked={formData.isPrivate}
                  onChange={handleChange}
                  className="sr-only peer"
                />
                <div className={`w-12 h-7 transition-colors ${theme === 'dark' ? 'bg-[#3F3F46] peer-checked:bg-[#EAB308] rounded-full' : 'bg-gray-300 border-2 border-black peer-checked:bg-green-400'
                  }`}></div>
                <div className={`absolute left-1 top-1 w-5 h-5 transition-transform peer-checked:translate-x-5 ${theme === 'dark' ? 'bg-white rounded-full' : 'bg-black border border-black'
                  }`}></div>
              </div>
              <div>
                <span className={`block text-base font-bold ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                  Private Room
                </span>
              </div>
            </label>
          </div>

          {formData.isPrivate && (
            <div className={`space-y-3 p-4 animate-fadeIn ${theme === 'dark' ? 'bg-[#27272A]/50 rounded-xl' : 'bg-yellow-300 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
              }`}>
              <label className={`block text-sm font-bold uppercase tracking-wider ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter room password"
                  className={`w-full px-4 py-3 outline-none transition-all ${theme === 'dark'
                    ? 'bg-[#09090B] border-2 border-[#27272A] focus:border-[#EAB308] text-white placeholder-gray-600 rounded-xl'
                    : 'bg-white border-2 border-black focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-black placeholder-gray-400 font-bold'
                    }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-3 top-1/2 -translate-y-1/2 p-1.5 font-bold transition-all ${theme === 'dark'
                    ? 'bg-[#27272A] text-gray-400 hover:text-white rounded-lg'
                    : 'bg-black text-white hover:bg-white hover:text-black border border-black'
                    }`}
                >
                  {showPassword ? "HIDE" : "SHOW"}
                </button>
              </div>
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className={`flex-1 px-6 py-4 font-bold transition-all ${theme === 'dark'
                ? 'bg-[#27272A] text-white hover:bg-[#3F3F46] rounded-full'
                : 'bg-white border-2 border-black text-black hover:bg-black hover:text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none'
                }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`flex-[2] px-6 py-4 font-bold transition-all items-center justify-center gap-2 ${theme === 'dark'
                ? 'bg-[#EAB308] text-black hover:bg-[#D97706] shadow-yellow-900/20 rounded-full shadow-lg transform active:scale-95'
                : 'bg-black text-white border-2 border-black hover:bg-white hover:text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none'
                }`}
            >
              {loading ? "Joining..." : "Join Room"}
            </button>
          </div>

          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenCreate();
              }}
              className={`text-sm font-bold hover:underline ${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-black decoration-2 decoration-yellow-400 hover:decoration-black'}`}
            >
              Don't have a room? Create one
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JoinRoomModal;
