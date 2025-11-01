import React from "react";

const Navbar = ({ onCreateClick, onJoinClick }) => {
  return (
    <nav className="w-full sticky top-0 z-50 bg-white border-b-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer hover:scale-105 transition-transform duration-300">
            <div className="w-12 h-12 bg-black flex items-center justify-center rotate-12 hover:rotate-0 transition-transform duration-300 border-2 border-black">
              <span className="text-2xl">💬</span>
            </div>
            <span className="text-2xl lg:text-3xl font-black tracking-tighter whitespace-nowrap">
              HUSHHHH...
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 lg:gap-4">
            <button
              onClick={onJoinClick}
              className="px-4 lg:px-6 py-2 lg:py-3 text-xs lg:text-base font-bold border-4 border-black hover:bg-black hover:text-white transition-all duration-200 transform hover:-translate-y-1 whitespace-nowrap"
            >
              JOIN
            </button>
            <button
              onClick={onCreateClick}
              className="px-4 lg:px-6 py-2 lg:py-3 text-xs lg:text-base font-bold bg-black text-white border-4 border-black hover:bg-white hover:text-black transition-all duration-200 transform hover:-translate-y-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] whitespace-nowrap"
            >
              CREATE
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
