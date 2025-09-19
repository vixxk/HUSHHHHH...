"use client";

import * as React from "react";
import { cn } from "../../lib/utils.js";
import { motion, AnimatePresence } from "motion/react";

export const Accordion = ({ children, className, type = "single", collapsible = true }) => {
  const [openItem, setOpenItem] = React.useState(null);

  const handleToggle = (value) => {
    if (collapsible && openItem === value) {
      setOpenItem(null);
    } else {
      setOpenItem(value);
    }
  };

  return (
    <div className={cn("w-full space-y-3", className)}>
      {React.Children.map(children, (child, index) =>
        React.cloneElement(child, {
          openItem,
          onToggle: handleToggle,
          index,
        })
      )}
    </div>
  );
};

export const AccordionItem = ({ value, children, openItem, onToggle, index }) => {
  const isOpen = openItem === value;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border transition-all duration-300",
        isOpen 
          ? "border-gray-500/50 bg-gradient-to-br from-gray-800/60 to-gray-700/40 shadow-lg shadow-gray-900/50" 
          : "border-gray-700/30 bg-gray-800/30 hover:border-gray-600/50 hover:bg-gray-800/50"
      )}
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/2 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {React.Children.map(children, (child) =>
        React.cloneElement(child, {
          isOpen,
          value,
          onToggle,
        })
      )}
    </motion.div>
  );
};

export const AccordionTrigger = ({ children, isOpen, value, onToggle, className }) => {
  return (
    <motion.button
      onClick={() => onToggle(value)}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className={cn(
        "relative z-10 flex w-full items-center justify-between py-6 px-6 text-left font-medium transition-all duration-200",
        "hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-500/50 focus:ring-offset-0",
        "group-hover:bg-gray-700/20",
        className
      )}
    >
      <span className="text-lg leading-relaxed pr-4">{children}</span>
      
      {/* Enhanced arrow with background */}
      <motion.div
        initial={false}
        animate={{ 
          rotate: isOpen ? 90 : 0,
          scale: isOpen ? 1.1 : 1
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={cn(
          "flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300",
          isOpen 
            ? "bg-gradient-to-br from-gray-600/50 to-gray-700/50 text-white" 
            : "bg-gray-700/30 text-gray-400 group-hover:bg-gray-600/40 group-hover:text-gray-300"
        )}
      >
        <svg 
          width="12" 
          height="12" 
          viewBox="0 0 12 12" 
          fill="none"
          className="transition-colors duration-200"
        >
          <path 
            d="M4 2L8 6L4 10" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
    </motion.button>
  );
};

export const AccordionContent = ({ children, isOpen }) => {
  return (
    <AnimatePresence initial={false} mode="wait">
      {isOpen && (
        <motion.div
          key="content"
          initial={{ height: 0, opacity: 0, y: -10 }}
          animate={{ height: "auto", opacity: 1, y: 0 }}
          exit={{ height: 0, opacity: 0, y: -10 }}
          transition={{ 
            duration: 0.4, 
            ease: [0.04, 0.62, 0.23, 0.98],
            opacity: { duration: 0.3 }
          }}
          className="overflow-hidden"
        >
          <div className="px-6 pb-6 pt-2">
            {/* Content with enhanced styling */}
            <div className="relative">
              {/* Subtle top border */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-600/50 to-transparent" />
              
              <div className="pt-4 text-gray-300 leading-relaxed text-base">
                {children}
              </div>
              
              {/* Optional bottom accent */}
              <div className="mt-4 flex justify-start">
                <div className="w-12 h-0.5 bg-gradient-to-r from-gray-500 to-transparent rounded-full" />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};