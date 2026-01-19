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
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-6">
        {/* DESKTOP LAYOUT (Hidden on mobile) */}
        <div className="hidden lg:flex items-center justify-between gap-6">
          {/* Left: Room Info */}
          <div className="flex items-center space-x-3 lg:space-x-6 w-full lg:w-auto justify-between lg:justify-start">
            <div className="flex items-center space-x-3 lg:space-x-6">
              {/* Animated Logo */}
              <div className="relative group cursor-pointer">
                <div className="absolute inset-0 bg-yellow-300 blur-sm group-hover:blur-md transition-all"></div>
                <div className="relative bg-black text-white w-12 h-12 lg:w-16 lg:h-16 flex items-center justify-center font-black text-xl lg:text-3xl border-4 border-black rotate-0 group-hover:rotate-12 transition-transform duration-300">
                  💬
                </div>
              </div>

              {/* Room Details */}
              <div className="space-y-1 lg:space-y-3">
                <div className="flex items-center space-x-2 lg:space-x-4">
                  <h1 className="text-xl lg:text-4xl font-black tracking-tighter flex items-center space-x-2 lg:space-x-3">
                    <span className="truncate max-w-[150px] lg:max-w-none">{room?.roomName || 'CHAT ROOM'}</span>
                    {room?.isPrivate && (
                      <span className="text-lg lg:text-2xl animate-pulse">🔒</span>
                    )}
                  </h1>
                  {isAdmin && (
                    <span className="bg-blue-200 text-black px-2 lg:px-3 py-0.5 lg:py-1 text-xs lg:text-sm font-black border-2 lg:border-4 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                      👑 ADMIN
                    </span>
                  )}
                </div>

                {/* Room Metadata - Desktop */}
                <div className="hidden lg:flex items-center space-x-4 flex-wrap gap-2">
                  {/* Room ID */}
                  <button
                    onClick={handleCopyRoomCode}
                    className="group flex items-center space-x-2 bg-white border-4 border-black px-4 py-2 hover:bg-yellow-300 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transform hover:-translate-x-1 hover:-translate-y-1"
                  >
                    <span className="text-lg font-black">ID:</span>
                    <span className="text-2xl font-black tracking-wider">{room?.roomCode}</span>
                    <span className="text-xl">{copied ? '✓' : '📋'}</span>
                  </button>

                  <div className="w-1 h-8 bg-black"></div>

                  <div className="flex items-center space-x-2 bg-black text-white px-4 py-2 border-4 border-black font-black text-sm">
                    <span>{room?.isPrivate ? '🔒 PRIVATE' : '🌐 PUBLIC'}</span>
                  </div>

                  <div className="flex items-center space-x-2 bg-green-400 text-black px-4 py-2 border-4 border-black font-black text-sm">
                    <div className="w-2 h-2 bg-black rounded-full animate-pulse"></div>
                    <span>ACTIVE</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Actions Menu Toggle could go here if needed, but for now we stack */}
          </div>

          {/* Mobile Metadata Row */}
          <div className="flex lg:hidden w-full items-center justify-between gap-2 border-t-2 border-gray-200 pt-2">
            <button
              onClick={handleCopyRoomCode}
              className="flex-1 flex items-center justify-center space-x-1 bg-gray-100 border-2 border-black px-2 py-1"
            >
              <span className="text-xs font-black">ID: {room?.roomCode}</span>
              <span className="text-xs">{copied ? '✓' : '📋'}</span>
            </button>
            <div className="flex items-center space-x-1 bg-green-400 text-black px-2 py-1 border-2 border-black font-black text-xs">
              <div className="w-1.5 h-1.5 bg-black rounded-full animate-pulse"></div>
              <span>ACTIVE</span>
            </div>
          </div>


          {/* Right: Actions */}
          <div className="flex items-center w-full lg:w-auto gap-2 lg:gap-4">

            {isAdmin ? (
              <button
                onClick={onDelete}
                className="flex-1 lg:flex-none group px-4 lg:px-6 py-2 lg:py-3 text-sm lg:text-base font-black bg-red-500 text-white border-2 lg:border-4 border-black hover:bg-red-600 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] lg:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transform hover:-translate-x-1 hover:-translate-y-1"
                title="Delete room (Admin only)"
              >
                <span className="flex items-center justify-center space-x-2">
                  <span className="group-hover:animate-bounce">🗑️</span>
                  <span>DELETE</span>
                </span>
              </button>
            ) : (
              <div className="flex-1 lg:flex-none group px-4 lg:px-6 py-2 lg:py-3 text-sm lg:text-base font-black bg-gray-400 text-gray-700 border-2 lg:border-4 border-black cursor-not-allowed shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" title="Only admin can delete">
                <span className="flex items-center justify-center space-x-2">
                  <span>🗑️</span>
                  <span>DELETE</span>
                </span>
              </div>
            )}

            <button
              onClick={onLeave}
              className="flex-1 lg:flex-none group px-4 lg:px-6 py-2 lg:py-3 text-sm lg:text-base font-black border-2 lg:border-4 border-black hover:bg-black hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] lg:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transform hover:-translate-x-1 hover:-translate-y-1"
            >
              <span className="flex items-center justify-center space-x-2">
                <span className="group-hover:animate-bounce">👋</span>
                <span>LEAVE</span>
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE LAYOUT (Hidden on desktop) */}
      <div className="lg:hidden space-y-3">
        {/* Header Card */}
        <div className="bg-gray-50 border-2 border-black p-2">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-black text-white flex items-center justify-center font-black text-sm border-2 border-black shrink-0">
              💬
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h1 className="text-base font-black tracking-tighter uppercase truncate">
                  {room?.roomName || 'ROOM'}
                </h1>
                {room?.isPrivate && <span className="text-[10px] font-bold bg-yellow-300 px-1 border border-black">🔒</span>}
              </div>
              <div className="flex items-center justify-between mt-0.5">
                <button onClick={handleCopyRoomCode} className="flex items-center space-x-1 text-[10px] font-bold text-gray-600 active:text-black hover:underline">
                  <span>ID: {room?.roomCode}</span>
                  <span>{copied ? '✓' : '📋'}</span>
                </button>
                <div className="flex items-center space-x-1">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-[10px] font-black text-green-600">ACTIVE</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons Row - Small & Compact */}
        <div className="grid grid-cols-2 gap-2">
          {isAdmin ? (
            <button
              onClick={onDelete}
              className="col-span-1 bg-red-500 text-white border-2 border-black py-1.5 font-black text-xs hover:bg-red-600 active:scale-95 transition-transform flex items-center justify-center space-x-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            >
              <span>🗑️</span>
              <span>DELETE</span>
            </button>
          ) : (
            <div className="col-span-1 bg-gray-300 text-gray-500 border-2 border-black py-1.5 font-black text-xs flex items-center justify-center space-x-1 opacity-50 cursor-not-allowed">
              <span>🗑️</span>
              <span>DELETE</span>
            </div>
          )}

          <button
            onClick={onLeave}
            className="col-span-1 bg-white text-black border-2 border-black py-1.5 font-black text-xs hover:bg-gray-50 active:scale-95 transition-transform flex items-center justify-center space-x-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
          >
            <span>👋</span>
            <span>LEAVE</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomInfo;
