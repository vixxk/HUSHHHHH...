import React from "react";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "../../context/ThemeContext";

const Navbar = ({ onCreateClick, onJoinClick }) => {
  const { theme } = useTheme();
  return (
    <nav className={`w-full sticky top-0 z-50 border-b transition-colors duration-300 ${theme === 'dark'
      ? 'bg-[#09090B]/80 backdrop-blur-md border-[#27272A]'
      : 'bg-white/80 backdrop-blur-md border-gray-200'
      }`}>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center space-x-2 lg:space-x-3 cursor-pointer hover:opacity-80 transition-opacity duration-300">
            <div className={`w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center border ${theme === 'dark'
              ? 'bg-[#27272A] text-[#EAB308] border-[#3F3F46] rounded-xl'
              : 'bg-black text-white border-black rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)]'
              }`}>
              <span className="text-xl lg:text-2xl">💬</span>
            </div>
            <span className={`text-xl lg:text-2xl font-bold tracking-tight whitespace-nowrap ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
              HUSHHHH...
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 lg:gap-4">
            <ThemeToggle />
            <button
              onClick={onJoinClick}
              className={`hidden sm:block px-4 lg:px-6 py-2 lg:py-2.5 text-sm lg:text-base font-medium transition-all duration-200 whitespace-nowrap ${theme === 'dark'
                ? 'text-gray-300 hover:text-white hover:bg-[#27272A] rounded-full'
                : 'text-black hover:bg-gray-100 rounded-none border-2 border-transparent hover:border-black'
                }`}
            >
              Join Room
            </button>
            <button
              onClick={onCreateClick}
              className={`hidden sm:block px-4 lg:px-6 py-2 lg:py-2.5 text-sm lg:text-base font-medium transition-all duration-200 whitespace-nowrap ${theme === 'dark'
                ? 'bg-[#EAB308] text-black hover:bg-[#CA8A04] rounded-full'
                : 'bg-black text-white hover:bg-gray-800 rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)] active:translate-y-[1px] active:shadow-none'
                }`}
            >
              Create Room
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
