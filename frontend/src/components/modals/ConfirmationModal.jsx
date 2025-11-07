import React from 'react';

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
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={showCancel ? onCancel : undefined}
      ></div>

      {/* Modal */}
      <div className="relative bg-white border-8 border-black shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] max-w-md w-full transform rotate-1 hover:rotate-0 transition-transform">
        
        {/* Header */}
        <div className="bg-red-500 text-white p-6 border-b-8 border-black">
          <h2 className="text-3xl font-black tracking-tighter flex items-center space-x-3">
            <span className="text-4xl">⚠️</span>
            <span>{title || 'CONFIRM ACTION'}</span>
          </h2>
        </div>

        {/* Content */}
        <div className="p-8 space-y-6">
          <p className="text-xl font-bold leading-relaxed">
            {message || 'Are you sure you want to proceed?'}
          </p>

          {/* Actions */}
          <div className="flex space-x-4">
            <button
              onClick={onConfirm}
              className="flex-1 px-6 py-4 text-lg font-black bg-red-500 text-white border-4 border-black hover:bg-red-600 transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform hover:-translate-x-1 hover:-translate-y-1"
            >
              {confirmText}
            </button>
            {showCancel && (
              <button
                onClick={onCancel}
                className="flex-1 px-6 py-4 text-lg font-black border-4 border-black hover:bg-black hover:text-white transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform hover:-translate-x-1 hover:-translate-y-1"
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