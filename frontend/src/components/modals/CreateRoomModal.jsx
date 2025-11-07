import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { saveUserData } from "../../utils/userStorage";

const CreateRoomModal = ({ isOpen, onClose }) => {
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
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      ></div>

      <div className="relative bg-white border-8 border-black shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] max-w-2xl w-full max-h-[90vh] overflow-y-auto transform rotate-1 hover:rotate-0 transition-transform">
        <div className="bg-black text-white p-6 border-b-8 border-black sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-black tracking-tighter flex items-center space-x-3">
              <span className="text-4xl">➕</span>
              <span>CREATE ROOM</span>
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
            <div className="bg-red-500 text-white border-4 border-black p-4 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <span className="text-xl mr-2">⚠️</span>
              {error}
            </div>
          )}

          <div className="space-y-3">
            <label className="block text-xl font-black uppercase tracking-wider">
              Room ID
              <span className="ml-2 text-sm bg-yellow-300 text-black px-2 py-1 border-2 border-black">
                AUTO-GENERATED
              </span>
            </label>
            <div className="flex space-x-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={formData.roomId}
                  readOnly
                  className="w-full px-6 py-4 text-2xl font-black border-4 border-black bg-gray-100 text-gray-700 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                />
                {generatingId && (
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <div className="w-6 h-6 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={copyRoomId}
                className="px-6 py-4 bg-yellow-300 border-4 border-black font-black hover:bg-black hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transform hover:-translate-x-1 hover:-translate-y-1"
              >
                {copied ? "✓ COPIED!" : "📋 COPY"}
              </button>
              <button
                type="button"
                onClick={generateRoomId}
                disabled={generatingId}
                className="px-6 py-4 bg-white border-4 border-black font-black hover:bg-black hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transform hover:-translate-x-1 hover:-translate-y-1 disabled:opacity-50"
              >
                🔄
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <label
              htmlFor="roomName"
              className="block text-xl font-black uppercase tracking-wider"
            >
              Room Name
              <span className="text-red-500 ml-1">*</span>
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
              className="w-full px-6 py-4 text-lg font-bold border-4 border-black focus:outline-none focus:ring-0 focus:border-black focus:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
            />
            <p className="text-sm font-bold text-gray-600">
              {formData.roomName.length}/50 characters
            </p>
          </div>

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
                <div className="w-16 h-8 bg-gray-300 border-4 border-black peer-checked:bg-green-400 transition-all"></div>
                <div className="absolute left-1 top-1 w-6 h-6 bg-black border-2 border-black transition-all peer-checked:translate-x-8"></div>
              </div>
              <div>
                <span className="text-xl font-black uppercase tracking-wider">
                  Private Room 🔒
                </span>
                <p className="text-sm font-bold text-gray-600">
                  Require password to join
                </p>
              </div>
            </label>
          </div>

          {formData.isPrivate && (
            <div className="space-y-3 bg-yellow-300 border-4 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <label
                htmlFor="password"
                className="block text-xl font-black uppercase tracking-wider"
              >
                Password
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter a secure password"
                minLength={4}
                className="w-full px-6 py-4 text-lg font-bold border-4 border-black focus:outline-none focus:ring-0 focus:border-black focus:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
              />
              <p className="text-sm font-bold text-black">
                ⚠️ Minimum 4 characters. Share this with invited members only!
              </p>
            </div>
          )}

          <div className="flex space-x-4 pt-4">
            <button
              type="submit"
              disabled={loading || generatingId}
              className="flex-1 px-8 py-5 text-xl font-black bg-black text-white border-4 border-black hover:bg-white hover:text-black transition-all shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transform hover:-translate-x-1 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center space-x-3">
                  <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>CREATING...</span>
                </span>
              ) : (
                "CREATE ROOM"
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
        </form>
      </div>
    </div>
  );
};

export default CreateRoomModal;
