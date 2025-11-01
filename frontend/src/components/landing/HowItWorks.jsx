import React from 'react';

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
    color: 'bg-green-300'
  }
];

const HowItWorks = () => {
  return (
    <section className="w-full py-16 lg:py-32 bg-black text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white"
            style={{
              width: Math.random() * 100 + 50 + 'px',
              height: Math.random() * 100 + 50 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              transform: `rotate(${Math.random() * 360}deg)`,
              pointerEvents: 'none'
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-20 space-y-4 lg:space-y-6">
          <h2 className="text-4xl lg:text-6xl font-black tracking-tighter">
            HOW IT
            <span className="inline-block bg-white text-black px-3 lg:px-4 mx-2 rotate-2">
              WORKS
            </span>
          </h2>
          <p className="text-lg lg:text-2xl font-medium">
            Get started in <span className="bg-yellow-300 text-black px-2 py-1 font-black">4 SIMPLE STEPS</span>
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {steps.map((step) => (
            <div 
              key={step.id}
              className="relative group"
            >
              {/* Step Number */}
              <div className="absolute -top-4 -left-4 w-16 h-16 lg:w-20 lg:h-20 bg-white text-black border-4 border-white flex items-center justify-center font-black text-lg lg:text-2xl transform -rotate-12 group-hover:rotate-0 transition-transform duration-200 z-20">
                {step.number}
              </div>

              {/* Card */}
              <div className={`${step.color} border-4 border-white p-6 lg:p-8 pt-10 lg:pt-12 min-h-[200px] lg:min-h-[280px] shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] hover:shadow-[10px_10px_0px_0px_rgba(255,255,255,1)] transform hover:-translate-x-1 hover:-translate-y-1 transition-all duration-200`}>
                {/* Icon */}
                <div className="text-4xl lg:text-5xl mb-3 lg:mb-4 group-hover:scale-110 transition-transform duration-200">
                  {step.icon}
                </div>

                {/* Title */}
                <h3 className="text-lg lg:text-xl font-black text-black mb-2 lg:mb-3 leading-tight">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-black font-bold text-sm lg:text-base leading-relaxed">
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
