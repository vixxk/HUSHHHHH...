import React from 'react';

const TypingIndicator = ({ typingUsers }) => {
  if (!typingUsers || typingUsers.length === 0) return null;

  return (
    <div className="inline-block animate-bounceIn">
      <div className="bg-black text-white border-2 border-black border-b-4 px-3 py-1.5 shadow-lg flex items-center space-x-2 rounded-none transform -rotate-1">
        <div className="flex space-x-1 items-center bg-white px-1 py-1 rounded-sm border border-black h-4">
          <div className="w-1.5 h-1.5 bg-black animate-bounce delay-0"></div>
          <div className="w-1.5 h-1.5 bg-black animate-bounce delay-100"></div>
          <div className="w-1.5 h-1.5 bg-black animate-bounce delay-200"></div>
        </div>
        <span className="font-black text-xs uppercase tracking-wider">
          {typingUsers.length === 1
            ? `${typingUsers[0]} IS TYPING...`
            : `${typingUsers.length} PEOPLE TYPING...`
          }
        </span>
      </div>
    </div>
  );
};

export default TypingIndicator;
