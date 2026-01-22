import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const HeroSection = ({ onCreateClick, onJoinClick }) => {
  const { theme } = useTheme();
  return (
    <section className={`w-full relative pt-6 pb-12 lg:pt-12 lg:pb-24 min-h-fit overflow-hidden transition-colors duration-500 ease-in-out ${theme === 'dark' ? 'bg-transparent text-white' : 'bg-transparent text-black'}`}>
      {/* Background Patterns - Removed for clean look */}
      <div className={`absolute inset-0 opacity-20 pointer-events-none overflow-hidden ${theme === 'dark' ? 'bg-[radial-gradient(#27272A_1px,transparent_1px)]' : 'bg-[radial-gradient(#E5E7EB_1px,transparent_1px)]'}`} style={{ backgroundSize: '40px 40px' }}></div>

      {/* Floating Animated Elements */}

      {/* Floating Animated Particles (Snow/Pop Effect) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full animate-pulse ${theme === 'dark'
              ? 'bg-[#EAB308]/20'
              : 'bg-black/10'
              }`}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 8 + 4}px`,
              height: `${Math.random() * 8 + 4}px`,
              animationDuration: `${Math.random() * 3 + 2}s`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-6 lg:space-y-8">
            {/* Badge */}
            <div className={`inline-flex items-center space-x-2 px-4 lg:px-6 py-2 font-medium border transition-colors ${theme === 'dark'
              ? 'bg-[#27272A] text-[#EAB308] border-[#3F3F46] rounded-full'
              : 'bg-black text-white border-black rounded-none shadow-[4px_4px_0px_0px_rgba(255,255,255,0.5)]'
              }`}>
              <span className="text-lg">🚀</span>
              <span className="text-xs lg:text-sm tracking-wide">REAL-TIME MESSAGING</span>
            </div>

            {/* Title */}
            {/* Title */}
            <h1 className="text-4xl lg:text-7xl font-bold leading-tight lg:leading-none tracking-tight">
              CHIT <br />
              CHAT <br />
              {theme === 'dark' ? (
                <span className="inline-block bg-[#EAB308] text-black px-4 py-1 -rotate-3 transform my-2 rounded-xl">
                  WITHOUT
                </span>
              ) : (
                <span className="inline-block bg-black text-white px-4 py-1 -rotate-3 transform my-2 rounded-none">
                  WITHOUT
                </span>
              )}
              <br />
              LIMITS
            </h1>

            {/* Description */}
            <p className="text-base lg:text-xl font-medium leading-relaxed max-w-xl text-gray-500">
              Create <span className={`${theme === 'dark' ? 'text-white font-bold' : 'text-black font-bold'}`}>SECURE</span> chat rooms instantly.
              No sign-up. No BS. <br />Just pure communication.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={onCreateClick}
                className={`group px-6 lg:px-8 py-3 lg:py-4 text-base lg:text-lg font-bold transition-all duration-200 transform hover:-translate-y-1 ${theme === 'dark'
                  ? 'bg-[#EAB308] text-black hover:bg-[#CA8A04] shadow-lg shadow-yellow-900/20 rounded-full'
                  : 'bg-black text-white hover:bg-gray-800 shadow-[6px_6px_0px_0px_rgba(0,0,0,0.2)] rounded-none border-2 border-black'
                  }`}
              >
                <span className="flex items-center justify-center space-x-2">
                  <span>CREATE ROOM</span>
                  <span className="text-xl group-hover:translate-x-1 transition-transform">➜</span>
                </span>
              </button>

              <button
                onClick={onJoinClick}
                className={`px-6 lg:px-8 py-3 lg:py-4 text-base lg:text-lg font-bold transition-all duration-200 ${theme === 'dark'
                  ? 'border-2 border-[#27272A] text-gray-300 hover:text-white hover:border-white hover:bg-[#27272A] rounded-full'
                  : 'border-4 border-black text-black hover:bg-black hover:text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transform active:translate-x-[2px] active:translate-y-[2px] active:shadow-none rounded-none'
                  }`}
              >
                JOIN ROOM
              </button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 lg:gap-8 pt-6 lg:pt-8">
              <div className="space-y-1">
                <div className="text-3xl lg:text-4xl font-black">100%</div>
                <div className="text-xs lg:text-sm font-bold uppercase tracking-wider">FREE</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl lg:text-4xl font-black">0</div>
                <div className="text-xs lg:text-sm font-bold uppercase tracking-wider">SIGN-UP</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl lg:text-4xl font-black">∞</div>
                <div className="text-xs lg:text-sm font-bold uppercase tracking-wider">MESSAGES</div>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative hidden lg:block">
            <div className={`rounded-2xl overflow-hidden transition-all duration-300 transform rotate-2 hover:rotate-0 ${theme === 'dark'
              ? 'bg-[#18181B] shadow-2xl shadow-black/50 border border-[#27272A]'
              : 'bg-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]'
              }`}>
              {/* Chat Preview Header */}
              {/* Chat Preview Header */}
              <div className={`p-4 border-b ${theme === 'dark' ? 'bg-[#18181B] border-[#27272A] text-white' : 'bg-black text-white border-black border-b-4'
                }`}>
                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    <div className={`w-3 h-3 ${theme === 'dark' ? 'bg-red-500 rounded-full' : 'bg-black rounded-none'}`}></div>
                    <div className={`w-3 h-3 ${theme === 'dark' ? 'bg-yellow-500 rounded-full' : 'bg-black rounded-none'}`}></div>
                    <div className={`w-3 h-3 ${theme === 'dark' ? 'bg-green-500 rounded-full' : 'bg-black rounded-none'}`}></div>
                  </div>
                  <div className={`text-sm font-bold tracking-wide ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>ROOM #123456</div>
                </div>
              </div>

              {/* Chat Messages */}
              <div className={`p-6 space-y-6 min-h-[400px] ${theme === 'dark' ? 'bg-[#09090B]' : 'bg-gray-50'
                }`}>
                {/* Message 1 */}
                <div className="flex items-start space-x-3">
                  <div className={`w-10 h-10 flex items-center justify-center font-bold text-sm rounded-full ${theme === 'dark' ? 'bg-[#27272A] text-[#EAB308]' : 'bg-black text-white'
                    }`}>
                    A
                  </div>
                  <div className="flex-1">
                    <div className={`p-3 rounded-2xl rounded-tl-sm ${theme === 'dark' ? 'bg-[#27272A] text-gray-200' : 'bg-white border-2 border-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
                      }`}>
                      <p className="font-medium text-sm">Hey! Welcome 👋</p>
                    </div>
                  </div>
                </div>

                {/* Message 2 */}
                <div className="flex items-start space-x-3 flex-row-reverse">
                  <div className={`w-10 h-10 flex items-center justify-center font-bold text-sm rounded-full ${theme === 'dark' ? 'bg-[#EAB308] text-black' : 'bg-yellow-300 text-black border-2 border-black'
                    }`}>
                    B
                  </div>
                  <div className="flex-1">
                    <div className={`p-3 mr-3 rounded-2xl rounded-tr-sm ${theme === 'dark' ? 'bg-[#EAB308] text-black' : 'bg-black text-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
                      }`}>
                      <p className="font-medium text-sm">Thanks! This looks awesome ✨</p>
                    </div>
                  </div>
                </div>

                {/* Message 3 */}
                <div className="flex items-start space-x-3">
                  <div className={`w-10 h-10 flex items-center justify-center font-bold text-sm rounded-full ${theme === 'dark' ? 'bg-[#27272A] text-[#EAB308]' : 'bg-black text-white'
                    }`}>
                    A
                  </div>
                  <div className="flex-1">
                    <div className={`p-3 rounded-2xl rounded-tl-sm ${theme === 'dark' ? 'bg-[#27272A] text-gray-200' : 'bg-white border-2 border-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
                      }`}>
                      <p className="font-medium text-sm">Start chatting instantly! 🚀</p>
                    </div>
                  </div>
                </div>

                {/* Typing Indicator */}
                <div className="flex items-center space-x-2 px-1">
                  <div className="flex space-x-1">
                    <div className={`w-1.5 h-1.5 animate-bounce ${theme === 'dark' ? 'bg-gray-500 rounded-full' : 'bg-black rounded-none'}`}></div>
                    <div className={`w-1.5 h-1.5 animate-bounce ${theme === 'dark' ? 'bg-gray-500 rounded-full' : 'bg-black rounded-none'}`} style={{ animationDelay: '0.1s' }}></div>
                    <div className={`w-1.5 h-1.5 animate-bounce ${theme === 'dark' ? 'bg-gray-500 rounded-full' : 'bg-black rounded-none'}`} style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <span className={`font-medium text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>Someone is typing...</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
