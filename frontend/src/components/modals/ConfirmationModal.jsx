import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const ConfirmationModal = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = "YES, DELETE",
  cancelText = "CANCEL",
  showCancel = true
}) => {
  const { theme } = useTheme();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={showCancel ? onCancel : undefined}
      ></div>

      {/* Modal */}
      <div className={`relative max-w-md w-full transform rotate-1 hover:rotate-0 transition-all duration-300 ${theme === 'dark'
        ? 'bg-[#18181B] border border-[#27272A] shadow-2xl rounded-3xl overflow-hidden'
        : 'bg-white border-4 border-black shadow-[16px_16px_0px_0px_rgba(0,0,0,1)]'
        }`}>

        {/* Header */}
        <div className={`p-6 border-b ${theme === 'dark'
          ? 'bg-red-500/10 border-[#27272A] text-red-500'
          : 'bg-red-500 text-white border-b-4 border-black'
          }`}>
          <h2 className="text-xl lg:text-3xl font-black tracking-tighter flex items-center space-x-3">
            <span className="text-2xl lg:text-4xl">⚠️</span>
            <span>{title || 'CONFIRM ACTION'}</span>
          </h2>
        </div>

        {/* Content */}
        <div className="p-4 lg:p-8 space-y-4 lg:space-y-6">
          <p className={`text-lg lg:text-xl font-bold leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-black'
            }`}>
            {message || 'Are you sure you want to proceed?'}
          </p>

          {/* Actions */}
          <div className="flex space-x-4">
            <button
              onClick={onConfirm}
              className={`flex-1 px-4 py-3 lg:px-6 lg:py-4 text-base lg:text-lg font-black transition-all transform hover:-translate-y-1 ${theme === 'dark'
                ? 'bg-red-500 text-white hover:bg-red-600 rounded-xl shadow-lg shadow-red-500/20'
                : 'bg-red-500 text-white border-4 border-black hover:bg-red-600 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]'
                }`}
            >
              {confirmText}
            </button>
            {showCancel && (
              <button
                onClick={onCancel}
                className={`flex-1 px-4 py-3 lg:px-6 lg:py-4 text-base lg:text-lg font-black transition-all transform hover:-translate-y-1 ${theme === 'dark'
                  ? 'bg-[#27272A] text-white hover:bg-[#3F3F46] rounded-xl'
                  : 'bg-white text-black border-4 border-black hover:bg-black hover:text-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]'
                  }`}
              >
                {cancelText}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;