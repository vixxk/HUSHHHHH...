import React from 'react';

const HeroSection = ({ onCreateClick, onJoinClick }) => {
  return (
    <section className="w-full bg-white relative py-20 lg:py-32 min-h-fit overflow-hidden">
      {/* Background Patterns */}
      <div className="absolute inset-0 opacity-5 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 border-8 border-black rotate-12"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-black rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 border-8 border-black -rotate-12"></div>
        <div className="absolute top-1/3 right-1/3 w-20 h-20 bg-black"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-6 lg:space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-black text-white px-4 lg:px-6 py-2 lg:py-3 font-bold border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <span className="text-xl lg:text-2xl">🚀</span>
              <span className="text-xs lg:text-sm tracking-wider">REAL-TIME MESSAGING</span>
            </div>

            {/* Title */}
            <h1 className="text-5xl lg:text-7xl font-black leading-tight lg:leading-none tracking-tighter">
              CHAT
              <br />
              <span className="inline-block bg-black text-white px-3 lg:px-4 py-1 lg:py-2 -rotate-2 my-2">
                WITHOUT
              </span>
              <br />
              LIMITS
            </h1>

            {/* Description */}
            <p className="text-lg lg:text-2xl font-medium leading-relaxed max-w-xl">
              Create <span className="bg-yellow-300 px-2 py-1 font-black">SECURE</span> chat rooms instantly. 
              No sign-up. No BS. Just pure communication.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                onClick={onCreateClick}
                className="group px-6 lg:px-8 py-3 lg:py-4 text-base lg:text-xl font-black bg-black text-white border-4 border-black hover:bg-white hover:text-black transition-all duration-200 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] transform hover:-translate-x-1 hover:-translate-y-1"
              >
                <span className="flex items-center justify-center space-x-2">
                  <span>CREATE ROOM</span>
                  <span className="text-lg lg:text-2xl group-hover:rotate-90 transition-transform">➜</span>
                </span>
              </button>
              
              <button 
                onClick={onJoinClick}
                className="px-6 lg:px-8 py-3 lg:py-4 text-base lg:text-xl font-black border-4 border-black hover:bg-black hover:text-white transition-all duration-200 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] transform hover:-translate-x-1 hover:-translate-y-1"
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
            <div className="bg-white border-8 border-black shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] transform rotate-2 hover:rotate-0 transition-transform duration-300">
              {/* Chat Preview Header */}
              <div className="bg-black text-white p-4 border-b-8 border-black">
                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  <div className="text-lg font-black tracking-wider">ROOM #123456</div>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="p-4 lg:p-6 space-y-4 lg:space-y-6 bg-white min-h-[350px] lg:min-h-[400px]">
                {/* Message 1 */}
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-black text-white flex items-center justify-center font-black text-lg border-4 border-black flex-shrink-0">
                    A
                  </div>
                  <div className="flex-1">
                    <div className="bg-white border-4 border-black p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                      <p className="font-bold text-sm lg:text-base">Hey! Welcome 👋</p>
                    </div>
                  </div>
                </div>

                {/* Message 2 */}
                <div className="flex items-start space-x-3 flex-row-reverse">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-black text-white flex items-center justify-center font-black text-lg border-4 border-black flex-shrink-0">
                    B
                  </div>
                  <div className="flex-1">
                    <div className="bg-black text-white border-4 border-black p-3 mr-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                      <p className="font-bold text-sm lg:text-base">Thanks! This looks AWESOME ✨</p>
                    </div>
                  </div>
                </div>

                {/* Message 3 */}
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-black text-white flex items-center justify-center font-black text-lg border-4 border-black flex-shrink-0">
                    A
                  </div>
                  <div className="flex-1">
                    <div className="bg-yellow-300 border-4 border-black p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                      <p className="font-bold text-sm lg:text-base">Start chatting instantly! 🚀</p>
                    </div>
                  </div>
                </div>

                {/* Typing Indicator */}
                <div className="flex items-center space-x-2 px-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-black rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-black rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-black rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                  <span className="font-bold text-xs lg:text-sm">Someone is typing...</span>
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
