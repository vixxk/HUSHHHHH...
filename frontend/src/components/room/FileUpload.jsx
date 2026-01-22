import React, { useState, useRef } from 'react';

import { useTheme } from '../../context/ThemeContext';

const FileUpload = ({ onUpload, onClose }) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
  const MAX_FILE_SIZE = 10 * 1024 * 1024;

  const validateFile = (file) => {
    if (file.size > MAX_FILE_SIZE) {
      setError('File size must be less than 10MB');
      return false;
    }

    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];

    if (!allowedTypes.includes(file.type)) {
      setError('File type not supported. Use images or documents.');
      return false;
    }

    return true;
  };

  const uploadFile = async (file) => {
    console.log("Starting upload for file:", file.name); // Debug log
    if (!validateFile(file)) return;

    setUploading(true);
    setError('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      console.log("Sending request to:", `${BACKEND_URL}/api/upload`); // Debug log
      const response = await fetch(`${BACKEND_URL}/api/upload`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      console.log("Upload response:", data); // Debug log

      if (response.ok) {
        onUpload(data.url);
      } else {
        setError(data.message || 'Upload failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
      console.error("Upload Error:", err);
    } finally {
      setUploading(false);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      uploadFile(file);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      uploadFile(file);
    }
  };

  const { theme } = useTheme();

  return (
    <div className="w-full">
      {error && (
        <div className={`mb-4 px-3 py-2 text-sm font-bold rounded-lg flex items-center gap-2 ${theme === 'dark' ? 'bg-red-500/10 text-red-500' : 'bg-red-50 text-red-600 border border-red-200'}`}>
          ⚠️ {error}
        </div>
      )}

      {/* Drop Zone */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-xl p-6 lg:p-8 text-center transition-all cursor-pointer group ${dragActive
          ? (theme === 'dark' ? 'border-[#EAB308] bg-[#27272A]' : 'border-blue-500 bg-blue-50')
          : (theme === 'dark' ? 'border-[#3F3F46] hover:border-[#EAB308] hover:bg-[#27272A]' : 'border-gray-300 hover:border-black hover:bg-gray-50')
          } ${theme === 'dark' ? 'bg-[#18181B]' : 'bg-white'}`}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileSelect}
          className="hidden"
          accept="image/*,.pdf,.doc,.docx"
        />

        {uploading ? (
          <div className="space-y-4 py-2">
            <div className={`w-10 h-10 border-4 border-t-transparent rounded-full animate-spin mx-auto ${theme === 'dark' ? 'border-[#EAB308]' : 'border-black'}`}></div>
            <p className={`text-sm font-bold ${theme === 'dark' ? 'text-gray-300' : 'text-black'}`}>UPLOADING...</p>
          </div>
        ) : (
          <div className="space-y-3 py-2">
            <div className={`text-3xl lg:text-4xl transition-transform group-hover:scale-110 duration-200 ${theme === 'dark' ? 'grayscale brightness-150' : ''}`}>📤</div>
            <div>
              <p className={`text-sm lg:text-base font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                {dragActive ? 'DROP FILE HERE' : 'CLICK OR DRAG FILE'}
              </p>
              <p className={`text-xs font-medium ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                Max 10MB • Images & Docs
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
