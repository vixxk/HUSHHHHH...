import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const Footer = () => {
  const { theme } = useTheme();

  return (
    <footer className={`w-full py-12 lg:py-16 transition-colors duration-300 ${theme === 'dark' ? 'bg-[#09090B] text-gray-400 border-t border-[#27272A]' : 'bg-black text-white border-t-8 border-yellow-400'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 lg:gap-12">

          {/* Brand Column - Full width on mobile */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-white p-1 border-2 border-white transform -rotate-3">
                <span className="text-2xl text-black">💬</span>
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                HUSHHHH...
              </span>
            </div>
            <p className="text-sm font-medium leading-relaxed max-w-xs text-gray-400">
              Real-time communication made <br />
              <span className="bg-yellow-400 text-black px-1 font-bold">SIMPLE</span> and secure.
            </p>
          </div>

          {/* Product Column */}
          <div className="space-y-6">
            <h3 className="text-sm font-black uppercase tracking-wider text-white border-b-2 border-white pb-2 inline-block">
              PRODUCT
            </h3>
            <ul className="space-y-3 text-sm font-bold text-gray-400">
              <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
            </ul>
          </div>

          {/* Legal Column */}
          <div className="space-y-6">
            <h3 className="text-sm font-black uppercase tracking-wider text-white border-b-2 border-white pb-2 inline-block">
              LEGAL
            </h3>
            <ul className="space-y-3 text-sm font-bold text-gray-400">
              <li>
                <a
                  href="https://www.notion.so/HUSHHHH-2a7a4992143b80968ea8e8412d9704e4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Privacy & Terms
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-xs font-bold text-gray-500 uppercase tracking-wide">
          <p>&copy; {new Date().getFullYear()} HUSHHHH... ALL RIGHTS RESERVED.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
