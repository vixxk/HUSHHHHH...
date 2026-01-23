import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { saveUserData } from "../../utils/userStorage";
import { LuLoader } from "react-icons/lu";

import { useTheme } from "../../context/ThemeContext";

const CreateRoomModal = ({ isOpen, onClose }) => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [generatingId, setGeneratingId] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const [formData, setFormData] = useState({
    roomName: "",
    roomId: "",
    isPrivate: false,
    password: "",
    admin: Date.now(),
  });

  useEffect(() => {
    if (isOpen) {
      generateRoomId();
      setFormData(prev => ({ ...prev, admin: Date.now() }));
    }
  }, [isOpen]);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const generateRoomId = async () => {
    setGeneratingId(true);
    setError("");
    try {
      const response = await fetch(`${BACKEND_URL}/api/room/generateRoomId`);
      const data = await response.json();

      if (response.ok) {
        setFormData((prev) => ({ ...prev, roomId: data.generatedId }));
      } else {
        setError("Failed to generate room ID");
      }
    } catch (err) {
      setError("Network error. Please try again.");
      console.error(err);
    } finally {
      setGeneratingId(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setError("");
  };

  const copyRoomId = () => {
    navigator.clipboard.writeText(formData.roomId.toString());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const validateForm = () => {
    if (!formData.roomName.trim()) {
      setError("Room name is required!");
      return false;
    }
    if (formData.roomName.length < 2 || formData.roomName.length > 50) {
      setError("Room name must be 2-50 characters!");
      return false;
    }
    if (formData.isPrivate && !formData.password) {
      setError("Password is required for private rooms!");
      return false;
    }
    if (formData.isPrivate && formData.password.length < 4) {
      setError("Password must be at least 4 characters!");
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
      const response = await fetch(`${BACKEND_URL}/api/room/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        const adminUser = {
          id: formData.admin,
          name: `User${Math.floor(Math.random() * 1000)}`
        };

        localStorage.setItem(
          "currentRoom",
          JSON.stringify({
            roomCode: formData.roomId,
            roomName: formData.roomName,
            isAdmin: true,
            admin: formData.admin,
          })
        );

        saveUserData(formData.roomId, adminUser);

        navigate(`/room/${formData.roomId}`);
        onClose();
      } else {
        setError(data.message || "Failed to create room");
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

      <div className={`relative w-[95%] md:w-full max-w-lg max-h-[90vh] overflow-y-auto transform transition-all duration-200 scale-100 ${theme === 'dark'
        ? 'bg-[#18181B] border border-[#27272A] text-white rounded-3xl shadow-2xl'
        : 'bg-white border-2 md:border-4 border-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-none'
        }`}>
        {/* Header */}
        <div className={`p-4 md:p-6 border-b ${theme === 'dark' ? 'border-[#27272A]' : 'bg-black text-white border-black border-b-2 md:border-b-4'}`}>
          <div className="flex items-center justify-between">
            <h2 className="text-xl md:text-2xl font-bold tracking-tight flex items-center gap-3">
              <span className="text-xl md:text-2xl">✨</span>
              <span>Create Room</span>
            </h2>
            <button
              onClick={onClose}
              className={`w-8 h-8 flex items-center justify-center transition-colors ${theme === 'dark'
                ? 'bg-[#27272A] text-gray-400 hover:text-white hover:bg-[#3F3F46] rounded-full'
                : 'bg-white text-black font-black border-2 border-white hover:bg-black hover:text-white hover:border-white rounded-none'
                }`}
            >
              ✕
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-4 md:p-6 space-y-4 md:space-y-6">
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
            <label className={`block text-sm font-bold uppercase tracking-wider ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              Room ID
              <span className={`ml-2 text-[10px] px-2 py-0.5 ${theme === 'dark' ? 'bg-[#27272A] text-[#EAB308] rounded-full' : 'bg-yellow-300 text-black border-2 border-black font-bold'
                }`}>
                AUTO-GENERATED
              </span>
            </label>
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={formData.roomId}
                  readOnly
                  className={`w-full px-3 py-2 md:px-4 md:py-3 text-base md:text-lg font-mono font-bold outline-none transition-all ${theme === 'dark'
                    ? 'bg-[#09090B] border border-[#27272A] text-gray-300 rounded-xl'
                    : 'bg-gray-100 border-2 border-black text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
                    }`}
                />
                {generatingId && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <LuLoader className={`w-5 h-5 animate-spin ${theme === 'dark' ? 'text-[#EAB308]' : 'text-black'}`} />
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={copyRoomId}
                className={`px-3 py-2 md:px-4 md:py-2 text-sm md:text-base font-bold transition-all flex items-center gap-2 ${theme === 'dark'
                  ? 'bg-[#27272A] text-white hover:bg-[#3F3F46] rounded-xl'
                  : 'bg-yellow-300 border-2 border-black text-black hover:bg-black hover:text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none'
                  }`}
                title="Copy ID"
              >
                {copied ? "✓" : "📋"}
              </button>
              <button
                type="button"
                onClick={generateRoomId}
                disabled={generatingId}
                className={`px-3 py-2 md:px-4 md:py-2 text-sm md:text-base font-bold transition-all ${theme === 'dark'
                  ? 'bg-[#27272A] text-white hover:bg-[#3F3F46] rounded-xl'
                  : 'bg-white border-2 border-black text-black hover:bg-black hover:text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none'
                  }`}
                title="Generate New ID"
              >
                🔄
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <label htmlFor="roomName" className={`block text-sm font-bold uppercase tracking-wider ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              Room Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="roomName"
              name="roomName"
              value={formData.roomName}
              onChange={handleChange}
              placeholder="My Awesome Chat Room"
              maxLength={50}
              required
              className={`w-full px-3 py-2 md:px-4 md:py-3 text-sm md:text-base outline-none transition-all ${theme === 'dark'
                ? 'bg-[#09090B] border-2 border-[#27272A] focus:border-[#EAB308] text-white placeholder-gray-600 rounded-xl'
                : 'bg-white border-2 border-black focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-black placeholder-gray-400 font-bold'
                }`}
            />
            <p className={`text-xs font-medium text-right ${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}`}>
              {formData.roomName.length}/50
            </p>
          </div>

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
                <div className={`w-12 h-7 transition-colors ${theme === 'dark' ? 'bg-[#3F3F46] peer-checked:bg-[#EAB308] rounded-full' : 'bg-gray-300 border-2 border-black peer-checked:bg-green-400 rounded-full'
                  }`}></div>
                <div className={`absolute left-1 top-1 w-5 h-5 transition-transform peer-checked:translate-x-5 ${theme === 'dark' ? 'bg-white rounded-full' : 'bg-black border border-black rounded-full'
                  }`}></div>
              </div>
              <div>
                <span className={`block text-base font-bold ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                  Private Room
                </span>
                <span className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                  Require a password to join
                </span>
              </div>
            </label>
          </div>

          {formData.isPrivate && (
            <div className={`space-y-3 p-4 animate-fadeIn ${theme === 'dark' ? 'bg-[#27272A]/50 rounded-xl' : 'bg-yellow-300 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-none'
              }`}>
              <label htmlFor="password" className={`block text-sm font-bold uppercase tracking-wider ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter a secure password"
                minLength={4}
                className={`w-full px-4 py-3 outline-none transition-all ${theme === 'dark'
                  ? 'bg-[#09090B] border-2 border-[#27272A] focus:border-[#EAB308] text-white placeholder-gray-600 rounded-xl'
                  : 'bg-white border-2 border-black focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-black placeholder-gray-400 font-bold'
                  }`}
              />
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className={`flex-1 px-4 py-3 md:px-6 md:py-4 text-sm md:text-base font-bold transition-all ${theme === 'dark'
                ? 'bg-[#27272A] text-white hover:bg-[#3F3F46] rounded-full'
                : 'bg-white border-2 border-black text-black hover:bg-black hover:text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none'
                }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || generatingId}
              className={`flex-[2] px-4 py-3 md:px-6 md:py-4 text-sm md:text-base font-bold transition-all items-center justify-center gap-2 ${theme === 'dark'
                ? 'bg-[#EAB308] text-black hover:bg-[#D97706] shadow-yellow-900/20 rounded-full shadow-lg transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed'
                : 'bg-black text-white border-2 border-black hover:bg-white hover:text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none disabled:opacity-50 disabled:cursor-not-allowed'
                }`}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <LuLoader className={`w-5 h-5 animate-spin ${theme === 'dark' ? 'text-black' : 'text-white group-hover:text-black'}`} />
                  <span>Creating Room...</span>
                </div>
              ) : (
                "Create Room"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateRoomModal;
