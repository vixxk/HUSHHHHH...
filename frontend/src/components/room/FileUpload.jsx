import React, { useState, useRef } from 'react';

const FileUpload = ({ onUpload, onClose }) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
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
    if (!validateFile(file)) return;

    setUploading(true);
    setError('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`${BACKEND_URL}/api/upload`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        onUpload(data.url);
      } else {
        setError(data.message || 'Upload failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
      console.error(err);
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

  return (
    <div className="mt-4 bg-yellow-300 border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-black uppercase">📎 UPLOAD FILE</h3>
        <button
          onClick={onClose}
          className="w-8 h-8 bg-black text-white font-black border-2 border-black hover:bg-white hover:text-black transition-all"
        >
          ✕
        </button>
      </div>

      {error && (
        <div className="mb-4 bg-red-500 text-white border-4 border-black p-3 font-bold">
          ⚠️ {error}
        </div>
      )}

      {/* Drop Zone */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`border-4 border-dashed ${
          dragActive ? 'border-black bg-white' : 'border-black bg-white'
        } p-8 text-center transition-all cursor-pointer hover:bg-gray-50`}
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
          <div className="space-y-4">
            <div className="w-16 h-16 border-8 border-black border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-lg font-black">UPLOADING...</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-5xl">📤</div>
            <div>
              <p className="text-lg font-black mb-2">
                {dragActive ? 'DROP FILE HERE' : 'CLICK OR DRAG FILE'}
              </p>
              <p className="text-sm font-bold text-gray-700">
                Max 10MB • Images & Documents
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
