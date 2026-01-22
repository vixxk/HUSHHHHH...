import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import ThemeToggle from '../common/ThemeToggle';

const RoomInfo = ({ room, isAdmin, currentUserId, onLeave, onDelete }) => {
  const [copied, setCopied] = useState(false);
  const { theme } = useTheme();

  const handleCopyRoomCode = () => {
    navigator.clipboard.writeText(room.roomCode.toString());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`border-b-4 lg:border-b p-3 lg:p-5 flex items-center justify-between shrink-0 relative z-20 transition-all duration-300 ${theme === 'dark'
      ? 'bg-[#18181B] border-[#27272A] text-white'
      : 'bg-white border-black text-black'
      }`}>
      {/* Left: Room Identity */}
      <div className="flex items-center space-x-3 lg:space-x-5 overflow-hidden">
        {/* Avatar */}
        <div className={`w-10 h-10 lg:w-14 lg:h-14 flex items-center justify-center transition-transform duration-300 shrink-0 border-2 lg:border-4 lg:border-0 rounded-full ${theme === 'dark'
          ? 'bg-[#27272A] text-[#EAB308]'
          : 'bg-black text-white border-black'
          }`}>
          <span className="text-xl lg:text-3xl">💬</span>
        </div>

        {/* Info & Status */}
        <div className="flex flex-col min-w-0">
          <div className="flex items-center space-x-2">
            <h1 className="text-xl lg:text-3xl font-black uppercase tracking-tighter truncate leading-none">
              {room?.roomName || 'UNNAMED ROOM'}
            </h1>
            {room?.isPrivate && <span className="text-base lg:text-xl">🔒</span>}
          </div>

          <div className="flex items-center space-x-3 mt-1">
            {/* ID & Status Group */}
            <div className="flex items-center gap-0 lg:gap-1">
              <button
                onClick={handleCopyRoomCode}
                className={`group flex items-center gap-1 px-2 lg:px-3 py-1 lg:py-1.5 transition-all rounded-full border border-transparent ${theme === 'dark'
                  ? 'bg-[#27272A] hover:bg-[#3F3F46] text-gray-300 hover:text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-black'
                  }`}
                title="Click to copy Room ID"
              >
                <span className="font-medium text-xs lg:text-sm whitespace-nowrap">ID: {room?.roomCode}</span>
                <span className="text-xs opacity-70">{copied ? '✅' : '📋'}</span>
              </button>

              <div className="flex items-center gap-1 pl-1 lg:pl-2 py-1 rounded-full bg-opacity-10">
                <span className="relative flex h-2 w-2">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${theme === 'dark' ? 'bg-[#22C55E]' : 'bg-green-500'}`}></span>
                  <span className={`relative inline-flex rounded-full h-2 w-2 ${theme === 'dark' ? 'bg-[#22C55E]' : 'bg-green-500'}`}></span>
                </span>
                <span className={`text-[10px] lg:text-xs font-bold tracking-wide ${theme === 'dark' ? 'text-[#22C55E]' : 'text-green-600'}`}>LIVE</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2 lg:gap-3">
        <ThemeToggle />
        {isAdmin && (
          <button
            onClick={onDelete}
            className="group w-8 h-8 lg:w-12 lg:h-12 flex items-center justify-center bg-red-500 border-2 lg:border-4 border-black text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
            title="Delete Room"
          >
            <span className="text-sm lg:text-xl group-hover:scale-125 transition-transform">🗑️</span>
          </button>
        )}

        <button
          onClick={onLeave}
          className={`group px-3 py-1 lg:px-5 lg:py-2 border-2 lg:border-2 lg:border-0 font-bold text-xs lg:text-sm rounded-lg transition-all flex items-center gap-2 ${theme === 'dark'
            ? 'bg-red-500/10 text-red-500 hover:bg-red-500/20'
            : 'bg-white border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none'
            }`}
        >
          <span>LEAVE</span>
          <span className="hidden lg:inline group-hover:-rotate-12 transition-transform">👋</span>
        </button>
      </div>
    </div >
  );
};

export default RoomInfo;
