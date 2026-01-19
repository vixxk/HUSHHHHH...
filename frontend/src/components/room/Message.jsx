import React, { useState, useEffect } from "react";

const Message = ({ message, isOwnMessage }) => {
  const [copied, setCopied] = useState(false);

  const formatTime = () => {
    const now = new Date();
    return now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const messageColors = [
    'bg-yellow-300',
    'bg-pink-300',
    'bg-blue-300',
    'bg-green-300',
    'bg-purple-300'
  ];

  const getColorForSender = (sender) => {
    const hash = sender
      .split('')
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return messageColors[hash % messageColors.length];
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

  const copyButtonBase = `group flex items-center justify-center p-2 border-2 rounded cursor-pointer select-none 
    transition-colors duration-200
    ${copied
      ? "bg-green-600 border-green-600 text-white"
      : "bg-white border-black text-black hover:bg-black hover:text-white"
    }
  `;

  const tooltip = (
    <span className="absolute bottom-full mb-1 hidden group-hover:block bg-black text-white text-xs rounded px-1.5 py-0.5 select-none whitespace-nowrap">
      Copy message
    </span>
  );

  if (isOwnMessage) {
    return (
      <div className="flex items-end flex-row-reverse mb-4 lg:mb-6 gap-2 lg:gap-4 animate-fadeIn relative">
        {/* Avatar */}
        <div className="w-8 h-8 lg:w-12 lg:h-12 bg-black text-white flex items-center justify-center font-black text-sm lg:text-lg border-2 lg:border-4 border-black flex-shrink-0 hover:scale-110 transition-transform lg:ml-4">
          {message.sender[0].toUpperCase()}
        </div>

        {/* Message Content */}
        <div className="flex-1 min-w-0 max-w-[85%] lg:max-w-md space-y-1 lg:space-y-2 lg:mr-4">
          <div className="flex items-center justify-end space-x-2 lg:space-x-3 mb-1 lg:mb-2">
            <span className="text-[10px] lg:text-xs font-black text-gray-600 uppercase tracking-wider">
              {formatTime()}
            </span>
            <span className="text-[10px] lg:text-base font-black bg-black text-white px-1.5 lg:px-3 py-0.5 lg:py-1 border lg:border-2 border-black">
              YOU
            </span>
          </div>
          <div className="bg-black text-white border-2 lg:border-4 border-black p-3 lg:p-5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] lg:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] break-all w-full leading-normal">
            {message.type === "file" ? (
              <a
                href={message.content}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-2 lg:decoration-4 decoration-yellow-300 hover:decoration-white font-bold text-sm lg:text-lg flex items-center space-x-2"
              >
                <span className="text-xl lg:text-2xl">📎</span>
                <span className="truncate">View File</span>
              </a>
            ) : (
              <p className="font-bold text-sm lg:text-lg">
                {message.content}
              </p>
            )}
          </div>
        </div>

        {/* Copy Button on left (Hidden on mobile) */}
        <div className="relative group/copy">
          <button
            onClick={handleCopy}
            className="hidden lg:flex items-center justify-center p-2 border-2 rounded cursor-pointer select-none transition-colors duration-200 bg-white border-black text-black hover:bg-black hover:text-white"
            type="button"
            aria-label="Copy message"
          >
            {copied ? "✔️" : "📋"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-end mb-4 lg:mb-6 gap-2 lg:gap-4 animate-fadeIn relative">
      {/* Avatar */}
      <div className="w-8 h-8 lg:w-12 lg:h-12 bg-black text-white flex items-center justify-center font-black text-sm lg:text-lg border-2 lg:border-4 border-black flex-shrink-0 hover:scale-110 transition-transform lg:mr-4">
        {message.sender[0].toUpperCase()}
      </div>

      {/* Message Content */}
      <div className="flex-1 min-w-0 max-w-[85%] lg:max-w-md space-y-1 lg:space-y-2 lg:ml-4">
        <div className="flex items-center space-x-2 lg:space-x-3 mb-1 lg:mb-2">
          <span className="text-[10px] lg:text-base font-black bg-yellow-300 text-black px-1.5 lg:px-3 py-0.5 lg:py-1 border lg:border-2 border-black">
            {message.sender}
          </span>
          <span className="text-[10px] lg:text-xs font-black text-gray-600 uppercase tracking-wider">
            {formatTime()}
          </span>
        </div>
        <div
          className={`${getColorForSender(
            message.sender
          )} border-2 lg:border-4 border-black p-3 lg:p-5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] lg:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] break-all w-full leading-normal`}
        >
          {message.type === "file" ? (
            <a
              href={message.content}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-2 lg:decoration-4 decoration-black hover:decoration-white font-bold text-sm lg:text-lg flex items-center space-x-2"
            >
              <span className="text-xl lg:text-2xl">📎</span>
              <span className="truncate">View File</span>
            </a>
          ) : (
            <p className="font-bold text-sm lg:text-lg">
              {message.content}
            </p>
          )}
        </div>
      </div>

      {/* Copy Button on right (Hidden on mobile) */}
      <div className="relative group/copy">
        <button
          onClick={handleCopy}
          className="hidden lg:flex items-center justify-center p-2 border-2 rounded cursor-pointer select-none transition-colors duration-200 bg-white border-black text-black hover:bg-black hover:text-white"
          type="button"
          aria-label="Copy message"
        >
          {copied ? "✔️" : "📋"}
        </button>
      </div>
    </div>
  );
};

export default Message;
