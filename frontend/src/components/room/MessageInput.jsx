import React, { useState, useRef } from 'react';
import FileUpload from './FileUpload';
import { useTheme } from '../../context/ThemeContext';

const MessageInput = ({ onSend, onTyping, onStopTyping }) => {
  const [message, setMessage] = useState('');
  const [showFileUpload, setShowFileUpload] = useState(false);
  const typingTimeoutRef = useRef(null);
  const { theme } = useTheme();
  const MAX_CHARS = 500;

  const handleChange = (e) => {
    const value = e.target.value;
    if (value.length <= MAX_CHARS) {
      setMessage(value);

      if (value.trim()) {
        onTyping();
        if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = setTimeout(() => onStopTyping(), 1000);
      } else {
        onStopTyping();
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSend(message.trim(), "text");
      setMessage("");
      onStopTyping();
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    }
  };

  const handleFileUpload = (fileUrl) => {
    onSend(fileUrl, "file");
    setShowFileUpload(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className={`p-2 lg:p-4 shrink-0 relative z-30 transition-colors duration-300 ${theme === 'dark'
      ? 'bg-[#18181B] border-t border-[#27272A]'
      : 'bg-white border-black border-t-4'
      }`}>
      {/* File Upload Modal */}
      {showFileUpload && (
        <div className={`absolute bottom-full left-0 w-full mb-2 bg-transparent pointer-events-none z-50 px-2 lg:px-0 flex justify-center lg:block`}>
          <div className={`pointer-events-auto p-4 max-w-[90vw] w-full lg:max-w-sm mx-auto rounded-2xl relative ${theme === 'dark' ? 'bg-[#18181B] border border-[#27272A] shadow-2xl' : 'bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]'}`}>
            <div className="flex justify-between items-center mb-3 lg:mb-4">
              <h3 className={`font-black text-lg lg:text-xl ${theme === 'dark' ? 'text-white' : 'text-black'}`}>UPLOAD FILE</h3>
              <button onClick={() => setShowFileUpload(false)} className={`text-xl font-bold ${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-black hover:text-red-500'}`}>✕</button>
            </div>
            <FileUpload onUpload={handleFileUpload} onClose={() => setShowFileUpload(false)} />
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex gap-2 lg:gap-3 items-end">
        {/* Attachment Button */}
        <button
          type="button"
          onClick={() => setShowFileUpload(!showFileUpload)}
          className={`h-10 w-10 lg:h-12 lg:w-12 shrink-0 flex items-center justify-center text-xl lg:text-2xl transition-all rounded-full ${theme === 'dark'
            ? `text-gray-400 hover:bg-[#27272A] hover:text-[#EAB308] ${showFileUpload ? 'text-[#EAB308] bg-[#27272A]' : ''}`
            : `border-2 lg:border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none ${showFileUpload ? 'bg-black text-white' : 'bg-yellow-300 hover:bg-black hover:text-white'}`
            }`}
        >
          📎
        </button>

        {/* Input Field */}
        <div className="flex-1 relative">
          <input
            type="text"
            value={message}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Type something loud..."
            className={`w-full h-10 lg:h-12 px-4 lg:px-6 text-base lg:text-lg focus:outline-none transition-all rounded-full ${theme === 'dark'
              ? 'bg-[#27272A] text-white placeholder-gray-500 border border-transparent focus:border-[#EAB308]'
              : 'h-12 lg:h-16 border-2 lg:border-4 border-black bg-white text-black placeholder:text-gray-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] focus:bg-gray-50'
              }`}
            maxLength={MAX_CHARS}
            autoComplete="off"
          />
          <div className={`absolute right-2 bottom-1/2 transform translate-y-1/2 text-[10px] font-bold px-2 py-0.5 rounded-full ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400 bg-white'
            }`}>
            {message.length}/{MAX_CHARS}
          </div>
        </div>

        {/* Send Button */}
        <button
          type="submit"
          disabled={!message.trim()}
          className={`h-10 w-10 lg:h-12 lg:w-12 shrink-0 flex items-center justify-center rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed group ${theme === 'dark'
            ? 'bg-[#EAB308] text-black hover:bg-[#CA8A04]'
            : 'h-12 w-16 lg:h-16 lg:w-24 border-2 lg:border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-black text-white hover:bg-white hover:text-black active:translate-x-[2px] active:translate-y-[2px] active:shadow-none'
            }`}
        >
          <span className="text-2xl lg:text-4xl group-hover:rotate-[-20deg] transition-transform">➤</span>
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
