import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const steps = [
  {
    id: 1,
    number: '01',
    title: 'CREATE OR JOIN',
    description: 'Click "Create Room" to start or "Join Room" with a code.',
    icon: '🎯',
    color: 'bg-yellow-300'
  },
  {
    id: 2,
    number: '02',
    title: 'SET PREFERENCES',
    description: 'Choose name, set public/private, get your unique room code.',
    icon: '⚙️',
    color: 'bg-pink-300'
  },
  {
    id: 3,
    number: '03',
    title: 'SHARE & INVITE',
    description: 'Share your room code or link with anyone you want.',
    icon: '🔗',
    color: 'bg-blue-300'
  },
  {
    id: 4,
    number: '04',
    title: 'START CHATTING',
    description: 'Enjoy real-time messaging and file sharing instantly!',
    icon: '💬',
    color: 'bg-green-400'
  }
];

// Floating Background Shapes
const floatingShapes = [
  { className: "top-20 left-10 w-24 h-24 rotate-12 bg-[#27272A]/30" },
  { className: "bottom-20 right-10 w-32 h-32 -rotate-6 bg-[#27272A]/20" },
  { className: "top-1/2 right-20 w-16 h-16 rotate-45 bg-[#27272A]/40" },
  { className: "bottom-40 left-20 w-20 h-20 -rotate-12 bg-[#27272A]/25" },
];

const HowItWorks = () => {
  const { theme } = useTheme();
  return (
    <section className={`w-full py-16 lg:py-32 relative overflow-hidden transition-colors duration-300 ${theme === 'dark' ? 'bg-[#09090B] text-[#F4F4F5]' : 'bg-black text-white'
      }`}>
      {/* Background Shapes (Light Mode only for reference effect) */}
      {theme !== 'dark' && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {floatingShapes.map((shape, i) => (
            <div key={i} className={`absolute ${shape.className} backdrop-blur-sm rounded-lg`}></div>
          ))}
        </div>
      )}

      {/* Texture for Dark Mode */}
      <div className={`absolute inset-0 pointer-events-none opacity-20 overflow-hidden ${theme === 'dark' ? 'bg-[radial-gradient(#27272A_1px,transparent_1px)]' : ''}`} style={{ backgroundSize: '40px 40px' }}></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 lg:mb-24 space-y-6 lg:space-y-8 relative z-10">
          <h2 className="text-4xl lg:text-7xl font-black tracking-tight uppercase">
            HOW IT <span className={`${theme === 'dark' ? 'text-[#EAB308]' : 'bg-white text-black px-4 py-2 rotate-2 inline-block transform'}`}>WORKS</span>
          </h2>
          <p className="text-xl lg:text-2xl font-bold text-gray-400">
            Get started in <span className={`${theme === 'dark' ? 'text-white' : 'bg-yellow-400 text-black px-2'}`}>4 SIMPLE STEPS</span>
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {steps.map((step) => (
            <div
              key={step.id}
              className="relative group h-full"
            >
              <div className={`relative p-6 lg:p-8 h-full flex flex-col transition-all duration-200 ${theme === 'dark'
                  ? 'bg-[#18181B] text-[#F4F4F5] border border-[#27272A] hover:border-[#EAB308] hover:shadow-xl rounded-2xl'
                  : `${step.color} border-4 border-white text-black shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)] hover:-translate-y-2 hover:shadow-[12px_12px_0px_0px_rgba(255,255,255,0.2)] ${step.id % 2 === 0 ? 'rotate-1' : '-rotate-1'}`
                }`}>

                {/* Number Badge (Light Mode) */}
                {theme !== 'dark' && (
                  <div className="absolute -top-6 -left-4 bg-white text-black font-black text-xl w-12 h-12 flex items-center justify-center border-4 border-gray-100 shadow-md -rotate-12 z-10 transform group-hover:rotate-0 transition-transform">
                    {step.number}
                  </div>
                )}

                <div className="mb-6 flex justify-between items-start">
                  {theme === 'dark' && (
                    <span className="text-4xl font-bold opacity-10 text-white">{step.number}</span>
                  )}
                  <div className={`text-5xl lg:text-6xl ${theme === 'dark' ? 'text-[#EAB308]' : 'text-black drop-shadow-sm'}`}>
                    {step.icon}
                  </div>
                </div>

                <h3 className={`text-xl lg:text-2xl font-black mb-3 uppercase tracking-tight ${theme === 'dark' ? 'text-[#EAB308]' : 'text-black'}`}>
                  {step.title}
                </h3>

                <p className={`text-base lg:text-lg font-bold leading-relaxed ${theme === 'dark' ? 'text-gray-400' : 'text-black/80'}`}>
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
