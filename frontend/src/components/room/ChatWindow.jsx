import React, { useEffect, useRef } from 'react';
import Message from './Message';
import { getStorageInfo } from '../../utils/messageStorage';

const ChatWindow = ({ messages, currentUser, roomCode }) => {
  const messagesEndRef = useRef(null);

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
    <div className="flex-1 overflow-y-auto bg-white p-6 lg:p-8 space-y-6">
      {messages.length === 0 ? (
        <div className="h-full flex items-center justify-center">
          <div className="text-center space-y-6 max-w-md">
            <div className="text-8xl opacity-50">
              💬
            </div>
            
            <h3 className="text-3xl font-black tracking-tighter text-gray-800">
              NO MESSAGES YET
            </h3>
            
            <p className="text-xl font-bold text-gray-600 leading-relaxed">
              Be the first to <span className="bg-yellow-300 px-2 py-1 border-2 border-black">START</span> the conversation!
            </p>
            
            <div className="flex items-center justify-center space-x-2 pt-4 opacity-40">
              <div className="w-2 h-2 bg-black rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-black rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
              <div className="w-2 h-2 bg-black rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
            </div>
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
