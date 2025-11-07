import React, { useState, useRef } from 'react';
import FileUpload from './FileUpload';

const MessageInput = ({ onSend, onTyping, onStopTyping }) => {
  const [message, setMessage] = useState('');
  const [showFileUpload, setShowFileUpload] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const typingTimeoutRef = useRef(null);
  const MAX_CHARS = 500;

  const handleChange = (e) => {
    const value = e.target.value;
    if (value.length <= MAX_CHARS) {
      setMessage(value);
      setCharCount(value.length);

      if (value.trim()) {
        onTyping();
        
        if (typingTimeoutRef.current) {
          clearTimeout(typingTimeoutRef.current);
        }

        typingTimeoutRef.current = setTimeout(() => {
          onStopTyping();
        }, 1000);
      } else {
        onStopTyping();
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (message.trim()) {
      onSend(message.trim(), 'text');
      setMessage('');
      setCharCount(0);
      onStopTyping();
      
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    }
  };

  const handleFileUpload = (fileUrl) => {
    onSend(fileUrl, 'file');
    setShowFileUpload(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="border-t-8 border-black bg-white p-6">
      {/* Character Counter */}
      {charCount > 0 && (
        <div className="mb-3 flex justify-end">
          <span className={`text-sm font-black ${charCount >= MAX_CHARS ? 'text-red-500' : 'text-gray-600'}`}>
            {charCount}/{MAX_CHARS}
          </span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex space-x-4">
        {/* File Upload Button */}
        <button
          type="button"
          onClick={() => setShowFileUpload(!showFileUpload)}
          className={`group px-5 py-4 text-3xl border-4 border-black transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform hover:-translate-x-1 hover:-translate-y-1 ${
            showFileUpload ? 'bg-yellow-300' : 'bg-white hover:bg-yellow-300'
          }`}
        >
          <span className="group-hover:rotate-45 transition-transform inline-block">📎</span>
        </button>
        
        {/* Message Input */}
        <input
          type="text"
          value={message}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          className="flex-1 px-8 py-4 text-xl font-bold border-4 border-black focus:outline-none focus:ring-0 focus:border-black focus:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all placeholder:text-gray-400 placeholder:font-bold"
          maxLength={MAX_CHARS}
        />
        
        {/* Send Button */}
        <button
          type="submit"
          disabled={!message.trim()}
          className="group px-8 py-4 text-xl font-black bg-black text-white border-4 border-black hover:bg-white hover:text-black transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform hover:-translate-x-1 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-black disabled:hover:text-white disabled:transform-none"
        >
          <span className="flex items-center space-x-2">
            <span>SEND</span>
            <span className="text-2xl group-hover:translate-x-1 transition-transform">→</span>
          </span>
        </button>
      </form>

      {showFileUpload && (
        <FileUpload 
          onUpload={handleFileUpload}
          onClose={() => setShowFileUpload(false)}
        />
      )}
    </div>
  );
};

export default MessageInput;
