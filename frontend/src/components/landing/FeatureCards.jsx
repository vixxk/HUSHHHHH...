import React from 'react';

const features = [
  {
    id: 1,
    icon: '⚡',
    title: 'INSTANT',
    subtitle: 'CONNECTION',
    description: 'No sign-up needed. Create rooms instantly and start chatting in seconds.',
    bgColor: 'bg-yellow-300'
  },
  {
    id: 2,
    icon: '🔒',
    title: 'PRIVATE',
    subtitle: '& SECURE',
    description: 'Password-protected rooms ensure your conversations stay private.',
    bgColor: 'bg-white'
  },
  {
    id: 3,
    icon: '💬',
    title: 'REAL-TIME',
    subtitle: 'MESSAGING',
    description: 'Experience seamless real-time communication with instant delivery.',
    bgColor: 'bg-pink-300'
  },
  {
    id: 4,
    icon: '📎',
    title: 'FILE',
    subtitle: 'SHARING',
    description: 'Share images and documents effortlessly within your chat rooms.',
    bgColor: 'bg-blue-300'
  },
  {
    id: 5,
    icon: '👥',
    title: 'ROOM',
    subtitle: 'MANAGEMENT',
    description: 'Full control over your rooms. Create, join, manage, and delete.',
    bgColor: 'bg-green-300'
  },
  {
    id: 6,
    icon: '🌐',
    title: 'CROSS',
    subtitle: 'PLATFORM',
    description: 'Access from any device - desktop, tablet, or mobile. Always connected.',
    bgColor: 'bg-purple-300'
  }
];

const FeatureCards = () => {
  return (
    <section className="w-full py-16 lg:py-32 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-64 h-64 border-8 border-black rotate-45"></div>
        <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-black rounded-full"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16 space-y-4 lg:space-y-6">
          <h2 className="text-4xl lg:text-6xl font-black tracking-tighter">
            POWERFUL
            <span className="inline-block bg-black text-white px-3 lg:px-4 mx-2 -rotate-2">
              FEATURES
            </span>
          </h2>
          <p className="text-lg lg:text-2xl font-medium max-w-2xl mx-auto">
            Everything you need for <span className="underline decoration-4 decoration-yellow-300">modern communication</span>
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div 
              key={feature.id}
              className={`${feature.bgColor} border-4 border-black p-6 lg:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] transform hover:-translate-x-1 hover:-translate-y-1 transition-all duration-200 group`}
              style={{ 
                transform: `rotate(${index % 2 === 0 ? '1deg' : '-1deg'})`,
              }}
            >
              {/* Icon */}
              <div className="text-5xl lg:text-6xl mb-4 lg:mb-6 group-hover:scale-110 transition-transform duration-200">
                {feature.icon}
              </div>

              {/* Title */}
              <div className="mb-3 lg:mb-4">
                <h3 className="text-lg lg:text-2xl font-black tracking-tighter leading-tight">
                  {feature.title}
                  <br />
                  {feature.subtitle}
                </h3>
              </div>

              {/* Description */}
              <p className="text-sm lg:text-base font-bold leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureCards;
