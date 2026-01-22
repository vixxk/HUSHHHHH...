import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className={`relative w-16 h-8 border-2 lg:border-4 transition-colors duration-300 rounded-full flex items-center px-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[1px] active:shadow-none ${theme === 'dark'
                ? 'bg-[#18181B] border-white shadow-[2px_2px_0px_0px_#FFFFFF]'
                : 'bg-white border-black'
                }`}
            aria-label="Toggle Theme"
        >
            <div
                className={`w-5 h-5 lg:w-6 lg:h-6 rounded-full transform transition-transform duration-300 flex items-center justify-center text-xs lg:text-sm font-bold ${theme === 'dark'
                    ? 'translate-x-7 lg:translate-x-8 bg-black text-[10px]'
                    : 'translate-x-0 bg-white'
                    }`}
            >
                {theme === 'dark' ? '🌙' : '☀️'}
            </div>
        </button>
    );
};

export default ThemeToggle;
