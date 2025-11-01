import React from 'react';

const CTA = ({ onCreateClick, onJoinClick }) => {
  return (
    <section className="w-full py-16 lg:py-32 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] lg:w-[800px] h-[600px] lg:h-[800px] border-[40px] border-black opacity-5 rotate-45"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-yellow-300 border-8 border-black p-8 lg:p-16 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transform -rotate-1 hover:rotate-0 transition-transform duration-300">
          
          {/* Main Content */}
          <div className="text-center space-y-6 lg:space-y-8">
            <h2 className="text-3xl lg:text-6xl font-black tracking-tighter leading-tight">
              READY TO START
              <br />
              <span className="inline-block bg-black text-white px-4 lg:px-6 py-2 lg:py-3 rotate-2 my-2">
                CHATTING?
              </span>
            </h2>

            <p className="text-base lg:text-2xl font-bold max-w-2xl mx-auto leading-relaxed">
              Join <span className="bg-white px-2 py-1">thousands</span> of users already enjoying seamless communication. 
              <br className="hidden lg:block" />
              <span className="line-through">No credit card</span>. No commitments. No BS.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center pt-6 lg:pt-8">
              <button 
                onClick={onCreateClick}
                className="px-6 lg:px-10 py-4 lg:py-5 text-lg lg:text-2xl font-black bg-black text-white border-4 border-black hover:bg-white hover:text-black transition-all duration-200 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] transform hover:-translate-x-1 hover:-translate-y-1"
              >
                CREATE ROOM →
              </button>
              <button 
                onClick={onJoinClick}
                className="px-6 lg:px-10 py-4 lg:py-5 text-lg lg:text-2xl font-black bg-white text-black border-4 border-black hover:bg-black hover:text-white transition-all duration-200 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] transform hover:-translate-x-1 hover:-translate-y-1"
              >
                JOIN ROOM
              </button>
            </div>

            {/* Features List */}
            <div className="flex flex-wrap justify-center gap-4 lg:gap-8 pt-8 lg:pt-12">
              {['NO REGISTRATION', '100% FREE', 'SECURE & PRIVATE'].map((feature, index) => (
                <div 
                  key={index}
                  className="flex items-center space-x-2 lg:space-x-3 bg-black text-white px-4 lg:px-6 py-2 lg:py-3 border-4 border-black font-black text-xs lg:text-sm tracking-wider"
                >
                  <span className="text-lg lg:text-2xl">✓</span>
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
