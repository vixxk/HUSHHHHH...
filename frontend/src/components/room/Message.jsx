import React from 'react';

const Message = ({ message, isOwnMessage }) => {
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
    const hash = sender.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return messageColors[hash % messageColors.length];
  };

  if (isOwnMessage) {
    return (
      <div className="flex items-end space-x-4 flex-row-reverse mb-6 animate-fadeIn">
        {/* Avatar*/}
        <div className="w-12 h-12 bg-black text-white flex items-center justify-center font-black text-lg border-4 border-black flex-shrink-0 hover:scale-110 transition-transform ml-4">
          {message.sender[0].toUpperCase()}
        </div>
        
        {/* Message Content */}
        <div className="flex-1 max-w-md space-y-2 mr-4">
          <div className="flex items-center justify-end space-x-3 mb-2">
            <span className="text-xs font-black text-gray-600 uppercase tracking-wider">{formatTime()}</span>
            <span className="text-base font-black bg-black text-white px-3 py-1 border-2 border-black">YOU</span>
          </div>
          <div className="bg-black text-white border-4 border-black p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] break-words hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all">
            {message.type === 'file' ? (
              <a 
                href={message.content} 
                target="_blank" 
                rel="noopener noreferrer" // avoid tabnabbing
                className="underline decoration-4 decoration-yellow-300 hover:decoration-white font-bold text-lg flex items-center space-x-2"
              >
                <span className="text-2xl">📎</span>
                <span>View File</span>
              </a>
            ) : (
              <p className="font-bold text-lg leading-relaxed">{message.content}</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-end space-x-4 mb-6 animate-fadeIn">
      {/* Avatar*/}
      <div className="w-12 h-12 bg-black text-white flex items-center justify-center font-black text-lg border-4 border-black flex-shrink-0 hover:scale-110 transition-transform mr-4">
        {message.sender[0].toUpperCase()}
      </div>
      
      {/* Message Content */}
      <div className="flex-1 max-w-md space-y-2 ml-4">
        <div className="flex items-center space-x-3 mb-2">
          <span className="text-base font-black bg-yellow-300 text-black px-3 py-1 border-2 border-black">{message.sender}</span>
          <span className="text-xs font-black text-gray-600 uppercase tracking-wider">{formatTime()}</span>
        </div>
        <div className={`${getColorForSender(message.sender)} border-4 border-black p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] break-words hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all`}>
          {message.type === 'file' ? (
            <a 
              href={message.content} 
              target="_blank" 
              rel="noopener noreferrer"
              className="underline decoration-4 decoration-black hover:decoration-white font-bold text-lg flex items-center space-x-2"
            >
              <span className="text-2xl">📎</span>
              <span>View File</span>
            </a>
          ) : (
            <p className="font-bold text-lg leading-relaxed">{message.content}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;
