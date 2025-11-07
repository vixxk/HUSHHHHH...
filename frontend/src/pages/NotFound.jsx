import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen bg-white flex items-center justify-center p-4 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 border-8 border-black rotate-12"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-black rounded-full"></div>
        <div className="absolute top-1/3 right-1/4 w-24 h-24 border-8 border-black -rotate-45"></div>
      </div>

      <div className="relative text-center space-y-8 max-w-2xl">
        {/* 404 */}
        <div className="relative">
          <h1 className="text-9xl lg:text-[320px] pr-4 font-black tracking-tighter leading-none">
            404
          </h1>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl animate-bounce">
            😵
          </div>
        </div>

        {/* Message */}
        <div className="space-y-4">
          <h2 className="text-4xl lg:text-6xl font-black tracking-tighter">
            PAGE
            <span className="inline-block bg-black text-white px-4 py-2 mx-2 -rotate-2">
              NOT
            </span>
            FOUND
          </h2>
          <p className="text-xl lg:text-2xl font-bold text-gray-700 leading-relaxed">
            Looks like you've wandered into the <span className="bg-yellow-300 px-2 py-1">VOID</span>. 
            <br />
            This page doesn't exist!
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          <button
            onClick={() => navigate('/')}
            className="px-8 py-4 text-xl font-black bg-black text-white border-4 border-black hover:bg-white hover:text-black transition-all shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transform hover:-translate-x-1 hover:-translate-y-1"
          >
            🏠 GO HOME
          </button>
          <button
            onClick={() => navigate(-1)}
            className="px-8 py-4 text-xl font-black border-4 border-black hover:bg-black hover:text-white transition-all shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transform hover:-translate-x-1 hover:-translate-y-1"
          >
            GO BACK
          </button>
        </div>

        {/* Fun Fact */}
        <div className="pt-8">
          <div className="bg-yellow-300 border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transform -rotate-1">
            <p className="text-sm font-black uppercase tracking-wider mb-2">💡 FUN FACT</p>
            <p className="text-base font-bold">
              404 errors got their name from room 404 at CERN, where the World Wide Web was invented!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
