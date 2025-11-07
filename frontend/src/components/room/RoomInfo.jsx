import React, { useState } from 'react';

const RoomInfo = ({ room, isAdmin, currentUserId, onLeave, onDelete }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyRoomCode = () => {
    navigator.clipboard.writeText(room.roomCode.toString());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full bg-white border-b-8 border-black shadow-[0_8px_0px_0px_rgba(0,0,0,1)]">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between flex-wrap gap-6">
          {/* Left: Room Info */}
          <div className="flex items-center space-x-6">
            {/* Animated Logo */}
            <div className="relative group cursor-pointer">
              <div className="absolute inset-0 bg-yellow-300 blur-sm group-hover:blur-md transition-all"></div>
              <div className="relative bg-black text-white w-16 h-16 flex items-center justify-center font-black text-3xl border-4 border-black rotate-0 group-hover:rotate-12 transition-transform duration-300">
                💬
              </div>
            </div>

            {/* Room Details */}
            <div className="space-y-3">
              <div className="flex items-center space-x-4">
                <h1 className="text-3xl lg:text-4xl font-black tracking-tighter flex items-center space-x-3">
                  <span>{room?.roomName || 'CHAT ROOM'}</span>
                  {room?.isPrivate && (
                    <span className="text-2xl animate-pulse">🔒</span>
                  )}
                </h1>
                {isAdmin && (
                  <span className="bg-blue-200 text-black px-3 py-1 text-sm font-black border-4 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ">
                    👑 ADMIN
                  </span>
                )}
              </div>

              {/* Room Metadata */}
              <div className="flex items-center space-x-4 flex-wrap gap-2">
                {/* Room ID */}
                <button
                  onClick={handleCopyRoomCode}
                  className="group flex items-center space-x-2 bg-white border-4 border-black px-4 py-2 hover:bg-yellow-300 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transform hover:-translate-x-1 hover:-translate-y-1"
                >
                  <span className="text-lg font-black">ID:</span>
                  <span className="text-2xl font-black tracking-wider">{room?.roomCode}</span>
                  <span className="text-xl">{copied ? '✓' : '📋'}</span>
                </button>

                {/* Divider */}
                <div className="w-1 h-8 bg-black"></div>

                {/* Room Type Badge */}
                <div className="flex items-center space-x-2 bg-black text-white px-4 py-2 border-4 border-black font-black text-sm">
                  <span>{room?.isPrivate ? '🔒 PRIVATE' : '🌐 PUBLIC'}</span>
                </div>

                {/* Active Indicator */}
                <div className="flex items-center space-x-2 bg-green-400 text-black px-4 py-2 border-4 border-black font-black text-sm">
                  <div className="w-2 h-2 bg-black rounded-full animate-pulse"></div>
                  <span>ACTIVE</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-3 lg:gap-4">
            
            {isAdmin ? (
              <button
                onClick={onDelete}
                className="group px-6 py-3 text-base font-black bg-red-500 text-white border-4 border-black hover:bg-red-600 transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform hover:-translate-x-1 hover:-translate-y-1"
                title="Delete room (Admin only)"
              >
                <span className="flex items-center space-x-2">
                  <span className="group-hover:animate-bounce">🗑️</span>
                  <span>DELETE</span>
                </span>
              </button>
            ) : (
              <div className="group px-6 py-3 text-base font-black bg-gray-400 text-gray-700 border-4 border-black cursor-not-allowed shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]" title="Only admin can delete">
                <span className="flex items-center space-x-2">
                  <span>🗑️</span>
                  <span>DELETE</span>
                </span>
              </div>
            )}
            
            <button
              onClick={onLeave}
              className="group px-6 py-3 text-base font-black border-4 border-black hover:bg-black hover:text-white transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform hover:-translate-x-1 hover:-translate-y-1"
            >
              <span className="flex items-center space-x-2">
                <span className="group-hover:animate-bounce">👋</span>
                <span>LEAVE</span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomInfo;
