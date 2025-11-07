import React from 'react';

const Loading = ({ message = 'LOADING...' }) => {
  return (
    <div className="w-full h-screen bg-white flex items-center justify-center">
      <div className="text-center space-y-6">
        <div className="relative w-24 h-24 mx-auto">
          <div className="absolute inset-0 border-8 border-black border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute inset-4 border-8 border-yellow-300 border-b-transparent rounded-full animate-spin" style={{animationDirection: 'reverse', animationDuration: '1s'}}></div>
        </div>
        <p className="text-3xl font-black tracking-tighter">{message}</p>
        <div className="flex justify-center space-x-2">
          <div className="w-3 h-3 bg-black rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-black rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
          <div className="w-3 h-3 bg-black rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
