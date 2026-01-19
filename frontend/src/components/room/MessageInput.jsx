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
      onSend(message.trim(), "text");
      setMessage("");
      setCharCount(0);
      onStopTyping();

      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
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
    <div className="border-t-8 border-black bg-white p-3 lg:p-6">
      {/* Character Counter */}
      {charCount > 0 && (
        <div className="mb-3 flex justify-end">
          <span
            className={`text-sm font-black ${charCount >= MAX_CHARS ? "text-red-500" : "text-gray-600"
              }`}
          >
            {charCount}/{MAX_CHARS}
          </span>
        </div>
      )}

      {/* DESKTOP LAYOUT */}
      <form onSubmit={handleSubmit} className="hidden lg:flex space-x-4">
        {/* File Upload Button */}
        <button
          type="button"
          onClick={() => setShowFileUpload(!showFileUpload)}
          className={`group px-3 py-3 lg:px-5 lg:py-4 text-2xl lg:text-3xl border-4 border-black transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform hover:-translate-x-1 hover:-translate-y-1 ${showFileUpload ? "bg-yellow-300" : "bg-white hover:bg-yellow-300"
            }`}
        >
          <span className="group-hover:rotate-45 transition-transform inline-block">
            📎
          </span>
        </button>

        {/* Message Textarea */}
        <textarea
          value={message}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          className="flex-1 px-3 py-2 lg:px-5 lg:py-1 text-base lg:text-xl font-bold border-3 border-black focus:outline-none focus:ring-0 focus:border-black focus:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all placeholder:text-gray-400 placeholder:font-bold resize-none"
          maxLength={MAX_CHARS}
          rows={2}
        />

        {/* Send Button */}
        <button
          type="submit"
          disabled={!message.trim()}
          className="group px-3 py-3 lg:px-8 lg:py-4 text-sm lg:text-xl font-black bg-black text-white border-4 border-black hover:bg-white hover:text-black transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform hover:-translate-x-1 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-black disabled:hover:text-white disabled:transform-none"
        >
          <span className="flex items-center space-x-2">
            <span>SEND</span>
            <span className="text-2xl group-hover:translate-x-1 transition-transform">
              →
            </span>
          </span>
        </button>
      </form>

      {/* MOBILE LAYOUT */}
      <form onSubmit={handleSubmit} className="flex lg:hidden items-end space-x-2">
        <button
          type="button"
          onClick={() => setShowFileUpload(!showFileUpload)}
          className={`shrink-0 w-12 h-12 flex items-center justify-center text-xl border-2 border-black transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:scale-95 ${showFileUpload ? "bg-yellow-300" : "bg-white active:bg-yellow-300"
            }`}
        >
          📎
        </button>

        <div className="flex-1 relative">
          <textarea
            value={message}
            onChange={handleChange}
            placeholder="Message..."
            className="w-full px-3 py-3 text-base font-bold border-2 border-black focus:outline-none focus:border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] placeholder:text-gray-400 resize-none h-12 leading-tight"
            maxLength={MAX_CHARS}
          />
        </div>

        <button
          type="submit"
          disabled={!message.trim()}
          className="shrink-0 w-12 h-12 flex items-center justify-center bg-black text-white border-2 border-black active:scale-95 transition-transform disabled:opacity-50 disabled:cursor-not-allowed shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
        >
          <span className="text-xl">➜</span>
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
