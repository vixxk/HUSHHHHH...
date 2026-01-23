import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const CTA = ({ onCreateClick, onJoinClick }) => {
  const { theme } = useTheme();
  return (
    <section className={`w-full py-16 lg:py-32 relative overflow-hidden transition-colors duration-300 ${theme === 'dark' ? 'bg-transparent text-[#F4F4F5]' : 'bg-transparent'}`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] lg:w-[800px] h-[600px] lg:h-[800px] rounded-full filter blur-3xl ${theme === 'dark' ? 'bg-[#EAB308]/20' : 'bg-yellow-300/30'}`}></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`p-8 lg:p-16 transition-all duration-300 ${theme === 'dark'
          ? 'bg-[#18181B] border border-[#27272A] rounded-3xl'
          : 'bg-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] rounded-none'
          }`}>

          {/* Main Content */}
          <div className="text-center space-y-6 lg:space-y-8">
            <h2 className="text-3xl lg:text-5xl font-bold tracking-tight leading-tight">
              READY TO START <br />
              <span className={`text-transparent bg-clip-text bg-gradient-to-r ${theme === 'dark' ? 'from-[#EAB308] to-[#CA8A04]' : 'from-black to-gray-700'}`}>
                CHATTING?
              </span>
            </h2>

            <p className={`text-base lg:text-xl font-medium max-w-2xl mx-auto leading-relaxed ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Join <span className={`${theme === 'dark' ? 'text-white' : 'text-black'} font-bold`}>thousands</span> of users already enjoying seamless communication.
              <br className="hidden lg:block" />
              <span className="line-through opacity-50">No credit card</span>. No commitments. No BS.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center pt-6 lg:pt-8">
              <button
                onClick={onCreateClick}
                className={`px-6 lg:px-10 py-4 lg:py-5 text-lg font-bold transition-all duration-200 transform hover:-translate-y-1 ${theme === 'dark'
                  ? 'bg-[#EAB308] text-black hover:bg-[#CA8A04] shadow-lg shadow-yellow-900/20 rounded-full'
                  : 'bg-black text-white hover:bg-gray-800 shadow-[6px_6px_0px_0px_rgba(0,0,0,0.2)] rounded-none border-2 border-black'
                  }`}
              >
                CREATE ROOM →
              </button>
              <button
                onClick={onJoinClick}
                className={`px-6 lg:px-10 py-4 lg:py-5 text-lg font-bold transition-all duration-200 ${theme === 'dark'
                  ? 'border-2 border-[#27272A] text-gray-300 hover:text-white hover:border-white hover:bg-[#27272A] rounded-full'
                  : 'border-4 border-black text-black hover:bg-black hover:text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transform active:translate-x-[2px] active:translate-y-[2px] active:shadow-none rounded-none'
                  }`}
              >
                JOIN ROOM
              </button>
            </div>

            {/* Features List */}
            <div className="flex flex-wrap justify-center gap-4 lg:gap-8 pt-8 lg:pt-12">
              {['NO REGISTRATION', '100% FREE', 'SECURE & PRIVATE'].map((feature, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-2 lg:space-x-3 px-4 lg:px-6 py-2 font-medium text-xs lg:text-sm tracking-wide ${theme === 'dark'
                    ? 'bg-[#27272A] text-gray-300 rounded-full'
                    : 'bg-white border-2 border-black text-black rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                    }`}
                >
                  <span className={`text-lg lg:text-xl ${theme === 'dark' ? 'text-[#EAB308]' : 'text-green-500'}`}>✓</span>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
