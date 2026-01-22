import React, { useEffect, useRef } from 'react';
import Message from './Message';

import { getStorageInfo } from '../../utils/messageStorage';
import { useTheme } from '../../context/ThemeContext';

const ChatWindow = ({ messages, currentUser, roomCode }) => {
  const messagesEndRef = useRef(null);
  const { theme } = useTheme();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (roomCode) {
      const storageInfo = getStorageInfo(roomCode);
      if (storageInfo.exists) {
        console.log(`📦 Messages in storage: ${storageInfo.messageCount}, Expires in: ${storageInfo.expiresIn}`);
      }
    }
  }, [roomCode]);


  return (
    <div className={`flex-1 overflow-y-auto overflow-x-hidden p-2 lg:p-6 space-y-3 lg:space-y-6 scrollbar-hide transition-colors duration-300 ${theme === 'dark' ? 'bg-[#18181B] text-[#F4F4F5]' : 'bg-white'}`} style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
      {/* Custom Scrollbar Styles (Backup) */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {messages.length === 0 ? (
        <div className="h-full flex items-center justify-center pointer-events-none select-none">
          <div className={`text-center space-y-4 lg:space-y-6 max-w-md p-6 ${theme === 'dark' ? 'text-gray-400' : 'border-gray-300 text-gray-400 border-4 border-dashed transform -rotate-2'}`}>
            <div className={`text-6xl lg:text-8xl ${theme === 'dark' ? 'opacity-20 grayscale' : 'opacity-30grayscale grayscale'}`}>
              👻
            </div>

            <h3 className={`text-2xl lg:text-4xl font-bold tracking-tight ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400 font-black tracking-tighter'}`}>
              No messages yet
            </h3>

            <p className={`text-base lg:text-lg text-gray-500 font-medium ${theme === 'dark' ? '' : 'text-gray-400'}`}>
              Be the first to say <span className={`${theme === 'dark' ? 'text-white font-bold' : 'px-2 py-0 border transform inline-block rotate-3 bg-yellow-300 text-black border-black'}`}>hello!</span>
            </p>
          </div>
        </div>
      ) : (
        <>
          {messages.map((message, index) => (
            <Message
              key={index}
              message={message}
              isOwnMessage={message.sender === currentUser.name}
            />
          ))}
          <div ref={messagesEndRef} />
        </>
      )}
    </div>
  );
};

export default ChatWindow;
