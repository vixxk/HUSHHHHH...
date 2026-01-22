import React, { useState, useEffect } from "react";

import { useTheme } from '../../context/ThemeContext';

const Message = ({ message, isOwnMessage }) => {
  const [copied, setCopied] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const { theme } = useTheme();



  const formatTime = () => {
    const now = new Date(); // In a real app, use message timestamp
    return now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  useEffect(() => {
    let timer;
    if (copied) {
      timer = setTimeout(() => setCopied(false), 2000);
    }
    return () => clearTimeout(timer);
  }, [copied]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  const isImage = (url) => {
    return /\.(jpg|jpeg|png|gif|webp)$/i.test(url);
  };

  // Avatar Color Generator based on sender name
  const getAvatarColor = (name) => {
    const colors = [
      'bg-red-500', 'bg-blue-500', 'bg-green-500',
      'bg-purple-500', 'bg-pink-500', 'bg-orange-500'
    ];
    let sum = 0;
    for (let i = 0; i < name.length; i++) {
      sum += name.charCodeAt(i);
    }
    return colors[sum % colors.length];
  };

  if (isOwnMessage) {
    return (
      <div className="flex items-end flex-row-reverse gap-2 lg:gap-4 animate-slideInRight group">
        {/* Avatar - Self */}
        <div className={`w-8 h-8 lg:w-10 lg:h-10 text-white flex items-center justify-center font-bold text-xs lg:text-sm shrink-0 rounded-full ${theme === 'dark' ? 'bg-[#EAB308]' : 'bg-black border-2 border-black'}`}>
          ME
        </div>

        {/* Message Bubble - Self */}
        <div className="max-w-[75%] lg:max-w-xl">
          <div className="flex items-center justify-end space-x-2 mb-1">
            <span className={`text-[10px] lg:text-xs font-medium px-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500 bg-white border border-black font-black'}`}>{formatTime()}</span>
          </div>

          <div
            onClick={() => setShowActions(!showActions)}
            className={`relative p-3 lg:p-4 transition-all cursor-pointer lg:cursor-default ${theme === 'dark'
              ? 'bg-[#EAB308] text-black rounded-2xl rounded-tr-sm'
              : 'bg-white border-2 lg:border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5'
              }`}
          >
            {theme !== 'dark' && <div className="absolute top-auto bottom-4 lg:top-4 lg:bottom-auto -right-3 w-4 h-4 bg-white border-2 lg:border-4 border-black transform rotate-45 border-l-0 border-b-0 pointer-events-none"></div>}

            {message.type === "file" ? (
              isImage(message.content) ? (
                <div className="space-y-2">
                  <img
                    src={message.content}
                    alt="attachment"
                    className="max-w-full rounded border-2 border-black object-cover max-h-60 cursor-pointer"
                    onClick={() => window.open(message.content, '_blank')}
                  />
                </div>
              ) : (
                <a
                  href={message.content}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 group/link"
                >
                  <div className="w-10 h-10 bg-yellow-300 border-2 border-black flex items-center justify-center text-xl group-hover/link:animate-bounce">
                    📎
                  </div>
                  <div className="flex flex-col">
                    <span className="font-black underline decoration-2 decoration-black">View Attachment</span>
                    <span className="text-xs font-bold text-gray-500">Click to open</span>
                  </div>
                </a>
              )
            ) : (
              <p className="font-bold text-sm lg:text-lg text-black leading-snug whitespace-pre-wrap break-words">
                {message.content}
              </p>
            )}

            {/* Copy Button (Visible on Hover/Click) */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleCopy();
              }}
              className={`absolute -left-8 lg:-left-10 bottom-0 border-2 p-1 lg:p-1.5 transition-all active:shadow-none active:translate-x-[1px] active:translate-y-[1px] ${showActions ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2 lg:translate-x-0 lg:group-hover:opacity-100'
                } ${theme === 'dark'
                  ? 'bg-black text-[#FACC15] border-[#FACC15] shadow-[0_0_5px_#FACC15] hover:bg-[#FACC15] hover:text-black'
                  : 'bg-white text-black border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-yellow-300'
                }`}
              title="Copy"
            >
              {copied ? '✅' : '📋'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Other User's Message
  return (
    <div className="flex items-end gap-2 lg:gap-4 animate-slideInLeft group">
      {/* Avatar - Other */}
      <div className={`w-8 h-8 lg:w-10 lg:h-10 flex items-center justify-center font-bold text-xs lg:text-sm shrink-0 rounded-full ${theme === 'dark'
        ? 'bg-[#3F3F46] text-white'
        : `${getAvatarColor(message.sender)} text-white border-2 lg:border-4 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)]`
        }`}>
        {message.sender[0].toUpperCase()}
      </div>

      {/* Message Bubble - Other */}
      <div className="max-w-[75%] lg:max-w-xl">
        <div className="flex items-center space-x-2 mb-1">
          <span className={`text-[10px] lg:text-xs px-2 py-0.5 max-w-[100px] truncate ${theme === 'dark'
            ? 'text-gray-400 font-bold'
            : 'bg-white text-black border border-black font-black uppercase'
            }`}>{message.sender}</span>
          <span className={`text-[10px] lg:text-xs px-1 ${theme === 'dark'
            ? 'text-gray-500'
            : 'bg-white text-gray-500 border border-black font-black'
            }`}>{formatTime()}</span>
        </div>

        <div
          onClick={() => setShowActions(!showActions)}
          className={`relative p-3 lg:p-4 transition-all cursor-pointer lg:cursor-default ${theme === 'dark'
            ? 'bg-[#27272A] text-gray-100 rounded-2xl rounded-tl-sm'
            : 'bg-black text-white border-2 lg:border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.3)] hover:-translate-y-0.5'
            }`}
        >
          {theme !== 'dark' && <div className="absolute top-auto bottom-4 lg:top-4 lg:bottom-auto -left-3 w-4 h-4 bg-black border-2 lg:border-4 border-black transform -rotate-45 border-r-0 border-b-0 pointer-events-none"></div>}

          {message.type === "file" ? (
            isImage(message.content) ? (
              <div className="space-y-2">
                <img
                  src={message.content}
                  alt="attachment"
                  className="max-w-full rounded border-2 border-white object-cover max-h-60 cursor-pointer"
                  onClick={() => window.open(message.content, '_blank')}
                />
              </div>
            ) : (
              <a
                href={message.content}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 group/link"
              >
                <div className="w-10 h-10 bg-white text-black border-2 border-white flex items-center justify-center text-xl group-hover/link:rotate-12 transition-transform">
                  📎
                </div>
                <div className="flex flex-col text-white">
                  <span className="font-black underline decoration-2 decoration-white">View Attachment</span>
                  <span className="text-xs font-bold text-gray-400">Click to open</span>
                </div>
              </a>
            )
          ) : (
            <p className="font-bold text-sm lg:text-lg leading-snug whitespace-pre-wrap break-words">
              {message.content}
            </p>
          )}

          {/* Copy Button (Visible on Hover/Click) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleCopy();
            }}
            className={`absolute -right-8 lg:-right-10 bottom-0 border-2 p-1 lg:p-1.5 transition-all active:shadow-none active:translate-x-[1px] active:translate-y-[1px] ${showActions ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2 lg:translate-x-0 lg:group-hover:opacity-100'
              } ${theme === 'dark'
                ? 'bg-black text-white border-white shadow-[0_0_5px_rgba(255,255,255,0.5)] hover:bg-white hover:text-black'
                : 'bg-white text-black border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-yellow-300'
              }`}
            title="Copy"
          >
            {copied ? '✅' : '📋'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Message;
