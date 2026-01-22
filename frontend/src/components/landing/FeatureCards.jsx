import React from 'react';
import { useTheme } from '../../context/ThemeContext';



const features = [
  {
    id: 1,
    icon: '⚡',
    title: 'INSTANT',
    subtitle: 'CONNECTION',
    description: 'No sign-up needed. Create rooms instantly and start chatting in seconds.',
    bgColor: 'bg-yellow-400',
    darkBg: 'bg-[#18181B]',
    darkBorder: 'border-[#27272A]',
    darkText: 'text-[#EAB308]'
  },
  {
    id: 2,
    icon: '🔒',
    title: 'PRIVATE',
    subtitle: '& SECURE',
    description: 'Password-protected rooms ensure your conversations stay private.',
    bgColor: 'bg-white',
    darkBg: 'bg-[#18181B]',
    darkBorder: 'border-white',
    darkText: 'text-white'
  },
  {
    id: 3,
    icon: '💬',
    title: 'REAL-TIME',
    subtitle: 'MESSAGING',
    description: 'Experience seamless real-time communication with instant delivery.',
    bgColor: 'bg-pink-400',
    darkBg: 'bg-[#18181B]',
    darkBorder: 'border-[#27272A]',
    darkText: 'text-pink-500'
  },
  {
    id: 4,
    icon: '📎',
    title: 'FILE',
    subtitle: 'SHARING',
    description: 'Share images and documents effortlessly within your chat rooms.',
    bgColor: 'bg-blue-400',
    darkBg: 'bg-[#18181B]',
    darkBorder: 'border-[#27272A]',
    darkText: 'text-blue-500'
  },
  {
    id: 5,
    icon: '👥',
    title: 'ROOM',
    subtitle: 'MANAGEMENT',
    description: 'Full control over your rooms. Create, join, manage, and delete.',
    bgColor: 'bg-green-400',
    darkBg: 'bg-[#18181B]',
    darkBorder: 'border-[#27272A]',
    darkText: 'text-green-500'
  },
  {
    id: 6,
    icon: '🌐',
    title: 'CROSS',
    subtitle: 'PLATFORM',
    description: 'Access from any device - desktop, tablet, or mobile. Always connected.',
    bgColor: 'bg-purple-400',
    darkBg: 'bg-[#18181B]',
    darkBorder: 'border-[#27272A]',
    darkText: 'text-purple-500'
  }
];

const FeatureCards = () => {
  const { theme } = useTheme();
  return (
    <section className={`w-full py-16 lg:py-32 relative overflow-hidden transition-colors duration-300 ${theme === 'dark' ? 'bg-transparent text-[#F4F4F5]' : 'bg-transparent text-black'}`}>
      {/* Background Elements */}
      <div className={`absolute inset-0 opacity-20 pointer-events-none overflow-hidden ${theme === 'dark' ? 'bg-[radial-gradient(#27272A_1px,transparent_1px)]' : 'hidden'}`} style={{ backgroundSize: '40px 40px' }}></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16 space-y-4 lg:space-y-6">
          <h2 className="text-4xl lg:text-6xl font-black tracking-tight uppercase">
            POWERFUL
            {theme === 'light' ? (
              <span className="ml-3 inline-block bg-black text-white px-3 py-1 -rotate-2 transform">
                FEATURES
              </span>
            ) : (
              <>
                <br />
                <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#EAB308] to-[#CA8A04]">
                  FEATURES
                </span>
              </>
            )}
          </h2>
          <p className="text-lg lg:text-xl font-medium max-w-2xl mx-auto text-gray-500">
            Everything you need for modern communication
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className={`p-6 lg:p-8 transition-all duration-200 group relative ${theme === 'dark'
                ? 'bg-[#18181B] border border-[#27272A] hover:border-[#EAB308] text-gray-200 hover:shadow-xl rounded-2xl'
                : `${feature.bgColor} border-[3px] border-black text-black hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] ${index % 2 === 0 ? '-rotate-1 hover:rotate-0' : 'rotate-1 hover:rotate-0'}`
                }`}
            >
              {/* Icon */}
              <div className={`text-4xl lg:text-5xl mb-4 lg:mb-6 group-hover:scale-110 transition-transform duration-200 ${theme === 'dark' ? feature.darkText : 'text-black'}`}>
                {feature.icon}
              </div>

              {/* Title */}
              <div className="mb-3">
                <h3 className={`text-xl lg:text-2xl font-black tracking-tight leading-tight ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                  {feature.title} <br /> <span className="font-bold">{feature.subtitle}</span>
                </h3>
              </div>

              {/* Description */}
              <p className={`text-sm lg:text-base font-bold leading-relaxed ${theme === 'dark' ? 'text-gray-400' : 'text-black'}`}>
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
